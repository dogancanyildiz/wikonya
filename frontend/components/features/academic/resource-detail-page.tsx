"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, Download, Eye, MessageCircle, Calendar, FileText, MessageSquare, ThumbsUp, Share2, Bookmark } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import { useApp } from "@/contexts/app-context"

interface Resource {
  id: number
  title: string
  fileType: string
  fileSize: string
  uploadedBy: string
  uploaderInitials: string
  uploadDate: string
  downloads: number
  views: number
  university: string
  department: string
  course: string
  type: "notes" | "exams" | "reviews" | "calendar"
  uploadTimestamp: number
  rating?: number
  helpful?: number
  eventDate?: string
  description?: string
  content?: string
}

interface Comment {
  id: number
  user: {
    name: string
    initials: string
    role: string
  }
  comment: string
  createdAt: string
  helpful: number
}

const parseDate = (dateStr: string): number => {
  const months: Record<string, number> = {
    "Oca": 0, "Şub": 1, "Mar": 2, "Nis": 3, "May": 4, "Haz": 5,
    "Tem": 6, "Ağu": 7, "Eyl": 8, "Eki": 9, "Kas": 10, "Ara": 11
  }
  const parts = dateStr.split(" ")
  if (parts.length === 3) {
    const day = parseInt(parts[0])
    const month = months[parts[1]] || 0
    const year = parseInt(parts[2])
    return new Date(year, month, day).getTime()
  }
  return 0
}

