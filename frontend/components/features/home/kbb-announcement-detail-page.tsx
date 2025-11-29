"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Megaphone, Calendar, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { getAnnouncementById } from "@/lib/mock-data"

interface KBBAnnouncement {
  id: number
  title: string
  content: string
  date: string
  category: string
  link?: string
  isImportant?: boolean
}

export function KBBAnnouncementDetailPage({ announcementId }: { announcementId: number }) {
  // Mock data - mock-data.json dosyasından alınıyor
  const mockAnnouncement = getAnnouncementById(announcementId)
  const announcement: KBBAnnouncement | undefined = mockAnnouncement ? {
    id: mockAnnouncement.id,
    title: mockAnnouncement.title,
    content: mockAnnouncement.content,
    date: mockAnnouncement.createdAt,
    category: mockAnnouncement.category,
    link: `/announcements/${mockAnnouncement.id}`,
    isImportant: mockAnnouncement.isImportant,
  } : undefined

  if (!announcement) {
    return (
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-16 py-4 sm:py-6 md:py-8">
        <div className="text-center py-12">
          <h1 className="font-[Manrope] text-foreground mb-4 font-extrabold text-2xl sm:text-3xl">
            Duyuru Bulunamadı
          </h1>
          <Link href="/">
            <Button className="bg-primary text-white hover:bg-primary/90">
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

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-16 py-4 sm:py-6 md:py-8">
      {/* Back Button */}
      <Link href="/">
        <Button 
          variant="ghost" 
          className="mb-4 sm:mb-6 font-[Manrope] text-foreground hover:bg-accent dark:hover:bg-accent"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Geri Dön
        </Button>
      </Link>

      {/* Announcement Card */}
      <Card className="bg-gradient-to-br from-primary to-primary/80 rounded-xl shadow-md dark:shadow-lg border border-primary">
        <CardContent className="p-6 sm:p-8">
          <div className="flex items-center gap-2 mb-4 sm:mb-6">
            <Megaphone className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            <h1 className="font-[Manrope] text-white font-bold text-xl sm:text-2xl md:text-3xl">
              KBB Duyurusu
            </h1>
          </div>

          <div className="bg-white/10 dark:bg-white/5 backdrop-blur-sm rounded-xl p-4 sm:p-6">
            <div className="flex items-center gap-2 mb-4">
              {announcement.isImportant && (
                <Badge className="bg-yellow-500 text-white font-[Manrope] font-bold text-xs sm:text-sm">
                  Önemli
                </Badge>
              )}
              <Badge variant="outline" className="border-white/50 text-white font-[Manrope] text-xs sm:text-sm">
                {announcement.category}
              </Badge>
              <div className="flex items-center gap-2 text-white/70 ml-auto">
                <Calendar className="w-4 h-4" />
                <span className="font-[Manrope] text-xs sm:text-sm">
                  {formatDate(announcement.date)}
                </span>
              </div>
            </div>

            <h2 className="font-[Manrope] font-bold text-lg sm:text-xl md:text-2xl text-white mb-4">
              {announcement.title}
            </h2>

            <div className="prose prose-invert max-w-none">
              <p className="font-[Manrope] text-sm sm:text-base text-white/90 leading-relaxed whitespace-pre-line">
                {announcement.content}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

