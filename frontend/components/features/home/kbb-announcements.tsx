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
    <Card className="bg-gradient-to-br from-[#03624c] to-[#024d3c] rounded-[20px] shadow-[0_4px_20px_rgba(0,0,0,0.06)] dark:shadow-lg border border-[#03624c]">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Megaphone className="w-6 h-6 text-white" />
          <CardTitle className="font-[Manrope] text-white font-bold text-lg sm:text-xl">
            KBB Duyuruları
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {mockAnnouncements.map((announcement) => (
          <Link
            key={announcement.id}
            href={announcement.link || "#"}
            className="block"
          >
            <div className="bg-white/10 dark:bg-white/5 backdrop-blur-sm rounded-xl p-3 sm:p-4 hover:bg-white/20 transition-colors cursor-pointer">
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    {announcement.isImportant && (
                      <Badge className="bg-yellow-500 text-white font-[Manrope] font-bold text-xs">
                        Önemli
                      </Badge>
                    )}
                    <Badge variant="outline" className="border-white/50 text-white font-[Manrope] text-xs">
                      {announcement.category}
                    </Badge>
                  </div>
                  <h3 className="font-[Manrope] font-bold text-sm sm:text-base text-white mb-1">
                    {announcement.title}
                  </h3>
                  <p className="font-[Manrope] text-xs sm:text-sm text-white/90 line-clamp-2 mb-2">
                    {announcement.content}
                  </p>
                  <div className="flex items-center gap-2 text-white/70">
                    <Calendar className="w-3 h-3" />
                    <span className="font-[Manrope] text-xs">
                      {formatDate(announcement.date)}
                    </span>
                  </div>
                </div>
                {announcement.link && (
                  <div className="flex-shrink-0 text-white hover:text-white/80 transition-colors">
                    <ExternalLink className="w-4 h-4" />
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

