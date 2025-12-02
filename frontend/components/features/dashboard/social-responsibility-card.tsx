"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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
    <Card className="bg-gradient-to-br from-pink-50 via-rose-50 to-pink-50 dark:from-pink-950/20 dark:via-rose-950/20 dark:to-pink-950/20 border-pink-200/50 dark:border-pink-900/30 rounded-xl shadow-md">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="p-2 bg-pink-100 dark:bg-pink-900/40 rounded-lg">
            <Heart className="w-5 h-5 text-pink-600 dark:text-pink-400" />
          </div>
          <div>
            <CardTitle className="font-[Manrope] text-foreground font-bold text-xl sm:text-2xl">
              Sosyal Sorumluluk
          </CardTitle>
            <p className="font-[Manrope] text-muted-foreground text-sm mt-1">
              Topluma katkıda bulunun, GençCoin kazanın
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
          {projects.map((project) => (
            <Card
              key={project.id}
              className="rounded-lg shadow-sm border-pink-200/50 dark:border-pink-900/30 bg-white/60 dark:bg-background/60 backdrop-blur-sm flex-shrink-0 w-full min-w-[280px] max-w-[280px]"
            >
              <CardContent className="p-4 flex flex-col h-full">
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-[Manrope] text-foreground font-bold text-sm mb-2">
                      {project.title}
                </h3>
                    <p className="font-[Manrope] text-muted-foreground text-xs mb-3">
                      {project.description}
                </p>
                  </div>
                  <Badge className="bg-pink-100 dark:bg-pink-900/40 text-pink-700 dark:text-pink-300 border-pink-300 dark:border-pink-800 font-[Manrope] font-bold text-xs px-2 py-0.5 flex-shrink-0">
                    +{project.coins}
                  </Badge>
                </div>

                <div className="flex items-center gap-4 text-muted-foreground text-xs mb-4">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4" />
                    <span className="font-[Manrope]">{project.date}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Users className="w-4 h-4" />
                    <span className="font-[Manrope]">{project.participants}</span>
                  </div>
                </div>

            <Button
              asChild
                  className="w-full bg-pink-600 hover:bg-pink-700 dark:bg-pink-500 dark:hover:bg-pink-600 text-white font-[Manrope] font-semibold text-sm mt-auto"
            >
              <Link href="/dashboard/contributions">
                    Katıl
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
              </CardContent>
            </Card>
          ))}

          {/* Tüm Projeler Kartı */}
          <Card className="rounded-lg shadow-sm border-pink-200/50 dark:border-pink-900/30 bg-white/60 dark:bg-background/60 backdrop-blur-sm flex-shrink-0 w-full min-w-[280px] max-w-[280px]">
            <CardContent className="p-4 flex flex-col h-full items-center justify-center">
              <div className="text-center mb-4">
                <div className="p-3 bg-pink-100 dark:bg-pink-900/40 rounded-full w-fit mx-auto mb-3">
                  <Heart className="w-6 h-6 text-pink-600 dark:text-pink-400" />
          </div>
                <p className="font-[Manrope] text-foreground font-bold text-base mb-1">
                  Tüm Projeler
            </p>
                <p className="font-[Manrope] text-muted-foreground text-sm">
                  {projects.length} proje
            </p>
          </div>
          <Button
            asChild
            variant="outline"
                className="w-full border-pink-300 dark:border-pink-800 hover:bg-pink-50 dark:hover:bg-pink-950/30 text-pink-700 dark:text-pink-300 font-[Manrope] font-semibold text-sm"
          >
            <Link href="/dashboard/contributions">
                  Görüntüle
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  )
}

