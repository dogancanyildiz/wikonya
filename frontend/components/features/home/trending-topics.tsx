"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Eye, MessageCircle } from "lucide-react"
import Link from "next/link"
import { Topic } from "@/lib/types"
import { getTopics } from "@/lib/mock-data"

interface TrendingTopicsProps {
  topics?: Topic[]
}

export function TrendingTopics({ topics }: TrendingTopicsProps) {
  // Mock data - gerçek uygulamada API'den gelecek
  // mock-data.json dosyasından veri alınıyor
  const mockTopics: Topic[] = topics || getTopics()

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

