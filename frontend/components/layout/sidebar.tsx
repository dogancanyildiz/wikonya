"use client"

import { Calendar, MapPin, MessageCircle, ThumbsUp } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import Link from "next/link"
import { KBBAnnouncements } from "@/components/features/home/kbb-announcements"

interface SidebarProps {
  onNavigateToTopic?: () => void
}

export function Sidebar({}: SidebarProps = {}) {
  const popularComments = [
    {
      id: 1,
      author: { name: "Ayşe Yılmaz", initials: "AY" },
      content: "Bu notlar gerçekten çok işime yaradı! Özellikle anayasa hukuku kısmı çok detaylı.",
      topicId: 1,
      upvotes: 42,
    },
    {
      id: 2,
      author: { name: "Mehmet Demir", initials: "MD" },
      content: "Yemekhane fiyatları artmış ama kalite aynı kalmış maalesef.",
      topicId: 2,
      upvotes: 35,
    },
    {
      id: 3,
      author: { name: "Zeynep Kaya", initials: "ZK" },
      content: "Final öncesi bu notlara çalıştım ve çok yardımcı oldu.",
      topicId: 3,
      upvotes: 28,
    },
  ]

  const upcomingEvents = [
    {
      id: 1,
      title: "Yapay Zeka ve Geleceği Semineri",
      date: "28 Kasım 2024",
      location: "Mühendislik Fakültesi",
      attendees: 124,
    },
    {
      id: 2,
      title: "Kariyer Günleri",
      date: "2 Aralık 2024",
      location: "Konferans Salonu",
      attendees: 245,
    },
    {
      id: 3,
      title: "Hackathon 2024",
      date: "15 Aralık 2024",
      location: "Bilgisayar Mühendisliği",
      attendees: 89,
    },
  ]

  return (
    <div className="sticky top-24" aria-label="Yan panel">
      <div className="space-y-4">
      {/* KBB Announcements */}
      <KBBAnnouncements />

      {/* Popüler Yorumlar */}
      <Card className="rounded-xl shadow-md border border-border">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <MessageCircle className="w-4 h-4 text-primary" />
            <span className="font-[Manrope] font-bold text-foreground">Popüler Yorumlar</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 pt-0">
          {popularComments.map((comment) => (
            <Link
              key={comment.id}
              href={`/topic/${comment.topicId}#comment-${comment.id}`}
              className="block bg-accent rounded-lg p-3 hover:shadow-md transition-all duration-200 cursor-pointer border border-transparent hover:border-border"
            >
              <div className="flex items-start gap-2.5">
                <Avatar className="w-7 h-7 flex-shrink-0">
                  <AvatarFallback className="bg-primary text-white font-[Manrope] font-bold text-[10px]">
                    {comment.author.initials}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <span className="font-[Manrope] font-bold text-xs text-foreground">
                    {comment.author.name}
                  </span>
                  <p className="font-[Manrope] text-xs text-muted-foreground line-clamp-2 mt-0.5">
                    {comment.content}
                  </p>
                  <div className="flex items-center gap-1 mt-1.5 text-primary">
                    <ThumbsUp className="w-3 h-3" />
                    <span className="font-[Manrope] font-semibold text-xs">{comment.upvotes}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </CardContent>
      </Card>

      {/* Upcoming Events */}
      <Card className="rounded-xl shadow-md border border-border">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <Calendar className="w-4 h-4 text-primary" />
            <span className="font-[Manrope] font-bold text-foreground">Yaklaşan Etkinlikler</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 pt-0">
          {upcomingEvents.slice(0, 2).map((event) => (
            <Link
              key={event.id}
              href={`/events/${event.id}`}
              className="block bg-accent rounded-lg p-3 hover:shadow-md transition-all duration-200 cursor-pointer border border-transparent hover:border-border"
            >
              <h4 className="font-[Manrope] font-bold text-foreground mb-2 text-sm line-clamp-2">
                {event.title}
              </h4>
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <Calendar className="w-3 h-3" />
                  <span className="font-[Manrope] font-medium text-xs">{event.date}</span>
                </div>
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <MapPin className="w-3 h-3" />
                  <span className="font-[Manrope] font-medium text-xs">{event.location}</span>
                </div>
              </div>
              <div className="mt-2 pt-2 border-t border-border">
                <span className="font-[Manrope] font-bold text-primary text-xs">
                  {event.attendees} katılımcı
                </span>
              </div>
            </Link>
          ))}
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <Card className="bg-gradient-to-br from-primary to-primary/80 rounded-xl text-primary-foreground border-0 shadow-lg">
        <CardHeader className="pb-3">
          <CardTitle className="font-[Manrope] font-bold text-base">Topluluk İstatistikleri</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 pt-0">
          <div className="flex items-center justify-between">
            <span className="font-[Manrope] font-semibold opacity-90 text-sm">Toplam Üye</span>
            <span className="font-[Manrope] font-bold text-sm">12,458</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-[Manrope] font-semibold opacity-90 text-sm">Tartışmalar</span>
            <span className="font-[Manrope] font-bold text-sm">3,247</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-[Manrope] font-semibold opacity-90 text-sm">Bu Hafta</span>
            <span className="font-[Manrope] font-bold text-sm">+248</span>
          </div>
        </CardContent>
      </Card>
      </div>
    </div>
  )
}

