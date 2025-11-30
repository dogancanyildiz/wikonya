"use client"

import { useState, useEffect } from "react"
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

interface ModerationHistoryItem {
  type: "topic_approve" | "topic_reject" | "proposal_approve" | "proposal_reject" | "flagged_resolve" | "flagged_dismiss"
  id: number
  title?: string
  topicId?: number
  action: "approved" | "rejected" | "resolved" | "dismissed"
  reason?: string
  date: string
}

export default function ModerationPage() {
  const { canModerate, canApproveProposals } = usePermissions()
  const [topics, setTopics] = useState<Topic[]>([])
  const [proposals, setProposals] = useState<WikiEditProposal[]>([])
  const [history, setHistory] = useState<ModerationHistoryItem[]>([])

  // Load history from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("moderation_history")
      if (stored) {
        try {
          setHistory(JSON.parse(stored))
        } catch {
          setHistory([])
        }
      }
    }
  }, [])

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
            ? "grid-cols-1 sm:grid-cols-4" 
            : canApproveProposals 
            ? "grid-cols-1 sm:grid-cols-3" 
            : "grid-cols-1 sm:grid-cols-2"
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
          <TabsTrigger value="history" className="w-full sm:w-auto text-xs sm:text-sm">Geçmiş</TabsTrigger>
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
                    const historyKey = "moderation_history"
                    const currentHistory = JSON.parse(localStorage.getItem(historyKey) || "[]")
                    currentHistory.unshift({
                      type: action === "resolve" ? "flagged_resolve" : "flagged_dismiss",
                      id: itemId,
                      action: action === "resolve" ? "resolved" : "dismissed",
                      date: new Date().toISOString(),
                    })
                    localStorage.setItem(historyKey, JSON.stringify(currentHistory.slice(0, 100)))
                    setHistory(currentHistory.slice(0, 100))
                    console.log(`Item ${itemId} ${action === "resolve" ? "resolved" : "dismissed"}`)
                  }}
                />
              </CardContent>
            </Card>
          </TabsContent>
        )}

        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle className="font-[Manrope] text-foreground font-bold text-xl sm:text-2xl">
                Moderasyon Geçmişi
              </CardTitle>
              <CardDescription className="font-[Manrope]">
                Yaptığınız moderasyon işlemlerinin geçmişi
              </CardDescription>
            </CardHeader>
            <CardContent>
              {history.length === 0 ? (
                <div className="text-center py-12">
                  <p className="font-[Manrope] text-foreground/60">
                    Henüz moderasyon geçmişi yok
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {history.map((item, index) => (
                    <div
                      key={`${item.type}-${item.id}-${index}`}
                      className="flex items-start gap-4 p-4 rounded-lg border border-border bg-card hover:bg-accent/50 transition-colors"
                    >
                      <div className={`w-2 h-2 rounded-full mt-2 ${
                        item.action === "approved" || item.action === "resolved"
                          ? "bg-green-500"
                          : item.action === "rejected" || item.action === "dismissed"
                          ? "bg-red-500"
                          : "bg-yellow-500"
                      }`} />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-[Manrope] font-bold text-sm text-foreground">
                            {item.type === "topic_approve" || item.type === "topic_reject"
                              ? "Başlık"
                              : item.type === "proposal_approve" || item.type === "proposal_reject"
                              ? "Düzenleme Teklifi"
                              : "Bayraklanan İçerik"}
                          </span>
                          <span className={`px-2 py-0.5 rounded text-xs font-[Manrope] font-semibold ${
                            item.action === "approved" || item.action === "resolved"
                              ? "bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400"
                              : item.action === "rejected" || item.action === "dismissed"
                              ? "bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400"
                              : "bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400"
                          }`}>
                            {item.action === "approved" ? "Onaylandı"
                              : item.action === "rejected" ? "Reddedildi"
                              : item.action === "resolved" ? "Çözüldü"
                              : "Reddedildi"}
                          </span>
                        </div>
                        {item.title && (
                          <p className="font-[Manrope] text-sm text-foreground mb-1">
                            {item.title}
                          </p>
                        )}
                        {item.reason && (
                          <p className="font-[Manrope] text-xs text-muted-foreground mb-1">
                            Neden: {item.reason}
                          </p>
                        )}
                        <p className="font-[Manrope] text-xs text-muted-foreground">
                          {new Date(item.date).toLocaleString("tr-TR", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

