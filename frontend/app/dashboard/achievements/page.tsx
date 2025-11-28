"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useApp } from "@/contexts/app-context"
import { 
  Trophy, 
  Medal, 
  Star, 
  Flame, 
  MessageSquare, 
  BookOpen, 
  Users, 
  ThumbsUp,
  Award,
  Target,
  Zap,
  Crown,
  Lock
} from "lucide-react"

interface Achievement {
  id: string
  name: string
  description: string
  icon: React.ElementType
  category: "contribution" | "social" | "streak" | "milestone"
  progress: number
  total: number
  unlocked: boolean
  unlockedAt?: string
  coins: number
  rarity: "common" | "rare" | "epic" | "legendary"
}

export default function AchievementsPage() {
  const { state } = useApp()
  const user = state.user

  // Mock data
  const streakDays = 7
  const longestStreak = 14

  const achievements: Achievement[] = [
    // Contribution Achievements
    {
      id: "first_comment",
      name: "İlk Adım",
      description: "İlk yorumunu yaz",
      icon: MessageSquare,
      category: "contribution",
      progress: 1,
      total: 1,
      unlocked: true,
      unlockedAt: "2 ay önce",
      coins: 10,
      rarity: "common",
    },
    {
      id: "first_topic",
      name: "Konu Açıcı",
      description: "İlk başlığını aç",
      icon: BookOpen,
      category: "contribution",
      progress: 1,
      total: 1,
      unlocked: true,
      unlockedAt: "1 ay önce",
      coins: 25,
      rarity: "common",
    },
    {
      id: "wiki_editor",
      name: "Wiki Editörü",
      description: "10 wiki düzenlemesi yap",
      icon: Target,
      category: "contribution",
      progress: 6,
      total: 10,
      unlocked: false,
      coins: 50,
      rarity: "rare",
    },
    {
      id: "prolific_writer",
      name: "Üretken Yazar",
      description: "50 yorum yaz",
      icon: MessageSquare,
      category: "contribution",
      progress: 45,
      total: 50,
      unlocked: false,
      coins: 100,
      rarity: "rare",
    },
    {
      id: "content_master",
      name: "İçerik Ustası",
      description: "25 başlık aç",
      icon: Crown,
      category: "contribution",
      progress: 2,
      total: 25,
      unlocked: false,
      coins: 250,
      rarity: "epic",
    },

    // Social Achievements
    {
      id: "popular",
      name: "Popüler",
      description: "Toplam 100 beğeni al",
      icon: ThumbsUp,
      category: "social",
      progress: 89,
      total: 100,
      unlocked: false,
      coins: 50,
      rarity: "rare",
    },
    {
      id: "influencer",
      name: "Etkileyici",
      description: "Toplam 1000 beğeni al",
      icon: Star,
      category: "social",
      progress: 89,
      total: 1000,
      unlocked: false,
      coins: 200,
      rarity: "epic",
    },
    {
      id: "networker",
      name: "Ağ Kurucu",
      description: "5 arkadaş davet et",
      icon: Users,
      category: "social",
      progress: 3,
      total: 5,
      unlocked: false,
      coins: 100,
      rarity: "rare",
    },

    // Streak Achievements
    {
      id: "week_streak",
      name: "Haftalık Seri",
      description: "7 gün üst üste aktif ol",
      icon: Flame,
      category: "streak",
      progress: 7,
      total: 7,
      unlocked: true,
      unlockedAt: "Bugün",
      coins: 50,
      rarity: "rare",
    },
    {
      id: "month_streak",
      name: "Aylık Seri",
      description: "30 gün üst üste aktif ol",
      icon: Zap,
      category: "streak",
      progress: 7,
      total: 30,
      unlocked: false,
      coins: 200,
      rarity: "epic",
    },

    // Milestone Achievements
    {
      id: "seyyah",
      name: "Seyyah Seviyesi",
      description: "500 GençCoin kazan",
      icon: Medal,
      category: "milestone",
      progress: 500,
      total: 500,
      unlocked: true,
      unlockedAt: "3 hafta önce",
      coins: 0,
      rarity: "common",
    },
    {
      id: "gezgin",
      name: "Gezgin Seviyesi",
      description: "2500 GençCoin kazan",
      icon: Trophy,
      category: "milestone",
      progress: user?.totalCoins || 0,
      total: 2500,
      unlocked: (user?.totalCoins || 0) >= 2500,
      coins: 0,
      rarity: "rare",
    },
    {
      id: "kasif",
      name: "Kaşif Seviyesi",
      description: "10000 GençCoin kazan",
      icon: Award,
      category: "milestone",
      progress: user?.totalCoins || 0,
      total: 10000,
      unlocked: (user?.totalCoins || 0) >= 10000,
      coins: 0,
      rarity: "epic",
    },
    {
      id: "bilge",
      name: "Konya Bilgesi",
      description: "50000 GençCoin kazan",
      icon: Crown,
      category: "milestone",
      progress: user?.totalCoins || 0,
      total: 50000,
      unlocked: (user?.totalCoins || 0) >= 50000,
      coins: 0,
      rarity: "legendary",
    },
  ]

  const unlockedCount = achievements.filter(a => a.unlocked).length
  const totalAchievements = achievements.length

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "common": return "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-700"
      case "rare": return "bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-500/30"
      case "epic": return "bg-purple-100 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400 border-purple-200 dark:border-purple-500/30"
      case "legendary": return "bg-yellow-100 dark:bg-yellow-500/20 text-yellow-600 dark:text-yellow-400 border-yellow-200 dark:border-yellow-500/30"
      default: return ""
    }
  }

  const getRarityLabel = (rarity: string) => {
    switch (rarity) {
      case "common": return "Yaygın"
      case "rare": return "Nadir"
      case "epic": return "Epik"
      case "legendary": return "Efsanevi"
      default: return ""
    }
  }

  const categories = [
    { id: "streak", label: "Seri Başarıları", icon: Flame },
    { id: "contribution", label: "Katkı Başarıları", icon: BookOpen },
    { id: "social", label: "Sosyal Başarılar", icon: Users },
    { id: "milestone", label: "Seviye Başarıları", icon: Trophy },
  ]

  return (
    <div className="space-y-6">
      {/* Başlık */}
      <div>
        <h1 className="font-[Manrope] text-foreground font-bold text-2xl sm:text-3xl">
          Başarılar
        </h1>
        <p className="font-[Manrope] text-foreground/60 dark:text-muted-foreground mt-1">
          Rozetler ve başarılarınızı takip edin
        </p>
      </div>

      {/* Özet Kartları */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Seri */}
        <Card className="bg-gradient-to-br from-orange-500 to-red-500 rounded-[20px] border-0">
          <CardContent className="p-5">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center">
                <Flame className="w-8 h-8 text-white" />
              </div>
              <div>
                <p className="font-[Manrope] text-white font-bold text-3xl">
                  {streakDays}
                </p>
                <p className="font-[Manrope] text-white/80 text-sm">
                  Günlük Seri 🔥
                </p>
              </div>
            </div>
            <p className="font-[Manrope] text-white/70 text-xs mt-3">
              En uzun seri: {longestStreak} gün
            </p>
          </CardContent>
        </Card>

        {/* Kazanılan Rozetler */}
        <Card className="bg-white dark:bg-card rounded-[20px] shadow-[0_4px_20px_rgba(0,0,0,0.06)] dark:shadow-lg border border-border">
          <CardContent className="p-5">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-primary/10 dark:bg-primary/20 rounded-xl flex items-center justify-center">
                <Trophy className="w-8 h-8 text-primary" />
              </div>
              <div>
                <p className="font-[Manrope] text-foreground font-bold text-3xl">
                  {unlockedCount}/{totalAchievements}
                </p>
                <p className="font-[Manrope] text-foreground/60 dark:text-muted-foreground text-sm">
                  Rozet Kazanıldı
                </p>
              </div>
            </div>
            <Progress 
              value={(unlockedCount / totalAchievements) * 100} 
              className="h-2 mt-3"
            />
          </CardContent>
        </Card>

        {/* Bir Sonraki */}
        <Card className="bg-white dark:bg-card rounded-[20px] shadow-[0_4px_20px_rgba(0,0,0,0.06)] dark:shadow-lg border border-border">
          <CardContent className="p-5">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-purple-100 dark:bg-purple-500/20 rounded-xl flex items-center justify-center">
                <Target className="w-8 h-8 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p className="font-[Manrope] text-foreground font-bold text-sm">
                  Popüler
                </p>
                <p className="font-[Manrope] text-foreground/60 dark:text-muted-foreground text-xs">
                  89/100 beğeni
                </p>
                <Progress value={89} className="h-1.5 mt-2 w-24" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Başarı Kategorileri */}
      {categories.map((category) => {
        const categoryAchievements = achievements.filter(a => a.category === category.id)
        const Icon = category.icon
        
        return (
          <Card key={category.id} className="bg-white dark:bg-card rounded-[20px] shadow-[0_4px_20px_rgba(0,0,0,0.06)] dark:shadow-lg border border-border">
            <CardHeader>
              <CardTitle className="font-[Manrope] text-foreground font-bold text-lg flex items-center gap-2">
                <Icon className="w-5 h-5 text-primary" />
                {category.label}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {categoryAchievements.map((achievement) => {
                  const AchievementIcon = achievement.icon
                  const progressPercent = Math.min((achievement.progress / achievement.total) * 100, 100)
                  
                  return (
                    <div
                      key={achievement.id}
                      className={`relative p-4 rounded-xl border ${
                        achievement.unlocked 
                          ? 'bg-[#f2f4f3] dark:bg-accent border-primary/20' 
                          : 'bg-gray-50 dark:bg-accent/50 border-gray-200 dark:border-border opacity-75'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                          achievement.unlocked 
                            ? 'bg-primary' 
                            : 'bg-gray-200 dark:bg-gray-700'
                        }`}>
                          {achievement.unlocked ? (
                            <AchievementIcon className="w-6 h-6 text-white" />
                          ) : (
                            <Lock className="w-5 h-5 text-gray-400 dark:text-gray-500" />
                          )}
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <p className={`font-[Manrope] font-bold text-sm ${
                              achievement.unlocked 
                                ? 'text-foreground' 
                                : 'text-gray-400 dark:text-gray-500'
                            }`}>
                              {achievement.name}
                            </p>
                            <Badge className={`${getRarityColor(achievement.rarity)} font-[Manrope] text-[10px] px-1.5 py-0`}>
                              {getRarityLabel(achievement.rarity)}
                            </Badge>
                          </div>
                          
                          <p className={`font-[Manrope] text-xs mb-2 ${
                            achievement.unlocked 
                              ? 'text-foreground/60 dark:text-muted-foreground' 
                              : 'text-gray-400 dark:text-gray-500'
                          }`}>
                            {achievement.description}
                          </p>
                          
                          {!achievement.unlocked && (
                            <div className="space-y-1">
                              <Progress value={progressPercent} className="h-1.5" />
                              <p className="font-[Manrope] text-[10px] text-foreground/50 dark:text-muted-foreground">
                                {achievement.progress.toLocaleString()} / {achievement.total.toLocaleString()}
                              </p>
                            </div>
                          )}
                          
                          {achievement.unlocked && achievement.unlockedAt && (
                            <p className="font-[Manrope] text-[10px] text-primary">
                              ✓ {achievement.unlockedAt} kazanıldı
                            </p>
                          )}
                        </div>

                        {achievement.coins > 0 && (
                          <Badge className="bg-primary text-white font-[Manrope] text-xs">
                            +{achievement.coins}
                          </Badge>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}

