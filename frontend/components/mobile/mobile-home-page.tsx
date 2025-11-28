"use client"

import { MobileNavbar } from "./mobile-navbar"
import { MobileSearchBar } from "./mobile-search-bar"
import { MobileTrendingCard } from "./mobile-trending-card"
import { MobileFeedCard } from "./mobile-feed-card"
import { MobileBottomNav } from "./mobile-bottom-nav"
import { useState } from "react"
import Link from "next/link"

interface MobileHomePageProps {
  onNavigateToTopic?: () => void
}

export function MobileHomePage({ onNavigateToTopic }: MobileHomePageProps) {
  const [activeTab, setActiveTab] = useState("home")

  const trendingTopics = [
    {
      id: "1",
      title: "Meram Kampüsü Yemekhane Fiyatları",
      category: "Sosyal",
      views: "2.4k",
      comments: 87,
      trend: "+12%",
    },
    {
      id: "2",
      title: "Veri Yapıları Final Hazırlık",
      category: "Akademik",
      views: "1.8k",
      comments: 124,
      trend: "+24%",
    },
    {
      id: "3",
      title: "En İyi Öğrenci Yurtları 2024",
      category: "Barınma",
      views: "3.2k",
      comments: 156,
      trend: "+8%",
    },
  ]

  const feedItems = [
    {
      id: "1",
      author: "Ahmet Yılmaz",
      authorInitials: "AY",
      category: "Akademik",
      title: "Lineer Cebir Dersi İçin Kaynak Önerisi",
      excerpt: "Merhaba arkadaşlar, lineer cebir dersine çalışırken hangi kaynakları kullandınız? Kitap veya video serisi öneriniz var mı?",
      timeAgo: "5 dk",
      likes: 12,
      comments: 8,
      views: "234",
    },
    {
      id: "2",
      author: "Zeynep Kaya",
      authorInitials: "ZK",
      category: "Sosyal",
      title: "Kampüste En İyi Çalışma Mekanları",
      excerpt: "Ders çalışmak için hangi kütüphaneleri veya kafeleri önerirsiniz? WiFi hızı ve sessizlik önemli.",
      timeAgo: "15 dk",
      likes: 28,
      comments: 15,
      views: "456",
    },
    {
      id: "3",
      author: "Mehmet Demir",
      authorInitials: "MD",
      category: "Barınma",
      title: "Yurt Başvuru Deneyimleri",
      excerpt: "KYK yurt başvurusu yapanlar deneyimlerini paylaşabilir mi? Başvuru süreci nasıl işliyor?",
      timeAgo: "1 sa",
      likes: 19,
      comments: 12,
      views: "312",
    },
    {
      id: "4",
      author: "Ayşe Şahin",
      authorInitials: "AŞ",
      category: "Akademik",
      title: "Staj Başvuru Süreçleri",
      excerpt: "2. sınıf öğrencisiyim ve yaz stajı için başvuru yapmayı planlıyorum. Deneyimlerinizi paylaşabilir misiniz?",
      timeAgo: "2 sa",
      likes: 31,
      comments: 19,
      views: "891",
    },
  ]

  return (
    <div className="min-h-screen bg-accent dark:bg-background pb-20 sm:pb-24">
      <MobileNavbar />
      <MobileSearchBar />

      {/* Trending Section */}
      <div className="px-4 py-4">
        <div className="flex items-center gap-2 mb-4">
          <h2 className="font-[Manrope] text-foreground font-bold text-base sm:text-lg">
            Trendler
          </h2>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
          {trendingTopics.map((topic) => (
            <MobileTrendingCard
              key={topic.id}
              {...topic}
              onClick={onNavigateToTopic}
            />
          ))}
        </div>
      </div>

      {/* Feed Section */}
      <div className="px-4 py-2">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-[Manrope] text-foreground font-bold text-base sm:text-lg">
            Son Tartışmalar
          </h2>
          <Link 
            href="/discussions"
            className="font-[Manrope] text-primary font-bold text-xs sm:text-sm hover:underline"
          >
            Tümü
          </Link>
        </div>
        <div className="space-y-3">
          {feedItems.map((item) => (
            <MobileFeedCard
              key={item.id}
              {...item}
              onClick={onNavigateToTopic}
            />
          ))}
        </div>
      </div>

      <MobileBottomNav activeTab={activeTab} onNavigate={setActiveTab} />
    </div>
  )
}

