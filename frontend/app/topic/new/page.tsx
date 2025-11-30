"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useApp } from "@/contexts/app-context"
import { usePermissions } from "@/lib/utils/hooks/use-permissions"
import { canPerformAction, performAction } from "@/lib/gamification/rate-limiter"
import { incrementTopicCount } from "@/lib/utils/user-stats"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, Loader2, ArrowLeft } from "lucide-react"
import { MarkdownEditor } from "@/components/features/topic/markdown-editor"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"

const CATEGORIES = [
  { value: "academic", label: "Akademik" },
  { value: "social", label: "Sosyal Yaşam & Mekan" },
  { value: "housing", label: "Barınma & Yaşam" },
  { value: "career", label: "Kariyer & Gelişim" },
  { value: "discovery", label: "Konya Keşif" },
] as const

export default function NewTopicPage() {
  const router = useRouter()
  const { state } = useApp()
  const { canCreateTopic } = usePermissions()
  const [title, setTitle] = useState("")
  const [category, setCategory] = useState<string>("")
  const [tags, setTags] = useState("")
  const [content, setContent] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Yetki kontrolü
  if (!state.user || !canCreateTopic) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-8 py-6 sm:py-8">
        <Card>
          <CardContent className="p-6 sm:p-8">
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription className="font-[Manrope]">
                Yeni başlık açmak için &quot;Gezgin&quot; veya üstü bir role sahip olmanız gerekiyor.
              </AlertDescription>
            </Alert>
            <div className="mt-4">
              <Link href="/">
                <Button variant="outline" className="font-[Manrope]">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Ana Sayfaya Dön
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    // Validasyon
    if (!title.trim()) {
      setError("Başlık boş olamaz")
      return
    }

    if (!category) {
      setError("Kategori seçmelisiniz")
      return
    }

    if (!content.trim()) {
      setError("İçerik boş olamaz")
      return
    }

    // Rate limit kontrolü
    const check = canPerformAction(state.user, "create_topic")
    if (!check.allowed) {
      setError(check.reason || "Başlık oluşturulamadı")
      return
    }

    setIsLoading(true)

    try {
      // Rate limit kaydı
      const result = performAction(state.user, "create_topic")
      if (!result.success) {
        setError(result.reason || "Başlık oluşturulamadı")
        setIsLoading(false)
        return
      }

      // Simüle edilmiş API çağrısı
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Yeni topic oluştur (pending status ile - onay bekliyor)
      // Coin kazanma sadece onaylandığında olacak
      // const _coinResult = rewardCoins("create_topic", { title, category })

      // User stats güncelle
      incrementTopicCount(state.user)

      // Başarılı mesajı göster
      alert("Başlığınız moderatörler tarafından incelenecek. Onaylandığında yayınlanacak ve +20 GençCoin kazanacaksınız!")

      // Dashboard'a yönlendir
      router.push("/dashboard")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Başlık oluşturulurken bir hata oluştu")
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 py-4 sm:py-6 md:py-8">
      <div className="mb-4 sm:mb-6">
        <Link href="/">
          <Button variant="ghost" className="font-[Manrope] mb-3 sm:mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            <span className="hidden sm:inline">Geri Dön</span>
          </Button>
        </Link>
        <h1 className="font-[Manrope] text-foreground font-extrabold text-2xl sm:text-3xl md:text-4xl">
          Yeni Başlık Aç
        </h1>
        <p className="font-[Manrope] text-foreground/60 dark:text-muted-foreground mt-2 text-sm sm:text-base">
          Bilgi paylaşmak için yeni bir başlık oluşturun. +20 GençCoin kazanacaksınız!
        </p>
      </div>

      <Card className="bg-white dark:bg-card rounded-[20px] shadow-[0_4px_20px_rgba(0,0,0,0.06)] dark:shadow-lg border border-border">
        <CardHeader>
          <CardTitle className="font-[Manrope] text-foreground font-bold text-xl sm:text-2xl">
            Başlık Bilgileri
          </CardTitle>
          <CardDescription className="font-[Manrope]">
            Başlığınızın onaylanması için tüm bilgileri eksiksiz doldurun
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription className="font-[Manrope]">{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="title" className="font-[Manrope] font-bold">
                Başlık *
              </Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Örn: Selçuk Hukuk Final Notları"
                className="font-[Manrope]"
                required
                disabled={isLoading}
                maxLength={200}
              />
              <p className="text-xs text-muted-foreground font-[Manrope]">
                {title.length} / 200 karakter
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="category" className="font-[Manrope] font-bold">
                Kategori *
              </Label>
              <Select value={category} onValueChange={setCategory} disabled={isLoading}>
                <SelectTrigger className="font-[Manrope]">
                  <SelectValue placeholder="Kategori seçin" />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((cat) => (
                    <SelectItem key={cat.value} value={cat.value}>
                      {cat.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="tags" className="font-[Manrope] font-bold">
                Etiketler (virgülle ayırın)
              </Label>
              <Input
                id="tags"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="Örn: Ders Notu, Hukuk Fakültesi, Final Hazırlık"
                className="font-[Manrope]"
                disabled={isLoading}
              />
              <p className="text-xs text-muted-foreground font-[Manrope]">
                Etiketleri virgülle ayırın. Maksimum 5 etiket.
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="content" className="font-[Manrope] font-bold">
                İçerik (Wiki) *
              </Label>
              <MarkdownEditor
                value={content}
                onChange={setContent}
                placeholder="Başlığınız hakkında detaylı bilgi verin..."
                minHeight="400px"
                disabled={isLoading}
              />
              <p className="text-xs text-muted-foreground font-[Manrope]">
                Markdown formatını kullanabilirsiniz. Bu içerik başlığın wiki bölümü olacaktır.
              </p>
            </div>

            <div className="flex items-center justify-between pt-4 border-t">
              <div className="text-sm text-muted-foreground font-[Manrope]">
                <p>Başlığınız moderatör onayından sonra yayınlanacaktır.</p>
                <p className="mt-1">Onaylandığında +20 GençCoin kazanacaksınız.</p>
              </div>
              <Button
                type="submit"
                disabled={isLoading || !title.trim() || !category || !content.trim()}
                className="bg-primary hover:bg-primary/90 font-[Manrope] font-bold px-8"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Oluşturuluyor...
                  </>
                ) : (
                  "Başlığı Oluştur"
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

