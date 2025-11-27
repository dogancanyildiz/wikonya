"use client"

import { useState } from "react"
import { Calendar, User, RotateCcw, CheckCircle2, XCircle } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { WikiRevision } from "@/lib/types"
import { usePermissions } from "@/lib/utils/hooks/use-permissions"
// Date formatting helper
const monthNames = ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"]

interface WikiHistoryProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  revisions: WikiRevision[]
  currentVersion: number
  onRevert?: (revisionId: number) => void
}

export function WikiHistory({
  open,
  onOpenChange,
  revisions,
  currentVersion,
  onRevert,
}: WikiHistoryProps) {
  const { canEditWiki } = usePermissions()
  const [selectedRevision, setSelectedRevision] = useState<WikiRevision | null>(null)

  const handleRevert = (revisionId: number) => {
    if (onRevert) {
      onRevert(revisionId)
      onOpenChange(false)
    }
  }

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString)
      const day = date.getDate()
      const month = monthNames[date.getMonth()]
      const year = date.getFullYear()
      const hours = date.getHours().toString().padStart(2, "0")
      const minutes = date.getMinutes().toString().padStart(2, "0")
      return `${day} ${month} ${year}, ${hours}:${minutes}`
    } catch {
      return dateString
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="font-[Manrope] text-[#4d4d4d] dark:text-foreground font-bold text-xl sm:text-2xl">
            Wiki Sürüm Geçmişi
          </DialogTitle>
          <DialogDescription className="font-[Manrope] text-[#4d4d4d]/60 dark:text-muted-foreground">
            Tüm düzenleme geçmişini görüntüleyin ve isterseniz önceki bir sürüme geri dönün.
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Revision List */}
          <div className="lg:col-span-1">
            <ScrollArea className="h-[500px] pr-4">
              <div className="space-y-2">
                {revisions.length > 0 ? (
                  revisions.map((revision) => (
                    <Card
                      key={revision.id}
                      className={`cursor-pointer transition-all ${
                        revision.version === currentVersion
                          ? "border-2 border-[#03624c] bg-[#03624c]/5 dark:bg-[#03624c]/10"
                          : "hover:border-[#03624c]/50"
                      }`}
                      onClick={() => {
                        setSelectedRevision(revision)
                      }}
                    >
                      <CardContent className="p-3 sm:p-4">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <Badge
                              variant={revision.version === currentVersion ? "default" : "outline"}
                              className={`font-[Manrope] font-bold text-xs ${
                                revision.version === currentVersion
                                  ? "bg-[#03624c] text-white"
                                  : ""
                              }`}
                            >
                              v{revision.version}
                            </Badge>
                            {revision.version === currentVersion && (
                              <Badge variant="outline" className="font-[Manrope] text-xs">
                                Mevcut
                              </Badge>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center gap-2 mb-2">
                          <Avatar className="w-6 h-6">
                            <AvatarFallback className="bg-[#03624c] text-white text-[10px] font-[Manrope] font-bold">
                              {revision.author.initials}
                            </AvatarFallback>
                          </Avatar>
                          <span className="font-[Manrope] text-xs sm:text-sm font-semibold text-[#4d4d4d] dark:text-foreground">
                            {revision.author.name}
                          </span>
                        </div>

                        <div className="flex items-center gap-1.5 text-[#4d4d4d]/60 dark:text-muted-foreground mb-2">
                          <Calendar className="w-3 h-3" />
                          <span className="font-[Manrope] text-[10px] sm:text-xs">
                            {formatDate(revision.createdAt)}
                          </span>
                        </div>

                        {revision.changeSummary && (
                          <p className="font-[Manrope] text-xs text-[#4d4d4d]/70 dark:text-muted-foreground line-clamp-2">
                            {revision.changeSummary}
                          </p>
                        )}

                        {revision.version !== currentVersion && canEditWiki && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="mt-2 w-full font-[Manrope] text-xs"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleRevert(revision.id)
                            }}
                          >
                            <RotateCcw className="w-3 h-3 mr-1.5" />
                            Bu Sürüme Dön
                          </Button>
                        )}
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <p className="font-[Manrope] text-[#4d4d4d]/60 dark:text-muted-foreground text-sm">
                      Henüz sürüm geçmişi yok
                    </p>
                  </div>
                )}
              </div>
            </ScrollArea>
          </div>

          {/* Revision Content */}
          <div className="lg:col-span-2">
            {selectedRevision ? (
              <div className="space-y-4">
                <Card>
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="font-[Manrope] text-[#4d4d4d] dark:text-foreground font-bold text-lg sm:text-xl mb-2">
                          Sürüm {selectedRevision.version}
                        </h3>
                        <div className="flex items-center gap-4 text-sm text-[#4d4d4d]/60 dark:text-muted-foreground">
                          <div className="flex items-center gap-1.5">
                            <User className="w-4 h-4" />
                            <span className="font-[Manrope]">{selectedRevision.author.name}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Calendar className="w-4 h-4" />
                            <span className="font-[Manrope]">{formatDate(selectedRevision.createdAt)}</span>
                          </div>
                        </div>
                      </div>
                      {selectedRevision.version === currentVersion && (
                        <Badge className="bg-[#03624c] text-white font-[Manrope] font-bold">
                          <CheckCircle2 className="w-3 h-3 mr-1" />
                          Mevcut Sürüm
                        </Badge>
                      )}
                    </div>

                    {selectedRevision.changeSummary && (
                      <div className="mb-4 p-3 bg-[#f2f4f3] dark:bg-accent rounded-lg">
                        <p className="font-[Manrope] text-sm text-[#4d4d4d] dark:text-foreground">
                          <strong>Değişiklik Özeti:</strong> {selectedRevision.changeSummary}
                        </p>
                      </div>
                    )}

                    <div className="bg-[#f2f4f3] dark:bg-accent rounded-xl p-4">
                      <p className="font-[Manrope] text-[#4d4d4d] dark:text-foreground leading-relaxed text-sm sm:text-base whitespace-pre-wrap">
                        {selectedRevision.content}
                      </p>
                    </div>

                    {selectedRevision.version !== currentVersion && canEditWiki && (
                      <div className="mt-4 flex justify-end">
                        <Button
                          onClick={() => handleRevert(selectedRevision.id)}
                          className="bg-[#03624c] hover:bg-[#03624c]/90 font-[Manrope] font-bold"
                        >
                          <RotateCcw className="w-4 h-4 mr-2" />
                          Bu Sürüme Geri Dön
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            ) : (
              <div className="flex items-center justify-center h-[500px]">
                <div className="text-center">
                  <XCircle className="w-12 h-12 text-[#4d4d4d]/30 dark:text-muted-foreground/30 mx-auto mb-3" />
                  <p className="font-[Manrope] text-[#4d4d4d]/60 dark:text-muted-foreground">
                    Bir sürüm seçin
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

