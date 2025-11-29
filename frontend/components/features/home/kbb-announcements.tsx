"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Megaphone, Clock, ArrowRight, Star } from "lucide-react"
import Link from "next/link"

interface KBBAnnouncement {
  id: number
  title: string
  date: string
  link?: string
  isImportant?: boolean
}

interface KBBAnnouncementsProps {
  announcements?: KBBAnnouncement[]
}

export function KBBAnnouncements({ announcements }: KBBAnnouncementsProps) {
  const baseTimestamp = 1700000000000
  const mockAnnouncements: KBBAnnouncement[] = announcements || [
    {
      id: 1,
      title: "Genç Kültür Kart Yeni Özellikler",
      date: new Date(baseTimestamp).toISOString(),
      link: "/announcements/1",
      isImportant: true,
    },
    {
      id: 2,
      title: "Konya Gençlik Festivali 2024",
      date: new Date(baseTimestamp - 2 * 24 * 60 * 60 * 1000).toISOString(),
      link: "/announcements/2",
    },
    {
      id: 3,
      title: "Sosyal Sorumluluk Projeleri",
      date: new Date(baseTimestamp - 5 * 24 * 60 * 60 * 1000).toISOString(),
      link: "/announcements/3",
    },
  ]

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("tr-TR", { day: "numeric", month: "short" })
  }

  return (
    <Card className="bg-gradient-to-br from-primary/5 via-primary/10 to-primary/5 dark:from-primary/10 dark:via-primary/15 dark:to-primary/10 rounded-xl shadow-md border border-primary/20 overflow-hidden">
      <CardHeader className="pb-2 pt-3 px-4">
        <CardTitle className="flex items-center gap-2 text-base">
          <Megaphone className="w-4 h-4 text-primary" />
          <span className="font-[Manrope] font-bold text-foreground">KBB Duyuruları</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="px-4 pb-3 pt-0 space-y-1.5">
        {mockAnnouncements.map((announcement) => (
          <Link
            key={announcement.id}
            href={announcement.link || "#"}
            className="group block bg-card/80 dark:bg-card/60 rounded-lg p-2.5 hover:bg-card transition-all border border-border/50 hover:border-primary/30 hover:shadow-sm"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  {announcement.isImportant && (
                    <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500 flex-shrink-0" />
                  )}
                  <h4 className="font-[Manrope] font-semibold text-sm leading-snug line-clamp-2 text-foreground group-hover:text-primary transition-colors">
                    {announcement.title}
                  </h4>
                </div>
                <div className="flex items-center gap-1 mt-1 text-muted-foreground">
                  <Clock className="w-3 h-3" />
                  <span className="font-[Manrope] text-xs">{formatDate(announcement.date)}</span>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 flex-shrink-0 mt-0.5 text-muted-foreground group-hover:text-primary transition-transform group-hover:translate-x-0.5" />
            </div>
          </Link>
        ))}
      </CardContent>
    </Card>
  )
}

