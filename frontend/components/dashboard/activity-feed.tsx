"use client"

import { Clock, MessageSquare, ThumbsUp, Award } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function ActivityFeed() {
  const activities = [
    {
      id: 1,
      type: "comment",
      title: "Selçuk Hukuk Final Notları konusunda yorum yaptı",
      time: "2 saat önce",
      coins: "+15",
      icon: MessageSquare,
    },
    {
      id: 2,
      type: "like",
      title: "45 beğeni aldı",
      time: "5 saat önce",
      coins: "+45",
      icon: ThumbsUp,
    },
    {
      id: 3,
      type: "achievement",
      title: "Yeni rozet kazandı: 'Bilgi Ustası'",
      time: "1 gün önce",
      coins: "+100",
      icon: Award,
    },
    {
      id: 4,
      type: "comment",
      title: "Kampüste Spor Salonları tartışmasına katıldı",
      time: "2 gün önce",
      coins: "+10",
      icon: MessageSquare,
    },
  ]

  return (
    <Card className="bg-white dark:bg-card rounded-[20px] shadow-[0_4px_20px_rgba(0,0,0,0.06)] dark:shadow-lg border border-border">
      <CardHeader>
        <CardTitle className="font-[Manrope] text-[#4d4d4d] dark:text-foreground font-bold text-lg sm:text-xl">
          Son Aktiviteler
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 sm:p-8 pt-0">
        <div className="space-y-3 sm:space-y-4">
          {activities.map((activity) => {
            const Icon = activity.icon
            return (
              <div
                key={activity.id}
                className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 bg-[#f2f4f3] dark:bg-accent rounded-xl hover:bg-[#f2f4f3]/70 dark:hover:bg-accent/70 transition-colors"
              >
                <div className="w-9 h-9 sm:w-10 sm:h-10 bg-white dark:bg-card rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-[#03624c]" />
                </div>

                <div className="flex-1">
                  <p className="font-[Manrope] text-[#4d4d4d] dark:text-foreground font-semibold text-xs sm:text-sm">
                    {activity.title}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <Clock className="w-3 h-3 text-[#4d4d4d]/60 dark:text-muted-foreground" />
                    <span className="font-[Manrope] text-[#4d4d4d]/60 dark:text-muted-foreground font-medium text-[10px] sm:text-xs">
                      {activity.time}
                    </span>
                  </div>
                </div>

                <div className="px-2 sm:px-3 py-1 bg-[#03624c] rounded-lg flex-shrink-0">
                  <span className="font-[Manrope] text-white font-bold text-xs sm:text-sm">
                    {activity.coins}
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}

