/**
 * Notification System - Bildirim yönetim sistemi
 */

export type NotificationType = 
  | "coin_earned"
  | "role_promoted"
  | "badge_earned"
  | "comment_liked"
  | "comment_replied"
  | "wiki_edited"
  | "topic_approved"
  | "topic_rejected"
  | "proposal_approved"
  | "proposal_rejected"

export interface Notification {
  id: string
  type: NotificationType
  title: string
  message: string
  icon: string
  read: boolean
  createdAt: string
  actionUrl?: string
  metadata?: Record<string, unknown>
}

/**
 * Bildirim oluşturma fonksiyonları
 */
export function createCoinEarnedNotification(amount: number, reason: string): Notification {
  return {
    id: `notif_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    type: "coin_earned",
    title: "GençCoin Kazandınız!",
    message: `+${amount} GençCoin kazandınız: ${reason}`,
    icon: "💰",
    read: false,
    createdAt: new Date().toISOString(),
    metadata: { amount, reason },
  }
}

export function createRolePromotedNotification(newRole: string, oldRole: string): Notification {
  return {
    id: `notif_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    type: "role_promoted",
    title: "Rol Terfi Ettiniz!",
    message: `${oldRole} rolünden ${newRole} rolüne terfi ettiniz!`,
    icon: "🎉",
    read: false,
    createdAt: new Date().toISOString(),
    actionUrl: "/dashboard",
    metadata: { newRole, oldRole },
  }
}

export function createBadgeEarnedNotification(badgeName: string, badgeIcon: string): Notification {
  return {
    id: `notif_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    type: "badge_earned",
    title: "Yeni Rozet Kazandınız!",
    message: `${badgeIcon} ${badgeName} rozetini kazandınız!`,
    icon: badgeIcon,
    read: false,
    createdAt: new Date().toISOString(),
    actionUrl: "/dashboard",
    metadata: { badgeName },
  }
}

export function createCommentLikedNotification(commentId: number, author: string): Notification {
  return {
    id: `notif_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    type: "comment_liked",
    title: "Yorumunuz Beğenildi",
    message: `${author} yorumunuzu beğendi`,
    icon: "👍",
    read: false,
    createdAt: new Date().toISOString(),
    actionUrl: `/topic/${commentId}`,
    metadata: { commentId, author },
  }
}

export function createCommentRepliedNotification(commentId: number, author: string): Notification {
  return {
    id: `notif_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    type: "comment_replied",
    title: "Yorumunuza Yanıt Verildi",
    message: `${author} yorumunuza yanıt verdi`,
    icon: "💬",
    read: false,
    createdAt: new Date().toISOString(),
    actionUrl: `/topic/${commentId}`,
    metadata: { commentId, author },
  }
}

export function createTopicApprovedNotification(topicId: number, topicTitle: string): Notification {
  return {
    id: `notif_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    type: "topic_approved",
    title: "Başlığınız Onaylandı",
    message: `"${topicTitle}" başlığınız onaylandı ve yayınlandı`,
    icon: "✅",
    read: false,
    createdAt: new Date().toISOString(),
    actionUrl: `/topic/${topicId}`,
    metadata: { topicId, topicTitle },
  }
}

export function createTopicRejectedNotification(topicTitle: string, reason?: string): Notification {
  return {
    id: `notif_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    type: "topic_rejected",
    title: "Başlığınız Reddedildi",
    message: `"${topicTitle}" başlığınız reddedildi${reason ? `: ${reason}` : ""}`,
    icon: "❌",
    read: false,
    createdAt: new Date().toISOString(),
    metadata: { topicTitle, reason },
  }
}

export function createProposalApprovedNotification(proposalId: number): Notification {
  return {
    id: `notif_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    type: "proposal_approved",
    title: "Düzenleme Teklifiniz Onaylandı",
    message: "Wiki düzenleme teklifiniz onaylandı ve yayınlandı",
    icon: "✅",
    read: false,
    createdAt: new Date().toISOString(),
    metadata: { proposalId },
  }
}

export function createProposalRejectedNotification(reason?: string): Notification {
  return {
    id: `notif_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    type: "proposal_rejected",
    title: "Düzenleme Teklifiniz Reddedildi",
    message: `Wiki düzenleme teklifiniz reddedildi${reason ? `: ${reason}` : ""}`,
    icon: "❌",
    read: false,
    createdAt: new Date().toISOString(),
    metadata: { reason },
  }
}

/**
 * Bildirim yönetimi için utility fonksiyonlar
 */
export function markAsRead(notification: Notification): Notification {
  return {
    ...notification,
    read: true,
  }
}

export function markAllAsRead(notifications: Notification[]): Notification[] {
  return notifications.map((notif) => ({ ...notif, read: true }))
}

export function getUnreadCount(notifications: Notification[]): number {
  return notifications.filter((notif) => !notif.read).length
}

export function sortNotificationsByDate(notifications: Notification[]): Notification[] {
  return [...notifications].sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )
}

