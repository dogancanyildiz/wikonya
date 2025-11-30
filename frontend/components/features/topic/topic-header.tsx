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

// Mock topics data - ana sayfadaki tüm discussion'ları içerir
// Gerçek uygulamada API'den gelecek
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
  excerpt: string
  likes: number
  makesSense: number
}> = [
  {
    id: 1,
    title: "Lineer Cebir Dersi İçin Kaynak Önerisi",
    category: "Akademik",
    views: 850,
    comments: 8,
    tags: ["Lineer Cebir", "Matematik", "Ders Kaynağı"],
    reliabilityScore: 88,
    createdAt: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
    author: { id: 1, name: "Ahmet Yılmaz", initials: "AY", role: "yeni_gelen" },
    excerpt: "Merhaba arkadaşlar, lineer cebir dersine çalışırken hangi kaynakları kullandınız? Kitap veya video serisi öneriniz var mı?",
    likes: 12,
    makesSense: 8,
  },
  {
    id: 2,
    title: "Kampüse Yakın Uygun Fiyatlı Yurt",
    category: "Barınma",
    views: 1200,
    comments: 15,
    tags: ["Yurt", "Barınma", "Kampüs"],
    reliabilityScore: 85,
    createdAt: new Date(Date.now() - 22 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 22 * 60 * 1000).toISOString(),
    author: { id: 2, name: "Zeynep Kaya", initials: "ZK", role: "gezgin" },
    excerpt: "Selam, önümüzdeki dönem için kampüse yakın ve uygun fiyatlı yurt arıyorum. Deneyimi olan var mı?",
    likes: 24,
    makesSense: 15,
  },
  {
    id: 3,
    title: "Hafta Sonu Kampüste Aktiviteler",
    category: "Sosyal",
    views: 950,
    comments: 12,
    tags: ["Aktivite", "Hafta Sonu", "Kampüs"],
    reliabilityScore: 82,
    createdAt: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
    author: { id: 3, name: "Mehmet Demir", initials: "MD", role: "yeni_gelen" },
    excerpt: "Bu hafta sonu kampüste kalmayı düşünüyorum. Hafta sonu açık olan yerler veya düzenlenen etkinlikler var mı?",
    likes: 18,
    makesSense: 12,
  },
  {
    id: 4,
    title: "Staj Başvuru Süreçleri",
    category: "Akademik",
    views: 1450,
    comments: 19,
    tags: ["Staj", "Kariyer", "Başvuru"],
    reliabilityScore: 90,
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    author: { id: 4, name: "Ayşe Şahin", initials: "AŞ", role: "gezgin" },
    excerpt: "2. sınıf öğrencisiyim ve yaz stajı için başvuru yapmayı planlıyorum. Deneyimlerinizi paylaşabilir misiniz?",
    likes: 31,
    makesSense: 22,
  },
  {
    id: 5,
    title: "Öğrenci Kulüpleri ve Katılım",
    category: "Sosyal",
    views: 1100,
    comments: 22,
    tags: ["Kulüp", "Etkinlik", "Sosyal"],
    reliabilityScore: 87,
    createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    author: { id: 5, name: "Can Özkan", initials: "CÖ", role: "gezgin" },
    excerpt: "Hangi öğrenci kulüplerine üyesiniz? Deneyimleriniz nasıl? Yeni katılmak isteyenlere önerileriniz neler?",
    likes: 27,
    makesSense: 19,
  },
  {
    id: 6,
    title: "Yazılım Mühendisliği Ders Notları",
    category: "Akademik",
    views: 2100,
    comments: 28,
    tags: ["Yazılım", "Ders Notu", "Mühendislik"],
    reliabilityScore: 92,
    createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    author: { id: 6, name: "Elif Arslan", initials: "EA", role: "seyyah" },
    excerpt: "Yazılım mühendisliği dersine ait notlarımı paylaşmak istiyorum. İhtiyacı olan arkadaşlar için faydalı olabilir.",
    likes: 45,
    makesSense: 32,
  },
  {
    id: 7,
    title: "Ev Arkadaşı Arıyorum - Selçuklu",
    category: "Barınma",
    views: 680,
    comments: 14,
    tags: ["Ev Arkadaşı", "Selçuklu", "Kiralama"],
    reliabilityScore: 80,
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    author: { id: 7, name: "Burak Çelik", initials: "BÇ", role: "yeni_gelen" },
    excerpt: "Selçuklu bölgesinde 2+1 dairede ev arkadaşı arıyorum. Kira 3000 TL, faturalar dahil değil.",
    likes: 8,
    makesSense: 6,
  },
  {
    id: 8,
    title: "Konya'da Öğrenci Dostu Kafeler",
    category: "Sosyal",
    views: 1850,
    comments: 35,
    tags: ["Kafe", "Çalışma", "Wifi"],
    reliabilityScore: 89,
    createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    author: { id: 8, name: "Selin Yıldız", initials: "SY", role: "gezgin" },
    excerpt: "Çalışmak için uygun, sessiz ve wifi olan kafe önerileri arıyorum. Deneyimlerinizi paylaşır mısınız?",
    likes: 52,
    makesSense: 38,
  },
  {
    id: 9,
    title: "Vize Haftası Çalışma Grubu",
    category: "Akademik",
    views: 720,
    comments: 11,
    tags: ["Vize", "Çalışma Grubu", "Akademik"],
    reliabilityScore: 83,
    createdAt: new Date(Date.now() - 7 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 7 * 60 * 60 * 1000).toISOString(),
    author: { id: 9, name: "Murat Koç", initials: "MK", role: "yeni_gelen" },
    excerpt: "Vize haftası için çalışma grubu oluşturmak istiyorum. İlgilenen arkadaşlar yazabilir mi?",
    likes: 19,
    makesSense: 14,
  },
  {
    id: 10,
    title: "Part-time İş Fırsatları",
    category: "Kariyer",
    views: 1650,
    comments: 42,
    tags: ["Part-time", "İş", "Kariyer"],
    reliabilityScore: 86,
    createdAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
    author: { id: 10, name: "Deniz Aydın", initials: "DA", role: "gezgin" },
    excerpt: "Öğrencilere uygun part-time iş fırsatları hakkında bilgi paylaşımı yapalım. Başvurduğunuz yerler?",
    likes: 38,
    makesSense: 28,
  },
  {
    id: 11,
    title: "Erasmus Başvuru Deneyimleri",
    category: "Akademik",
    views: 2450,
    comments: 54,
    tags: ["Erasmus", "Yurtdışı", "Başvuru"],
    reliabilityScore: 93,
    createdAt: new Date(Date.now() - 9 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 9 * 60 * 60 * 1000).toISOString(),
    author: { id: 11, name: "Gizem Aksoy", initials: "GA", role: "seyyah" },
    excerpt: "Erasmus programına başvuru yapmayı düşünüyorum. Daha önce başvuranlar süreç hakkında bilgi verebilir mi?",
    likes: 67,
    makesSense: 48,
  },
  {
    id: 12,
    title: "Meram'da Kiralık Daire Önerileri",
    category: "Barınma",
    views: 980,
    comments: 23,
    tags: ["Meram", "Daire", "Kiralama"],
    reliabilityScore: 84,
    createdAt: new Date(Date.now() - 10 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 10 * 60 * 60 * 1000).toISOString(),
    author: { id: 12, name: "Emre Yılmaz", initials: "EY", role: "gezgin" },
    excerpt: "Meram bölgesinde öğrenciye uygun fiyatlı kiralık daire arıyorum. Güvenli ve ulaşımı kolay olmalı.",
    likes: 15,
    makesSense: 11,
  },
  {
    id: 13,
    title: "Fotoğrafçılık Kulübü Etkinlikleri",
    category: "Sosyal",
    views: 1250,
    comments: 18,
    tags: ["Fotoğrafçılık", "Kulüp", "Etkinlik"],
    reliabilityScore: 88,
    createdAt: new Date(Date.now() - 11 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 11 * 60 * 60 * 1000).toISOString(),
    author: { id: 13, name: "Fatma Öztürk", initials: "FÖ", role: "gezgin" },
    excerpt: "Fotoğrafçılık kulübüne katılmak isteyenler için bu hafta sonu doğa yürüyüşü düzenliyoruz!",
    likes: 42,
    makesSense: 30,
  },
  {
    id: 14,
    title: "Fizik 2 Çıkmış Sorular",
    category: "Akademik",
    views: 3200,
    comments: 67,
    tags: ["Fizik", "Çıkmış Soru", "Sınav"],
    reliabilityScore: 95,
    createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
    author: { id: 14, name: "Oğuzhan Kara", initials: "OK", role: "seyyah" },
    excerpt: "Son 5 yılın fizik 2 çıkmış sorularını derledim. İsteyen arkadaşlarla paylaşabilirim.",
    likes: 89,
    makesSense: 64,
  },
  {
    id: 15,
    title: "CV Hazırlama İpuçları",
    category: "Kariyer",
    views: 1950,
    comments: 31,
    tags: ["CV", "Kariyer", "İş Başvurusu"],
    reliabilityScore: 91,
    createdAt: new Date(Date.now() - 13 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 13 * 60 * 60 * 1000).toISOString(),
    author: { id: 15, name: "Seda Demir", initials: "SD", role: "seyyah" },
    excerpt: "Staj başvuruları için etkili CV hazırlama konusunda deneyimlerimi paylaşmak istiyorum.",
    likes: 56,
    makesSense: 40,
  },
  {
    id: 16,
    title: "Basketbol Takımına Oyuncu Aranıyor",
    category: "Sosyal",
    views: 750,
    comments: 16,
    tags: ["Basketbol", "Spor", "Takım"],
    reliabilityScore: 81,
    createdAt: new Date(Date.now() - 14 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 14 * 60 * 60 * 1000).toISOString(),
    author: { id: 16, name: "Kerem Aydın", initials: "KA", role: "yeni_gelen" },
    excerpt: "Fakülte basketbol takımımıza yeni oyuncular arıyoruz. İlgilenenler antrenman saatlerimize bekleriz.",
    likes: 23,
    makesSense: 17,
  },
  {
    id: 17,
    title: "Yurt Değişikliği Yapmak İstiyorum",
    category: "Barınma",
    views: 580,
    comments: 19,
    tags: ["Yurt", "Değişiklik", "KYK"],
    reliabilityScore: 79,
    createdAt: new Date(Date.now() - 15 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 15 * 60 * 60 * 1000).toISOString(),
    author: { id: 17, name: "Merve Çelik", initials: "MÇ", role: "yeni_gelen" },
    excerpt: "KYK yurdunda kalıyorum ama oda değiştirmek istiyorum. Süreç nasıl işliyor bilen var mı?",
    likes: 11,
    makesSense: 8,
  },
  {
    id: 18,
    title: "Programlama Dersleri - Ücretsiz",
    category: "Akademik",
    views: 3800,
    comments: 89,
    tags: ["Programlama", "Python", "JavaScript"],
    reliabilityScore: 96,
    createdAt: new Date(Date.now() - 16 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 16 * 60 * 60 * 1000).toISOString(),
    author: { id: 18, name: "Ali Rıza Güneş", initials: "AG", role: "konya_bilgesi" },
    excerpt: "Python ve JavaScript dersleri vermek istiyorum. İlgilenen arkadaşlar bu başlık altında toplanabiliriz.",
    likes: 124,
    makesSense: 89,
  },
  {
    id: 19,
    title: "Kitap Kulübü Oluşturalım",
    category: "Sosyal",
    views: 1350,
    comments: 38,
    tags: ["Kitap", "Kulüp", "Okuma"],
    reliabilityScore: 87,
    createdAt: new Date(Date.now() - 17 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 17 * 60 * 60 * 1000).toISOString(),
    author: { id: 19, name: "Büşra Yıldırım", initials: "BY", role: "gezgin" },
    excerpt: "Her ay bir kitap okuyup tartışacağımız bir kitap kulübü oluşturmak istiyorum. Katılmak isteyen?",
    likes: 47,
    makesSense: 34,
  },
  {
    id: 20,
    title: "Yazılım Stajı Deneyimlerim",
    category: "Kariyer",
    views: 2200,
    comments: 52,
    tags: ["Staj", "Yazılım", "Deneyim"],
    reliabilityScore: 92,
    createdAt: new Date(Date.now() - 18 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 18 * 60 * 60 * 1000).toISOString(),
    author: { id: 20, name: "Hakan Özdemir", initials: "HÖ", role: "seyyah" },
    excerpt: "Bu yaz yaptığım yazılım stajı hakkında deneyimlerimi paylaşmak istiyorum. Sorularınızı alayım.",
    likes: 73,
    makesSense: 52,
  },
  {
    id: 21,
    title: "Eşya Satışı - Taşınıyorum",
    category: "Barınma",
    views: 520,
    comments: 27,
    tags: ["Eşya", "Satış", "Taşınma"],
    reliabilityScore: 78,
    createdAt: new Date(Date.now() - 19 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 19 * 60 * 60 * 1000).toISOString(),
    author: { id: 21, name: "Ceren Aktaş", initials: "CA", role: "yeni_gelen" },
    excerpt: "Mezun oluyorum ve eşyalarımı satmak istiyorum. Masa, sandalye, kitaplık uygun fiyata.",
    likes: 14,
    makesSense: 10,
  },
  {
    id: 22,
    title: "Matematik Olimpiyatları Hazırlık",
    category: "Akademik",
    views: 1050,
    comments: 21,
    tags: ["Matematik", "Olimpiyat", "Hazırlık"],
    reliabilityScore: 86,
    createdAt: new Date(Date.now() - 20 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 20 * 60 * 60 * 1000).toISOString(),
    author: { id: 22, name: "Tolga Şahin", initials: "TŞ", role: "gezgin" },
    excerpt: "Üniversite matematik olimpiyatlarına hazırlananlar için çalışma grubu kuruyorum.",
    likes: 35,
    makesSense: 25,
  },
  {
    id: 23,
    title: "Gönüllü Çalışma Fırsatları",
    category: "Sosyal",
    views: 1550,
    comments: 44,
    tags: ["Gönüllü", "Sosyal Sorumluluk", "Proje"],
    reliabilityScore: 89,
    createdAt: new Date(Date.now() - 21 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 21 * 60 * 60 * 1000).toISOString(),
    author: { id: 23, name: "İrem Karaca", initials: "İK", role: "gezgin" },
    excerpt: "Konya'da öğrencilerin katılabileceği gönüllü çalışma ve sosyal sorumluluk projeleri hakkında bilgi paylaşalım.",
    likes: 58,
    makesSense: 41,
  },
  {
    id: 24,
    title: "LinkedIn Profil Optimizasyonu",
    category: "Kariyer",
    views: 2750,
    comments: 47,
    tags: ["LinkedIn", "Kariyer", "Profil"],
    reliabilityScore: 94,
    createdAt: new Date(Date.now() - 22 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 22 * 60 * 60 * 1000).toISOString(),
    author: { id: 24, name: "Ufuk Korkmaz", initials: "UK", role: "seyyah" },
    excerpt: "İş başvurularında öne çıkmak için LinkedIn profilini nasıl optimize edebilirsin? Tecrübelerimi paylaşıyorum.",
    likes: 82,
    makesSense: 58,
  },
  {
    id: 25,
    title: "Diferansiyel Denklemler Ders Notları",
    category: "Akademik",
    views: 420,
    comments: 0,
    tags: ["Diferansiyel Denklemler", "Matematik", "Ders Notu"],
    reliabilityScore: 77,
    createdAt: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
    author: { id: 25, name: "Serkan Yıldız", initials: "SY", role: "yeni_gelen" },
    excerpt: "Diferansiyel denklemler dersine ait notlarımı paylaşmak istiyorum. İhtiyacı olan var mı?",
    likes: 5,
    makesSense: 3,
  },
  {
    id: 26,
    title: "Kampüs İçi Spor Salonu",
    category: "Sosyal",
    views: 380,
    comments: 0,
    tags: ["Spor", "Spor Salonu", "Kampüs"],
    reliabilityScore: 76,
    createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    author: { id: 26, name: "Gamze Kaya", initials: "GK", role: "yeni_gelen" },
    excerpt: "Kampüs içinde spor salonu var mı? Ücretli mi ücretsiz mi? Deneyimi olan var mı?",
    likes: 8,
    makesSense: 5,
  },
  {
    id: 27,
    title: "KYK Yurdu Başvuru Süreci",
    category: "Barınma",
    views: 650,
    comments: 0,
    tags: ["KYK", "Yurt", "Başvuru"],
    reliabilityScore: 83,
    createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    author: { id: 27, name: "Onur Demir", initials: "OD", role: "yeni_gelen" },
    excerpt: "KYK yurdu için başvuru nasıl yapılıyor? Gerekli belgeler neler? Deneyimi olan paylaşabilir mi?",
    likes: 12,
    makesSense: 8,
  },
]

