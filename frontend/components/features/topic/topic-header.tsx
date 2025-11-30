"use client"

import { useState, useEffect } from "react"
import { Calendar, Eye, MessageCircle, Share2, Bookmark, Edit2, ThumbsUp, ThumbsDown, History } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useApp } from "@/contexts/app-context"
import { usePermissions } from "@/lib/utils/hooks/use-permissions"
import { useNotifications } from "@/lib/utils/hooks/use-notifications"
import { WikiEditDialog } from "./wiki-edit-dialog"
import { WikiHistory } from "./wiki-history"
import { WikiContent, WikiRevision } from "@/lib/types"
import { renderMarkdown } from "@/lib/utils/markdown"

interface TopicHeaderProps {
  topicId: number
  wikiContent?: WikiContent | null
}

// Mock topics data - gerçek uygulamada API'den gelecek
const mockTopics: Array<{
  id: number
  title: string
  category: string
  views: number
  comments: number
  tags: string[]
  reliabilityScore: number
  createdAt: string
  updatedAt: string
  author: { id: number; name: string; initials: string; role: string }
}> = [
  {
    id: 1,
    title: "Selçuk Hukuk Final Notları",
    category: "Akademik",
    views: 3200,
    comments: 48,
    tags: ["Ders Notu", "Hukuk Fakültesi", "Final Hazırlık"],
    reliabilityScore: 98,
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    author: { id: 1, name: "Admin", initials: "AD", role: "konya_bilgesi" },
  },
  {
    id: 2,
    title: "Konya'da Öğrenci Dostu Restoranlar",
    category: "Sosyal",
    views: 2800,
    comments: 35,
    tags: ["Restoran", "Yemek", "Bütçe Dostu"],
    reliabilityScore: 92,
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    author: { id: 2, name: "User", initials: "US", role: "gezgin" },
  },
  {
    id: 3,
    title: "Bosna Hersek Mahallesi Ev Kiralama Rehberi",
    category: "Barınma",
    views: 2100,
    comments: 42,
    tags: ["Ev", "Kiralama", "Mahalle"],
    reliabilityScore: 88,
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    author: { id: 3, name: "User2", initials: "U2", role: "seyyah" },
  },
  {
    id: 4,
    title: "Lineer Cebir Dersi İçin Kaynak Önerisi",
    category: "Akademik",
    views: 1500,
    comments: 28,
    tags: ["Matematik", "Ders", "Kaynak"],
    reliabilityScore: 85,
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    author: { id: 4, name: "Ahmet Yılmaz", initials: "AY", role: "yeni_gelen" },
  },
  {
    id: 5,
    title: "Kampüse Yakın Uygun Fiyatlı Yurt",
    category: "Barınma",
    views: 1800,
    comments: 32,
    tags: ["Yurt", "Barınma", "Kampüs"],
    reliabilityScore: 90,
    createdAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    author: { id: 5, name: "Zeynep Kaya", initials: "ZK", role: "gezgin" },
  },
]

