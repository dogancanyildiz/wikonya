"use client"

import { useState } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { Home, Wallet, Trophy, BookOpen, MessageSquare, Settings, LogOut, UserPlus, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

const menuItems = [
  { id: "dashboard", label: "Ana Sayfa", icon: Home, href: "/dashboard" },
  { id: "wallet", label: "Cüzdan & GençCoin", icon: Wallet, href: "/dashboard/wallet" },
  { id: "contributions", label: "Katkılarım", icon: BookOpen, href: "/dashboard/contributions" },
  { id: "messages", label: "Mesajlar", icon: MessageSquare, href: "/dashboard/messages" },
  { id: "invite", label: "Arkadaşını Davet Et", icon: UserPlus, href: "/dashboard/invite" },
  { id: "achievements", label: "Başarılar", icon: Trophy, href: "/dashboard/achievements" },
  { id: "settings", label: "Ayarlar", icon: Settings, href: "/dashboard/settings" },
]

function SidebarContent({ onItemClick }: { onItemClick?: () => void }) {
  const pathname = usePathname()

  return (
    <div className="space-y-1 sm:space-y-2">
      {menuItems.map((item) => {
        const Icon = item.icon
        const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname?.startsWith(item.href))
        
        return (
          <Link
            key={item.id}
            href={item.href}
            onClick={onItemClick}
          >
            <Button
              variant={isActive ? "secondary" : "ghost"}
              className={`
                w-full flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-3 rounded-xl transition-all duration-200 font-[Manrope] justify-start
                ${isActive 
                  ? 'bg-[#f2f4f3] dark:bg-accent border-l-4 border-[#03624c] text-[#03624c] dark:text-[#03624c] font-bold' 
                  : 'hover:bg-[#f2f4f3]/50 dark:hover:bg-accent text-[#4d4d4d] dark:text-foreground font-semibold'
                }
              `}
            >
              <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="text-sm sm:text-base">
                {item.label}
              </span>
            </Button>
          </Link>
        )
      })}
    </div>
  )
}

export function DashboardSidebar() {
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* Mobile: Sheet */}
      <div className="lg:hidden mb-4">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" className="w-full font-[Manrope] font-bold">
              <Menu className="w-4 h-4 mr-2" />
              Menü
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[280px] sm:w-[320px]">
            <SheetHeader>
              <SheetTitle className="font-[Manrope] text-left">Dashboard Menü</SheetTitle>
            </SheetHeader>
            <div className="mt-6">
              <SidebarContent onItemClick={() => setOpen(false)} />
              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-border">
                <Button 
                  variant="ghost"
                  className="w-full flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-3 rounded-xl hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors font-[Manrope] justify-start text-red-500 dark:text-red-400 font-semibold"
                >
                  <LogOut className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="text-sm sm:text-base">Çıkış Yap</span>
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop: Card */}
      <div className="hidden lg:block">
        <Card className="bg-white dark:bg-card rounded-[20px] shadow-[0_4px_20px_rgba(0,0,0,0.06)] dark:shadow-lg p-4 sm:p-6 sticky top-24 border border-border">
          <SidebarContent />
          <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-200 dark:border-border">
            <Button 
              variant="ghost"
              className="w-full flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-3 rounded-xl hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors font-[Manrope] justify-start text-red-500 dark:text-red-400 font-semibold"
            >
              <LogOut className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="text-sm sm:text-base">Çıkış Yap</span>
            </Button>
          </div>
        </Card>
      </div>
    </>
  )
}
