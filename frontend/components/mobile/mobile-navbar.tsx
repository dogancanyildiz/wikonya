"use client"

import { Menu, Bell, Moon, Sun, CheckCircle, Gift, MessageSquare, Award, Clock } from "lucide-react"
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface MobileNavbarProps {
  onMenuClick?: () => void
}

export function MobileNavbar({ onMenuClick }: MobileNavbarProps) {
  const [notificationCount] = useState(5)
  const [open, setOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const router = useRouter()

  const notifications = [
    {
      id: 1,
      type: "reward",
      icon: Gift,
      title: "Genç Coin Kazandınız!",
      message: "Bir gönderiye yorum yaptığınız için 10 GC kazandınız.",
      time: "2 dakika önce",
      isRead: false,
    },
    {
      id: 2,
      type: "message",
      icon: MessageSquare,
      title: "Yeni Mesaj",
      message: "Ahmet Yılmaz size bir mesaj gönderdi.",
      time: "15 dakika önce",
      isRead: false,
    },
    {
      id: 3,
      type: "achievement",
      icon: Award,
      title: "Yeni Rozet Kazandınız!",
      message: "Aktif Kullanıcı rozetini kazandınız.",
      time: "1 saat önce",
      isRead: false,
    },
    {
      id: 4,
      type: "reward",
      icon: Gift,
      title: "Genç Coin Kazandınız!",
      message: "Bir kaynak indirdiğiniz için 5 GC kazandınız.",
      time: "3 saat önce",
      isRead: true,
    },
    {
      id: 5,
      type: "update",
      icon: CheckCircle,
      title: "Yeni Özellik",
      message: "Kariyer sayfasına yeni iş ilanları eklendi.",
      time: "1 gün önce",
      isRead: true,
    },
    {
      id: 6,
      type: "reminder",
      icon: Clock,
      title: "Hatırlatma",
      message: "Yarın saat 14:00'te KOMEK Diksiyon Kursu var.",
      time: "2 gün önce",
      isRead: true,
    },
  ]

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
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="relative"
              >
                <Bell className="w-5 h-5 text-[#4d4d4d] dark:text-foreground" strokeWidth={2.5} />
                {notificationCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#03624C] rounded-full"></span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[340px] sm:w-[380px] p-0" align="end">
              <div className="flex flex-col max-h-[600px]">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-border">
                  <h3 className="font-[Manrope] text-[#4d4d4d] dark:text-foreground font-bold text-lg">
                    Bildirimler
                  </h3>
                  {notificationCount > 0 && (
                    <span className="px-2.5 py-1 bg-[#03624c] text-white rounded-full font-[Manrope] font-bold text-xs">
                      {notificationCount} yeni
                    </span>
                  )}
                </div>

                {/* Notifications List */}
                <div className="overflow-y-auto">
                  {notifications.length > 0 ? (
                    <div className="divide-y divide-border">
                      {notifications.map((notification) => {
                        const Icon = notification.icon
                        return (
                          <div
                            key={notification.id}
                            className={`p-4 hover:bg-[#f2f4f3] dark:hover:bg-accent transition-colors cursor-pointer ${
                              !notification.isRead ? 'bg-[#03624c]/5 dark:bg-[#03624c]/10' : ''
                            }`}
                          >
                            <div className="flex items-start gap-3">
                              <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                                notification.type === "reward" ? "bg-[#03624c]/10 dark:bg-[#03624c]/20" :
                                notification.type === "message" ? "bg-blue-100 dark:bg-blue-500/20" :
                                notification.type === "achievement" ? "bg-amber-100 dark:bg-amber-500/20" :
                                notification.type === "update" ? "bg-green-100 dark:bg-green-500/20" :
                                "bg-purple-100 dark:bg-purple-500/20"
                              }`}>
                                <Icon className={`w-5 h-5 ${
                                  notification.type === "reward" ? "text-[#03624c]" :
                                  notification.type === "message" ? "text-blue-600 dark:text-blue-400" :
                                  notification.type === "achievement" ? "text-amber-600 dark:text-amber-400" :
                                  notification.type === "update" ? "text-green-600 dark:text-green-400" :
                                  "text-purple-600 dark:text-purple-400"
                                }`} strokeWidth={2.5} />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between gap-2 mb-1">
                                  <h4 className={`font-[Manrope] font-bold text-sm ${
                                    !notification.isRead 
                                      ? 'text-[#4d4d4d] dark:text-foreground' 
                                      : 'text-[#4d4d4d]/70 dark:text-muted-foreground'
                                  }`}>
                                    {notification.title}
                                  </h4>
                                  {!notification.isRead && (
                                    <div className="w-2 h-2 bg-[#03624c] rounded-full flex-shrink-0 mt-1.5"></div>
                                  )}
                                </div>
                                <p className="font-[Manrope] text-[#4d4d4d]/70 dark:text-muted-foreground text-xs mb-2 leading-relaxed">
                                  {notification.message}
                                </p>
                                <span className="font-[Manrope] text-[#4d4d4d]/50 dark:text-muted-foreground text-[11px]">
                                  {notification.time}
                                </span>
                              </div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  ) : (
                    <div className="p-8 text-center">
                      <Bell className="w-12 h-12 text-[#4d4d4d]/30 dark:text-muted-foreground/30 mx-auto mb-3" />
                      <p className="font-[Manrope] text-[#4d4d4d]/60 dark:text-muted-foreground font-medium">
                        Bildiriminiz yok
                      </p>
                    </div>
                  )}
                </div>

                {/* Footer */}
                {notifications.length > 0 && (
                  <div className="p-3 border-t border-border">
                    <Button
                      variant="ghost"
                      className="w-full font-[Manrope] text-[#03624c] hover:bg-[#03624c]/10 dark:hover:bg-[#03624c]/20 font-bold text-sm"
                    >
                      Tümünü Görüntüle
                    </Button>
                  </div>
                )}
              </div>
            </PopoverContent>
          </Popover>
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

