/**
 * Permissions System - Rol bazlı yetki kontrolü
 */

import { User } from "@/lib/types"
import { USER_ROLES } from "@/lib/constants"

/**
 * Kullanıcının yeni başlık açıp açamayacağını kontrol eder
 */
export function canCreateTopic(user: User | null): boolean {
  if (!user) return false
  const roleInfo = USER_ROLES[user.role]
  return roleInfo.canCreateTopic ?? false
}

/**
 * Kullanıcının Wiki'yi doğrudan düzenleyip düzenleyemeyeceğini kontrol eder
 */
export function canEditWiki(user: User | null): boolean {
  if (!user) return false
  const roleInfo = USER_ROLES[user.role]
  return roleInfo.canEditWiki ?? false
}

/**
 * Kullanıcının Wiki düzenleme teklifi yapıp yapamayacağını kontrol eder
 */
export function canProposeWikiEdit(user: User | null): boolean {
  if (!user) return false
  const roleInfo = USER_ROLES[user.role]
  return roleInfo.canEditWikiProposal ?? false
}

/**
 * Kullanıcının moderasyon yapıp yapamayacağını kontrol eder
 */
export function canModerate(user: User | null): boolean {
  if (!user) return false
  const roleInfo = USER_ROLES[user.role]
  return roleInfo.canModerate ?? false
}

/**
 * Kullanıcının düzenleme tekliflerini onaylayıp onaylayamayacağını kontrol eder
 */
export function canApproveProposals(user: User | null): boolean {
  if (!user) return false
  const roleInfo = USER_ROLES[user.role]
  return "canApproveProposals" in roleInfo && roleInfo.canApproveProposals === true
}

/**
 * Kullanıcının admin paneline erişip erişemeyeceğini kontrol eder
 */
export function canAccessAdminPanel(user: User | null): boolean {
  if (!user) return false
  const roleInfo = USER_ROLES[user.role]
  return "canAccessAdminPanel" in roleInfo && roleInfo.canAccessAdminPanel === true
}

/**
 * Kullanıcının yorum yapıp yapamayacağını kontrol eder (rate limit dahil)
 */
export function canComment(user: User | null, commentsInLastHour: number): boolean {
  if (!user) return false
  const roleInfo = USER_ROLES[user.role]
  
  // Eğer limit yoksa, her zaman yorum yapabilir
  if (roleInfo.commentLimitPerHour === null) return true
  
  // Limit varsa kontrol et
  return commentsInLastHour < roleInfo.commentLimitPerHour
}

/**
 * Kullanıcının kalan yorum hakkını döndürür
 */
export function getRemainingCommentQuota(user: User | null, commentsInLastHour: number): number | null {
  if (!user) return null
  const roleInfo = USER_ROLES[user.role]
  
  if (roleInfo.commentLimitPerHour === null) return null
  
  return Math.max(0, roleInfo.commentLimitPerHour - commentsInLastHour)
}

/**
 * Tüm yetkileri bir obje olarak döndürür
 */
export function getUserPermissions(user: User | null) {
  return {
    canCreateTopic: canCreateTopic(user),
    canEditWiki: canEditWiki(user),
    canProposeWikiEdit: canProposeWikiEdit(user),
    canModerate: canModerate(user),
    canApproveProposals: canApproveProposals(user),
    canAccessAdminPanel: canAccessAdminPanel(user),
  }
}

