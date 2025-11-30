/**
 * Badge System - Rozet kazanma ve yönetim sistemi
 */

import { UserBadge, User, UserRole } from "@/lib/types"

/**
 * Rozet tanımları
 */
export const BADGE_DEFINITIONS = {
  first_comment: {
    id: "first_comment",
    name: "İlk Yorum",
    icon: "💬",
    description: "İlk yorumunu yaptın!",
    condition: (user: User) => {
      if (typeof window === "undefined") return false
      const userStats = JSON.parse(localStorage.getItem(`user_stats_${user.id}`) || "{}")
      return (userStats.commentCount || 0) >= 1
    },
  },
  first_wiki_edit: {
    id: "first_wiki_edit",
    name: "İlk Düzenleme",
    icon: "✏️",
    description: "İlk wiki düzenlemeni yaptın!",
    condition: (user: User) => {
      if (typeof window === "undefined") return false
      const userStats = JSON.parse(localStorage.getItem(`user_stats_${user.id}`) || "{}")
      return (userStats.wikiEditCount || 0) >= 1
    },
  },
  first_topic: {
    id: "first_topic",
    name: "İlk Başlık",
    icon: "📝",
    description: "İlk başlığını açtın!",
    condition: (user: User) => {
      if (typeof window === "undefined") return false
      const userStats = JSON.parse(localStorage.getItem(`user_stats_${user.id}`) || "{}")
      return (userStats.topicCount || 0) >= 1
    },
  },
  seyyah: {
    id: "seyyah",
    name: "Seyyah",
    icon: "🧳",
    description: "Seyyah rolüne ulaştın!",
    condition: (user: User) => user.role === "seyyah",
  },
  gezgin: {
    id: "gezgin",
    name: "Gezgin",
    icon: "🗺️",
    description: "Gezgin rolüne ulaştın!",
    condition: (user: User) => user.role === "gezgin",
  },
  kasif_meraklisi: {
    id: "kasif_meraklisi",
    name: "Kaşif Meraklısı",
    icon: "🔍",
    description: "Kaşif Meraklısı rolüne ulaştın!",
    condition: (user: User) => user.role === "kasif_meraklisi",
  },
  konya_bilgesi: {
    id: "konya_bilgesi",
    name: "Konya Bilgesi",
    icon: "👑",
    description: "Konya Bilgesi rolüne ulaştın!",
    condition: (user: User) => user.role === "konya_bilgesi",
  },
  coin_master_1000: {
    id: "coin_master_1000",
    name: "Binlik Kulüp",
    icon: "💰",
    description: "1000 GençCoin'e ulaştın!",
    condition: (user: User) => user.totalCoins >= 1000,
  },
  coin_master_10000: {
    id: "coin_master_10000",
    name: "On Binlik Kulüp",
    icon: "💎",
    description: "10000 GençCoin'e ulaştın!",
    condition: (user: User) => user.totalCoins >= 10000,
  },
  helpful_contributor: {
    id: "helpful_contributor",
    name: "Yardımsever",
    icon: "🤝",
    description: "10 yorumun mantıklı olarak işaretlendi!",
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    condition: (_user: User) => {
      return false // Mock için
    },
  },
} as const

export type BadgeId = keyof typeof BADGE_DEFINITIONS

/**
 * Kullanıcının kazanabileceği rozetleri kontrol eder ve günceller
 */
export function checkAndAwardBadges(user: User): UserBadge[] {
  const earnedBadges: UserBadge[] = []
  const currentBadgeIds = new Set(user.badges.map((b) => b.id))

  // Tüm rozetleri kontrol et
  Object.entries(BADGE_DEFINITIONS).forEach(([badgeId, badgeDef]) => {
    // Eğer kullanıcı zaten bu rozete sahipse, atla
    if (currentBadgeIds.has(badgeId)) {
      return
    }

    // Rozet koşulunu kontrol et
    if (badgeDef.condition(user)) {
      earnedBadges.push({
        id: badgeId,
        name: badgeDef.name,
        icon: badgeDef.icon,
        description: badgeDef.description,
        earnedAt: new Date().toISOString(),
      })
    }
  })

  return earnedBadges
}

/**
 * Kullanıcıya yeni rozetler ekler
 */
export function addBadgesToUser(user: User, newBadges: UserBadge[]): User {
  if (newBadges.length === 0) {
    return user
  }

  return {
    ...user,
    badges: [...user.badges, ...newBadges],
  }
}

/**
 * Role özel rozetleri döndürür
 */
export function getRoleBadges(role: UserRole): UserBadge[] {
  const roleBadgeId = role as BadgeId
  const badgeDef = BADGE_DEFINITIONS[roleBadgeId]

  if (!badgeDef) {
    return []
  }

  return [
    {
      id: roleBadgeId,
      name: badgeDef.name,
      icon: badgeDef.icon,
      description: badgeDef.description,
      earnedAt: new Date().toISOString(),
    },
  ]
}