export function TopicHeader({ topicId, wikiContent: initialWikiContent }: TopicHeaderProps) {
  const { state } = useApp()
  const { canEditWiki, canProposeWikiEdit } = usePermissions()
  const { notifyWikiReverted } = useNotifications()
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isHistoryOpen, setIsHistoryOpen] = useState(false)
  const [revisions, setRevisions] = useState<WikiRevision[]>([])

  // Get topic data by id - eğer bulunamazsa varsayılan bir topic oluştur
  const topic = mockTopics.find(t => t.id === topicId) || {
    id: topicId,
    title: "Başlık Bulunamadı",
    category: "Genel",
    views: 0,
    comments: 0,
    tags: [],
    reliabilityScore: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    author: { id: 0, name: "Bilinmiyor", initials: "??", role: "yeni_gelen" },
    excerpt: "Bu başlık hakkında bilgi bulunamadı.",
    likes: 0,
    makesSense: 0,
  }
  
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
  
  // Generate detailed wiki content based on topic
  const getWikiContent = (): string => {
    const topicData = topic
    if (!topicData) return "Bu başlık hakkında detaylı bilgiler burada yer alacak."
    
    // Her topic için detaylı içerik oluştur
    const contentMap: Record<number, string> = {
      1: `## Lineer Cebir Dersi İçin Kaynak Önerileri

Lineer cebir, matematik ve mühendislik alanlarında temel bir ders olup, vektör uzayları, matrisler, determinantlar ve lineer dönüşümler gibi konuları kapsar.

### Önerilen Kitaplar

1. **Linear Algebra Done Right** - Sheldon Axler
   - Teorik yaklaşım için ideal
   - İspatlar ve kavramsal anlayış üzerine odaklanır

2. **Introduction to Linear Algebra** - Gilbert Strang
   - MIT'den ücretsiz video dersleri mevcut
   - Pratik uygulamalar ve örnekler içerir

3. **Linear Algebra** - Friedberg, Insel, Spence
   - Kapsamlı ve detaylı bir kaynak
   - Türkçe çevirisi mevcut

### Video Kaynakları

- **3Blue1Brown - Essence of Linear Algebra**: Görsel ve sezgisel açıklamalar
- **MIT 18.06**: Prof. Strang'in dersleri
- **Khan Academy**: Temel kavramlar için başlangıç seviyesi

### Çalışma İpuçları

- Her konuyu örneklerle pekiştirin
- Problem çözme pratiği yapın
- Vektör uzayları ve matris işlemlerini görselleştirin`,
      
      2: `## Kampüse Yakın Uygun Fiyatlı Yurt Rehberi

Selçuk Üniversitesi kampüsüne yakın, öğrenci bütçesine uygun yurt seçenekleri ve başvuru süreçleri hakkında detaylı bilgiler.

### Önerilen Yurtlar

1. **KYK Yurtları**
   - En ekonomik seçenek
   - Kampüse 10-15 dakika mesafede
   - Başvuru: e-Devlet üzerinden

2. **Özel Öğrenci Yurtları**
   - Daha modern tesisler
   - Aylık ücret: 2000-4000 TL arası
   - Öğrenci indirimleri mevcut

### Başvuru Süreci

- KYK için e-Devlet üzerinden başvuru
- Özel yurtlar için doğrudan yurt yönetimiyle iletişim
- Gerekli belgeler: Kimlik, öğrenci belgesi, fotoğraf

### Dikkat Edilmesi Gerekenler

- Ulaşım kolaylığı
- Güvenlik
- Yemekhane ve ortak alanlar
- Fiyat-performans dengesi`,
      
      3: `## Hafta Sonu Kampüste Aktiviteler

Kampüste hafta sonu yapılabilecek aktiviteler, açık olan tesisler ve düzenlenen etkinlikler hakkında bilgiler.

### Açık Olan Tesisler

- **Kütüphane**: Cumartesi-Pazar 09:00-17:00
- **Spor Salonu**: Hafta sonu 08:00-20:00
- **Kafeteryalar**: Çoğu açık, saatleri değişken

### Hafta Sonu Etkinlikleri

- Öğrenci kulüpleri tarafından düzenlenen etkinlikler
- Spor müsabakaları
- Kültürel aktiviteler ve konserler

### Öneriler

- Kampüs içi yürüyüş parkurları
- Açık hava çalışma alanları
- Sosyal alanlar ve dinlenme mekanları`,
      
      4: `## Staj Başvuru Süreçleri Rehberi

Yaz stajı başvuruları için gerekli adımlar, belgeler ve deneyimler.

### Başvuru Süreci

1. **CV Hazırlama**: Güncel ve düzenli bir CV hazırlayın
2. **Portföy Oluşturma**: Projelerinizi ve deneyimlerinizi gösterin
3. **Başvuru Yapma**: Şirketlerin kariyer sayfalarını takip edin
4. **Mülakat Hazırlığı**: Teknik ve genel kültür sorularına hazırlanın

### Önerilen Şirketler

- Konya'daki teknoloji şirketleri
- Büyükşehir Belediyesi staj programları
- Yerel işletmeler ve start-up'lar

### İpuçları

- Erken başvuru yapın
- LinkedIn profilinizi güncel tutun
- Referans mektupları hazırlayın`,
      
      5: `## Öğrenci Kulüpleri ve Katılım Rehberi

Üniversitedeki öğrenci kulüpleri, katılım süreçleri ve deneyimler.

### Aktif Kulüpler

- **Teknoloji Kulübü**: Programlama, hackathon'lar
- **Fotoğrafçılık Kulübü**: Atölyeler, geziler
- **Spor Kulüpleri**: Basketbol, futbol, voleybol
- **Kültür-Sanat**: Tiyatro, müzik, dans

### Katılım Süreci

- Kulüp tanıtım günlerine katılın
- Üyelik formlarını doldurun
- Düzenli toplantılara katılım gösterin

### Faydaları

- Sosyal çevre genişletme
- Yeni beceriler öğrenme
- CV'ye eklenebilecek deneyimler`,
      
      6: `## Yazılım Mühendisliği Ders Notları

Yazılım mühendisliği bölümü ders notları, kaynaklar ve çalışma materyalleri.

### Ders İçerikleri

- **Nesne Yönelimli Programlama**: Java, C++ temelleri
- **Veri Yapıları ve Algoritmalar**: Temel algoritmalar
- **Veritabanı Sistemleri**: SQL, NoSQL
- **Yazılım Mimarisi**: Tasarım desenleri

### Önerilen Kaynaklar

- Ders notları ve sunumlar
- Online platformlar (LeetCode, HackerRank)
- Kitap önerileri ve video dersler

### Çalışma İpuçları

- Pratik yapmaya önem verin
- Proje geliştirin
- Kod review yapın`,
      
      7: `## Ev Arkadaşı Arama Rehberi - Selçuklu

Selçuklu bölgesinde ev arkadaşı arama süreçleri ve dikkat edilmesi gerekenler.

### Bölge Bilgileri

- **Ulaşım**: Kampüse 20-30 dakika
- **Güvenlik**: Genel olarak güvenli bir bölge
- **Fiyatlar**: 2+1 daireler 3000-5000 TL arası

### Ev Arkadaşı Bulma

- Online platformlar
- Üniversite ilan panoları
- Sosyal medya grupları

### Dikkat Edilmesi Gerekenler

- Kişilik uyumu
- Yaşam tarzı uyumu
- Finansal anlaşma`,
      
      8: `## Konya'da Öğrenci Dostu Kafeler

Çalışmak için uygun, sessiz ve wifi olan kafe önerileri.

### Önerilen Kafeler

1. **Starbucks - Alaaddin**
   - 24 saat açık
   - Güçlü wifi
   - Sessiz çalışma alanları

2. **Kahve Dünyası - Meram**
   - Öğrenci indirimleri
   - Geniş masa alanları
   - Uygun fiyatlar

3. **Kampüs Kafeteryaları**
   - En ekonomik seçenek
   - Kampüs içinde
   - Öğrenci ortamı

### Kriterler

- Wifi hızı ve kalitesi
- Sessizlik seviyesi
- Fiyat-performans
- Çalışma alanı konforu`,
      
      9: `## Vize Haftası Çalışma Grubu Rehberi

Vize haftası için etkili çalışma grupları oluşturma ve yönetme.

### Grup Oluşturma

- 3-5 kişilik gruplar ideal
- Benzer dersleri alan öğrenciler
- Düzenli toplantı saatleri belirleyin

### Çalışma Yöntemleri

- Konu tekrarları
- Soru çözümü
- Karşılıklı anlatım
- Mock sınavlar

### Öneriler

- Dikkat dağıtıcı olmayan ortamlar
- Belirli hedefler koyun
- Düzenli molalar verin`,
      
      10: `## Part-time İş Fırsatları

Öğrencilere uygun part-time iş seçenekleri ve başvuru süreçleri.

### İş Alanları

- **Garsonluk**: Restoran ve kafeler
- **Perakende**: Mağaza satış danışmanlığı
- **Özel Ders**: İlkokul-ortaokul öğrencilerine
- **Online İşler**: Freelance, içerik üretimi

### Başvuru Süreci

- CV hazırlama
- İş ilanlarını takip etme
- Mülakat hazırlığı

### Dikkat Edilmesi Gerekenler

- Ders programıyla uyum
- Yasal çalışma saatleri
- Ücret ve çalışma koşulları`,
      
      11: `## Erasmus Başvuru Deneyimleri

Erasmus programı başvuru süreci, gerekli belgeler ve deneyimler.

### Başvuru Süreci

1. **Dil Sınavı**: TOEFL, IELTS veya üniversite sınavı
2. **Not Ortalaması**: Minimum 2.5/4.0
3. **Başvuru Formu**: Online başvuru sistemi
4. **Mülakat**: Başarılı adaylar için

### Gerekli Belgeler

- Transkript
- Dil sertifikası
- Motivasyon mektubu
- Referans mektupları

### Deneyimler

- Farklı kültürler tanıma
- Dil geliştirme
- Akademik deneyim
- Kişisel gelişim`,
      
      12: `## Meram'da Kiralık Daire Önerileri

Meram bölgesinde öğrenciye uygun kiralık daire arama rehberi.

### Bölge Özellikleri

- **Ulaşım**: Kampüse 15-25 dakika
- **Güvenlik**: Güvenli bir bölge
- **Fiyatlar**: 1+1: 2000-3500 TL, 2+1: 3500-5000 TL

### Arama Yöntemleri

- Emlak siteleri
- Üniversite ilan panoları
- Sosyal medya grupları
- Emlak ofisleri

### Dikkat Edilmesi Gerekenler

- Kira sözleşmesi detayları
- Depozito ve avans
- Faturalar (su, elektrik, doğalgaz)
- Ulaşım kolaylığı`,
      
      13: `## Fotoğrafçılık Kulübü Etkinlikleri

Fotoğrafçılık kulübü aktiviteleri, etkinlikler ve katılım bilgileri.

### Etkinlikler

- **Hafta Sonu Gezileri**: Doğa fotoğrafçılığı
- **Atölyeler**: Teknik eğitimler
- **Sergiler**: Üye çalışmaları
- **Yarışmalar**: Fotoğraf yarışmaları

### Katılım

- Kulüp üyeliği ücretsiz
- Düzenli toplantılar
- Ekipman paylaşımı

### Öğrenilecekler

- Fotoğraf teknikleri
- Kompozisyon kuralları
- Işık kullanımı
- Düzenleme yazılımları`,
      
      14: `## Fizik 2 Çıkmış Sorular

Son 5 yılın fizik 2 dersi çıkmış soruları ve çözümleri.

### Konu Dağılımı

- Elektrik ve Manyetizma
- Dalgalar ve Optik
- Modern Fizik
- Termodinamik

### Soru Tipleri

- Çoktan seçmeli sorular
- Hesaplama problemleri
- Kavramsal sorular

### Çalışma İpuçları

- Her konudan soru çözün
- Zaman yönetimi yapın
- Formülleri ezberleyin
- Pratik yapın`,
      
      15: `## CV Hazırlama İpuçları

Etkili CV hazırlama teknikleri ve örnekler.

### CV Bölümleri

1. **Kişisel Bilgiler**: İletişim bilgileri
2. **Eğitim**: Okul ve bölüm bilgileri
3. **Deneyim**: İş ve staj deneyimleri
4. **Yetenekler**: Teknik ve yazılı beceriler
5. **Projeler**: Kişisel ve akademik projeler

### İpuçları

- Kısa ve öz olun (1-2 sayfa)
- Güncel bilgiler kullanın
- Anahtar kelimeler ekleyin
- Profesyonel format kullanın

### Önerilen Formatlar

- Kronolojik CV
- Fonksiyonel CV
- Hibrit CV`,
      
      16: `## Basketbol Takımına Oyuncu Arama

Fakülte basketbol takımı hakkında bilgiler ve katılım süreci.

### Takım Bilgileri

- **Antrenman Günleri**: Salı ve Perşembe 18:00-20:00
- **Seviye**: Amatör, rekabetçi
- **Gereksinimler**: Basketbol deneyimi, düzenli katılım

### Katılım

- Antrenmanlara katılım
- Seçmeler
- Takım ruhu

### Faydaları

- Spor yapma fırsatı
- Takım çalışması
- Sosyal çevre`,
      
      17: `## Yurt Değişikliği Yapmak İstiyorum

KYK yurdunda oda değişikliği süreçleri ve dikkat edilmesi gerekenler.

### Değişiklik Süreci

1. **Başvuru**: Yurt yönetimine yazılı başvuru
2. **Gerekçe**: Geçerli bir gerekçe sunun
3. **Onay**: Yurt yönetimi onayı
4. **Taşınma**: Belirlenen tarihte taşınma

### Geçerli Gerekçeler

- Sağlık sorunları
- Akademik nedenler
- Ailevi durumlar

### Dikkat Edilmesi Gerekenler

- Süreç zaman alabilir
- Boş oda olması gerekir
- Ek ücret gerekebilir`,
      
      18: `## Programlama Dersleri - Ücretsiz

Python ve JavaScript programlama dersleri hakkında bilgiler.

### Ders İçerikleri

**Python:**
- Temel syntax
- Veri yapıları
- Fonksiyonlar ve modüller
- OOP kavramları

**JavaScript:**
- ES6+ özellikleri
- DOM manipülasyonu
- Async programlama
- Framework'ler (React, Vue)

### Ders Formatı

- Haftalık dersler
- Pratik uygulamalar
- Proje çalışmaları
- Grup çalışmaları

### Katılım

- Ücretsiz
- Her seviyeye uygun
- Sertifika verilecek`,
      
      19: `## Kitap Kulübü Oluşturalım

Her ay bir kitap okuyup tartışacağımız kitap kulübü hakkında bilgiler.

### Kulüp Yapısı

- **Toplantı Sıklığı**: Ayda bir kez
- **Kitap Seçimi**: Demokratik oylama
- **Tartışma Formatı**: Açık ve saygılı tartışma

### Katılım

- Herkes katılabilir
- Üyelik ücretsiz
- Düzenli katılım önemli

### Faydaları

- Okuma alışkanlığı
- Farklı bakış açıları
- Sosyal çevre
- Eleştirel düşünme`,
      
      20: `## Yazılım Stajı Deneyimlerim

Yazılım sektöründe staj deneyimleri ve öneriler.

### Staj Deneyimi

- **Şirket**: [Şirket adı]
- **Süre**: 3 ay
- **Pozisyon**: Frontend Developer Intern
- **Teknolojiler**: React, TypeScript, Node.js

### Öğrenilenler

- Gerçek proje deneyimi
- Takım çalışması
- Kod review süreçleri
- Agile metodolojiler

### Öneriler

- Aktif olun ve soru sorun
- Kod yazmaya odaklanın
- Networking yapın
- Geri bildirim alın`,
      
      21: `## Eşya Satışı - Taşınma

Mezuniyet sonrası eşya satışı ve taşınma süreçleri.

### Satılacak Eşyalar

- Masa ve sandalye
- Kitaplık
- Elektronik eşyalar
- Ev eşyaları

### Satış Yöntemleri

- Online platformlar
- Üniversite ilan panoları
- Sosyal medya grupları

### Fiyatlandırma

- Uygun fiyatlar
- Pazarlık yapılabilir
- Toplu alım indirimi`,
      
      22: `## Matematik Olimpiyatları Hazırlık

Üniversite matematik olimpiyatlarına hazırlık çalışma grubu.

### Konular

- Cebir
- Geometri
- Sayılar Teorisi
- Kombinatorik

### Çalışma Yöntemi

- Haftalık toplantılar
- Problem çözümü
- Mock sınavlar
- Kaynak paylaşımı

### Katılım

- Matematik sevgisi
- Düzenli çalışma
- Problem çözme isteği`,
      
      23: `## Gönüllü Çalışma Fırsatları

Konya'da öğrencilerin katılabileceği gönüllü çalışma projeleri.

### Proje Alanları

- **Eğitim**: Okul destek programları
- **Çevre**: Temizlik ve ağaçlandırma
- **Sosyal**: Yaşlı ve engelli destek
- **Kültür**: Etkinlik organizasyonları

### Katılım

- Esnek saatler
- Sertifika verilecek
- Deneyim kazanma

### Faydaları

- Sosyal sorumluluk
- Deneyim kazanma
- CV'ye eklenebilir
- Kişisel gelişim`,
      
      24: `## LinkedIn Profil Optimizasyonu

İş başvurularında öne çıkmak için LinkedIn profil optimizasyonu.

### Profil Bölümleri

1. **Profil Fotoğrafı**: Profesyonel fotoğraf
2. **Başlık**: İş unvanı ve uzmanlık alanı
3. **Özet**: Kısa ve etkili özet
4. **Deneyim**: İş ve staj deneyimleri
5. **Eğitim**: Okul ve bölüm bilgileri
6. **Yetenekler**: Teknik ve yazılı beceriler

### İpuçları

- Anahtar kelimeler kullanın
- Düzenli güncelleyin
- Bağlantılar kurun
- İçerik paylaşın

### Öneriler

- Profesyonel görünüm
- Aktif olun
- Öneriler alın`,
      
      25: `## Diferansiyel Denklemler Ders Notları

Diferansiyel denklemler dersi notları ve kaynaklar.

### Konular

- Birinci mertebe diferansiyel denklemler
- İkinci mertebe lineer denklemler
- Laplace dönüşümleri
- Seri çözümler

### Notlar

- Detaylı konu anlatımları
- Çözümlü örnekler
- Pratik problemler
- Formül özetleri

### Kaynaklar

- Ders kitabı
- Video dersler
- Online kaynaklar`,
      
      26: `## Kampüs İçi Spor Salonu

Kampüs içindeki spor tesisleri ve kullanım bilgileri.

### Tesisler

- **Spor Salonu**: Basketbol, voleybol sahaları
- **Fitness Merkezi**: Ağırlık ve kardiyo ekipmanları
- **Açık Alanlar**: Futbol, tenis kortları

### Kullanım

- **Ücret**: Öğrenciler için ücretsiz veya indirimli
- **Saatler**: Hafta içi ve hafta sonu açık
- **Kayıt**: Spor birimine kayıt gerekli

### Kurallar

- Spor kıyafeti zorunlu
- Rezervasyon sistemi
- Hijyen kuralları`,
      
      27: `## KYK Yurdu Başvuru Süreci

KYK yurdu başvuru süreçleri, gerekli belgeler ve deneyimler.

### Başvuru Süreci

1. **e-Devlet Girişi**: e-Devlet üzerinden başvuru
2. **Belgeler**: Gerekli belgeleri yükleyin
3. **Başvuru Tarihleri**: Her yıl belirlenen tarihler
4. **Sonuç**: Yerleştirme sonuçları açıklanır

### Gerekli Belgeler

- Kimlik belgesi
- Öğrenci belgesi
- Gelir belgesi (aile)
- Fotoğraf

### Yurt Özellikleri

- Ekonomik fiyatlar
- Yemekhane
- Ortak alanlar
- Güvenlik`,
    }
    
    return contentMap[topicId] || `${topicData.excerpt}\n\nBu başlık hakkında daha detaylı bilgiler topluluk tarafından eklenmektedir.`
  }
  
  const [wikiContent, setWikiContent] = useState<WikiContent | null>(
    initialWikiContent || {
      id: 1,
      topicId,
      content: getWikiContent(),
      version: 1,
      createdAt: topic.createdAt,
      updatedAt: topic.updatedAt,
      author: state.user || { 
        id: topic.author.id, 
        name: topic.author.name, 
        initials: topic.author.initials, 
        role: topic.author.role, 
        totalCoins: 0, 
        badges: [], 
        xp: { current: 0, nextLevel: 500, progress: 0 }, 
        joinedAt: new Date().toISOString() 
      },
      usefulVotes: Math.floor(topic.likes * 0.7),
      notUsefulVotes: Math.floor(topic.likes * 0.1),
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

