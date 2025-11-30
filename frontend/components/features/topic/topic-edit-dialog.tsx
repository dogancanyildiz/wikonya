"use client"

import { useState, useEffect } from "react"
import { useApp } from "@/contexts/app-context"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, Loader2, X, Plus } from "lucide-react"
import { MarkdownEditor } from "./markdown-editor"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"

const CATEGORIES = [
  { value: "academic", label: "Akademik", icon: "📚" },
  { value: "social", label: "Sosyal Yaşam & Mekan", icon: "☕" },
  { value: "housing", label: "Barınma & Yaşam", icon: "🏠" },
  { value: "career", label: "Kariyer & Gelişim", icon: "💼" },
  { value: "discovery", label: "Konya Keşif", icon: "🗺️" },
] as const

const SUGGESTED_TAGS: Record<string, string[]> = {
  academic: ["Ders Notu", "Sınav Soruları", "Final Hazırlık", "Vize Hazırlık", "Ödev", "Proje", "Laboratuvar"],
  social: ["Kafe", "Restoran", "Etkinlik", "Konser", "Sosyal Kulüp", "Topluluk", "Arkadaş"],
  housing: ["Yurt", "Ev", "Kira", "Oda Arkadaşı", "Barınma", "Kampüs", "Ulaşım"],
  career: ["Staj", "İş İlanı", "CV", "Mülakat", "Kariyer", "Networking", "Workshop"],
  discovery: ["Tarihi Yer", "Müze", "Park", "Alışveriş", "Ulaşım", "Yemek", "Kültür"],
}

interface TopicEditDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  topicId: number
  initialTitle: string
  initialCategory: string
  initialTags: string[]
  initialContent: string
  onSave?: (data: { title: string; category: string; tags: string[]; content: string }) => void
}

export function TopicEditDialog({
  open,
  onOpenChange,
  topicId,
  initialTitle,
  initialCategory,
  initialTags,
  initialContent,
  onSave,
}: TopicEditDialogProps) {
  const { state } = useApp()
  const [title, setTitle] = useState(initialTitle)
  const [category, setCategory] = useState(initialCategory)
  const [tags, setTags] = useState<string[]>(initialTags)
  const [tagInput, setTagInput] = useState("")
  const [content, setContent] = useState(initialContent)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const MAX_TAGS = 5
  const suggestedTags = category ? SUGGESTED_TAGS[category as keyof typeof SUGGESTED_TAGS] || [] : []

  // Reset form when dialog opens/closes or initial values change
  useEffect(() => {
    if (open) {
      setTitle(initialTitle)
      setCategory(initialCategory)
      setTags(initialTags)
      setContent(initialContent)
      setTagInput("")
      setError(null)
    }
  }, [open, initialTitle, initialCategory, initialTags, initialContent])

  const handleAddTag = (tag: string) => {
    const trimmedTag = tag.trim()
    if (!trimmedTag) return

    if (tags.length >= MAX_TAGS) {
      setError(`En fazla ${MAX_TAGS} etiket ekleyebilirsiniz`)
      return
    }

    if (tags.includes(trimmedTag)) {
      setError("Bu etiket zaten eklenmiş")
      return
    }

    setTags([...tags, trimmedTag])
    setTagInput("")
    setError(null)
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove))
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault()
      handleAddTag(tagInput)
    }
  }

  const handleSave = async () => {
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

    setIsLoading(true)
    setError(null)

    try {
      // Simüle edilmiş API çağrısı
      await new Promise((resolve) => setTimeout(resolve, 500))

      // Save to localStorage - topic edits
      if (typeof window !== "undefined") {
        const editsKey = `topic_edits_${topicId}`
        const edits = JSON.parse(localStorage.getItem(editsKey) || "[]")
        const newEdit = {
          id: Date.now(),
          topicId,
          title,
          category,
          tags,
          content,
          editedBy: state.user,
          editedAt: new Date().toISOString(),
        }
        edits.unshift(newEdit)
        localStorage.setItem(editsKey, JSON.stringify(edits))

        // Update topic data in localStorage
        const topicDataKey = `topic_data_${topicId}`
        localStorage.setItem(topicDataKey, JSON.stringify({
          title,
          category,
          tags,
          content,
          updatedAt: new Date().toISOString(),
        }))
      }

      if (onSave) {
        onSave({ title, category, tags, content })
      }

      toast.success("Başlık başarıyla güncellendi")
      onOpenChange(false)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Güncelleme sırasında bir hata oluştu")
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancel = () => {
    setTitle(initialTitle)
    setCategory(initialCategory)
    setTags(initialTags)
    setContent(initialContent)
    setTagInput("")
    setError(null)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-[Manrope] font-bold text-xl">Başlığı Düzenle</DialogTitle>
          <DialogDescription className="font-[Manrope]">
            Başlık bilgilerini ve içeriğini güncelleyin
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription className="font-[Manrope]">{error}</AlertDescription>
            </Alert>
          )}

          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title" className="font-[Manrope] font-bold">
              Başlık *
            </Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Başlık girin..."
              className="font-[Manrope]"
              maxLength={200}
            />
          </div>

          {/* Category */}
          <div className="space-y-2">
            <Label htmlFor="category" className="font-[Manrope] font-bold">
              Kategori *
            </Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger id="category" className="font-[Manrope]">
                <SelectValue placeholder="Kategori seçin" />
              </SelectTrigger>
              <SelectContent>
                {CATEGORIES.map((cat) => (
                  <SelectItem key={cat.value} value={cat.value}>
                    <span className="flex items-center gap-2">
                      <span>{cat.icon}</span>
                      <span>{cat.label}</span>
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Tags */}
          <div className="space-y-2">
            <Label htmlFor="tags" className="font-[Manrope] font-bold">
              Etiketler ({tags.length}/{MAX_TAGS})
            </Label>
            <div className="flex flex-wrap gap-2 mb-2">
              {tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="font-[Manrope] font-semibold px-3 py-1 flex items-center gap-1"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    className="ml-1 hover:text-destructive"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                id="tags"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Etiket ekle (Enter veya virgül)"
                className="font-[Manrope]"
                disabled={tags.length >= MAX_TAGS}
              />
              {suggestedTags.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {suggestedTags
                    .filter(tag => !tags.includes(tag))
                    .slice(0, 3)
                    .map((tag) => (
                      <Button
                        key={tag}
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => handleAddTag(tag)}
                        disabled={tags.length >= MAX_TAGS}
                        className="font-[Manrope] text-xs"
                      >
                        <Plus className="w-3 h-3 mr-1" />
                        {tag}
                      </Button>
                    ))}
                </div>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="space-y-2">
            <Label htmlFor="content" className="font-[Manrope] font-bold">
              İçerik *
            </Label>
            <MarkdownEditor
              value={content}
              onChange={setContent}
              placeholder="Başlık içeriğini markdown formatında yazın..."
              minHeight="300px"
            />
          </div>
        </div>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={handleCancel}
            disabled={isLoading}
            className="font-[Manrope]"
          >
            İptal
          </Button>
          <Button
            type="button"
            onClick={handleSave}
            disabled={isLoading}
            className="font-[Manrope]"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Kaydediliyor...
              </>
            ) : (
              "Kaydet"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

