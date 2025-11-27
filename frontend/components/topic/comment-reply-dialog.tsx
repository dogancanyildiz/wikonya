"use client"

import { useState } from "react"
import { useApp } from "@/contexts/app-context"
import { useCoinReward } from "@/lib/utils/hooks/use-coin-reward"
import { performAction, getRemainingActions } from "@/lib/gamification/rate-limiter"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, Loader2 } from "lucide-react"

interface CommentReplyDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  parentCommentId: number
  parentAuthor: string
  onReply?: (replyContent: string, parentCommentId: number) => void
}

export function CommentReplyDialog({
  open,
  onOpenChange,
  parentCommentId,
  parentAuthor,
  onReply,
}: CommentReplyDialogProps) {
  const { state } = useApp()
  const { rewardCoins } = useCoinReward()
  const [replyContent, setReplyContent] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async () => {
    if (!state.user) {
      setError("Yanıt vermek için giriş yapmalısınız.")
      return
    }

    if (!replyContent.trim()) {
      setError("Yanıt içeriği boş olamaz.")
      return
    }

    const remainingActions = getRemainingActions(state.user, "comment")
    if (remainingActions.limit !== null && remainingActions.remaining <= 0) {
      setError(`Yorum limitinizi aştınız. Lütfen 1 saat sonra tekrar deneyin.`)
      return
    }

    setIsSubmitting(true)
    setError(null)

    try {
      // Simüle edilmiş API çağrısı
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Rate limiter'a eylemi kaydet
      const result = performAction(state.user, "comment")
      if (!result.success) {
        setError(result.reason || "Yorum gönderilemedi")
        setIsSubmitting(false)
        return
      }

      // Coin kazanma
      rewardCoins("comment", { commentId: parentCommentId, type: "reply" })

      // Callback çağır
      if (onReply) {
        onReply(replyContent, parentCommentId)
      }

      setReplyContent("")
      onOpenChange(false)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Yanıt gönderilirken bir hata oluştu")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCancel = () => {
    setReplyContent("")
    setError(null)
    onOpenChange(false)
  }

  const remainingComments = state.user ? getRemainingActions(state.user, "comment") : null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="font-[Manrope] text-[#4d4d4d] dark:text-foreground font-bold text-xl sm:text-2xl">
            Yanıt Ver
          </DialogTitle>
          <DialogDescription className="font-[Manrope] text-[#4d4d4d]/60 dark:text-muted-foreground">
            {parentAuthor} kullanıcısına yanıt veriyorsunuz
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription className="font-[Manrope]">{error}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <Textarea
              value={replyContent}
              onChange={(e) => {
                setReplyContent(e.target.value)
                setError(null)
              }}
              placeholder="Yanıtınızı buraya yazın..."
              className="min-h-[150px] font-[Manrope] text-sm"
              disabled={isSubmitting}
            />
            {remainingComments !== null && remainingComments.limit !== null && (
              <p className="text-xs text-muted-foreground font-[Manrope]">
                Kalan yorum hakkı: {remainingComments.remaining} / {remainingComments.limit} ({remainingComments.timeWindow})
              </p>
            )}
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={handleCancel}
            disabled={isSubmitting}
            className="font-[Manrope]"
          >
            İptal
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting || !replyContent.trim() || (remainingComments !== null && remainingComments.limit !== null && remainingComments.remaining <= 0)}
            className="bg-[#03624c] hover:bg-[#03624c]/90 font-[Manrope] font-bold"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Gönderiliyor...
              </>
            ) : (
              "Yanıt Gönder"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

