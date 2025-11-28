"use client"

import { FileText, Download, Users, TrendingUp } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export function AcademicStats() {
  const stats = [
    {
      id: 1,
      label: "Toplam Kaynak",
      value: "2,847",
      icon: FileText,
      trend: "+124 bu ay",
    },
    {
      id: 2,
      label: "Toplam İndirme",
      value: "15,234",
      icon: Download,
      trend: "+892 bu hafta",
    },
    {
      id: 3,
      label: "Aktif Katkıcı",
      value: "456",
      icon: Users,
      trend: "+23 yeni",
    },
    {
      id: 4,
      label: "Bu Ay Trend",
      value: "Hukuk",
      icon: TrendingUp,
      trend: "En popüler",
    },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6">
      {stats.map((stat) => {
        const Icon = stat.icon
        return (
          <Card
            key={stat.id}
            className="bg-card rounded-xl shadow-md dark:shadow-lg border border-border"
          >
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-primary/10 to-[#03624c]/5 dark:from-primary/20 dark:to-[#03624c]/10 rounded-xl flex items-center justify-center">
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary" strokeWidth={2.5} />
                </div>
              </div>
              <p className="font-[Manrope] text-foreground mb-1 font-extrabold text-2xl sm:text-[28px] leading-tight">
                {stat.value}
              </p>
              <p className="font-[Manrope] text-foreground/60 dark:text-muted-foreground mb-2 font-medium text-sm sm:text-sm">
                {stat.label}
              </p>
              <p className="font-[Manrope] text-primary font-semibold text-xs">
                {stat.trend}
              </p>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}

