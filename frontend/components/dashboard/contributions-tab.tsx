"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Edit, MessageCircle, Calendar } from "lucide-react"
import Link from "next/link"

interface Contribution {
  id: number
  type: "topic" | "wiki_edit" | "comment"
  title: string
  content?: string
  topicId?: number
  createdAt: string
  coins?: number
}

export function ContributionsTab() {
  const [activeTab, setActiveTab] = useState<"topics" | "edits" | "comments">("topics")

  // Mock data - gerçek uygulamada API'den gelecek
  // Date.now() yerine sabit tarihler kullanıyoruz
  const now = 1700000000000 // Örnek timestamp
  const contributions: Contribution[] = [
    {
      id: 1,
      type: "topic",
      title: "Selçuk Hukuk Final Notları",
      createdAt: new Date(now - 2 * 24 * 60 * 60 * 1000).toISOString(),
      topicId: 1,
      coins: 20,
    },
    {
      id: 2,
      type: "wiki_edit",
      title: "Konya'da Öğrenci Dostu Restoranlar",
      content: "Wiki içeriğini güncelledim...",
      topicId: 2,
      createdAt: new Date(now - 5 * 24 * 60 * 60 * 1000).toISOString(),
      coins: 10,
    },
    {
      id: 3,
      type: "comment",
      title: "Selçuk Hukuk Final Notları",
      content: "Bu notlar gerçekten çok işime yaradı!",
      topicId: 1,
      createdAt: new Date(now - 1 * 24 * 60 * 60 * 1000).toISOString(),
      coins: 2,
    },
  ]

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

  return (
    <Card className="bg-white dark:bg-card rounded-[20px] shadow-[0_4px_20px_rgba(0,0,0,0.06)] dark:shadow-lg border border-border">
      <CardHeader>
        <CardTitle className="font-[Manrope] text-[#4d4d4d] dark:text-foreground font-bold text-xl sm:text-2xl">
          Katkı Geçmişi
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as typeof activeTab)} className="w-full">
          <TabsList className="grid w-full grid-cols-3 font-[Manrope] mb-6">
            <TabsTrigger value="topics">
              <BookOpen className="w-4 h-4 mr-2" />
              Başlıklar
            </TabsTrigger>
            <TabsTrigger value="edits">
              <Edit className="w-4 h-4 mr-2" />
              Düzenlemeler
            </TabsTrigger>
            <TabsTrigger value="comments">
              <MessageCircle className="w-4 h-4 mr-2" />
              Yorumlar
            </TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="space-y-4">
            {filteredContributions.length > 0 ? (
              filteredContributions.map((contribution) => (
                <div
                  key={contribution.id}
                  className="bg-[#f2f4f3] dark:bg-accent rounded-xl p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        {contribution.type === "topic" && (
                          <BookOpen className="w-4 h-4 text-[#03624c]" />
                        )}
                        {contribution.type === "wiki_edit" && (
                          <Edit className="w-4 h-4 text-[#03624c]" />
                        )}
                        {contribution.type === "comment" && (
                          <MessageCircle className="w-4 h-4 text-[#03624c]" />
                        )}
                        {contribution.topicId ? (
                          <Link
                            href={`/topic/${contribution.topicId}`}
                            className="font-[Manrope] font-bold text-sm sm:text-base text-[#4d4d4d] dark:text-foreground hover:text-[#03624c] transition-colors"
                          >
                            {contribution.title}
                          </Link>
                        ) : (
                          <span className="font-[Manrope] font-bold text-sm sm:text-base text-[#4d4d4d] dark:text-foreground">
                            {contribution.title}
                          </span>
                        )}
                      </div>
                      {contribution.content && (
                        <p className="font-[Manrope] text-xs sm:text-sm text-[#4d4d4d]/70 dark:text-muted-foreground line-clamp-2 mb-2">
                          {contribution.content}
                        </p>
                      )}
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1 text-[#4d4d4d]/60 dark:text-muted-foreground">
                          <Calendar className="w-3 h-3" />
                          <span className="font-[Manrope] text-xs">
                            {formatDate(contribution.createdAt)}
                          </span>
                        </div>
                        {contribution.coins && (
                          <Badge className="bg-[#03624c] text-white font-[Manrope] font-bold text-xs">
                            +{contribution.coins} GençCoin
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <p className="font-[Manrope] text-[#4d4d4d]/60 dark:text-muted-foreground">
                  Henüz {activeTab === "topics" ? "başlık" : activeTab === "edits" ? "düzenleme" : "yorum"} yok
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

