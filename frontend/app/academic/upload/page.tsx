"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Upload, FileText, ClipboardList, MessageSquare, Calendar, X, AlertCircle } from "lucide-react"
import { toast } from "sonner"
import { useApp } from "@/contexts/app-context"

export default function AcademicUploadPage() {
  const router = useRouter()
  const { state } = useApp()
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)

  // Form states
  const [resourceType, setResourceType] = useState<"notes" | "exams" | "reviews" | "calendar">("notes")
  const [title, setTitle] = useState("")
  const [university, setUniversity] = useState("")
  const [department, setDepartment] = useState("")
  const [course, setCourse] = useState("")
  const [description, setDescription] = useState("")
  const [file, setFile] = useState<File | null>(null)
  const [rating, setRating] = useState<number>(5)
  const [eventDate, setEventDate] = useState("")

  const universities = [
    { id: "selcuk", name: "Selçuk Üniversitesi" },
    { id: "neu", name: "Necmettin Erbakan Üniversitesi" },
    { id: "kto", name: "KTO Karatay Üniversitesi" },
    { id: "ktun", name: "Konya Teknik Üniversitesi" },
    { id: "kgtu", name: "Konya Gıda ve Tarım Üniversitesi" },
  ]

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      // Check file size (max 50MB)
      if (selectedFile.size > 50 * 1024 * 1024) {
        toast.error("Dosya boyutu 50MB'dan küçük olmalıdır")
        return
      }
      setFile(selectedFile)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validation
    if (!title.trim()) {
      toast.error("Başlık gereklidir")
      return
    }

    if (!university) {
      toast.error("Üniversite seçmelisiniz")
      return
    }

    if (!department.trim()) {
      toast.error("Bölüm gereklidir")
      return
    }

    if (!course.trim()) {
      toast.error("Ders gereklidir")
      return
    }

    if (resourceType !== "calendar" && !file) {
      toast.error("Dosya yüklemelisiniz")
      return
    }

    if (resourceType === "calendar" && !eventDate) {
      toast.error("Etkinlik tarihi gereklidir")
      return
    }

    setIsUploading(true)
    setUploadProgress(0)

    try {
      // Simüle edilmiş upload
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval)
            return 90
          }
          return prev + 10
        })
      }, 200)

      await new Promise((resolve) => setTimeout(resolve, 2000))

      clearInterval(progressInterval)
      setUploadProgress(100)

      // Save to localStorage (mock)
      if (typeof window !== "undefined") {
        const uploadedResources = JSON.parse(localStorage.getItem("uploaded_resources") || "[]")
        const newResource = {
          id: Date.now(),
          title,
          fileType: file ? file.type.split("/")[1].toUpperCase() : "Etkinlik",
          fileSize: file ? `${(file.size / 1024 / 1024).toFixed(1)} MB` : "",
          uploadedBy: state.user?.name || "Kullanıcı",
          uploaderInitials: state.user?.initials || "K",
          uploadDate: new Date().toLocaleDateString("tr-TR", {
            day: "numeric",
            month: "short",
            year: "numeric",
          }),
          downloads: 0,
          views: 0,
          university,
          department,
          course,
          type: resourceType,
          uploadTimestamp: Date.now(),
          rating: resourceType === "reviews" ? rating : undefined,
          eventDate: resourceType === "calendar" ? eventDate : undefined,
          description,
        }
        uploadedResources.unshift(newResource)
        localStorage.setItem("uploaded_resources", JSON.stringify(uploadedResources))
      }

      toast.success("Kaynak başarıyla yüklendi!")
      
      setTimeout(() => {
        router.push("/academic")
      }, 1000)
    } catch (error) {
      toast.error("Yükleme sırasında bir hata oluştu")
      console.error("Upload error:", error)
    } finally {
      setIsUploading(false)
      setUploadProgress(0)
    }
  }

  if (!state.user) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 py-8">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="font-[Manrope]">
              Kaynak yüklemek için giriş yapmalısınız.
            </AlertDescription>
          </Alert>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 py-8">
        <div className="mb-6">
          <h1 className="font-[Manrope] text-foreground font-extrabold text-2xl sm:text-3xl mb-2">
            Akademik Kaynak Yükle
          </h1>
          <p className="font-[Manrope] text-foreground/60 dark:text-muted-foreground text-sm">
            Ders notları, sınav soruları, hoca yorumları veya akademik takvim etkinlikleri paylaşın
          </p>
        </div>

        <Card className="bg-card border border-border">
          <CardHeader>
            <CardTitle className="font-[Manrope] font-bold text-xl">
              Kaynak Bilgileri
            </CardTitle>
            <CardDescription className="font-[Manrope]">
              Lütfen tüm alanları doldurun
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Resource Type */}
              <div className="space-y-2">
                <Label className="font-[Manrope] font-bold">Kaynak Türü</Label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { id: "notes", label: "Ders Notları", icon: FileText },
                    { id: "exams", label: "Sınav Soruları", icon: ClipboardList },
                    { id: "reviews", label: "Hoca Yorumları", icon: MessageSquare },
                    { id: "calendar", label: "Akademik Takvim", icon: Calendar },
                  ].map((type) => {
                    const Icon = type.icon
                    return (
                      <button
                        key={type.id}
                        type="button"
                        onClick={() => setResourceType(type.id as typeof resourceType)}
                        className={`p-4 rounded-lg border-2 transition-all font-[Manrope] font-semibold ${
                          resourceType === type.id
                            ? "border-primary bg-primary/10 text-primary"
                            : "border-border bg-card hover:border-primary/50"
                        }`}
                      >
                        <Icon className="w-5 h-5 mx-auto mb-2" />
                        <div className="text-xs">{type.label}</div>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Title */}
              <div className="space-y-2">
                <Label htmlFor="title" className="font-[Manrope] font-bold">
                  Başlık *
                </Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Örn: Lineer Cebir Ders Notları"
                  className="font-[Manrope]"
                  required
                />
              </div>

              {/* University */}
              <div className="space-y-2">
                <Label htmlFor="university" className="font-[Manrope] font-bold">
                  Üniversite *
                </Label>
                <Select value={university} onValueChange={setUniversity} required>
                  <SelectTrigger id="university" className="font-[Manrope]">
                    <SelectValue placeholder="Üniversite seçin" />
                  </SelectTrigger>
                  <SelectContent>
                    {universities.map((uni) => (
                      <SelectItem key={uni.id} value={uni.id}>
                        {uni.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Department */}
              <div className="space-y-2">
                <Label htmlFor="department" className="font-[Manrope] font-bold">
                  Bölüm/Fakülte *
                </Label>
                <Input
                  id="department"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  placeholder="Örn: Mühendislik Fakültesi"
                  className="font-[Manrope]"
                  required
                />
              </div>

              {/* Course */}
              <div className="space-y-2">
                <Label htmlFor="course" className="font-[Manrope] font-bold">
                  Ders *
                </Label>
                <Input
                  id="course"
                  value={course}
                  onChange={(e) => setCourse(e.target.value)}
                  placeholder="Örn: Matematik I"
                  className="font-[Manrope]"
                  required
                />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description" className="font-[Manrope] font-bold">
                  Açıklama
                </Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Kaynak hakkında kısa bir açıklama..."
                  className="font-[Manrope] min-h-[100px]"
                />
              </div>

              {/* File Upload (for notes, exams, reviews) */}
              {resourceType !== "calendar" && (
                <div className="space-y-2">
                  <Label className="font-[Manrope] font-bold">Dosya *</Label>
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                    {file ? (
                      <div className="space-y-2">
                        <div className="flex items-center justify-center gap-2">
                          <FileText className="w-5 h-5 text-primary" />
                          <span className="font-[Manrope] font-semibold">{file.name}</span>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => setFile(null)}
                            className="h-6 w-6 p-0"
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                        <p className="font-[Manrope] text-xs text-muted-foreground">
                          {(file.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    ) : (
                      <div>
                        <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                        <Label htmlFor="file" className="cursor-pointer">
                          <span className="font-[Manrope] font-semibold text-primary hover:underline">
                            Dosya seç
                          </span>
                          <span className="font-[Manrope] text-sm text-muted-foreground block mt-1">
                            veya sürükle-bırak (Max 50MB)
                          </span>
                        </Label>
                        <Input
                          id="file"
                          type="file"
                          onChange={handleFileChange}
                          accept=".pdf,.doc,.docx,.ppt,.pptx"
                          className="hidden"
                        />
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Rating (for reviews) */}
              {resourceType === "reviews" && (
                <div className="space-y-2">
                  <Label className="font-[Manrope] font-bold">Değerlendirme</Label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        className="text-2xl"
                      >
                        {star <= rating ? "⭐" : "☆"}
                      </button>
                    ))}
                    <span className="font-[Manrope] text-sm text-muted-foreground ml-2">
                      {rating}/5
                    </span>
                  </div>
                </div>
              )}

              {/* Event Date (for calendar) */}
              {resourceType === "calendar" && (
                <div className="space-y-2">
                  <Label htmlFor="eventDate" className="font-[Manrope] font-bold">
                    Etkinlik Tarihi *
                  </Label>
                  <Input
                    id="eventDate"
                    type="date"
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    className="font-[Manrope]"
                    required
                  />
                </div>
              )}

              {/* Upload Progress */}
              {isUploading && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm font-[Manrope]">
                    <span>Yükleniyor...</span>
                    <span>{uploadProgress}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <div className="flex items-center gap-3 pt-4">
                <Button
                  type="submit"
                  disabled={isUploading}
                  className="font-[Manrope] font-bold"
                >
                  {isUploading ? (
                    <>
                      <Upload className="w-4 h-4 mr-2 animate-pulse" />
                      Yükleniyor...
                    </>
                  ) : (
                    <>
                      <Upload className="w-4 h-4 mr-2" />
                      Kaynağı Yükle
                    </>
                  )}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.back()}
                  disabled={isUploading}
                  className="font-[Manrope]"
                >
                  İptal
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

