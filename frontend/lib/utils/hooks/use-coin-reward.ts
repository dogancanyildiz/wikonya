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
import { User } from "@/lib/types"

/**
 * Coin kazanma hook'u
 * Not: Gerçek uygulamada bu işlem backend'de yapılmalı
 */
export function useCoinReward() {
  const { state, setUser } = useApp()
  const user = state.user

  /**
   * Kullanıcıya coin ödülü verir
   */
  const rewardCoins = useCallback(
    (action: CoinAction, metadata?: Record<string, unknown>) => {
      if (!user) return null

      const coinsEarned = calculateCoinsEarned(action, user.role)
      const updatedUser = addCoinsToUser(user, coinsEarned)
      const userWithUpdatedRole = updateUserRole(updatedUser)

      // Transaction oluştur (loglama için)
      const transaction = createCoinTransaction(user.id, action, user.role, metadata)

      // Kullanıcıyı güncelle
      setUser(userWithUpdatedRole)

      return {
        coinsEarned,
        newTotalCoins: userWithUpdatedRole.totalCoins,
        newRole: userWithUpdatedRole.role,
        transaction,
      }
    },
    [user, setUser]
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

