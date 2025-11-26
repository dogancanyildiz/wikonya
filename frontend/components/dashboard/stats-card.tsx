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
    <div className="grid grid-cols-2 gap-[5px]">
      {stats.map((stat) => {
        const Icon = stat.icon
        return (
          <Card
            key={stat.id}
            className="bg-white dark:bg-card rounded-[20px] shadow-[0_4px_20px_rgba(0,0,0,0.06)] dark:shadow-lg hover:shadow-[0_6px_30px_rgba(0,0,0,0.1)] dark:hover:shadow-xl transition-shadow border border-border"
          >
            <CardContent className="p-3 sm:p-4">
              <div className="flex items-center justify-between mb-1.5 sm:mb-2">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-[#f2f4f3] dark:bg-accent rounded-xl flex items-center justify-center">
                  <Icon className="w-3 h-3 sm:w-4 sm:h-4 text-[#03624c]" />
                </div>
              </div>
              
              <p className="font-[Manrope] text-[#4d4d4d] dark:text-foreground font-bold text-lg sm:text-xl lg:text-[18px] leading-tight">
                {stat.value}
              </p>
              
              <p className="font-[Manrope] text-[#4d4d4d]/60 dark:text-muted-foreground mt-0.5 sm:mt-1 font-medium text-[10px] sm:text-xs">
                {stat.label}
              </p>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}

