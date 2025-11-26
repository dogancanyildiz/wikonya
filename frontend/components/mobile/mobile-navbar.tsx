"use client"

import { Menu, Bell, Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import { useRouter } from "next/navigation"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

interface MobileNavbarProps {
  onMenuClick?: () => void
}

export function MobileNavbar({ onMenuClick }: MobileNavbarProps) {
  const [notificationCount] = useState(3)
  const [open, setOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setMounted(true)
  }, [])

  const menuItems = [
    { label: "Ana Sayfa", href: "/" },
    { label: "Akademik", href: "/academic" },
    { label: "Sosyal", href: "/social" },
    { label: "Barınma", href: "/housing" },
    { label: "Kariyer", href: "/career" },
    { label: "Keşif", href: "/kesif" },
    { label: "Profil", href: "/dashboard" },
  ]

  const handleLinkClick = (href: string) => {
    setOpen(false)
    router.push(href)
  }

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  const isDark = mounted && theme === "dark"

  return (
    <nav className="sticky top-0 z-50 bg-white dark:bg-card border-b border-gray-200 dark:border-border">
      <div className="flex items-center justify-between h-14 sm:h-16 px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#03624C] flex items-center justify-center">
            <span className="text-white font-[Manrope] font-bold text-[10px] sm:text-xs">
              KG
            </span>
          </div>
          <span className="font-[Manrope] text-[#4d4d4d] dark:text-foreground font-bold text-sm sm:text-base">
            WikiSözlük
          </span>
        </Link>

        {/* Right Section */}
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="relative"
            asChild
          >
            <Link href="/notifications">
              <Bell className="w-5 h-5 text-[#4d4d4d] dark:text-foreground" strokeWidth={2.5} />
              {notificationCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#03624C] rounded-full"></span>
              )}
            </Link>
          </Button>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={onMenuClick}
              >
                <Menu className="w-5 h-5 sm:w-6 sm:h-6 text-[#4d4d4d] dark:text-foreground" strokeWidth={3} />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] sm:w-[320px] flex flex-col">
              <SheetHeader>
                <SheetTitle className="font-[Manrope] text-left">Menü</SheetTitle>
              </SheetHeader>
              <nav className="mt-6 space-y-2 flex-1">
                {menuItems.map((item) => (
                  <button
                    key={item.href}
                    onClick={() => handleLinkClick(item.href)}
                    className="w-full text-left block px-4 py-3 rounded-lg hover:bg-[#f2f4f3] dark:hover:bg-accent transition-colors font-[Manrope] text-[#4d4d4d] dark:text-foreground font-semibold"
                  >
                    {item.label}
                  </button>
                ))}
              </nav>
              
              {/* Theme Toggle Switch */}
              <div className="mt-auto pt-6 pb-4 border-t border-gray-200 dark:border-border">
                <div className="flex items-center justify-between px-4">
                  <div className="flex items-center gap-3">
                    <div className="relative w-5 h-5">
                      <Sun className={`absolute inset-0 w-5 h-5 transition-all duration-500 ${isDark ? 'opacity-0 rotate-90 scale-0' : 'opacity-100 rotate-0 scale-100'} text-[#03624c]`} />
                      <Moon className={`absolute inset-0 w-5 h-5 transition-all duration-500 ${isDark ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-0'} text-[#03624c]`} />
                    </div>
                    <span className="font-[Manrope] text-[#4d4d4d] dark:text-foreground font-semibold text-sm transition-colors duration-300">
                      {isDark ? "Gece Modu" : "Gündüz Modu"}
                    </span>
                  </div>
                  <button
                    onClick={toggleTheme}
                    className={`relative w-14 h-7 rounded-full transition-all duration-500 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#03624c] focus:ring-offset-2 ${
                      isDark 
                        ? 'bg-[#03624c] shadow-lg shadow-[#03624c]/30' 
                        : 'bg-[#f2f4f3] dark:bg-accent'
                    }`}
                    aria-label="Toggle theme"
                  >
                    <div
                      className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full shadow-lg transform transition-all duration-500 ease-in-out flex items-center justify-center ${
                        isDark ? 'translate-x-7' : 'translate-x-0'
                      }`}
                    >
                      <div className="relative w-3 h-3">
                        {isDark ? (
                          <Moon className="absolute inset-0 w-3 h-3 text-[#03624c] transition-all duration-500" />
                        ) : (
                          <Sun className="absolute inset-0 w-3 h-3 text-[#03624c] transition-all duration-500" />
                        )}
                      </div>
                    </div>
                  </button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  )
}