// Mock data - gerçek uygulamada API'den gelecek
const allResources: Resource[] = [
  { id: 1, title: "Hukuk Başlangıcı Final Notları", fileType: "PDF", fileSize: "12 MB", uploadedBy: "Prof. Dr. Ahmet Yılmaz", uploaderInitials: "AY", uploadDate: "15 Kas 2024", downloads: 245, views: 1234, university: "selcuk", department: "Hukuk Fakültesi", course: "Hukuk Başlangıcı", type: "notes", uploadTimestamp: parseDate("15 Kas 2024"), description: "Hukuk Başlangıcı dersinin final sınavı için hazırlanmış kapsamlı ders notları. Tüm konuları içeren detaylı bir özet." },
  { id: 2, title: "Anayasa Hukuku Ders Notları - Tam Set", fileType: "PDF", fileSize: "8.5 MB", uploadedBy: "Elif Demir", uploaderInitials: "ED", uploadDate: "12 Kas 2024", downloads: 189, views: 892, university: "selcuk", department: "Hukuk Fakültesi", course: "Anayasa Hukuku", type: "notes", uploadTimestamp: parseDate("12 Kas 2024"), description: "Anayasa Hukuku dersinin tüm konularını kapsayan detaylı ders notları." },
  { id: 3, title: "Medeni Hukuk Vize Sınav Soruları 2023", fileType: "PDF", fileSize: "3.2 MB", uploadedBy: "Mehmet Kaya", uploaderInitials: "MK", uploadDate: "10 Kas 2024", downloads: 312, views: 1567, university: "selcuk", department: "Hukuk Fakültesi", course: "Medeni Hukuk", type: "exams", uploadTimestamp: parseDate("10 Kas 2024"), description: "2023 yılı Medeni Hukuk vize sınav soruları ve çözümleri." },
  { id: 4, title: "Ceza Hukuku Genel Hükümler Özeti", fileType: "PDF", fileSize: "5.8 MB", uploadedBy: "Zeynep Arslan", uploaderInitials: "ZA", uploadDate: "8 Kas 2024", downloads: 156, views: 734, university: "selcuk", department: "Hukuk Fakültesi", course: "Ceza Hukuku", type: "notes", uploadTimestamp: parseDate("8 Kas 2024"), description: "Ceza Hukuku Genel Hükümler dersinin özet notları." },
  { id: 5, title: "Ticaret Hukuku Ders İzlencesi", fileType: "PDF", fileSize: "4.1 MB", uploadedBy: "Can Özkan", uploaderInitials: "CÖ", uploadDate: "5 Kas 2024", downloads: 98, views: 456, university: "selcuk", department: "Hukuk Fakültesi", course: "Ticaret Hukuku", type: "notes", uploadTimestamp: parseDate("5 Kas 2024"), description: "Ticaret Hukuku ders izlencesi ve önemli noktalar." },
  { id: 6, title: "İdare Hukuku Final Çalışma Kılavuzu", fileType: "PDF", fileSize: "6.7 MB", uploadedBy: "Ayşe Çelik", uploaderInitials: "AÇ", uploadDate: "3 Kas 2024", downloads: 203, views: 987, university: "selcuk", department: "Hukuk Fakültesi", course: "İdare Hukuku", type: "notes", uploadTimestamp: parseDate("3 Kas 2024"), description: "İdare Hukuku final sınavı için hazırlanmış çalışma kılavuzu." },
  { id: 7, title: "Borçlar Hukuku Vaka Analizleri", fileType: "PDF", fileSize: "9.3 MB", uploadedBy: "Burak Yıldız", uploaderInitials: "BY", uploadDate: "1 Kas 2024", downloads: 167, views: 823, university: "selcuk", department: "Hukuk Fakültesi", course: "Borçlar Hukuku", type: "notes", uploadTimestamp: parseDate("1 Kas 2024"), description: "Borçlar Hukuku dersine ait vaka analizleri ve çözümleri." },
  { id: 8, title: "Hukuk Felsefesi Ders Notları", fileType: "PDF", fileSize: "7.2 MB", uploadedBy: "Selin Aydın", uploaderInitials: "SA", uploadDate: "29 Eki 2024", downloads: 134, views: 612, university: "selcuk", department: "Hukuk Fakültesi", course: "Hukuk Felsefesi", type: "notes", uploadTimestamp: parseDate("29 Eki 2024"), description: "Hukuk Felsefesi ders notları ve önemli kavramlar." },
  { id: 9, title: "Roma Hukuku Tarihi Özet", fileType: "PDF", fileSize: "4.9 MB", uploadedBy: "Emre Şahin", uploaderInitials: "EŞ", uploadDate: "27 Eki 2024", downloads: 89, views: 445, university: "selcuk", department: "Hukuk Fakültesi", course: "Roma Hukuku", type: "notes", uploadTimestamp: parseDate("27 Eki 2024"), description: "Roma Hukuku tarihi özet notları." },
  { id: 10, title: "Matematik I Çözümlü Sorular", fileType: "PDF", fileSize: "15.2 MB", uploadedBy: "Dr. Fatma Korkmaz", uploaderInitials: "FK", uploadDate: "25 Eki 2024", downloads: 423, views: 2156, university: "selcuk", department: "Mühendislik Fakültesi", course: "Matematik I", type: "notes", uploadTimestamp: parseDate("25 Eki 2024"), description: "Matematik I dersine ait çözümlü sorular ve örnekler." },
  { id: 11, title: "Fizik II Laboratuvar Raporları", fileType: "PDF", fileSize: "6.8 MB", uploadedBy: "Ali Yıldırım", uploaderInitials: "AY", uploadDate: "22 Eki 2024", downloads: 178, views: 890, university: "selcuk", department: "Mühendislik Fakültesi", course: "Fizik II", type: "notes", uploadTimestamp: parseDate("22 Eki 2024"), description: "Fizik II laboratuvar raporları ve deney sonuçları." },
  { id: 12, title: "Programlama Temelleri - Python", fileType: "PDF", fileSize: "11.4 MB", uploadedBy: "Doç. Dr. Murat Öz", uploaderInitials: "MÖ", uploadDate: "20 Eki 2024", downloads: 567, views: 3421, university: "selcuk", department: "Mühendislik Fakültesi", course: "Programlama Temelleri", type: "notes", uploadTimestamp: parseDate("20 Eki 2024"), description: "Python programlama dili ile ilgili temel kavramlar ve örnekler." },
]

