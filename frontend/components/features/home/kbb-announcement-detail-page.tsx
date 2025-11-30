"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Megaphone, Calendar, ArrowLeft, Star, Clock } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

interface KBBAnnouncement {
  id: number
  title: string
  content: string
  date: string
  category: string
  link?: string
  isImportant?: boolean
}

// Mock data - gerçek uygulamada API'den gelecek
const baseTimestamp = 1700000000000
const announcementsData: KBBAnnouncement[] = [
  {
    id: 1,
    title: "Genç Kültür Kart Yeni Özellikler",
    content: "Genç Kültür Kart'a yeni avantajlar eklendi. Artık daha fazla kültürel etkinlik ve mekanda indirimlerden yararlanabilirsiniz. Kartınızı güncelleyerek yeni özellikleri keşfedin. Detaylı bilgi için KBB web sitesini ziyaret edebilir veya ilgili birimlerle iletişime geçebilirsiniz.",
    date: new Date(baseTimestamp).toISOString(),
    category: "Duyuru",
    link: "/announcements/1",
    isImportant: true,
  },
  {
    id: 2,
    title: "Konya Gençlik Festivali 2024",
    content: "Bu yıl düzenlenecek gençlik festivali için kayıtlar başladı! Festival kapsamında konserler, atölyeler, spor etkinlikleri ve daha birçok aktivite yer alacak. Tüm gençlerimizi bekliyoruz. Kayıt için son tarih 15 Mart 2024. Detaylı program ve kayıt bilgileri için web sitemizi ziyaret edin.",
    date: new Date(baseTimestamp - 2 * 24 * 60 * 60 * 1000).toISOString(),
    category: "Etkinlik",
    link: "/announcements/2",
  },
  {
    id: 3,
    title: "Sosyal Sorumluluk Projeleri",
    content: "Yeni sosyal sorumluluk projelerine katılarak +100 GençCoin kazanabilirsiniz. Projelerimiz çevre, eğitim, sağlık ve kültür alanlarında gerçekleştirilecek. Katılım için başvuru formunu doldurmanız yeterli. Proje detayları ve başvuru için ilgili sayfayı ziyaret edin.",
    date: new Date(baseTimestamp - 5 * 24 * 60 * 60 * 1000).toISOString(),
    category: "Proje",
    link: "/announcements/3",
  },
]

export function KBBAnnouncementDetailPage({ announcementId }: { announcementId: number }) {
  const announcement = announcementsData.find(a => a.id === announcementId)

  if (!announcement) {
    return (
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-16 py-6 sm:py-8 md:py-10">
        <div className="text-center py-12">
          <h1 className="font-[Manrope] text-foreground mb-4 font-extrabold text-2xl sm:text-3xl md:text-4xl">
            Duyuru Bulunamadı
          </h1>
          <p className="font-[Manrope] text-foreground/60 dark:text-muted-foreground font-medium text-sm sm:text-base mb-6">
            Aradığınız duyuru bulunamadı veya kaldırılmış olabilir.
          </p>
          <Link href="/">
            <Button className="bg-primary text-white hover:bg-primary/90 font-[Manrope] font-semibold">
              Ana Sayfaya Dön
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" })
  }

  const formatTime = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" })
  }

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-16 py-6 sm:py-8 md:py-10">
      {/* Back Button */}
      <Link href="/">
        <Button 
          variant="ghost" 
          className="mb-4 sm:mb-6 font-[Manrope] text-foreground hover:text-primary"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Geri Dön
        </Button>
      </Link>

      {/* Page Header */}
      <div className="mb-6 sm:mb-8 md:mb-10">
        <h1 className="font-[Manrope] text-foreground mb-2 font-extrabold text-2xl sm:text-3xl md:text-4xl lg:text-[42px]">
          KBB Duyuruları
        </h1>
        <p className="font-[Manrope] text-foreground/60 dark:text-muted-foreground font-medium text-sm sm:text-base">
          Konya Büyükşehir Belediyesi duyuruları ve haberleri
        </p>
      </div>

      {/* Announcement Card */}
      <Card className="bg-card rounded-xl shadow-md dark:shadow-lg border border-border overflow-hidden">
        <CardContent className="p-6 sm:p-8">
          {/* Header Section */}
          <div className="mb-6 sm:mb-8">
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
              <div className="flex items-center gap-2">
                <div className="p-2 sm:p-3 bg-primary/10 dark:bg-primary/20 rounded-xl">
                  <Megaphone className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    {announcement.isImportant && (
                      <Badge className="bg-amber-500 text-white font-[Manrope] font-bold text-xs sm:text-sm px-2 py-1">
                        <Star className="w-3 h-3 mr-1 fill-white" />
                        Önemli
                      </Badge>
                    )}
                    <Badge className="bg-primary text-white font-[Manrope] font-bold text-xs sm:text-sm px-3 py-1">
                      {announcement.category}
                    </Badge>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 text-foreground/60 dark:text-muted-foreground ml-auto">
                <Clock className="w-4 h-4" />
                <span className="font-[Manrope] text-xs sm:text-sm font-medium">
                  {formatDate(announcement.date)} • {formatTime(announcement.date)}
                </span>
              </div>
            </div>

            <h2 className="font-[Manrope] font-extrabold text-xl sm:text-2xl md:text-3xl lg:text-4xl text-foreground leading-tight">
              {announcement.title}
            </h2>
          </div>

          <Separator className="mb-6 sm:mb-8" />

          {/* Content Section */}
          <div className="prose prose-invert max-w-none">
            <div className="bg-accent/50 dark:bg-accent/30 rounded-xl p-4 sm:p-6 border border-border/50">
              <p className="font-[Manrope] text-sm sm:text-base md:text-lg text-foreground/80 dark:text-foreground/70 leading-relaxed whitespace-pre-line">
                {announcement.content}
              </p>
            </div>
          </div>

          {/* Footer Section */}
          <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-border">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-foreground/60 dark:text-muted-foreground">
                <Calendar className="w-4 h-4" />
                <span className="font-[Manrope] text-xs sm:text-sm font-medium">
                  Yayın Tarihi: {formatDate(announcement.date)}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

