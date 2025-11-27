"use client"

import { Calendar, MapPin, TrendingUp, MessageCircle, Eye } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface SidebarProps {
  onNavigateToTopic?: () => void
}

export function Sidebar({ onNavigateToTopic }: SidebarProps = {}) {
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
    <div className="space-y-4 sticky 2xl:top-3">
      {/* Trending Topics */}
      <Card className="rounded-[20px] shadow-[0_4px_20px_rgba(0,0,0,0.06)] dark:shadow-lg">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <TrendingUp className="w-4 h-4 text-[#03624c]" />
            <span className="font-[Manrope] font-bold text-[#4d4d4d] dark:text-foreground">Trending Topics</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2.5 pt-0">
          {trendingData.slice(0, 2).map((topic) => (
            <div
              key={topic.id}
              onClick={onNavigateToTopic}
              className="bg-[#f2f4f3] dark:bg-accent rounded-xl p-2.5 hover:shadow-md transition-shadow cursor-pointer"
            >
              <div className="flex items-start justify-between mb-1.5">
                <span className="px-2 py-0.5 bg-white dark:bg-card rounded-full font-[Manrope] font-semibold text-[#03624c] text-xs">
                  {topic.category}
                </span>
                <div className="flex items-center gap-0.5 text-[#03624c]">
                  <TrendingUp className="w-2.5 h-2.5" />
                  <span className="font-[Manrope] font-bold text-xs">{topic.trend}</span>
                </div>
              </div>
              <h4 className="font-[Manrope] font-bold text-[#4d4d4d] dark:text-foreground mb-1.5 text-sm line-clamp-2">
                {topic.title}
              </h4>
                <div className="flex items-center gap-2 text-[#4d4d4d]/60 dark:text-muted-foreground">
                <div className="flex items-center gap-0.5">
                  <Eye className="w-2.5 h-2.5" />
                  <span className="font-[Manrope] font-semibold text-xs">{topic.views}</span>
                </div>
                <div className="flex items-center gap-0.5">
                  <MessageCircle className="w-2.5 h-2.5" />
                  <span className="font-[Manrope] font-semibold text-xs">{topic.comments}</span>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Upcoming Events */}
      <Card className="rounded-[20px] shadow-[0_4px_20px_rgba(0,0,0,0.06)] dark:shadow-lg">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <Calendar className="w-4 h-4 text-[#03624c]" />
            <span className="font-[Manrope] font-bold text-[#4d4d4d] dark:text-foreground">Upcoming Events</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2.5 pt-0">
          {upcomingEvents.slice(0, 2).map((event) => (
            <div
              key={event.id}
              className="bg-[#f2f4f3] dark:bg-accent rounded-xl p-2.5 hover:shadow-md transition-shadow cursor-pointer"
            >
              <h4 className="font-[Manrope] font-bold text-[#4d4d4d] dark:text-foreground mb-1.5 text-sm line-clamp-2">
                {event.title}
                  </h4>
              <div className="space-y-0.5">
                <div className="flex items-center gap-1.5 text-[#4d4d4d]/60 dark:text-muted-foreground">
                  <Calendar className="w-2.5 h-2.5" />
                  <span className="font-[Manrope] font-medium text-xs">{event.date}</span>
                </div>
                <div className="flex items-center gap-1.5 text-[#4d4d4d]/60 dark:text-muted-foreground">
                  <MapPin className="w-2.5 h-2.5" />
                  <span className="font-[Manrope] font-medium text-xs">{event.location}</span>
                </div>
              </div>
              <div className="mt-2 pt-2 border-t border-gray-200 dark:border-border">
                <span className="font-[Manrope] font-bold text-[#03624c] text-xs">
                  {event.attendees} katılımcı
                </span>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <Card className="bg-gradient-to-br from-[#03624c] to-[#024d3c] rounded-[20px] text-white border-0">
        <CardHeader className="pb-3">
          <CardTitle className="font-[Manrope] font-bold text-base">Community Stats</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 pt-0">
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
  )
}

