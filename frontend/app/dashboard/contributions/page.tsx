"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BookOpen, Edit, MessageCircle, Calendar, Eye, ThumbsUp, ThumbsDown, TrendingUp, Filter, X } from "lucide-react"
import Link from "next/link"
import { getContributions } from "@/lib/mock-data"

interface Contribution {
  id: number
  type: "topic" | "wiki_edit" | "comment" | "wiki_vote" | "coin_earned"
  title: string
  content?: string
  topicId?: number
  createdAt: string
  coins?: number
  views?: number
  likes?: number
  dislikes?: number
  status?: "approved" | "pending" | "rejected"
  voteType?: "useful" | "not_useful"
  actionType?: string
  version?: number
}

// Mock data - gerçek uygulamada API'den gelecek
// mock-data.json dosyasından veri alınıyor
const contributions: Contribution[] = getContributions() as Contribution[]

export default function ContributionsPage() {
  const [activeTab, setActiveTab] = useState<"all" | "topics" | "edits" | "comments" | "votes" | "coins">("all")
  const [dateFilter, setDateFilter] = useState<string>("all")
  const [showFilters, setShowFilters] = useState(false)

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

    if (diffDays === 0) return "Bugün"
    if (diffDays === 1) return "Dün"
    if (diffDays < 7) return `${diffDays} gün önce`
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} hafta önce`
    return `${Math.floor(diffDays / 30)} ay önce`
  }

  const filteredContributions = contributions.filter((c) => {
    // Tab filtresi
    if (activeTab === "topics" && c.type !== "topic") return false
    if (activeTab === "edits" && c.type !== "wiki_edit") return false
    if (activeTab === "comments" && c.type !== "comment") return false
    if (activeTab === "votes" && c.type !== "wiki_vote") return false
    if (activeTab === "coins" && c.type !== "coin_earned") return false
    
    // Tarih filtresi
    if (dateFilter !== "all") {
      const contributionDate = new Date(c.createdAt)
      const now = new Date()
      const diffMs = now.getTime() - contributionDate.getTime()
      const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
      
      if (dateFilter === "7d" && diffDays > 7) return false
      if (dateFilter === "30d" && diffDays > 30) return false
      if (dateFilter === "90d" && diffDays > 90) return false
    }
    
    return true
  })

  const stats = {
    topics: contributions.filter(c => c.type === "topic").length,
    edits: contributions.filter(c => c.type === "wiki_edit").length,
    comments: contributions.filter(c => c.type === "comment").length,
    votes: contributions.filter(c => c.type === "wiki_vote").length,
    coins: contributions.filter(c => c.type === "coin_earned").length,
    totalCoins: contributions.reduce((sum, c) => sum + (c.coins || 0), 0),
  }

  const getStatusBadge = (status?: string) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-green-100 dark:bg-green-500/20 text-green-600 dark:text-green-400 border-green-200 dark:border-green-500/30 font-[Manrope] text-xs">Onaylandı</Badge>
      case "pending":
        return <Badge className="bg-yellow-100 dark:bg-yellow-500/20 text-yellow-600 dark:text-yellow-400 border-yellow-200 dark:border-yellow-500/30 font-[Manrope] text-xs">Beklemede</Badge>
      case "rejected":
        return <Badge className="bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-400 border-red-200 dark:border-red-500/30 font-[Manrope] text-xs">Reddedildi</Badge>
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      {/* Başlık */}
      <div>
        <h1 className="font-[Manrope] text-foreground font-bold text-2xl sm:text-3xl">
          Katkılarım
        </h1>
        <p className="font-[Manrope] text-foreground/60 dark:text-muted-foreground mt-1">
          Açtığınız başlıklar, düzenlemeler ve yorumlar
        </p>
      </div>

      {/* İstatistik Kartları */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Card className="bg-white dark:bg-card rounded-[20px] shadow-[0_4px_20px_rgba(0,0,0,0.06)] dark:shadow-lg border border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 dark:bg-primary/20 rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-[Manrope] text-foreground font-bold text-xl">
                  {stats.topics}
                </p>
                <p className="font-[Manrope] text-foreground/60 dark:text-muted-foreground text-xs">
                  Başlık
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-card rounded-[20px] shadow-[0_4px_20px_rgba(0,0,0,0.06)] dark:shadow-lg border border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-500/20 rounded-lg flex items-center justify-center">
                <Edit className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="font-[Manrope] text-foreground font-bold text-xl">
                  {stats.edits}
                </p>
                <p className="font-[Manrope] text-foreground/60 dark:text-muted-foreground text-xs">
                  Düzenleme
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-card rounded-[20px] shadow-[0_4px_20px_rgba(0,0,0,0.06)] dark:shadow-lg border border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 dark:bg-purple-500/20 rounded-lg flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p className="font-[Manrope] text-foreground font-bold text-xl">
                  {stats.comments}
                </p>
                <p className="font-[Manrope] text-foreground/60 dark:text-muted-foreground text-xs">
                  Yorum
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-primary to-primary/90 rounded-[20px] border-0">
          <CardContent className="p-4">
            <p className="font-[Manrope] text-white font-bold text-xl">
              +{stats.totalCoins}
            </p>
            <p className="font-[Manrope] text-white/80 text-xs">
              Toplam Kazanılan
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Katkı Listesi */}
      <Card className="bg-white dark:bg-card rounded-[20px] shadow-[0_4px_20px_rgba(0,0,0,0.06)] dark:shadow-lg border border-border">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="font-[Manrope] text-foreground font-bold text-xl">
              Katkı Geçmişi
            </CardTitle>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
                className="font-[Manrope] font-bold text-xs sm:text-sm"
              >
                <Filter className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                Filtreler
                {dateFilter !== "all" && (
                  <Badge className="ml-2 bg-primary text-primary-foreground">Aktif</Badge>
                )}
              </Button>
            </div>
          </div>
          {showFilters && (
            <div className="flex items-center gap-3 mt-4">
              <Select value={dateFilter} onValueChange={setDateFilter}>
                <SelectTrigger className="w-full sm:w-[180px] font-[Manrope] text-xs sm:text-sm">
                  <SelectValue placeholder="Tarih" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tüm Zamanlar</SelectItem>
                  <SelectItem value="7d">Son 7 Gün</SelectItem>
                  <SelectItem value="30d">Son 30 Gün</SelectItem>
                  <SelectItem value="90d">Son 90 Gün</SelectItem>
                </SelectContent>
              </Select>
              {dateFilter !== "all" && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setDateFilter("all")}
                  className="font-[Manrope] text-xs sm:text-sm"
                >
                  <X className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                  Temizle
                </Button>
              )}
            </div>
          )}
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as typeof activeTab)} className="w-full">
            <TabsList className="grid w-full grid-cols-3 sm:grid-cols-6 font-[Manrope] mb-6">
              <TabsTrigger value="all" className="text-xs">
                Tümü
              </TabsTrigger>
              <TabsTrigger value="topics" className="text-xs">
                <BookOpen className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Başlık</span>
                <span className="sm:hidden">B</span>
                ({stats.topics})
              </TabsTrigger>
              <TabsTrigger value="edits" className="text-xs">
                <Edit className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Düzenle</span>
                <span className="sm:hidden">D</span>
                ({stats.edits})
              </TabsTrigger>
              <TabsTrigger value="comments" className="text-xs">
                <MessageCircle className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Yorum</span>
                <span className="sm:hidden">Y</span>
                ({stats.comments})
              </TabsTrigger>
              <TabsTrigger value="votes" className="text-xs">
                <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Oy</span>
                <span className="sm:hidden">O</span>
                ({stats.votes})
              </TabsTrigger>
              <TabsTrigger value="coins" className="text-xs">
                <span className="hidden sm:inline">Coin</span>
                <span className="sm:hidden">C</span>
                ({stats.coins})
              </TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="space-y-4">
              {filteredContributions.length > 0 ? (
                filteredContributions.map((contribution) => (
                  <div
                    key={contribution.id}
                    className="bg-[#f2f4f3] dark:bg-accent rounded-xl p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2 flex-wrap">
                          {contribution.type === "topic" && (
                            <BookOpen className="w-4 h-4 text-primary" />
                          )}
                          {contribution.type === "wiki_edit" && (
                            <Edit className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                          )}
                          {contribution.type === "comment" && (
                            <MessageCircle className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                          )}
                          {contribution.type === "wiki_vote" && (
                            contribution.voteType === "useful" ? (
                              <ThumbsUp className="w-4 h-4 text-green-600 dark:text-green-400" />
                            ) : (
                              <ThumbsDown className="w-4 h-4 text-red-600 dark:text-red-400" />
                            )
                          )}
                          {contribution.type === "coin_earned" && (
                            <TrendingUp className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
                          )}
                          {contribution.topicId ? (
                            <Link
                              href={`/topic/${contribution.topicId}`}
                              className="font-[Manrope] font-bold text-sm sm:text-base text-foreground hover:text-primary transition-colors"
                            >
                              {contribution.title}
                            </Link>
                          ) : (
                            <span className="font-[Manrope] font-bold text-sm sm:text-base text-foreground">
                              {contribution.title}
                            </span>
                          )}
                          {getStatusBadge(contribution.status)}
                        </div>

                        {contribution.content && (
                          <p className="font-[Manrope] text-xs sm:text-sm text-foreground/70 dark:text-muted-foreground line-clamp-2 mb-3">
                            {contribution.content}
                          </p>
                        )}
                        
                        {contribution.type === "wiki_edit" && contribution.version && (
                          <Badge variant="outline" className="mb-2 font-[Manrope] text-xs">
                            Sürüm {contribution.version}
                          </Badge>
                        )}
                        
                        {contribution.type === "wiki_vote" && (
                          <Badge 
                            variant="outline" 
                            className={`mb-2 font-[Manrope] text-xs ${
                              contribution.voteType === "useful" 
                                ? "bg-green-50 dark:bg-green-500/10 text-green-600 dark:text-green-400 border-green-200 dark:border-green-500/30"
                                : "bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 border-red-200 dark:border-red-500/30"
                            }`}
                          >
                            {contribution.voteType === "useful" ? "Yararlı Oy Aldı" : "Yararsız Oy Aldı"}
                          </Badge>
                        )}
                        
                        {contribution.type === "coin_earned" && contribution.actionType && (
                          <Badge variant="outline" className="mb-2 font-[Manrope] text-xs">
                            {contribution.actionType === "comment_received_like" && "Yorum Beğenildi"}
                            {contribution.actionType === "wiki_received_useful_vote" && "Wiki Yararlı Oy Aldı"}
                            {contribution.actionType === "wiki_received_not_useful_vote" && "Wiki Yararsız Oy Aldı"}
                          </Badge>
                        )}

                        <div className="flex items-center gap-4 flex-wrap">
                          <div className="flex items-center gap-1 text-foreground/60 dark:text-muted-foreground">
                            <Calendar className="w-3 h-3" />
                            <span className="font-[Manrope] text-xs">
                              {formatDate(contribution.createdAt)}
                            </span>
                          </div>
                          
                          {contribution.views && (
                            <div className="flex items-center gap-1 text-foreground/60 dark:text-muted-foreground">
                              <Eye className="w-3 h-3" />
                              <span className="font-[Manrope] text-xs">
                                {contribution.views.toLocaleString()}
                              </span>
                            </div>
                          )}

                          {contribution.likes !== undefined && (
                            <div className="flex items-center gap-1 text-foreground/60 dark:text-muted-foreground">
                              <ThumbsUp className="w-3 h-3" />
                              <span className="font-[Manrope] text-xs">
                                {contribution.likes}
                              </span>
                            </div>
                          )}

                          {contribution.coins && (
                            <Badge className="bg-primary text-white font-[Manrope] font-bold text-xs">
                              +{contribution.coins} GençCoin
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12">
                  <p className="font-[Manrope] text-foreground/60 dark:text-muted-foreground">
                    Henüz {activeTab === "topics" ? "başlık" : activeTab === "edits" ? "düzenleme" : "yorum"} yok
                  </p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

