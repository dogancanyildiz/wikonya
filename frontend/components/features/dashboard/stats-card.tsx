"use client"

import { MessageSquare, ThumbsUp, BookOpen, Users } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export function StatsCard() {
  const stats = [
    {
      id: 1,
      label: "Toplam Gönderiler",
      value: "45",
      subtext: "Entries",
      icon: MessageSquare,
      color: "#03624c",
    },
    {
      id: 2,
      label: "Aldığı Beğeniler",
      value: "1,234",
      subtext: "Likes",
      icon: ThumbsUp,
      color: "#03624c",
    },
    {
      id: 3,
      label: "Oluşturulan İçerik",
      value: "18",
      subtext: "Wiki Articles",
      icon: BookOpen,
      color: "#03624c",
    },
    {
      id: 4,
      label: "Takipçi",
      value: "567",
      subtext: "Followers",
      icon: Users,
      color: "#03624c",
    },
  ]

  return (
    <div className="grid grid-cols-2 gap-2 sm:gap-4">
      {stats.map((stat) => {
        const Icon = stat.icon
        return (
          <Card
            key={stat.id}
            className="rounded-xl shadow-md hover:shadow-lg transition-shadow border-border"
          >
            <CardContent className="p-3 sm:p-4">
              <div className="flex items-center justify-between mb-1.5 sm:mb-2">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-accent rounded-lg flex items-center justify-center">
                  <Icon className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
                </div>
              </div>
              
              <p className="font-[Manrope] text-foreground font-bold text-lg sm:text-xl lg:text-[18px] leading-tight">
                {stat.value}
              </p>
              
              <p className="font-[Manrope] text-muted-foreground mt-0.5 sm:mt-1 font-medium text-[10px] sm:text-xs">
                {stat.label}
              </p>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}

