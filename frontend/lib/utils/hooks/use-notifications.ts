/**
 * useNotifications Hook - Bildirim yönetimi için hook
 */

import { useCallback } from "react"
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
    },
    [addNotification]
  )

  const notifyRolePromoted = useCallback(
    (newRole: string, oldRole: string) => {
      const notification = createRolePromotedNotification(newRole, oldRole)
      addNotification(notification)
    },
    [addNotification]
  )

  const notifyBadgeEarned = useCallback(
    (badgeName: string, badgeIcon: string) => {
      const notification = createBadgeEarnedNotification(badgeName, badgeIcon)
      addNotification(notification)
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
    },
    [addNotification]
  )

  const notifyTopicRejected = useCallback(
    (topicTitle: string, reason?: string) => {
      const notification = createTopicRejectedNotification(topicTitle, reason)
      addNotification(notification)
    },
    [addNotification]
  )

  const notifyProposalApproved = useCallback(
    (proposalId: number) => {
      const notification = createProposalApprovedNotification(proposalId)
      addNotification(notification)
    },
    [addNotification]
  )

  const notifyProposalRejected = useCallback(
    (reason?: string) => {
      const notification = createProposalRejectedNotification(reason)
      addNotification(notification)
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

