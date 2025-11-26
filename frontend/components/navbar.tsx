"use client"

import { Bell, Search } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export function Navbar() {
  const pathname = usePathname()

  const menuItems = [
    { id: "akademik", label: "Akademik", href: "/academic" },
    { id: "sosyal", label: "Sosyal Yaşam & Mekan", href: "/social" },
    { id: "barinma", label: "Barınma & Yaşam", href: "/housing" },
    { id: "kariyer", label: "Kariyer & Gelişim", href: "/career" },
    { id: "kesif", label: "Konya Keşif", href: "/kesif" },
  ]

  return (
    <nav className="sticky top-0 z-50 bg-white dark:bg-card shadow-sm border-b border-border">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16">
        <div className="flex items-center justify-between h-[90px]">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center hover:opacity-80 transition-opacity"
          >
            <span className="font-[Manrope] text-[#4d4d4d] dark:text-foreground font-black text-2xl">
              KONYA <span className="text-[#03624c] dark:text-[#03624c]">GENÇ</span>
            </span>
          </Link>

          {/* Center Navigation */}
          <div className="hidden md:flex items-center gap-4 lg:gap-8">
            {menuItems.map((item) => {
              const isActive = pathname?.startsWith(item.href)
              
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  className={`
                    relative font-[Manrope] text-[#4d4d4d] dark:text-foreground hover:text-[#03624c] dark:hover:text-[#03624c] transition-colors duration-200 pb-1 font-bold text-sm lg:text-[15px]
                    ${isActive ? 'text-[#03624c] dark:text-[#03624c]' : ''}
                  `}
                >
                  {item.label}
                  {isActive && (
                    <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#03624c] rounded-t-full"></div>
                  )}
                </Link>
              )
            })}
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Search Icon */}
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-[#f2f4f3] dark:hover:bg-accent rounded-full"
            >
              <Search className="w-5 h-5 text-[#4d4d4d] dark:text-foreground" strokeWidth={2.5} />
            </Button>

            {/* Notification Bell */}
            <Button
              variant="ghost"
              size="icon"
              className="relative hover:bg-[#f2f4f3] dark:hover:bg-accent rounded-full"
            >
              <Bell className="w-5 h-5 text-[#4d4d4d] dark:text-foreground" strokeWidth={2.5} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-[#03624c] rounded-full"></span>
            </Button>

            {/* Profile & GençCoin */}
            <Link
              href="/dashboard"
              className="flex items-center gap-2 sm:gap-3 hover:opacity-80 transition-opacity"
            >
              <Avatar className="w-8 h-8 sm:w-10 sm:h-10 border-2 border-[#f2f4f3] dark:border-border">
                <AvatarFallback 
                  className="bg-[#03624c] text-white font-[Manrope] font-bold"
                >
                  AY
                </AvatarFallback>
              </Avatar>
              <div className="hidden sm:flex px-3 py-1.5 bg-[#f2f4f3] dark:bg-accent rounded-full">
                <span 
                  className="font-[Manrope] text-[#03624c] dark:text-[#03624c] font-bold text-sm"
                >
                  1,250 GC
                </span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

