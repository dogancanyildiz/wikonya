"use client"

import { useState } from "react"
import { usePermissions } from "@/lib/utils/hooks/use-permissions"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import { TopicApprovalList } from "@/components/moderation/topic-approval-list"
import { WikiProposalList } from "@/components/moderation/wiki-proposal-list"
import { FlaggedContentList } from "@/components/moderation/flagged-content-list"
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
    setTopics(topics.map((t) => 
      t.id === topicId 
        ? { ...t, status: "approved", approvedAt: new Date().toISOString() }
        : t
    ))
  }

  const handleTopicReject = (topicId: number, reason: string) => {
    // Gerçek uygulamada API çağrısı yapılacak
    setTopics(topics.map((t) => 
      t.id === topicId 
        ? { ...t, status: "rejected", rejectionReason: reason }
        : t
    ))
  }

  const handleProposalApprove = (proposalId: number) => {
    // Gerçek uygulamada API çağrısı yapılacak
    setProposals(proposals.map((p) => 
      p.id === proposalId 
        ? { ...p, status: "approved", reviewedAt: new Date().toISOString() }
        : p
    ))
  }

  const handleProposalReject = (proposalId: number, reason: string) => {
    // Gerçek uygulamada API çağrısı yapılacak
    setProposals(proposals.map((p) => 
      p.id === proposalId 
        ? { ...p, status: "rejected", reviewNote: reason, reviewedAt: new Date().toISOString() }
        : p
    ))
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-8 py-6 sm:py-8">
      <div className="mb-6">
        <h1 className="font-[Manrope] text-[#4d4d4d] dark:text-foreground font-extrabold text-3xl sm:text-4xl mb-2">
          Moderasyon Paneli
        </h1>
        <p className="font-[Manrope] text-[#4d4d4d]/60 dark:text-muted-foreground">
          İçerik onayları ve düzenleme tekliflerini yönetin
        </p>
      </div>

      <Tabs defaultValue="topics" className="w-full">
        <TabsList className="grid w-full font-[Manrope] mb-6" style={{ gridTemplateColumns: canApproveProposals && canModerate ? "repeat(3, 1fr)" : canApproveProposals ? "repeat(2, 1fr)" : "1fr" }}>
          {canApproveProposals && (
            <TabsTrigger value="topics">Başlık Onayları</TabsTrigger>
          )}
          {canApproveProposals && (
            <TabsTrigger value="proposals">Düzenleme Teklifleri</TabsTrigger>
          )}
          {canModerate && (
            <TabsTrigger value="flagged">Bayraklanan İçerikler</TabsTrigger>
          )}
        </TabsList>

        {canApproveProposals && (
          <TabsContent value="topics">
            <Card>
              <CardHeader>
                <CardTitle className="font-[Manrope] text-[#4d4d4d] dark:text-foreground font-bold text-xl sm:text-2xl">
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
                <CardTitle className="font-[Manrope] text-[#4d4d4d] dark:text-foreground font-bold text-xl sm:text-2xl">
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
                <CardTitle className="font-[Manrope] text-[#4d4d4d] dark:text-foreground font-bold text-xl sm:text-2xl">
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

