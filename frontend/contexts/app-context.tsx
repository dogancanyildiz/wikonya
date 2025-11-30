"use client"

import { createContext, useContext, useState, useCallback, useEffect, ReactNode } from "react"
import { type User } from "@/lib/types"
import type { Notification } from "@/lib/notifications/notification-system"

const STORAGE_KEY = "wikonya_user"

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

  // Sayfa yüklendiğinde localStorage'dan user bilgisini yükle
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem(STORAGE_KEY)
      if (storedUser) {
        const user = JSON.parse(storedUser) as User
        // eslint-disable-next-line react-hooks/set-state-in-effect -- Necessary for initializing user from localStorage
        setState((prev) => ({
          ...prev,
          user,
          isAuthenticated: true,
        }))
      }
    } catch (error) {
      console.error("Kullanıcı bilgisi yüklenirken hata oluştu:", error)
      localStorage.removeItem(STORAGE_KEY)
    }
  }, [])

  const setUser = useCallback((user: User | null) => {
    setState((prev) => ({
      ...prev,
      user,
      isAuthenticated: !!user,
    }))

    // localStorage'a kaydet veya temizle
    try {
      if (user) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
      } else {
        localStorage.removeItem(STORAGE_KEY)
      }
    } catch (error) {
      console.error("Kullanıcı bilgisi kaydedilirken hata oluştu:", error)
    }
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

    // localStorage'dan da temizle
    try {
      localStorage.removeItem(STORAGE_KEY)
    } catch (error) {
      console.error("Kullanıcı bilgisi temizlenirken hata oluştu:", error)
    }
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

