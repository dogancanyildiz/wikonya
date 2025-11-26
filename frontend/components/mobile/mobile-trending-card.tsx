"use client"

import { TrendingUp, Eye, MessageCircle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"

interface MobileTrendingCardProps {
  id?: string
  title: string
  category: string
  views: string
  comments: number
  trend: string
  onClick?: () => void
}

export function MobileTrendingCard({
  id,
  title,
  category,
  views,
  comments,
  trend,
  onClick,
}: MobileTrendingCardProps) {
  const content = (
    <Card className="bg-white dark:bg-card rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.06)] dark:shadow-lg active:scale-[0.98] transition-transform min-w-[280px] border border-border">
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <span className="px-2 sm:px-3 py-1 bg-[#f2f4f3] dark:bg-accent rounded-full font-[Manrope] text-[#03624c] font-bold text-[10px] sm:text-[11px]">
            {category}
          </span>
          <div className="flex items-center gap-1 text-[#03624c]">
            <TrendingUp className="w-3 h-3 sm:w-3.5 sm:h-3.5" strokeWidth={3} />
            <span className="font-[Manrope] font-bold text-xs sm:text-xs">
              {trend}
            </span>
          </div>
        </div>

        <h3 className="font-[Manrope] text-[#4d4d4d] dark:text-foreground mb-3 font-extrabold text-base sm:text-base leading-snug">
          {title}
        </h3>

        <div className="flex items-center gap-3 text-[#4d4d4d]/60 dark:text-muted-foreground">
          <div className="flex items-center gap-1">
            <Eye className="w-3 h-3 sm:w-4 sm:h-4" strokeWidth={2.5} />
            <span className="font-[Manrope] font-bold text-[10px] sm:text-[11px]">
              {views}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <MessageCircle className="w-3 h-3 sm:w-4 sm:h-4" strokeWidth={2.5} />
            <span className="font-[Manrope] font-bold text-[10px] sm:text-[11px]">
              {comments}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  if (id) {
    return (
      <Link href={`/topic/${id}`} onClick={onClick}>
        {content}
      </Link>
    )
  }

  return (
    <div onClick={onClick} className="cursor-pointer">
      {content}
    </div>
  )
}

