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
import { AlertCircle, Loader2, ArrowLeft, X, Plus } from "lucide-react"
import { MarkdownEditor } from "@/components/features/topic/markdown-editor"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

const CATEGORIES = [
  { value: "academic", label: "Akademik", icon: "📚", description: "Ders notları, sınav soruları, akademik kaynaklar" },
  { value: "social", label: "Sosyal Yaşam & Mekan", icon: "☕", description: "Kafeler, mekanlar, sosyal etkinlikler" },
  { value: "housing", label: "Barınma & Yaşam", icon: "🏠", description: "Yurt, ev, barınma önerileri" },
  { value: "career", label: "Kariyer & Gelişim", icon: "💼", description: "Staj, iş ilanları, kariyer tavsiyeleri" },
  { value: "discovery", label: "Konya Keşif", icon: "🗺️", description: "Konya'yı keşfet, yerel bilgiler" },
] as const

const SUGGESTED_TAGS: Record<string, string[]> = {
  academic: ["Ders Notu", "Sınav Soruları", "Final Hazırlık", "Vize Hazırlık", "Ödev", "Proje", "Laboratuvar", "Matematik", "Fizik", "Kimya", "Biyoloji", "Hukuk", "İktisat", "İşletme"],
  social: ["Kafe", "Restoran", "Etkinlik", "Konser", "Sosyal Kulüp", "Topluluk", "Arkadaş", "Eğlence", "Spor", "Müzik"],
  housing: ["Yurt", "Ev", "Kira", "Oda Arkadaşı", "Barınma", "Kampüs", "Ulaşım", "Güvenlik", "Fiyat"],
  career: ["Staj", "İş İlanı", "CV", "Mülakat", "Kariyer", "Networking", "Workshop", "Seminer"],
  discovery: ["Tarihi Yer", "Müze", "Park", "Alışveriş", "Ulaşım", "Yemek", "Kültür", "Festival"],
}

export default function NewTopicPage() {
  const router = useRouter()
  const { state } = useApp()
  const { canCreateTopic } = usePermissions()
  const [title, setTitle] = useState("")
  const [category, setCategory] = useState<string>("")
  const [tags, setTags] = useState<string[]>([])
  const [tagInput, setTagInput] = useState("")
  const [content, setContent] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const MAX_TAGS = 5
  const suggestedTags = category ? SUGGESTED_TAGS[category as keyof typeof SUGGESTED_TAGS] || [] : []

  const handleAddTag = (tag: string) => {
    const trimmedTag = tag.trim()
    if (!trimmedTag) return
    
    // Duplicate kontrolü
    if (tags.includes(trimmedTag)) {
      setError("Bu etiket zaten eklenmiş")
      setTimeout(() => setError(null), 2000)
      return
    }
    
    // Maksimum tag kontrolü
    if (tags.length >= MAX_TAGS) {
      setError(`Maksimum ${MAX_TAGS} etiket ekleyebilirsiniz`)
      setTimeout(() => setError(null), 2000)
      return
    }
    
    setTags([...tags, trimmedTag])
    setTagInput("")
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove))
  }

  const handleTagInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault()
      if (tagInput.trim()) {
        handleAddTag(tagInput)
      }
    }
  }

  const handleSuggestedTagClick = (tag: string) => {
    handleAddTag(tag)
  }

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
      // const _coinResult = rewardCoins("create_topic", { title, category, tags })

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

            <div className="space-y-3">
              <Label htmlFor="category" className="font-[Manrope] font-bold">
                Kategori *
              </Label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {CATEGORIES.map((cat) => {
                  const isSelected = category === cat.value
                  return (
                    <button
                      key={cat.value}
                      type="button"
                      onClick={() => setCategory(cat.value)}
                      disabled={isLoading}
                      className={`
                        p-4 rounded-xl border-2 transition-all text-left
                        ${isSelected
                          ? 'border-primary bg-primary/5 dark:bg-primary/10'
                          : 'border-border hover:border-primary/50 hover:bg-accent/50'
                        }
                        ${isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                      `}
                    >
                      <div className="flex items-start gap-3">
                        <span className="text-2xl">{cat.icon}</span>
                        <div className="flex-1 min-w-0">
                          <div className="font-[Manrope] font-bold text-sm text-foreground mb-1">
                            {cat.label}
                          </div>
                          <div className="font-[Manrope] text-xs text-muted-foreground">
                            {cat.description}
                          </div>
                        </div>
                        {isSelected && (
                          <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                            <div className="w-2 h-2 rounded-full bg-white" />
                          </div>
                        )}
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>

            <div className="space-y-3">
              <Label htmlFor="tags" className="font-[Manrope] font-bold">
                Etiketler {tags.length > 0 && `(${tags.length}/${MAX_TAGS})`}
              </Label>
              
              {/* Selected Tags */}
              {tags.length > 0 && (
                <div className="flex flex-wrap gap-2 p-3 bg-accent rounded-lg border border-border">
                  {tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="font-[Manrope] font-semibold text-sm px-3 py-1.5 flex items-center gap-2"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(tag)}
                        disabled={isLoading}
                        className="hover:bg-destructive/20 rounded-full p-0.5 transition-colors"
                        aria-label={`${tag} etiketini kaldır`}
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}

              {/* Tag Input */}
              <div className="flex gap-2">
                <Input
                  id="tags"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={handleTagInputKeyDown}
                  placeholder={tags.length >= MAX_TAGS ? "Maksimum etiket sayısına ulaştınız" : "Etiket ekle (Enter veya virgül)"}
                  className="font-[Manrope]"
                  disabled={isLoading || tags.length >= MAX_TAGS}
                />
                <Button
                  type="button"
                  onClick={() => handleAddTag(tagInput)}
                  disabled={isLoading || tags.length >= MAX_TAGS || !tagInput.trim()}
                  variant="outline"
                  size="icon"
                  className="flex-shrink-0"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>

              {/* Suggested Tags */}
              {category && suggestedTags.length > 0 && tags.length < MAX_TAGS && (
                <div className="space-y-2">
                  <p className="text-xs text-muted-foreground font-[Manrope] font-semibold">
                    Önerilen Etiketler:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {suggestedTags
                      .filter(tag => !tags.includes(tag))
                      .slice(0, 10)
                      .map((tag) => (
                        <button
                          key={tag}
                          type="button"
                          onClick={() => handleSuggestedTagClick(tag)}
                          disabled={isLoading || tags.length >= MAX_TAGS}
                          className="px-3 py-1.5 text-xs font-[Manrope] font-semibold bg-card hover:bg-primary hover:text-primary-foreground text-foreground rounded-full border border-border hover:border-primary transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          + {tag}
                        </button>
                      ))}
                  </div>
                </div>
              )}

              <p className="text-xs text-muted-foreground font-[Manrope]">
                {tags.length < MAX_TAGS
                  ? `Etiket eklemek için yazın ve Enter'a basın veya önerilen etiketlerden seçin. Maksimum ${MAX_TAGS} etiket.`
                  : `Maksimum ${MAX_TAGS} etiket ekleyebilirsiniz.`
                }
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