export function TopicHeader({ topicId, wikiContent: initialWikiContent }: TopicHeaderProps) {
  const { state } = useApp()
  const { canEditWiki, canProposeWikiEdit } = usePermissions()
  const { notifyWikiReverted } = useNotifications()
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isHistoryOpen, setIsHistoryOpen] = useState(false)
  const [revisions, setRevisions] = useState<WikiRevision[]>([])

  // Get topic data by id
  const topic = mockTopics.find(t => t.id === topicId) || mockTopics[0]
  
  // Format date helper
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" })
  }

  // Load wiki history from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const historyKey = `wiki_history_${topicId}`
      const stored = localStorage.getItem(historyKey)
      if (stored) {
        try {
          const parsed = JSON.parse(stored)
          // eslint-disable-next-line react-hooks/set-state-in-effect
          setRevisions(parsed)
        } catch {
          // If parsing fails, use empty array
        }
      }
    }
  }, [topicId])
  
  const [wikiContent, setWikiContent] = useState<WikiContent | null>(
    initialWikiContent || {
      id: 1,
      topicId,
      content: topicId === 1 
        ? "Selçuk Üniversitesi Hukuk Fakültesi final sınavlarına hazırlık için derlenmiş kapsamlı ders notları. İçerik; anayasa hukuku, medeni hukuk, ceza hukuku ve ticaret hukuku gibi temel dersleri kapsamaktadır. Notlar, son 3 yılın sınav sorularına göre düzenlenmiş ve akademisyenlerin tavsiyeleri doğrultusunda hazırlanmıştır."
        : topicId === 2
        ? "Konya'da öğrenci bütçesine uygun, lezzetli ve kaliteli restoranlar listesi. Kampüse yakın lokasyonlar ve öğrenci indirimleri hakkında detaylı bilgiler."
        : topicId === 3
        ? "Bosna Hersek Mahallesi hakkında kapsamlı rehber. Ev kiralama süreçleri, mahalle özellikleri, ulaşım ve çevre hakkında detaylı bilgiler."
        : "Bu başlık hakkında detaylı bilgiler burada yer alacak.",
      version: 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      author: state.user || topic.author || { id: 1, name: "Admin", initials: "AD", role: "konya_bilgesi", totalCoins: 0, badges: [], xp: { current: 0, nextLevel: 500, progress: 0 }, joinedAt: new Date().toISOString() },
      usefulVotes: 45,
      notUsefulVotes: 2,
      isCurrent: true,
    }
  )
  const [userVote, setUserVote] = useState<"useful" | "not_useful" | null>(null)

  const canEdit = canEditWiki || canProposeWikiEdit

  const handleWikiSave = (newContent: string) => {
    if (wikiContent) {
      const updatedContent = {
        ...wikiContent,
        content: newContent,
        version: wikiContent.version + 1,
        updatedAt: new Date().toISOString(),
      }
      setWikiContent(updatedContent)
      
      // Update revisions list from localStorage
      if (typeof window !== "undefined") {
        const historyKey = `wiki_history_${topicId}`
        const stored = localStorage.getItem(historyKey)
        if (stored) {
          try {
            const parsed = JSON.parse(stored)
            setRevisions(parsed)
          } catch {
            // If parsing fails, keep current revisions
          }
        }
      }
    }
  }

  const handleVote = (voteType: "useful" | "not_useful") => {
    if (!state.user || !wikiContent) return
    
    if (userVote === voteType) {
      // Aynı oyu tekrar tıklarsa geri al
      setUserVote(null)
      // Oy geri alındığında wiki düzenleyen kullanıcıdan coin çıkarılmalı (backend'de yapılacak)
      // Şimdilik sadece UI güncelleniyor
    } else {
      setUserVote(voteType)
      
      // Oy veren kullanıcı coin kazanmaz (sadece oy veriyor)
      // Wiki düzenleyen kullanıcı coin kazanır/kaybeder
      const wikiAuthor = wikiContent.author
      const isVotingOwnWiki = wikiAuthor.id === state.user.id
      
      if (!isVotingOwnWiki) {
        // Wiki düzenleyen kullanıcıya coin ver/çıkar
        // Not: Gerçek uygulamada bu backend'de yapılmalı
        // Şimdilik frontend'de simüle ediyoruz
        if (voteType === "useful") {
          // Wiki düzenleyen kullanıcı yararlı oy aldı
          // Gerçek uygulamada backend'de wikiAuthor'a coin verilecek
          // Şimdilik sadece oy sayısını güncelliyoruz
          setWikiContent({
            ...wikiContent,
            usefulVotes: wikiContent.usefulVotes + 1,
          })
        } else {
          // Wiki düzenleyen kullanıcı yararsız oy aldı
          // Gerçek uygulamada backend'de wikiAuthor'dan coin çıkarılacak
          setWikiContent({
            ...wikiContent,
            notUsefulVotes: wikiContent.notUsefulVotes + 1,
          })
        }
      } else {
        // Kendi wiki'sine oy veriyor, sadece oy sayısını güncelle
        if (voteType === "useful") {
          setWikiContent({
            ...wikiContent,
            usefulVotes: wikiContent.usefulVotes + 1,
          })
        } else {
          setWikiContent({
            ...wikiContent,
            notUsefulVotes: wikiContent.notUsefulVotes + 1,
          })
        }
      }
    }
  }
  
  return (
    <Card className="bg-card rounded-xl shadow-md dark:shadow-lg border border-border">
      <CardContent className="p-6 sm:p-8">
        <div className="flex flex-col lg:flex-row items-start justify-between gap-6">
          <div className="flex-1">
            {/* Title */}
            <h1 className="font-[Manrope] text-foreground mb-4 sm:mb-6 font-extrabold text-3xl sm:text-4xl lg:text-[48px] leading-tight">
              {topic.title}
            </h1>
            
            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 mb-4 sm:mb-6">
              <div className="flex items-center gap-2 text-foreground/60 dark:text-muted-foreground">
                <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="font-[Manrope] font-medium text-xs sm:text-sm">
                  Son güncelleme: {formatDate(topic.updatedAt)}
                </span>
              </div>
              <div className="flex items-center gap-2 text-foreground/60 dark:text-muted-foreground">
                <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="font-[Manrope] font-medium text-xs sm:text-sm">
                  {topic.views >= 1000 ? `${(topic.views / 1000).toFixed(1)}k` : topic.views} görüntülenme
                </span>
              </div>
              <div className="flex items-center gap-2 text-foreground/60 dark:text-muted-foreground">
                <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="font-[Manrope] font-medium text-xs sm:text-sm">
                  {topic.comments} yorum
                </span>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              {topic.tags.map((tag) => (
                <div
                  key={tag}
                  className="px-3 sm:px-4 py-1.5 sm:py-2 bg-card border-2 border-primary rounded-full"
                >
                  <span className="font-[Manrope] text-primary font-bold text-xs sm:text-sm">
                    {tag}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Reliability Score */}
          <div className="flex flex-col items-center gap-3 sm:gap-4">
            <div className="relative w-32 h-32 sm:w-40 sm:h-40 flex items-center justify-center">
              {/* Circle Background */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/10 to-primary/5 dark:from-primary/20 dark:to-primary/10 border-4 border-primary"></div>
              
              {/* Score */}
              <div className="relative z-10 text-center">
                <div className="font-[Manrope] text-primary leading-none font-extrabold text-4xl sm:text-5xl lg:text-[60px]">
                  {topic.reliabilityScore}%
                </div>
                <div className="font-[Manrope] text-primary mt-1 font-bold text-xs sm:text-sm">
                  GÜVENİLİRLİK
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-accent dark:hover:bg-accent rounded-full"
              >
                <Bookmark className="w-4 h-4 sm:w-5 sm:h-5 text-foreground" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-accent dark:hover:bg-accent rounded-full"
              >
                <Share2 className="w-4 h-4 sm:w-5 sm:h-5 text-foreground" />
              </Button>
            </div>
          </div>
        </div>

        {/* Wiki Content Area */}
        <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t-2 border-[#f2f4f3] dark:border-border">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <h2 className="font-[Manrope] text-foreground font-bold text-xl sm:text-2xl lg:text-[24px]">
              Bilgi Alanı (Wiki)
            </h2>
            <div className="flex items-center gap-2">
              {canEdit && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsEditDialogOpen(true)}
                  className="font-[Manrope] font-bold text-xs sm:text-sm"
                >
                  <Edit2 className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5" />
                  {canEditWiki ? "Düzenle" : "Teklif Gönder"}
                </Button>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  // Mock revisions - gerçek uygulamada API'den gelecek
                  setRevisions([
                    {
                      id: 1,
                      wikiContentId: wikiContent?.id || 1,
                      content: wikiContent?.content || "",
                      version: wikiContent?.version || 1,
                      createdAt: wikiContent?.updatedAt || new Date().toISOString(),
                      author: wikiContent?.author || state.user || { id: 1, name: "Admin", initials: "AD", role: "konya_bilgesi", totalCoins: 0, badges: [], xp: { current: 0, nextLevel: 500, progress: 0 }, joinedAt: new Date().toISOString() },
                      changeSummary: "İlk sürüm",
                    },
                  ])
                  setIsHistoryOpen(true)
                }}
                className="font-[Manrope] font-bold text-xs sm:text-sm"
              >
                <History className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5" />
                Geçmiş
              </Button>
            </div>
          </div>
          
          <div className="bg-accent rounded-xl p-4 sm:p-6 mb-4">
            <div
              className="font-[Manrope] text-foreground leading-relaxed text-sm sm:text-base prose prose-sm max-w-none"
              dangerouslySetInnerHTML={{
                __html: renderMarkdown(wikiContent?.content || ""),
              }}
            />
          </div>

          {/* Wiki Voting */}
          {state.user && (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Button
                  variant={userVote === "useful" ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleVote("useful")}
                  className={`font-[Manrope] font-bold text-xs sm:text-sm ${
                    userVote === "useful" ? "bg-primary hover:bg-primary/90" : ""
                  }`}
                >
                  <ThumbsUp className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5" />
                  Yararlı ({wikiContent?.usefulVotes || 0})
                </Button>
                <Button
                  variant={userVote === "not_useful" ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleVote("not_useful")}
                  className={`font-[Manrope] font-bold text-xs sm:text-sm ${
                    userVote === "not_useful" ? "bg-rose-200 hover:bg-rose-300 dark:bg-rose-300/30 dark:hover:bg-rose-300/40 text-rose-700 dark:text-rose-400" : ""
                  }`}
                >
                  <ThumbsDown className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5" />
                  Yararsız ({wikiContent?.notUsefulVotes || 0})
                </Button>
              </div>
              <div className="text-xs text-muted-foreground font-[Manrope]">
                v{wikiContent?.version || 1} • Son güncelleme: {wikiContent?.author.name || "Bilinmiyor"}
              </div>
            </div>
          )}

          {/* Key Points */}
          <div className="mt-4 sm:mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
            <div className="bg-accent rounded-xl p-3 sm:p-4">
              <div className="font-[Manrope] text-primary mb-1 font-extrabold text-2xl sm:text-3xl lg:text-[32px]">
                12
              </div>
              <div className="font-[Manrope] text-foreground font-semibold text-xs sm:text-sm">
                Ders Konusu
              </div>
            </div>
            <div className="bg-accent rounded-xl p-3 sm:p-4">
              <div className="font-[Manrope] text-primary mb-1 font-extrabold text-2xl sm:text-3xl lg:text-[32px]">
                156
              </div>
              <div className="font-[Manrope] text-foreground font-semibold text-xs sm:text-sm">
                Sayfa
              </div>
            </div>
            <div className="bg-accent rounded-xl p-3 sm:p-4">
              <div className="font-[Manrope] text-primary mb-1 font-extrabold text-2xl sm:text-3xl lg:text-[32px]">
                4.8/5
              </div>
              <div className="font-[Manrope] text-foreground font-semibold text-xs sm:text-sm">
                Ortalama Puan
              </div>
            </div>
          </div>
        </div>

        {/* Wiki Edit Dialog */}
        <WikiEditDialog
          open={isEditDialogOpen}
          onOpenChange={setIsEditDialogOpen}
          wikiContent={wikiContent}
          topicId={topicId}
          onSave={handleWikiSave}
        />

        {/* Wiki History Dialog */}
        <WikiHistory
          open={isHistoryOpen}
          onOpenChange={setIsHistoryOpen}
          revisions={revisions}
          currentVersion={wikiContent?.version || 1}
          onRevert={(revisionId) => {
            // Revert işlemi - gerçek uygulamada API çağrısı yapılacak
            const revision = revisions.find((r) => r.id === revisionId)
            if (revision && wikiContent) {
              const revertedBy = state.user?.name || "Bir moderatör"
              const topicTitle = topic.title
              
              setWikiContent({
                ...wikiContent,
                content: revision.content,
                version: revision.version + 1,
                updatedAt: new Date().toISOString(),
              })
              
              // Wiki düzenleyen kullanıcıya bildirim gönder
              if (wikiContent.author.id !== state.user?.id) {
                notifyWikiReverted(topicId, topicTitle, revertedBy, revision.version)
              }
            }
          }}
        />
      </CardContent>
    </Card>
  )
}

