"use client"

import { Bus, Home, ShoppingBasket, Zap, Utensils, Heart } from "lucide-react"
import { LifeGuideCard } from "./life-guide-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function LifeGuideSidebar() {
  const guides = [
    {
      id: 1,
      icon: Bus,
      title: "Toplu Taşıma & Elkart Rehberi",
      description: "Konya'da ulaşım sistemleri, kart fiyatları ve güzergahlar hakkında bilgi.",
      image: "https://images.unsplash.com/photo-1756723701257-46513cd36fc1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaXR5JTIwYnVzJTIwdHJhbnNwb3J0fGVufDF8fHx8MTc2NDE0ODk0NHww&ixlib=rb-4.1.0&q=80&w=1080",
      articles: 8,
    },
    {
      id: 2,
      icon: Home,
      title: "En İyi Öğrenci Mahalleleri",
      description: "Kampüse yakın, güvenli ve uygun fiyatlı semtler rehberi.",
      image: "https://images.unsplash.com/photo-1616113364365-b6013f3dad25?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZWlnaGJvcmhvb2QlMjBzdHJlZXR8ZW58MXx8fHwxNzY0MDg0MTI3fDA&ixlib=rb-4.1.0&q=80&w=1080",
      articles: 12,
    },
    {
      id: 3,
      icon: ShoppingBasket,
      title: "Semt Pazarları Günleri",
      description: "Taze ve ucuz alışveriş için Konya semt pazarları takvimi.",
      image: "https://images.unsplash.com/photo-1748342319942-223b99937d4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXJrZXQlMjB2ZWdldGFibGVzJTIwZnJlc2h8ZW58MXx8fHwxNzY0MTc2MTgxfDA&ixlib=rb-4.1.0&q=80&w=1080",
      articles: 6,
    },
    {
      id: 4,
      icon: Zap,
      title: "Fatura & Hizmet Rehberi",
      description: "Elektrik, su, internet başvuruları ve ödeme bilgileri.",
      image: "https://images.unsplash.com/photo-1662454419736-de132ff75638?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcGFydG1lbnQlMjBiZWRyb29tfGVufDF8fHx8MTc2NDE0MzU1NHww&ixlib=rb-4.1.0&q=80&w=1080",
      articles: 5,
    },
    {
      id: 5,
      icon: Utensils,
      title: "Bütçeye Uygun Yemek Rehberi",
      description: "Öğrenci dostudur lokantalar ve ekonomik menüler.",
      image: "https://images.unsplash.com/photo-1612419299101-6c294dc2901d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3p5JTIwYXBhcnRtZW50JTIwbGl2aW5nJTIwcm9vbXxlbnwxfHx8fDE3NjQxNTIxODB8MA&ixlib=rb-4.1.0&q=80&w=1080",
      articles: 15,
    },
  ]

  return (
    <div>
      <Card className="bg-gradient-to-br from-[#03624c] to-[#03624c]/80 rounded-[24px] text-white border-0 mb-4 sm:mb-6">
        <CardHeader>
          <CardTitle className="font-[Manrope] mb-2 font-extrabold text-xl sm:text-2xl lg:text-[28px]">
            Konya&apos;da Yaşam 101
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="font-[Manrope] text-white/90 font-medium text-xs sm:text-sm leading-relaxed">
            Şehre yeni geldin mi? Yaşamı kolaylaştıracak pratik rehberler burada.
          </p>
        </CardContent>
      </Card>

      <div className="space-y-4 sm:space-y-6">
        {guides.map((guide) => (
          <div key={guide.id} className="w-full">
            <LifeGuideCard {...guide} />
          </div>
        ))}
      </div>

      {/* Quick Tips Card */}
      <Card className="mt-4 sm:mt-6 bg-white dark:bg-card rounded-[20px] shadow-[0_4px_20px_rgba(0,0,0,0.06)] dark:shadow-lg border border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-[#03624c]" strokeWidth={2.5} />
            <span className="font-[Manrope] text-[#4d4d4d] dark:text-foreground font-bold text-sm sm:text-base">
              Hızlı İpuçları
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 sm:space-y-3">
          <div className="flex items-start gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-[#03624c] mt-2 flex-shrink-0"></div>
            <p className="font-[Manrope] text-[#4d4d4d]/70 dark:text-muted-foreground font-medium text-xs sm:text-[13px] leading-relaxed">
              Elkart&apos;ı ilk ay ücretsiz dene
            </p>
          </div>
          <div className="flex items-start gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-[#03624c] mt-2 flex-shrink-0"></div>
            <p className="font-[Manrope] text-[#4d4d4d]/70 dark:text-muted-foreground font-medium text-xs sm:text-[13px] leading-relaxed">
              Pazarlar Cuma günü en ucuz
            </p>
          </div>
          <div className="flex items-start gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-[#03624c] mt-2 flex-shrink-0"></div>
            <p className="font-[Manrope] text-[#4d4d4d]/70 dark:text-muted-foreground font-medium text-xs sm:text-[13px] leading-relaxed">
              Yurt başvurularını erken yap
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

