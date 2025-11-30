/**
 * User Stats Utility - Kullanıcı istatistiklerini localStorage'da yönetir
 */

import { User } from "@/lib/types"

interface UserStats {
  commentCount: number
  wikiEditCount: number
  topicCount: number
  lastUpdated: string
}

/**
 * Kullanıcı istatistiklerini localStorage'dan okur
 */
export function getUserStats(userId: number): UserStats {
  if (typeof window === "undefined") {
    return {
      commentCount: 0,
      wikiEditCount: 0,
      topicCount: 0,
      lastUpdated: new Date().toISOString(),
    }
  }

  const stats = localStorage.getItem(`user_stats_${userId}`)
  if (stats) {
    return JSON.parse(stats)
  }

  return {
    commentCount: 0,
    wikiEditCount: 0,
    topicCount: 0,
    lastUpdated: new Date().toISOString(),
  }
}

/**
 * Kullanıcı istatistiklerini localStorage'a kaydeder
 */
export function saveUserStats(userId: number, stats: Partial<UserStats>): void {
  if (typeof window === "undefined") return

  const currentStats = getUserStats(userId)
  const updatedStats: UserStats = {
    ...currentStats,
    ...stats,
    lastUpdated: new Date().toISOString(),
  }

  localStorage.setItem(`user_stats_${userId}`, JSON.stringify(updatedStats))
}

/**
 * Yorum sayısını artırır
 */
export function incrementCommentCount(user: User | null): void {
  if (!user) return
  const stats = getUserStats(user.id)
  saveUserStats(user.id, {
    commentCount: stats.commentCount + 1,
  })
}

/**
 * Wiki düzenleme sayısını artırır
 */
export function incrementWikiEditCount(user: User | null): void {
  if (!user) return
  const stats = getUserStats(user.id)
  saveUserStats(user.id, {
    wikiEditCount: stats.wikiEditCount + 1,
  })
}

/**
 * Topic sayısını artırır
 */
export function incrementTopicCount(user: User | null): void {
  if (!user) return
  const stats = getUserStats(user.id)
  saveUserStats(user.id, {
    topicCount: stats.topicCount + 1,
  })
}

