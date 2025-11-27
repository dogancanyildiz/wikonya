"use client"

import { useState } from "react"
import { useApp } from "@/contexts/app-context"
import { useCoinReward } from "@/lib/utils/hooks/use-coin-reward"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { 
  AlertCircle, 
  Copy, 
  CheckCircle2, 
  Gift, 
  Users, 
  Share2,
  Calendar,
  Sparkles
} from "lucide-react"

interface InvitedUser {
  id: number
  name: string
  initials: string
  joinedAt: string
  coinsEarned: number
}

export default function InvitePage() {
  const { state } = useApp()
  const { addCustomCoins } = useCoinReward()
  const [copied, setCopied] = useState(false)
  const [referralCode, setReferralCode] = useState("")
  const [isRedeeming, setIsRedeeming] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const user = state.user

  // Mock data
  const invitedUsers: InvitedUser[] = [
    { id: 1, name: "Ahmet Yılmaz", initials: "AY", joinedAt: "2 hafta önce", coinsEarned: 100 },
    { id: 2, name: "Zeynep Kaya", initials: "ZK", joinedAt: "1 ay önce", coinsEarned: 100 },
    { id: 3, name: "Mehmet Demir", initials: "MD", joinedAt: "2 ay önce", coinsEarned: 100 },
  ]

  const totalEarnedFromReferrals = invitedUsers.reduce((sum, u) => sum + u.coinsEarned, 0)

  if (!user) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="font-[Manrope] text-[#4d4d4d] dark:text-foreground">
          Lütfen giriş yapın
        </p>
      </div>
    )
  }

  const userReferralCode = `REF-${user.id}-${user.name.substring(0, 3).toUpperCase()}`
  const referralLink = typeof window !== "undefined" 
    ? `${window.location.origin}/auth/register?ref=${userReferralCode}`
    : ""

  const handleCopy = async () => {
    if (referralLink) {
      try {
        await navigator.clipboard.writeText(referralLink)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      } catch (err) {
        console.error("Copy failed:", err)
      }
    }
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'WikiKonya\'ya Katıl!',
          text: 'WikiKonya\'ya katıl, bilgi paylaş, GençCoin kazan!',
          url: referralLink,
        })
      } catch (err) {
        console.error("Share failed:", err)
      }
    } else {
      handleCopy()
    }
  }

  const handleRedeemCode = async () => {
    if (!referralCode.trim()) {
      setError("Referans kodu girin")
      return
    }

    setIsRedeeming(true)
    setError(null)
    setSuccess(false)

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      addCustomCoins(100, "Referans kodu kullanımı")
      setSuccess(true)
      setReferralCode("")
      setTimeout(() => setSuccess(false), 3000)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Kod kullanılırken bir hata oluştu")
    } finally {
      setIsRedeeming(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Başlık */}
      <div>
        <h1 className="font-[Manrope] text-[#4d4d4d] dark:text-foreground font-bold text-2xl sm:text-3xl">
          Arkadaşını Davet Et
        </h1>
        <p className="font-[Manrope] text-[#4d4d4d]/60 dark:text-muted-foreground mt-1">
          Arkadaşlarını davet et, ikiniz de GençCoin kazanın!
        </p>
      </div>

      {/* İstatistikler */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-[#03624c] to-[#024d3c] rounded-[20px] border-0">
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="font-[Manrope] text-white font-bold text-2xl">
                  {invitedUsers.length}
                </p>
                <p className="font-[Manrope] text-white/80 text-sm">
                  Davet Edilen
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-card rounded-[20px] shadow-[0_4px_20px_rgba(0,0,0,0.06)] dark:shadow-lg border border-border">
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-500/20 rounded-xl flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
              </div>
              <div>
                <p className="font-[Manrope] text-[#4d4d4d] dark:text-foreground font-bold text-2xl">
                  +{totalEarnedFromReferrals}
                </p>
                <p className="font-[Manrope] text-[#4d4d4d]/60 dark:text-muted-foreground text-sm">
                  Kazanılan Coin
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-card rounded-[20px] shadow-[0_4px_20px_rgba(0,0,0,0.06)] dark:shadow-lg border border-border">
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-[#03624c]/10 dark:bg-[#03624c]/20 rounded-xl flex items-center justify-center">
                <Gift className="w-6 h-6 text-[#03624c]" />
              </div>
              <div>
                <p className="font-[Manrope] text-[#4d4d4d] dark:text-foreground font-bold text-2xl">
                  100
                </p>
                <p className="font-[Manrope] text-[#4d4d4d]/60 dark:text-muted-foreground text-sm">
                  Davet Başına Coin
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Davet Kartı */}
      <Card className="bg-gradient-to-br from-[#03624c] to-[#024d3c] rounded-[20px] border-0">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Gift className="w-6 h-6 text-white" />
            <CardTitle className="font-[Manrope] text-white font-bold text-lg sm:text-xl">
              Davet Linkini Paylaş
            </CardTitle>
          </div>
          <CardDescription className="font-[Manrope] text-white/80">
            Arkadaşın bu linkle kayıt olduğunda ikiniz de 100 GençCoin kazanacaksınız!
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && (
            <Alert variant="destructive" className="bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription className="font-[Manrope]">{error}</AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
              <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
              <AlertDescription className="font-[Manrope] text-green-700 dark:text-green-300">
                Tebrikler! 100 GençCoin kazandınız!
              </AlertDescription>
            </Alert>
          )}

          {/* Referral Link */}
          <div className="space-y-2">
            <Label className="font-[Manrope] font-bold text-white">
              Davet Linkiniz
            </Label>
            <div className="flex gap-2">
              <Input
                value={referralLink}
                readOnly
                className="font-[Manrope] bg-white/10 border-white/20 text-white placeholder:text-white/50"
              />
              <Button
                onClick={handleCopy}
                variant="outline"
                className="bg-white/10 border-white/20 text-white hover:bg-white/20 font-[Manrope] font-bold"
              >
                {copied ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 mr-2" />
                    Kopyalandı!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 mr-2" />
                    Kopyala
                  </>
                )}
              </Button>
              <Button
                onClick={handleShare}
                className="bg-white text-[#03624c] hover:bg-white/90 font-[Manrope] font-bold"
              >
                <Share2 className="w-4 h-4 mr-2" />
                Paylaş
              </Button>
            </div>
          </div>

          {/* Referral Code */}
          <div className="flex items-center gap-3 pt-4 border-t border-white/20">
            <div className="flex-1">
              <p className="font-[Manrope] text-sm text-white/80 mb-1">Davet Kodunuz:</p>
              <p className="font-[Manrope] font-bold text-xl text-white tracking-wider">
                {userReferralCode}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Referans Kodu Kullan */}
      <Card className="bg-white dark:bg-card rounded-[20px] shadow-[0_4px_20px_rgba(0,0,0,0.06)] dark:shadow-lg border border-border">
        <CardHeader>
          <CardTitle className="font-[Manrope] text-[#4d4d4d] dark:text-foreground font-bold text-lg">
            Referans Kodu Kullan
          </CardTitle>
          <CardDescription className="font-[Manrope]">
            Bir arkadaşının davet koduyla kayıt olduysan, buraya gir ve 100 GençCoin kazan!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Input
              value={referralCode}
              onChange={(e) => {
                setReferralCode(e.target.value)
                setError(null)
              }}
              placeholder="Referans kodunu buraya yapıştır"
              className="font-[Manrope]"
              disabled={isRedeeming}
            />
            <Button
              onClick={handleRedeemCode}
              disabled={isRedeeming || !referralCode.trim()}
              className="bg-[#03624c] hover:bg-[#03624c]/90 font-[Manrope] font-bold"
            >
              {isRedeeming ? "Kullanılıyor..." : "Kullan"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Davet Edilen Kullanıcılar */}
      <Card className="bg-white dark:bg-card rounded-[20px] shadow-[0_4px_20px_rgba(0,0,0,0.06)] dark:shadow-lg border border-border">
        <CardHeader>
          <CardTitle className="font-[Manrope] text-[#4d4d4d] dark:text-foreground font-bold text-lg">
            Davet Ettiğin Arkadaşlar
          </CardTitle>
        </CardHeader>
        <CardContent>
          {invitedUsers.length > 0 ? (
            <div className="space-y-3">
              {invitedUsers.map((invitedUser) => (
                <div
                  key={invitedUser.id}
                  className="flex items-center gap-4 p-4 bg-[#f2f4f3] dark:bg-accent rounded-xl"
                >
                  <Avatar className="w-12 h-12">
                    <AvatarFallback className="bg-[#03624c] text-white font-[Manrope] font-bold">
                      {invitedUser.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="font-[Manrope] font-bold text-sm text-[#4d4d4d] dark:text-foreground">
                      {invitedUser.name}
                    </p>
                    <div className="flex items-center gap-1 text-[#4d4d4d]/50 dark:text-muted-foreground">
                      <Calendar className="w-3 h-3" />
                      <span className="font-[Manrope] text-xs">{invitedUser.joinedAt}</span>
                    </div>
                  </div>
                  <Badge className="bg-[#03624c] text-white font-[Manrope] font-bold">
                    +{invitedUser.coinsEarned} GençCoin
                  </Badge>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-[#f2f4f3] dark:bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-[#4d4d4d]/30 dark:text-muted-foreground" />
              </div>
              <p className="font-[Manrope] text-[#4d4d4d]/60 dark:text-muted-foreground">
                Henüz kimseyi davet etmedin
              </p>
              <p className="font-[Manrope] text-[#4d4d4d]/40 dark:text-muted-foreground text-sm mt-1">
                Davet linkini paylaşarak GençCoin kazanmaya başla!
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

