"use client"

import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Empty, EmptyHeader, EmptyTitle, EmptyDescription, EmptyMedia, EmptyContent } from "@/components/ui/empty"
import { Search, BookOpen, MessageCircle, User, Clock, TrendingUp, X } from "lucide-react"
import Link from "next/link"
import { Topic, Comment } from "@/lib/types"

export default function SearchPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [query, setQuery] = useState(searchParams.get("q") || "")
  const [activeTab, setActiveTab] = useState<"topics" | "comments" | "users">("topics")
  const [isLoading, setIsLoading] = useState(false)
  const [recentSearches, setRecentSearches] = useState<string[]>([])
  const [popularSearches] = useState([
    "Selçuk Üniversitesi",
    "KYK Yurt",
    "Etli Ekmek",
    "Konya Kafeler",
    "Staj İlanları",
    "Burs Fırsatları",
  ])

  // Mock search results - gerçek uygulamada API'den gelecek
  const [results, setResults] = useState<{
    topics: Topic[]
    comments: Comment[]
    users: Array<{ id: number; name: string; initials: string; role: string }>
  }>({
    topics: [],
    comments: [],
    users: [],
  })

  // Load recent searches from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("recentSearches")
    if (stored) {
      try {
        setRecentSearches(JSON.parse(stored))
      } catch {
        setRecentSearches([])
      }
    }
  }, [])

  // Auto search on mount if query exists
  useEffect(() => {
    if (query && searchParams.get("q")) {
      handleSearch()
    }
  }, [])

  const handleSearch = async () => {
    if (!query.trim()) return

    setIsLoading(true)
    try {
      // Save to recent searches
      const trimmedQuery = query.trim()
      if (trimmedQuery) {
        const updated = [trimmedQuery, ...recentSearches.filter(s => s !== trimmedQuery)].slice(0, 5)
        setRecentSearches(updated)
        localStorage.setItem("recentSearches", JSON.stringify(updated))
      }

      // Simüle edilmiş API çağrısı
      await new Promise((resolve) => setTimeout(resolve, 500))

      // Mock results
      const mockTopics: Topic[] = [
        {
          id: 1,
          title: "Selçuk Hukuk Final Notları",
          content: "Final sınavlarına hazırlık için kapsamlı ders notları...",
          category: "Akademik",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          views: 3200,
          likes: 145,
          comments: 48,
          tags: ["Ders Notu", "Hukuk Fakültesi"],
          author: { id: 1, name: "Admin", initials: "AD", role: "konya_bilgesi" as const, totalCoins: 0, badges: [], xp: { current: 0, nextLevel: 500, progress: 0 }, joinedAt: new Date().toISOString() },
          reliabilityScore: 98,
        },
      ].filter((topic) =>
        topic.title.toLowerCase().includes(query.toLowerCase()) ||
        topic.content.toLowerCase().includes(query.toLowerCase()) ||
        topic.tags.some((tag) => tag.toLowerCase().includes(query.toLowerCase()))
      )

      const mockComments: Comment[] = [
        {
          id: 1,
          author: "Ayşe Yılmaz",
          authorInitials: "AY",
          timeAgo: "2 saat önce",
          content: "Bu notlar gerçekten çok işime yaradı!",
          upvotes: 42,
          downvotes: 2,
          logicalVotes: 35,
          replies: 5,
          isUpvoted: false,
          isDownvoted: false,
          isLogical: false,
        },
      ].filter((comment) =>
        comment.content.toLowerCase().includes(query.toLowerCase())
      )

      setResults({
        topics: mockTopics,
        comments: mockComments,
        users: [],
      })
    } catch (error) {
      console.error("Search error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    router.push(`/search?q=${encodeURIComponent(query)}`)
    handleSearch()
  }

  return (
    <div className="min-h-screen bg-[#f2f4f3] dark:bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 lg:px-16 py-4 sm:py-6 md:py-8">
        {/* Search Header */}
        <div className="mb-4 sm:mb-6">
          <h1 className="font-[Manrope] text-[#4d4d4d] dark:text-foreground font-extrabold text-2xl sm:text-3xl md:text-4xl mb-3 sm:mb-4">
            Arama
          </h1>
          <form onSubmit={handleSubmit} className="relative">
            <div className="relative flex items-center bg-white dark:bg-card rounded-[20px] shadow-[0_4px_20px_rgba(0,0,0,0.06)] dark:shadow-lg">
              <Search className="absolute left-4 sm:left-6 w-5 h-5 sm:w-6 sm:h-6 text-[#03624c]" />
              <Input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Konuları, soruları, yorumları keşfet..."
                className="w-full h-[60px] pl-12 sm:pl-16 pr-28 sm:pr-32 bg-transparent rounded-[20px] font-[Manrope] font-medium text-[#4d4d4d] dark:text-foreground placeholder:text-[#4d4d4d]/40 dark:placeholder:text-muted-foreground focus:outline-none border-0 focus-visible:ring-0"
              />
              <Button
                type="submit"
                className="absolute right-2 h-[48px] px-6 sm:px-8 bg-[#03624c] hover:bg-[#03624c]/90 rounded-[16px] font-[Manrope] font-semibold text-white"
                disabled={isLoading}
              >
                {isLoading ? "Aranıyor..." : "Ara"}
              </Button>
            </div>
          </form>
        </div>

        {/* Tabs */}
        {query && (
          <div className="flex flex-wrap gap-2 mb-4 sm:mb-6">
            <Button
              variant={activeTab === "topics" ? "default" : "outline"}
              onClick={() => setActiveTab("topics")}
              className="font-[Manrope] font-bold text-xs sm:text-sm"
              size="sm"
            >
              <BookOpen className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Başlıklar</span>
              <span className="sm:hidden">Başlık</span>
              <span className="ml-1">({results.topics.length})</span>
            </Button>
            <Button
              variant={activeTab === "comments" ? "default" : "outline"}
              onClick={() => setActiveTab("comments")}
              className="font-[Manrope] font-bold text-xs sm:text-sm"
              size="sm"
            >
              <MessageCircle className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Yorumlar</span>
              <span className="sm:hidden">Yorum</span>
              <span className="ml-1">({results.comments.length})</span>
            </Button>
            <Button
              variant={activeTab === "users" ? "default" : "outline"}
              onClick={() => setActiveTab("users")}
              className="font-[Manrope] font-bold text-xs sm:text-sm"
              size="sm"
            >
              <User className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Kullanıcılar</span>
              <span className="sm:hidden">Kullanıcı</span>
              <span className="ml-1">({results.users.length})</span>
            </Button>
          </div>
        )}

        {/* Results */}
        {query ? (
          <div className="space-y-4">
            {activeTab === "topics" && (
              <>
                {results.topics.length > 0 ? (
                  results.topics.map((topic) => (
                    <Card
                      key={topic.id}
                      className="bg-white dark:bg-card rounded-[20px] shadow-[0_4px_20px_rgba(0,0,0,0.06)] dark:shadow-lg border border-border hover:shadow-[0_6px_30px_rgba(0,0,0,0.1)] dark:hover:shadow-xl transition-shadow"
                    >
                      <CardContent className="p-4 sm:p-6">
                        <Link href={`/topic/${topic.id}`}>
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <Badge variant="outline" className="font-[Manrope] text-xs">
                                  {topic.category}
                                </Badge>
                                {topic.tags.slice(0, 3).map((tag) => (
                                  <Badge key={tag} variant="secondary" className="font-[Manrope] text-xs">
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                              <h3 className="font-[Manrope] font-bold text-lg sm:text-xl text-[#4d4d4d] dark:text-foreground mb-2 hover:text-[#03624c] transition-colors">
                                {topic.title}
                              </h3>
                              <p className="font-[Manrope] text-sm text-[#4d4d4d]/70 dark:text-muted-foreground line-clamp-2 mb-3">
                                {topic.content}
                              </p>
                              <div className="flex items-center gap-4 text-xs text-[#4d4d4d]/60 dark:text-muted-foreground">
                                <span>{topic.views.toLocaleString()} görüntülenme</span>
                                <span>{topic.comments} yorum</span>
                                <span>{topic.likes} beğeni</span>
                              </div>
                            </div>
                          </div>
                        </Link>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <Empty className="py-12 sm:py-16">
                    <EmptyHeader>
                      <EmptyMedia variant="icon">
                        <BookOpen className="w-12 h-12 text-muted-foreground" />
                      </EmptyMedia>
                      <EmptyTitle className="font-[Manrope] font-bold text-xl sm:text-2xl">
                        Başlık Bulunamadı
                      </EmptyTitle>
                      <EmptyDescription className="font-[Manrope] text-base">
                        &quot;{query}&quot; için başlık bulunamadı. Farklı anahtar kelimeler deneyin.
                      </EmptyDescription>
                    </EmptyHeader>
                  </Empty>
                )}
              </>
            )}

            {activeTab === "comments" && (
              <>
                {results.comments.length > 0 ? (
                  results.comments.map((comment) => (
                    <Card
                      key={comment.id}
                      className="bg-white dark:bg-card rounded-[20px] shadow-[0_4px_20px_rgba(0,0,0,0.06)] dark:shadow-lg border border-border"
                    >
                      <CardContent className="p-4 sm:p-6">
                        <div className="flex items-start gap-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="font-[Manrope] font-bold text-sm text-[#4d4d4d] dark:text-foreground">
                                {comment.author}
                              </span>
                              <span className="font-[Manrope] text-xs text-[#4d4d4d]/60 dark:text-muted-foreground">
                                {comment.timeAgo}
                              </span>
                            </div>
                            <p className="font-[Manrope] text-sm text-[#4d4d4d] dark:text-foreground mb-2">
                              {comment.content}
                            </p>
                            <div className="flex items-center gap-4 text-xs text-[#4d4d4d]/60 dark:text-muted-foreground">
                              <span>{comment.upvotes} beğeni</span>
                              {comment.logicalVotes && comment.logicalVotes > 0 && (
                                <span>{comment.logicalVotes} mantıklı</span>
                              )}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <Empty className="py-12 sm:py-16">
                    <EmptyHeader>
                      <EmptyMedia variant="icon">
                        <MessageCircle className="w-12 h-12 text-muted-foreground" />
                      </EmptyMedia>
                      <EmptyTitle className="font-[Manrope] font-bold text-xl sm:text-2xl">
                        Yorum Bulunamadı
                      </EmptyTitle>
                      <EmptyDescription className="font-[Manrope] text-base">
                        &quot;{query}&quot; için yorum bulunamadı. Farklı anahtar kelimeler deneyin.
                      </EmptyDescription>
                    </EmptyHeader>
                  </Empty>
                )}
              </>
            )}

            {activeTab === "users" && (
              <Card>
                <CardContent className="p-8 text-center">
                  <p className="font-[Manrope] text-[#4d4d4d]/60 dark:text-muted-foreground">
                    Kullanıcı arama özelliği yakında eklenecek
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            {/* Recent Searches */}
            {recentSearches.length > 0 && (
              <Card>
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="font-[Manrope] font-bold text-lg text-[#4d4d4d] dark:text-foreground flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      Son Aramalar
                    </h2>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setRecentSearches([])
                        localStorage.removeItem("recentSearches")
                      }}
                      className="font-[Manrope] text-xs text-[#4d4d4d]/60 dark:text-muted-foreground"
                    >
                      Temizle
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {recentSearches.map((search, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setQuery(search)
                          router.push(`/search?q=${encodeURIComponent(search)}`)
                          handleSearch()
                        }}
                        className="font-[Manrope] font-medium text-xs"
                      >
                        {search}
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Popular Searches */}
            <Card>
              <CardContent className="p-4 sm:p-6">
                <h2 className="font-[Manrope] font-bold text-lg text-[#4d4d4d] dark:text-foreground mb-4 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  Popüler Aramalar
                </h2>
                <div className="flex flex-wrap gap-2">
                  {popularSearches.map((search, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setQuery(search)
                        router.push(`/search?q=${encodeURIComponent(search)}`)
                        handleSearch()
                      }}
                      className="font-[Manrope] font-medium text-xs"
                    >
                      {search}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Empty State */}
            <Empty className="py-12 sm:py-16">
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  <Search className="w-12 h-12 text-muted-foreground" />
                </EmptyMedia>
                <EmptyTitle className="font-[Manrope] font-bold text-xl sm:text-2xl">
                  Arama Yapın
                </EmptyTitle>
                <EmptyDescription className="font-[Manrope] text-base">
                  Konuları, soruları ve yorumları keşfetmek için arama yapın
                </EmptyDescription>
              </EmptyHeader>
            </Empty>
          </div>
        )}
      </div>
    </div>
  )
}

