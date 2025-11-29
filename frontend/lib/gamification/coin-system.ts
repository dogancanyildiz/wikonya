/**
 * Coin System - GençCoin kazanma ve hesaplama sistemi
 */

import { UserRole, User } from "@/lib/types"
import { COIN_MATRIX } from "@/lib/constants"
import { calculateCoinsWithMultiplier } from "./role-system"
import { checkAndAwardBadges, addBadgesToUser } from "./badge-system"

/**
 * Coin kazanma eylem tipleri
 */
export type CoinAction =
  | "create_topic"
  | "edit_wiki"
  | "comment"
  | "wiki_vote_useful"
  | "wiki_vote_not_useful"
  | "wiki_received_useful_vote"
  | "wiki_received_not_useful_vote"
  | "comment_like"
  | "comment_received_like"
  | "comment_logical"
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
      // Oy veren kullanıcı coin kazanmaz (sadece oy veriyor)
      return 0
    case "wiki_vote_not_useful":
      // Oy veren kullanıcı coin kaybetmez (sadece oy veriyor)
      return 0
    case "wiki_received_useful_vote":
      // Wiki düzenleyen kullanıcı yararlı oy aldığında +5 coin kazanır
      return COIN_MATRIX.wikiVoteUseful
    case "wiki_received_not_useful_vote":
      // Wiki düzenleyen kullanıcı yararsız oy aldığında -10 coin kaybeder
      return COIN_MATRIX.wikiVoteNotUseful
    case "comment_like":
      // Oy veren kullanıcı coin kazanmaz (sadece beğeniyor)
      return 0
    case "comment_received_like":
      // Yorum sahibi beğeni aldığında +1 coin kazanır
      return COIN_MATRIX.commentLike
    case "comment_logical":
      return COIN_MATRIX.commentLogical
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
 * Ayrıca rozet kontrolü yapar
 */
export function addCoinsToUser(user: User, coins: number): User {
  // Negatif coin'e izin ver (yararsız oy durumunda -10 coin olabilir)
  // case.md'ye göre: "Negatif bakiye olabilir, caydırıcılık için önemli"
  const newTotalCoins = user.totalCoins + coins
  const updatedUser = {
    ...user,
    totalCoins: newTotalCoins,
  }

  // Rozet kontrolü yap
  const newBadges = checkAndAwardBadges(updatedUser)
  if (newBadges.length > 0) {
    return addBadgesToUser(updatedUser, newBadges)
  }

  return updatedUser
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

