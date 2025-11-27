"use client"

import { useApp } from "@/contexts/app-context"
import { getCoinsNeededForNextRole } from "@/lib/gamification/role-system"
import { USER_ROLES, ROLE_DISPLAY_NAMES } from "@/lib/constants"
import { Card, CardContent } from "@/components/ui/card"
import { Gift } from "lucide-react"

export function XPProgressBar() {
  const { state } = useApp()
  const user = state.user

  if (!user) {
    return null
  }

  const userRole = USER_ROLES[user.role]
  const nextRoleCoinsNeeded = getCoinsNeededForNextRole(user.totalCoins)
  const progressPercentage =
    nextRoleCoinsNeeded !== null
      ? ((user.totalCoins - userRole.minCoins) / (userRole.maxCoins - userRole.minCoins)) * 100
      : 100

  const nextRole = Object.values(USER_ROLES).find(
    (role) => role.minCoins > user.totalCoins
  )

  return (
    <Card className="bg-white dark:bg-card rounded-[20px] shadow-[0_4px_20px_rgba(0,0,0,0.06)] dark:shadow-lg border border-border">
      <CardContent className="p-4 sm:p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-gradient-to-br from-[#03624c] to-[#024d3c] rounded-xl p-2.5 text-white">
            <Gift className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <p className="font-[Manrope] font-bold text-sm sm:text-base text-[#4d4d4d] dark:text-foreground">
              {ROLE_DISPLAY_NAMES[user.role].toUpperCase()}
            </p>
            <p className="font-[Manrope] opacity-90 font-medium text-xs text-[#4d4d4d]/60 dark:text-muted-foreground">
                    SEVIYE {Math.floor(user.totalCoins / 1000) + 1}
            </p>
          </div>
          <div className="text-right">
            <p className="font-[Manrope] font-bold text-sm sm:text-base text-[#03624c]">
              {user.totalCoins.toLocaleString()} / {userRole.maxCoins === Infinity ? "∞" : userRole.maxCoins.toLocaleString()} XP
            </p>
            <p className="font-[Manrope] font-medium text-xs text-[#4d4d4d]/60 dark:text-muted-foreground">
              %{Math.round(progressPercentage)} tamamlandı
            </p>
          </div>
        </div>

        {/* XP Bar */}
        <div className="w-full bg-[#f2f4f3] dark:bg-accent rounded-full h-4 sm:h-5 overflow-hidden mb-2">
          <div
            className="bg-gradient-to-r from-[#03624c] to-[#024d3c] h-full rounded-full transition-all duration-500"
            style={{ width: `${Math.min(100, Math.max(0, progressPercentage))}%` }}
          />
        </div>

        {/* Progress Info */}
        <div className="flex items-center justify-between">
          <span className="font-[Manrope] font-semibold text-[10px] sm:text-xs text-[#4d4d4d]/50 dark:text-muted-foreground">
            {userRole.minCoins.toLocaleString()} XP
          </span>
          {nextRoleCoinsNeeded !== null && nextRole && (
            <span className="font-[Manrope] font-semibold text-[10px] sm:text-xs text-[#03624c]">
              +{nextRoleCoinsNeeded.toLocaleString()} XP → {ROLE_DISPLAY_NAMES[nextRole.id]}
            </span>
          )}
          {nextRoleCoinsNeeded === null && (
            <span className="font-[Manrope] font-semibold text-[10px] sm:text-xs text-[#03624c]">
              Maksimum Seviye
            </span>
          )}
          <span className="font-[Manrope] font-semibold text-[10px] sm:text-xs text-[#4d4d4d]/50 dark:text-muted-foreground">
            {userRole.maxCoins === Infinity ? "∞" : userRole.maxCoins.toLocaleString()} XP
          </span>
        </div>
      </CardContent>
    </Card>
  )
}

