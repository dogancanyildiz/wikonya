"use client"

import { useState } from "react"
import Link from "next/link"
import { usePermissions } from "@/lib/utils/hooks/use-permissions"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Empty, EmptyHeader, EmptyTitle, EmptyDescription, EmptyMedia, EmptyContent } from "@/components/ui/empty"
import { Clock, MessageSquare, ThumbsUp, Search, Filter, HelpCircle, X, Lock } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export function DiscussionPage() {
  const { canCreateTopic } = usePermissions()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [sortBy, setSortBy] = useState<"newest" | "popular" | "trending">("newest")

  const categories = ["Tümü", "Akademik", "Barınma", "Sosyal", "Kariyer", "Diğer"]

  const discussions = [
    {
      id: 1,
      author: "Ahmet Yılmaz",
      authorInitials: "AY",
      category: "Akademik",
      title: "Lineer Cebir Dersi İçin Kaynak Önerisi",
      excerpt: "Merhaba arkadaşlar, lineer cebir dersine çalışırken hangi kaynakları kullandınız? Kitap veya video serisi öneriniz var mı?",
      timeAgo: "5 dakika önce",
      likes: 12,
      comments: 8,
      views: 234,
    },
    {
      id: 2,
      author: "Zeynep Kaya",
      authorInitials: "ZK",
      category: "Barınma",
      title: "Kampüse Yakın Uygun Fiyatlı Yurt",
      excerpt: "Selam, önümüzdeki dönem için kampüse yakın ve uygun fiyatlı yurt arıyorum. Deneyimi olan var mı?",
      timeAgo: "22 dakika önce",
      likes: 24,
      comments: 15,
      views: 456,
    },
    {
      id: 3,
      author: "Mehmet Demir",
      authorInitials: "MD",
      category: "Sosyal",
      title: "Hafta Sonu Kampüste Aktiviteler",
      excerpt: "Bu hafta sonu kampüste kalmayı düşünüyorum. Hafta sonu açık olan yerler veya düzenlenen etkinlikler var mı?",
      timeAgo: "1 saat önce",
      likes: 18,
      comments: 12,
      views: 189,
    },
    {
      id: 4,
      author: "Ayşe Şahin",
      authorInitials: "AŞ",
      category: "Akademik",
      title: "Staj Başvuru Süreçleri",
      excerpt: "2. sınıf öğrencisiyim ve yaz stajı için başvuru yapmayı planlıyorum. Deneyimlerinizi paylaşabilir misiniz?",
      timeAgo: "2 saat önce",
      likes: 31,
      comments: 19,
      views: 567,
    },
    {
      id: 5,
      author: "Can Özkan",
      authorInitials: "CÖ",
      category: "Sosyal",
      title: "Öğrenci Kulüpleri ve Katılım",
      excerpt: "Hangi öğrenci kulüplerine üyesiniz? Deneyimleriniz nasıl? Yeni katılmak isteyenlere önerileriniz neler?",
      timeAgo: "3 saat önce",
      likes: 27,
      comments: 22,
      views: 432,
    },
    {
      id: 6,
      author: "Burak Can",
      authorInitials: "BC",
      category: "Kariyer",
      title: "Yaz Stajı İçin Şirket Önerileri",
      excerpt: "Yaz stajı için Konya'da hangi şirketleri önerirsiniz? Deneyimleriniz neler?",
      timeAgo: "4 saat önce",
      likes: 15,
      comments: 9,
      views: 298,
    },
  ]

  const filteredDiscussions = discussions.filter(discussion => {
    const matchesSearch = searchQuery === "" || 
      discussion.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      discussion.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === null || 
      selectedCategory === "Tümü" || 
      discussion.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const sortedDiscussions = [...filteredDiscussions].sort((a, b) => {
    if (sortBy === "newest") {
      return 0 // Zaten sıralı
    } else if (sortBy === "popular") {
      return (b.likes + b.comments) - (a.likes + a.comments)
    } else if (sortBy === "trending") {
      return b.views - a.views
    }
    return 0
  })

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-16 py-4 sm:py-6 md:py-8">
      <div className="mb-4 sm:mb-6 md:mb-8">
        <h1 className="font-[Manrope] text-foreground mb-2 font-extrabold text-2xl sm:text-3xl md:text-4xl lg:text-[42px]">
          Tartışmalar
        </h1>
        <p className="font-[Manrope] text-foreground/60 dark:text-muted-foreground font-medium text-sm sm:text-base">
          Tüm tartışmaları keşfet, sorularını sor ve cevaplarını bul
        </p>
      </div>

      {/* Search and Filters */}
      <div className="mb-6 space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-foreground/60 dark:text-muted-foreground" />
          <Input
            placeholder="Tartışmalarda ara..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 font-[Manrope] h-12"
          />
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          {/* Category Filters */}
          <div className="flex items-center gap-2 flex-wrap">
            <Filter className="w-4 h-4 text-foreground/60 dark:text-muted-foreground" />
            {categories.map((category) => (
              <Button
                key={category}
                onClick={() => setSelectedCategory(category === "Tümü" ? null : category)}
                variant={selectedCategory === category || (category === "Tümü" && selectedCategory === null) ? "default" : "outline"}
                className={`font-[Manrope] font-bold text-xs sm:text-sm ${
                  selectedCategory === category || (category === "Tümü" && selectedCategory === null)
                    ? 'bg-primary text-white'
                    : ''
                }`}
              >
                {category}
              </Button>
            ))}
            {(selectedCategory !== null || searchQuery !== "") && (
              <Button
                onClick={() => {
                  setSelectedCategory(null)
                  setSearchQuery("")
                }}
                variant="outline"
                size="sm"
                className="font-[Manrope] font-bold text-xs text-foreground/60 dark:text-muted-foreground hover:text-primary"
              >
                <X className="w-3 h-3 mr-1" />
                Temizle
              </Button>
            )}
            {(selectedCategory !== null || searchQuery !== "") && (
              <Badge className="font-[Manrope] font-bold text-xs bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary">
                {[selectedCategory, searchQuery].filter(Boolean).length} aktif filtre
              </Badge>
            )}
          </div>

          {/* Sort */}
          <div className="flex items-center gap-2">
            <span className="font-[Manrope] text-sm text-foreground/60 dark:text-muted-foreground">
              Sırala:
            </span>
            <Button
              onClick={() => setSortBy("newest")}
              variant={sortBy === "newest" ? "default" : "outline"}
              size="sm"
              className={`font-[Manrope] font-bold text-xs ${
                sortBy === "newest" ? 'bg-primary text-white' : ''
              }`}
            >
              Yeni
            </Button>
            <Button
              onClick={() => setSortBy("popular")}
              variant={sortBy === "popular" ? "default" : "outline"}
              size="sm"
              className={`font-[Manrope] font-bold text-xs ${
                sortBy === "popular" ? 'bg-primary text-white' : ''
              }`}
            >
              Popüler
            </Button>
            <Button
              onClick={() => setSortBy("trending")}
              variant={sortBy === "trending" ? "default" : "outline"}
              size="sm"
              className={`font-[Manrope] font-bold text-xs ${
                sortBy === "trending" ? 'bg-primary text-white' : ''
              }`}
            >
              Trend
            </Button>
          </div>
        </div>
      </div>

      {/* Discussions List */}
      <div className="space-y-4">
        {sortedDiscussions.length > 0 ? (
          sortedDiscussions.map((discussion) => (
            <Card
              key={discussion.id}
              className="bg-card border border-border rounded-xl hover:shadow-lg hover:scale-[1.02] transition-all duration-300 cursor-pointer group"
            >
              <CardContent className="p-4 sm:p-6">
                <Link href={`/topic/${discussion.id}`}>
                  <div className="flex items-start gap-4">
                    <Avatar className="w-10 h-10 sm:w-12 sm:h-12 border-2 border-[#f2f4f3] dark:border-border flex-shrink-0">
                      <AvatarFallback className="bg-primary text-white font-[Manrope] font-bold">
                        {discussion.authorInitials}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2">
                        <span className="font-[Manrope] font-bold text-foreground text-sm sm:text-base">
                          {discussion.author}
                        </span>
                        <Badge className="font-[Manrope] font-semibold text-primary text-xs sm:text-sm bg-accent">
                          {discussion.category}
                        </Badge>
                        <div className="flex items-center gap-1 text-foreground/60 dark:text-muted-foreground">
                          <Clock className="w-4 h-4" />
                          <span className="font-[Manrope] font-medium text-xs sm:text-sm">{discussion.timeAgo}</span>
                        </div>
                      </div>

                      <h3 className="font-[Manrope] font-bold text-foreground mb-2 group-hover:text-primary transition-colors text-base sm:text-lg">
                        {discussion.title}
                      </h3>

                      <p className="font-[Manrope] font-medium text-foreground/70 dark:text-muted-foreground mb-4 text-sm sm:text-base line-clamp-2">
                        {discussion.excerpt}
                      </p>

                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-1 text-foreground/60 dark:text-muted-foreground">
                          <ThumbsUp className="w-4 h-4" />
                          <span className="font-[Manrope] font-medium">{discussion.likes}</span>
                        </div>
                        <div className="flex items-center gap-1 text-foreground/60 dark:text-muted-foreground">
                          <MessageSquare className="w-4 h-4" />
                          <span className="font-[Manrope] font-medium">{discussion.comments}</span>
                        </div>
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
                <HelpCircle className="w-12 h-12 text-muted-foreground" />
              </EmptyMedia>
              <EmptyTitle className="font-[Manrope] font-bold text-xl sm:text-2xl">
                Tartışma Bulunamadı
              </EmptyTitle>
              <EmptyDescription className="font-[Manrope] text-base">
                Aradığınız kriterlere uygun tartışma bulunamadı. Filtreleri değiştirmeyi deneyin veya yeni bir tartışma başlatın.
              </EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button
                  onClick={() => {
                    setSearchQuery("")
                    setSelectedCategory(null)
                  }}
                  variant="outline"
                  className="font-[Manrope] font-bold"
                >
                  Filtreleri Temizle
                </Button>
                {canCreateTopic ? (
                  <Button
                    asChild
                    className="font-[Manrope] font-bold bg-primary text-white hover:bg-primary/90"
                  >
                    <Link href="/topic/new">Yeni Tartışma Başlat</Link>
                  </Button>
                ) : (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          disabled
                          className="font-[Manrope] font-bold bg-muted text-muted-foreground cursor-not-allowed opacity-50"
                        >
                          <Lock className="w-4 h-4 mr-2" />
                          Yeni Tartışma Başlat
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="font-[Manrope]">
                          Yeni başlık açmak için &quot;Gezgin&quot; veya üstü bir role sahip olmanız gerekiyor.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
              </div>
            </EmptyContent>
          </Empty>
        )}
      </div>
    </div>
  )
}

