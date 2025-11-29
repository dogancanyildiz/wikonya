"use client"

import { Bus, Home, ShoppingBasket, Zap, ArrowRight } from "lucide-react"
import { LifeGuideCard } from "./life-guide-card"
import Link from "next/link"

export function LifeGuideSidebar() {
  const guides = [
    {
      id: 1,
      icon: Bus,
      title: "Toplu Taşıma & Elkart Rehberi",
      description: "Konya'da ulaşım sistemleri, kart fiyatları ve güzergahlar.",
      image: "https://images.unsplash.com/photo-1756723701257-46513cd36fc1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaXR5JTIwYnVzJTIwdHJhbnNwb3J0fGVufDF8fHx8MTc2NDE0ODk0NHww&ixlib=rb-4.1.0&q=80&w=1080",
      articles: 8,
    },
    {
      id: 2,
      icon: Home,
      title: "En İyi Öğrenci Mahalleleri",
      description: "Kampüse yakın, güvenli ve uygun fiyatlı semtler.",
      image: "https://images.unsplash.com/photo-1616113364365-b6013f3dad25?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZWlnaGJvcmhvb2QlMjBzdHJlZXR8ZW58MXx8fHwxNzY0MDg0MTI3fDA&ixlib=rb-4.1.0&q=80&w=1080",
      articles: 12,
    },
    {
      id: 3,
      icon: ShoppingBasket,
      title: "Semt Pazarları Günleri",
      description: "Taze ve ucuz alışveriş için pazar takvimi.",
      image: "https://images.unsplash.com/photo-1748342319942-223b99937d4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXJrZXQlMjB2ZWdldGFibGVzJTIwZnJlc2h8ZW58MXx8fHwxNzY0MTc2MTgxfDA&ixlib=rb-4.1.0&q=80&w=1080",
      articles: 6,
    },
    {
      id: 4,
      icon: Zap,
      title: "Fatura & Hizmet Rehberi",
      description: "Elektrik, su, internet başvuruları.",
      image: "https://images.unsplash.com/photo-1662454419736-de132ff75638?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcGFydG1lbnQlMjBiZWRyb29tfGVufDF8fHx8MTc2NDE0MzU1NHww&ixlib=rb-4.1.0&q=80&w=1080",
      articles: 5,
    },
  ]

  return (
    <div>
      {/* Başlık Bölümü - Housing list ile hizalı */}
      <div className="min-h-[88px] sm:min-h-[96px] mb-6 flex items-end">
        <div className="flex items-center justify-between w-full">
          <h2 className="font-[Manrope] text-foreground font-extrabold text-xl sm:text-2xl lg:text-[28px]">
            Yaşam Rehberi
          </h2>
          <Link 
            href="/life-guide"
            className="font-[Manrope] text-primary hover:text-primary/80 transition-colors flex items-center gap-1 font-semibold text-xs"
          >
            Tümünü Gör
            <ArrowRight className="w-3.5 h-3.5" strokeWidth={2} />
          </Link>
        </div>
      </div>

      {/* Rehber Kartları */}
      <div className="space-y-3">
        {guides.map((guide) => (
          <LifeGuideCard key={guide.id} {...guide} />
        ))}
      </div>
    </div>
  )
}

