"use client"

import { useEffect, useState } from "react"

export type ColorTheme = "green" | "blue" | "purple" | "rose" | "orange" | "teal"

export interface ColorThemeConfig {
  id: ColorTheme
  name: string
  lightColor: string
  darkColor: string
}

export const colorThemes: ColorThemeConfig[] = [
  { id: "green", name: "Yeşil", lightColor: "#03624c", darkColor: "#34d399" },
  { id: "blue", name: "Mavi", lightColor: "#2563eb", darkColor: "#60a5fa" },
  { id: "purple", name: "Mor", lightColor: "#7c3aed", darkColor: "#a78bfa" },
  { id: "rose", name: "Pembe", lightColor: "#e11d48", darkColor: "#fb7185" },
  { id: "orange", name: "Turuncu", lightColor: "#ea580c", darkColor: "#fb923c" },
  { id: "teal", name: "Turkuaz", lightColor: "#0d9488", darkColor: "#2dd4bf" },
]

const STORAGE_KEY = "color-theme"

export function useColorTheme() {
  // Initialize state from localStorage if available
  const getInitialTheme = (): ColorTheme => {
    if (typeof window === "undefined") return "green"
    const stored = localStorage.getItem(STORAGE_KEY) as ColorTheme | null
    if (stored && colorThemes.some((t) => t.id === stored)) {
      return stored
    }
    return "green"
  }

  const [colorTheme, setColorThemeState] = useState<ColorTheme>(getInitialTheme)
  const [mounted] = useState(() => typeof window !== "undefined")

  const applyTheme = (theme: ColorTheme) => {
    if (typeof window === "undefined") return
    const root = document.documentElement
    if (theme === "green") {
      root.removeAttribute("data-theme")
    } else {
      root.setAttribute("data-theme", theme)
    }
  }

  useEffect(() => {
    // Apply theme on mount
    applyTheme(colorTheme)
  }, [colorTheme])

  const setColorTheme = (theme: ColorTheme) => {
    setColorThemeState(theme)
    localStorage.setItem(STORAGE_KEY, theme)
    applyTheme(theme)
  }

  return {
    colorTheme,
    setColorTheme,
    colorThemes,
    mounted,
  }
}
