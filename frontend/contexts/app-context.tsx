"use client"

import { createContext, useContext, useState, useCallback, ReactNode } from "react"
import { type User } from "@/lib/types"
import type { Notification } from "@/lib/notifications/notification-system"

interface AppState {
  user: User | null
  isAuthenticated: boolean
  notifications: Notification[]
}

interface AppContextType {
  state: AppState
  setUser: (user: User | null) => void
  addNotification: (notification: Notification) => void
  markNotificationAsRead: (notificationId: string) => void
  markAllNotificationsAsRead: () => void
  clearUser: () => void
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>({
    user: null,
    isAuthenticated: false,
    notifications: [],
  })

  const setUser = useCallback((user: User | null) => {
    setState((prev) => ({
      ...prev,
      user,
      isAuthenticated: !!user,
    }))
  }, [])

  const addNotification = useCallback((notification: Notification) => {
    setState((prev) => ({
      ...prev,
      notifications: [notification, ...prev.notifications],
    }))
  }, [])

  const markNotificationAsRead = useCallback((notificationId: string) => {
    setState((prev) => ({
      ...prev,
      notifications: prev.notifications.map((notif) =>
        notif.id === notificationId ? { ...notif, read: true } : notif
      ),
    }))
  }, [])

  const markAllNotificationsAsRead = useCallback(() => {
    setState((prev) => ({
      ...prev,
      notifications: prev.notifications.map((notif) => ({ ...notif, read: true })),
    }))
  }, [])

  const clearUser = useCallback(() => {
    setState((prev) => ({
      ...prev,
      user: null,
      isAuthenticated: false,
      notifications: [],
    }))
  }, [])

  return (
    <AppContext.Provider
      value={{
        state,
        setUser,
        addNotification,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        clearUser,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider")
  }
  return context
}

