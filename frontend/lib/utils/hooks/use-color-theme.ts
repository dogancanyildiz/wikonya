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
  const [colorTheme, setColorThemeState] = useState<ColorTheme>("green")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const stored = localStorage.getItem(STORAGE_KEY) as ColorTheme | null
    if (stored && colorThemes.some((t) => t.id === stored)) {
      setColorThemeState(stored)
      applyTheme(stored)
    }
  }, [])

  const applyTheme = (theme: ColorTheme) => {
    const root = document.documentElement
    if (theme === "green") {
      root.removeAttribute("data-theme")
    } else {
      root.setAttribute("data-theme", theme)
    }
  }

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
