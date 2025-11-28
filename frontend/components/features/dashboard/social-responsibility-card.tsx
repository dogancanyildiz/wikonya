"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, Sparkles, ArrowRight, Users, Calendar } from "lucide-react"
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

  const activeProject = projects.find((p) => p.status === "active")

  return (
    <Card className="bg-gradient-to-br from-rose-500 to-pink-600 rounded-xl border-0 shadow-lg text-white overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-rose-600/20 to-pink-700/20" />
      <CardHeader className="relative z-10">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
            <Heart className="w-6 h-6 text-white" />
          </div>
          <CardTitle className="font-[Manrope] text-white font-bold text-xl sm:text-2xl">
            Sosyal Sorumluluk Projeleri
          </CardTitle>
        </div>
        <CardDescription className="font-[Manrope] text-white/90 text-sm sm:text-base">
          Topluma katkıda bulunun, +100 GençCoin kazanın!
        </CardDescription>
      </CardHeader>
      <CardContent className="relative z-10 space-y-4">
        {activeProject ? (
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h3 className="font-[Manrope] text-white font-bold text-base sm:text-lg mb-1">
                  {activeProject.title}
                </h3>
                <p className="font-[Manrope] text-white/80 text-xs sm:text-sm mb-3">
                  {activeProject.description}
                </p>
                <div className="flex items-center gap-4 text-white/90 text-xs sm:text-sm">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span className="font-[Manrope] font-medium">{activeProject.date}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Users className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span className="font-[Manrope] font-medium">{activeProject.participants} katılımcı</span>
                  </div>
                </div>
              </div>
              <Badge className="bg-white/20 text-white border-white/30 font-[Manrope] font-bold text-xs sm:text-sm px-2 sm:px-3 py-1">
                <Sparkles className="w-3 h-3 mr-1" />
                +{activeProject.coins} Coin
              </Badge>
            </div>
            <Button
              asChild
              className="w-full bg-white text-rose-600 hover:bg-white/90 font-[Manrope] font-bold"
            >
              <Link href="/dashboard/contributions">
                Projeye Katıl
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        ) : (
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center border border-white/20">
            <Heart className="w-12 h-12 text-white/50 mx-auto mb-3" />
            <p className="font-[Manrope] text-white/80 text-sm sm:text-base mb-4">
              Şu anda aktif proje bulunmuyor. Yeni projeler yakında!
            </p>
          </div>
        )}

        <div className="pt-4 border-t border-white/20">
          <div className="flex items-center justify-between mb-2">
            <p className="font-[Manrope] text-white/90 font-semibold text-xs sm:text-sm">
              Toplam Proje
            </p>
            <p className="font-[Manrope] text-white font-bold text-lg sm:text-xl">
              {projects.length}
            </p>
          </div>
          <Button
            asChild
            variant="outline"
            className="w-full border-white/30 text-white hover:bg-white/10 font-[Manrope] font-bold"
          >
            <Link href="/dashboard/contributions">
              Tüm Projeleri Görüntüle
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

