"use client"

import { useParams } from "next/navigation"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, MapPin, Award, Gift, MessageSquare, ThumbsUp, BookOpen, Trophy } from "lucide-react"
import { ROLE_DISPLAY_NAMES } from "@/lib/constants"

export function PublicUserProfile() {
  const params = useParams()
  const userId = params?.id ? Number(params.id) : 1

  // Mock data - gerçek uygulamada API'den gelecek
  const user = {
    id: userId,
    name: "Ahmet Yılmaz",
    initials: "AY",
    role: "contributor" as const,
    totalCoins: 1250,
    badges: [
      { id: 1, name: "İlk Adım", icon: "🎯", description: "İlk konu oluşturma" },
      { id: 2, name: "Yorumcu", icon: "💬", description: "50 yorum" },
      { id: 3, name: "Katkıda Bulunan", icon: "⭐", description: "100 katkı" },
    ],
    joinedAt: "2024-01-15",
    location: "Konya, Türkiye",
    bio: "Selçuk Üniversitesi Bilgisayar Mühendisliği öğrencisi. Web geliştirme ve açık kaynak projelerle ilgileniyorum.",
    university: "Selçuk Üniversitesi",
    stats: {
      topics: 12,
      comments: 89,
      likes: 234,
      contributions: 156,
    },
  }

  const roleInfo = ROLE_DISPLAY_NAMES[user.role]

  const contributions = [
    { id: 1, type: "topic", title: "Lineer Cebir Dersi İçin Kaynak Önerisi", date: "2024-11-20", coins: 10 },
    { id: 2, type: "comment", title: "Kampüse Yakın Uygun Fiyatlı Yurt", date: "2024-11-19", coins: 5 },
    { id: 3, type: "wiki", title: "Selçuk Üniversitesi - Bilgisayar Mühendisliği", date: "2024-11-18", coins: 15 },
  ]

  const monthNames = ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"]
  const joinedDate = new Date(user.joinedAt)
  const formattedDate = `${monthNames[joinedDate.getMonth()]} ${joinedDate.getFullYear()}`

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-16 py-4 sm:py-6 md:py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-4 sm:space-y-6">
          {/* Profile Header */}
          <Card className="bg-white dark:bg-card rounded-[20px] shadow-[0_4px_20px_rgba(0,0,0,0.06)] dark:shadow-lg border border-border">
            <CardContent className="p-4 sm:p-6 lg:p-8">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
                <Avatar className="w-24 h-24 sm:w-32 sm:h-32 border-4 border-[#f2f4f3] dark:border-border">
                  <AvatarFallback className="bg-[#03624c] text-white font-[Manrope] font-extrabold text-3xl sm:text-4xl">
                    {user.initials}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-3">
                    <h1 className="font-[Manrope] text-[#4d4d4d] dark:text-foreground font-extrabold text-2xl sm:text-3xl lg:text-4xl">
                      {user.name}
                    </h1>
                    <Badge className="bg-[#03624c] text-white font-[Manrope] font-bold text-sm px-3 py-1.5">
                      {roleInfo}
                    </Badge>
                  </div>
                  {user.bio && (
                    <p className="font-[Manrope] text-[#4d4d4d]/70 dark:text-muted-foreground mb-4 leading-relaxed">
                      {user.bio}
                    </p>
                  )}
                  <div className="flex flex-wrap items-center gap-4 text-sm">
                    {user.location && (
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-[#03624c]" />
                        <span className="font-[Manrope] text-[#4d4d4d]/70 dark:text-muted-foreground">
                          {user.location}
                        </span>
                      </div>
                    )}
                    {user.university && (
                      <div className="flex items-center gap-2">
                        <BookOpen className="w-4 h-4 text-[#03624c]" />
                        <span className="font-[Manrope] text-[#4d4d4d]/70 dark:text-muted-foreground">
                          {user.university}
                        </span>
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-[#03624c]" />
                      <span className="font-[Manrope] text-[#4d4d4d]/70 dark:text-muted-foreground">
                        {formattedDate} tarihinden beri
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Stats */}
          <Card className="bg-white dark:bg-card rounded-[20px] shadow-[0_4px_20px_rgba(0,0,0,0.06)] dark:shadow-lg border border-border">
            <CardHeader>
              <CardTitle className="font-[Manrope] text-[#4d4d4d] dark:text-foreground font-bold text-lg sm:text-xl">
                İstatistikler
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-[#f2f4f3] dark:bg-accent rounded-xl">
                  <MessageSquare className="w-6 h-6 text-[#03624c] mx-auto mb-2" />
                  <p className="font-[Manrope] font-extrabold text-2xl text-[#4d4d4d] dark:text-foreground mb-1">
                    {user.stats.topics}
                  </p>
                  <p className="font-[Manrope] text-xs text-[#4d4d4d]/60 dark:text-muted-foreground">
                    Konu
                  </p>
                </div>
                <div className="text-center p-4 bg-[#f2f4f3] dark:bg-accent rounded-xl">
                  <MessageSquare className="w-6 h-6 text-[#03624c] mx-auto mb-2" />
                  <p className="font-[Manrope] font-extrabold text-2xl text-[#4d4d4d] dark:text-foreground mb-1">
                    {user.stats.comments}
                  </p>
                  <p className="font-[Manrope] text-xs text-[#4d4d4d]/60 dark:text-muted-foreground">
                    Yorum
                  </p>
                </div>
                <div className="text-center p-4 bg-[#f2f4f3] dark:bg-accent rounded-xl">
                  <ThumbsUp className="w-6 h-6 text-[#03624c] mx-auto mb-2" />
                  <p className="font-[Manrope] font-extrabold text-2xl text-[#4d4d4d] dark:text-foreground mb-1">
                    {user.stats.likes}
                  </p>
                  <p className="font-[Manrope] text-xs text-[#4d4d4d]/60 dark:text-muted-foreground">
                    Beğeni
                  </p>
                </div>
                <div className="text-center p-4 bg-[#f2f4f3] dark:bg-accent rounded-xl">
                  <Trophy className="w-6 h-6 text-[#03624c] mx-auto mb-2" />
                  <p className="font-[Manrope] font-extrabold text-2xl text-[#4d4d4d] dark:text-foreground mb-1">
                    {user.stats.contributions}
                  </p>
                  <p className="font-[Manrope] text-xs text-[#4d4d4d]/60 dark:text-muted-foreground">
                    Katkı
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contributions */}
          <Card className="bg-white dark:bg-card rounded-[20px] shadow-[0_4px_20px_rgba(0,0,0,0.06)] dark:shadow-lg border border-border">
            <CardHeader>
              <CardTitle className="font-[Manrope] text-[#4d4d4d] dark:text-foreground font-bold text-lg sm:text-xl">
                Son Katkılar
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {contributions.map((contribution) => (
                  <div key={contribution.id} className="flex items-center justify-between p-3 bg-[#f2f4f3] dark:bg-accent rounded-xl">
                    <div className="flex-1">
                      <p className="font-[Manrope] font-semibold text-sm text-[#4d4d4d] dark:text-foreground mb-1">
                        {contribution.title}
                      </p>
                      <p className="font-[Manrope] text-xs text-[#4d4d4d]/60 dark:text-muted-foreground">
                        {new Date(contribution.date).toLocaleDateString('tr-TR')}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Gift className="w-4 h-4 text-[#03624c]" />
                      <span className="font-[Manrope] font-bold text-sm text-[#03624c]">
                        +{contribution.coins}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-4 sm:space-y-6">
          {/* Badges */}
          <Card className="bg-white dark:bg-card rounded-[20px] shadow-[0_4px_20px_rgba(0,0,0,0.06)] dark:shadow-lg border border-border">
            <CardHeader>
              <CardTitle className="font-[Manrope] text-[#4d4d4d] dark:text-foreground font-bold text-lg flex items-center gap-2">
                <Award className="w-5 h-5 text-[#03624c]" />
                Rozetler
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {user.badges.map((badge) => (
                  <div key={badge.id} className="flex items-center gap-3 p-3 bg-[#f2f4f3] dark:bg-accent rounded-xl">
                    <span className="text-2xl">{badge.icon}</span>
                    <div className="flex-1">
                      <p className="font-[Manrope] font-bold text-sm text-[#4d4d4d] dark:text-foreground">
                        {badge.name}
                      </p>
                      <p className="font-[Manrope] text-xs text-[#4d4d4d]/60 dark:text-muted-foreground">
                        {badge.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Coins */}
          <Card className="bg-white dark:bg-card rounded-[20px] shadow-[0_4px_20px_rgba(0,0,0,0.06)] dark:shadow-lg border border-border">
            <CardHeader>
              <CardTitle className="font-[Manrope] text-[#4d4d4d] dark:text-foreground font-bold text-lg flex items-center gap-2">
                <Gift className="w-5 h-5 text-[#03624c]" />
                Toplam Coin
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-4">
                <p className="font-[Manrope] font-extrabold text-4xl text-[#03624c] mb-2">
                  {user.totalCoins.toLocaleString()}
                </p>
                <p className="font-[Manrope] text-sm text-[#4d4d4d]/60 dark:text-muted-foreground">
                  Toplam kazanılan coin
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

