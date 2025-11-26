"use client"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Calendar, MapPin, Award, Gift } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export function ProfileCard() {
  return (
    <Card className="bg-white dark:bg-card rounded-[20px] shadow-[0_4px_20px_rgba(0,0,0,0.06)] dark:shadow-lg border border-border h-full flex flex-col">
      <CardContent className="p-6 sm:p-10 flex flex-col flex-1">
        <div className="flex items-start gap-4 sm:gap-6 flex-1">
          <Avatar className="w-20 h-20 sm:w-24 sm:h-24 border-4 border-[#f2f4f3] dark:border-border">
            <AvatarFallback className="bg-[#03624c] text-white font-[Manrope] font-extrabold text-2xl sm:text-3xl lg:text-[32px]">
              AY
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 flex flex-col">
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
              <h2 className="font-[Manrope] text-[#4d4d4d] dark:text-foreground font-extrabold text-xl sm:text-2xl lg:text-[28px]">
                Ayşe Yılmaz
              </h2>
              <div className="px-3 sm:px-4 py-1 bg-[#03624c] rounded-full">
                <span className="font-[Manrope] text-white font-bold text-xs sm:text-sm">
                  Konya Bilgesi
                </span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 sm:gap-6 mb-3 sm:mb-4">
              <div className="flex items-center gap-2 text-[#4d4d4d]/60 dark:text-muted-foreground">
                <MapPin className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="font-[Manrope] font-medium text-xs sm:text-sm">
                  Meram, Konya
                </span>
              </div>
              <div className="flex items-center gap-2 text-[#4d4d4d]/60 dark:text-muted-foreground">
                <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="font-[Manrope] font-medium text-xs sm:text-sm">
                  Şubat 2023&apos;ten beri üye
                </span>
              </div>
            </div>

            <p className="font-[Manrope] text-[#4d4d4d] dark:text-foreground leading-relaxed font-medium text-xs sm:text-sm flex-1">
              Hukuk Fakültesi 3. sınıf öğrencisi. Akademik içerik üretmeyi ve kampüs etkinliklerini 
              paylaşmayı seviyorum. Konya&apos;da öğrenci olmak için her şeyi bilmek istiyorum!
            </p>
          </div>
        </div>

        <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-200 dark:border-border">
          {/* Seviye Sistemi ve XP Bar */}
          <div className="mb-4 sm:mb-6">
            <div className="flex items-center justify-between mb-2 sm:mb-3">
              <div className="flex items-center gap-2">
                <div className="bg-gradient-to-br from-[#03624c] to-[#024d3c] rounded-xl p-2 sm:p-2.5 text-white">
                  <Gift className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div>
                  <p className="font-[Manrope] font-bold text-xs sm:text-sm text-[#4d4d4d] dark:text-foreground">
                    BRONZE
                  </p>
                  <p className="font-[Manrope] opacity-90 font-medium text-[10px] sm:text-xs text-[#4d4d4d]/60 dark:text-muted-foreground">
                    SEVIYE 3
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-[Manrope] font-bold text-xs sm:text-sm text-[#03624c]">
                  2,450 / 5,000 XP
                </p>
                <p className="font-[Manrope] font-medium text-[10px] sm:text-xs text-[#4d4d4d]/60 dark:text-muted-foreground">
                  %49 tamamlandı
                </p>
              </div>
            </div>
            
            {/* XP Bar */}
            <div className="w-full bg-[#f2f4f3] dark:bg-accent rounded-full h-3 sm:h-4 overflow-hidden">
              <div 
                className="bg-[#03624c] h-full rounded-full"
                style={{ width: '49%' }}
              />
            </div>
            
            {/* XP Progress Text */}
            <div className="flex items-center justify-between mt-1.5 sm:mt-2">
              <span className="font-[Manrope] font-semibold text-[9px] sm:text-[10px] text-[#4d4d4d]/50 dark:text-muted-foreground">
                0 XP
              </span>
              <span className="font-[Manrope] font-semibold text-[9px] sm:text-[10px] text-[#03624c]">
                +2,550 XP kaldı
              </span>
              <span className="font-[Manrope] font-semibold text-[9px] sm:text-[10px] text-[#4d4d4d]/50 dark:text-muted-foreground">
                5,000 XP
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 mb-2 sm:mb-3">
            <Award className="w-4 h-4 sm:w-5 sm:h-5 text-[#03624c]" />
            <h3 className="font-[Manrope] text-[#4d4d4d] dark:text-foreground font-bold text-sm sm:text-base">
              Son Kazanılan Rozetler
            </h3>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-[#03624c] to-[#024d3c] rounded-xl">
              <span className="font-[Manrope] text-white font-extrabold text-lg sm:text-2xl lg:text-[24px]">
                🏆
              </span>
            </div>
            <div className="flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-[#03624c] to-[#024d3c] rounded-xl">
              <span className="font-[Manrope] text-white font-extrabold text-lg sm:text-2xl lg:text-[24px]">
                📚
              </span>
            </div>
            <div className="flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-[#03624c] to-[#024d3c] rounded-xl">
              <span className="font-[Manrope] text-white font-extrabold text-lg sm:text-2xl lg:text-[24px]">
                ⭐
              </span>
            </div>
            <div className="flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-[#f2f4f3] dark:bg-accent rounded-xl">
              <span className="font-[Manrope] text-[#4d4d4d]/40 dark:text-muted-foreground font-bold text-xs sm:text-xs">
                +12
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

