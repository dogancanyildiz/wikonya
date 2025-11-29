"use client"

import { Home, TrendingUp, PlusCircle, Search, User } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

interface MobileBottomNavProps {
  activeTab?: string
  onNavigate?: (tab: string) => void
}

export function MobileBottomNav({ activeTab, onNavigate }: MobileBottomNavProps) {
  const pathname = usePathname()

  const navItems = [
    { id: "home", label: "Ana Sayfa", icon: Home, href: "/" },
    { id: "trending", label: "Trendler", icon: TrendingUp, href: "/" },
    { id: "create", label: "Oluştur", icon: PlusCircle, href: "/topic/new" },
    { id: "search", label: "Ara", icon: Search, href: "/search" },
    { id: "profile", label: "Profil", icon: User, href: "/dashboard" },
  ]

  const isActive = (itemId: string, href: string) => {
    if (activeTab) return activeTab === itemId
    if (itemId === "home") return pathname === "/"
    if (itemId === "trending") return pathname === "/" // Trend ana sayfada
    if (itemId === "create") return pathname?.startsWith("/topic/new")
    if (itemId === "search") return pathname?.startsWith("/search")
    if (itemId === "profile") return pathname?.startsWith("/dashboard")
    return pathname === href
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border pb-safe z-50">
      <div className="flex items-center justify-around h-14 sm:h-16 px-2">
        {navItems.map((item) => {
          const Icon = item.icon
          const active = isActive(item.id, item.href)
          
          return (
            <Link
              key={item.id}
              href={item.href}
              onClick={() => onNavigate?.(item.id)}
              className="flex flex-col items-center justify-center gap-1 px-2 py-1 min-w-[60px] active:scale-95 transition-transform"
            >
              <Icon
                className={active ? "text-primary" : "text-foreground/60 dark:text-muted-foreground"}
                size={22}
                strokeWidth={2.5}
                fill={active ? "#03624c" : "none"}
              />
              <span
                className={`font-[Manrope] ${active ? "text-primary font-bold" : "text-foreground/60 dark:text-muted-foreground font-semibold"}`}
                style={{ fontSize: '10px' }}
              >
                {item.label}
              </span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}

