/**
 * Role System - Kullanıcı rollerini ve çarpan mantığını yönetir
 */

import { UserRole, User } from "@/lib/types"
import { USER_ROLES } from "@/lib/constants"

/**
 * Kullanıcının coin miktarına göre rolünü belirler
 */
export function getUserRole(totalCoins: number): UserRole {
  if (totalCoins >= USER_ROLES.konya_bilgesi.minCoins) {
    return "konya_bilgesi"
  }
  if (totalCoins >= USER_ROLES.kasif_meraklisi.minCoins) {
    return "kasif_meraklisi"
  }
  if (totalCoins >= USER_ROLES.gezgin.minCoins) {
    return "gezgin"
  }
  if (totalCoins >= USER_ROLES.seyyah.minCoins) {
    return "seyyah"
  }
  return "yeni_gelen"
}

/**
 * Kullanıcının rolünü günceller (coin miktarına göre)
 */
export function updateUserRole(user: User): User {
  const newRole = getUserRole(user.totalCoins)
  return {
    ...user,
    role: newRole,
  }
}

/**
 * Rol çarpanını döndürür
 */
export function getRoleMultiplier(role: UserRole): number {
  return USER_ROLES[role].multiplier
}

/**
 * Base coin miktarını rol çarpanı ile çarpar
 */
export function calculateCoinsWithMultiplier(baseCoins: number, role: UserRole): number {
  const multiplier = getRoleMultiplier(role)
  return Math.round(baseCoins * multiplier)
}

/**
 * Bir sonraki role geçmek için gereken coin miktarını döndürür
 */
export function getCoinsNeededForNextRole(currentCoins: number): number | null {
  const currentRole = getUserRole(currentCoins)
  const roleConfig = USER_ROLES[currentRole]

  // Eğer en üst roldeyse, null döndür
  if (currentRole === "konya_bilgesi") {
    return null
  }

  // Bir sonraki rolün minimum coin miktarını bul
  const roleOrder: UserRole[] = ["yeni_gelen", "seyyah", "gezgin", "kasif_meraklisi", "konya_bilgesi"]
  const currentIndex = roleOrder.indexOf(currentRole)
  const nextRole = roleOrder[currentIndex + 1]
  const nextRoleMinCoins = USER_ROLES[nextRole].minCoins

  return nextRoleMinCoins - currentCoins
}

/**
 * Kullanıcının bir sonraki role ilerleme yüzdesini hesaplar (0-100)
 */
export function getRoleProgressPercentage(currentCoins: number): number {
  const currentRole = getUserRole(currentCoins)
  const roleConfig = USER_ROLES[currentRole]

  // Eğer en üst roldeyse, %100 döndür
  if (currentRole === "konya_bilgesi") {
    return 100
  }

  const currentRange = roleConfig.maxCoins - roleConfig.minCoins
  const currentProgress = currentCoins - roleConfig.minCoins

  if (currentRange === 0) return 100

  return Math.min(100, Math.max(0, (currentProgress / currentRange) * 100))
}

/**
 * Rol bilgilerini döndürür
 */
export function getRoleInfo(role: UserRole) {
  return USER_ROLES[role]
}

/**
 * Kullanıcının XP bilgilerini hesaplar
 */
export function calculateUserXP(user: User): { current: number; nextLevel: number; progress: number } {
  const currentRole = getUserRole(user.totalCoins)
  const roleConfig = USER_ROLES[currentRole]

  // XP = Coin miktarı (aynı şey)
  const currentXP = user.totalCoins

  // Bir sonraki role geçmek için gereken toplam coin
  const coinsNeeded = getCoinsNeededForNextRole(user.totalCoins)

  if (coinsNeeded === null) {
    // En üst roldeyse
    return {
      current: currentXP,
      nextLevel: currentXP,
      progress: 100,
    }
  }

  const nextLevelXP = currentXP + coinsNeeded
  const progress = ((currentXP - roleConfig.minCoins) / (roleConfig.maxCoins - roleConfig.minCoins)) * 100

  return {
    current: currentXP,
    nextLevel: nextLevelXP,
    progress: Math.min(100, Math.max(0, progress)),
  }
}

