"use client"

import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Empty, EmptyHeader, EmptyTitle, EmptyDescription, EmptyMedia } from "@/components/ui/empty"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, BookOpen, MessageCircle, User, Clock, TrendingUp, Filter, X } from "lucide-react"
import Link from "next/link"
import { Topic, Comment } from "@/lib/types"

const CATEGORIES = [
  { value: "all", label: "Tüm Kategoriler" },
  { value: "academic", label: "Akademik Destek" },
  { value: "social", label: "Sosyal Yaşam & Mekan" },
  { value: "housing", label: "Barınma & Yaşam" },
  { value: "career", label: "Kariyer & Gelişim" },
  { value: "discovery", label: "Konya Keşif" },
] as const

const DATE_FILTERS = [
  { value: "all", label: "Tüm Zamanlar" },
  { value: "24h", label: "Son 24 Saat" },
  { value: "7d", label: "Son Hafta" },
  { value: "30d", label: "Son Ay" },
  { value: "1y", label: "Son Yıl" },
] as const

const SORT_OPTIONS = [
  { value: "relevance", label: "En İlgili" },
  { value: "newest", label: "En Yeni" },
  { value: "popular", label: "En Popüler" },
  { value: "most_comments", label: "En Çok Yorum" },
] as const

export default function SearchPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [query, setQuery] = useState(searchParams.get("q") || "")
  const [activeTab, setActiveTab] = useState<"topics" | "comments" | "users">("topics")
  const [isLoading, setIsLoading] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [selectedDateFilter, setSelectedDateFilter] = useState<string>("all")
  const [selectedSort, setSelectedSort] = useState<string>("relevance")
  const [showFilters, setShowFilters] = useState(false)
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

  // localStorage'dan son aramaları yükle
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

  // URL'den kategori parametresini al
  useEffect(() => {
    const categoryParam = searchParams.get("category")
    if (categoryParam) {
      // Kategori mapping: hero tag'lerinden gelen kategorileri search kategorilerine çevir
      const categoryMap: Record<string, string> = {
        "yurt": "housing",
        "ders-notlari": "academic",
        "etkinlikler": "social",
        "sosyal-kulupler": "social",
      }
      const mappedCategory = categoryMap[categoryParam.toLowerCase()]
      if (mappedCategory) {
        setSelectedCategory(mappedCategory)
        // Kategori varsa otomatik arama yap
        handleSearch()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams])

  // Auto search on mount if query exists (kategori için ayrı useEffect var)
  useEffect(() => {
    const urlQuery = searchParams.get("q")
    if (urlQuery) {
      setQuery(urlQuery)
      handleSearch()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Tüm topic'leri discussion-feed'den al (mock data)
  const getAllTopics = (): Topic[] => {
    // topic-header.tsx'teki mockTopics ile aynı veriler
    return [
      { id: 1, title: "Lineer Cebir Dersi İçin Kaynak Önerisi", content: "Merhaba arkadaşlar, lineer cebir dersine çalışırken hangi kaynakları kullandınız?", category: "Akademik", createdAt: new Date(Date.now() - 5 * 60 * 1000).toISOString(), updatedAt: new Date(Date.now() - 5 * 60 * 1000).toISOString(), views: 850, likes: 12, comments: 8, tags: ["Lineer Cebir", "Matematik", "Ders Kaynağı"], author: { id: 1, name: "Ahmet Yılmaz", initials: "AY", role: "yeni_gelen" as const, totalCoins: 0, badges: [], xp: { current: 0, nextLevel: 500, progress: 0 }, joinedAt: new Date().toISOString() }, reliabilityScore: 88 },
      { id: 2, title: "Kampüse Yakın Uygun Fiyatlı Yurt", content: "Selam, önümüzdeki dönem için kampüse yakın ve uygun fiyatlı yurt arıyorum.", category: "Barınma", createdAt: new Date(Date.now() - 22 * 60 * 1000).toISOString(), updatedAt: new Date(Date.now() - 22 * 60 * 1000).toISOString(), views: 1200, likes: 24, comments: 15, tags: ["Yurt", "Barınma", "Kampüs"], author: { id: 2, name: "Zeynep Kaya", initials: "ZK", role: "gezgin" as const, totalCoins: 0, badges: [], xp: { current: 0, nextLevel: 500, progress: 0 }, joinedAt: new Date().toISOString() }, reliabilityScore: 85 },
      { id: 3, title: "Hafta Sonu Kampüste Aktiviteler", content: "Bu hafta sonu kampüste kalmayı düşünüyorum. Hafta sonu açık olan yerler veya düzenlenen etkinlikler var mı?", category: "Sosyal", createdAt: new Date(Date.now() - 60 * 60 * 1000).toISOString(), updatedAt: new Date(Date.now() - 60 * 60 * 1000).toISOString(), views: 950, likes: 18, comments: 12, tags: ["Aktivite", "Hafta Sonu", "Kampüs"], author: { id: 3, name: "Mehmet Demir", initials: "MD", role: "yeni_gelen" as const, totalCoins: 0, badges: [], xp: { current: 0, nextLevel: 500, progress: 0 }, joinedAt: new Date().toISOString() }, reliabilityScore: 82 },
      { id: 4, title: "Staj Başvuru Süreçleri", content: "2. sınıf öğrencisiyim ve yaz stajı için başvuru yapmayı planlıyorum.", category: "Akademik", createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), updatedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), views: 1450, likes: 31, comments: 19, tags: ["Staj", "Kariyer", "Başvuru"], author: { id: 4, name: "Ayşe Şahin", initials: "AŞ", role: "gezgin" as const, totalCoins: 0, badges: [], xp: { current: 0, nextLevel: 500, progress: 0 }, joinedAt: new Date().toISOString() }, reliabilityScore: 90 },
      { id: 5, title: "Öğrenci Kulüpleri ve Katılım", content: "Hangi öğrenci kulüplerine üyesiniz? Deneyimleriniz nasıl?", category: "Sosyal", createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(), updatedAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(), views: 1100, likes: 27, comments: 22, tags: ["Kulüp", "Etkinlik", "Sosyal"], author: { id: 5, name: "Can Özkan", initials: "CÖ", role: "gezgin" as const, totalCoins: 0, badges: [], xp: { current: 0, nextLevel: 500, progress: 0 }, joinedAt: new Date().toISOString() }, reliabilityScore: 87 },
      { id: 6, title: "Yazılım Mühendisliği Ders Notları", content: "Yazılım mühendisliği dersine ait notlarımı paylaşmak istiyorum.", category: "Akademik", createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(), updatedAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(), views: 2100, likes: 45, comments: 28, tags: ["Yazılım", "Ders Notu", "Mühendislik"], author: { id: 6, name: "Elif Arslan", initials: "EA", role: "seyyah" as const, totalCoins: 0, badges: [], xp: { current: 0, nextLevel: 500, progress: 0 }, joinedAt: new Date().toISOString() }, reliabilityScore: 92 },
      { id: 7, title: "Ev Arkadaşı Arıyorum - Selçuklu", content: "Selçuklu bölgesinde 2+1 dairede ev arkadaşı arıyorum.", category: "Barınma", createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(), updatedAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(), views: 680, likes: 8, comments: 14, tags: ["Ev Arkadaşı", "Selçuklu", "Kiralama"], author: { id: 7, name: "Burak Çelik", initials: "BÇ", role: "yeni_gelen" as const, totalCoins: 0, badges: [], xp: { current: 0, nextLevel: 500, progress: 0 }, joinedAt: new Date().toISOString() }, reliabilityScore: 80 },
      { id: 8, title: "Konya'da Öğrenci Dostu Kafeler", content: "Çalışmak için uygun, sessiz ve wifi olan kafe önerileri arıyorum.", category: "Sosyal", createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(), updatedAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(), views: 1850, likes: 52, comments: 35, tags: ["Kafe", "Çalışma", "Wifi"], author: { id: 8, name: "Selin Yıldız", initials: "SY", role: "gezgin" as const, totalCoins: 0, badges: [], xp: { current: 0, nextLevel: 500, progress: 0 }, joinedAt: new Date().toISOString() }, reliabilityScore: 89 },
      { id: 9, title: "Vize Haftası Çalışma Grubu", content: "Vize haftası için çalışma grubu oluşturmak istiyorum.", category: "Akademik", createdAt: new Date(Date.now() - 7 * 60 * 60 * 1000).toISOString(), updatedAt: new Date(Date.now() - 7 * 60 * 60 * 1000).toISOString(), views: 720, likes: 19, comments: 11, tags: ["Vize", "Çalışma Grubu", "Akademik"], author: { id: 9, name: "Murat Koç", initials: "MK", role: "yeni_gelen" as const, totalCoins: 0, badges: [], xp: { current: 0, nextLevel: 500, progress: 0 }, joinedAt: new Date().toISOString() }, reliabilityScore: 83 },
      { id: 10, title: "Part-time İş Fırsatları", content: "Öğrencilere uygun part-time iş fırsatları hakkında bilgi paylaşımı yapalım.", category: "Kariyer", createdAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(), updatedAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(), views: 1650, likes: 38, comments: 42, tags: ["Part-time", "İş", "Kariyer"], author: { id: 10, name: "Deniz Aydın", initials: "DA", role: "gezgin" as const, totalCoins: 0, badges: [], xp: { current: 0, nextLevel: 500, progress: 0 }, joinedAt: new Date().toISOString() }, reliabilityScore: 86 },
      { id: 11, title: "Erasmus Başvuru Deneyimleri", content: "Erasmus programına başvuru yapmayı düşünüyorum.", category: "Akademik", createdAt: new Date(Date.now() - 9 * 60 * 60 * 1000).toISOString(), updatedAt: new Date(Date.now() - 9 * 60 * 60 * 1000).toISOString(), views: 2450, likes: 67, comments: 54, tags: ["Erasmus", "Yurtdışı", "Başvuru"], author: { id: 11, name: "Gizem Aksoy", initials: "GA", role: "seyyah" as const, totalCoins: 0, badges: [], xp: { current: 0, nextLevel: 500, progress: 0 }, joinedAt: new Date().toISOString() }, reliabilityScore: 93 },
      { id: 12, title: "Meram'da Kiralık Daire Önerileri", content: "Meram bölgesinde öğrenciye uygun fiyatlı kiralık daire arıyorum.", category: "Barınma", createdAt: new Date(Date.now() - 10 * 60 * 60 * 1000).toISOString(), updatedAt: new Date(Date.now() - 10 * 60 * 60 * 1000).toISOString(), views: 980, likes: 15, comments: 23, tags: ["Meram", "Daire", "Kiralama"], author: { id: 12, name: "Emre Yılmaz", initials: "EY", role: "gezgin" as const, totalCoins: 0, badges: [], xp: { current: 0, nextLevel: 500, progress: 0 }, joinedAt: new Date().toISOString() }, reliabilityScore: 84 },
      { id: 13, title: "Fotoğrafçılık Kulübü Etkinlikleri", content: "Fotoğrafçılık kulübüne katılmak isteyenler için bu hafta sonu doğa yürüyüşü düzenliyoruz!", category: "Sosyal", createdAt: new Date(Date.now() - 11 * 60 * 60 * 1000).toISOString(), updatedAt: new Date(Date.now() - 11 * 60 * 60 * 1000).toISOString(), views: 1250, likes: 42, comments: 18, tags: ["Fotoğrafçılık", "Kulüp", "Etkinlik"], author: { id: 13, name: "Fatma Öztürk", initials: "FÖ", role: "gezgin" as const, totalCoins: 0, badges: [], xp: { current: 0, nextLevel: 500, progress: 0 }, joinedAt: new Date().toISOString() }, reliabilityScore: 88 },
      { id: 14, title: "Fizik 2 Çıkmış Sorular", content: "Son 5 yılın fizik 2 çıkmış sorularını derledim.", category: "Akademik", createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(), updatedAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(), views: 3200, likes: 89, comments: 67, tags: ["Fizik", "Çıkmış Soru", "Sınav"], author: { id: 14, name: "Oğuzhan Kara", initials: "OK", role: "seyyah" as const, totalCoins: 0, badges: [], xp: { current: 0, nextLevel: 500, progress: 0 }, joinedAt: new Date().toISOString() }, reliabilityScore: 95 },
      { id: 15, title: "CV Hazırlama İpuçları", content: "Staj başvuruları için etkili CV hazırlama konusunda deneyimlerimi paylaşmak istiyorum.", category: "Kariyer", createdAt: new Date(Date.now() - 13 * 60 * 60 * 1000).toISOString(), updatedAt: new Date(Date.now() - 13 * 60 * 60 * 1000).toISOString(), views: 1950, likes: 56, comments: 31, tags: ["CV", "Kariyer", "İş Başvurusu"], author: { id: 15, name: "Seda Demir", initials: "SD", role: "seyyah" as const, totalCoins: 0, badges: [], xp: { current: 0, nextLevel: 500, progress: 0 }, joinedAt: new Date().toISOString() }, reliabilityScore: 91 },
      { id: 16, title: "Basketbol Takımına Oyuncu Aranıyor", content: "Fakülte basketbol takımımıza yeni oyuncular arıyoruz.", category: "Sosyal", createdAt: new Date(Date.now() - 14 * 60 * 60 * 1000).toISOString(), updatedAt: new Date(Date.now() - 14 * 60 * 60 * 1000).toISOString(), views: 750, likes: 23, comments: 16, tags: ["Basketbol", "Spor", "Takım"], author: { id: 16, name: "Kerem Aydın", initials: "KA", role: "yeni_gelen" as const, totalCoins: 0, badges: [], xp: { current: 0, nextLevel: 500, progress: 0 }, joinedAt: new Date().toISOString() }, reliabilityScore: 81 },
      { id: 17, title: "Yurt Değişikliği Yapmak İstiyorum", content: "KYK yurdunda kalıyorum ama oda değiştirmek istiyorum.", category: "Barınma", createdAt: new Date(Date.now() - 15 * 60 * 60 * 1000).toISOString(), updatedAt: new Date(Date.now() - 15 * 60 * 60 * 1000).toISOString(), views: 580, likes: 11, comments: 19, tags: ["Yurt", "Değişiklik", "KYK"], author: { id: 17, name: "Merve Çelik", initials: "MÇ", role: "yeni_gelen" as const, totalCoins: 0, badges: [], xp: { current: 0, nextLevel: 500, progress: 0 }, joinedAt: new Date().toISOString() }, reliabilityScore: 79 },
      { id: 18, title: "Programlama Dersleri - Ücretsiz", content: "Python ve JavaScript dersleri vermek istiyorum.", category: "Akademik", createdAt: new Date(Date.now() - 16 * 60 * 60 * 1000).toISOString(), updatedAt: new Date(Date.now() - 16 * 60 * 60 * 1000).toISOString(), views: 3800, likes: 124, comments: 89, tags: ["Programlama", "Python", "JavaScript"], author: { id: 18, name: "Ali Rıza Güneş", initials: "AG", role: "konya_bilgesi" as const, totalCoins: 0, badges: [], xp: { current: 0, nextLevel: 500, progress: 0 }, joinedAt: new Date().toISOString() }, reliabilityScore: 96 },
      { id: 19, title: "Kitap Kulübü Oluşturalım", content: "Her ay bir kitap okuyup tartışacağımız bir kitap kulübü oluşturmak istiyorum.", category: "Sosyal", createdAt: new Date(Date.now() - 17 * 60 * 60 * 1000).toISOString(), updatedAt: new Date(Date.now() - 17 * 60 * 60 * 1000).toISOString(), views: 1350, likes: 47, comments: 38, tags: ["Kitap", "Kulüp", "Okuma"], author: { id: 19, name: "Büşra Yıldırım", initials: "BY", role: "gezgin" as const, totalCoins: 0, badges: [], xp: { current: 0, nextLevel: 500, progress: 0 }, joinedAt: new Date().toISOString() }, reliabilityScore: 87 },
      { id: 20, title: "Yazılım Stajı Deneyimlerim", content: "Bu yaz yaptığım yazılım stajı hakkında deneyimlerimi paylaşmak istiyorum.", category: "Kariyer", createdAt: new Date(Date.now() - 18 * 60 * 60 * 1000).toISOString(), updatedAt: new Date(Date.now() - 18 * 60 * 60 * 1000).toISOString(), views: 2200, likes: 73, comments: 52, tags: ["Staj", "Yazılım", "Deneyim"], author: { id: 20, name: "Hakan Özdemir", initials: "HÖ", role: "seyyah" as const, totalCoins: 0, badges: [], xp: { current: 0, nextLevel: 500, progress: 0 }, joinedAt: new Date().toISOString() }, reliabilityScore: 92 },
      { id: 21, title: "Eşya Satışı - Taşınıyorum", content: "Mezun oluyorum ve eşyalarımı satmak istiyorum.", category: "Barınma", createdAt: new Date(Date.now() - 19 * 60 * 60 * 1000).toISOString(), updatedAt: new Date(Date.now() - 19 * 60 * 60 * 1000).toISOString(), views: 520, likes: 14, comments: 27, tags: ["Eşya", "Satış", "Taşınma"], author: { id: 21, name: "Ceren Aktaş", initials: "CA", role: "yeni_gelen" as const, totalCoins: 0, badges: [], xp: { current: 0, nextLevel: 500, progress: 0 }, joinedAt: new Date().toISOString() }, reliabilityScore: 78 },
      { id: 22, title: "Matematik Olimpiyatları Hazırlık", content: "Üniversite matematik olimpiyatlarına hazırlananlar için çalışma grubu kuruyorum.", category: "Akademik", createdAt: new Date(Date.now() - 20 * 60 * 60 * 1000).toISOString(), updatedAt: new Date(Date.now() - 20 * 60 * 60 * 1000).toISOString(), views: 1050, likes: 35, comments: 21, tags: ["Matematik", "Olimpiyat", "Hazırlık"], author: { id: 22, name: "Tolga Şahin", initials: "TŞ", role: "gezgin" as const, totalCoins: 0, badges: [], xp: { current: 0, nextLevel: 500, progress: 0 }, joinedAt: new Date().toISOString() }, reliabilityScore: 86 },
      { id: 23, title: "Gönüllü Çalışma Fırsatları", content: "Konya'da öğrencilerin katılabileceği gönüllü çalışma ve sosyal sorumluluk projeleri hakkında bilgi paylaşalım.", category: "Sosyal", createdAt: new Date(Date.now() - 21 * 60 * 60 * 1000).toISOString(), updatedAt: new Date(Date.now() - 21 * 60 * 60 * 1000).toISOString(), views: 1550, likes: 58, comments: 44, tags: ["Gönüllü", "Sosyal Sorumluluk", "Proje"], author: { id: 23, name: "İrem Karaca", initials: "İK", role: "gezgin" as const, totalCoins: 0, badges: [], xp: { current: 0, nextLevel: 500, progress: 0 }, joinedAt: new Date().toISOString() }, reliabilityScore: 89 },
      { id: 24, title: "LinkedIn Profil Optimizasyonu", content: "İş başvurularında öne çıkmak için LinkedIn profilini nasıl optimize edebilirsin?", category: "Kariyer", createdAt: new Date(Date.now() - 22 * 60 * 60 * 1000).toISOString(), updatedAt: new Date(Date.now() - 22 * 60 * 60 * 1000).toISOString(), views: 2750, likes: 82, comments: 47, tags: ["LinkedIn", "Kariyer", "Profil"], author: { id: 24, name: "Ufuk Korkmaz", initials: "UK", role: "seyyah" as const, totalCoins: 0, badges: [], xp: { current: 0, nextLevel: 500, progress: 0 }, joinedAt: new Date().toISOString() }, reliabilityScore: 94 },
      { id: 25, title: "Diferansiyel Denklemler Ders Notları", content: "Diferansiyel denklemler dersine ait notlarımı paylaşmak istiyorum.", category: "Akademik", createdAt: new Date(Date.now() - 60 * 60 * 1000).toISOString(), updatedAt: new Date(Date.now() - 60 * 60 * 1000).toISOString(), views: 420, likes: 5, comments: 0, tags: ["Diferansiyel Denklemler", "Matematik", "Ders Notu"], author: { id: 25, name: "Serkan Yıldız", initials: "SY", role: "yeni_gelen" as const, totalCoins: 0, badges: [], xp: { current: 0, nextLevel: 500, progress: 0 }, joinedAt: new Date().toISOString() }, reliabilityScore: 77 },
      { id: 26, title: "Kampüs İçi Spor Salonu", content: "Kampüs içinde spor salonu var mı? Ücretli mi ücretsiz mi?", category: "Sosyal", createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(), updatedAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(), views: 380, likes: 8, comments: 0, tags: ["Spor", "Spor Salonu", "Kampüs"], author: { id: 26, name: "Gamze Kaya", initials: "GK", role: "yeni_gelen" as const, totalCoins: 0, badges: [], xp: { current: 0, nextLevel: 500, progress: 0 }, joinedAt: new Date().toISOString() }, reliabilityScore: 76 },
      { id: 27, title: "KYK Yurdu Başvuru Süreci", content: "KYK yurdu için başvuru nasıl yapılıyor? Gerekli belgeler neler?", category: "Barınma", createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(), updatedAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(), views: 650, likes: 12, comments: 0, tags: ["KYK", "Yurt", "Başvuru"], author: { id: 27, name: "Onur Demir", initials: "OD", role: "yeni_gelen" as const, totalCoins: 0, badges: [], xp: { current: 0, nextLevel: 500, progress: 0 }, joinedAt: new Date().toISOString() }, reliabilityScore: 83 },
    ]
  }

  // Kategori mapping: search kategorilerini topic kategorilerine çevir
  const mapCategoryToTopicCategory = (searchCategory: string): string | null => {
    const categoryMap: Record<string, string> = {
      "academic": "Akademik",
      "social": "Sosyal",
      "housing": "Barınma",
      "career": "Kariyer",
    }
    return categoryMap[searchCategory] || null
  }

  const handleSearch = async () => {
    // Eğer query yoksa ve kategori de "all" ise, arama yapma
    const trimmedQuery = query.trim()
    if (!trimmedQuery && selectedCategory === "all") {
      return
    }

    setIsLoading(true)
    try {
      // Son aramalara kaydet (sadece query varsa)
      if (trimmedQuery) {
        const updated = [trimmedQuery, ...recentSearches.filter(s => s !== trimmedQuery)].slice(0, 5)
        setRecentSearches(updated)
        localStorage.setItem("recentSearches", JSON.stringify(updated))
      }

      // Simüle edilmiş API çağrısı
      await new Promise((resolve) => setTimeout(resolve, 500))

      // Tüm topic'leri al
      let filteredTopics = getAllTopics()

      // Kategori filtresi
      if (selectedCategory !== "all") {
        const topicCategory = mapCategoryToTopicCategory(selectedCategory)
        if (topicCategory) {
          filteredTopics = filteredTopics.filter(topic => topic.category === topicCategory)
        }
      }

      // Query filtresi (eğer varsa)
      if (trimmedQuery) {
        filteredTopics = filteredTopics.filter((topic) =>
          topic.title.toLowerCase().includes(trimmedQuery.toLowerCase()) ||
          topic.content.toLowerCase().includes(trimmedQuery.toLowerCase()) ||
          topic.tags.some((tag) => tag.toLowerCase().includes(trimmedQuery.toLowerCase()))
        )
      }

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
        topics: filteredTopics,
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
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 lg:px-16 py-4 sm:py-6 md:py-8">
        {/* Search Header */}
        <div className="mb-4 sm:mb-6">
          <h1 className="font-[Manrope] text-foreground font-extrabold text-2xl sm:text-3xl md:text-4xl mb-3 sm:mb-4">
            Arama
          </h1>
          <form onSubmit={handleSubmit} className="relative">
            <div className="relative flex items-center bg-white dark:bg-card rounded-[20px] shadow-[0_4px_20px_rgba(0,0,0,0.06)] dark:shadow-lg">
              <Search className="absolute left-4 sm:left-6 w-5 h-5 sm:w-6 sm:h-6 text-primary" />
              <Input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Konuları, soruları, yorumları keşfet..."
                className="w-full h-[60px] pl-12 sm:pl-16 pr-28 sm:pr-32 bg-transparent rounded-[20px] font-[Manrope] font-medium text-foreground placeholder:text-foreground/40 dark:placeholder:text-muted-foreground focus:outline-none border-0 focus-visible:ring-0"
              />
              <Button
                type="submit"
                className="absolute right-2 h-[48px] px-6 sm:px-8 bg-primary hover:bg-primary/90 rounded-[16px] font-[Manrope] font-semibold text-white"
                disabled={isLoading}
              >
                {isLoading ? "Aranıyor..." : "Ara"}
              </Button>
            </div>
          </form>
        </div>

        {/* Filters and Tabs */}
        {query && (
          <div className="space-y-4 mb-4 sm:mb-6">
            {/* Filters */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
                className="font-[Manrope] font-bold text-xs sm:text-sm"
              >
                <Filter className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                Filtreler
                {(selectedCategory !== "all" || selectedDateFilter !== "all" || selectedSort !== "relevance") && (
                  <Badge className="ml-2 bg-primary text-primary-foreground">Aktif</Badge>
                )}
              </Button>
              
              {showFilters && (
                <div className="flex flex-wrap items-center gap-3 sm:gap-4 w-full sm:w-auto">
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="w-full sm:w-[180px] font-[Manrope] text-xs sm:text-sm">
                      <SelectValue placeholder="Kategori" />
                    </SelectTrigger>
                    <SelectContent>
                      {CATEGORIES.map((cat) => (
                        <SelectItem key={cat.value} value={cat.value}>
                          {cat.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select value={selectedDateFilter} onValueChange={setSelectedDateFilter}>
                    <SelectTrigger className="w-full sm:w-[150px] font-[Manrope] text-xs sm:text-sm">
                      <SelectValue placeholder="Tarih" />
                    </SelectTrigger>
                    <SelectContent>
                      {DATE_FILTERS.map((filter) => (
                        <SelectItem key={filter.value} value={filter.value}>
                          {filter.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select value={selectedSort} onValueChange={setSelectedSort}>
                    <SelectTrigger className="w-full sm:w-[150px] font-[Manrope] text-xs sm:text-sm">
                      <SelectValue placeholder="Sırala" />
                    </SelectTrigger>
                    <SelectContent>
                      {SORT_OPTIONS.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {(selectedCategory !== "all" || selectedDateFilter !== "all" || selectedSort !== "relevance") && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setSelectedCategory("all")
                        setSelectedDateFilter("all")
                        setSelectedSort("relevance")
                      }}
                      className="font-[Manrope] text-xs sm:text-sm"
                    >
                      <X className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                      Temizle
                    </Button>
                  )}
                </div>
              )}
            </div>

            {/* Tabs */}
            <div className="flex flex-wrap gap-2">
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
                              <h3 className="font-[Manrope] font-bold text-lg sm:text-xl text-foreground mb-2 hover:text-primary transition-colors">
                                {topic.title}
                              </h3>
                              <p className="font-[Manrope] text-sm text-foreground/70 dark:text-muted-foreground line-clamp-2 mb-3">
                                {topic.content}
                              </p>
                              <div className="flex items-center gap-4 text-xs text-foreground/60 dark:text-muted-foreground">
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
                              <span className="font-[Manrope] font-bold text-sm text-foreground">
                                {comment.author}
                              </span>
                              <span className="font-[Manrope] text-xs text-foreground/60 dark:text-muted-foreground">
                                {comment.timeAgo}
                              </span>
                            </div>
                            <p className="font-[Manrope] text-sm text-foreground mb-2">
                              {comment.content}
                            </p>
                            <div className="flex items-center gap-4 text-xs text-foreground/60 dark:text-muted-foreground">
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
                  <p className="font-[Manrope] text-foreground/60 dark:text-muted-foreground">
                    Kullanıcı arama özelliği yakında eklenecek
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            {/* Son Aramalar */}
            {recentSearches.length > 0 && (
              <Card>
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="font-[Manrope] font-bold text-lg text-foreground flex items-center gap-2">
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
                      className="font-[Manrope] text-xs text-foreground/60 dark:text-muted-foreground"
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

            {/* Popüler Aramalar */}
            <Card>
              <CardContent className="p-4 sm:p-6">
                <h2 className="font-[Manrope] font-bold text-lg text-foreground mb-4 flex items-center gap-2">
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

