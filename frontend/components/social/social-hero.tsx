"use client"

import { Star, MapPin, TrendingUp, Users } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export function SocialHero() {
  const trendingVenues = [
    { name: "Kitap & Kahve", category: "Ders Çalışma", visitors: "245" },
    { name: "Meram Kıraathanesi", category: "Canlı Müzik", visitors: "189" },
    { name: "Study Hub Cafe", category: "Sakin Atmosfer", visitors: "167" },
  ]

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
      {/* Left Side - Venue of the Week */}
      <div className="relative rounded-[24px] overflow-hidden h-[400px] sm:h-[500px] shadow-[0_6px_30px_rgba(0,0,0,0.1)] dark:shadow-xl group">
        <Image
          src="https://images.unsplash.com/photo-1739723745132-97df9db49db2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3p5JTIwY2FmZSUyMGludGVyaW9yfGVufDF8fHx8MTc2NDE1ODI0MHww&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Kitap & Kahve"
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          unoptimized
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
        
        {/* Badge */}
        <div className="absolute top-4 sm:top-6 left-4 sm:left-6">
          <div className="px-3 sm:px-4 py-2 bg-[#03624c] rounded-full backdrop-blur-sm">
            <span className="font-[Manrope] text-white font-bold text-xs sm:text-[13px]">
              Haftanın Mekanı 🔥
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
          <h2 className="font-[Manrope] text-white mb-2 font-extrabold text-2xl sm:text-3xl lg:text-[36px] leading-tight">
            Kitap & Kahve
          </h2>
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-3">
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-white/80" strokeWidth={2.5} />
              <span className="font-[Manrope] text-white/90 font-semibold text-sm sm:text-[15px]">
                Bosna Hersek, Meram
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 sm:w-5 sm:h-5 text-[#03624c] fill-[#03624c]" strokeWidth={2.5} />
              <span className="font-[Manrope] text-white font-bold text-sm sm:text-[15px]">
                4.9
              </span>
            </div>
          </div>
          <p className="font-[Manrope] text-white/80 mb-4 font-medium text-xs sm:text-sm leading-relaxed">
            Sakin ortam, sınırsız kahve ve kitap seçenekleriyle ders çalışmak için ideal.
          </p>
          <Button 
            className="px-4 sm:px-6 py-2 sm:py-3 bg-white rounded-xl font-[Manrope] text-[#03624c] hover:bg-white/95 transition-colors shadow-lg font-bold text-xs sm:text-sm"
          >
            Detayları Gör
          </Button>
        </div>
      </div>

      {/* Right Side - Top 3 Trending */}
      <Card className="bg-white dark:bg-card rounded-[24px] shadow-[0_4px_20px_rgba(0,0,0,0.06)] dark:shadow-lg border border-border h-[400px] sm:h-[500px] flex flex-col">
        <CardContent className="p-6 sm:p-8 flex flex-col flex-1">
          <div className="flex items-center gap-2 mb-4 sm:mb-6">
            <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-[#03624c]" strokeWidth={2.5} />
            <h3 className="font-[Manrope] text-[#4d4d4d] dark:text-foreground font-extrabold text-xl sm:text-2xl">
              Bu Hafta Trend
            </h3>
          </div>

          <div className="space-y-3 sm:space-y-4">
            {trendingVenues.map((venue, index) => (
              <div
                key={index}
                className="group flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-2xl hover:bg-[#f2f4f3] dark:hover:bg-accent transition-all cursor-pointer"
              >
                {/* Rank Badge */}
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-[#03624c] to-[#03624c]/80 rounded-xl flex items-center justify-center flex-shrink-0 shadow-[0_4px_16px_rgba(3,98,76,0.3)]">
                  <span className="font-[Manrope] text-white font-extrabold text-lg sm:text-xl">
                    {index + 1}
                  </span>
                </div>

                {/* Venue Info */}
                <div className="flex-1 min-w-0">
                  <h4 className="font-[Manrope] text-[#4d4d4d] dark:text-foreground group-hover:text-[#03624c] transition-colors mb-1 font-bold text-base sm:text-[17px]">
                    {venue.name}
                  </h4>
                  <p className="font-[Manrope] text-[#4d4d4d]/60 dark:text-muted-foreground font-medium text-xs sm:text-[13px]">
                    {venue.category}
                  </p>
                </div>

                {/* Visitors Count */}
                <div className="flex items-center gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 bg-[#03624c]/10 dark:bg-[#03624c]/20 rounded-lg">
                  <Users className="w-3 h-3 sm:w-4 sm:h-4 text-[#03624c]" strokeWidth={2.5} />
                  <span className="font-[Manrope] text-[#03624c] font-bold text-xs sm:text-[13px]">
                    {venue.visitors}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* View All Button */}
          <Button 
            variant="outline"
            className="w-full mt-4 sm:mt-6 py-2 sm:py-3 border-2 border-[#03624c] rounded-xl font-[Manrope] text-[#03624c] hover:bg-[#03624c] hover:text-white dark:hover:bg-[#03624c] dark:hover:text-white transition-all font-bold text-xs sm:text-sm"
          >
            Tüm Trend Mekanları Gör
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

