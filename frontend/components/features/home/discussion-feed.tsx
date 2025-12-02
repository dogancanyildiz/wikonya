"use client"

import { memo, useState, useEffect } from "react"
import Link from "next/link"
import { useApp } from "@/contexts/app-context"
import { MessageCircle, ThumbsUp, Lightbulb, Clock, BookOpen, ChevronLeft, ChevronRight } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  getTopicStats,
  toggleTopicLike,
  toggleTopicMakesSense,
  isTopicLikedByUser,
  isTopicMakesSenseByUser,
  initializeTopicStats,
} from "@/lib/utils/topic-stats"
import { getTopicComments } from "@/components/features/topic/comment-feed"

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface DiscussionFeedProps {}

interface Discussion {
  id: number
  author: string
  authorInitials: string
  category: string
  title: string
  excerpt: string
  timeAgo: string
  likes: number
  makesSense: number
  comments: number
  isLiked: boolean
  isMakesSense: boolean
}

const allDiscussions: Discussion[] = [
  {
    id: 1,
    author: "Ahmet Yılmaz",
    authorInitials: "AY",
    category: "Akademik",
    title: "Lineer Cebir Dersi İçin Kaynak Önerisi",
    excerpt: "Merhaba arkadaşlar, lineer cebir dersine çalışırken hangi kaynakları kullandınız? Kitap veya video serisi öneriniz var mı?",
    timeAgo: "5 dakika önce",
    likes: 12,
    makesSense: 8,
    comments: 8,
    isLiked: false,
    isMakesSense: false,
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
    makesSense: 15,
    comments: 15,
    isLiked: false,
    isMakesSense: false,
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
    makesSense: 12,
    comments: 12,
    isLiked: false,
    isMakesSense: false,
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
    makesSense: 22,
    comments: 19,
    isLiked: false,
    isMakesSense: false,
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
    makesSense: 19,
    comments: 22,
    isLiked: false,
    isMakesSense: false,
  },
  {
    id: 6,
    author: "Elif Arslan",
    authorInitials: "EA",
    category: "Akademik",
    title: "Yazılım Mühendisliği Ders Notları",
    excerpt: "Yazılım mühendisliği dersine ait notlarımı paylaşmak istiyorum. İhtiyacı olan arkadaşlar için faydalı olabilir.",
    timeAgo: "4 saat önce",
    likes: 45,
    makesSense: 32,
    comments: 28,
    isLiked: false,
    isMakesSense: false,
  },
  {
    id: 7,
    author: "Burak Çelik",
    authorInitials: "BÇ",
    category: "Barınma",
    title: "Ev Arkadaşı Arıyorum - Selçuklu",
    excerpt: "Selçuklu bölgesinde 2+1 dairede ev arkadaşı arıyorum. Kira 3000 TL, faturalar dahil değil.",
    timeAgo: "5 saat önce",
    likes: 8,
    makesSense: 6,
    comments: 14,
    isLiked: false,
    isMakesSense: false,
  },
  {
    id: 8,
    author: "Selin Yıldız",
    authorInitials: "SY",
    category: "Sosyal",
    title: "Konya'da Öğrenci Dostu Kafeler",
    excerpt: "Çalışmak için uygun, sessiz ve wifi olan kafe önerileri arıyorum. Deneyimlerinizi paylaşır mısınız?",
    timeAgo: "6 saat önce",
    likes: 52,
    makesSense: 38,
    comments: 35,
    isLiked: false,
    isMakesSense: false,
  },
  {
    id: 9,
    author: "Murat Koç",
    authorInitials: "MK",
    category: "Akademik",
    title: "Vize Haftası Çalışma Grubu",
    excerpt: "Vize haftası için çalışma grubu oluşturmak istiyorum. İlgilenen arkadaşlar yazabilir mi?",
    timeAgo: "7 saat önce",
    likes: 19,
    makesSense: 14,
    comments: 11,
    isLiked: false,
    isMakesSense: false,
  },
  {
    id: 10,
    author: "Deniz Aydın",
    authorInitials: "DA",
    category: "Kariyer",
    title: "Part-time İş Fırsatları",
    excerpt: "Öğrencilere uygun part-time iş fırsatları hakkında bilgi paylaşımı yapalım. Başvurduğunuz yerler?",
    timeAgo: "8 saat önce",
    likes: 38,
    makesSense: 28,
    comments: 42,
    isLiked: false,
    isMakesSense: false,
  },
  {
    id: 11,
    author: "Gizem Aksoy",
    authorInitials: "GA",
    category: "Akademik",
    title: "Erasmus Başvuru Deneyimleri",
    excerpt: "Erasmus programına başvuru yapmayı düşünüyorum. Daha önce başvuranlar süreç hakkında bilgi verebilir mi?",
    timeAgo: "9 saat önce",
    likes: 67,
    makesSense: 48,
    comments: 54,
    isLiked: false,
    isMakesSense: false,
  },
  {
    id: 12,
    author: "Emre Yılmaz",
    authorInitials: "EY",
    category: "Barınma",
    title: "Meram'da Kiralık Daire Önerileri",
    excerpt: "Meram bölgesinde öğrenciye uygun fiyatlı kiralık daire arıyorum. Güvenli ve ulaşımı kolay olmalı.",
    timeAgo: "10 saat önce",
    likes: 15,
    makesSense: 11,
    comments: 23,
    isLiked: false,
    isMakesSense: false,
  },
  {
    id: 13,
    author: "Fatma Öztürk",
    authorInitials: "FÖ",
    category: "Sosyal",
    title: "Fotoğrafçılık Kulübü Etkinlikleri",
    excerpt: "Fotoğrafçılık kulübüne katılmak isteyenler için bu hafta sonu doğa yürüyüşü düzenliyoruz!",
    timeAgo: "11 saat önce",
    likes: 42,
    makesSense: 30,
    comments: 18,
    isLiked: false,
    isMakesSense: false,
  },
  {
    id: 14,
    author: "Oğuzhan Kara",
    authorInitials: "OK",
    category: "Akademik",
    title: "Fizik 2 Çıkmış Sorular",
    excerpt: "Son 5 yılın fizik 2 çıkmış sorularını derledim. İsteyen arkadaşlarla paylaşabilirim.",
    timeAgo: "12 saat önce",
    likes: 89,
    makesSense: 64,
    comments: 67,
    isLiked: false,
    isMakesSense: false,
  },
  {
    id: 15,
    author: "Seda Demir",
    authorInitials: "SD",
    category: "Kariyer",
    title: "CV Hazırlama İpuçları",
    excerpt: "Staj başvuruları için etkili CV hazırlama konusunda deneyimlerimi paylaşmak istiyorum.",
    timeAgo: "13 saat önce",
    likes: 56,
    makesSense: 40,
    comments: 31,
    isLiked: false,
    isMakesSense: false,
  },
  {
    id: 16,
    author: "Kerem Aydın",
    authorInitials: "KA",
    category: "Sosyal",
    title: "Basketbol Takımına Oyuncu Aranıyor",
    excerpt: "Fakülte basketbol takımımıza yeni oyuncular arıyoruz. İlgilenenler antrenman saatlerimize bekleriz.",
    timeAgo: "14 saat önce",
    likes: 23,
    makesSense: 17,
    comments: 16,
    isLiked: false,
    isMakesSense: false,
  },
  {
    id: 17,
    author: "Merve Çelik",
    authorInitials: "MÇ",
    category: "Barınma",
    title: "Yurt Değişikliği Yapmak İstiyorum",
    excerpt: "KYK yurdunda kalıyorum ama oda değiştirmek istiyorum. Süreç nasıl işliyor bilen var mı?",
    timeAgo: "15 saat önce",
    likes: 11,
    makesSense: 8,
    comments: 19,
    isLiked: false,
    isMakesSense: false,
  },
  {
    id: 18,
    author: "Ali Rıza Güneş",
    authorInitials: "AG",
    category: "Akademik",
    title: "Programlama Dersleri - Ücretsiz",
    excerpt: "Python ve JavaScript dersleri vermek istiyorum. İlgilenen arkadaşlar bu başlık altında toplanabiliriz.",
    timeAgo: "16 saat önce",
    likes: 124,
    makesSense: 89,
    comments: 89,
    isLiked: false,
    isMakesSense: false,
  },
  {
    id: 19,
    author: "Büşra Yıldırım",
    authorInitials: "BY",
    category: "Sosyal",
    title: "Kitap Kulübü Oluşturalım",
    excerpt: "Her ay bir kitap okuyup tartışacağımız bir kitap kulübü oluşturmak istiyorum. Katılmak isteyen?",
    timeAgo: "17 saat önce",
    likes: 47,
    makesSense: 34,
    comments: 38,
    isLiked: false,
    isMakesSense: false,
  },
  {
    id: 20,
    author: "Hakan Özdemir",
    authorInitials: "HÖ",
    category: "Kariyer",
    title: "Yazılım Stajı Deneyimlerim",
    excerpt: "Bu yaz yaptığım yazılım stajı hakkında deneyimlerimi paylaşmak istiyorum. Sorularınızı alayım.",
    timeAgo: "18 saat önce",
    likes: 73,
    makesSense: 52,
    comments: 52,
    isLiked: false,
    isMakesSense: false,
  },
  {
    id: 21,
    author: "Ceren Aktaş",
    authorInitials: "CA",
    category: "Barınma",
    title: "Eşya Satışı - Taşınıyorum",
    excerpt: "Mezun oluyorum ve eşyalarımı satmak istiyorum. Masa, sandalye, kitaplık uygun fiyata.",
    timeAgo: "19 saat önce",
    likes: 14,
    makesSense: 10,
    comments: 27,
    isLiked: false,
    isMakesSense: false,
  },
  {
    id: 22,
    author: "Tolga Şahin",
    authorInitials: "TŞ",
    category: "Akademik",
    title: "Matematik Olimpiyatları Hazırlık",
    excerpt: "Üniversite matematik olimpiyatlarına hazırlananlar için çalışma grubu kuruyorum.",
    timeAgo: "20 saat önce",
    likes: 35,
    makesSense: 25,
    comments: 21,
    isLiked: false,
    isMakesSense: false,
  },
  {
    id: 23,
    author: "İrem Karaca",
    authorInitials: "İK",
    category: "Sosyal",
    title: "Gönüllü Çalışma Fırsatları",
    excerpt: "Konya'da öğrencilerin katılabileceği gönüllü çalışma ve sosyal sorumluluk projeleri hakkında bilgi paylaşalım.",
    timeAgo: "21 saat önce",
    likes: 58,
    makesSense: 41,
    comments: 44,
    isLiked: false,
    isMakesSense: false,
  },
  {
    id: 24,
    author: "Ufuk Korkmaz",
    authorInitials: "UK",
    category: "Kariyer",
    title: "LinkedIn Profil Optimizasyonu",
    excerpt: "İş başvurularında öne çıkmak için LinkedIn profilini nasıl optimize edebilirsin? Tecrübelerimi paylaşıyorum.",
    timeAgo: "22 saat önce",
    likes: 82,
    makesSense: 58,
    comments: 47,
    isLiked: false,
    isMakesSense: false,
  },
  {
    id: 25,
    author: "Serkan Yıldız",
    authorInitials: "SY",
    category: "Akademik",
    title: "Diferansiyel Denklemler Ders Notları",
    excerpt: "Diferansiyel denklemler dersine ait notlarımı paylaşmak istiyorum. İhtiyacı olan var mı?",
    timeAgo: "1 saat önce",
    likes: 5,
    makesSense: 3,
    comments: 0,
    isLiked: false,
    isMakesSense: false,
  },
  {
    id: 26,
    author: "Gamze Kaya",
    authorInitials: "GK",
    category: "Sosyal",
    title: "Kampüs İçi Spor Salonu",
    excerpt: "Kampüs içinde spor salonu var mı? Ücretli mi ücretsiz mi? Deneyimi olan var mı?",
    timeAgo: "3 saat önce",
    likes: 8,
    makesSense: 5,
    comments: 0,
    isLiked: false,
    isMakesSense: false,
  },
  {
    id: 27,
    author: "Onur Demir",
    authorInitials: "OD",
    category: "Barınma",
    title: "KYK Yurdu Başvuru Süreci",
    excerpt: "KYK yurdu için başvuru nasıl yapılıyor? Gerekli belgeler neler? Deneyimi olan paylaşabilir mi?",
    timeAgo: "6 saat önce",
    likes: 12,
    makesSense: 8,
    comments: 0,
    isLiked: false,
    isMakesSense: false,
  },
]

