"use client"

import { Calendar, MapPin, MessageCircle, ThumbsUp, Plus, Lock, Info } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import Link from "next/link"
import { KBBAnnouncements } from "@/components/features/home/kbb-announcements"
import { usePermissions } from "@/lib/utils/hooks/use-permissions"
import { useApp } from "@/contexts/app-context"
import { getCoinsNeededForNextRole } from "@/lib/gamification/role-system"
import { USER_ROLES, ROLE_DISPLAY_NAMES } from "@/lib/constants"

interface SidebarProps {
  onNavigateToTopic?: () => void
}

export function Sidebar({}: SidebarProps = {}) {
  const { canCreateTopic } = usePermissions()
  const { state } = useApp()
  const user = state.user
  
  // Kullanıcı bilgileri için hesaplamalar
  const coinsNeeded = user ? getCoinsNeededForNextRole(user.totalCoins) : null
  const currentRole = user ? USER_ROLES[user.role] : null
  const nextRole = user && coinsNeeded !== null 
    ? Object.values(USER_ROLES).find(role => role.minCoins > user.totalCoins)
    : null
  
  const popularComments = [
    {
      id: 1,
      author: { name: "Ayşe Yılmaz", initials: "AY" },
      content: "Bu notlar gerçekten çok işime yaradı! Özellikle anayasa hukuku kısmı çok detaylı.",
      topicId: 1,
      upvotes: 42,
    },
    {
      id: 2,
      author: { name: "Mehmet Demir", initials: "MD" },
      content: "Yemekhane fiyatları artmış ama kalite aynı kalmış maalesef.",
      topicId: 2,
      upvotes: 35,
    },
    {
      id: 3,
      author: { name: "Zeynep Kaya", initials: "ZK" },
      content: "Final öncesi bu notlara çalıştım ve çok yardımcı oldu.",
      topicId: 3,
      upvotes: 28,
    },
  ]

  const upcomingEvents = [
    {
      id: 1,
      title: "Yapay Zeka ve Geleceği Semineri",
      date: "28 Kasım 2024",
      location: "Mühendislik Fakültesi",
      attendees: 124,
    },
    {
      id: 2,
      title: "Kariyer Günleri",
      date: "2 Aralık 2024",
      location: "Konferans Salonu",
      attendees: 245,
    },
    {
      id: 3,
      title: "Hackathon 2024",
      date: "15 Aralık 2024",
      location: "Bilgisayar Mühendisliği",
      attendees: 89,
    },
  ]

  return (
    <div className="sticky top-24" aria-label="Yan panel">
      <div className="space-y-4">
      {/* Yeni Tartışma Oluştur */}
      <div className="mb-6">
        {canCreateTopic ? (
          <Button
            asChild
            className="w-full font-[Manrope] font-bold bg-primary text-primary-foreground hover:bg-primary/90 h-11 text-base"
          >
            <Link href="/topic/new">
              <Plus className="w-4 h-4 mr-2" />
              Yeni Tartışma Oluştur
            </Link>
          </Button>
        ) : (
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full font-[Manrope] font-bold bg-muted/50 text-muted-foreground cursor-pointer h-11 text-base hover:bg-muted hover:text-foreground transition-colors border-border"
              >
                <Lock className="w-4 h-4 mr-2" />
                Yeni Tartışma Oluştur
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 font-[Manrope]" side="left" align="start">
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <Info className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <h4 className="font-bold text-foreground text-sm mb-1">
                      Yeni Tartışma Oluşturmak İçin
                    </h4>
                    <p className="text-xs text-muted-foreground mb-3">
                      &quot;Gezgin&quot; veya üstü bir role sahip olmanız gerekiyor.
                    </p>
                  </div>
                </div>
                
                {user && currentRole && (
                  <div className="space-y-2 pt-2 border-t border-border">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">Mevcut Rolünüz:</span>
                      <span className="text-xs font-bold text-foreground">
                        {ROLE_DISPLAY_NAMES[user.role]}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">Mevcut Coin:</span>
                      <span className="text-xs font-bold text-primary">
                        {user.totalCoins.toLocaleString()}
                      </span>
                    </div>
                    
                    {nextRole && coinsNeeded !== null && (
                      <>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-muted-foreground">Hedef Rol:</span>
                          <span className="text-xs font-bold text-foreground">
                            {nextRole.name}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-muted-foreground">Gereken Coin:</span>
                          <span className="text-xs font-bold text-primary">
                            {coinsNeeded.toLocaleString()} coin
                          </span>
                        </div>
                        <div className="pt-2 border-t border-border">
                          <p className="text-xs text-muted-foreground">
                            Coin kazanmak için yorum yapın, wiki düzenleyin ve topluluğa katkıda bulunun!
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                )}
                
                {!user && (
                  <div className="pt-2 border-t border-border">
                    <p className="text-xs text-muted-foreground">
                      Lütfen giriş yapın.
                    </p>
                  </div>
                )}
              </div>
            </PopoverContent>
          </Popover>
        )}
      </div>

      {/* KBB Announcements */}
      <KBBAnnouncements />

      {/* Popüler Yorumlar */}
      <Card className="rounded-xl shadow-md border border-border">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <MessageCircle className="w-4 h-4 text-primary" />
            <span className="font-[Manrope] font-bold text-foreground">Popüler Yorumlar</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 pt-0">
          {popularComments.map((comment) => (
            <Link
              key={comment.id}
              href={`/topic/${comment.topicId}#comment-${comment.id}`}
              className="block bg-accent rounded-lg p-3 hover:shadow-md transition-all duration-200 cursor-pointer border border-transparent hover:border-border"
            >
              <div className="flex items-start gap-2.5">
                <Avatar className="w-7 h-7 flex-shrink-0">
                  <AvatarFallback className="bg-primary text-white font-[Manrope] font-bold text-[10px]">
                    {comment.author.initials}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <span className="font-[Manrope] font-bold text-xs text-foreground">
                    {comment.author.name}
                  </span>
                  <p className="font-[Manrope] text-xs text-muted-foreground line-clamp-2 mt-0.5">
                    {comment.content}
                  </p>
                  <div className="flex items-center gap-1 mt-1.5 text-primary">
                    <ThumbsUp className="w-3 h-3" />
                    <span className="font-[Manrope] font-semibold text-xs">{comment.upvotes}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </CardContent>
      </Card>

      {/* Upcoming Events */}
      <Card className="rounded-xl shadow-md border border-border">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <Calendar className="w-4 h-4 text-primary" />
            <span className="font-[Manrope] font-bold text-foreground">Yaklaşan Etkinlikler</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 pt-0">
          {upcomingEvents.slice(0, 2).map((event) => (
            <Link
              key={event.id}
              href={`/events/${event.id}`}
              className="block bg-accent rounded-lg p-3 hover:shadow-md transition-all duration-200 cursor-pointer border border-transparent hover:border-border"
            >
              <h4 className="font-[Manrope] font-bold text-foreground mb-2 text-sm line-clamp-2">
                {event.title}
              </h4>
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <Calendar className="w-3 h-3" />
                  <span className="font-[Manrope] font-medium text-xs">{event.date}</span>
                </div>
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <MapPin className="w-3 h-3" />
                  <span className="font-[Manrope] font-medium text-xs">{event.location}</span>
                </div>
              </div>
              <div className="mt-2 pt-2 border-t border-border">
                <span className="font-[Manrope] font-bold text-primary text-xs">
                  {event.attendees} katılımcı
                </span>
              </div>
            </Link>
          ))}
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <Card className="bg-gradient-to-br from-primary to-primary/80 rounded-xl text-primary-foreground border-0 shadow-lg">
        <CardHeader className="pb-3">
          <CardTitle className="font-[Manrope] font-bold text-base">Topluluk İstatistikleri</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 pt-0">
          <div className="flex items-center justify-between">
            <span className="font-[Manrope] font-semibold opacity-90 text-sm">Toplam Üye</span>
            <span className="font-[Manrope] font-bold text-sm">12,458</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-[Manrope] font-semibold opacity-90 text-sm">Tartışmalar</span>
            <span className="font-[Manrope] font-bold text-sm">3,247</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-[Manrope] font-semibold opacity-90 text-sm">Bu Hafta</span>
            <span className="font-[Manrope] font-bold text-sm">+248</span>
          </div>
        </CardContent>
      </Card>
      </div>
    </div>
  )
}

