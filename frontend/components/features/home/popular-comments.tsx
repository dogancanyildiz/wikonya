"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ThumbsUp, MessageCircle, Lightbulb } from "lucide-react"
import Link from "next/link"
import { useApp } from "@/contexts/app-context"

interface PopularComment {
  id: number
  author: {
    name: string
    initials: string
  }
  content: string
  topicTitle: string
  topicId: number
  upvotes: number
  logicalVotes: number
  comments: number
  timeAgo: string
  isLiked?: boolean
  isMakesSense?: boolean
}

interface PopularCommentsProps {
  comments?: PopularComment[]
}

export function PopularComments({ comments }: PopularCommentsProps) {
  const { state } = useApp()
  const [localComments, setLocalComments] = useState<PopularComment[]>(comments || [
    {
      id: 1,
      author: { name: "Ayşe Yılmaz", initials: "AY" },
      content: "Bu notlar gerçekten çok işime yaradı! Özellikle anayasa hukuku kısmı çok detaylı ve anlaşılır şekilde hazırlanmış.",
      topicTitle: "Selçuk Hukuk Final Notları",
      topicId: 1,
      upvotes: 42,
      logicalVotes: 35,
      comments: 8,
      timeAgo: "2 saat önce",
      isLiked: false,
      isMakesSense: false,
    },
    {
      id: 2,
      author: { name: "Mehmet Demir", initials: "MD" },
      content: "Notlar iyi hazırlanmış ama bazı konularda daha fazla örnek olabilirdi. Yine de genel olarak faydalı bir kaynak.",
      topicTitle: "Selçuk Hukuk Final Notları",
      topicId: 1,
      upvotes: 28,
      logicalVotes: 20,
      comments: 5,
      timeAgo: "5 saat önce",
      isLiked: false,
      isMakesSense: false,
    },
    {
      id: 3,
      author: { name: "Zeynep Kaya", initials: "ZK" },
      content: "Final öncesi son gün bu notlara çalıştım ve çok yardımcı oldu. Özellikle özet tablolar sayesinde konuları daha iyi kavradım.",
      topicTitle: "Veri Yapıları Final Hazırlık",
      topicId: 2,
      upvotes: 35,
      logicalVotes: 28,
      comments: 12,
      timeAgo: "1 gün önce",
      isLiked: false,
      isMakesSense: false,
    },
  ])
  const [animations, setAnimations] = useState<{ [key: string]: boolean }>({})

  const handleLike = (commentId: number, e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (!state.user) return

    const comment = localComments.find(c => c.id === commentId)
    if (!comment) return

    const isLiked = comment.isLiked || false
    const newIsLiked = !isLiked

    if (newIsLiked) {
      const animationKey = `like-${commentId}`
      setAnimations({ ...animations, [animationKey]: true })
      setTimeout(() => {
        setAnimations({ ...animations, [animationKey]: false })
      }, 600)
    }

    setLocalComments(localComments.map(c => 
      c.id === commentId 
        ? { ...c, upvotes: newIsLiked ? c.upvotes + 1 : c.upvotes - 1, isLiked: newIsLiked }
        : c
    ))
  }

  const handleMakesSense = (commentId: number, e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (!state.user) return

    const comment = localComments.find(c => c.id === commentId)
    if (!comment) return

    const isMakesSense = comment.isMakesSense || false
    const newIsMakesSense = !isMakesSense

    if (newIsMakesSense) {
      const animationKey = `logical-${commentId}`
      setAnimations({ ...animations, [animationKey]: true })
      setTimeout(() => {
        setAnimations({ ...animations, [animationKey]: false })
      }, 600)
    }

    setLocalComments(localComments.map(c => 
      c.id === commentId 
        ? { ...c, logicalVotes: newIsMakesSense ? c.logicalVotes + 1 : c.logicalVotes - 1, isMakesSense: newIsMakesSense }
        : c
    ))
  }

  return (
    <Card className="bg-card rounded-xl shadow-md dark:shadow-lg border border-border">
      <CardContent className="p-4 sm:p-6">
        <div className="flex items-center gap-2 mb-4">
          <MessageCircle className="w-5 h-5 text-primary" />
          <h2 className="font-[Manrope] text-foreground font-bold text-lg sm:text-xl">
            Popüler Yorumlar
          </h2>
        </div>
        <div className="space-y-4">
          {localComments.map((comment) => (
            <Link
              key={comment.id}
              href={`/topic/${comment.topicId}#comment-${comment.id}`}
              className="block p-3 sm:p-4 bg-accent rounded-xl hover:shadow-md transition-all group"
            >
              <div className="flex items-start gap-3 mb-2">
                <Avatar className="w-8 h-8 sm:w-10 sm:h-10 flex-shrink-0">
                  <AvatarFallback className="bg-primary text-white font-[Manrope] font-bold text-xs">
                    {comment.author.initials}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-[Manrope] font-bold text-sm text-foreground">
                      {comment.author.name}
                    </span>
                    <span className="font-[Manrope] text-xs text-foreground/60 dark:text-muted-foreground">
                      {comment.timeAgo}
                    </span>
                  </div>
                  <p className="font-[Manrope] text-sm text-foreground line-clamp-2 mb-2">
                    {comment.content}
                  </p>
                  <p className="font-[Manrope] text-xs text-primary font-semibold mb-2">
                    → {comment.topicTitle}
                  </p>
                  <div className="flex items-center gap-3 pt-2 border-t border-border">
                    <button
                      onClick={(e) => handleLike(comment.id, e)}
                      className={`relative flex items-center gap-2 px-3 py-2 bg-accent rounded-lg hover:bg-primary/10 dark:hover:bg-primary/20 transition-colors ${
                        comment.isLiked ? 'bg-primary/10 dark:bg-primary/20' : ''
                      }`}
                    >
                      <ThumbsUp className={`w-4 h-4 text-primary ${comment.isLiked ? 'fill-primary' : ''}`} />
                      <span className="font-[Manrope] font-bold text-sm text-foreground">
                        {comment.upvotes}
                      </span>
                      {animations[`like-${comment.id}`] && (
                        <span className="absolute -top-1 -right-1 bg-primary text-white text-xs font-bold px-1.5 py-0.5 rounded-full animate-bounce">
                          +1
                        </span>
                      )}
                    </button>
                    <button
                      onClick={(e) => handleMakesSense(comment.id, e)}
                      className={`relative flex items-center gap-2 px-3 py-2 bg-accent rounded-lg hover:bg-primary/10 dark:hover:bg-primary/20 transition-colors ${
                        comment.isMakesSense ? 'bg-primary/10 dark:bg-primary/20' : ''
                      }`}
                    >
                      <Lightbulb className={`w-4 h-4 text-primary ${comment.isMakesSense ? 'fill-primary' : ''}`} />
                      <span className="font-[Manrope] font-bold text-sm text-foreground">
                        {comment.logicalVotes}
                      </span>
                      <span className="font-[Manrope] font-medium text-xs text-foreground/60 dark:text-muted-foreground hidden sm:inline">
                        Mantıklı
                      </span>
                      {animations[`logical-${comment.id}`] && (
                        <span className="absolute -top-1 -right-1 bg-primary text-white text-xs font-bold px-1.5 py-0.5 rounded-full animate-bounce">
                          +1
                        </span>
                      )}
                    </button>
                    <div className="flex items-center gap-2 px-3 py-2 bg-accent rounded-lg">
                      <MessageCircle className="w-4 h-4 text-primary" />
                      <span className="font-[Manrope] font-bold text-sm text-foreground">
                        {comment.comments}
                        </span>
                      </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

