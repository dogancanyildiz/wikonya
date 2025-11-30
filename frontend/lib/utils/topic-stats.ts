/**
 * Topic istatistiklerini (beğeni, yorum, mantıklı) localStorage'da yönetir
 */

import { User } from "@/lib/types"

interface TopicStats {
  likes: number
  makesSense: number
  comments: number
  userLikes: Record<number, boolean> // userId -> isLiked
  userMakesSense: Record<number, boolean> // userId -> isMakesSense
  lastUpdated: string
}

const getTopicStatsKey = (topicId: number) => `topic_stats_${topicId}`

/**
 * Topic istatistiklerini localStorage'dan okur
 */
export function getTopicStats(topicId: number): TopicStats {
  if (typeof window === "undefined") {
    return {
      likes: 0,
      makesSense: 0,
      comments: 0,
      userLikes: {},
      userMakesSense: {},
      lastUpdated: new Date().toISOString(),
    }
  }

  const stored = localStorage.getItem(getTopicStatsKey(topicId))
  if (stored) {
    try {
      return JSON.parse(stored)
    } catch {
      // Parse hatası durumunda varsayılan değerler
    }
  }

  return {
    likes: 0,
    makesSense: 0,
    comments: 0,
    userLikes: {},
    userMakesSense: {},
    lastUpdated: new Date().toISOString(),
  }
}

/**
 * Topic istatistiklerini localStorage'a kaydeder
 */
export function saveTopicStats(topicId: number, stats: Partial<TopicStats>): void {
  if (typeof window === "undefined") return

  const currentStats = getTopicStats(topicId)
  const updatedStats: TopicStats = {
    ...currentStats,
    ...stats,
    lastUpdated: new Date().toISOString(),
  }

  localStorage.setItem(getTopicStatsKey(topicId), JSON.stringify(updatedStats))
}

/**
 * Topic beğenisini toggle eder
 */
export function toggleTopicLike(topicId: number, user: User | null, initialLikes: number): number {
  if (!user) return initialLikes

  const stats = getTopicStats(topicId)
  const isLiked = stats.userLikes[user.id] || false
  const newIsLiked = !isLiked

  // Eğer ilk kez kaydediliyorsa, initial değerleri kullan
  if (Object.keys(stats.userLikes).length === 0 && stats.likes === 0) {
    stats.likes = initialLikes
  }

  const newLikes = newIsLiked ? stats.likes + 1 : stats.likes - 1

  saveTopicStats(topicId, {
    likes: newLikes,
    userLikes: {
      ...stats.userLikes,
      [user.id]: newIsLiked,
    },
  })

  return newLikes
}

/**
 * Topic "mantıklı" oyunu toggle eder
 */
export function toggleTopicMakesSense(topicId: number, user: User | null, initialMakesSense: number): number {
  if (!user) return initialMakesSense

  const stats = getTopicStats(topicId)
  const isMakesSense = stats.userMakesSense[user.id] || false
  const newIsMakesSense = !isMakesSense

  // Eğer ilk kez kaydediliyorsa, initial değerleri kullan
  if (Object.keys(stats.userMakesSense).length === 0 && stats.makesSense === 0) {
    stats.makesSense = initialMakesSense
  }

  const newMakesSense = newIsMakesSense ? stats.makesSense + 1 : stats.makesSense - 1

  saveTopicStats(topicId, {
    makesSense: newMakesSense,
    userMakesSense: {
      ...stats.userMakesSense,
      [user.id]: newIsMakesSense,
    },
  })

  return newMakesSense
}

/**
 * Topic yorum sayısını artırır
 */
export function incrementTopicComments(topicId: number, initialComments: number): number {
  const stats = getTopicStats(topicId)

  // Eğer ilk kez kaydediliyorsa, initial değerleri kullan
  if (stats.comments === 0) {
    stats.comments = initialComments
  }

  const newComments = stats.comments + 1

  saveTopicStats(topicId, {
    comments: newComments,
  })

  return newComments
}

/**
 * Kullanıcının topic'i beğenip beğenmediğini kontrol eder
 */
export function isTopicLikedByUser(topicId: number, user: User | null): boolean {
  if (!user) return false
  const stats = getTopicStats(topicId)
  return stats.userLikes[user.id] || false
}

/**
 * Kullanıcının topic'e "mantıklı" oyu verip vermediğini kontrol eder
 */
export function isTopicMakesSenseByUser(topicId: number, user: User | null): boolean {
  if (!user) return false
  const stats = getTopicStats(topicId)
  return stats.userMakesSense[user.id] || false
}

/**
 * Topic istatistiklerini initial değerlerle başlatır (eğer yoksa)
 */
export function initializeTopicStats(topicId: number, initialStats: { likes: number; makesSense: number; comments: number }): void {
  const stats = getTopicStats(topicId)
  
  // Eğer hiç kayıt yoksa, initial değerleri kullan
  if (stats.likes === 0 && stats.makesSense === 0 && stats.comments === 0 && Object.keys(stats.userLikes).length === 0) {
    saveTopicStats(topicId, {
      likes: initialStats.likes,
      makesSense: initialStats.makesSense,
      comments: initialStats.comments,
    })
  }
}

