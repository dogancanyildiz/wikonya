"use client"

import { TrendingUp, MessageCircle, Eye, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface TrendingTopicsProps {
  onNavigateToTopic?: () => void
}

export function TrendingTopics({ onNavigateToTopic }: TrendingTopicsProps) {
  const trendingData = [
    {
      id: 1,
      title: "Meram Kampüsü Yemekhane Fiyatları",
      category: "Sosyal",
      views: "2.4k",
      comments: 87,
      trend: "+12%",
    },
    {
      id: 2,
      title: "Veri Yapıları Final Hazırlık",
      category: "Akademik",
      views: "1.8k",
      comments: 124,
      trend: "+24%",
    },
    {
      id: 3,
      title: "En İyi Öğrenci Yurtları 2024",
      category: "Barınma",
      views: "3.2k",
      comments: 156,
      trend: "+8%",
    },
    {
      id: 4,
      title: "Kampüste Spor Salonları",
      category: "Sosyal",
      views: "1.5k",
      comments: 43,
      trend: "+15%",
    },
  ]

  return (
    <div className="mt-12">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <TrendingUp className="w-6 h-6 text-[#03624c]" />
          <h2 className="font-[Manrope] font-bold text-[#4d4d4d] dark:text-foreground text-xl sm:text-2xl">Trending Topics</h2>
        </div>
        <Button variant="ghost" className="text-[#03624c] hover:text-[#03624c]/80 hover:bg-transparent font-[Manrope] font-semibold">
          Tümünü Gör <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {trendingData.map((topic) => (
          <Card
            key={topic.id}
            onClick={onNavigateToTopic}
            className="bg-white dark:bg-card rounded-[20px] hover:shadow-lg transition-all duration-300 cursor-pointer group hover:scale-[1.02] border border-border"
          >
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-start justify-between mb-4">
                <span className="px-3 py-1 bg-[#f2f4f3] dark:bg-accent rounded-full font-[Manrope] font-semibold text-[#03624c] text-xs sm:text-sm">
                  {topic.category}
                </span>
                <div className="flex items-center gap-1 text-[#03624c]">
                  <TrendingUp className="w-4 h-4" />
                  <span className="font-[Manrope] font-bold text-xs sm:text-sm">{topic.trend}</span>
                </div>
              </div>
              
              <h3 className="font-[Manrope] font-bold text-[#4d4d4d] dark:text-foreground mb-4 group-hover:text-[#03624c] transition-colors text-sm sm:text-base">
                {topic.title}
              </h3>

              <div className="flex items-center gap-3 sm:gap-4 text-[#4d4d4d]/60 dark:text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Eye className="w-4 h-4" />
                  <span className="font-[Manrope] font-semibold text-xs sm:text-sm">{topic.views}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MessageCircle className="w-4 h-4" />
                  <span className="font-[Manrope] font-semibold text-xs sm:text-sm">{topic.comments}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

