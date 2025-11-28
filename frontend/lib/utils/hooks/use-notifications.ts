/**
 * useNotifications Hook - Bildirim yönetimi için hook
 */

import { useCallback } from "react"
import { toast } from "sonner"
import { useApp } from "@/contexts/app-context"
import {
  createCoinEarnedNotification,
  createRolePromotedNotification,
  createBadgeEarnedNotification,
  createCommentLikedNotification,
  createCommentRepliedNotification,
  createTopicApprovedNotification,
  createTopicRejectedNotification,
  createProposalApprovedNotification,
  createProposalRejectedNotification,
  getUnreadCount,
  sortNotificationsByDate,
} from "@/lib/notifications/notification-system"

export function useNotifications() {
  const { state, addNotification, markNotificationAsRead, markAllNotificationsAsRead } = useApp()

  const notifyCoinEarned = useCallback(
    (amount: number, reason: string) => {
      const notification = createCoinEarnedNotification(amount, reason)
      addNotification(notification)
      toast.success(`💰 +${amount} GençCoin`, {
        description: reason,
        duration: 3000,
      })
    },
    [addNotification]
  )

  const notifyRolePromoted = useCallback(
    (newRole: string, oldRole: string) => {
      const notification = createRolePromotedNotification(newRole, oldRole)
      addNotification(notification)
      toast.success("🎉 Rol Terfi Ettiniz!", {
        description: `${oldRole} → ${newRole}`,
        duration: 4000,
      })
    },
    [addNotification]
  )

  const notifyBadgeEarned = useCallback(
    (badgeName: string, badgeIcon: string) => {
      const notification = createBadgeEarnedNotification(badgeName, badgeIcon)
      addNotification(notification)
      toast.success(`${badgeIcon} Yeni Rozet!`, {
        description: `${badgeName} rozetini kazandınız`,
        duration: 3000,
      })
    },
    [addNotification]
  )

  const notifyCommentLiked = useCallback(
    (commentId: number, author: string) => {
      const notification = createCommentLikedNotification(commentId, author)
      addNotification(notification)
    },
    [addNotification]
  )

  const notifyCommentReplied = useCallback(
    (commentId: number, author: string) => {
      const notification = createCommentRepliedNotification(commentId, author)
      addNotification(notification)
    },
    [addNotification]
  )

  const notifyTopicApproved = useCallback(
    (topicId: number, topicTitle: string) => {
      const notification = createTopicApprovedNotification(topicId, topicTitle)
      addNotification(notification)
      toast.success("✅ Başlık Onaylandı", {
        description: `"${topicTitle}" başlığınız yayınlandı`,
        duration: 3000,
      })
    },
    [addNotification]
  )

  const notifyTopicRejected = useCallback(
    (topicTitle: string, reason?: string) => {
      const notification = createTopicRejectedNotification(topicTitle, reason)
      addNotification(notification)
      toast.error("❌ Başlık Reddedildi", {
        description: reason || `"${topicTitle}" başlığınız reddedildi`,
        duration: 4000,
      })
    },
    [addNotification]
  )

  const notifyProposalApproved = useCallback(
    (proposalId: number) => {
      const notification = createProposalApprovedNotification(proposalId)
      addNotification(notification)
      toast.success("✅ Düzenleme Onaylandı", {
        description: "Wiki düzenleme teklifiniz onaylandı",
        duration: 3000,
      })
    },
    [addNotification]
  )

  const notifyProposalRejected = useCallback(
    (reason?: string) => {
      const notification = createProposalRejectedNotification(reason)
      addNotification(notification)
      toast.error("❌ Düzenleme Reddedildi", {
        description: reason || "Wiki düzenleme teklifiniz reddedildi",
        duration: 4000,
      })
    },
    [addNotification]
  )

  const unreadCount = getUnreadCount(state.notifications)
  const sortedNotifications = sortNotificationsByDate(state.notifications)

  return {
    notifications: sortedNotifications,
    unreadCount,
    markAsRead: markNotificationAsRead,
    markAllAsRead: markAllNotificationsAsRead,
    notifyCoinEarned,
    notifyRolePromoted,
    notifyBadgeEarned,
    notifyCommentLiked,
    notifyCommentReplied,
    notifyTopicApproved,
    notifyTopicRejected,
    notifyProposalApproved,
    notifyProposalRejected,
  }
}

