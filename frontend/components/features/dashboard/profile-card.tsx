"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar, MapPin, Award, Gift, LogOut } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useApp } from "@/contexts/app-context"
import { calculateUserXP, getCoinsNeededForNextRole } from "@/lib/gamification/role-system"
import { ROLE_DISPLAY_NAMES, USER_ROLES, DEFAULT_AVATAR_URL } from "@/lib/constants"
import { mockLogout } from "@/lib/auth/mock-auth"
import { useRouter } from "next/navigation"

export function ProfileCard() {
  const { state, clearUser } = useApp()
  const router = useRouter()
  const user = state.user

  if (!user) {
    return (
      <Card className="rounded-xl shadow-md border-border h-full flex flex-col">
        <CardContent className="p-6 sm:p-10 flex items-center justify-center">
          <p className="font-[Manrope] text-foreground">
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

  const handleLogout = async () => {
    await mockLogout()
    clearUser()
    router.push("/")
  }

  return (
    <Card className="rounded-xl shadow-md border-border h-full flex flex-col w-full">
      <CardContent className="p-4 sm:p-6 flex flex-col flex-1">
        <div className="flex-1 flex flex-col">
          {/* Üst Bölüm: Profil Bilgileri */}
          <div className="flex items-start gap-4 mb-4 sm:mb-6">
          <Avatar className="w-16 h-16 sm:w-20 sm:h-20 border-2 border-border flex-shrink-0">
            <AvatarImage src={DEFAULT_AVATAR_URL} alt={user.name} />
            <AvatarFallback className="bg-primary text-primary-foreground font-[Manrope] font-extrabold text-xl sm:text-2xl">
              {user.initials}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <h2 className="font-[Manrope] text-foreground font-extrabold text-lg sm:text-xl truncate">
                {user.name}
              </h2>
              <div className="px-2.5 py-0.5 bg-primary rounded-full flex-shrink-0">
                <span className="font-[Manrope] text-primary-foreground font-bold text-[10px] sm:text-xs">
                  {ROLE_DISPLAY_NAMES[user.role]}
                </span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 text-muted-foreground">
              {user.location && (
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3 h-3 flex-shrink-0" />
                  <span className="font-[Manrope] font-medium text-xs">
                    {user.location}
                  </span>
                </div>
              )}
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3 h-3 flex-shrink-0" />
                <span className="font-[Manrope] font-medium text-xs">
                  {formattedDate}&apos;ten beri
                </span>
              </div>
            </div>

            {user.bio && (
              <p className="font-[Manrope] text-foreground leading-relaxed font-medium text-xs sm:text-sm mt-2 line-clamp-2">
                {user.bio}
              </p>
            )}
          </div>
        </div>

        {/* XP Progress Bölümü */}
        <div className="mb-4 sm:mb-6 pb-4 sm:pb-6 border-b border-border">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="bg-primary/10 rounded-lg p-1.5">
                <Gift className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="font-[Manrope] font-bold text-xs text-foreground">
                  {ROLE_DISPLAY_NAMES[user.role]}
                </p>
                <p className="font-[Manrope] font-medium text-[10px] text-muted-foreground">
                  Seviye {user.role}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-[Manrope] font-bold text-xs text-primary">
                {xpInfo.current.toLocaleString()} / {xpInfo.nextLevel.toLocaleString()}
              </p>
              <p className="font-[Manrope] font-medium text-[10px] text-muted-foreground">
                %{Math.round(progressPercentage)}
              </p>
            </div>
          </div>
          
          {/* XP Bar */}
          <div className="w-full bg-accent rounded-full h-2 overflow-hidden mb-1.5">
            <div 
              className="bg-primary h-full rounded-full transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          
          {/* XP Progress Text */}
          <div className="flex items-center justify-between">
            <span className="font-[Manrope] font-medium text-[9px] text-muted-foreground/70">
              {roleInfo.minCoins.toLocaleString()}
            </span>
            {coinsNeeded !== null ? (
              <span className="font-[Manrope] font-medium text-[9px] text-primary">
                +{coinsNeeded.toLocaleString()} kaldı
              </span>
            ) : (
              <span className="font-[Manrope] font-medium text-[9px] text-primary">
                Maksimum seviye
              </span>
            )}
            <span className="font-[Manrope] font-medium text-[9px] text-muted-foreground/70">
              {roleInfo.maxCoins === Infinity ? "∞" : roleInfo.maxCoins.toLocaleString()}
            </span>
          </div>
        </div>

          {/* Rozetler Bölümü */}
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-3">
              <Award className="w-4 h-4 text-primary" />
              <h3 className="font-[Manrope] text-foreground font-bold text-xs sm:text-sm">
                Son Rozetler
              </h3>
            </div>
            <div className="flex items-center gap-2">
              {user.badges.length > 0 ? (
                <>
                  {user.badges.slice(0, 3).map((badge) => (
                    <div
                      key={badge.id}
                      className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-primary to-primary/80 rounded-lg"
                      title={badge.name}
                    >
                      <span className="font-[Manrope] text-primary-foreground font-extrabold text-base sm:text-lg">
                        {badge.icon}
                      </span>
                    </div>
                  ))}
                  {user.badges.length > 3 && (
                    <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-accent rounded-lg">
                      <span className="font-[Manrope] text-muted-foreground/60 font-bold text-xs">
                        +{user.badges.length - 3}
                      </span>
                    </div>
                  )}
                </>
              ) : (
                <p className="font-[Manrope] text-muted-foreground text-xs">
                  Henüz rozet kazanmadınız
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Çıkış Yap Butonu */}
        <div className="pt-4 border-t border-border mt-auto">
          <Button
            onClick={handleLogout}
            variant="outline"
            className="w-full h-9 sm:h-10 border-border hover:bg-destructive hover:text-destructive-foreground hover:border-destructive transition-colors"
          >
            <LogOut className="w-4 h-4 mr-2" />
            <span className="font-[Manrope] font-semibold text-xs sm:text-sm">
              Çıkış Yap
            </span>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

