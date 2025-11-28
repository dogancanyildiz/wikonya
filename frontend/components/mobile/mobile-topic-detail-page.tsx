"use client"

import { MobileBottomNav } from "./mobile-bottom-nav"
import { ArrowLeft, Bookmark, Share2, Calendar, Eye, MessageCircle, ArrowUp, ArrowDown, Reply } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"

interface MobileTopicDetailPageProps {
  onBack?: () => void
  topicId?: string
}

export function MobileTopicDetailPage({ onBack }: MobileTopicDetailPageProps) {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("home")
  const [isBookmarked, setIsBookmarked] = useState(false)

  const handleBack = () => {
    if (onBack) {
      onBack()
    } else {
      router.back()
    }
  }

  const comments = [
    {
      id: 1,
      author: "Ayşe Yılmaz",
      initials: "AY",
      time: "2 sa",
      content: "Bu notlar gerçekten çok işime yaradı! Özellikle anayasa hukuku kısmı çok detaylı.",
      upvotes: 24,
      isUpvoted: false,
    },
    {
      id: 2,
      author: "Mehmet Demir",
      initials: "MD",
      time: "5 sa",
      content: "Notlar iyi hazırlanmış ama bazı konularda daha fazla örnek olabilirdi.",
      upvotes: 18,
      isUpvoted: true,
    },
    {
      id: 3,
      author: "Zeynep Kaya",
      initials: "ZK",
      time: "1 gün",
      content: "Final öncesi son gün bu notlara çalıştım ve çok yardımcı oldu. Teşekkürler!",
      upvotes: 42,
      isUpvoted: false,
    },
  ]

  const [commentVotes, setCommentVotes] = useState<Record<number, { upvoted: boolean; count: number }>>(
    comments.reduce((acc, comment) => {
      acc[comment.id] = { upvoted: comment.isUpvoted, count: comment.upvotes }
      return acc
    }, {} as Record<number, { upvoted: boolean; count: number }>)
  )

  const handleVote = (commentId: number) => {
    setCommentVotes(prev => {
      const current = prev[commentId]
      if (current.upvoted) {
        return { ...prev, [commentId]: { upvoted: false, count: current.count - 1 } }
      } else {
        return { ...prev, [commentId]: { upvoted: true, count: current.count + 1 } }
      }
    })
  }

  return (
    <div className="min-h-screen bg-accent dark:bg-background pb-20 sm:pb-24">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-card border-b border-border">
        <div className="flex items-center gap-3 h-14 px-4">
          <button onClick={handleBack} className="p-1">
            <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6 text-foreground" strokeWidth={2.5} />
          </button>
          <span className="font-[Manrope] text-foreground flex-1 truncate font-bold text-sm sm:text-base">
            Konu Detayı
          </span>
          <button 
            onClick={() => setIsBookmarked(!isBookmarked)}
            className="p-1"
          >
            <Bookmark 
              className={`w-4 h-4 sm:w-5 sm:h-5 ${isBookmarked ? 'fill-primary text-primary' : 'text-foreground'}`} 
              strokeWidth={2.5} 
            />
          </button>
          <button className="p-1">
            <Share2 className="w-4 h-4 sm:w-5 sm:h-5 text-foreground" strokeWidth={2.5} />
          </button>
        </div>
      </div>

      {/* Topic Header */}
      <Card className="bg-card m-3 sm:m-4 mb-3 border border-border">
        <CardContent className="p-4">
          <h1 className="font-[Manrope] text-foreground mb-3 font-extrabold text-xl sm:text-2xl leading-snug">
            Selçuk Hukuk Final Notları
          </h1>

          {/* Meta */}
          <div className="flex items-center gap-3 sm:gap-4 mb-3 text-foreground/60 dark:text-muted-foreground flex-wrap">
            <div className="flex items-center gap-1">
              <Eye className="w-3 h-3 sm:w-4 sm:h-4" strokeWidth={2.5} />
              <span className="font-[Manrope] font-medium text-[10px] sm:text-xs">
                3.2k
              </span>
            </div>
            <div className="flex items-center gap-1">
              <MessageCircle className="w-3 h-3 sm:w-4 sm:h-4" strokeWidth={2.5} />
              <span className="font-[Manrope] font-medium text-[10px] sm:text-xs">
                48
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3 sm:w-4 sm:h-4" strokeWidth={2.5} />
              <span className="font-[Manrope] font-medium text-[10px] sm:text-xs">
                25 Kas 2024
              </span>
            </div>
          </div>

          {/* Tags */}
          <div className="flex items-center gap-2 mb-4 flex-wrap">
            {["Ders Notu", "Hukuk", "Final"].map((tag) => (
              <span
                key={tag}
                className="px-2 sm:px-3 py-1 bg-card border-2 border-primary rounded-full font-[Manrope] text-primary font-bold text-[10px] sm:text-[11px]"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Reliability Score */}
          <div className="bg-gradient-to-br from-primary/10 to-primary/5 dark:from-primary/20 dark:to-primary/10 rounded-2xl p-3 sm:p-4 border-2 border-primary">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-[Manrope] text-foreground/60 dark:text-muted-foreground mb-1 font-bold text-[10px] sm:text-[11px]">
                  GÜVENİLİRLİK SKORU
                </p>
                <p className="font-[Manrope] text-primary font-extrabold text-2xl sm:text-3xl lg:text-[36px]">
                  98%
                </p>
              </div>
              <div className="text-right">
                <p className="font-[Manrope] text-primary mb-1 font-bold text-lg sm:text-xl">
                  4.8/5
                </p>
                <p className="font-[Manrope] text-foreground/60 dark:text-muted-foreground font-medium text-[10px] sm:text-[11px]">
                  Ortalama Puan
                </p>
              </div>
            </div>
          </div>

          {/* Content Preview */}
          <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-border">
            <h3 className="font-[Manrope] text-foreground mb-2 font-bold text-sm sm:text-base">
              Özet Bilgi
            </h3>
            <p className="font-[Manrope] text-foreground leading-relaxed font-medium text-xs sm:text-sm">
              Selçuk Üniversitesi Hukuk Fakültesi final sınavlarına hazırlık için derlenmiş kapsamlı ders notları.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Comments Section */}
      <div className="px-3 sm:px-4">
        <h3 className="font-[Manrope] text-foreground mb-3 font-bold text-base sm:text-lg">
          Yorumlar (48)
        </h3>

        <div className="space-y-3">
          {comments.map((comment) => {
            const voteState = commentVotes[comment.id] || { upvoted: false, count: comment.upvotes }
            return (
              <Card
                key={comment.id}
                className="bg-card rounded-xl shadow-md dark:shadow-lg border border-border"
              >
                <CardContent className="p-4">
                  <div className="flex gap-3">
                    {/* Vote Section */}
                    <div className="flex flex-col items-center gap-1">
                      <button
                        onClick={() => handleVote(comment.id)}
                        className={`p-1.5 rounded-lg transition-colors ${
                          voteState.upvoted ? 'bg-primary text-white' : 'bg-accent text-foreground'
                        }`}
                      >
                        <ArrowUp
                          className="w-3.5 h-3.5 sm:w-4 sm:h-4"
                          strokeWidth={3}
                          fill={voteState.upvoted ? 'white' : 'none'}
                        />
                      </button>
                      <span className="font-[Manrope] text-foreground font-bold text-xs sm:text-sm">
                        {voteState.count}
                      </span>
                      <button className="p-1.5 rounded-lg bg-accent text-foreground">
                        <ArrowDown className="w-3.5 h-3.5 sm:w-4 sm:h-4" strokeWidth={3} />
                      </button>
                    </div>

                    {/* Comment Content */}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Avatar className="w-7 h-7 sm:w-8 sm:h-8 border-2 border-border">
                          <AvatarFallback className="bg-primary text-white font-[Manrope] font-bold text-[10px] sm:text-xs">
                            {comment.initials}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-[Manrope] text-foreground font-bold text-xs sm:text-sm">
                            {comment.author}
                          </p>
                          <p className="font-[Manrope] text-foreground/60 dark:text-muted-foreground font-medium text-[10px] sm:text-xs">
                            {comment.time}
                          </p>
                        </div>
                      </div>
                      <p className="font-[Manrope] text-foreground mb-2 font-medium text-xs sm:text-sm leading-relaxed">
                        {comment.content}
                      </p>
                      <button className="flex items-center gap-1 text-primary hover:opacity-70 transition-opacity">
                        <Reply className="w-3 h-3 sm:w-3.5 sm:h-3.5" strokeWidth={2.5} />
                        <span className="font-[Manrope] font-bold text-[10px] sm:text-xs">
                          Yanıtla
                        </span>
                      </button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

      <MobileBottomNav activeTab={activeTab} onNavigate={setActiveTab} />
    </div>
  )
}

