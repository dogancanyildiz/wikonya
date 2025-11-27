"use client"

import { Bell, Search, CheckCircle, Gift, MessageSquare, Award, Clock } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { CoinIcon } from "@/components/coin-icon"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export function Navbar() {
  const pathname = usePathname()
  const [unreadCount] = useState(5)

  const menuItems = [
    { id: "akademik", label: "Akademik", href: "/academic" },
    { id: "sosyal", label: "Sosyal Yaşam & Mekan", href: "/social" },
    { id: "barinma", label: "Barınma & Yaşam", href: "/housing" },
    { id: "kariyer", label: "Kariyer & Gelişim", href: "/career" },
    { id: "kesif", label: "Konya Keşif", href: "/kesif" },
  ]

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

  return (
    <nav className="sticky top-0 z-50 bg-white dark:bg-card shadow-sm border-b border-border" role="navigation" aria-label="Ana navigasyon">
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
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative hover:bg-[#f2f4f3] dark:hover:bg-accent rounded-full"
                >
                  <Bell className="w-5 h-5 text-[#4d4d4d] dark:text-foreground" strokeWidth={2.5} />
                  {unreadCount > 0 && (
                    <span className="absolute top-2 right-2 w-2 h-2 bg-[#03624c] rounded-full"></span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[380px] sm:w-[420px] p-0" align="end">
                <div className="flex flex-col max-h-[600px]">
                  {/* Header */}
                  <div className="flex items-center justify-between p-4 border-b border-border">
                    <h3 className="font-[Manrope] text-[#4d4d4d] dark:text-foreground font-bold text-lg">
                      Bildirimler
                    </h3>
                    {unreadCount > 0 && (
                      <span className="px-2.5 py-1 bg-[#03624c] text-white rounded-full font-[Manrope] font-bold text-xs">
                        {unreadCount} yeni
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
              <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-[#f2f4f3] dark:bg-accent rounded-full">
                <span 
                  className="font-[Manrope] text-[#03624c] dark:text-[#03624c] font-bold text-sm"
                >
                  1,250
                </span>
                <CoinIcon />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

