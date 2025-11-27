"use client"

import { createContext, useContext, useState, useCallback, ReactNode } from "react"
import { type User } from "@/lib/types"

interface AppState {
  user: User | null
  isAuthenticated: boolean
  notifications: number
}

interface AppContextType {
  state: AppState
  setUser: (user: User | null) => void
  setNotifications: (count: number) => void
  clearUser: () => void
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>({
    user: null,
    isAuthenticated: false,
    notifications: 0,
  })

  const setUser = useCallback((user: User | null) => {
    setState((prev) => ({
      ...prev,
      user,
      isAuthenticated: !!user,
    }))
  }, [])

  const setNotifications = useCallback((count: number) => {
    setState((prev) => ({
      ...prev,
      notifications: count,
    }))
  }, [])

  const clearUser = useCallback(() => {
    setState((prev) => ({
      ...prev,
      user: null,
      isAuthenticated: false,
      notifications: 0,
    }))
  }, [])

  return (
    <AppContext.Provider
      value={{
        state,
        setUser,
        setNotifications,
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

