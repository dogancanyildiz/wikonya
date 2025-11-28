"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Eye, MessageCircle } from "lucide-react"
import Link from "next/link"
import { Topic } from "@/lib/types"

interface TrendingTopicsProps {
  topics?: Topic[]
}

export function TrendingTopics({ topics }: TrendingTopicsProps) {
  // Mock data - gerçek uygulamada API'den gelecek
  const mockTopics: Topic[] = topics || [
    {
      id: 1,
      title: "Selçuk Hukuk Final Notları",
      content: "Final sınavlarına hazırlık için kapsamlı ders notları...",
      category: "Akademik",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      views: 3200,
      likes: 145,
      comments: 48,
      tags: ["Ders Notu", "Hukuk Fakültesi"],
      author: { id: 1, name: "Admin", initials: "AD", role: "konya_bilgesi", totalCoins: 0, badges: [], xp: { current: 0, nextLevel: 500, progress: 0 }, joinedAt: new Date().toISOString() },
      reliabilityScore: 98,
    },
    {
      id: 2,
      title: "Konya'da Öğrenci Dostu Restoranlar",
      content: "Bütçe dostu ve lezzetli yemek seçenekleri...",
      category: "Sosyal",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      views: 2800,
      likes: 120,
      comments: 35,
      tags: ["Restoran", "Yemek"],
      author: { id: 2, name: "User", initials: "US", role: "gezgin", totalCoins: 0, badges: [], xp: { current: 0, nextLevel: 500, progress: 0 }, joinedAt: new Date().toISOString() },
      reliabilityScore: 92,
    },
    {
      id: 3,
      title: "Bosna Hersek Mahallesi Ev Kiralama Rehberi",
      content: "Mahalle hakkında detaylı bilgiler ve kiralama tüyoları...",
      category: "Barınma",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      views: 2100,
      likes: 98,
      comments: 42,
      tags: ["Ev", "Kiralama"],
      author: { id: 3, name: "User2", initials: "U2", role: "seyyah", totalCoins: 0, badges: [], xp: { current: 0, nextLevel: 500, progress: 0 }, joinedAt: new Date().toISOString() },
      reliabilityScore: 88,
    },
  ]

  return (
    <Card className="bg-card rounded-xl shadow-md dark:shadow-lg border border-border">
      <CardContent className="p-4 sm:p-6">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-5 h-5 text-primary" />
          <h2 className="font-[Manrope] text-foreground font-bold text-lg sm:text-xl">
            Trend Başlıklar
          </h2>
        </div>
        <div className="space-y-3">
          {mockTopics.map((topic, index) => (
            <Link
              key={topic.id}
              href={`/topic/${topic.id}`}
              className="block p-3 sm:p-4 bg-accent rounded-xl hover:shadow-md transition-all group"
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-[Manrope] font-extrabold text-primary text-sm sm:text-base">
                      #{index + 1}
                    </span>
                    <Badge variant="outline" className="font-[Manrope] text-xs">
                      {topic.category}
                    </Badge>
                  </div>
                  <h3 className="font-[Manrope] font-bold text-sm sm:text-base text-foreground group-hover:text-primary transition-colors line-clamp-2">
                    {topic.title}
                  </h3>
                </div>
              </div>
              <div className="flex items-center gap-4 text-xs text-foreground/60 dark:text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Eye className="w-3 h-3" />
                  <span className="font-[Manrope] font-medium">
                    {(topic.views / 1000).toFixed(1)}k
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <MessageCircle className="w-3 h-3" />
                  <span className="font-[Manrope] font-medium">{topic.comments}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

