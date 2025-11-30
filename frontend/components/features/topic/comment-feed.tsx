"use client"

import { ThumbsUp, MessageCircle, Flag, Lightbulb, AlertCircle } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useCoinReward } from "@/lib/utils/hooks/use-coin-reward"
import { useApp } from "@/contexts/app-context"
import { canPerformAction, performAction, getRemainingActions } from "@/lib/gamification/rate-limiter"
import { toast } from "sonner"
import { CommentReplyDialog } from "./comment-reply-dialog"
import { incrementCommentCount } from "@/lib/utils/user-stats"

import { Comment as CommentType } from "@/lib/types"

interface Comment extends CommentType {
  logicalVotes?: number
  isLogical?: boolean
  parentId?: number
  repliesList?: Comment[]
}

interface CommentFeedProps {
  topicId: number
}

export function CommentFeed({ topicId }: CommentFeedProps) {
  const { state } = useApp()
  const { rewardCoins } = useCoinReward()
  const [newComment, setNewComment] = useState("")
  const [commentError, setCommentError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [sortOrder] = useState<"newest" | "popular" | "logical">("newest")
  const [replyingTo, setReplyingTo] = useState<{ id: number; author: string } | null>(null)
  const [animations, setAnimations] = useState<{ [key: string]: boolean }>({})
  const [comments, setComments] = useState<Comment[]>([
    {
      id: 1,
      author: "Ayşe Yılmaz",
      authorInitials: "AY",
      timeAgo: "2 saat önce",
      content: "Bu notlar gerçekten çok işime yaradı! Özellikle anayasa hukuku kısmı çok detaylı ve anlaşılır şekilde hazırlanmış. Final sınavında bu notlar sayesinde başarılı oldum. Herkese tavsiye ederim.",
      upvotes: 24,
      downvotes: 2,
      logicalVotes: 18,
      replies: 5,
      isUpvoted: false,
      isDownvoted: false,
      isLogical: false,
    },
    {
      id: 2,
      author: "Mehmet Demir",
      authorInitials: "MD",
      timeAgo: "5 saat önce",
      content: "Notlar iyi hazırlanmış ama bazı konularda daha fazla örnek olabilirdi. Özellikle medeni hukuk bölümünde vaka analizleri eksik. Yine de genel olarak faydalı bir kaynak.",
      upvotes: 18,
      downvotes: 4,
      logicalVotes: 12,
      replies: 3,
      isUpvoted: true,
      isDownvoted: false,
      isLogical: true,
    },
    {
      id: 3,
      author: "Zeynep Kaya",
      authorInitials: "ZK",
      timeAgo: "1 gün önce",
      content: "Final öncesi son gün bu notlara çalıştım ve çok yardımcı oldu. Özellikle özet tablolar ve şemalar sayesinde konuları daha iyi kavradım. Teşekkürler!",
      upvotes: 42,
      downvotes: 1,
      logicalVotes: 35,
      replies: 8,
      isUpvoted: false,
      isDownvoted: false,
      isLogical: false,
    },
    {
      id: 4,
      author: "Can Özkan",
      authorInitials: "CÖ",
      timeAgo: "2 gün önce",
      content: "Notların güncelliğine dikkat etmek gerekiyor. 2023 yılında yapılan bazı yasal değişiklikler burada yer almıyor. Bunu göz önünde bulundurarak kullanın.",
      upvotes: 15,
      downvotes: 3,
      logicalVotes: 8,
      replies: 2,
      isUpvoted: false,
      isDownvoted: false,
      isLogical: false,
    },
  ])

  const handleVote = (commentId: number, voteType: 'up' | 'down') => {
    if (!state.user) {
      setCommentError("Oy vermek için giriş yapmalısınız.")
      return
    }
    
    setComments(comments.map(comment => {
      if (comment.id === commentId) {
        if (voteType === 'up') {
          if (comment.isUpvoted) {
            // Beğeniyi geri al
            return { ...comment, upvotes: comment.upvotes - 1, isUpvoted: false }
          } else {
            // Beğeni ver - animasyon göster
            const animationKey = `like-${commentId}`
            setAnimations({ ...animations, [animationKey]: true })
            setTimeout(() => {
              setAnimations({ ...animations, [animationKey]: false })
            }, 600)
            // Beğeni ver
            // Not: Oy veren kullanıcı coin kazanmaz (sadece beğeniyor)
            // Yorum sahibi beğeni aldığında +1 coin kazanır (backend'de yapılacak)
            // Şimdilik sadece oy sayısını güncelliyoruz
            return {
              ...comment,
              upvotes: comment.upvotes + 1,
              downvotes: comment.isDownvoted ? comment.downvotes - 1 : comment.downvotes,
              isUpvoted: true,
              isDownvoted: false,
            }
          }
        } else {
          if (comment.isDownvoted) {
            // Beğenmemeyi geri al
            return { ...comment, downvotes: comment.downvotes - 1, isDownvoted: false }
          } else {
            // Beğenme ver
            // Not: Oy veren kullanıcı coin kaybetmez (sadece beğenmiyor)
            return {
              ...comment,
              downvotes: comment.downvotes + 1,
              upvotes: comment.isUpvoted ? comment.upvotes - 1 : comment.upvotes,
              isDownvoted: true,
              isUpvoted: false,
            }
          }
        }
      }
      return comment
    }))
  }

  const handleReply = (replyContent: string, parentCommentId: number) => {
    // Gerçek uygulamada API çağrısı yapılacak
    const newReply: Comment = {
      id: comments.length + 1,
      author: state.user?.name || "Anonim",
      authorInitials: state.user?.initials || "AN",
      timeAgo: "Şimdi",
      content: replyContent,
      upvotes: 0,
      downvotes: 0,
      logicalVotes: 0,
      replies: 0,
      parentId: parentCommentId,
      isUpvoted: false,
      isDownvoted: false,
      isLogical: false,
    }

    const animationKey = `comment-${parentCommentId}`
    setAnimations({ ...animations, [animationKey]: true })
    setTimeout(() => {
      setAnimations({ ...animations, [animationKey]: false })
    }, 600)

    // Parent comment'in replies sayısını artır
    setComments(comments.map(c => 
      c.id === parentCommentId 
        ? { ...c, replies: c.replies + 1, repliesList: [...(c.repliesList || []), newReply] }
        : c
    ))
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleFlagComment = async (_commentId: number) => {
    if (!state.user) {
      setCommentError("Yorum bildirmek için giriş yapmalısınız.")
      return
    }

    try {
      // Simüle edilmiş API çağrısı - gerçek uygulamada moderation API'sine gönderilecek
      await new Promise((resolve) => setTimeout(resolve, 500))
      
      // Başarı mesajı gösterilebilir
      alert("Yorum bildirildi. Moderatörler tarafından incelenecektir.")
    } catch {
      setCommentError("Yorum bildirilirken bir hata oluştu")
    }
  }

  const handleLogicalVote = (commentId: number) => {
    if (!state.user) {
      setCommentError("Oy vermek için giriş yapmalısınız.")
      return
    }

    setComments(comments.map(comment => {
      if (comment.id === commentId) {
        const currentVotes = comment.logicalVotes || 0
        if (comment.isLogical) {
          return { ...comment, logicalVotes: currentVotes - 1, isLogical: false }
        } else {
          // Coin kazanma (sadece ilk kez işaretlendiğinde)
          rewardCoins("comment_logical", { commentId })
          // Animasyon göster
          const animationKey = `logical-${commentId}`
          setAnimations({ ...animations, [animationKey]: true })
          setTimeout(() => {
            setAnimations({ ...animations, [animationKey]: false })
          }, 600)
          return { ...comment, logicalVotes: currentVotes + 1, isLogical: true }
        }
      }
      return comment
    }))
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4 sm:mb-6">
        <h2 className="font-[Manrope] text-foreground font-extrabold text-2xl sm:text-3xl lg:text-[32px]">
          Kullanıcı Görüşleri
        </h2>
        <div className="flex items-center gap-2">
          <Button className="bg-primary hover:bg-primary/90 font-[Manrope] font-bold text-xs sm:text-sm">
            En Yeni
          </Button>
          <Button 
            variant="outline" 
            className="border-2 border-primary text-primary hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white font-[Manrope] font-bold text-xs sm:text-sm"
          >
            En Popüler
          </Button>
        </div>
      </div>

      <div className="space-y-3 sm:space-y-4">
        {[...comments]
          .sort((a, b) => {
            if (sortOrder === "newest") {
              // En yeni - timeAgo'ya göre sıralama (mock için id kullanıyoruz)
              return b.id - a.id
            } else if (sortOrder === "popular") {
              // En popüler - upvotes - downvotes'e göre
              const scoreA = a.upvotes - a.downvotes
              const scoreB = b.upvotes - b.downvotes
              return scoreB - scoreA
            } else if (sortOrder === "logical") {
              // En mantıklı - logicalVotes'e göre
              const logicalA = a.logicalVotes || 0
              const logicalB = b.logicalVotes || 0
              return logicalB - logicalA
            }
            return 0
          })
          .map((comment) => (
          <Card
            key={comment.id}
            className="bg-card rounded-xl shadow-md dark:shadow-lg hover:shadow-lg dark:hover:shadow-xl transition-shadow duration-300 border border-border"
          >
            <CardContent className="p-4 sm:p-6">
              <div className="flex gap-3 sm:gap-4">

                {/* Comment Content */}
                <div className="flex-1">
                  <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                    <Avatar className="w-8 h-8 sm:w-10 sm:h-10 border-2 border-border">
                      <AvatarFallback className="bg-primary text-white font-[Manrope] font-bold text-[10px] sm:text-xs">
                        {comment.authorInitials}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-[Manrope] text-foreground font-bold text-sm sm:text-base">
                        {comment.author}
                      </div>
                      <div className="font-[Manrope] text-foreground/60 dark:text-muted-foreground font-medium text-xs sm:text-sm">
                        {comment.timeAgo}
                      </div>
                    </div>
                  </div>

                  <p className="font-[Manrope] text-foreground mb-3 sm:mb-4 font-medium text-sm sm:text-base leading-relaxed">
                    {comment.content}
                  </p>

                  {/* Actions */}
                  <div className="flex items-center gap-3 sm:gap-4 flex-wrap pt-3 border-t border-border">
                    <button 
                      onClick={() => handleVote(comment.id, 'up')}
                      className={`relative flex items-center gap-2 px-3 py-2 bg-accent rounded-lg hover:bg-primary/10 dark:hover:bg-primary/20 transition-colors ${
                        comment.isUpvoted ? 'bg-primary/10 dark:bg-primary/20' : ''
                      }`}
                      aria-label={comment.isUpvoted ? "Beğenmeyi geri al" : "Beğen"}
                      aria-pressed={comment.isUpvoted}
                    >
                      <ThumbsUp className={`w-4 h-4 text-primary ${comment.isUpvoted ? 'fill-primary' : ''}`} />
                      <span className="font-[Manrope] font-bold text-sm text-foreground">
                        {comment.upvotes - comment.downvotes}
                      </span>
                      {animations[`like-${comment.id}`] && (
                        <span className="absolute -top-1 -right-1 bg-primary text-white text-xs font-bold px-1.5 py-0.5 rounded-full animate-bounce">
                          +1
                        </span>
                      )}
                    </button>
                    <button 
                      onClick={() => handleLogicalVote(comment.id)}
                      className={`relative flex items-center gap-2 px-3 py-2 bg-accent rounded-lg hover:bg-primary/10 dark:hover:bg-primary/20 transition-colors ${
                        comment.isLogical ? 'bg-primary/10 dark:bg-primary/20' : ''
                      }`}
                      aria-label={comment.isLogical ? "Mantıklı yorum işaretini kaldır" : "Mantıklı yorum olarak işaretle"}
                      aria-pressed={comment.isLogical}
                    >
                      <Lightbulb className={`w-4 h-4 text-primary ${comment.isLogical ? 'fill-primary' : ''}`} />
                      <span className="font-[Manrope] font-bold text-sm text-foreground">
                        {comment.logicalVotes || 0}
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
                    <button 
                      onClick={() => setReplyingTo({ id: comment.id, author: comment.author })}
                      className="relative flex items-center gap-2 px-3 py-2 bg-accent rounded-lg hover:bg-primary/10 dark:hover:bg-primary/20 transition-colors"
                      aria-label={`${comment.replies} yorum`}
                    >
                      <MessageCircle className="w-4 h-4 text-primary" />
                      <span className="font-[Manrope] font-bold text-sm text-foreground">
                        {comment.replies}
                      </span>
                      {animations[`comment-${comment.id}`] && (
                        <span className="absolute -top-1 -right-1 bg-primary text-white text-xs font-bold px-1.5 py-0.5 rounded-full animate-bounce">
                          +1
                        </span>
                      )}
                    </button>
                    <button 
                      onClick={() => handleFlagComment(comment.id)}
                      className="flex items-center gap-2 text-foreground/60 dark:text-muted-foreground hover:text-primary transition-colors ml-auto"
                      aria-label="Yorumu bildir"
                    >
                      <Flag className="w-3 h-3 sm:w-4 sm:h-4" aria-hidden="true" />
                      <span className="font-[Manrope] font-semibold text-xs sm:text-sm">
                        Bildir
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Reply Dialog */}
      {replyingTo && (
        <CommentReplyDialog
          open={!!replyingTo}
          onOpenChange={(open) => !open && setReplyingTo(null)}
          parentCommentId={replyingTo.id}
          parentAuthor={replyingTo.author}
          onReply={handleReply}
        />
      )}

      {/* Add Comment Section */}
      <Card className="mt-4 sm:mt-6 bg-card rounded-xl shadow-md dark:shadow-lg border border-border">
        <CardHeader>
          <CardTitle className="font-[Manrope] text-foreground font-bold text-lg sm:text-xl">
            Görüş Bildir
          </CardTitle>
        </CardHeader>
        <CardContent>
          {commentError && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription className="font-[Manrope]">{commentError}</AlertDescription>
            </Alert>
          )}

          <Textarea
            value={newComment}
            onChange={(e) => {
              setNewComment(e.target.value)
              setCommentError(null)
            }}
            placeholder="Deneyimlerinizi ve düşüncelerinizi paylaşın..."
            className="w-full p-3 sm:p-4 bg-accent rounded-xl font-[Manrope] text-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary font-medium min-h-[100px] sm:min-h-[120px] text-sm sm:text-base"
            disabled={isSubmitting}
            aria-label="Yorum metni"
          />

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0 mt-3 sm:mt-4">
            <div className="flex flex-col gap-1">
              <span className="font-[Manrope] text-foreground/60 dark:text-muted-foreground font-medium text-xs sm:text-sm">
                Lütfen yapıcı ve saygılı yorumlar yazın
              </span>
              {state.user && (() => {
                const remaining = getRemainingActions(state.user, "comment")
                if (remaining.limit !== null) {
                  const isLow = remaining.remaining <= 2
                  return (
                    <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg ${
                      isLow 
                        ? 'bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20' 
                        : 'bg-accent'
                    }`}>
                      <span className={`font-[Manrope] font-semibold text-xs ${
                        isLow ? 'text-amber-700 dark:text-amber-400' : 'text-muted-foreground'
                      }`}>
                        Kalan yorum hakkı: <span className="font-bold">{remaining.remaining}</span> / {remaining.limit} ({remaining.timeWindow})
                      </span>
                    </div>
                  )
                }
                return null
              })()}
            </div>
            <Button
              onClick={async () => {
                if (!newComment.trim()) {
                  setCommentError("Yorum boş olamaz")
                  return
                }

                // Rate limit kontrolü
                const check = canPerformAction(state.user, "comment")
                if (!check.allowed) {
                  setCommentError(check.reason || "Yorum gönderilemedi")
                  // Toast notification ile görsel uyarı
                  toast.error("⚠️ Rate Limit Aşıldı", {
                    description: check.reason || "Yorum gönderilemedi",
                    duration: 5000,
                  })
                  return
                }

                setIsSubmitting(true)
                setCommentError(null)

                try {
                  // Rate limit kaydı
                  const result = performAction(state.user, "comment")
                  if (!result.success) {
                    setCommentError(result.reason || "Yorum gönderilemedi")
                    toast.error("⚠️ Rate Limit Aşıldı", {
                      description: result.reason || "Yorum gönderilemedi",
                      duration: 5000,
                    })
                    setIsSubmitting(false)
                    return
                  }

                  // Simüle edilmiş API çağrısı
                  await new Promise((resolve) => setTimeout(resolve, 500))

                  // Coin kazanma
                  rewardCoins("comment", { content: newComment })

                  // User stats güncelle
                  incrementCommentCount(state.user)

                  // Yeni yorum ekle
                  const newCommentObj: Comment = {
                    id: comments.length + 1,
                    author: state.user?.name || "Anonim",
                    authorInitials: state.user?.initials || "AN",
                    timeAgo: "Şimdi",
                    content: newComment,
                    upvotes: 0,
                    downvotes: 0,
                    logicalVotes: 0,
                    replies: 0,
                    isUpvoted: false,
                    isDownvoted: false,
                    isLogical: false,
                  }

                  setComments([newCommentObj, ...comments])
                  setNewComment("")
                } catch (err) {
                  setCommentError(err instanceof Error ? err.message : "Yorum gönderilirken bir hata oluştu")
                } finally {
                  setIsSubmitting(false)
                }
              }}
              disabled={isSubmitting || !newComment.trim() || !state.user}
              className="bg-primary hover:bg-primary/90 font-[Manrope] px-6 sm:px-8 font-bold text-xs sm:text-sm disabled:opacity-50"
              aria-label="Yorumu gönder"
            >
              {isSubmitting ? "Gönderiliyor..." : "Gönder"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

