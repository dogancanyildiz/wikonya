"use client"

import { Calendar, MapPin, TrendingUp, MessageCircle, Eye } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

interface SidebarProps {
  onNavigateToTopic?: () => void
}

export function Sidebar({}: SidebarProps = {}) {
  const trendingData = [
    {
      id: 1,
      title: "Meram Kampüsü Yemekhane Fiyatları",
      category: "Sosyal",
      views: "2.4k",
      comments: 87,
      trend: "+12%",
    },
    {
      id: 2,
      title: "Veri Yapıları Final Hazırlık",
      category: "Akademik",
      views: "1.8k",
      comments: 124,
      trend: "+24%",
    },
    {
      id: 3,
      title: "En İyi Öğrenci Yurtları 2024",
      category: "Barınma",
      views: "3.2k",
      comments: 156,
      trend: "+8%",
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
    <aside className="space-y-4 sticky top-20 2xl:top-24" aria-label="Yan panel">
      {/* Trending Topics */}
      <Card className="rounded-xl shadow-md border border-border">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <TrendingUp className="w-4 h-4 text-primary" />
            <span className="font-[Manrope] font-bold text-foreground">Trending Topics</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 pt-0">
          {trendingData.slice(0, 2).map((topic) => (
            <Link
              key={topic.id}
              href={`/topic/${topic.id}`}
              className="block bg-accent rounded-lg p-3 hover:shadow-md transition-all duration-200 cursor-pointer border border-transparent hover:border-border"
            >
              <div className="flex items-start justify-between mb-2">
                <span className="px-2 py-0.5 bg-card rounded-full font-[Manrope] font-semibold text-primary text-xs">
                  {topic.category}
                </span>
                <div className="flex items-center gap-1 text-primary">
                  <TrendingUp className="w-3 h-3" />
                  <span className="font-[Manrope] font-bold text-xs">{topic.trend}</span>
                </div>
              </div>
              <h4 className="font-[Manrope] font-bold text-foreground mb-2 text-sm line-clamp-2">
                {topic.title}
              </h4>
              <div className="flex items-center gap-3 text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Eye className="w-3 h-3" />
                  <span className="font-[Manrope] font-semibold text-xs">{topic.views}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MessageCircle className="w-3 h-3" />
                  <span className="font-[Manrope] font-semibold text-xs">{topic.comments}</span>
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
            <span className="font-[Manrope] font-bold text-foreground">Upcoming Events</span>
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
          <CardTitle className="font-[Manrope] font-bold text-base">Community Stats</CardTitle>
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
    </aside>
  )
}

