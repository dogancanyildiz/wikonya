"use client"

import { useState } from "react"
import { usePermissions } from "@/lib/utils/hooks/use-permissions"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, Save, Loader2 } from "lucide-react"
import { COIN_MATRIX } from "@/lib/constants"
import { getConversionConfig } from "@/lib/constants/conversion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AdminDashboard } from "@/components/features/admin/admin-dashboard"

export default function AdminPage() {
  const { canAccessAdminPanel } = usePermissions()
  const [isSaving, setIsSaving] = useState(false)
  const [conversionRate, setConversionRate] = useState(getConversionConfig().rate.toString())
  const [minAmount, setMinAmount] = useState(getConversionConfig().minAmount.toString())
  const [maxAmountPerDay, setMaxAmountPerDay] = useState(
    getConversionConfig().maxAmountPerDay?.toString() || ""
  )

  if (!canAccessAdminPanel) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 py-4 sm:py-6 md:py-8">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="font-[Manrope]">
            Bu sayfaya erişim yetkiniz yok. Admin paneli için &quot;Konya Bilgesi&quot; rolü gereklidir.
          </AlertDescription>
        </Alert>
      </div>
    )
  }

  const handleSaveConversion = async () => {
    setIsSaving(true)
    try {
      // Gerçek uygulamada API çağrısı yapılacak
      await new Promise((resolve) => setTimeout(resolve, 1000))
      // Başarı mesajı gösterilebilir
    } catch (err) {
      console.error(err)
    } finally {
      setIsSaving(false)
    }
  }

  const handleSaveCoinMatrix = async () => {
    setIsSaving(true)
    try {
      // Gerçek uygulamada API çağrısı yapılacak
      await new Promise((resolve) => setTimeout(resolve, 1000))
      // Başarı mesajı gösterilebilir
    } catch (err) {
      console.error(err)
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 py-4 sm:py-6 md:py-8">
      <div className="mb-4 sm:mb-6">
        <h1 className="font-[Manrope] text-foreground font-extrabold text-2xl sm:text-3xl md:text-4xl mb-2">
          KBB Admin Paneli
        </h1>
        <p className="font-[Manrope] text-foreground/60 dark:text-muted-foreground text-sm sm:text-base">
          Platform ayarlarını ve coin sistemini yönetin
        </p>
      </div>

      <Tabs defaultValue="dashboard" className="w-full">
        <TabsList className="grid w-full grid-cols-3 font-[Manrope] mb-4 sm:mb-6 text-xs sm:text-sm">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="conversion">Dönüşüm Oranı</TabsTrigger>
          <TabsTrigger value="coin-matrix">Coin Matrisi</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard">
          <AdminDashboard />
        </TabsContent>

        <TabsContent value="conversion">
          <Card>
            <CardHeader>
              <CardTitle className="font-[Manrope] text-foreground font-bold text-xl sm:text-2xl">
                Dönüşüm Oranı Yönetimi
              </CardTitle>
              <CardDescription className="font-[Manrope]">
                GençCoin&apos;lerin Kültür Kart puanına dönüşüm oranını ayarlayın
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="conversion-rate" className="font-[Manrope] font-bold">
                  Dönüşüm Oranı
                </Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="conversion-rate"
                    type="number"
                    value={conversionRate}
                    onChange={(e) => setConversionRate(e.target.value)}
                    className="font-[Manrope]"
                    disabled={isSaving}
                  />
                  <span className="font-[Manrope] text-sm text-muted-foreground">
                    GençCoin = 1 Kültür Kart Puanı
                  </span>
                </div>
                <p className="text-xs text-muted-foreground font-[Manrope]">
                  Örnek: 100 girerseniz, 100 GençCoin = 1 Kültür Kart Puanı olur
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="min-amount" className="font-[Manrope] font-bold">
                  Minimum Dönüşüm Miktarı
                </Label>
                <Input
                  id="min-amount"
                  type="number"
                  value={minAmount}
                  onChange={(e) => setMinAmount(e.target.value)}
                  className="font-[Manrope]"
                  disabled={isSaving}
                />
                <p className="text-xs text-muted-foreground font-[Manrope]">
                  Kullanıcılar bu miktardan az dönüşüm yapamaz
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="max-amount-per-day" className="font-[Manrope] font-bold">
                  Günlük Maksimum Dönüşüm (Opsiyonel)
                </Label>
                <Input
                  id="max-amount-per-day"
                  type="number"
                  value={maxAmountPerDay}
                  onChange={(e) => setMaxAmountPerDay(e.target.value)}
                  className="font-[Manrope]"
                  disabled={isSaving}
                  placeholder="Sınırsız için boş bırakın"
                />
                <p className="text-xs text-muted-foreground font-[Manrope]">
                  Bir kullanıcı günde en fazla bu kadar GençCoin dönüştürebilir
                </p>
              </div>

              <Button
                onClick={handleSaveConversion}
                disabled={isSaving}
                className="bg-primary hover:bg-primary/90 font-[Manrope] font-bold"
              >
                {isSaving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Kaydediliyor...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Kaydet
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="coin-matrix">
          <Card>
            <CardHeader>
              <CardTitle className="font-[Manrope] text-foreground font-bold text-xl sm:text-2xl">
                Coin Kazanma Matrisi
              </CardTitle>
              <CardDescription className="font-[Manrope]">
                Her eylem için &quot;Yeni Gelen&quot; rolüne verilecek base coin miktarını ayarlayın
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="font-[Manrope] font-bold">Yeni Başlık Açma</Label>
                    <Input
                      type="number"
                      defaultValue={COIN_MATRIX.createTopic}
                      className="font-[Manrope]"
                      disabled={isSaving}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="font-[Manrope] font-bold">Wiki Düzenleme</Label>
                    <Input
                      type="number"
                      defaultValue={COIN_MATRIX.editWiki}
                      className="font-[Manrope]"
                      disabled={isSaving}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="font-[Manrope] font-bold">Yorum Yazma</Label>
                    <Input
                      type="number"
                      defaultValue={COIN_MATRIX.comment}
                      className="font-[Manrope]"
                      disabled={isSaving}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="font-[Manrope] font-bold">Wiki Yararlı Oyu</Label>
                    <Input
                      type="number"
                      defaultValue={COIN_MATRIX.wikiVoteUseful}
                      className="font-[Manrope]"
                      disabled={isSaving}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="font-[Manrope] font-bold">Wiki Yararsız Oyu</Label>
                    <Input
                      type="number"
                      defaultValue={COIN_MATRIX.wikiVoteNotUseful}
                      className="font-[Manrope]"
                      disabled={isSaving}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="font-[Manrope] font-bold">Yorum Beğenme</Label>
                    <Input
                      type="number"
                      defaultValue={COIN_MATRIX.commentLike}
                      className="font-[Manrope]"
                      disabled={isSaving}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="font-[Manrope] font-bold">Mantıklı Yorum</Label>
                    <Input
                      type="number"
                      defaultValue={COIN_MATRIX.commentLogical}
                      className="font-[Manrope]"
                      disabled={isSaving}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="font-[Manrope] font-bold">Sosyal Sorumluluk Projesi</Label>
                    <Input
                      type="number"
                      defaultValue={COIN_MATRIX.socialResponsibilityProject}
                      className="font-[Manrope]"
                      disabled={isSaving}
                    />
                  </div>
                </div>

                <Button
                  onClick={handleSaveCoinMatrix}
                  disabled={isSaving}
                  className="bg-primary hover:bg-primary/90 font-[Manrope] font-bold mt-4"
                >
                  {isSaving ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Kaydediliyor...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Coin Matrisini Kaydet
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

