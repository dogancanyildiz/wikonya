"use client"

import { memo } from "react"
import { MessageCircle, ThumbsUp, Clock, BookOpen } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface DiscussionFeedProps {
  onNavigateToTopic?: () => void
}

export const DiscussionFeed = memo(function DiscussionFeed({ onNavigateToTopic }: DiscussionFeedProps) {
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
  ]

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <h2 className="font-[Manrope] font-bold text-[#4d4d4d] dark:text-foreground text-xl sm:text-2xl">Fresh Discussions</h2>
        <div className="flex items-center gap-2 flex-wrap">
          <Button className="px-4 py-2 bg-[#03624c] text-white rounded-xl font-[Manrope] font-semibold hover:bg-[#03624c]/90 text-sm">
            Yeni
          </Button>
          <Button variant="outline" className="px-4 py-2 bg-white dark:bg-card text-[#4d4d4d] dark:text-foreground rounded-xl font-[Manrope] font-semibold hover:bg-[#03624c] hover:text-white dark:hover:bg-[#03624c] transition-colors text-sm">
            Popüler
          </Button>
          <Button variant="outline" className="px-4 py-2 bg-white dark:bg-card text-[#4d4d4d] dark:text-foreground rounded-xl font-[Manrope] font-semibold hover:bg-[#03624c] hover:text-white dark:hover:bg-[#03624c] transition-colors text-sm">
            Cevaplanmamış
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {discussions.map((discussion) => (
          <Card
            key={discussion.id}
            onClick={onNavigateToTopic}
            className="bg-white dark:bg-card border border-gray-200 dark:border-border rounded-[20px] hover:shadow-lg transition-all duration-300 cursor-pointer group"
          >
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-start gap-4">
                <Avatar className="w-10 h-10 sm:w-12 sm:h-12 border-2 border-[#f2f4f3] dark:border-border">
                  <AvatarFallback className="bg-[#03624c] text-white font-[Manrope] font-bold">
                    {discussion.authorInitials}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2">
                    <span className="font-[Manrope] font-bold text-[#4d4d4d] dark:text-foreground text-sm sm:text-base">
                      {discussion.author}
                    </span>
                    <span className="px-3 py-1 bg-[#f2f4f3] dark:bg-accent rounded-full font-[Manrope] font-semibold text-[#03624c] text-xs sm:text-sm">
                      {discussion.category}
                    </span>
                    <div className="flex items-center gap-1 text-[#4d4d4d]/60 dark:text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      <span className="font-[Manrope] font-medium text-xs sm:text-sm">{discussion.timeAgo}</span>
                    </div>
                  </div>

                  <h3 className="font-[Manrope] font-bold text-[#4d4d4d] dark:text-foreground mb-2 group-hover:text-[#03624c] transition-colors text-sm sm:text-base">
                    {discussion.title}
                  </h3>

                  <p className="font-[Manrope] font-medium text-[#4d4d4d]/70 dark:text-muted-foreground mb-4 text-sm sm:text-base line-clamp-2">
                    {discussion.excerpt}
                  </p>

                  <div className="flex flex-wrap items-center gap-4 sm:gap-6">
                    <button className="flex items-center gap-2 text-[#4d4d4d]/60 dark:text-muted-foreground hover:text-[#03624c] transition-colors">
                      <ThumbsUp className="w-4 h-4" />
                      <span className="font-[Manrope] font-semibold text-xs sm:text-sm">{discussion.likes}</span>
                    </button>
                    <button className="flex items-center gap-2 text-[#4d4d4d]/60 dark:text-muted-foreground hover:text-[#03624c] transition-colors">
                      <MessageCircle className="w-4 h-4" />
                      <span className="font-[Manrope] font-semibold text-xs sm:text-sm">{discussion.comments}</span>
                    </button>
                    <button className="flex items-center gap-2 text-[#4d4d4d]/60 dark:text-muted-foreground hover:text-[#03624c] transition-colors ml-auto">
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
    </div>
  )
})

