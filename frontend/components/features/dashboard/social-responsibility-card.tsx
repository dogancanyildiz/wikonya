"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, ArrowRight, Users, Calendar } from "lucide-react"
import Link from "next/link"

export function SocialResponsibilityCard() {
  const projects = [
    {
      id: 1,
      title: "Çevre Temizlik Projesi",
      description: "Kampüs çevresinde çevre temizliği yaparak doğaya katkıda bulunun",
      date: "15 Ocak 2024",
      participants: 45,
      coins: 100,
      status: "active" as const,
    },
    {
      id: 2,
      title: "Eğitim Desteği Programı",
      description: "İhtiyaç sahibi öğrencilere eğitim materyali desteği sağlayın",
      date: "20 Ocak 2024",
      participants: 32,
      coins: 100,
      status: "upcoming" as const,
    },
    {
      id: 3,
      title: "Kültür Mirası Koruma",
      description: "Konya'nın kültürel mirasını koruma ve tanıtma projesi",
      date: "25 Ocak 2024",
      participants: 28,
      coins: 100,
      status: "upcoming" as const,
    },
  ]

  return (
    <div className="space-y-3">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <Heart className="w-4 h-4 text-rose-600 dark:text-rose-400" />
          <h2 className="font-[Manrope] text-foreground font-bold text-sm">
            Sosyal Sorumluluk
          </h2>
        </div>
        <p className="font-[Manrope] text-muted-foreground text-xs ml-6">
          Topluma katkıda bulunun, GençCoin kazanın
        </p>
      </div>

      <div className="flex gap-2 sm:gap-3 overflow-x-auto pb-2 -mx-4 sm:-mx-6 md:-mx-8 lg:-mx-16 px-4 sm:px-6 md:px-8 lg:px-16 scrollbar-hide">
        {projects.map((project) => (
          <Card
            key={project.id}
            className="rounded-lg shadow-sm border-rose-200/30 dark:border-rose-900/20 bg-gradient-to-br from-rose-50/30 to-pink-50/30 dark:from-rose-950/10 dark:to-pink-950/10 flex-shrink-0 w-[200px] sm:w-[220px]"
          >
            <CardContent className="p-3 flex flex-col h-full">
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="flex-1 min-w-0">
                  <h3 className="font-[Manrope] text-foreground font-bold text-xs mb-1 line-clamp-2">
                    {project.title}
                  </h3>
                  <p className="font-[Manrope] text-muted-foreground text-[10px] line-clamp-2 mb-2">
                    {project.description}
                  </p>
                </div>
                <Badge className="bg-rose-100 dark:bg-rose-900/40 text-rose-700 dark:text-rose-300 border-rose-300 dark:border-rose-800 font-[Manrope] font-bold text-[10px] px-1.5 py-0 flex-shrink-0">
                  +{project.coins}
                </Badge>
              </div>

              <div className="flex items-center gap-2 text-muted-foreground text-[10px] mb-2">
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  <span className="font-[Manrope]">{project.date}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-3 h-3" />
                  <span className="font-[Manrope]">{project.participants}</span>
                </div>
              </div>

              <Button
                asChild
                className="w-full h-6 bg-rose-600 hover:bg-rose-700 dark:bg-rose-500 dark:hover:bg-rose-600 text-white font-[Manrope] font-semibold text-[10px] mt-auto"
              >
                <Link href="/dashboard/contributions">
                  Katıl
                  <ArrowRight className="w-3 h-3 ml-1" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}

        {/* Tüm Projeler Kartı */}
        <Card className="rounded-lg shadow-sm border-rose-200/30 dark:border-rose-900/20 bg-gradient-to-br from-rose-50/30 to-pink-50/30 dark:from-rose-950/10 dark:to-pink-950/10 flex-shrink-0 w-[200px] sm:w-[220px]">
          <CardContent className="p-3 flex flex-col h-full items-center justify-center">
            <div className="text-center mb-3">
              <Heart className="w-6 h-6 text-rose-600 dark:text-rose-400 mx-auto mb-2" />
              <p className="font-[Manrope] text-foreground font-bold text-xs mb-1">
                Tüm Projeler
              </p>
              <p className="font-[Manrope] text-muted-foreground text-[10px]">
                {projects.length} proje
              </p>
            </div>
            <Button
              asChild
              variant="outline"
              className="w-full h-6 border-rose-200 dark:border-rose-900/30 hover:bg-rose-50 dark:hover:bg-rose-950/20 text-rose-700 dark:text-rose-300 font-[Manrope] font-semibold text-[10px]"
            >
              <Link href="/dashboard/contributions">
                Görüntüle
                <ArrowRight className="w-3 h-3 ml-1" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