const mockComments: Comment[] = [
  { id: 1, user: { name: "Mehmet Demir", initials: "MD", role: "Gezgin" }, comment: "Çok faydalı bir kaynak, teşekkürler!", createdAt: "2 gün önce", helpful: 12 },
  { id: 2, user: { name: "Ayşe Kaya", initials: "AK", role: "Seyyah" }, comment: "Final sınavı için çok yardımcı oldu.", createdAt: "5 gün önce", helpful: 8 },
  { id: 3, user: { name: "Can Özkan", initials: "CÖ", role: "Gezgin" }, comment: "Eksik bilgiler var, güncellenebilir.", createdAt: "1 hafta önce", helpful: 3 },
]

interface ResourceDetailPageProps {
  resourceId: number
}

export function ResourceDetailPage({ resourceId }: ResourceDetailPageProps) {
  const { state } = useApp()
  const [resource, setResource] = useState<Resource | null>(null)
  const [comments, setComments] = useState<Comment[]>(mockComments)
  const [newComment, setNewComment] = useState("")
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Load resource data
    const foundResource = allResources.find(r => r.id === resourceId)
    if (foundResource) {
      // Use setTimeout to avoid synchronous setState in effect
      setTimeout(() => {
        setResource(foundResource)
      }, 0)
      // Increment views
      const viewsKey = `resource_views_${resourceId}`
      const currentViews = parseInt(localStorage.getItem(viewsKey) || "0")
      localStorage.setItem(viewsKey, String(currentViews + 1))
    }
    
    // Load comments from localStorage
    const commentsKey = `resource_comments_${resourceId}`
    const storedComments = localStorage.getItem(commentsKey)
    if (storedComments) {
      try {
        const parsed = JSON.parse(storedComments)
        setTimeout(() => {
          setComments(parsed)
        }, 0)
      } catch {
        // Keep default comments
      }
    }
    
    // Load bookmark status
    if (state.user) {
      const bookmarksKey = `user_bookmarks_${state.user.id}`
      const bookmarks = JSON.parse(localStorage.getItem(bookmarksKey) || "[]")
      setTimeout(() => {
        setIsBookmarked(bookmarks.includes(resourceId))
      }, 0)
    }
    
    setTimeout(() => {
      setIsLoading(false)
    }, 0)
  }, [resourceId, state.user])

  const handleDownload = () => {
    if (!resource) return
    
    // Increment downloads
    const downloadsKey = `resource_downloads_${resourceId}`
    const currentDownloads = parseInt(localStorage.getItem(downloadsKey) || "0")
    localStorage.setItem(downloadsKey, String(currentDownloads + 1))
    
    // Simulate download
    toast.success("İndirme başlatıldı")
  }

  const handleCommentSubmit = () => {
    if (!newComment.trim() || !state.user) {
      toast.error("Yorum yazmak için giriş yapmalısınız")
      return
    }

    const comment: Comment = {
      id: Date.now(),
      user: {
        name: state.user.name,
        initials: state.user.initials,
        role: state.user.role,
      },
      comment: newComment,
      createdAt: "Az önce",
      helpful: 0,
    }

    const updatedComments = [comment, ...comments]
    setComments(updatedComments)
    setNewComment("")

    // Save to localStorage
    const commentsKey = `resource_comments_${resourceId}`
    localStorage.setItem(commentsKey, JSON.stringify(updatedComments))

    toast.success("Yorumunuz eklendi")
  }

  const handleBookmark = () => {
    if (!state.user) {
      toast.error("Favorilere eklemek için giriş yapmalısınız")
      return
    }

    const bookmarksKey = `user_bookmarks_${state.user.id}`
    const bookmarks = JSON.parse(localStorage.getItem(bookmarksKey) || "[]")
    
    if (isBookmarked) {
      const updated = bookmarks.filter((id: number) => id !== resourceId)
      localStorage.setItem(bookmarksKey, JSON.stringify(updated))
      setIsBookmarked(false)
      toast.success("Favorilerden kaldırıldı")
    } else {
      bookmarks.push(resourceId)
      localStorage.setItem(bookmarksKey, JSON.stringify(bookmarks))
      setIsBookmarked(true)
      toast.success("Favorilere eklendi")
    }
  }

  if (isLoading) {
    return (
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-16 py-6 sm:py-8 md:py-10">
        <div className="text-center py-12">
          <p className="font-[Manrope] text-foreground/60">Yükleniyor...</p>
        </div>
      </div>
    )
  }

  if (!resource) {
    return (
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-16 py-6 sm:py-8 md:py-10">
        <div className="text-center py-12">
          <h1 className="font-[Manrope] text-foreground mb-4 font-extrabold text-2xl sm:text-3xl">
            Kaynak Bulunamadı
          </h1>
          <Link href="/academic">
            <Button className="bg-primary text-white hover:bg-primary/90">
              Geri Dön
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  const isReview = resource.type === "reviews"
  const isCalendar = resource.type === "calendar"

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-16 py-6 sm:py-8 md:py-10">
      {/* Back Button */}
      <Link href="/academic">
        <Button 
          variant="ghost" 
          className="mb-4 sm:mb-6 font-[Manrope] text-foreground hover:bg-accent dark:hover:bg-accent"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Geri Dön
        </Button>
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Resource Header */}
          <Card className="bg-card rounded-xl shadow-md dark:shadow-lg border border-border">
            <CardHeader>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      {isReview ? (
                        <MessageSquare className="w-5 h-5 text-primary" />
                      ) : isCalendar ? (
                        <Calendar className="w-5 h-5 text-primary" />
                      ) : (
                        <FileText className="w-5 h-5 text-primary" />
                      )}
                    </div>
                    <Badge variant="outline" className="font-[Manrope] font-semibold">
                      {resource.fileType}
                    </Badge>
                    {!isReview && !isCalendar && (
                      <span className="font-[Manrope] text-muted-foreground font-medium text-sm">
                        {resource.fileSize}
                      </span>
                    )}
                  </div>
                  <CardTitle className="font-[Manrope] text-foreground font-extrabold text-2xl sm:text-3xl mb-3">
                    {resource.title}
                  </CardTitle>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-foreground/60">
                    <span className="font-[Manrope] font-medium">{resource.university}</span>
                    <span>·</span>
                    <span className="font-[Manrope] font-medium">{resource.department}</span>
                    <span>·</span>
                    <span className="font-[Manrope] font-medium">{resource.course}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleBookmark}
                    className="font-[Manrope]"
                  >
                    <Bookmark className={`w-4 h-4 mr-2 ${isBookmarked ? "fill-primary text-primary" : ""}`} />
                    {isBookmarked ? "Kaydedildi" : "Kaydet"}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      if (navigator.share) {
                        navigator.share({
                          title: resource.title,
                          text: resource.description || "",
                          url: window.location.href,
                        })
                      } else {
                        navigator.clipboard.writeText(window.location.href)
                        toast.success("Link kopyalandı")
                      }
                    }}
                    className="font-[Manrope]"
                  >
                    <Share2 className="w-4 h-4 mr-2" />
                    Paylaş
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Description */}
              {resource.description && (
                <div>
                  <h3 className="font-[Manrope] text-foreground font-bold text-lg mb-2">
                    Açıklama
                  </h3>
                  <p className="font-[Manrope] text-foreground/70 dark:text-muted-foreground leading-relaxed">
                    {resource.description}
                  </p>
                </div>
              )}

              <Separator />

              {/* Stats */}
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <Eye className="w-5 h-5 text-primary" />
                  <div>
                    <p className="font-[Manrope] font-bold text-sm text-foreground">
                      {resource.views}
                    </p>
                    <p className="font-[Manrope] text-xs text-foreground/60">
                      Görüntülenme
                    </p>
                  </div>
                </div>
                {!isReview && !isCalendar && (
                  <div className="flex items-center gap-2">
                    <Download className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-[Manrope] font-bold text-sm text-foreground">
                        {resource.downloads}
                      </p>
                      <p className="font-[Manrope] text-xs text-foreground/60">
                        İndirme
                      </p>
                    </div>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <MessageCircle className="w-5 h-5 text-primary" />
                  <div>
                    <p className="font-[Manrope] font-bold text-sm text-foreground">
                      {comments.length}
                    </p>
                    <p className="font-[Manrope] text-xs text-foreground/60">
                      Yorum
                    </p>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Uploader Info */}
              <div className="flex items-center gap-3">
                <Avatar className="w-10 h-10">
                  <AvatarFallback className="font-[Manrope] font-bold bg-primary/10 text-primary">
                    {resource.uploaderInitials}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-[Manrope] font-bold text-sm text-foreground">
                    {resource.uploadedBy}
                  </p>
                  <p className="font-[Manrope] text-xs text-foreground/60">
                    {resource.uploadDate}
                  </p>
                </div>
              </div>

              {/* Download Button */}
              {!isReview && !isCalendar && (
                <>
                  <Separator />
                  <Button
                    onClick={handleDownload}
                    className="w-full bg-primary hover:bg-primary/90 font-[Manrope] font-bold"
                    size="lg"
                  >
                    <Download className="w-5 h-5 mr-2" />
                    İndir ({resource.fileSize})
                  </Button>
                </>
              )}
            </CardContent>
          </Card>

          {/* Comments Section */}
          <Card className="bg-card rounded-xl shadow-md dark:shadow-lg border border-border">
            <CardHeader>
              <CardTitle className="font-[Manrope] text-foreground font-bold text-xl">
                Yorumlar ({comments.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Comment Form */}
              {state.user ? (
                <div className="space-y-3 pb-4 border-b border-border">
                  <Textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Yorumunuzu yazın..."
                    className="font-[Manrope] min-h-[100px]"
                  />
                  <Button
                    onClick={handleCommentSubmit}
                    className="font-[Manrope] font-bold"
                  >
                    Yorum Yap
                  </Button>
                </div>
              ) : (
                <div className="p-4 bg-accent rounded-lg text-center">
                  <p className="font-[Manrope] text-foreground/60 text-sm">
                    Yorum yapmak için giriş yapmalısınız
                  </p>
                </div>
              )}

              {/* Comments List */}
              <div className="space-y-4">
                {comments.map((comment) => (
                  <div key={comment.id} className="flex gap-3">
                    <Avatar className="w-8 h-8">
                      <AvatarFallback className="font-[Manrope] font-bold bg-primary/10 text-primary text-xs">
                        {comment.user.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-[Manrope] font-bold text-sm text-foreground">
                          {comment.user.name}
                        </p>
                        <span className="font-[Manrope] text-xs text-foreground/60">
                          {comment.user.role} · {comment.createdAt}
                        </span>
                      </div>
                      <p className="font-[Manrope] text-sm text-foreground/70 mb-2">
                        {comment.comment}
                      </p>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-7 px-2 font-[Manrope] text-xs"
                        >
                          <ThumbsUp className="w-3 h-3 mr-1" />
                          Faydalı ({comment.helpful})
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Related Resources */}
          <Card className="bg-card rounded-xl shadow-md dark:shadow-lg border border-border">
            <CardHeader>
              <CardTitle className="font-[Manrope] text-foreground font-bold text-lg">
                İlgili Kaynaklar
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {allResources
                  .filter(r => r.id !== resourceId && (r.course === resource.course || r.department === resource.department))
                  .slice(0, 3)
                  .map((related) => (
                    <Link key={related.id} href={`/academic/${related.id}`}>
                      <div className="p-3 bg-accent rounded-lg hover:bg-accent/80 transition-colors cursor-pointer">
                        <p className="font-[Manrope] font-bold text-sm text-foreground line-clamp-2 mb-1">
                          {related.title}
                        </p>
                        <p className="font-[Manrope] text-xs text-foreground/60">
                          {related.uploadDate} · {related.views} görüntülenme
                        </p>
                      </div>
                    </Link>
                  ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

