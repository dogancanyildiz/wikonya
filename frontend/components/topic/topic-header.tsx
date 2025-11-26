"use client"

import { Calendar, Eye, MessageCircle, Share2, Bookmark } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export function TopicHeader() {
  const tags = ["Ders Notu", "Hukuk Fakültesi", "Final Hazırlık"]
  
  return (
    <Card className="bg-white dark:bg-card rounded-[20px] shadow-[0_4px_20px_rgba(0,0,0,0.06)] dark:shadow-lg border border-border">
      <CardContent className="p-6 sm:p-8">
        <div className="flex flex-col lg:flex-row items-start justify-between gap-6">
          <div className="flex-1">
            {/* Title */}
            <h1 className="font-[Manrope] text-[#4d4d4d] dark:text-foreground mb-4 sm:mb-6 font-extrabold text-3xl sm:text-4xl lg:text-[48px] leading-tight">
              Selçuk Hukuk Final Notları
            </h1>
            
            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 mb-4 sm:mb-6">
              <div className="flex items-center gap-2 text-[#4d4d4d]/60 dark:text-muted-foreground">
                <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="font-[Manrope] font-medium text-xs sm:text-sm">
                  Son güncelleme: 25 Kasım 2024
                </span>
              </div>
              <div className="flex items-center gap-2 text-[#4d4d4d]/60 dark:text-muted-foreground">
                <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="font-[Manrope] font-medium text-xs sm:text-sm">
                  3.2k görüntülenme
                </span>
              </div>
              <div className="flex items-center gap-2 text-[#4d4d4d]/60 dark:text-muted-foreground">
                <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="font-[Manrope] font-medium text-xs sm:text-sm">
                  48 yorum
                </span>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              {tags.map((tag) => (
                <div
                  key={tag}
                  className="px-3 sm:px-4 py-1.5 sm:py-2 bg-white dark:bg-card border-2 border-[#03624c] rounded-full"
                >
                  <span className="font-[Manrope] text-[#03624c] font-bold text-xs sm:text-sm">
                    {tag}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Reliability Score */}
          <div className="flex flex-col items-center gap-3 sm:gap-4">
            <div className="relative w-32 h-32 sm:w-40 sm:h-40 flex items-center justify-center">
              {/* Circle Background */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#03624c]/10 to-[#03624c]/5 dark:from-[#03624c]/20 dark:to-[#03624c]/10 border-4 border-[#03624c]"></div>
              
              {/* Score */}
              <div className="relative z-10 text-center">
                <div className="font-[Manrope] text-[#03624c] leading-none font-extrabold text-4xl sm:text-5xl lg:text-[60px]">
                  98%
                </div>
                <div className="font-[Manrope] text-[#03624c] mt-1 font-bold text-xs sm:text-sm">
                  GÜVENİLİRLİK
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-[#f2f4f3] dark:hover:bg-accent rounded-full"
              >
                <Bookmark className="w-4 h-4 sm:w-5 sm:h-5 text-[#4d4d4d] dark:text-foreground" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-[#f2f4f3] dark:hover:bg-accent rounded-full"
              >
                <Share2 className="w-4 h-4 sm:w-5 sm:h-5 text-[#4d4d4d] dark:text-foreground" />
              </Button>
            </div>
          </div>
        </div>

        {/* Wiki Content Preview */}
        <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t-2 border-[#f2f4f3] dark:border-border">
          <h2 className="font-[Manrope] text-[#4d4d4d] dark:text-foreground mb-3 sm:mb-4 font-bold text-xl sm:text-2xl lg:text-[24px]">
            Özet Bilgi
          </h2>
          <p className="font-[Manrope] text-[#4d4d4d] dark:text-foreground leading-relaxed font-medium text-sm sm:text-base">
            Selçuk Üniversitesi Hukuk Fakültesi final sınavlarına hazırlık için derlenmiş kapsamlı 
            ders notları. İçerik; anayasa hukuku, medeni hukuk, ceza hukuku ve ticaret hukuku gibi 
            temel dersleri kapsamaktadır. Notlar, son 3 yılın sınav sorularına göre düzenlenmiş ve 
            akademisyenlerin tavsiyeleri doğrultusunda hazırlanmıştır.
          </p>

          {/* Key Points */}
          <div className="mt-4 sm:mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
            <div className="bg-[#f2f4f3] dark:bg-accent rounded-xl p-3 sm:p-4">
              <div className="font-[Manrope] text-[#03624c] mb-1 font-extrabold text-2xl sm:text-3xl lg:text-[32px]">
                12
              </div>
              <div className="font-[Manrope] text-[#4d4d4d] dark:text-foreground font-semibold text-xs sm:text-sm">
                Ders Konusu
              </div>
            </div>
            <div className="bg-[#f2f4f3] dark:bg-accent rounded-xl p-3 sm:p-4">
              <div className="font-[Manrope] text-[#03624c] mb-1 font-extrabold text-2xl sm:text-3xl lg:text-[32px]">
                156
              </div>
              <div className="font-[Manrope] text-[#4d4d4d] dark:text-foreground font-semibold text-xs sm:text-sm">
                Sayfa
              </div>
            </div>
            <div className="bg-[#f2f4f3] dark:bg-accent rounded-xl p-3 sm:p-4">
              <div className="font-[Manrope] text-[#03624c] mb-1 font-extrabold text-2xl sm:text-3xl lg:text-[32px]">
                4.8/5
              </div>
              <div className="font-[Manrope] text-[#4d4d4d] dark:text-foreground font-semibold text-xs sm:text-sm">
                Ortalama Puan
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

