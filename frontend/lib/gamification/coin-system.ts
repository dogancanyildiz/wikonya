/**
 * Coin System - GençCoin kazanma ve hesaplama sistemi
 */

import { UserRole, User } from "@/lib/types"
import { COIN_MATRIX } from "@/lib/constants"
import { calculateCoinsWithMultiplier } from "./role-system"

/**
 * Coin kazanma eylem tipleri
 */
export type CoinAction =
  | "create_topic"
  | "edit_wiki"
  | "comment"
  | "wiki_vote_useful"
  | "wiki_vote_not_useful"
  | "comment_like"
  | "social_responsibility_project"

/**
 * Eylem için base coin miktarını döndürür
 */
export function getBaseCoinsForAction(action: CoinAction): number {
  switch (action) {
    case "create_topic":
      return COIN_MATRIX.createTopic
    case "edit_wiki":
      return COIN_MATRIX.editWiki
    case "comment":
      return COIN_MATRIX.comment
    case "wiki_vote_useful":
      return COIN_MATRIX.wikiVoteUseful
    case "wiki_vote_not_useful":
      return COIN_MATRIX.wikiVoteNotUseful
    case "comment_like":
      return COIN_MATRIX.commentLike
    case "social_responsibility_project":
      return COIN_MATRIX.socialResponsibilityProject
    default:
      return 0
  }
}

/**
 * Kullanıcının rolüne göre coin kazanma miktarını hesaplar
 */
export function calculateCoinsEarned(action: CoinAction, userRole: UserRole): number {
  const baseCoins = getBaseCoinsForAction(action)
  return calculateCoinsWithMultiplier(baseCoins, userRole)
}

/**
 * Kullanıcıya coin ekler ve yeni toplam coin miktarını döndürür
 */
export function addCoinsToUser(user: User, coins: number): User {
  const newTotalCoins = Math.max(0, user.totalCoins + coins)
  return {
    ...user,
    totalCoins: newTotalCoins,
  }
}

/**
 * Kullanıcıdan coin çıkarır ve yeni toplam coin miktarını döndürür
 */
export function subtractCoinsFromUser(user: User, coins: number): User {
  const newTotalCoins = Math.max(0, user.totalCoins - coins)
  return {
    ...user,
    totalCoins: newTotalCoins,
  }
}

/**
 * Coin kazanma işlemi için transaction objesi
 */
export interface CoinTransaction {
  id: string
  userId: number
  action: CoinAction
  amount: number
  baseAmount: number
  multiplier: number
  timestamp: string
  metadata?: Record<string, unknown>
}

/**
 * Coin transaction oluşturur
 */
export function createCoinTransaction(
  userId: number,
  action: CoinAction,
  userRole: UserRole,
  metadata?: Record<string, unknown>
): CoinTransaction {
  const baseAmount = getBaseCoinsForAction(action)
  const amount = calculateCoinsEarned(action, userRole)
  const multiplier = amount / baseAmount

  return {
    id: `tx_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    userId,
    action,
    amount,
    baseAmount,
    multiplier,
    timestamp: new Date().toISOString(),
    metadata,
  }
}

