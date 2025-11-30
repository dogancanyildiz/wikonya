"use client"

import { useState } from "react"
import { usePermissions } from "@/lib/utils/hooks/use-permissions"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, CheckCircle2, XCircle, Clock } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { WikiEditProposal } from "@/lib/types"
import { format } from "date-fns"
import { tr } from "date-fns/locale"

interface WikiProposalListProps {
  proposals: WikiEditProposal[]
  onApprove?: (proposalId: number) => void
  onReject?: (proposalId: number, reason: string) => void
}

export function WikiProposalList({
  proposals,
  onApprove,
  onReject,
}: WikiProposalListProps) {
  const { canApproveProposals } = usePermissions()
  const [rejectingId, setRejectingId] = useState<number | null>(null)
  const [rejectReason, setRejectReason] = useState("")
  const [selectedProposals, setSelectedProposals] = useState<number[]>([])

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

  const pendingProposals = proposals.filter((p) => p.status === "pending")

  const handleSelectAll = () => {
    if (selectedProposals.length === pendingProposals.length) {
      setSelectedProposals([])
    } else {
      setSelectedProposals(pendingProposals.map(p => p.id))
    }
  }

  const handleSelectProposal = (proposalId: number) => {
    if (selectedProposals.includes(proposalId)) {
      setSelectedProposals(selectedProposals.filter(id => id !== proposalId))
    } else {
      setSelectedProposals([...selectedProposals, proposalId])
    }
  }

  const handleBulkApprove = async () => {
    for (const proposalId of selectedProposals) {
      onApprove?.(proposalId)
    }
    setSelectedProposals([])
  }

  const handleBulkReject = async () => {
    if (!rejectReason.trim()) {
      alert("Red nedeni girmelisiniz")
      return
    }
    for (const proposalId of selectedProposals) {
      onReject?.(proposalId, rejectReason)
    }
    setSelectedProposals([])
    setRejectReason("")
  }

  if (pendingProposals.length === 0) {
    return (
      <Card>
        <CardContent className="p-6 sm:p-8 text-center">
          <Clock className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <p className="font-[Manrope] text-foreground font-semibold">
            Onay bekleyen düzenleme teklifi yok
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {/* Bulk Actions */}
      {pendingProposals.length > 0 && (
        <Card className="bg-card border border-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Checkbox
                  checked={selectedProposals.length === pendingProposals.length}
                  onCheckedChange={handleSelectAll}
                  className="font-[Manrope]"
                />
                <span className="font-[Manrope] font-semibold text-sm text-foreground">
                  {selectedProposals.length > 0 
                    ? `${selectedProposals.length} öğe seçildi`
                    : "Tümünü seç"
                  }
                </span>
              </div>
              {selectedProposals.length > 0 && (
                <div className="flex items-center gap-2">
                  <Button
                    onClick={handleBulkApprove}
                    size="sm"
                    className="bg-primary hover:bg-primary/90 font-[Manrope] font-bold"
                  >
                    <CheckCircle2 className="w-4 h-4 mr-2" />
                    Toplu Onayla ({selectedProposals.length})
                  </Button>
                  <Button
                    onClick={() => {
                      const reason = prompt("Red nedeni:")
                      if (reason) {
                        setRejectReason(reason)
                        handleBulkReject()
                      }
                    }}
                    variant="destructive"
                    size="sm"
                    className="font-[Manrope] font-bold"
                  >
                    <XCircle className="w-4 h-4 mr-2" />
                    Toplu Reddet ({selectedProposals.length})
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {pendingProposals.map((proposal) => (
        <Card key={proposal.id} className="bg-card rounded-xl shadow-md dark:shadow-lg border border-border">
          <CardHeader>
            <div className="flex items-start justify-between gap-4">
              <Checkbox
                checked={selectedProposals.includes(proposal.id)}
                onCheckedChange={() => handleSelectProposal(proposal.id)}
                className="mt-1"
              />
              <div className="flex items-center gap-3">
                <Avatar className="w-10 h-10">
                  <AvatarFallback className="bg-primary text-white font-[Manrope] font-bold">
                    {proposal.author.initials}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-[Manrope] text-foreground font-bold">
                    {proposal.author.name}
                  </p>
                  <p className="font-[Manrope] text-foreground/60 dark:text-muted-foreground text-sm">
                    {format(new Date(proposal.createdAt), "dd MMMM yyyy, HH:mm", { locale: tr })}
                  </p>
                </div>
              </div>
              <Badge className="bg-yellow-500 text-white font-[Manrope] font-bold">
                <Clock className="w-3 h-3 mr-1" />
                Onay Bekliyor
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-[Manrope] font-bold text-sm mb-2 text-foreground">
                  Mevcut İçerik:
                </h4>
                <div className="bg-accent rounded-xl p-4">
                  <p className="font-[Manrope] text-sm text-foreground">
                    {proposal.currentContent.substring(0, 200)}...
                  </p>
                </div>
              </div>

              <div>
                <h4 className="font-[Manrope] font-bold text-sm mb-2 text-foreground">
                  Önerilen İçerik:
                </h4>
                <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-4 border border-green-200 dark:border-green-800">
                  <p className="font-[Manrope] text-sm text-foreground">
                    {proposal.proposedContent.substring(0, 200)}...
                  </p>
                </div>
              </div>

              {rejectingId === proposal.id ? (
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
                      onClick={() => {
                        if (onReject && rejectReason.trim()) {
                          onReject(proposal.id, rejectReason)
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
                    onClick={() => onApprove?.(proposal.id)}
                    className="bg-primary hover:bg-primary/90 font-[Manrope] font-bold"
                  >
                    <CheckCircle2 className="w-4 h-4 mr-2" />
                    Onayla
                  </Button>
                  <Button
                    onClick={() => setRejectingId(proposal.id)}
                    variant="destructive"
                    className="font-[Manrope] font-bold"
                  >
                    <XCircle className="w-4 h-4 mr-2" />
                    Reddet
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

