"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, BookOpen, MessageCircle, TrendingUp, AlertTriangle } from "lucide-react"

interface AdminStats {
  totalUsers: number
  activeUsers: number
  totalTopics: number
  totalComments: number
  totalWikiEdits: number
  pendingApprovals: number
  flaggedContent: number
  platformHealth: "healthy" | "warning" | "critical"
}

interface AdminDashboardProps {
  stats?: AdminStats
}

export function AdminDashboard({ stats }: AdminDashboardProps) {
  const [calculatedStats, setCalculatedStats] = useState<AdminStats | null>(null)

  // Calculate stats from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Get all user stats
      const allUserStats: Array<{ userId: number; stats: { commentCount: number; wikiEditCount: number; topicCount: number; lastUpdated?: string } }> = []
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i)
        if (key?.startsWith("user_stats_")) {
          const userId = parseInt(key.replace("user_stats_", ""))
          try {
            const userStats = JSON.parse(localStorage.getItem(key) || "{}")
            allUserStats.push({ userId, stats: userStats })
          } catch {
            // Skip invalid entries
          }
        }
      }

      // Get moderation history
      const moderationHistory = JSON.parse(localStorage.getItem("moderation_history") || "[]")
      const pendingApprovals = moderationHistory.filter((m: { action: string }) => m.action === "pending").length

      // Get wiki history counts
      let totalWikiEdits = 0
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i)
        if (key?.startsWith("wiki_history_")) {
          try {
            const history = JSON.parse(localStorage.getItem(key) || "[]")
            totalWikiEdits += history.length
          } catch {
            // Skip invalid entries
          }
        }
      }

      // Calculate stats
      const totalUsers = allUserStats.length || 1
      const activeUsers = allUserStats.filter(us => {
        const lastUpdated = new Date(us.stats.lastUpdated || new Date().toISOString())
        const daysSinceUpdate = (Date.now() - lastUpdated.getTime()) / (1000 * 60 * 60 * 24)
        return daysSinceUpdate <= 30
      }).length || 1
      const totalTopics = allUserStats.reduce((sum, us) => sum + (us.stats.topicCount || 0), 0) || 0
      const totalComments = allUserStats.reduce((sum, us) => sum + (us.stats.commentCount || 0), 0) || 0

      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCalculatedStats({
        totalUsers,
        activeUsers,
        totalTopics,
        totalComments,
        totalWikiEdits,
        pendingApprovals,
        flaggedContent: 0, // Would need separate tracking
        platformHealth: pendingApprovals > 20 ? "warning" : "healthy",
      })
    }
  }, [])

  // Mock data - gerçek uygulamada API'den gelecek
  const mockStats: AdminStats = stats || calculatedStats || {
    totalUsers: 1250,
    activeUsers: 342,
    totalTopics: 456,
    totalComments: 3240,
    totalWikiEdits: 892,
    pendingApprovals: 12,
    flaggedContent: 3,
    platformHealth: "healthy",
  }

  const statCards = [
    {
      title: "Toplam Kullanıcı",
      value: mockStats.totalUsers.toLocaleString(),
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
    },
    {
      title: "Aktif Kullanıcı (30 gün)",
      value: mockStats.activeUsers.toLocaleString(),
      icon: TrendingUp,
      color: "text-green-600",
      bgColor: "bg-green-50 dark:bg-green-900/20",
    },
    {
      title: "Toplam Başlık",
      value: mockStats.totalTopics.toLocaleString(),
      icon: BookOpen,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      title: "Toplam Yorum",
      value: mockStats.totalComments.toLocaleString(),
      icon: MessageCircle,
      color: "text-purple-600",
      bgColor: "bg-purple-50 dark:bg-purple-900/20",
    },
    {
      title: "Wiki Düzenlemeleri",
      value: mockStats.totalWikiEdits.toLocaleString(),
      icon: BookOpen,
      color: "text-orange-600",
      bgColor: "bg-orange-50 dark:bg-orange-900/20",
    },
    {
      title: "Onay Bekleyen",
      value: mockStats.pendingApprovals.toString(),
      icon: AlertTriangle,
      color: "text-yellow-600",
      bgColor: "bg-yellow-50 dark:bg-yellow-900/20",
    },
  ]

  const getHealthColor = () => {
    switch (mockStats.platformHealth) {
      case "healthy":
        return "text-green-600 bg-green-50 dark:bg-green-900/20"
      case "warning":
        return "text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20"
      case "critical":
        return "text-red-600 bg-red-50 dark:bg-red-900/20"
      default:
        return "text-gray-600 bg-gray-50 dark:bg-gray-900/20"
    }
  }

  const getHealthText = () => {
    switch (mockStats.platformHealth) {
      case "healthy":
        return "Sağlıklı"
      case "warning":
        return "Uyarı"
      case "critical":
        return "Kritik"
      default:
        return "Bilinmiyor"
    }
  }

  return (
    <div className="space-y-6">
      {/* Platform Health */}
      <Card className="bg-card rounded-xl shadow-md dark:shadow-lg border border-border">
        <CardHeader>
          <CardTitle className="font-[Manrope] text-foreground font-bold text-xl sm:text-2xl">
            Platform Sağlığı
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg ${getHealthColor()}`}>
            <div className={`w-3 h-3 rounded-full ${
              mockStats.platformHealth === "healthy" ? "bg-green-500" :
              mockStats.platformHealth === "warning" ? "bg-yellow-500" : "bg-red-500"
            }`} />
            <span className="font-[Manrope] font-bold text-sm">
              {getHealthText()}
            </span>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div>
              <p className="font-[Manrope] text-xs text-muted-foreground mb-1">Bayraklanan İçerik</p>
              <p className="font-[Manrope] font-bold text-lg text-foreground">
                {mockStats.flaggedContent}
              </p>
            </div>
            <div>
              <p className="font-[Manrope] text-xs text-muted-foreground mb-1">Onay Bekleyen</p>
              <p className="font-[Manrope] font-bold text-lg text-foreground">
                {mockStats.pendingApprovals}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {statCards.map((stat) => {
          const Icon = stat.icon
          return (
            <Card
              key={stat.title}
              className="bg-card rounded-xl shadow-md dark:shadow-lg border border-border"
            >
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center justify-between mb-2">
                  <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                    <Icon className={`w-5 h-5 ${stat.color}`} />
                  </div>
                </div>
                <p className="font-[Manrope] font-bold text-2xl sm:text-3xl text-foreground mb-1">
                  {stat.value}
                </p>
                <p className="font-[Manrope] text-sm text-muted-foreground">
                  {stat.title}
                </p>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}

