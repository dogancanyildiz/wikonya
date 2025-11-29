"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Megaphone, ExternalLink, Calendar } from "lucide-react"
import Link from "next/link"

interface KBBAnnouncement {
  id: number
  title: string
  content: string
  date: string
  category: string
  link?: string
  isImportant?: boolean
}

interface KBBAnnouncementsProps {
  announcements?: KBBAnnouncement[]
}

export function KBBAnnouncements({ announcements }: KBBAnnouncementsProps) {
  // Mock data - gerçek uygulamada API'den gelecek
  // Date.now() yerine sabit timestamp kullanıyoruz
  const baseTimestamp = 1700000000000
  const mockAnnouncements: KBBAnnouncement[] = announcements || [
    {
      id: 1,
      title: "Genç Kültür Kart Yeni Özellikler",
      content: "Genç Kültür Kart&apos;a yeni avantajlar eklendi. Detaylar için tıklayın.",
      date: new Date(baseTimestamp).toISOString(),
      category: "Duyuru",
      link: "/announcements/1",
      isImportant: true,
    },
    {
      id: 2,
      title: "Konya Gençlik Festivali 2024",
      content: "Bu yıl düzenlenecek gençlik festivali için kayıtlar başladı!",
      date: new Date(baseTimestamp - 2 * 24 * 60 * 60 * 1000).toISOString(),
      category: "Etkinlik",
      link: "/announcements/2",
    },
    {
      id: 3,
      title: "Sosyal Sorumluluk Projeleri",
      content: "Yeni sosyal sorumluluk projelerine katılarak +100 GençCoin kazanabilirsiniz.",
      date: new Date(baseTimestamp - 5 * 24 * 60 * 60 * 1000).toISOString(),
      category: "Proje",
      link: "/announcements/3",
    },
  ]

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" })
  }

  return (
    <Card className="bg-gradient-to-br from-primary/5 via-primary/10 to-primary/5 dark:from-primary/10 dark:via-primary/15 dark:to-primary/10 rounded-xl shadow-md border border-primary/20 overflow-hidden">
      <CardHeader className="bg-primary/10 dark:bg-primary/20 border-b border-primary/20 py-2 px-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-primary/20 dark:bg-primary/30 rounded-lg">
            <Megaphone className="w-4 h-4 text-primary" />
          </div>
          <CardTitle className="font-[Manrope] text-foreground font-bold text-lg sm:text-xl">
            KBB Duyuruları
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-2 p-3">
        {mockAnnouncements.map((announcement) => (
          <Link
            key={announcement.id}
            href={announcement.link || "#"}
            className="block group"
          >
            <div className="bg-card/80 dark:bg-card/60 backdrop-blur-sm rounded-lg p-2 sm:p-2.5 hover:bg-card transition-colors cursor-pointer border border-border/50 hover:border-primary/30 hover:shadow-sm">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1">
                  <div className="flex items-center gap-1.5 mb-1">
                    {announcement.isImportant && (
                      <Badge className="bg-amber-500 hover:bg-amber-500 text-white font-[Manrope] font-bold text-[10px] px-1.5 py-0.5">
                        Önemli
                      </Badge>
                    )}
                    <Badge variant="secondary" className="font-[Manrope] text-[10px] bg-primary/10 text-primary border-0 px-1.5 py-0.5">
                      {announcement.category}
                    </Badge>
                  </div>
                  <h3 className="font-[Manrope] font-bold text-xs sm:text-sm text-foreground mb-0.5 group-hover:text-primary transition-colors">
                    {announcement.title}
                  </h3>
                  <p className="font-[Manrope] text-xs text-muted-foreground line-clamp-2 mb-1">
                    {announcement.content}
                  </p>
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <Calendar className="w-3 h-3" />
                    <span className="font-[Manrope] text-[10px]">
                      {formatDate(announcement.date)}
                    </span>
                  </div>
                </div>
                {announcement.link && (
                  <div className="flex-shrink-0 text-muted-foreground group-hover:text-primary transition-colors">
                    <ExternalLink className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>
            </div>
          </Link>
        ))}
      </CardContent>
    </Card>
  )
}