const ITEMS_PER_PAGE = 8

export const DiscussionFeed = memo(function DiscussionFeed({}: DiscussionFeedProps) {
  const { state } = useApp()
  const [currentPage, setCurrentPage] = useState(1)
  const [localDiscussions, setLocalDiscussions] = useState<Discussion[]>([])
  const [animations, setAnimations] = useState<{ [key: string]: boolean }>({})
  const [filter, setFilter] = useState<"newest" | "popular" | "unanswered">("newest")

  // Initialize discussions with stats from localStorage
  useEffect(() => {
    const discussionsWithStats = allDiscussions.map(discussion => {
      const stats = getTopicStats(discussion.id)
      const isLiked = state.user ? isTopicLikedByUser(discussion.id, state.user) : false
      const isMakesSense = state.user ? isTopicMakesSenseByUser(discussion.id, state.user) : false
      
      // Gerçek yorum sayısını hesapla
      const realCommentCount = getTopicComments(discussion.id).length
      
      // Initialize stats if not exists
      if (stats.likes === 0 && stats.makesSense === 0 && stats.comments === 0) {
        initializeTopicStats(discussion.id, {
          likes: discussion.likes,
          makesSense: discussion.makesSense,
          comments: realCommentCount,
        })
      }

      return {
        ...discussion,
        likes: stats.likes || discussion.likes,
        makesSense: stats.makesSense || discussion.makesSense,
        comments: realCommentCount, // Gerçek yorum sayısını kullan
        isLiked,
        isMakesSense,
      }
    })
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLocalDiscussions(discussionsWithStats)
  }, [state.user])
  
  // Filtreleme ve sıralama
  const filteredAndSortedDiscussions = [...localDiscussions].filter(discussion => {
    if (filter === "unanswered") {
      return discussion.comments === 0
    }
    return true
  }).sort((a, b) => {
    if (filter === "newest") {
      // En yeni - id'ye göre (daha yüksek id = daha yeni)
      return b.id - a.id
    } else if (filter === "popular") {
      // En popüler - likes'a göre
      return b.likes - a.likes
    }
    return 0
  })
  
  const totalPages = Math.ceil(filteredAndSortedDiscussions.length / ITEMS_PER_PAGE)
  
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const discussions = filteredAndSortedDiscussions.slice(startIndex, startIndex + ITEMS_PER_PAGE)
  
  // Filtre değiştiğinde sayfayı sıfırla
  const handleFilterChange = (newFilter: "newest" | "popular" | "unanswered") => {
    setFilter(newFilter)
    setCurrentPage(1)
  }

  const handleLike = (discussionId: number, e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (!state.user) return

    const discussion = localDiscussions.find(d => d.id === discussionId)
    if (!discussion) return

    const isLiked = discussion.isLiked || false
    const newIsLiked = !isLiked

    if (newIsLiked) {
      const animationKey = `like-${discussionId}`
      setAnimations({ ...animations, [animationKey]: true })
      setTimeout(() => {
        setAnimations({ ...animations, [animationKey]: false })
      }, 600)
    }

    // Update in localStorage
    const newLikes = toggleTopicLike(discussionId, state.user, discussion.likes)

    setLocalDiscussions(localDiscussions.map(d => 
      d.id === discussionId 
        ? { ...d, likes: newLikes, isLiked: newIsLiked }
        : d
    ))
  }

  const handleMakesSense = (discussionId: number, e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (!state.user) return

    const discussion = localDiscussions.find(d => d.id === discussionId)
    if (!discussion) return

    const isMakesSense = discussion.isMakesSense || false
    const newIsMakesSense = !isMakesSense

    if (newIsMakesSense) {
      const animationKey = `logical-${discussionId}`
      setAnimations({ ...animations, [animationKey]: true })
      setTimeout(() => {
        setAnimations({ ...animations, [animationKey]: false })
      }, 600)
    }

    // Update in localStorage
    const newMakesSense = toggleTopicMakesSense(discussionId, state.user, discussion.makesSense)

    setLocalDiscussions(localDiscussions.map(d => 
      d.id === discussionId 
        ? { ...d, makesSense: newMakesSense, isMakesSense: newIsMakesSense }
        : d
    ))
  }

  return (
    <section>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <h2 className="font-[Manrope] font-bold text-foreground text-xl sm:text-2xl">Yeni Tartışmalar</h2>
        <div className="flex items-center gap-2 flex-wrap">
          <Button 
            onClick={() => handleFilterChange("newest")}
            aria-label="En yeni başlıkları göster"
            variant={filter === "newest" ? "default" : "outline"}
            className={`font-[Manrope] font-semibold ${
              filter === "newest" 
                ? "bg-primary text-primary-foreground hover:bg-primary/90" 
                : "hover:bg-primary/10 dark:hover:bg-primary/20"
            }`}
          >
            Yeni
          </Button>
          <Button 
            onClick={() => handleFilterChange("popular")}
            aria-label="En popüler başlıkları göster"
            variant={filter === "popular" ? "default" : "outline"}
            className={`font-[Manrope] font-semibold ${
              filter === "popular" 
                ? "bg-primary text-primary-foreground hover:bg-primary/90" 
                : "hover:bg-primary/10 dark:hover:bg-primary/20"
            }`}
          >
            Popüler
          </Button>
          <Button 
            onClick={() => handleFilterChange("unanswered")}
            aria-label="Yanıtsız başlıkları göster"
            variant={filter === "unanswered" ? "default" : "outline"}
            className={`font-[Manrope] font-semibold ${
              filter === "unanswered" 
                ? "bg-primary text-primary-foreground hover:bg-primary/90" 
                : "hover:bg-primary/10 dark:hover:bg-primary/20"
            }`}
          >
            Cevaplanmamış
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {discussions.map((discussion) => (
          <Link key={discussion.id} href={`/topic/${discussion.id}`} className="block">
          <Card
            className="hover:shadow-lg transition-all duration-200 cursor-pointer group border-border"
          >
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-start gap-4">
                <Avatar className="w-10 h-10 sm:w-12 sm:h-12 border-2 border-border">
                  <AvatarFallback className="bg-primary text-primary-foreground font-[Manrope] font-bold">
                    {discussion.authorInitials}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2">
                    <span className="font-[Manrope] font-bold text-foreground text-sm sm:text-base">
                      {discussion.author}
                    </span>
                    <span className="px-3 py-1 bg-accent rounded-full font-[Manrope] font-semibold text-primary text-xs sm:text-sm">
                      {discussion.category}
                    </span>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      <span className="font-[Manrope] font-medium text-xs sm:text-sm">{discussion.timeAgo}</span>
                    </div>
                  </div>

                  <h3 className="font-[Manrope] font-bold text-foreground mb-2 group-hover:text-primary transition-colors text-sm sm:text-base">
                    {discussion.title}
                  </h3>

                  <p className="font-[Manrope] font-medium text-muted-foreground mb-4 text-sm sm:text-base line-clamp-2">
                    {discussion.excerpt}
                  </p>

                  <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-border">
                    <button 
                      onClick={(e) => handleLike(discussion.id, e)}
                      className={`relative flex items-center gap-2 px-3 py-2 bg-accent rounded-lg hover:bg-primary/10 dark:hover:bg-primary/20 transition-colors ${
                        discussion.isLiked ? 'bg-primary/10 dark:bg-primary/20' : ''
                      }`}
                      aria-label={`${discussion.likes} beğeni`}
                    >
                      <ThumbsUp className={`w-4 h-4 text-primary ${discussion.isLiked ? 'fill-primary' : ''}`} />
                      <span className="font-[Manrope] font-bold text-sm text-foreground">{discussion.likes}</span>
                      {animations[`like-${discussion.id}`] && (
                        <span className="absolute -top-1 -right-1 bg-primary text-white text-xs font-bold px-1.5 py-0.5 rounded-full animate-bounce">
                          +1
                        </span>
                      )}
                    </button>
                    <button 
                      onClick={(e) => handleMakesSense(discussion.id, e)}
                      className={`relative flex items-center gap-2 px-3 py-2 bg-accent rounded-lg hover:bg-primary/10 dark:hover:bg-primary/20 transition-colors ${
                        discussion.isMakesSense ? 'bg-primary/10 dark:bg-primary/20' : ''
                      }`}
                      aria-label={`${discussion.makesSense} mantıklı`}
                    >
                      <Lightbulb className={`w-4 h-4 text-primary ${discussion.isMakesSense ? 'fill-primary' : ''}`} />
                      <span className="font-[Manrope] font-bold text-sm text-foreground">{discussion.makesSense}</span>
                      <span className="font-[Manrope] font-medium text-xs text-foreground/60 dark:text-muted-foreground hidden sm:inline">Mantıklı</span>
                      {animations[`logical-${discussion.id}`] && (
                        <span className="absolute -top-1 -right-1 bg-primary text-white text-xs font-bold px-1.5 py-0.5 rounded-full animate-bounce">
                          +1
                        </span>
                      )}
                    </button>
                    <button 
                      className="flex items-center gap-2 px-3 py-2 bg-accent rounded-lg hover:bg-primary/10 dark:hover:bg-primary/20 transition-colors"
                      aria-label={`${discussion.comments} yorum`}
                    >
                      <MessageCircle className="w-4 h-4 text-primary" />
                      <span className="font-[Manrope] font-bold text-sm text-foreground">{discussion.comments}</span>
                    </button>
                    <button 
                      className="flex items-center gap-2 text-foreground/60 dark:text-muted-foreground hover:text-primary transition-colors ml-auto"
                      aria-label="Devamını oku"
                    >
                      <BookOpen className="w-4 h-4" />
                      <span className="font-[Manrope] font-semibold text-xs sm:text-sm">Devamını Oku</span>
                    </button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          </Link>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-6 sm:mt-8">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
          disabled={currentPage === 1}
            className="h-9 px-3 rounded-lg font-[Manrope] font-semibold text-xs border border-border disabled:opacity-50"
        >
            <ChevronLeft className="w-4 h-4" />
        </Button>
        
        <div className="flex items-center gap-1">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <Button
              key={page}
                variant="ghost"
              size="sm"
              onClick={() => setCurrentPage(page)}
                className={`h-9 w-9 rounded-lg font-[Manrope] font-bold text-sm
                  ${currentPage === page
                    ? 'bg-primary text-white hover:bg-primary/90'
                    : 'text-foreground/70 hover:text-foreground hover:bg-accent'
                  }
                `}
            >
              {page}
            </Button>
          ))}
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
          disabled={currentPage === totalPages}
            className="h-9 px-3 rounded-lg font-[Manrope] font-semibold text-xs border border-border disabled:opacity-50"
        >
            <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
      )}
    </section>
  )
})

