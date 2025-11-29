"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { CoinIcon } from "@/components/common/icons/coin-icon"
import { CoinConverter } from "@/components/features/dashboard/coin-converter"
import { useApp } from "@/contexts/app-context"
import { 
  TrendingUp, 
  ArrowUpRight, 
  Calendar,
  MessageSquare,
  ThumbsUp,
  BookOpen,
  Edit,
  Award,
  Gift
} from "lucide-react"
import { getTransactions } from "@/lib/mock-data"

interface Transaction {
  id: number
  type: "earned" | "spent" | "transferred"
  action: string
  amount: number
  date: string
  icon: React.ElementType
}

// Icon mapping
const iconMap: Record<string, React.ElementType> = {
  "💬": MessageSquare,
  "👍": ThumbsUp,
  "✏️": Edit,
  "🎁": Gift,
  "📖": BookOpen,
  "🏆": Award,
}

export default function WalletPage() {
  const { state } = useApp()
  const [activeTab, setActiveTab] = useState<"all" | "earned" | "spent">("all")
  const user = state.user

  // Mock veriler - mock-data.json dosyasından alınıyor
  const mockTransactions = getTransactions()
  const transactions: Transaction[] = mockTransactions.map(t => ({
    ...t,
    icon: iconMap[t.icon] || MessageSquare,
  }))

  const weeklyEarned = transactions
    .filter(t => t.type === "earned" && t.date.includes("saat") || t.date.includes("gün"))
    .reduce((sum, t) => sum + t.amount, 0)
  const monthlyEarned = transactions
    .filter(t => t.type === "earned")
    .reduce((sum, t) => sum + t.amount, 0)
  const totalSpent = Math.abs(transactions
    .filter(t => t.type === "spent" || t.type === "transferred")
    .reduce((sum, t) => sum + t.amount, 0))
  const totalEarned = (user?.totalCoins || 0) + totalSpent
  const transferredToKart = Math.abs(transactions
    .find(t => t.action.includes("Kültür Kart"))?.amount || 0)

  const filteredTransactions = transactions.filter((t) => {
    if (activeTab === "all") return true
    if (activeTab === "earned") return t.type === "earned"
    if (activeTab === "spent") return t.type === "spent" || t.type === "transferred"
    return true
  })

  if (!user) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="font-[Manrope] text-foreground">
          Lütfen giriş yapın
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Başlık */}
      <div>
        <h1 className="font-[Manrope] text-foreground font-bold text-2xl sm:text-3xl">
          Cüzdan & GençCoin
        </h1>
        <p className="font-[Manrope] text-foreground/60 dark:text-muted-foreground mt-1">
          Kazandığınız coinleri takip edin ve Kültür Kart&apos;a aktarın
        </p>
      </div>

      {/* Bakiye Kartları */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Toplam Bakiye */}
        <Card className="bg-gradient-to-br from-primary to-primary/90 rounded-[20px] border-0">
          <CardContent className="p-4 sm:p-5">
            <div className="flex items-center gap-2 mb-2">
              <CoinIcon />
              <p className="font-[Manrope] text-white/80 uppercase tracking-wider font-bold text-[10px] sm:text-xs">
                Toplam Bakiye
              </p>
            </div>
            <div className="font-[Manrope] text-white leading-none font-black text-3xl sm:text-4xl">
              {user.totalCoins.toLocaleString()}
            </div>
            <div className="flex items-center gap-2 text-green-300 mt-2">
              <TrendingUp className="w-3 h-3" />
              <span className="font-[Manrope] font-semibold text-xs">
                +{weeklyEarned} bu hafta
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Bu Ay Kazanılan */}
        <Card className="bg-white dark:bg-card rounded-[20px] shadow-[0_4px_20px_rgba(0,0,0,0.06)] dark:shadow-lg border border-border">
          <CardContent className="p-4 sm:p-5">
            <div className="flex items-center justify-between mb-2">
              <p className="font-[Manrope] text-foreground/60 dark:text-muted-foreground font-medium text-xs">
                Bu Ay Kazanılan
              </p>
              <div className="w-8 h-8 bg-green-100 dark:bg-green-500/20 rounded-lg flex items-center justify-center">
                <ArrowUpRight className="w-4 h-4 text-green-600 dark:text-green-400" />
              </div>
            </div>
            <div className="font-[Manrope] text-primary font-bold text-2xl">
              +{monthlyEarned}
            </div>
          </CardContent>
        </Card>

        {/* Toplam Kazanç */}
        <Card className="bg-white dark:bg-card rounded-[20px] shadow-[0_4px_20px_rgba(0,0,0,0.06)] dark:shadow-lg border border-border">
          <CardContent className="p-4 sm:p-5">
            <div className="flex items-center justify-between mb-2">
              <p className="font-[Manrope] text-foreground/60 dark:text-muted-foreground font-medium text-xs">
                Toplam Kazanç
              </p>
              <div className="w-8 h-8 bg-[#f2f4f3] dark:bg-accent rounded-lg flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-primary" />
              </div>
            </div>
            <div className="font-[Manrope] text-foreground font-bold text-2xl">
              {totalEarned.toLocaleString()}
            </div>
          </CardContent>
        </Card>

        {/* Kültür Kart'a Aktarılan */}
        <Card className="bg-white dark:bg-card rounded-[20px] shadow-[0_4px_20px_rgba(0,0,0,0.06)] dark:shadow-lg border border-border">
          <CardContent className="p-4 sm:p-5">
            <div className="flex items-center justify-between mb-2">
              <p className="font-[Manrope] text-foreground/60 dark:text-muted-foreground font-medium text-xs">
                Karta Aktarılan
              </p>
              <div className="w-8 h-8 bg-purple-100 dark:bg-purple-500/20 rounded-lg flex items-center justify-center">
                <Gift className="w-4 h-4 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
            <div className="font-[Manrope] text-purple-600 dark:text-purple-400 font-bold text-2xl">
              {transferredToKart}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Coin Dönüştürücü */}
      <CoinConverter />

      {/* İşlem Geçmişi */}
      <Card className="bg-white dark:bg-card rounded-[20px] shadow-[0_4px_20px_rgba(0,0,0,0.06)] dark:shadow-lg border border-border">
        <CardHeader>
          <CardTitle className="font-[Manrope] text-foreground font-bold text-lg sm:text-xl">
            İşlem Geçmişi
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as typeof activeTab)}>
            <TabsList className="grid w-full grid-cols-3 font-[Manrope] mb-6">
              <TabsTrigger value="all">Tümü</TabsTrigger>
              <TabsTrigger value="earned">Kazanılan</TabsTrigger>
              <TabsTrigger value="spent">Harcanan</TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="space-y-3">
              {filteredTransactions.map((transaction) => {
                const Icon = transaction.icon
                const isPositive = transaction.amount > 0

                return (
                  <div
                    key={transaction.id}
                    className="flex items-center gap-4 p-4 bg-[#f2f4f3] dark:bg-accent rounded-xl hover:shadow-md transition-shadow"
                  >
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      isPositive ? 'bg-green-100 dark:bg-green-500/20' : 'bg-purple-100 dark:bg-purple-500/20'
                    }`}>
                      <Icon className={`w-5 h-5 ${
                        isPositive ? 'text-green-600 dark:text-green-400' : 'text-purple-600 dark:text-purple-400'
                      }`} />
                    </div>

                    <div className="flex-1">
                      <p className="font-[Manrope] font-semibold text-sm text-foreground">
                        {transaction.action}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <Calendar className="w-3 h-3 text-foreground/50 dark:text-muted-foreground" />
                        <span className="font-[Manrope] text-xs text-foreground/50 dark:text-muted-foreground">
                          {transaction.date}
                        </span>
                      </div>
                    </div>

                    <Badge className={`font-[Manrope] font-bold ${
                      isPositive 
                        ? 'bg-green-100 dark:bg-green-500/20 text-green-600 dark:text-green-400 border-green-200 dark:border-green-500/30' 
                        : 'bg-purple-100 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400 border-purple-200 dark:border-purple-500/30'
                    }`}>
                      {isPositive ? '+' : ''}{transaction.amount} GençCoin
                    </Badge>
                  </div>
                )
              })}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

