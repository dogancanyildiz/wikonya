/**
 * Rate Limiter - Spam ve flood kontrolü için
 * Kullanıcı eylemlerini zaman bazlı sınırlar
 */

import { User } from "@/lib/types"
import { USER_ROLES } from "@/lib/constants"

/**
 * Kullanıcı eylem kayıtları (gerçek uygulamada database'de tutulmalı)
 */
interface ActionRecord {
  userId: number
  action: string
  timestamp: number
}

// In-memory storage (gerçek uygulamada Redis veya database kullanılmalı)
const actionRecords: ActionRecord[] = []

/**
 * Belirli bir süre içinde yapılan eylem sayısını döndürür
 */
function getActionCount(
  userId: number,
  action: string,
  timeWindowMs: number
): number {
  const now = Date.now()
  const cutoff = now - timeWindowMs

  return actionRecords.filter(
    (record) =>
      record.userId === userId &&
      record.action === action &&
      record.timestamp > cutoff
  ).length
}

/**
 * Eylem kaydı ekler
 */
function recordAction(userId: number, action: string): void {
  const now = Date.now()
  actionRecords.push({
    userId,
    action,
    timestamp: now,
  })

  // Eski kayıtları temizle (1 saatten eski)
  const oneHourAgo = now - 60 * 60 * 1000
  const index = actionRecords.findIndex((r) => r.timestamp > oneHourAgo)
  if (index > 0) {
    actionRecords.splice(0, index)
  }
}

/**
 * Kullanıcının belirli bir eylemi yapıp yapamayacağını kontrol eder
 */
export function canPerformAction(
  user: User | null,
  action: "comment" | "create_topic" | "edit_wiki"
): { allowed: boolean; reason?: string; retryAfter?: number } {
  if (!user) {
    return { allowed: false, reason: "Kullanıcı girişi gerekli" }
  }

  const roleConfig = USER_ROLES[user.role]

  switch (action) {
    case "comment": {
      const commentLimit = roleConfig.commentLimitPerHour
      if (commentLimit === null) {
        // Limit yok, izin ver
        return { allowed: true }
      }

      const oneHour = 60 * 60 * 1000
      const commentCount = getActionCount(user.id, "comment", oneHour)

      if (commentCount >= commentLimit) {
        // Son yorum zamanını bul
        const lastComment = actionRecords
          .filter(
            (r) => r.userId === user.id && r.action === "comment"
          )
          .sort((a, b) => b.timestamp - a.timestamp)[0]

        if (lastComment) {
          const timeSinceLastComment = Date.now() - lastComment.timestamp
          const retryAfter = Math.ceil(
            (oneHour - timeSinceLastComment) / 1000 / 60
          ) // dakika cinsinden

          return {
            allowed: false,
            reason: `Saatte en fazla ${commentLimit} yorum yapabilirsiniz. ${retryAfter} dakika sonra tekrar deneyin.`,
            retryAfter,
          }
        }

        return {
          allowed: false,
          reason: `Saatte en fazla ${commentLimit} yorum yapabilirsiniz.`,
        }
      }

      return { allowed: true }
    }

    case "create_topic":
    case "edit_wiki": {
      // Bu eylemler için şu an limit yok, sadece rol kontrolü yapılıyor
      return { allowed: true }
    }

    default:
      return { allowed: true }
  }
}

/**
 * Eylem kaydı ekler ve limit kontrolü yapar
 */
export function performAction(
  user: User | null,
  action: "comment" | "create_topic" | "edit_wiki"
): { success: boolean; reason?: string; retryAfter?: number } {
  const check = canPerformAction(user, action)

  if (!check.allowed) {
    return {
      success: false,
      reason: check.reason,
      retryAfter: check.retryAfter,
    }
  }

  // Eylemi kaydet
  recordAction(user?.id || 0, action)

  return { success: true }
}

/**
 * Kullanıcının kalan eylem hakkını döndürür
 */
export function getRemainingActions(
  user: User | null,
  action: "comment" | "create_topic" | "edit_wiki"
): { remaining: number; limit: number | null; timeWindow: string } {
  if (!user) {
    return { remaining: 0, limit: null, timeWindow: "1 saat" }
  }

  const roleConfig = USER_ROLES[user.role]

  switch (action) {
    case "comment": {
      const limit = roleConfig.commentLimitPerHour
      if (limit === null) {
        return { remaining: Infinity, limit: null, timeWindow: "1 saat" }
      }

      const oneHour = 60 * 60 * 1000
      const count = getActionCount(user.id, "comment", oneHour)
      const remaining = Math.max(0, limit - count)

      return { remaining, limit, timeWindow: "1 saat" }
    }

    case "create_topic":
    case "edit_wiki":
      return { remaining: Infinity, limit: null, timeWindow: "1 saat" }

    default:
      return { remaining: 0, limit: null, timeWindow: "1 saat" }
  }
}

