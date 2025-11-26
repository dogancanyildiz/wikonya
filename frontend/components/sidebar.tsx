"use client"

import { Calendar, MapPin, Award, Crown } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function Sidebar() {
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

  const topContributors = [
    {
      id: 1,
      name: "Elif Yıldız",
      initials: "EY",
      contributions: 248,
      badge: "Altın",
    },
    {
      id: 2,
      name: "Burak Arslan",
      initials: "BA",
      contributions: 186,
      badge: "Gümüş",
    },
    {
      id: 3,
      name: "Selin Aydın",
      initials: "SA",
      contributions: 142,
      badge: "Bronz",
    },
    {
      id: 4,
      name: "Emre Çelik",
      initials: "EÇ",
      contributions: 98,
      badge: "Aktif",
    },
  ]

  return (
    <div className="space-y-6 sticky top-24">
      {/* Upcoming Events */}
      <Card className="rounded-[20px] shadow-[0_4px_20px_rgba(0,0,0,0.06)] dark:shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-[#03624c]" />
            <span className="font-[Manrope] font-bold text-[#4d4d4d] dark:text-foreground">Upcoming Events</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {upcomingEvents.map((event) => (
            <div
              key={event.id}
              className="bg-[#f2f4f3] dark:bg-accent rounded-xl p-4 hover:shadow-md transition-shadow cursor-pointer"
            >
              <h4 className="font-[Manrope] font-bold text-[#4d4d4d] dark:text-foreground mb-2">
                {event.title}
              </h4>
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-[#4d4d4d]/60 dark:text-muted-foreground">
                  <Calendar className="w-3 h-3" />
                  <span className="font-[Manrope] font-medium text-sm">{event.date}</span>
                </div>
                <div className="flex items-center gap-2 text-[#4d4d4d]/60 dark:text-muted-foreground">
                  <MapPin className="w-3 h-3" />
                  <span className="font-[Manrope] font-medium text-sm">{event.location}</span>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-gray-200 dark:border-border">
                <span className="font-[Manrope] font-bold text-[#03624c] text-sm">
                  {event.attendees} katılımcı
                </span>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Top Contributors */}
      <Card className="rounded-[20px] shadow-[0_4px_20px_rgba(0,0,0,0.06)] dark:shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="w-5 h-5 text-[#03624c]" />
            <span className="font-[Manrope] font-bold text-[#4d4d4d] dark:text-foreground">Top Contributors</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {topContributors.map((contributor, index) => (
            <div
              key={contributor.id}
              className="bg-[#f2f4f3] dark:bg-accent rounded-xl p-4 hover:shadow-md transition-shadow cursor-pointer relative"
            >
              {index === 0 && (
                <Crown className="w-4 h-4 text-[#FFD700] absolute -top-2 left-6" />
              )}
              <div className="flex items-center gap-3">
                <Avatar className="w-10 h-10 border-2 border-white dark:border-border">
                  <AvatarFallback className="bg-[#03624c] text-white font-[Manrope] font-bold">
                    {contributor.initials}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h4 className="font-[Manrope] font-bold text-[#4d4d4d] dark:text-foreground">
                    {contributor.name}
                  </h4>
                  <p className="font-[Manrope] font-medium text-[#4d4d4d]/60 dark:text-muted-foreground text-sm">
                    {contributor.contributions} katkı
                  </p>
                </div>
                <div className="px-2 py-1 bg-white dark:bg-card rounded-lg">
                  <span className="font-[Manrope] font-bold text-[#03624c] text-sm">
                    {contributor.badge}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <Card className="bg-gradient-to-br from-[#03624c] to-[#024d3c] rounded-[20px] text-white border-0">
        <CardHeader>
          <CardTitle className="font-[Manrope] font-bold">Community Stats</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-[Manrope] font-semibold opacity-90">Toplam Üye</span>
            <span className="font-[Manrope] font-bold">12,458</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-[Manrope] font-semibold opacity-90">Tartışmalar</span>
            <span className="font-[Manrope] font-bold">3,247</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-[Manrope] font-semibold opacity-90">Bu Hafta</span>
            <span className="font-[Manrope] font-bold">+248</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

