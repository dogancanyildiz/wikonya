"use client"

import { useState } from "react"
import { usePermissions } from "@/lib/utils/hooks/use-permissions"
import { useNotifications } from "@/lib/utils/hooks/use-notifications"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, CheckCircle2, XCircle, Clock } from "lucide-react"
import { Topic } from "@/lib/types"
import { format } from "date-fns"
import { tr } from "date-fns/locale"

interface TopicApprovalListProps {
  topics: Topic[]
  onApprove?: (topicId: number) => void
  onReject?: (topicId: number, reason: string) => void
}

export function TopicApprovalList({
  topics,
  onApprove,
  onReject,
}: TopicApprovalListProps) {
  const { canApproveProposals } = usePermissions()
  const { notifyTopicApproved, notifyTopicRejected } = useNotifications()
  const [rejectingId, setRejectingId] = useState<number | null>(null)
  const [rejectReason, setRejectReason] = useState("")

  const handleApprove = async (topicId: number) => {
    const topic = topics.find((t) => t.id === topicId)
    if (!topic) return

    try {
      // Simüle edilmiş API çağrısı
      await new Promise((resolve) => setTimeout(resolve, 500))

      // Topic'in author'ına coin ver (onaylandığında)
      // Gerçek uygulamada bu backend'de yapılacak
      // rewardCoins("create_topic", { topicId })

      // Bildirim gönder
      notifyTopicApproved(topicId, topic.title)

      // Callback çağır
      if (onApprove) {
        onApprove(topicId)
      }
    } catch (err) {
      console.error("Topic approval error:", err)
    }
  }

  const handleReject = async (topicId: number, reason: string) => {
    const topic = topics.find((t) => t.id === topicId)
    if (!topic) return

    try {
      // Simüle edilmiş API çağrısı
      await new Promise((resolve) => setTimeout(resolve, 500))

      // Bildirim gönder
      notifyTopicRejected(topic.title, reason)

      // Callback çağır
      if (onReject) {
        onReject(topicId, reason)
      }
    } catch (err) {
      console.error("Topic rejection error:", err)
    }
  }

  if (!canApproveProposals) {
    return (
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription className="font-[Manrope]">
          Bu sayfaya erişim yetkiniz yok.
        </AlertDescription>
      </Alert>
    )
  }

  const pendingTopics = topics.filter((t) => t.status === "pending")

  if (pendingTopics.length === 0) {
    return (
      <Card>
        <CardContent className="p-6 sm:p-8 text-center">
          <Clock className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <p className="font-[Manrope] text-[#4d4d4d] dark:text-foreground font-semibold">
            Onay bekleyen başlık yok
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {pendingTopics.map((topic) => (
        <Card key={topic.id} className="bg-white dark:bg-card rounded-[20px] shadow-[0_4px_20px_rgba(0,0,0,0.06)] dark:shadow-lg border border-border">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <Avatar className="w-10 h-10">
                    <AvatarFallback className="bg-[#03624c] text-white font-[Manrope] font-bold">
                      {topic.author.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-[Manrope] text-[#4d4d4d] dark:text-foreground font-bold">
                      {topic.author.name}
                    </p>
                    <p className="font-[Manrope] text-[#4d4d4d]/60 dark:text-muted-foreground text-sm">
                      {format(new Date(topic.createdAt), "dd MMMM yyyy, HH:mm", { locale: tr })}
                    </p>
                  </div>
                </div>
                <h3 className="font-[Manrope] text-[#4d4d4d] dark:text-foreground font-extrabold text-xl sm:text-2xl mt-3">
                  {topic.title}
                </h3>
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant="outline" className="font-[Manrope]">
                    {topic.category}
                  </Badge>
                  {topic.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="font-[Manrope] text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
              <Badge className="bg-yellow-500 text-white font-[Manrope] font-bold">
                <Clock className="w-3 h-3 mr-1" />
                Onay Bekliyor
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="bg-[#f2f4f3] dark:bg-accent rounded-xl p-4 mb-4">
              <p className="font-[Manrope] text-[#4d4d4d] dark:text-foreground leading-relaxed">
                {topic.content.substring(0, 300)}...
              </p>
            </div>

            {rejectingId === topic.id ? (
              <div className="space-y-3">
                <textarea
                  value={rejectReason}
                  onChange={(e) => setRejectReason(e.target.value)}
                  placeholder="Red nedeni..."
                  className="w-full p-3 border rounded-lg font-[Manrope] text-sm"
                  rows={3}
                />
                <div className="flex gap-2">
                <Button
                  onClick={async () => {
                    if (rejectReason.trim()) {
                      await handleReject(topic.id, rejectReason)
                      setRejectingId(null)
                      setRejectReason("")
                    }
                  }}
                    variant="destructive"
                    size="sm"
                    className="font-[Manrope]"
                    disabled={!rejectReason.trim()}
                  >
                    Reddet
                  </Button>
                  <Button
                    onClick={() => {
                      setRejectingId(null)
                      setRejectReason("")
                    }}
                    variant="outline"
                    size="sm"
                    className="font-[Manrope]"
                  >
                    İptal
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex gap-2">
                <Button
                  onClick={() => handleApprove(topic.id)}
                  className="bg-[#03624c] hover:bg-[#03624c]/90 font-[Manrope] font-bold"
                >
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  Onayla
                </Button>
                <Button
                  onClick={() => setRejectingId(topic.id)}
                  variant="destructive"
                  className="font-[Manrope] font-bold"
                >
                  <XCircle className="w-4 h-4 mr-2" />
                  Reddet
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

