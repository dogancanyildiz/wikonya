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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      {stats.map((stat) => {
        const Icon = stat.icon
        return (
          <Card
            key={stat.id}
            className="bg-white dark:bg-card rounded-[20px] shadow-[0_4px_20px_rgba(0,0,0,0.06)] dark:shadow-lg hover:shadow-[0_6px_30px_rgba(0,0,0,0.1)] dark:hover:shadow-xl transition-shadow border border-border"
          >
            <CardContent className="p-6 sm:p-8">
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#f2f4f3] dark:bg-accent rounded-xl flex items-center justify-center">
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-[#03624c]" />
                </div>
              </div>
              
              <p className="font-[Manrope] text-[#4d4d4d] dark:text-foreground font-bold text-2xl sm:text-3xl lg:text-[36px] leading-tight">
                {stat.value}
              </p>
              
              <p className="font-[Manrope] text-[#4d4d4d]/60 dark:text-muted-foreground mt-1 sm:mt-2 font-medium text-xs sm:text-sm">
                {stat.label}
              </p>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}

