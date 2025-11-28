"use client"

import { Briefcase, Calendar, DollarSign } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export function CareerStats() {
  const stats = [
    {
      id: 1,
      label: "Aktif Staj İlanı",
      value: "12",
      icon: Briefcase,
      color: "from-primary to-[#03624c]/80",
    },
    {
      id: 2,
      label: "Yaklaşan Etkinlik",
      value: "5",
      icon: Calendar,
      color: "from-blue-500 to-blue-400",
    },
    {
      id: 3,
      label: "Burs Fırsatı",
      value: "3",
      icon: DollarSign,
      color: "from-amber-500 to-amber-400",
    },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
      {stats.map((stat) => {
        const Icon = stat.icon
        return (
          <Card
            key={stat.id}
            className="bg-card rounded-xl shadow-md dark:shadow-lg hover:shadow-lg dark:hover:shadow-xl transition-all border border-border"
          >
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <div className={`w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center shadow-lg`}>
                  <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" strokeWidth={2.5} />
                </div>
                <span className="font-[Manrope] text-primary font-black text-2xl sm:text-3xl lg:text-[36px]">
                  {stat.value}
                </span>
              </div>
              <p className="font-[Manrope] text-foreground font-bold text-sm sm:text-[15px]">
                {stat.label}
              </p>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}

