"use client"

import { memo, useState } from "react"
import { MessageCircle, ThumbsUp, Clock, BookOpen, ChevronLeft, ChevronRight } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface DiscussionFeedProps {
  onNavigateToTopic?: () => void
}

const allDiscussions = [
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
    comments: 28,
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
    comments: 14,
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
    comments: 35,
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
    comments: 11,
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
    comments: 42,
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
    comments: 54,
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
    comments: 23,
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
    comments: 18,
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
    comments: 67,
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
    comments: 31,
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
    comments: 16,
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
    comments: 19,
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
    comments: 89,
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
    comments: 38,
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
    comments: 52,
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
    comments: 27,
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
    comments: 21,
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
    comments: 44,
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
    comments: 47,
  },
]

const ITEMS_PER_PAGE = 8

export const DiscussionFeed = memo(function DiscussionFeed({ onNavigateToTopic }: DiscussionFeedProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = Math.ceil(allDiscussions.length / ITEMS_PER_PAGE)
  
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const discussions = allDiscussions.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  return (
    <section>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <h2 className="font-[Manrope] font-bold text-foreground text-xl sm:text-2xl">Yeni Tartışmalar</h2>
        <div className="flex items-center gap-2 flex-wrap">
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90 font-[Manrope] font-semibold">
            Yeni
          </Button>
          <Button variant="outline" className="font-[Manrope] font-semibold hover:bg-primary hover:text-primary-foreground">
            Popüler
          </Button>
          <Button variant="outline" className="font-[Manrope] font-semibold hover:bg-primary hover:text-primary-foreground">
            Cevaplanmamış
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {discussions.map((discussion) => (
          <Card
            key={discussion.id}
            onClick={onNavigateToTopic}
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

                  <div className="flex flex-wrap items-center gap-4 sm:gap-6">
                    <button 
                      className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                      aria-label={`${discussion.likes} beğeni`}
                    >
                      <ThumbsUp className="w-4 h-4" />
                      <span className="font-[Manrope] font-semibold text-xs sm:text-sm">{discussion.likes}</span>
                    </button>
                    <button 
                      className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                      aria-label={`${discussion.comments} yorum`}
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span className="font-[Manrope] font-semibold text-xs sm:text-sm">{discussion.comments}</span>
                    </button>
                    <button 
                      className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors ml-auto"
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
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center gap-2 mt-8">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
          disabled={currentPage === 1}
          className="font-[Manrope] font-semibold"
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          Önceki
        </Button>
        
        <div className="flex items-center gap-1">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <Button
              key={page}
              variant={currentPage === page ? "default" : "outline"}
              size="sm"
              onClick={() => setCurrentPage(page)}
              className="font-[Manrope] font-semibold w-9 h-9"
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
          className="font-[Manrope] font-semibold"
        >
          Sonraki
          <ChevronRight className="w-4 h-4 ml-1" />
        </Button>
      </div>
    </section>
  )
})

