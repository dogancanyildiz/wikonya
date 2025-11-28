"use client"

import { useState } from "react"
import { useApp } from "@/contexts/app-context"
import { useCoinReward } from "@/lib/utils/hooks/use-coin-reward"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, Copy, CheckCircle2, Gift, Users } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export function ReferralSystem() {
  const { state } = useApp()
  const { addCustomCoins } = useCoinReward()
  const [copied, setCopied] = useState(false)
  const [referralCode, setReferralCode] = useState("")
  const [isRedeeming, setIsRedeeming] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const user = state.user

  if (!user) {
    return null
  }

  // Mock referral code - gerçek uygulamada user'dan gelecek
  const userReferralCode = referralCode || `REF-${user.id}-${user.name.substring(0, 3).toUpperCase()}`
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

  const handleRedeemCode = async () => {
    if (!referralCode.trim()) {
      setError("Referans kodu girin")
      return
    }

    setIsRedeeming(true)
    setError(null)
    setSuccess(false)

    try {
      // Simüle edilmiş API çağrısı
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Coin kazanma
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
    <Card className="bg-gradient-to-br from-[#03624c] to-[#024d3c] rounded-[20px] shadow-[0_4px_20px_rgba(0,0,0,0.06)] dark:shadow-lg border border-[#03624c]">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Gift className="w-6 h-6 text-white" />
          <CardTitle className="font-[Manrope] text-white font-bold text-lg sm:text-xl">
            Arkadaşını Davet Et
          </CardTitle>
        </div>
        <CardDescription className="font-[Manrope] text-white/80">
          Arkadaşını davet et, ikiniz de 100 GençCoin kazan!
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 pt-0">
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
          </div>
          <p className="text-xs text-white/70 font-[Manrope]">
            Bu linki arkadaşlarınla paylaş. Kayıt olduklarında ikiniz de 100 GençCoin kazanacaksınız!
          </p>
        </div>

        {/* Referral Code Input */}
        <div className="space-y-2 pt-4 border-t border-white/20">
          <Label className="font-[Manrope] font-bold text-white">
            Referans Kodu Kullan
          </Label>
          <div className="flex gap-2">
            <Input
              value={referralCode}
              onChange={(e) => {
                setReferralCode(e.target.value)
                setError(null)
              }}
              placeholder="Referans kodunu buraya yapıştır"
              className="font-[Manrope] bg-white/10 border-white/20 text-white placeholder:text-white/50"
              disabled={isRedeeming}
            />
            <Button
              onClick={handleRedeemCode}
              disabled={isRedeeming || !referralCode.trim()}
              className="bg-white text-[#03624c] hover:bg-white/90 font-[Manrope] font-bold"
            >
              {isRedeeming ? "Kullanılıyor..." : "Kullan"}
            </Button>
          </div>
          <p className="text-xs text-white/70 font-[Manrope]">
            Bir arkadaşının davet kodunu kullanarak kayıt olduysan, buraya gir ve 100 GençCoin kazan!
          </p>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-4 pt-4 border-t border-white/20">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-white/80" />
            <span className="font-[Manrope] text-sm text-white/80">
              Davet Edilen: <strong className="text-white">0</strong>
            </span>
          </div>
          <Badge className="bg-white/20 text-white border-white/30 font-[Manrope] font-bold">
            +100 GençCoin
          </Badge>
        </div>
      </CardContent>
    </Card>
  )
}

