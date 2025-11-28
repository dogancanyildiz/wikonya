"use client"

import { useState } from "react"
import { Bell, Search, CheckCircle, Gift, MessageSquare, Award, Clock, LogOut, LogIn } from "lucide-react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
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
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

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
    { id: "discovery", label: "Konya Keşif", href: "/discovery" },
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
        return "bg-primary/10 dark:bg-primary/20 text-primary"
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
    <nav 
      className="sticky top-0 z-50 bg-background/95 dark:bg-card/95 backdrop-blur-md border-b border-border/50 shadow-sm" 
      role="navigation" 
      aria-label="Ana navigasyon"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 hover:opacity-80 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-md px-2 -ml-2"
            aria-label="Ana sayfaya dön"
          >
            <span className="font-[Manrope] text-foreground font-black text-xl sm:text-2xl tracking-tight">
              KONYA <span className="text-primary">GENÇ</span>
            </span>
          </Link>

          {/* Center Navigation */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2" aria-label="Ana menü">
            {menuItems.map((item) => {
              const isActive = pathname?.startsWith(item.href)
              
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  className={`
                    relative px-3 py-2 rounded-lg font-[Manrope] font-semibold text-sm lg:text-base
                    transition-all duration-200
                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
                    ${
                      isActive 
                        ? 'text-primary bg-primary/10' 
                        : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                    }
                  `}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {item.label}
                </Link>
              )
            })}
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-1 sm:gap-2">
            {/* Search Icon */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSearchOpen(true)}
              className="h-9 w-9 rounded-lg hover:bg-accent"
              aria-label="Ara"
            >
              <Search className="h-4 w-4 text-foreground" strokeWidth={2.5} />
            </Button>

            {/* Search Dialog */}
            <Dialog open={isSearchOpen} onOpenChange={setIsSearchOpen}>
              <DialogContent className="sm:max-w-[600px] p-0 gap-0">
                <DialogHeader className="p-6 pb-4">
                  <DialogTitle className="font-[Manrope] text-foreground font-bold text-xl sm:text-2xl">
                    Arama
                  </DialogTitle>
                </DialogHeader>
                <div className="p-6 pt-0">
                  <form
                    onSubmit={(e) => {
                      e.preventDefault()
                      if (searchQuery.trim()) {
                        router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
                        setIsSearchOpen(false)
                        setSearchQuery("")
                      }
                    }}
                    className="space-y-4"
                  >
                    <div className="relative flex items-center bg-card rounded-xl shadow-md border border-border">
                      <Search className="absolute left-4 h-5 w-5 text-muted-foreground" />
                      <Input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Konuları, soruları, yorumları keşfet..."
                        className="w-full h-12 pl-11 pr-24 bg-transparent rounded-xl font-[Manrope] font-medium text-foreground placeholder:text-muted-foreground focus:outline-none border-0 focus-visible:ring-0"
                        autoFocus
                        aria-label="Arama kutusu"
                      />
                      <Button
                        type="submit"
                        className="absolute right-2 h-8 px-4 bg-primary hover:bg-primary/90 rounded-lg font-[Manrope] font-semibold text-primary-foreground text-sm"
                        aria-label="Ara"
                      >
                        Ara
                      </Button>
                    </div>
                  </form>
                  
                  {/* Quick Search Tags */}
                  <div className="mt-6">
                    <p className="font-[Manrope] text-muted-foreground font-semibold text-sm mb-3">
                      Hızlı Arama
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {["Veri Yapıları", "Barınma", "Staj", "Etkinlik", "Yemek"].map((tag) => (
                        <Button
                          key={tag}
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setSearchQuery(tag)
                            router.push(`/search?q=${encodeURIComponent(tag)}`)
                            setIsSearchOpen(false)
                            setSearchQuery("")
                          }}
                          className="font-[Manrope] text-xs sm:text-sm border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                        >
                          {tag}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            {/* Theme Toggle */}
            <ModeToggle />

            {/* Notification Bell */}
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative h-9 w-9 rounded-lg hover:bg-accent"
                  aria-label={`Bildirimler${unreadCount > 0 ? ` (${unreadCount} yeni)` : ''}`}
                >
                  <Bell className="h-4 w-4 text-foreground" strokeWidth={2.5} />
                  {unreadCount > 0 && (
                    <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-primary rounded-full ring-2 ring-background" aria-hidden="true"></span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[380px] sm:w-[420px] p-0" align="end">
                <div className="flex flex-col max-h-[600px]">
                  {/* Header */}
                  <div className="flex items-center justify-between p-4 border-b border-border">
                    <h3 className="font-[Manrope] text-foreground font-bold text-lg">
                      Bildirimler
                    </h3>
                    {unreadCount > 0 && (
                      <span className="px-2.5 py-1 bg-primary text-primary-foreground rounded-full font-[Manrope] font-bold text-xs">
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
                              className={`p-4 hover:bg-accent transition-colors cursor-pointer ${
                                !notification.read ? 'bg-primary/5 dark:bg-primary/10' : ''
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
                                        ? 'text-foreground' 
                                        : 'text-muted-foreground'
                                    }`}>
                                      {notification.title}
                                    </h4>
                                    {!notification.read && (
                                      <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-1.5" aria-hidden="true"></div>
                                    )}
                                  </div>
                                  <p className="font-[Manrope] text-muted-foreground text-xs mb-2 leading-relaxed">
                                    {notification.message}
                                  </p>
                                  <span className="font-[Manrope] text-muted-foreground/70 text-[11px]">
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
                        <Bell className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
                        <p className="font-[Manrope] text-muted-foreground font-medium">
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
                        className="w-full font-[Manrope] text-primary hover:bg-primary/10 font-bold text-sm"
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
                  <button 
                    className="flex items-center gap-2 sm:gap-3 hover:opacity-80 transition-opacity cursor-pointer rounded-lg p-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    aria-label="Kullanıcı menüsü"
                  >
                    <Avatar className="w-8 h-8 sm:w-9 sm:h-9 border-2 border-border">
                      <AvatarFallback 
                        className="bg-primary text-primary-foreground font-[Manrope] font-bold"
                      >
                        {user.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-accent rounded-full">
                      <span 
                        className="font-[Manrope] text-primary font-bold text-sm"
                      >
                        {user.totalCoins.toLocaleString()}
                      </span>
                      <CoinIcon />
                    </div>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="px-2 py-1.5">
                    <p className="font-[Manrope] font-bold text-sm text-foreground">
                      {user.name}
                    </p>
                    <p className="font-[Manrope] text-xs text-muted-foreground">
                      {ROLE_DISPLAY_NAMES[user.role]}
                    </p>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard" className="cursor-pointer">
                      Profil
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-destructive focus:text-destructive">
                    <LogOut className="mr-2 h-4 w-4" />
                    Çıkış Yap
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button
                asChild
                variant="outline"
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
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

