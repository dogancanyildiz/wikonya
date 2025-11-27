"use client"

import { Bell, Search, CheckCircle, Gift, MessageSquare, Award, Clock, LogOut, LogIn } from "lucide-react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { CoinIcon } from "@/components/common/icons/coin-icon"
import { ModeToggle } from "@/components/layout/mode-toggle"
import { useApp } from "@/contexts/app-context"
import { mockLogout } from "@/lib/auth/mock-auth"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ROLE_DISPLAY_NAMES } from "@/lib/constants"
import { useNotifications } from "@/lib/utils/hooks/use-notifications"

// Simple time ago formatter (date-fns yerine)
function formatTimeAgo(date: string): string {
  const now = new Date()
  const then = new Date(date)
  const diffInSeconds = Math.floor((now.getTime() - then.getTime()) / 1000)

  if (diffInSeconds < 60) return "Az önce"
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} dakika önce`
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} saat önce`
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} gün önce`
  return `${Math.floor(diffInSeconds / 604800)} hafta önce`
}

export function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const { state, clearUser } = useApp()
  const { user, isAuthenticated } = state
  const { notifications, unreadCount, markAsRead } = useNotifications()

  const handleLogout = async () => {
    await mockLogout()
    clearUser()
    router.push("/")
  }

  const menuItems = [
    { id: "akademik", label: "Akademik", href: "/academic" },
    { id: "sosyal", label: "Sosyal Yaşam & Mekan", href: "/social" },
    { id: "barinma", label: "Barınma & Yaşam", href: "/housing" },
    { id: "kariyer", label: "Kariyer & Gelişim", href: "/career" },
    { id: "kesif", label: "Konya Keşif", href: "/kesif" },
  ]

  // Icon mapping for notification types
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "coin_earned":
      case "reward":
        return Gift
      case "role_promoted":
        return Award
      case "badge_earned":
      case "achievement":
        return Award
      case "comment_liked":
      case "comment_replied":
      case "message":
        return MessageSquare
      case "topic_approved":
      case "proposal_approved":
      case "update":
        return CheckCircle
      case "topic_rejected":
      case "proposal_rejected":
        return Clock
      default:
        return Bell
    }
  }

  const getNotificationTypeColor = (type: string) => {
    switch (type) {
      case "coin_earned":
      case "reward":
        return "bg-[#03624c]/10 dark:bg-[#03624c]/20 text-[#03624c]"
      case "role_promoted":
      case "badge_earned":
      case "achievement":
        return "bg-amber-100 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400"
      case "comment_liked":
      case "comment_replied":
      case "message":
        return "bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400"
      case "topic_approved":
      case "proposal_approved":
      case "update":
        return "bg-green-100 dark:bg-green-500/20 text-green-600 dark:text-green-400"
      case "topic_rejected":
      case "proposal_rejected":
        return "bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-400"
      default:
        return "bg-purple-100 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400"
    }
  }

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
          <div className="flex items-center gap-2 sm:gap-3 lg:gap-4">
            {/* Search Icon */}
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-[#f2f4f3] dark:hover:bg-accent rounded-full"
            >
              <Search className="w-5 h-5 text-[#4d4d4d] dark:text-foreground" strokeWidth={2.5} />
            </Button>

            {/* Theme Toggle */}
            <ModeToggle />

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
                          const Icon = getNotificationIcon(notification.type)
                          const timeAgo = formatTimeAgo(notification.createdAt)
                          
                          return (
                            <div
                              key={notification.id}
                              onClick={() => {
                                if (!notification.read) {
                                  markAsRead(notification.id)
                                }
                                if (notification.actionUrl) {
                                  router.push(notification.actionUrl)
                                }
                              }}
                              className={`p-4 hover:bg-[#f2f4f3] dark:hover:bg-accent transition-colors cursor-pointer ${
                                !notification.read ? 'bg-[#03624c]/5 dark:bg-[#03624c]/10' : ''
                              }`}
                            >
                              <div className="flex items-start gap-3">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${getNotificationTypeColor(notification.type)}`}>
                                  {notification.icon ? (
                                    <span className="text-lg">{notification.icon}</span>
                                  ) : (
                                    <Icon className="w-5 h-5" strokeWidth={2.5} />
                                  )}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-start justify-between gap-2 mb-1">
                                    <h4 className={`font-[Manrope] font-bold text-sm ${
                                      !notification.read 
                                        ? 'text-[#4d4d4d] dark:text-foreground' 
                                        : 'text-[#4d4d4d]/70 dark:text-muted-foreground'
                                    }`}>
                                      {notification.title}
                                    </h4>
                                    {!notification.read && (
                                      <div className="w-2 h-2 bg-[#03624c] rounded-full flex-shrink-0 mt-1.5"></div>
                                    )}
                                  </div>
                                  <p className="font-[Manrope] text-[#4d4d4d]/70 dark:text-muted-foreground text-xs mb-2 leading-relaxed">
                                    {notification.message}
                                  </p>
                                  <span className="font-[Manrope] text-[#4d4d4d]/50 dark:text-muted-foreground text-[11px]">
                                    {timeAgo}
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

            {/* Profile & GençCoin or Login */}
            {isAuthenticated && user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-2 sm:gap-3 hover:opacity-80 transition-opacity">
                    <Avatar className="w-8 h-8 sm:w-10 sm:h-10 border-2 border-[#f2f4f3] dark:border-border">
                      <AvatarFallback 
                        className="bg-[#03624c] text-white font-[Manrope] font-bold"
                      >
                        {user.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-[#f2f4f3] dark:bg-accent rounded-full">
                      <span 
                        className="font-[Manrope] text-[#03624c] dark:text-[#03624c] font-bold text-sm"
                      >
                        {user.totalCoins.toLocaleString()}
                      </span>
                      <CoinIcon />
                    </div>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="px-2 py-1.5">
                    <p className="font-[Manrope] font-bold text-sm text-[#4d4d4d] dark:text-foreground">
                      {user.name}
                    </p>
                    <p className="font-[Manrope] text-xs text-[#4d4d4d]/60 dark:text-muted-foreground">
                      {ROLE_DISPLAY_NAMES[user.role]}
                    </p>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard" className="cursor-pointer">
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard" className="cursor-pointer">
                      Profil
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-600 dark:text-red-400">
                    <LogOut className="mr-2 h-4 w-4" />
                    Çıkış Yap
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button
                asChild
                variant="outline"
                className="border-[#03624c] text-[#03624c] hover:bg-[#03624c] hover:text-white"
              >
                <Link href="/auth/login" className="flex items-center gap-2">
                  <LogIn className="w-4 h-4" />
                  <span className="hidden sm:inline">Giriş Yap</span>
                </Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

