"use client"

import { Menu, Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useState } from "react"
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

  const menuItems = [
    { label: "Ana Sayfa", href: "/" },
    { label: "Akademik", href: "/academic" },
    { label: "Sosyal", href: "/social" },
    { label: "Barınma", href: "/housing" },
    { label: "Kariyer", href: "/career" },
    { label: "Keşif", href: "/kesif" },
    { label: "Dashboard", href: "/dashboard" },
  ]

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
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={onMenuClick}
              >
                <Menu className="w-5 h-5 sm:w-6 sm:h-6 text-[#4d4d4d] dark:text-foreground" strokeWidth={3} />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[280px] sm:w-[320px]">
              <SheetHeader>
                <SheetTitle className="font-[Manrope] text-left">Menü</SheetTitle>
              </SheetHeader>
              <nav className="mt-6 space-y-2">
                {menuItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block px-4 py-3 rounded-lg hover:bg-[#f2f4f3] dark:hover:bg-accent transition-colors font-[Manrope] text-[#4d4d4d] dark:text-foreground font-semibold"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  )
}

