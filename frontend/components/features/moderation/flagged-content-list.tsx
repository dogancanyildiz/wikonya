"use client"

import { useState } from "react"
import { usePermissions } from "@/lib/utils/hooks/use-permissions"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, CheckCircle2, XCircle, Flag, Clock } from "lucide-react"

interface FlaggedItem {
  id: number
  type: "topic" | "comment" | "wiki"
  title: string
  content: string
  author: {
    id: number
    name: string
    initials: string
  }
  flaggedBy: {
    id: number
    name: string
    initials: string
  }
  reason: string
  flaggedAt: string
  status: "pending" | "resolved" | "dismissed"
  topicId?: number
}

interface FlaggedContentListProps {
  items: FlaggedItem[]
  onResolve?: (itemId: number, action: "resolve" | "dismiss") => void
}

export function FlaggedContentList({
  items,
  onResolve,
}: FlaggedContentListProps) {
  const { canModerate } = usePermissions()
  const [resolvingId, setResolvingId] = useState<number | null>(null)

  if (!canModerate) {
    return (
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription className="font-[Manrope]">
          Bu sayfaya erişim yetkiniz yok.
        </AlertDescription>
      </Alert>
    )
  }

  const pendingItems = items.filter((item) => item.status === "pending")

  if (pendingItems.length === 0) {
    return (
      <Card>
        <CardContent className="p-6 sm:p-8 text-center">
          <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto mb-4" />
          <p className="font-[Manrope] text-foreground font-semibold">
            Bayraklanan içerik yok
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {pendingItems.map((item) => (
        <Card
          key={item.id}
          className="bg-card rounded-xl shadow-md dark:shadow-lg border border-border"
        >
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <Flag className="w-5 h-5 text-red-500" />
                  <Badge variant="destructive" className="font-[Manrope] font-bold">
                    {item.type === "topic" ? "Başlık" : item.type === "comment" ? "Yorum" : "Wiki"}
                  </Badge>
                  <Badge className="bg-yellow-500 text-white font-[Manrope] font-bold">
                    <Clock className="w-3 h-3 mr-1" />
                    İnceleme Bekliyor
                  </Badge>
                </div>
                <h3 className="font-[Manrope] text-foreground font-extrabold text-lg sm:text-xl mt-2">
                  {item.title}
                </h3>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Content */}
              <div className="bg-accent rounded-xl p-4">
                <p className="font-[Manrope] text-sm text-foreground leading-relaxed">
                  {item.content}
                </p>
              </div>

              {/* Author Info */}
              <div className="flex items-center gap-3">
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="bg-primary text-white font-[Manrope] font-bold text-xs">
                    {item.author.initials}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-[Manrope] text-sm font-semibold text-foreground">
                    {item.author.name}
                  </p>
                  <p className="font-[Manrope] text-xs text-foreground/60 dark:text-muted-foreground">
                    İçerik sahibi
                  </p>
                </div>
              </div>

              {/* Flag Info */}
              <div className="border-t pt-4">
                <div className="flex items-center gap-3 mb-2">
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="bg-red-500 text-white font-[Manrope] font-bold text-xs">
                      {item.flaggedBy.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-[Manrope] text-sm font-semibold text-foreground">
                      {item.flaggedBy.name} tarafından bildirildi
                    </p>
                    <p className="font-[Manrope] text-xs text-foreground/60 dark:text-muted-foreground">
                      {new Date(item.flaggedAt).toLocaleDateString("tr-TR")}
                    </p>
                  </div>
                </div>
                <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-3 mt-2">
                  <p className="font-[Manrope] text-sm font-semibold text-red-700 dark:text-red-400 mb-1">
                    Bildirim Nedeni:
                  </p>
                  <p className="font-[Manrope] text-sm text-red-600 dark:text-red-300">
                    {item.reason}
                  </p>
                </div>
              </div>

              {/* Actions */}
              {resolvingId === item.id ? (
                <div className="flex gap-2 pt-2">
                  <Button
                    onClick={() => {
                      onResolve?.(item.id, "resolve")
                      setResolvingId(null)
                    }}
                    variant="destructive"
                    size="sm"
                    className="font-[Manrope] font-bold"
                  >
                    <XCircle className="w-4 h-4 mr-2" />
                    İçeriği Kaldır
                  </Button>
                  <Button
                    onClick={() => {
                      onResolve?.(item.id, "dismiss")
                      setResolvingId(null)
                    }}
                    variant="outline"
                    size="sm"
                    className="font-[Manrope] font-bold"
                  >
                    <CheckCircle2 className="w-4 h-4 mr-2" />
                    Bildirimi Reddet
                  </Button>
                  <Button
                    onClick={() => setResolvingId(null)}
                    variant="ghost"
                    size="sm"
                    className="font-[Manrope]"
                  >
                    İptal
                  </Button>
                </div>
              ) : (
                <div className="flex gap-2 pt-2">
                  <Button
                    onClick={() => setResolvingId(item.id)}
                    className="bg-primary hover:bg-primary/90 font-[Manrope] font-bold"
                  >
                    <Flag className="w-4 h-4 mr-2" />
                    İncele
                  </Button>
                  {item.topicId && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="font-[Manrope]"
                      onClick={() => window.open(`/topic/${item.topicId}`, "_blank")}
                    >
                      İçeriği Görüntüle
                    </Button>
                  )}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

