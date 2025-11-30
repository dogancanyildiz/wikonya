"use client"

import { useState } from "react"
import { usePermissions } from "@/lib/utils/hooks/use-permissions"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import dynamic from "next/dynamic"

// Lazy load moderation components
const TopicApprovalList = dynamic(
  () => import("@/components/features/moderation/topic-approval-list").then((mod) => ({ default: mod.TopicApprovalList })),
  { 
    loading: () => <div className="h-32 animate-pulse bg-muted rounded-xl" />,
    ssr: false 
  }
)

const WikiProposalList = dynamic(
  () => import("@/components/features/moderation/wiki-proposal-list").then((mod) => ({ default: mod.WikiProposalList })),
  { 
    loading: () => <div className="h-32 animate-pulse bg-muted rounded-xl" />,
    ssr: false 
  }
)

const FlaggedContentList = dynamic(
  () => import("@/components/features/moderation/flagged-content-list").then((mod) => ({ default: mod.FlaggedContentList })),
  { 
    loading: () => <div className="h-32 animate-pulse bg-muted rounded-xl" />,
    ssr: false 
  }
)
import { Topic, WikiEditProposal } from "@/lib/types"

export default function ModerationPage() {
  const { canModerate, canApproveProposals } = usePermissions()
  const [topics, setTopics] = useState<Topic[]>([])
  const [proposals, setProposals] = useState<WikiEditProposal[]>([])

  if (!canModerate && !canApproveProposals) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-8 py-6 sm:py-8">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="font-[Manrope]">
            Bu sayfaya erişim yetkiniz yok. Moderasyon yetkisi için &quot;Kaşif Meraklısı&quot; veya üstü bir role sahip olmanız gerekiyor.
          </AlertDescription>
        </Alert>
      </div>
    )
  }

  const handleTopicApprove = (topicId: number) => {
    // Gerçek uygulamada API çağrısı yapılacak
    const updated = topics.map((t) => 
      t.id === topicId 
        ? { ...t, status: "approved" as const, approvedAt: new Date().toISOString() }
        : t
    )
    setTopics(updated)
    
    // Save to localStorage
    if (typeof window !== "undefined") {
      const history = JSON.parse(localStorage.getItem("moderation_history") || "[]")
      const topic = topics.find(t => t.id === topicId)
      if (topic) {
        history.unshift({
          type: "topic_approve",
          id: topicId,
          title: topic.title,
          action: "approved",
          date: new Date().toISOString(),
        })
        localStorage.setItem("moderation_history", JSON.stringify(history.slice(0, 100)))
      }
    }
  }

  const handleTopicReject = (topicId: number, reason: string) => {
    // Gerçek uygulamada API çağrısı yapılacak
    const updated = topics.map((t) => 
      t.id === topicId 
        ? { ...t, status: "rejected" as const, rejectionReason: reason }
        : t
    )
    setTopics(updated)
    
    // Save to localStorage
    if (typeof window !== "undefined") {
      const history = JSON.parse(localStorage.getItem("moderation_history") || "[]")
      const topic = topics.find(t => t.id === topicId)
      if (topic) {
        history.unshift({
          type: "topic_reject",
          id: topicId,
          title: topic.title,
          action: "rejected",
          reason,
          date: new Date().toISOString(),
        })
        localStorage.setItem("moderation_history", JSON.stringify(history.slice(0, 100)))
      }
    }
  }

  const handleProposalApprove = (proposalId: number) => {
    // Gerçek uygulamada API çağrısı yapılacak
    const updated = proposals.map((p) => 
      p.id === proposalId 
        ? { ...p, status: "approved" as const, reviewedAt: new Date().toISOString() }
        : p
    )
    setProposals(updated)
    
    // Save to localStorage
    if (typeof window !== "undefined") {
      const history = JSON.parse(localStorage.getItem("moderation_history") || "[]")
      const proposal = proposals.find(p => p.id === proposalId)
      if (proposal) {
        history.unshift({
          type: "proposal_approve",
          id: proposalId,
          topicId: proposal.topicId,
          action: "approved",
          date: new Date().toISOString(),
        })
        localStorage.setItem("moderation_history", JSON.stringify(history.slice(0, 100)))
      }
    }
  }

  const handleProposalReject = (proposalId: number, reason: string) => {
    // Gerçek uygulamada API çağrısı yapılacak
    const updated = proposals.map((p) => 
      p.id === proposalId 
        ? { ...p, status: "rejected" as const, reviewNote: reason, reviewedAt: new Date().toISOString() }
        : p
    )
    setProposals(updated)
    
    // Save to localStorage
    if (typeof window !== "undefined") {
      const history = JSON.parse(localStorage.getItem("moderation_history") || "[]")
      const proposal = proposals.find(p => p.id === proposalId)
      if (proposal) {
        history.unshift({
          type: "proposal_reject",
          id: proposalId,
          topicId: proposal.topicId,
          action: "rejected",
          reason,
          date: new Date().toISOString(),
        })
        localStorage.setItem("moderation_history", JSON.stringify(history.slice(0, 100)))
      }
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 py-4 sm:py-6 md:py-8">
      <div className="mb-4 sm:mb-6">
        <h1 className="font-[Manrope] text-foreground font-extrabold text-2xl sm:text-3xl md:text-4xl mb-2">
          Moderasyon Paneli
        </h1>
        <p className="font-[Manrope] text-foreground/60 dark:text-muted-foreground text-sm sm:text-base">
          İçerik onayları ve düzenleme tekliflerini yönetin
        </p>
      </div>

      <Tabs defaultValue="topics" className="w-full">
        <TabsList className={`grid w-full font-[Manrope] mb-6 gap-2 ${
          canApproveProposals && canModerate 
            ? "grid-cols-1 sm:grid-cols-3" 
            : canApproveProposals 
            ? "grid-cols-1 sm:grid-cols-2" 
            : "grid-cols-1"
        }`}>
          {canApproveProposals && (
            <TabsTrigger value="topics" className="w-full sm:w-auto text-xs sm:text-sm">Başlık Onayları</TabsTrigger>
          )}
          {canApproveProposals && (
            <TabsTrigger value="proposals" className="w-full sm:w-auto text-xs sm:text-sm">Düzenleme Teklifleri</TabsTrigger>
          )}
          {canModerate && (
            <TabsTrigger value="flagged" className="w-full sm:w-auto text-xs sm:text-sm">Bayraklanan İçerikler</TabsTrigger>
          )}
        </TabsList>

        {canApproveProposals && (
          <TabsContent value="topics">
            <Card>
              <CardHeader>
                <CardTitle className="font-[Manrope] text-foreground font-bold text-xl sm:text-2xl">
                  Onay Bekleyen Başlıklar
                </CardTitle>
                <CardDescription className="font-[Manrope]">
                  Yeni açılan başlıkları inceleyin ve onaylayın veya reddedin
                </CardDescription>
              </CardHeader>
              <CardContent>
                <TopicApprovalList
                  topics={topics}
                  onApprove={handleTopicApprove}
                  onReject={handleTopicReject}
                />
              </CardContent>
            </Card>
          </TabsContent>
        )}

        {canApproveProposals && (
          <TabsContent value="proposals">
            <Card>
              <CardHeader>
                <CardTitle className="font-[Manrope] text-foreground font-bold text-xl sm:text-2xl">
                  Onay Bekleyen Düzenleme Teklifleri
                </CardTitle>
                <CardDescription className="font-[Manrope]">
                  Wiki düzenleme tekliflerini inceleyin ve onaylayın veya reddedin
                </CardDescription>
              </CardHeader>
              <CardContent>
                <WikiProposalList
                  proposals={proposals}
                  onApprove={handleProposalApprove}
                  onReject={handleProposalReject}
                />
              </CardContent>
            </Card>
          </TabsContent>
        )}

        {canModerate && (
          <TabsContent value="flagged">
            <Card>
              <CardHeader>
                <CardTitle className="font-[Manrope] text-foreground font-bold text-xl sm:text-2xl">
                  Bayraklanan İçerikler
                </CardTitle>
                <CardDescription className="font-[Manrope]">
                  Kullanıcılar tarafından bildirilen içerikleri inceleyin
                </CardDescription>
              </CardHeader>
              <CardContent>
                <FlaggedContentList
                  items={[]}
                  onResolve={(itemId, action) => {
                    // Gerçek uygulamada API çağrısı yapılacak
                    console.log(`Item ${itemId} ${action === "resolve" ? "resolved" : "dismissed"}`)
                  }}
                />
              </CardContent>
            </Card>
          </TabsContent>
        )}
      </Tabs>
    </div>
  )
}

