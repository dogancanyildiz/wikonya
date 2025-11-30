"use client"

import { useState, useEffect } from "react"
import { usePermissions } from "@/lib/utils/hooks/use-permissions"
import { useCoinReward } from "@/lib/utils/hooks/use-coin-reward"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, Loader2 } from "lucide-react"
import { WikiContent } from "@/lib/types"
import { MarkdownEditor } from "./markdown-editor"

interface WikiEditDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  wikiContent: WikiContent | null
  topicId: number
  onSave?: (content: string) => void
}

export function WikiEditDialog({
  open,
  onOpenChange,
  wikiContent,
  topicId,
  onSave,
}: WikiEditDialogProps) {
  const { canEditWiki, canProposeWikiEdit } = usePermissions()
  const { rewardCoins } = useCoinReward()
  const [content, setContent] = useState(wikiContent?.content || "")
  const [changeSummary, setChangeSummary] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const canEdit = canEditWiki || canProposeWikiEdit

  // Wiki content değiştiğinde state'i güncelle
  useEffect(() => {
    if (wikiContent?.content) {
      setContent(wikiContent.content)
    }
  }, [wikiContent?.content])

  const handleSave = async () => {
    if (!content.trim()) {
      setError("İçerik boş olamaz")
      return
    }

    if (!canEdit) {
      setError("Bu içeriği düzenleme yetkiniz yok")
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      // Simüle edilmiş API çağrısı
      await new Promise((resolve) => setTimeout(resolve, 500))

      // Eğer teklif gönderiyorsa, proposal oluştur
      if (canProposeWikiEdit && !canEditWiki) {
        // Proposal oluştur (gerçek uygulamada API çağrısı)
        // Şimdilik sadece callback çağırıyoruz
        if (onSave) {
          onSave(content)
        }
        onOpenChange(false)
        return
      }

      // Coin kazanma (eğer doğrudan düzenleme yapabiliyorsa)
      if (canEditWiki) {
        rewardCoins("edit_wiki", { topicId, version: wikiContent?.version || 1 })
        // User stats güncelle
        incrementWikiEditCount(state.user)
      }

      // Callback çağır
      if (onSave) {
        onSave(content)
      }

      onOpenChange(false)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Düzenleme kaydedilirken bir hata oluştu")
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancel = () => {
    setContent(wikiContent?.content || "")
    setChangeSummary("")
    setError(null)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-[Manrope] text-foreground font-bold text-xl sm:text-2xl">
            {canEditWiki ? "Wiki İçeriğini Düzenle" : "Düzenleme Teklifi Gönder"}
          </DialogTitle>
          <DialogDescription className="font-[Manrope] text-foreground/60 dark:text-muted-foreground">
            {canEditWiki
              ? "Wiki içeriğini doğrudan düzenleyebilirsiniz. Değişiklikler anında yayınlanacaktır."
              : "Wiki içeriği için bir düzenleme teklifi gönderebilirsiniz. Teklifiniz moderatörler tarafından incelenecektir."}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <Label htmlFor="wiki-content" className="font-[Manrope] font-bold">
              Wiki İçeriği
            </Label>
            <MarkdownEditor
              value={content}
              onChange={setContent}
              placeholder="Wiki içeriğini Markdown formatında yazın..."
              minHeight="300px"
              disabled={isLoading || !canEdit}
            />
            <p className="text-xs text-muted-foreground font-[Manrope]">
              {canEditWiki
                ? "Değişiklikler anında yayınlanacak ve +10 GençCoin kazanacaksınız."
                : "Düzenleme teklifi gönderildiğinde moderatörler tarafından incelenecektir."}
            </p>
          </div>

          {canProposeWikiEdit && !canEditWiki && (
            <div className="space-y-2">
              <Label htmlFor="change-summary" className="font-[Manrope] font-bold">
                Değişiklik Özeti (Opsiyonel)
              </Label>
              <Textarea
                id="change-summary"
                value={changeSummary}
                onChange={(e) => setChangeSummary(e.target.value)}
                placeholder="Yaptığınız değişikliklerin kısa bir özeti..."
                className="min-h-[80px] font-[Manrope] text-sm"
                disabled={isLoading}
              />
            </div>
          )}
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={handleCancel}
            disabled={isLoading}
            className="font-[Manrope]"
          >
            İptal
          </Button>
          <Button
            onClick={handleSave}
            disabled={isLoading || !canEdit || !content.trim()}
            className="bg-primary hover:bg-primary/90 font-[Manrope] font-bold"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Kaydediliyor...
              </>
            ) : canEditWiki ? (
              "Kaydet ve Yayınla"
            ) : (
              "Teklif Gönder"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

