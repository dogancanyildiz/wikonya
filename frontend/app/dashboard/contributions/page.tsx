"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Edit, MessageCircle, Calendar, Eye, ThumbsUp } from "lucide-react"
import Link from "next/link"

interface Contribution {
  id: number
  type: "topic" | "wiki_edit" | "comment"
  title: string
  content?: string
  topicId?: number
  createdAt: string
  coins?: number
  views?: number
  likes?: number
  dislikes?: number
  status?: "approved" | "pending" | "rejected"
}

// Mock data - gerçek uygulamada API'den gelecek
const contributions: Contribution[] = [
  {
    id: 1,
    type: "topic",
    title: "Selçuk Hukuk Final Notları",
    content: "2024 yılı hukuk fakültesi final sınavları için hazırlanmış kapsamlı notlar...",
    createdAt: "2025-11-25T10:00:00.000Z",
    topicId: 1,
    coins: 30,
    views: 1245,
    likes: 89,
    status: "approved",
  },
  {
    id: 2,
    type: "topic",
    title: "Kampüste En İyi Çalışma Mekanları",
    content: "Konya'daki üniversite öğrencileri için sessiz ve verimli çalışma alanları...",
    createdAt: "2025-11-17T10:00:00.000Z",
    topicId: 5,
    coins: 30,
    views: 856,
    likes: 62,
    status: "approved",
  },
  {
    id: 3,
    type: "wiki_edit",
    title: "Konya'da Öğrenci Dostu Restoranlar",
    content: "Fiyat bilgilerini güncelledim ve yeni mekanlar ekledim...",
    topicId: 2,
    createdAt: "2025-11-22T10:00:00.000Z",
    coins: 15,
    status: "approved",
  },
  {
    id: 4,
    type: "wiki_edit",
    title: "NEÜ Mühendislik Yemekhanesi",
    content: "Haftalık menü ve çalışma saatlerini güncelledim...",
    topicId: 8,
    createdAt: "2025-11-24T10:00:00.000Z",
    coins: 10,
    status: "pending",
  },
  {
    id: 5,
    type: "comment",
    title: "Selçuk Hukuk Final Notları",
    content: "Bu notlar gerçekten çok işime yaradı! Özellikle 3. bölümdeki özetler muhteşem.",
    topicId: 1,
    createdAt: "2025-11-26T10:00:00.000Z",
    coins: 2,
    likes: 12,
  },
  {
    id: 6,
    type: "comment",
    title: "Bosna Hersek Mahallesi Kiralık Ev Rehberi",
    content: "Ev arkadaşı arayan var mı? Ben de bu bölgede arıyorum.",
    topicId: 3,
    createdAt: "2025-11-20T10:00:00.000Z",
    coins: 2,
    likes: 5,
  },
]

export default function ContributionsPage() {
  const [activeTab, setActiveTab] = useState<"topics" | "edits" | "comments">("topics")

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
    if (activeTab === "topics") return c.type === "topic"
    if (activeTab === "edits") return c.type === "wiki_edit"
    if (activeTab === "comments") return c.type === "comment"
    return true
  })

  const stats = {
    topics: contributions.filter(c => c.type === "topic").length,
    edits: contributions.filter(c => c.type === "wiki_edit").length,
    comments: contributions.filter(c => c.type === "comment").length,
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
          <CardTitle className="font-[Manrope] text-foreground font-bold text-xl">
            Katkı Geçmişi
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as typeof activeTab)} className="w-full">
            <TabsList className="grid w-full grid-cols-3 font-[Manrope] mb-6">
              <TabsTrigger value="topics">
                <BookOpen className="w-4 h-4 mr-2" />
                Başlıklar ({stats.topics})
              </TabsTrigger>
              <TabsTrigger value="edits">
                <Edit className="w-4 h-4 mr-2" />
                Düzenlemeler ({stats.edits})
              </TabsTrigger>
              <TabsTrigger value="comments">
                <MessageCircle className="w-4 h-4 mr-2" />
                Yorumlar ({stats.comments})
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

