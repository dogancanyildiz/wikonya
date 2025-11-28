"use client"

import { useState } from "react"
import { useApp } from "@/contexts/app-context"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, ArrowRight, Loader2, CheckCircle2 } from "lucide-react"
import { CoinIcon } from "@/components/common/icons/coin-icon"
import { getConversionRate, getConversionConfig } from "@/lib/constants/conversion"

export function CoinConverter() {
  const { state, setUser } = useApp()
  const [amount, setAmount] = useState("")
  const [isConverting, setIsConverting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const user = state.user

  if (!user) {
    return null
  }

  const conversionRate = getConversionRate()
  const conversionConfig = getConversionConfig()
  const maxAmount = Math.floor(user.totalCoins / conversionRate)
  const convertedPoints = amount ? Math.floor(Number(amount) / conversionRate) : 0
  const remainingCoins = amount ? user.totalCoins - Number(amount) : user.totalCoins

  const handleConvert = async () => {
    if (!amount || Number(amount) <= 0) {
      setError("Geçerli bir miktar girin")
      return
    }

    if (Number(amount) > user.totalCoins) {
      setError("Yeterli GençCoin bakiyeniz yok")
      return
    }

    if (Number(amount) < conversionConfig.minAmount) {
      setError(`Minimum ${conversionConfig.minAmount} GençCoin dönüştürebilirsiniz`)
      return
    }

    setIsConverting(true)
    setError(null)
    setSuccess(false)

    try {
      // Simüle edilmiş API çağrısı - gerçek uygulamada KBB API'sine istek atılacak
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Kullanıcı coin'lerini güncelle
      const newTotalCoins = user.totalCoins - Number(amount)
      setUser({
        ...user,
        totalCoins: newTotalCoins,
      })

      setSuccess(true)
      setAmount("")
      
      // Success mesajını 3 saniye sonra kaldır
      setTimeout(() => setSuccess(false), 3000)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Dönüşüm sırasında bir hata oluştu")
    } finally {
      setIsConverting(false)
    }
  }

  return (
    <Card className="rounded-xl shadow-md border-border">
      <CardHeader>
        <CardTitle className="font-[Manrope] text-foreground font-bold text-lg sm:text-xl">
          Kültür Kart&apos;a Aktar
        </CardTitle>
        <CardDescription className="font-[Manrope]">
          GençCoin&apos;lerinizi Genç Kültür Kart puanına dönüştürün
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 pt-0">
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="font-[Manrope]">{error}</AlertDescription>
          </Alert>
        )}

        {success && (
          <Alert className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
            <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
            <AlertDescription className="font-[Manrope] text-green-700 dark:text-green-300">
              Dönüşüm başarılı! Puanlarınız Kültür Kart&apos;ınıza aktarıldı.
            </AlertDescription>
          </Alert>
        )}

        <div className="space-y-2">
          <Label htmlFor="coin-amount" className="font-[Manrope] font-bold">
            Dönüştürülecek GençCoin Miktarı
          </Label>
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2">
              <CoinIcon />
            </div>
            <Input
              id="coin-amount"
              type="number"
              value={amount}
              onChange={(e) => {
                const value = e.target.value
                if (value === "" || (Number(value) >= 0 && Number(value) <= user.totalCoins)) {
                  setAmount(value)
                  setError(null)
                }
              }}
              placeholder="Miktar girin"
              className="pl-10 font-[Manrope]"
              disabled={isConverting}
              min={conversionConfig.minAmount}
              max={user.totalCoins}
            />
          </div>
          <div className="flex items-center justify-between text-xs text-muted-foreground font-[Manrope]">
            <span>Mevcut: {user.totalCoins.toLocaleString()} GençCoin</span>
            <span>Maksimum: {maxAmount * conversionRate} GençCoin</span>
          </div>
        </div>

        {/* Conversion Info */}
        <div className="bg-accent rounded-xl p-4 space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-[Manrope] font-semibold text-sm text-foreground">
              Dönüşüm Oranı:
            </span>
            <span className="font-[Manrope] font-bold text-sm text-primary">
              {conversionRate} GençCoin = 1 Kültür Kart Puanı
            </span>
          </div>
          {amount && Number(amount) >= conversionConfig.minAmount && (
            <>
              <div className="flex items-center justify-between pt-2 border-t border-border">
                <span className="font-[Manrope] font-semibold text-sm text-foreground">
                  Alacağınız Puan:
                </span>
                <span className="font-[Manrope] font-bold text-lg text-primary">
                  {convertedPoints} Puan
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-[Manrope] font-semibold text-sm text-foreground">
                  Kalan GençCoin:
                </span>
                <span className="font-[Manrope] font-bold text-sm text-foreground">
                  {remainingCoins.toLocaleString()} GençCoin
                </span>
              </div>
            </>
          )}
        </div>

        <Button
          onClick={handleConvert}
          disabled={isConverting || !amount || Number(amount) < conversionConfig.minAmount || Number(amount) > user.totalCoins}
          className="w-full bg-primary hover:bg-primary/90 font-[Manrope] font-bold"
        >
          {isConverting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Dönüştürülüyor...
            </>
          ) : (
            <>
              Dönüştür
              <ArrowRight className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>

        <p className="text-xs text-muted-foreground font-[Manrope] text-center">
          Dönüşüm işlemi geri alınamaz. Lütfen miktarı kontrol edin.
        </p>
      </CardContent>
    </Card>
  )
}

