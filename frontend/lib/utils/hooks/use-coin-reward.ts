/**
 * useCoinReward Hook - Kullanıcı eylemlerinde otomatik coin kazanma
 */

import { useCallback } from "react"
import { useApp } from "@/contexts/app-context"
import { CoinAction } from "@/lib/gamification/coin-system"
import {
  calculateCoinsEarned,
  addCoinsToUser,
  subtractCoinsFromUser,
  createCoinTransaction,
} from "@/lib/gamification/coin-system"
import { updateUserRole } from "@/lib/gamification/role-system"
import { useNotifications } from "./use-notifications"
import { ROLE_DISPLAY_NAMES } from "@/lib/constants"

/**
 * Coin kazanma hook'u
 * Not: Gerçek uygulamada bu işlem backend'de yapılmalı
 */
export function useCoinReward() {
  const { state, setUser } = useApp()
  const user = state.user
  const { notifyCoinEarned, notifyRolePromoted, notifyBadgeEarned } = useNotifications()

  /**
   * Kullanıcıya coin ödülü verir
   */
  const rewardCoins = useCallback(
    (action: CoinAction, metadata?: Record<string, unknown>) => {
      if (!user) return null

      const oldRole = user.role
      const coinsEarned = calculateCoinsEarned(action, user.role)
      const updatedUser = addCoinsToUser(user, coinsEarned)
      const userWithUpdatedRole = updateUserRole(updatedUser)

      // Transaction oluştur (loglama için)
      const transaction = createCoinTransaction(user.id, action, user.role, metadata)

      // Coin kazanma bildirimi
      const actionNames: Record<CoinAction, string> = {
        create_topic: "Yeni başlık açtınız",
        edit_wiki: "Wiki düzenlemesi yaptınız",
        comment: "Yorum yaptınız",
        wiki_vote_useful: "Wiki'ye yararlı oyu verdiniz",
        wiki_vote_not_useful: "Wiki'ye yararsız oyu verdiniz",
        comment_like: "Yorum beğendiniz",
        comment_logical: "Mantıklı yorum işaretlediniz",
        social_responsibility_project: "Sosyal sorumluluk projesi tamamladınız",
      }
      notifyCoinEarned(coinsEarned, actionNames[action] || "Aktivite")

      // Rol terfi kontrolü
      if (userWithUpdatedRole.role !== oldRole) {
        notifyRolePromoted(
          ROLE_DISPLAY_NAMES[userWithUpdatedRole.role],
          ROLE_DISPLAY_NAMES[oldRole]
        )
      }

      // Yeni rozet kontrolü (addCoinsToUser içinde yapılıyor ama bildirim için kontrol ediyoruz)
      const newBadges = userWithUpdatedRole.badges.filter(
        (badge) => !user.badges.some((b) => b.id === badge.id)
      )
      if (newBadges.length > 0) {
        newBadges.forEach((badge) => {
          notifyBadgeEarned(badge.name, badge.icon)
        })
      }

      // Kullanıcıyı güncelle
      setUser(userWithUpdatedRole)

      return {
        coinsEarned,
        newTotalCoins: userWithUpdatedRole.totalCoins,
        newRole: userWithUpdatedRole.role,
        transaction,
      }
    },
    [user, setUser, notifyCoinEarned, notifyRolePromoted, notifyBadgeEarned]
  )

  /**
   * Kullanıcıdan coin çıkarır (ceza için)
   */
  const penalizeCoins = useCallback(
    (action: CoinAction, metadata?: Record<string, unknown>) => {
      if (!user) return null

      const coinsLost = Math.abs(calculateCoinsEarned(action, user.role))
      const updatedUser = subtractCoinsFromUser(user, coinsLost)
      const userWithUpdatedRole = updateUserRole(updatedUser)

      // Transaction oluştur (loglama için)
      const transaction = createCoinTransaction(user.id, action, user.role, metadata)

      // Kullanıcıyı güncelle
      setUser(userWithUpdatedRole)

      return {
        coinsLost,
        newTotalCoins: userWithUpdatedRole.totalCoins,
        newRole: userWithUpdatedRole.role,
        transaction,
      }
    },
    [user, setUser]
  )

  /**
   * Belirli bir coin miktarını ekler (özel durumlar için)
   */
  const addCustomCoins = useCallback(
    (amount: number, reason?: string) => {
      if (!user) return null

      const updatedUser = addCoinsToUser(user, amount)
      const userWithUpdatedRole = updateUserRole(updatedUser)

      setUser(userWithUpdatedRole)

      return {
        coinsAdded: amount,
        newTotalCoins: userWithUpdatedRole.totalCoins,
        newRole: userWithUpdatedRole.role,
        reason,
      }
    },
    [user, setUser]
  )

  return {
    rewardCoins,
    penalizeCoins,
    addCustomCoins,
    user,
  }
}

