"use client"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Calendar, MapPin, Award, Gift } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { useApp } from "@/contexts/app-context"
import { calculateUserXP, getCoinsNeededForNextRole } from "@/lib/gamification/role-system"
import { ROLE_DISPLAY_NAMES, USER_ROLES } from "@/lib/constants"

export function ProfileCard() {
  const { state } = useApp()
  const user = state.user

  if (!user) {
    return (
      <Card className="bg-white dark:bg-card rounded-[20px] shadow-[0_4px_20px_rgba(0,0,0,0.06)] dark:shadow-lg border border-border h-full flex flex-col">
        <CardContent className="p-6 sm:p-10 flex items-center justify-center">
          <p className="font-[Manrope] text-[#4d4d4d] dark:text-foreground">
            Lütfen giriş yapın
          </p>
        </CardContent>
      </Card>
    )
  }

  const xpInfo = calculateUserXP(user)
  const coinsNeeded = getCoinsNeededForNextRole(user.totalCoins)
  const roleInfo = USER_ROLES[user.role]
  const progressPercentage = xpInfo.progress

  // Tarih formatlama
  const joinedDate = user.joinedAt ? new Date(user.joinedAt) : new Date()
  const monthNames = ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"]
  const formattedDate = `${monthNames[joinedDate.getMonth()]} ${joinedDate.getFullYear()}`

  return (
    <Card className="bg-white dark:bg-card rounded-[20px] shadow-[0_4px_20px_rgba(0,0,0,0.06)] dark:shadow-lg border border-border h-full flex flex-col">
      <CardContent className="p-6 sm:p-10 flex flex-col flex-1">
        <div className="flex items-start gap-4 sm:gap-6 flex-1">
          <Avatar className="w-20 h-20 sm:w-24 sm:h-24 border-4 border-[#f2f4f3] dark:border-border">
            <AvatarFallback className="bg-[#03624c] text-white font-[Manrope] font-extrabold text-2xl sm:text-3xl lg:text-[32px]">
              {user.initials}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 flex flex-col">
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
              <h2 className="font-[Manrope] text-[#4d4d4d] dark:text-foreground font-extrabold text-xl sm:text-2xl lg:text-[28px]">
                {user.name}
              </h2>
              <div className="px-3 sm:px-4 py-1 bg-[#03624c] rounded-full">
                <span className="font-[Manrope] text-white font-bold text-xs sm:text-sm">
                  {ROLE_DISPLAY_NAMES[user.role]}
                </span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 sm:gap-6 mb-3 sm:mb-4">
              {user.location && (
                <div className="flex items-center gap-2 text-[#4d4d4d]/60 dark:text-muted-foreground">
                  <MapPin className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="font-[Manrope] font-medium text-xs sm:text-sm">
                    {user.location}
                  </span>
                </div>
              )}
              <div className="flex items-center gap-2 text-[#4d4d4d]/60 dark:text-muted-foreground">
                <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="font-[Manrope] font-medium text-xs sm:text-sm">
                  {formattedDate}&apos;ten beri üye
                </span>
              </div>
            </div>

            {user.bio && (
              <p className="font-[Manrope] text-[#4d4d4d] dark:text-foreground leading-relaxed font-medium text-xs sm:text-sm flex-1">
                {user.bio}
              </p>
            )}
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
                    {roleInfo.description.toUpperCase()}
                  </p>
                  <p className="font-[Manrope] opacity-90 font-medium text-[10px] sm:text-xs text-[#4d4d4d]/60 dark:text-muted-foreground">
                    {ROLE_DISPLAY_NAMES[user.role].toUpperCase()}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-[Manrope] font-bold text-xs sm:text-sm text-[#03624c]">
                  {xpInfo.current.toLocaleString()} / {xpInfo.nextLevel.toLocaleString()} XP
                </p>
                <p className="font-[Manrope] font-medium text-[10px] sm:text-xs text-[#4d4d4d]/60 dark:text-muted-foreground">
                  %{Math.round(progressPercentage)} tamamlandı
                </p>
              </div>
            </div>
            
            {/* XP Bar */}
            <div className="w-full bg-[#f2f4f3] dark:bg-accent rounded-full h-3 sm:h-4 overflow-hidden">
              <div 
                className="bg-[#03624c] h-full rounded-full transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
            
            {/* XP Progress Text */}
            <div className="flex items-center justify-between mt-1.5 sm:mt-2">
              <span className="font-[Manrope] font-semibold text-[9px] sm:text-[10px] text-[#4d4d4d]/50 dark:text-muted-foreground">
                {roleInfo.minCoins.toLocaleString()} XP
              </span>
              {coinsNeeded !== null ? (
                <span className="font-[Manrope] font-semibold text-[9px] sm:text-[10px] text-[#03624c]">
                  +{coinsNeeded.toLocaleString()} XP kaldı
                </span>
              ) : (
                <span className="font-[Manrope] font-semibold text-[9px] sm:text-[10px] text-[#03624c]">
                  Maksimum seviye
                </span>
              )}
              <span className="font-[Manrope] font-semibold text-[9px] sm:text-[10px] text-[#4d4d4d]/50 dark:text-muted-foreground">
                {roleInfo.maxCoins === Infinity ? "∞" : roleInfo.maxCoins.toLocaleString()} XP
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
            {user.badges.length > 0 ? (
              <>
                {user.badges.slice(0, 3).map((badge) => (
                  <div
                    key={badge.id}
                    className="flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-[#03624c] to-[#024d3c] rounded-xl"
                    title={badge.name}
                  >
                    <span className="font-[Manrope] text-white font-extrabold text-lg sm:text-2xl lg:text-[24px]">
                      {badge.icon}
                    </span>
                  </div>
                ))}
                {user.badges.length > 3 && (
                  <div className="flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-[#f2f4f3] dark:bg-accent rounded-xl">
                    <span className="font-[Manrope] text-[#4d4d4d]/40 dark:text-muted-foreground font-bold text-xs sm:text-xs">
                      +{user.badges.length - 3}
                    </span>
                  </div>
                )}
              </>
            ) : (
              <p className="font-[Manrope] text-[#4d4d4d]/60 dark:text-muted-foreground text-xs sm:text-sm">
                Henüz rozet kazanmadınız
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

