"use client"

import { useState, useMemo, useCallback } from "react"
import { useApp } from "@/contexts/app-context"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MessageSquare, ThumbsUp, BookOpen, TrendingUp, TrendingDown, Eye } from "lucide-react"

interface AnalyticsData {
  period: "7d" | "30d" | "90d" | "all"
  topics: number[]
  comments: number[]
  likes: number[]
  views: number[]
  dates: string[]
}

// Generate deterministic mock data (seeded for consistency)
function generateMockData(length: number, seed: number, min: number, max: number): number[] {
  const data: number[] = []
  let currentSeed = seed
  for (let i = 0; i < length; i++) {
    // Simple seeded random generator
    currentSeed = (currentSeed * 9301 + 49297) % 233280
    const random = currentSeed / 233280
    data.push(Math.floor(random * (max - min + 1)) + min)
  }
  return data
}

export default function AnalyticsPage() {
  const { state } = useApp()
  const [selectedPeriod, setSelectedPeriod] = useState<"7d" | "30d" | "90d" | "all">("30d")
  const [activeTab, setActiveTab] = useState<"overview" | "topics" | "engagement">("overview")

  // Mock analytics data - gerçek uygulamada API'den gelecek
  // Using useMemo to ensure data is generated once and is deterministic
  const analyticsData: Record<"7d" | "30d" | "90d" | "all", AnalyticsData> = useMemo(() => ({
    "7d": {
      period: "7d",
      topics: [2, 1, 3, 2, 1, 2, 3],
      comments: [5, 8, 12, 6, 9, 11, 15],
      likes: [12, 18, 25, 15, 20, 22, 28],
      views: [45, 62, 78, 52, 68, 75, 92],
      dates: ["Pzt", "Sal", "Çar", "Per", "Cum", "Cmt", "Paz"],
    },
    "30d": {
      period: "30d",
      topics: [2, 1, 3, 2, 1, 2, 3, 1, 2, 3, 2, 1, 2, 3, 2, 1, 2, 3, 2, 1, 2, 3, 2, 1, 2, 3, 2, 1, 2, 3],
      comments: [5, 8, 12, 6, 9, 11, 15, 7, 10, 13, 8, 9, 12, 14, 10, 11, 13, 16, 9, 12, 15, 11, 13, 16, 10, 14, 12, 15, 13, 17],
      likes: [12, 18, 25, 15, 20, 22, 28, 16, 21, 24, 18, 19, 23, 26, 20, 22, 25, 29, 19, 23, 27, 21, 24, 28, 20, 25, 23, 27, 24, 30],
      views: [45, 62, 78, 52, 68, 75, 92, 58, 72, 85, 65, 70, 80, 95, 68, 75, 88, 102, 72, 85, 98, 78, 90, 105, 75, 92, 85, 100, 88, 115],
      dates: Array.from({ length: 30 }, (_, i) => `${i + 1}`),
    },
    "90d": {
      period: "90d",
      topics: generateMockData(12, 12345, 1, 3),
      comments: generateMockData(12, 23456, 5, 15),
      likes: generateMockData(12, 34567, 10, 25),
      views: generateMockData(12, 45678, 40, 80),
      dates: ["Hafta 1", "Hafta 2", "Hafta 3", "Hafta 4", "Hafta 5", "Hafta 6", "Hafta 7", "Hafta 8", "Hafta 9", "Hafta 10", "Hafta 11", "Hafta 12"],
    },
    "all": {
      period: "all",
      topics: generateMockData(6, 56789, 2, 6),
      comments: generateMockData(6, 67890, 10, 30),
      likes: generateMockData(6, 78901, 15, 45),
      views: generateMockData(6, 89012, 50, 110),
      dates: ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran"],
    },
  }), [])

  const data = useMemo(() => analyticsData[selectedPeriod], [selectedPeriod, analyticsData])
  const maxValue = useMemo(() => Math.max(...data.views, ...data.likes, ...data.comments, ...data.topics), [data])

  // Calculate totals and trends - memoized
  const totals = useMemo(() => ({
    topics: data.topics.reduce((a, b) => a + b, 0),
    comments: data.comments.reduce((a, b) => a + b, 0),
    likes: data.likes.reduce((a, b) => a + b, 0),
    views: data.views.reduce((a, b) => a + b, 0),
  }), [data])

  const trends = useMemo(() => ({
    topics: totals.topics > 20 ? "up" : "down",
    comments: totals.comments > 100 ? "up" : "down",
    likes: totals.likes > 200 ? "up" : "down",
    views: totals.views > 500 ? "up" : "down",
  }), [totals])

  const handlePeriodChange = useCallback((period: "7d" | "30d" | "90d" | "all") => {
    setSelectedPeriod(period)
  }, [])

  if (!state.user) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="font-[Manrope] text-foreground">Lütfen giriş yapın</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-[Manrope] text-foreground font-extrabold text-2xl sm:text-3xl mb-2">
            Analytics & İstatistikler
          </h1>
          <p className="font-[Manrope] text-foreground/60 dark:text-muted-foreground text-sm">
            Aktivite ve performans metriklerinizi görüntüleyin
          </p>
        </div>
        <div className="flex items-center gap-2">
          {(["7d", "30d", "90d", "all"] as const).map((period) => (
            <button
              key={period}
              onClick={() => handlePeriodChange(period)}
              aria-label={`${period === "7d" ? "Son 7 gün" : period === "30d" ? "Son 30 gün" : period === "90d" ? "Son 90 gün" : "Tüm zamanlar"} verilerini göster`}
              className={`px-3 py-1.5 rounded-lg font-[Manrope] font-semibold text-xs transition-colors ${
                selectedPeriod === period
                  ? "bg-primary text-white"
                  : "bg-accent text-foreground hover:bg-accent/80"
              }`}
            >
              {period === "7d" ? "7 Gün" : period === "30d" ? "30 Gün" : period === "90d" ? "90 Gün" : "Tümü"}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-card border border-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-primary" />
              </div>
              {trends.topics === "up" ? (
                <TrendingUp className="w-4 h-4 text-green-500" />
              ) : (
                <TrendingDown className="w-4 h-4 text-red-500" />
              )}
            </div>
            <p className="font-[Manrope] text-foreground font-extrabold text-2xl mb-1">
              {totals.topics}
            </p>
            <p className="font-[Manrope] text-muted-foreground text-sm">Başlık</p>
          </CardContent>
        </Card>

        <Card className="bg-card border border-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-primary" />
              </div>
              {trends.comments === "up" ? (
                <TrendingUp className="w-4 h-4 text-green-500" />
              ) : (
                <TrendingDown className="w-4 h-4 text-red-500" />
              )}
            </div>
            <p className="font-[Manrope] text-foreground font-extrabold text-2xl mb-1">
              {totals.comments}
            </p>
            <p className="font-[Manrope] text-muted-foreground text-sm">Yorum</p>
          </CardContent>
        </Card>

        <Card className="bg-card border border-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <ThumbsUp className="w-5 h-5 text-primary" />
              </div>
              {trends.likes === "up" ? (
                <TrendingUp className="w-4 h-4 text-green-500" />
              ) : (
                <TrendingDown className="w-4 h-4 text-red-500" />
              )}
            </div>
            <p className="font-[Manrope] text-foreground font-extrabold text-2xl mb-1">
              {totals.likes}
            </p>
            <p className="font-[Manrope] text-muted-foreground text-sm">Beğeni</p>
          </CardContent>
        </Card>

        <Card className="bg-card border border-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Eye className="w-5 h-5 text-primary" />
              </div>
              {trends.views === "up" ? (
                <TrendingUp className="w-4 h-4 text-green-500" />
              ) : (
                <TrendingDown className="w-4 h-4 text-red-500" />
              )}
            </div>
            <p className="font-[Manrope] text-foreground font-extrabold text-2xl mb-1">
              {totals.views}
            </p>
            <p className="font-[Manrope] text-muted-foreground text-sm">Görüntülenme</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as "overview" | "topics" | "engagement")}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview" className="font-[Manrope] font-semibold">
            Genel Bakış
          </TabsTrigger>
          <TabsTrigger value="topics" className="font-[Manrope] font-semibold">
            Başlıklar
          </TabsTrigger>
          <TabsTrigger value="engagement" className="font-[Manrope] font-semibold">
            Etkileşim
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="font-[Manrope] text-foreground font-bold">
                Görüntülenme
              </CardTitle>
              <CardDescription className="font-[Manrope]">
                {selectedPeriod === "7d" ? "Son 7 gün" : selectedPeriod === "30d" ? "Son 30 gün" : selectedPeriod === "90d" ? "Son 90 gün" : "Tüm zamanlar"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <SimpleBarChart data={data.views} color="#03624c" label="Görüntülenme" maxValue={maxValue} dates={data.dates} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="topics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="font-[Manrope] text-foreground font-bold">
                Başlık
              </CardTitle>
              <CardDescription className="font-[Manrope]">
                {selectedPeriod === "7d" ? "Son 7 gün" : selectedPeriod === "30d" ? "Son 30 gün" : selectedPeriod === "90d" ? "Son 90 gün" : "Tüm zamanlar"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <SimpleBarChart data={data.topics} color="#03624c" label="Başlık" maxValue={maxValue} dates={data.dates} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="engagement" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="font-[Manrope] text-foreground font-bold">
                  Yorumlar
                </CardTitle>
                <CardDescription className="font-[Manrope]">
                  {selectedPeriod === "7d" ? "Son 7 gün" : selectedPeriod === "30d" ? "Son 30 gün" : selectedPeriod === "90d" ? "Son 90 gün" : "Tüm zamanlar"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <SimpleBarChart data={data.comments} color="#03624c" label="Yorum" maxValue={maxValue} dates={data.dates} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="font-[Manrope] text-foreground font-bold">
                  Beğeniler
                </CardTitle>
                <CardDescription className="font-[Manrope]">
                  {selectedPeriod === "7d" ? "Son 7 gün" : selectedPeriod === "30d" ? "Son 30 gün" : selectedPeriod === "90d" ? "Son 90 gün" : "Tüm zamanlar"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <SimpleBarChart data={data.likes} color="#03624c" label="Beğeni" maxValue={maxValue} dates={data.dates} />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

// Simple Bar Chart Component - moved outside render
function SimpleBarChart({ data, color, label, maxValue, dates }: { data: number[]; color: string; label: string; maxValue?: number; dates?: string[] }) {
  const chartMaxValue = maxValue || Math.max(...data, 1)
  return (
    <div className="space-y-2">
      <div className="flex items-end gap-1 h-32">
        {data.map((value, index) => {
          const height = (value / chartMaxValue) * 100
          return (
            <div key={index} className="flex-1 flex flex-col items-center gap-1">
              <div
                className="w-full rounded-t transition-all hover:opacity-80"
                style={{
                  height: `${height}%`,
                  backgroundColor: color,
                  minHeight: value > 0 ? "4px" : "0",
                }}
                title={`${label}: ${value}`}
              />
              {dates && dates.length <= 7 && (
                <span className="text-[10px] text-muted-foreground font-[Manrope] font-medium">
                  {dates[index]}
                </span>
              )}
            </div>
          )
        })}
      </div>
      {dates && dates.length > 7 && (
        <div className="flex justify-between text-[10px] text-muted-foreground font-[Manrope] font-medium">
          <span>{dates[0]}</span>
          <span>{dates[dates.length - 1]}</span>
        </div>
      )}
    </div>
  )
}

