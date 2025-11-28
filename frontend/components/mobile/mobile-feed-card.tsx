"use client"

import { MessageCircle, ThumbsUp, Eye, Clock } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { useState } from "react"

interface MobileFeedCardProps {
  id?: string
  author: string
  authorInitials: string
  category: string
  title: string
  excerpt: string
  timeAgo: string
  likes: number
  comments: number
  views: string
  onClick?: () => void
}

export function MobileFeedCard({
  id,
  author,
  authorInitials,
  category,
  title,
  excerpt,
  timeAgo,
  likes,
  comments,
  views,
  onClick,
}: MobileFeedCardProps) {
  const [isLiked, setIsLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(likes)

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsLiked(!isLiked)
    setLikeCount(prev => isLiked ? prev - 1 : prev + 1)
  }

  const content = (
    <Card className="bg-card rounded-xl shadow-md dark:shadow-lg active:scale-[0.98] transition-transform border border-border">
      <CardContent className="p-4">
        {/* Header */}
        <div className="flex items-center gap-3 mb-3">
          <Avatar className="w-9 h-9 sm:w-10 sm:h-10 border-2 border-border">
            <AvatarFallback className="bg-primary text-white font-[Manrope] font-bold text-xs sm:text-sm">
              {authorInitials}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="font-[Manrope] text-foreground truncate font-bold text-sm sm:text-sm">
              {author}
            </p>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 bg-accent rounded-full font-[Manrope] text-primary font-bold text-[9px] sm:text-[10px]">
                {category}
              </span>
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3 text-foreground/60 dark:text-muted-foreground" />
                <span className="font-[Manrope] text-foreground/60 dark:text-muted-foreground font-medium text-[10px] sm:text-xs">
                  {timeAgo}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Title */}
        <h3 className="font-[Manrope] text-foreground mb-2 font-extrabold text-base sm:text-lg leading-snug">
          {title}
        </h3>

        {/* Excerpt */}
        <p className="font-[Manrope] text-foreground/70 dark:text-muted-foreground mb-3 line-clamp-2 font-medium text-sm sm:text-sm leading-relaxed">
          {excerpt}
        </p>

        {/* Stats */}
        <div className="flex items-center gap-4 pt-3 border-t border-border">
          <button
            onClick={handleLike}
            className="flex items-center gap-1.5 hover:opacity-70 transition-opacity"
          >
            <ThumbsUp className={`w-4 h-4 ${isLiked ? 'text-primary fill-primary' : 'text-foreground/60 dark:text-muted-foreground'}`} strokeWidth={2.5} />
            <span className="font-[Manrope] text-foreground/60 dark:text-muted-foreground font-bold text-xs sm:text-xs">
              {likeCount}
            </span>
          </button>
          <div className="flex items-center gap-1.5">
            <MessageCircle className="w-4 h-4 text-foreground/60 dark:text-muted-foreground" strokeWidth={2.5} />
            <span className="font-[Manrope] text-foreground/60 dark:text-muted-foreground font-bold text-xs sm:text-xs">
              {comments}
            </span>
          </div>
          <div className="flex items-center gap-1.5 ml-auto">
            <Eye className="w-4 h-4 text-foreground/60 dark:text-muted-foreground" strokeWidth={2.5} />
            <span className="font-[Manrope] text-foreground/60 dark:text-muted-foreground font-bold text-xs sm:text-xs">
              {views}
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

