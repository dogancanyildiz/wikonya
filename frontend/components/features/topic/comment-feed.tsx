"use client"

import { ThumbsUp, MessageCircle, Flag, Lightbulb, AlertCircle } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useCoinReward } from "@/lib/utils/hooks/use-coin-reward"
import { useApp } from "@/contexts/app-context"
import { canPerformAction, performAction, getRemainingActions } from "@/lib/gamification/rate-limiter"
import { toast } from "sonner"
import { CommentReplyDialog } from "./comment-reply-dialog"
import { incrementCommentCount } from "@/lib/utils/user-stats"
import { incrementTopicComments } from "@/lib/utils/topic-stats"

import { Comment as CommentType } from "@/lib/types"

interface Comment extends CommentType {
  logicalVotes?: number
  isLogical?: boolean
  parentId?: number
  repliesList?: Comment[]
}

interface CommentFeedProps {
  topicId: number
}

// Topic'lere özel yorumlar - gerçek uygulamada API'den gelecek
const getTopicComments = (topicId: number): Comment[] => {
  const commentsMap: Record<number, Comment[]> = {
    1: [
      {
        id: 1,
        author: "Ayşe Yılmaz",
        authorInitials: "AY",
        timeAgo: "2 saat önce",
        content: "Sheldon Axler'ın kitabını kullandım, gerçekten çok iyi. Teorik kısmı çok güçlü. MIT'den Strang'in videolarını da izledim, pratik için harika.",
        upvotes: 24,
        downvotes: 2,
        logicalVotes: 18,
        replies: 5,
        isUpvoted: false,
        isDownvoted: false,
        isLogical: false,
      },
      {
        id: 2,
        author: "Mehmet Demir",
        authorInitials: "MD",
        timeAgo: "5 saat önce",
        content: "3Blue1Brown'un Essence of Linear Algebra serisi görsel açıdan mükemmel. Vektör uzaylarını anlamak için çok faydalı oldu.",
        upvotes: 18,
        downvotes: 4,
        logicalVotes: 12,
        replies: 3,
        isUpvoted: true,
        isDownvoted: false,
        isLogical: true,
      },
      {
        id: 3,
        author: "Zeynep Kaya",
        authorInitials: "ZK",
        timeAgo: "1 gün önce",
        content: "Khan Academy'den başladım, sonra MIT derslerine geçtim. Adım adım ilerlemek için ideal bir yol.",
        upvotes: 42,
        downvotes: 1,
        logicalVotes: 35,
        replies: 8,
        isUpvoted: false,
        isDownvoted: false,
        isLogical: false,
      },
    ],
    2: [
      {
        id: 1,
        author: "Burak Çelik",
        authorInitials: "BÇ",
        timeAgo: "3 saat önce",
        content: "KYK yurtları en ekonomik seçenek. e-Devlet üzerinden başvuru yaptım, süreç çok kolay. Kampüse de yakın.",
        upvotes: 28,
        downvotes: 3,
        logicalVotes: 22,
        replies: 6,
        isUpvoted: false,
        isDownvoted: false,
        isLogical: false,
      },
      {
        id: 2,
        author: "Selin Yıldız",
        authorInitials: "SY",
        timeAgo: "6 saat önce",
        content: "Özel yurtlarda daha modern tesisler var ama fiyatlar biraz yüksek. 3000-4000 TL arası bütçe ayırmak gerekiyor.",
        upvotes: 15,
        downvotes: 2,
        logicalVotes: 11,
        replies: 4,
        isUpvoted: false,
        isDownvoted: false,
        isLogical: false,
      },
      {
        id: 3,
        author: "Emre Yılmaz",
        authorInitials: "EY",
        timeAgo: "1 gün önce",
        content: "Ulaşım kolaylığı çok önemli. Kampüse yakın olan yurtları tercih edin, sabah derslerine geç kalmamak için.",
        upvotes: 32,
        downvotes: 1,
        logicalVotes: 25,
        replies: 7,
        isUpvoted: false,
        isDownvoted: false,
        isLogical: false,
      },
    ],
    3: [
      {
        id: 1,
        author: "Can Özkan",
        authorInitials: "CÖ",
        timeAgo: "1 saat önce",
        content: "Kütüphane hafta sonu açık, çalışmak için ideal. Spor salonu da açık, egzersiz yapabilirsiniz.",
        upvotes: 19,
        downvotes: 2,
        logicalVotes: 14,
        replies: 3,
        isUpvoted: false,
        isDownvoted: false,
        isLogical: false,
      },
      {
        id: 2,
        author: "Fatma Öztürk",
        authorInitials: "FÖ",
        timeAgo: "4 saat önce",
        content: "Öğrenci kulüpleri hafta sonu etkinlikler düzenliyor. Fotoğrafçılık kulübü bu hafta sonu doğa yürüyüşü yapıyor.",
        upvotes: 24,
        downvotes: 1,
        logicalVotes: 18,
        replies: 5,
        isUpvoted: false,
        isDownvoted: false,
        isLogical: false,
      },
      {
        id: 3,
        author: "Kerem Aydın",
        authorInitials: "KA",
        timeAgo: "8 saat önce",
        content: "Kampüs içi yürüyüş parkurları var, hava güzelken çok güzel. Açık hava çalışma alanları da mevcut.",
        upvotes: 16,
        downvotes: 0,
        logicalVotes: 12,
        replies: 2,
        isUpvoted: false,
        isDownvoted: false,
        isLogical: false,
      },
    ],
    4: [
      {
        id: 1,
        author: "Hakan Özdemir",
        authorInitials: "HÖ",
        timeAgo: "2 saat önce",
        content: "CV hazırlarken dikkat etmeniz gereken en önemli şey: kısa ve öz olun. 1-2 sayfayı geçmeyin. Anahtar kelimeler kullanın.",
        upvotes: 35,
        downvotes: 2,
        logicalVotes: 28,
        replies: 8,
        isUpvoted: false,
        isDownvoted: false,
        isLogical: false,
      },
      {
        id: 2,
        author: "Ufuk Korkmaz",
        authorInitials: "UK",
        timeAgo: "5 saat önce",
        content: "Staj başvuruları için erken başvuru çok önemli. Şirketlerin kariyer sayfalarını düzenli takip edin.",
        upvotes: 22,
        downvotes: 1,
        logicalVotes: 17,
        replies: 4,
        isUpvoted: false,
        isDownvoted: false,
        isLogical: false,
      },
      {
        id: 3,
        author: "Seda Demir",
        authorInitials: "SD",
        timeAgo: "1 gün önce",
        content: "Mülakat hazırlığı yaparken hem teknik hem genel kültür sorularına hazırlanın. Projelerinizi iyi anlatabilmelisiniz.",
        upvotes: 28,
        downvotes: 3,
        logicalVotes: 21,
        replies: 6,
        isUpvoted: false,
        isDownvoted: false,
        isLogical: false,
      },
    ],
    5: [
      {
        id: 1,
        author: "Büşra Yıldırım",
        authorInitials: "BY",
        timeAgo: "3 saat önce",
        content: "Teknoloji kulübüne üyeyim, hackathon'lar çok eğlenceli. Programlama öğrenmek isteyenler için ideal.",
        upvotes: 26,
        downvotes: 1,
        logicalVotes: 20,
        replies: 5,
        isUpvoted: false,
        isDownvoted: false,
        isLogical: false,
      },
      {
        id: 2,
        author: "İrem Karaca",
        authorInitials: "İK",
        timeAgo: "7 saat önce",
        content: "Fotoğrafçılık kulübü atölyeler düzenliyor, teknik eğitimler alıyorum. Ekipman paylaşımı da var.",
        upvotes: 18,
        downvotes: 2,
        logicalVotes: 13,
        replies: 3,
        isUpvoted: false,
        isDownvoted: false,
        isLogical: false,
      },
      {
        id: 3,
        author: "Tolga Şahin",
        authorInitials: "TŞ",
        timeAgo: "12 saat önce",
        content: "Spor kulüpleri takım çalışması için harika. Basketbol takımına katıldım, hem spor yapıyorum hem sosyal çevre genişliyor.",
        upvotes: 21,
        downvotes: 1,
        logicalVotes: 16,
        replies: 4,
        isUpvoted: false,
        isDownvoted: false,
        isLogical: false,
      },
    ],
    6: [
      {
        id: 1,
        author: "Ali Rıza Güneş",
        authorInitials: "AG",
        timeAgo: "1 saat önce",
        content: "Nesne yönelimli programlama dersinde Java kullandık. Veri yapıları için LeetCode'da pratik yapıyorum.",
        upvotes: 38,
        downvotes: 2,
        logicalVotes: 30,
        replies: 9,
        isUpvoted: false,
        isDownvoted: false,
        isLogical: false,
      },
      {
        id: 2,
        author: "Elif Arslan",
        authorInitials: "EA",
        timeAgo: "4 saat önce",
        content: "Veritabanı sistemleri dersinde SQL öğrendik. NoSQL için MongoDB'ye de baktım. Projelerde kullanıyorum.",
        upvotes: 25,
        downvotes: 1,
        logicalVotes: 19,
        replies: 5,
        isUpvoted: false,
        isDownvoted: false,
        isLogical: false,
      },
      {
        id: 3,
        author: "Oğuzhan Kara",
        authorInitials: "OK",
        timeAgo: "8 saat önce",
        content: "Yazılım mimarisi dersinde tasarım desenlerini öğrendik. Singleton, Factory gibi pattern'ler çok işime yaradı.",
        upvotes: 31,
        downvotes: 3,
        logicalVotes: 24,
        replies: 7,
        isUpvoted: false,
        isDownvoted: false,
        isLogical: false,
      },
    ],
    7: [
      {
        id: 1,
        author: "Ceren Aktaş",
        authorInitials: "CA",
        timeAgo: "2 saat önce",
        content: "Selçuklu bölgesinde 2+1 dairede kalıyorum. Ulaşım çok kolay, kampüse 20 dakika. Kira 3000 TL, faturalar ayrı.",
        upvotes: 12,
        downvotes: 1,
        logicalVotes: 9,
        replies: 3,
        isUpvoted: false,
        isDownvoted: false,
        isLogical: false,
      },
      {
        id: 2,
        author: "Merve Çelik",
        authorInitials: "MÇ",
        timeAgo: "6 saat önce",
        content: "Ev arkadaşı bulmak için online platformları kullandım. Kişilik uyumu çok önemli, önce tanışın.",
        upvotes: 15,
        downvotes: 2,
        logicalVotes: 11,
        replies: 4,
        isUpvoted: false,
        isDownvoted: false,
        isLogical: false,
      },
      {
        id: 3,
        author: "Onur Demir",
        authorInitials: "OD",
        timeAgo: "10 saat önce",
        content: "Finansal anlaşma yaparken her şeyi yazılı hale getirin. Kira, faturalar, ortak giderler net olsun.",
        upvotes: 19,
        downvotes: 0,
        logicalVotes: 14,
        replies: 5,
        isUpvoted: false,
        isDownvoted: false,
        isLogical: false,
      },
    ],
    8: [
      {
        id: 1,
        author: "Selin Yıldız",
        authorInitials: "SY",
        timeAgo: "1 saat önce",
        content: "Starbucks Alaaddin'de çalışıyorum, 24 saat açık ve wifi çok hızlı. Sessiz çalışma alanları var.",
        upvotes: 32,
        downvotes: 2,
        logicalVotes: 25,
        replies: 8,
        isUpvoted: false,
        isDownvoted: false,
        isLogical: false,
      },
      {
        id: 2,
        author: "Deniz Aydın",
        authorInitials: "DA",
        timeAgo: "4 saat önce",
        content: "Kahve Dünyası Meram'da öğrenci indirimi var. Geniş masa alanları ve uygun fiyatlar. Tavsiye ederim.",
        upvotes: 24,
        downvotes: 1,
        logicalVotes: 18,
        replies: 5,
        isUpvoted: false,
        isDownvoted: false,
        isLogical: false,
      },
      {
        id: 3,
        author: "Gamze Kaya",
        authorInitials: "GK",
        timeAgo: "7 saat önce",
        content: "Kampüs kafeteryaları en ekonomik seçenek. Öğrenci ortamı da var, ders çalışırken rahatsız edilmiyorsunuz.",
        upvotes: 20,
        downvotes: 0,
        logicalVotes: 15,
        replies: 3,
        isUpvoted: false,
        isDownvoted: false,
        isLogical: false,
      },
    ],
    9: [
      {
        id: 1,
        author: "Murat Koç",
        authorInitials: "MK",
        timeAgo: "2 saat önce",
        content: "3-5 kişilik gruplar ideal. Benzer dersleri alan öğrencilerle çalışmak daha verimli oluyor.",
        upvotes: 18,
        downvotes: 1,
        logicalVotes: 13,
        replies: 4,
        isUpvoted: false,
        isDownvoted: false,
        isLogical: false,
      },
      {
        id: 2,
        author: "Serkan Yıldız",
        authorInitials: "SY",
        timeAgo: "5 saat önce",
        content: "Konu tekrarları yapıyoruz, soru çözüyoruz. Karşılıklı anlatım çok faydalı, eksiklerinizi görüyorsunuz.",
        upvotes: 22,
        downvotes: 2,
        logicalVotes: 17,
        replies: 6,
        isUpvoted: false,
        isDownvoted: false,
        isLogical: false,
      },
      {
        id: 3,
        author: "Ayşe Şahin",
        authorInitials: "AŞ",
        timeAgo: "9 saat önce",
        content: "Dikkat dağıtıcı olmayan ortamlar seçin. Kütüphane veya sessiz bir sınıf ideal. Belirli hedefler koyun.",
        upvotes: 16,
        downvotes: 0,
        logicalVotes: 12,
        replies: 3,
        isUpvoted: false,
        isDownvoted: false,
        isLogical: false,
      },
    ],
    10: [
      {
        id: 1,
        author: "Deniz Aydın",
        authorInitials: "DA",
        timeAgo: "3 saat önce",
        content: "Garsonluk yapıyorum, hafta sonu çalışıyorum. Ders programıma uygun, esnek saatler var.",
        upvotes: 14,
        downvotes: 2,
        logicalVotes: 10,
        replies: 3,
        isUpvoted: false,
        isDownvoted: false,
        isLogical: false,
      },
      {
        id: 2,
        author: "Hakan Özdemir",
        authorInitials: "HÖ",
        timeAgo: "6 saat önce",
        content: "Özel ders veriyorum, ilkokul öğrencilerine matematik öğretiyorum. Saatlik ücret iyi, zaman da esnek.",
        upvotes: 19,
        downvotes: 1,
        logicalVotes: 14,
        replies: 5,
        isUpvoted: false,
        isDownvoted: false,
        isLogical: false,
      },
      {
        id: 3,
        author: "Ufuk Korkmaz",
        authorInitials: "UK",
        timeAgo: "12 saat önce",
        content: "Online freelance işler yapıyorum. İçerik üretimi, çeviri gibi işler. Evden çalışmak çok rahat.",
        upvotes: 27,
        downvotes: 2,
        logicalVotes: 20,
        replies: 7,
        isUpvoted: false,
        isDownvoted: false,
        isLogical: false,
      },
    ],
    11: [
      {
        id: 1,
        author: "Gizem Aksoy",
        authorInitials: "GA",
        timeAgo: "1 saat önce",
        content: "TOEFL sınavına girdim, 95 aldım. Dil sertifikası için yeterli. Başvuru sürecinde çok yardımcı oldu.",
        upvotes: 41,
        downvotes: 1,
        logicalVotes: 32,
        replies: 10,
        isUpvoted: false,
        isDownvoted: false,
        isLogical: false,
      },
      {
        id: 2,
        author: "Oğuzhan Kara",
        authorInitials: "OK",
        timeAgo: "4 saat önce",
        content: "Not ortalamam 3.2, başvuru yaptım. Mülakat için hazırlanıyorum. Motivasyon mektubu çok önemli.",
        upvotes: 28,
        downvotes: 2,
        logicalVotes: 21,
        replies: 6,
        isUpvoted: false,
        isDownvoted: false,
        isLogical: false,
      },
      {
        id: 3,
        author: "Elif Arslan",
        authorInitials: "EA",
        timeAgo: "8 saat önce",
        content: "Erasmus'ta İspanya'ya gittim. Farklı kültürler tanıdım, dilimi geliştirdim. Çok güzel bir deneyim oldu.",
        upvotes: 52,
        downvotes: 0,
        logicalVotes: 40,
        replies: 12,
        isUpvoted: false,
        isDownvoted: false,
        isLogical: false,
      },
    ],
    12: [
      {
        id: 1,
        author: "Emre Yılmaz",
        authorInitials: "EY",
        timeAgo: "2 saat önce",
        content: "Meram'da 1+1 daire buldum, 2500 TL. Kampüse 20 dakika, ulaşım çok kolay. Güvenli bir bölge.",
        upvotes: 16,
        downvotes: 1,
        logicalVotes: 12,
        replies: 4,
        isUpvoted: false,
        isDownvoted: false,
        isLogical: false,
      },
      {
        id: 2,
        author: "Burak Çelik",
        authorInitials: "BÇ",
        timeAgo: "5 saat önce",
        content: "Emlak sitelerinden aradım, birkaç daire gezdim. Fiyat-performans dengesine dikkat edin.",
        upvotes: 13,
        downvotes: 2,
        logicalVotes: 9,
        replies: 3,
        isUpvoted: false,
        isDownvoted: false,
        isLogical: false,
      },
      {
        id: 3,
        author: "Ceren Aktaş",
        authorInitials: "CA",
        timeAgo: "9 saat önce",
        content: "Kira sözleşmesi yaparken depozito ve avans konusunu netleştirin. Faturaların kimde olduğunu sorun.",
        upvotes: 18,
        downvotes: 0,
        logicalVotes: 13,
        replies: 5,
        isUpvoted: false,
        isDownvoted: false,
        isLogical: false,
      },
    ],
    13: [
      {
        id: 1,
        author: "Fatma Öztürk",
        authorInitials: "FÖ",
        timeAgo: "1 saat önce",
        content: "Bu hafta sonu doğa yürüyüşü düzenliyoruz. Fotoğraf çekmek için harika bir fırsat. Katılmak isteyenler bekleriz!",
        upvotes: 29,
        downvotes: 1,
        logicalVotes: 22,
        replies: 7,
        isUpvoted: false,
        isDownvoted: false,
        isLogical: false,
      },
      {
        id: 2,
        author: "Kerem Aydın",
        authorInitials: "KA",
        timeAgo: "4 saat önce",
        content: "Atölyelerde teknik eğitimler alıyoruz. Işık kullanımı, kompozisyon kuralları gibi konular işleniyor.",
        upvotes: 21,
        downvotes: 1,
        logicalVotes: 16,
        replies: 4,
        isUpvoted: false,
        isDownvoted: false,
        isLogical: false,
      },
      {
        id: 3,
        author: "İrem Karaca",
        authorInitials: "İK",
        timeAgo: "7 saat önce",
        content: "Ekipman paylaşımı var, kamera almak zorunda değilsiniz. Kulüp üyeliği ücretsiz, herkes katılabilir.",
        upvotes: 17,
        downvotes: 0,
        logicalVotes: 13,
        replies: 3,
        isUpvoted: false,
        isDownvoted: false,
        isLogical: false,
      },
    ],
    14: [
      {
        id: 1,
        author: "Oğuzhan Kara",
        authorInitials: "OK",
        timeAgo: "2 saat önce",
        content: "Son 5 yılın sorularını çözdüm, çok faydalı oldu. Özellikle elektrik ve manyetizma konularında çok soru çıkmış.",
        upvotes: 67,
        downvotes: 2,
        logicalVotes: 52,
        replies: 15,
        isUpvoted: false,
        isDownvoted: false,
        isLogical: false,
      },
      {
        id: 2,
        author: "Serkan Yıldız",
        authorInitials: "SY",
        timeAgo: "5 saat önce",
        content: "Dalgalar ve optik konusundan çok soru geliyor. Formülleri ezberlemek gerekiyor, pratik yapmak şart.",
        upvotes: 45,
        downvotes: 3,
        logicalVotes: 34,
        replies: 9,
        isUpvoted: false,
        isDownvoted: false,
        isLogical: false,
      },
      {
        id: 3,
        author: "Gamze Kaya",
        authorInitials: "GK",
        timeAgo: "8 saat önce",
        content: "Zaman yönetimi çok önemli. Her konudan soru çözün, eksik kalmayın. Mock sınavlar yapın.",
        upvotes: 38,
        downvotes: 1,
        logicalVotes: 29,
        replies: 7,
        isUpvoted: false,
        isDownvoted: false,
        isLogical: false,
      },
    ],
    15: [
      {
        id: 1,
        author: "Seda Demir",
        authorInitials: "SD",
        timeAgo: "1 saat önce",
        content: "CV'de kısa ve öz olun, 1-2 sayfayı geçmeyin. Anahtar kelimeler kullanın, ATS sistemleri bunları arıyor.",
        upvotes: 42,
        downvotes: 2,
        logicalVotes: 32,
        replies: 10,
        isUpvoted: false,
        isDownvoted: false,
        isLogical: false,
      },
      {
        id: 2,
        author: "Hakan Özdemir",
        authorInitials: "HÖ",
        timeAgo: "4 saat önce",
        content: "Projelerinizi detaylı anlatın. Ne yaptığınızı, hangi teknolojileri kullandığınızı belirtin. Link ekleyin.",
        upvotes: 35,
        downvotes: 1,
        logicalVotes: 27,
        replies: 8,
        isUpvoted: false,
        isDownvoted: false,
        isLogical: false,
      },
      {
        id: 3,
        author: "Ufuk Korkmaz",
        authorInitials: "UK",
        timeAgo: "7 saat önce",
        content: "Kronolojik CV formatı en yaygın. En son deneyimlerinizi üste koyun. Güncel bilgiler kullanın.",
        upvotes: 28,
        downvotes: 2,
        logicalVotes: 21,
        replies: 6,
        isUpvoted: false,
        isDownvoted: false,
        isLogical: false,
      },
    ],
    16: [
      {
        id: 1,
        author: "Kerem Aydın",
        authorInitials: "KA",
        timeAgo: "2 saat önce",
        content: "Antrenmanlara katılıyorum, Salı ve Perşembe 18:00-20:00. Takım çalışması çok güzel, sosyal çevre genişliyor.",
        upvotes: 19,
        downvotes: 1,
        logicalVotes: 14,
        replies: 4,
        isUpvoted: false,
        isDownvoted: false,
        isLogical: false,
      },
      {
        id: 2,
        author: "Büşra Yıldırım",
        authorInitials: "BY",
        timeAgo: "5 saat önce",
        content: "Basketbol deneyimi olanlar tercih ediliyor ama yeni başlayanlar da kabul ediliyor. Önemli olan düzenli katılım.",
        upvotes: 15,
        downvotes: 2,
        logicalVotes: 11,
        replies: 3,
        isUpvoted: false,
        isDownvoted: false,
        isLogical: false,
      },
      {
        id: 3,
        author: "Tolga Şahin",
        authorInitials: "TŞ",
        timeAgo: "9 saat önce",
        content: "Spor yapmak hem sağlık hem sosyal açıdan çok faydalı. Takım ruhu gelişiyor, arkadaşlıklar kuruluyor.",
        upvotes: 22,
        downvotes: 0,
        logicalVotes: 17,
        replies: 5,
        isUpvoted: false,
        isDownvoted: false,
        isLogical: false,
      },
    ],
    17: [
      {
        id: 1,
        author: "Merve Çelik",
        authorInitials: "MÇ",
        timeAgo: "3 saat önce",
        content: "Yurt yönetimine yazılı başvuru yaptım. Sağlık sorunum var, bu yüzden oda değişikliği istiyorum.",
        upvotes: 11,
        downvotes: 1,
        logicalVotes: 8,
        replies: 2,
        isUpvoted: false,
        isDownvoted: false,
        isLogical: false,
      },
      {
        id: 2,
        author: "Onur Demir",
        authorInitials: "OD",
        timeAgo: "6 saat önce",
        content: "Süreç biraz zaman alıyor, sabırlı olmak gerekiyor. Boş oda olması şart, bu yüzden bekleme süresi uzayabiliyor.",
        upvotes: 9,
        downvotes: 2,
        logicalVotes: 6,
        replies: 3,
        isUpvoted: false,
        isDownvoted: false,
        isLogical: false,
      },
      {
        id: 3,
        author: "Ceren Aktaş",
        authorInitials: "CA",
        timeAgo: "10 saat önce",
        content: "Geçerli bir gerekçe sunmak gerekiyor. Sağlık, akademik veya ailevi durumlar kabul ediliyor.",
        upvotes: 13,
        downvotes: 0,
        logicalVotes: 10,
        replies: 4,
        isUpvoted: false,
        isDownvoted: false,
        isLogical: false,
      },
    ],
    18: [
      {
        id: 1,
        author: "Ali Rıza Güneş",
        authorInitials: "AG",
        timeAgo: "1 saat önce",
        content: "Python derslerine başladık, temel syntax'tan başlıyoruz. Her seviyeye uygun, ücretsiz ve sertifika verilecek.",
        upvotes: 89,
        downvotes: 2,
        logicalVotes: 68,
        replies: 18,
        isUpvoted: false,
        isDownvoted: false,
        isLogical: false,
      },
      {
        id: 2,
        author: "Elif Arslan",
        authorInitials: "EA",
        timeAgo: "4 saat önce",
        content: "JavaScript derslerinde ES6+ özelliklerini öğreniyoruz. React'e de geçeceğiz, çok heyecanlı.",
        upvotes: 72,
        downvotes: 1,
        logicalVotes: 55,
        replies: 14,
        isUpvoted: false,
        isDownvoted: false,
        isLogical: false,
      },
      {
        id: 3,
        author: "Oğuzhan Kara",
        authorInitials: "OK",
        timeAgo: "7 saat önce",
        content: "Pratik uygulamalar yapıyoruz, proje çalışmaları var. Grup çalışmaları çok verimli, birbirimizden öğreniyoruz.",
        upvotes: 65,
        downvotes: 3,
        logicalVotes: 50,
        replies: 12,
        isUpvoted: false,
        isDownvoted: false,
        isLogical: false,
      },
    ],
    19: [
      {
        id: 1,
        author: "Büşra Yıldırım",
        authorInitials: "BY",
        timeAgo: "2 saat önce",
        content: "Her ay bir kitap seçiyoruz, okuyup tartışıyoruz. Demokratik oylama ile kitap belirliyoruz.",
        upvotes: 34,
        downvotes: 1,
        logicalVotes: 26,
        replies: 8,
        isUpvoted: false,
        isDownvoted: false,
        isLogical: false,
      },
      {
        id: 2,
        author: "İrem Karaca",
        authorInitials: "İK",
        timeAgo: "5 saat önce",
        content: "Açık ve saygılı tartışma ortamı var. Farklı bakış açıları öğreniyoruz, eleştirel düşünme gelişiyor.",
        upvotes: 28,
        downvotes: 2,
        logicalVotes: 21,
        replies: 6,
        isUpvoted: false,
        isDownvoted: false,
        isLogical: false,
      },
      {
        id: 3,
        author: "Tolga Şahin",
        authorInitials: "TŞ",
        timeAgo: "9 saat önce",
        content: "Okuma alışkanlığı kazanıyorum, düzenli kitap okumaya başladım. Sosyal çevre de genişliyor.",
        upvotes: 31,
        downvotes: 0,
        logicalVotes: 24,
        replies: 7,
        isUpvoted: false,
        isDownvoted: false,
        isLogical: false,
      },
    ],
    20: [
      {
        id: 1,
        author: "Hakan Özdemir",
        authorInitials: "HÖ",
        timeAgo: "1 saat önce",
        content: "Frontend Developer Intern olarak 3 ay staj yaptım. React ve TypeScript kullandık, gerçek proje deneyimi kazandım.",
        upvotes: 58,
        downvotes: 2,
        logicalVotes: 44,
        replies: 11,
        isUpvoted: false,
        isDownvoted: false,
        isLogical: false,
      },
      {
        id: 2,
        author: "Ufuk Korkmaz",
        authorInitials: "UK",
        timeAgo: "4 saat önce",
        content: "Takım çalışması çok önemli. Kod review süreçlerini öğrendim, Agile metodolojileri gördüm. Çok şey öğrendim.",
        upvotes: 45,
        downvotes: 1,
        logicalVotes: 34,
        replies: 9,
        isUpvoted: false,
        isDownvoted: false,
        isLogical: false,
      },
      {
        id: 3,
        author: "Seda Demir",
        authorInitials: "SD",
        timeAgo: "8 saat önce",
        content: "Aktif olun, soru sorun. Networking yapın, geri bildirim alın. Staj sadece kod yazmak değil, öğrenmek için fırsat.",
        upvotes: 52,
        downvotes: 3,
        logicalVotes: 40,
        replies: 12,
        isUpvoted: false,
        isDownvoted: false,
        isLogical: false,
      },
    ],
    21: [
      {
        id: 1,
        author: "Ceren Aktaş",
        authorInitials: "CA",
        timeAgo: "2 saat önce",
        content: "Masa, sandalye, kitaplık satıyorum. Uygun fiyata, mezun oluyorum. İlgilenenler yazabilir.",
        upvotes: 8,
        downvotes: 1,
        logicalVotes: 6,
        replies: 2,
        isUpvoted: false,
        isDownvoted: false,
        isLogical: false,
      },
      {
        id: 2,
        author: "Merve Çelik",
        authorInitials: "MÇ",
        timeAgo: "5 saat önce",
        content: "Online platformlardan satış yapıyorum. Üniversite ilan panolarını da kullanıyorum, çok etkili.",
        upvotes: 11,
        downvotes: 0,
        logicalVotes: 8,
        replies: 3,
        isUpvoted: false,
        isDownvoted: false,
        isLogical: false,
      },
      {
        id: 3,
        author: "Onur Demir",
        authorInitials: "OD",
        timeAgo: "9 saat önce",
        content: "Toplu alım indirimi yapıyorum. Birkaç eşyayı birlikte alanlara özel fiyat. Pazarlık yapılabilir.",
        upvotes: 13,
        downvotes: 1,
        logicalVotes: 10,
        replies: 4,
        isUpvoted: false,
        isDownvoted: false,
        isLogical: false,
      },
    ],
    22: [
      {
        id: 1,
        author: "Tolga Şahin",
        authorInitials: "TŞ",
        timeAgo: "2 saat önce",
        content: "Cebir, geometri, sayılar teorisi ve kombinatorik konularını çalışıyoruz. Haftalık toplantılar yapıyoruz.",
        upvotes: 24,
        downvotes: 2,
        logicalVotes: 18,
        replies: 5,
        isUpvoted: false,
        isDownvoted: false,
        isLogical: false,
      },
      {
        id: 2,
        author: "Oğuzhan Kara",
        authorInitials: "OK",
        timeAgo: "5 saat önce",
        content: "Problem çözümü yapıyoruz, mock sınavlar düzenliyoruz. Kaynak paylaşımı var, çok faydalı.",
        upvotes: 19,
        downvotes: 1,
        logicalVotes: 14,
        replies: 4,
        isUpvoted: false,
        isDownvoted: false,
        isLogical: false,
      },
      {
        id: 3,
        author: "Serkan Yıldız",
        authorInitials: "SY",
        timeAgo: "8 saat önce",
        content: "Matematik sevgisi ve düzenli çalışma gerekiyor. Problem çözme isteği olmalı, zorlu ama keyifli.",
        upvotes: 22,
        downvotes: 0,
        logicalVotes: 17,
        replies: 6,
        isUpvoted: false,
        isDownvoted: false,
        isLogical: false,
      },
    ],
    23: [
      {
        id: 1,
        author: "İrem Karaca",
        authorInitials: "İK",
        timeAgo: "1 saat önce",
        content: "Eğitim alanında okul destek programlarına katılıyorum. Çocuklara ders veriyorum, çok anlamlı bir iş.",
        upvotes: 38,
        downvotes: 1,
        logicalVotes: 29,
        replies: 9,
        isUpvoted: false,
        isDownvoted: false,
        isLogical: false,
      },
      {
        id: 2,
        author: "Büşra Yıldırım",
        authorInitials: "BY",
        timeAgo: "4 saat önce",
        content: "Çevre projelerinde temizlik ve ağaçlandırma çalışmalarına katıldım. Doğaya katkı sağlamak güzel.",
        upvotes: 31,
        downvotes: 2,
        logicalVotes: 24,
        replies: 7,
        isUpvoted: false,
        isDownvoted: false,
        isLogical: false,
      },
      {
        id: 3,
        author: "Tolga Şahin",
        authorInitials: "TŞ",
        timeAgo: "7 saat önce",
        content: "Sosyal sorumluluk projeleri CV'ye eklenebilir, deneyim kazanıyorsunuz. Sertifika da veriliyor.",
        upvotes: 28,
        downvotes: 1,
        logicalVotes: 21,
        replies: 6,
        isUpvoted: false,
        isDownvoted: false,
        isLogical: false,
      },
    ],
    24: [
      {
        id: 1,
        author: "Ufuk Korkmaz",
        authorInitials: "UK",
        timeAgo: "1 saat önce",
        content: "Profil fotoğrafı profesyonel olmalı. Başlık kısmında iş unvanı ve uzmanlık alanınızı belirtin.",
        upvotes: 56,
        downvotes: 2,
        logicalVotes: 43,
        replies: 12,
        isUpvoted: false,
        isDownvoted: false,
        isLogical: false,
      },
      {
        id: 2,
        author: "Seda Demir",
        authorInitials: "SD",
        timeAgo: "4 saat önce",
        content: "Anahtar kelimeler kullanın, ATS sistemleri bunları arıyor. Düzenli güncelleyin, aktif olun.",
        upvotes: 48,
        downvotes: 1,
        logicalVotes: 37,
        replies: 10,
        isUpvoted: false,
        isDownvoted: false,
        isLogical: false,
      },
      {
        id: 3,
        author: "Hakan Özdemir",
        authorInitials: "HÖ",
        timeAgo: "8 saat önce",
        content: "Bağlantılar kurun, içerik paylaşın. Öneriler alın, profesyonel görünüm önemli. İş fırsatları artıyor.",
        upvotes: 42,
        downvotes: 3,
        logicalVotes: 32,
        replies: 9,
        isUpvoted: false,
        isDownvoted: false,
        isLogical: false,
      },
    ],
    25: [
      {
        id: 1,
        author: "Serkan Yıldız",
        authorInitials: "SY",
        timeAgo: "2 saat önce",
        content: "Birinci mertebe diferansiyel denklemler konusunu çalışıyorum. Çözümlü örnekler çok faydalı.",
        upvotes: 4,
        downvotes: 0,
        logicalVotes: 3,
        replies: 1,
        isUpvoted: false,
        isDownvoted: false,
        isLogical: false,
      },
      {
        id: 2,
        author: "Gamze Kaya",
        authorInitials: "GK",
        timeAgo: "5 saat önce",
        content: "Laplace dönüşümleri zor ama önemli. Pratik yapmak gerekiyor, formülleri ezberlemek şart.",
        upvotes: 3,
        downvotes: 1,
        logicalVotes: 2,
        replies: 0,
        isUpvoted: false,
        isDownvoted: false,
        isLogical: false,
      },
    ],
    26: [
      {
        id: 1,
        author: "Gamze Kaya",
        authorInitials: "GK",
        timeAgo: "1 saat önce",
        content: "Spor salonu öğrenciler için ücretsiz. Rezervasyon sistemi var, spor kıyafeti zorunlu.",
        upvotes: 6,
        downvotes: 0,
        logicalVotes: 4,
        replies: 2,
        isUpvoted: false,
        isDownvoted: false,
        isLogical: false,
      },
      {
        id: 2,
        author: "Onur Demir",
        authorInitials: "OD",
        timeAgo: "4 saat önce",
        content: "Fitness merkezinde ağırlık ve kardiyo ekipmanları var. Açık alanlarda futbol, tenis oynayabilirsiniz.",
        upvotes: 5,
        downvotes: 1,
        logicalVotes: 3,
        replies: 1,
        isUpvoted: false,
        isDownvoted: false,
        isLogical: false,
      },
    ],
    27: [
      {
        id: 1,
        author: "Onur Demir",
        authorInitials: "OD",
        timeAgo: "2 saat önce",
        content: "e-Devlet üzerinden başvuru yaptım, süreç çok kolay. Gerekli belgeleri yükledim, sonuç bekliyorum.",
        upvotes: 9,
        downvotes: 1,
        logicalVotes: 6,
        replies: 3,
        isUpvoted: false,
        isDownvoted: false,
        isLogical: false,
      },
      {
        id: 2,
        author: "Merve Çelik",
        authorInitials: "MÇ",
        timeAgo: "5 saat önce",
        content: "Gelir belgesi (aile) gerekiyor. Öğrenci belgesi ve fotoğraf da lazım. Belgeleri hazırlayın.",
        upvotes: 7,
        downvotes: 0,
        logicalVotes: 5,
        replies: 2,
        isUpvoted: false,
        isDownvoted: false,
        isLogical: false,
      },
      {
        id: 3,
        author: "Ceren Aktaş",
        authorInitials: "CA",
        timeAgo: "8 saat önce",
        content: "Yurtlar ekonomik, yemekhane var. Ortak alanlar ve güvenlik de iyi. Başvuru yapmanızı öneririm.",
        upvotes: 10,
        downvotes: 1,
        logicalVotes: 7,
        replies: 4,
        isUpvoted: false,
        isDownvoted: false,
        isLogical: false,
      },
    ],
  }
  
  return commentsMap[topicId] || [
    {
      id: 1,
      author: "Topluluk",
      authorInitials: "TP",
      timeAgo: "Yeni",
      content: "Bu başlık hakkında henüz yorum yapılmamış. İlk yorumu siz yapın!",
      upvotes: 0,
      downvotes: 0,
      logicalVotes: 0,
      replies: 0,
      isUpvoted: false,
      isDownvoted: false,
      isLogical: false,
    },
  ]
}

export function CommentFeed({ topicId }: CommentFeedProps) {
  const { state } = useApp()
  const { rewardCoins } = useCoinReward()
  const [newComment, setNewComment] = useState("")
  const [commentError, setCommentError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [sortOrder] = useState<"newest" | "popular" | "logical">("newest")
  const [replyingTo, setReplyingTo] = useState<{ id: number; author: string } | null>(null)
  const [animations, setAnimations] = useState<{ [key: string]: boolean }>({})
  const [comments, setComments] = useState<Comment[]>(getTopicComments(topicId))

  // topicId değiştiğinde yorumları güncelle
  useEffect(() => {
    setComments(getTopicComments(topicId))
  }, [topicId])

  const handleVote = (commentId: number, voteType: 'up' | 'down') => {
    if (!state.user) {
      setCommentError("Oy vermek için giriş yapmalısınız.")
      return
    }
    
    setComments(comments.map(comment => {
      if (comment.id === commentId) {
        if (voteType === 'up') {
          if (comment.isUpvoted) {
            // Beğeniyi geri al
            return { ...comment, upvotes: comment.upvotes - 1, isUpvoted: false }
          } else {
            // Beğeni ver - animasyon göster
            const animationKey = `like-${commentId}`
            setAnimations({ ...animations, [animationKey]: true })
            setTimeout(() => {
              setAnimations({ ...animations, [animationKey]: false })
            }, 600)
            // Beğeni ver
            // Not: Oy veren kullanıcı coin kazanmaz (sadece beğeniyor)
            // Yorum sahibi beğeni aldığında +1 coin kazanır (backend'de yapılacak)
            // Şimdilik sadece oy sayısını güncelliyoruz
            return {
              ...comment,
              upvotes: comment.upvotes + 1,
              downvotes: comment.isDownvoted ? comment.downvotes - 1 : comment.downvotes,
              isUpvoted: true,
              isDownvoted: false,
            }
          }
        } else {
          if (comment.isDownvoted) {
            // Beğenmemeyi geri al
            return { ...comment, downvotes: comment.downvotes - 1, isDownvoted: false }
          } else {
            // Beğenme ver
            // Not: Oy veren kullanıcı coin kaybetmez (sadece beğenmiyor)
            return {
              ...comment,
              downvotes: comment.downvotes + 1,
              upvotes: comment.isUpvoted ? comment.upvotes - 1 : comment.upvotes,
              isDownvoted: true,
              isUpvoted: false,
            }
          }
        }
      }
      return comment
    }))
  }

  const handleReply = (replyContent: string, parentCommentId: number) => {
    // Gerçek uygulamada API çağrısı yapılacak
    const newReply: Comment = {
      id: comments.length + 1,
      author: state.user?.name || "Anonim",
      authorInitials: state.user?.initials || "AN",
      timeAgo: "Şimdi",
      content: replyContent,
      upvotes: 0,
      downvotes: 0,
      logicalVotes: 0,
      replies: 0,
      parentId: parentCommentId,
      isUpvoted: false,
      isDownvoted: false,
      isLogical: false,
    }

    const animationKey = `comment-${parentCommentId}`
    setAnimations({ ...animations, [animationKey]: true })
    setTimeout(() => {
      setAnimations({ ...animations, [animationKey]: false })
    }, 600)

    // Parent comment'in replies sayısını artır
    setComments(comments.map(c => 
      c.id === parentCommentId 
        ? { ...c, replies: c.replies + 1, repliesList: [...(c.repliesList || []), newReply] }
        : c
    ))
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleFlagComment = async (_commentId: number) => {
    if (!state.user) {
      setCommentError("Yorum bildirmek için giriş yapmalısınız.")
      return
    }

    try {
      // Simüle edilmiş API çağrısı - gerçek uygulamada moderation API'sine gönderilecek
      await new Promise((resolve) => setTimeout(resolve, 500))
      
      // Başarı mesajı gösterilebilir
      alert("Yorum bildirildi. Moderatörler tarafından incelenecektir.")
    } catch {
      setCommentError("Yorum bildirilirken bir hata oluştu")
    }
  }

  const handleLogicalVote = (commentId: number) => {
    if (!state.user) {
      setCommentError("Oy vermek için giriş yapmalısınız.")
      return
    }

    setComments(comments.map(comment => {
      if (comment.id === commentId) {
        const currentVotes = comment.logicalVotes || 0
        if (comment.isLogical) {
          return { ...comment, logicalVotes: currentVotes - 1, isLogical: false }
        } else {
          // Coin kazanma (sadece ilk kez işaretlendiğinde)
          rewardCoins("comment_logical", { commentId })
          // Animasyon göster
          const animationKey = `logical-${commentId}`
          setAnimations({ ...animations, [animationKey]: true })
          setTimeout(() => {
            setAnimations({ ...animations, [animationKey]: false })
          }, 600)
          return { ...comment, logicalVotes: currentVotes + 1, isLogical: true }
        }
      }
      return comment
    }))
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4 sm:mb-6">
        <h2 className="font-[Manrope] text-foreground font-extrabold text-2xl sm:text-3xl lg:text-[32px]">
          Kullanıcı Görüşleri
        </h2>
        <div className="flex items-center gap-2">
          <Button className="bg-primary hover:bg-primary/90 font-[Manrope] font-bold text-xs sm:text-sm">
            En Yeni
          </Button>
          <Button 
            variant="outline" 
            className="border-2 border-primary text-primary hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white font-[Manrope] font-bold text-xs sm:text-sm"
          >
            En Popüler
          </Button>
        </div>
      </div>

      <div className="space-y-3 sm:space-y-4">
        {[...comments]
          .sort((a, b) => {
            if (sortOrder === "newest") {
              // En yeni - timeAgo'ya göre sıralama (mock için id kullanıyoruz)
              return b.id - a.id
            } else if (sortOrder === "popular") {
              // En popüler - upvotes - downvotes'e göre
              const scoreA = a.upvotes - a.downvotes
              const scoreB = b.upvotes - b.downvotes
              return scoreB - scoreA
            } else if (sortOrder === "logical") {
              // En mantıklı - logicalVotes'e göre
              const logicalA = a.logicalVotes || 0
              const logicalB = b.logicalVotes || 0
              return logicalB - logicalA
            }
            return 0
          })
          .map((comment) => (
          <Card
            key={comment.id}
            className="bg-card rounded-xl shadow-md dark:shadow-lg hover:shadow-lg dark:hover:shadow-xl transition-shadow duration-300 border border-border"
          >
            <CardContent className="p-4 sm:p-6">
              <div className="flex gap-3 sm:gap-4">

                {/* Comment Content */}
                <div className="flex-1">
                  <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                    <Avatar className="w-8 h-8 sm:w-10 sm:h-10 border-2 border-border">
                      <AvatarFallback className="bg-primary text-white font-[Manrope] font-bold text-[10px] sm:text-xs">
                        {comment.authorInitials}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-[Manrope] text-foreground font-bold text-sm sm:text-base">
                        {comment.author}
                      </div>
                      <div className="font-[Manrope] text-foreground/60 dark:text-muted-foreground font-medium text-xs sm:text-sm">
                        {comment.timeAgo}
                      </div>
                    </div>
                  </div>

                  <p className="font-[Manrope] text-foreground mb-3 sm:mb-4 font-medium text-sm sm:text-base leading-relaxed">
                    {comment.content}
                  </p>

                  {/* Actions */}
                  <div className="flex items-center gap-3 sm:gap-4 flex-wrap pt-3 border-t border-border">
                    <button 
                      onClick={() => handleVote(comment.id, 'up')}
                      className={`relative flex items-center gap-2 px-3 py-2 bg-accent rounded-lg hover:bg-primary/10 dark:hover:bg-primary/20 transition-colors ${
                        comment.isUpvoted ? 'bg-primary/10 dark:bg-primary/20' : ''
                      }`}
                      aria-label={comment.isUpvoted ? "Beğenmeyi geri al" : "Beğen"}
                      aria-pressed={comment.isUpvoted}
                    >
                      <ThumbsUp className={`w-4 h-4 text-primary ${comment.isUpvoted ? 'fill-primary' : ''}`} />
                      <span className="font-[Manrope] font-bold text-sm text-foreground">
                        {comment.upvotes - comment.downvotes}
                      </span>
                      {animations[`like-${comment.id}`] && (
                        <span className="absolute -top-1 -right-1 bg-primary text-white text-xs font-bold px-1.5 py-0.5 rounded-full animate-bounce">
                          +1
                        </span>
                      )}
                    </button>
                    <button 
                      onClick={() => handleLogicalVote(comment.id)}
                      className={`relative flex items-center gap-2 px-3 py-2 bg-accent rounded-lg hover:bg-primary/10 dark:hover:bg-primary/20 transition-colors ${
                        comment.isLogical ? 'bg-primary/10 dark:bg-primary/20' : ''
                      }`}
                      aria-label={comment.isLogical ? "Mantıklı yorum işaretini kaldır" : "Mantıklı yorum olarak işaretle"}
                      aria-pressed={comment.isLogical}
                    >
                      <Lightbulb className={`w-4 h-4 text-primary ${comment.isLogical ? 'fill-primary' : ''}`} />
                      <span className="font-[Manrope] font-bold text-sm text-foreground">
                        {comment.logicalVotes || 0}
                      </span>
                      <span className="font-[Manrope] font-medium text-xs text-foreground/60 dark:text-muted-foreground hidden sm:inline">
                        Mantıklı
                      </span>
                      {animations[`logical-${comment.id}`] && (
                        <span className="absolute -top-1 -right-1 bg-primary text-white text-xs font-bold px-1.5 py-0.5 rounded-full animate-bounce">
                          +1
                        </span>
                      )}
                    </button>
                    <button 
                      onClick={() => setReplyingTo({ id: comment.id, author: comment.author })}
                      className="relative flex items-center gap-2 px-3 py-2 bg-accent rounded-lg hover:bg-primary/10 dark:hover:bg-primary/20 transition-colors"
                      aria-label={`${comment.replies} yorum`}
                    >
                      <MessageCircle className="w-4 h-4 text-primary" />
                      <span className="font-[Manrope] font-bold text-sm text-foreground">
                        {comment.replies}
                      </span>
                      {animations[`comment-${comment.id}`] && (
                        <span className="absolute -top-1 -right-1 bg-primary text-white text-xs font-bold px-1.5 py-0.5 rounded-full animate-bounce">
                          +1
                        </span>
                      )}
                    </button>
                    <button 
                      onClick={() => handleFlagComment(comment.id)}
                      className="flex items-center gap-2 text-foreground/60 dark:text-muted-foreground hover:text-primary transition-colors ml-auto"
                      aria-label="Yorumu bildir"
                    >
                      <Flag className="w-3 h-3 sm:w-4 sm:h-4" aria-hidden="true" />
                      <span className="font-[Manrope] font-semibold text-xs sm:text-sm">
                        Bildir
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Reply Dialog */}
      {replyingTo && (
        <CommentReplyDialog
          open={!!replyingTo}
          onOpenChange={(open) => !open && setReplyingTo(null)}
          parentCommentId={replyingTo.id}
          parentAuthor={replyingTo.author}
          onReply={handleReply}
        />
      )}

      {/* Add Comment Section */}
      <Card className="mt-4 sm:mt-6 bg-card rounded-xl shadow-md dark:shadow-lg border border-border">
        <CardHeader>
          <CardTitle className="font-[Manrope] text-foreground font-bold text-lg sm:text-xl">
            Görüş Bildir
          </CardTitle>
        </CardHeader>
        <CardContent>
          {commentError && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription className="font-[Manrope]">{commentError}</AlertDescription>
            </Alert>
          )}

          <Textarea
            value={newComment}
            onChange={(e) => {
              setNewComment(e.target.value)
              setCommentError(null)
            }}
            placeholder="Deneyimlerinizi ve düşüncelerinizi paylaşın..."
            className="w-full p-3 sm:p-4 bg-accent rounded-xl font-[Manrope] text-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary font-medium min-h-[100px] sm:min-h-[120px] text-sm sm:text-base"
            disabled={isSubmitting}
            aria-label="Yorum metni"
          />

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0 mt-3 sm:mt-4">
            <div className="flex flex-col gap-1">
              <span className="font-[Manrope] text-foreground/60 dark:text-muted-foreground font-medium text-xs sm:text-sm">
                Lütfen yapıcı ve saygılı yorumlar yazın
              </span>
              {state.user && (() => {
                const remaining = getRemainingActions(state.user, "comment")
                if (remaining.limit !== null) {
                  const isLow = remaining.remaining <= 2
                  return (
                    <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg ${
                      isLow 
                        ? 'bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20' 
                        : 'bg-accent'
                    }`}>
                      <span className={`font-[Manrope] font-semibold text-xs ${
                        isLow ? 'text-amber-700 dark:text-amber-400' : 'text-muted-foreground'
                      }`}>
                        Kalan yorum hakkı: <span className="font-bold">{remaining.remaining}</span> / {remaining.limit} ({remaining.timeWindow})
                      </span>
                    </div>
                  )
                }
                return null
              })()}
            </div>
            <Button
              onClick={async () => {
                if (!newComment.trim()) {
                  setCommentError("Yorum boş olamaz")
                  return
                }

                // Rate limit kontrolü
                const check = canPerformAction(state.user, "comment")
                if (!check.allowed) {
                  setCommentError(check.reason || "Yorum gönderilemedi")
                  // Toast notification ile görsel uyarı
                  toast.error("⚠️ Rate Limit Aşıldı", {
                    description: check.reason || "Yorum gönderilemedi",
                    duration: 5000,
                  })
                  return
                }

                setIsSubmitting(true)
                setCommentError(null)

                try {
                  // Rate limit kaydı
                  const result = performAction(state.user, "comment")
                  if (!result.success) {
                    setCommentError(result.reason || "Yorum gönderilemedi")
                    toast.error("⚠️ Rate Limit Aşıldı", {
                      description: result.reason || "Yorum gönderilemedi",
                      duration: 5000,
                    })
                    setIsSubmitting(false)
                    return
                  }

                  // Simüle edilmiş API çağrısı
                  await new Promise((resolve) => setTimeout(resolve, 500))

                  // Coin kazanma
                  rewardCoins("comment", { content: newComment })

                  // User stats güncelle
                  incrementCommentCount(state.user)

                  // Topic comment count güncelle
                  incrementTopicComments(topicId, comments.length)

                  // Yeni yorum ekle
                  const newCommentObj: Comment = {
                    id: comments.length + 1,
                    author: state.user?.name || "Anonim",
                    authorInitials: state.user?.initials || "AN",
                    timeAgo: "Şimdi",
                    content: newComment,
                    upvotes: 0,
                    downvotes: 0,
                    logicalVotes: 0,
                    replies: 0,
                    isUpvoted: false,
                    isDownvoted: false,
                    isLogical: false,
                  }

                  setComments([newCommentObj, ...comments])
                  setNewComment("")
                } catch (err) {
                  setCommentError(err instanceof Error ? err.message : "Yorum gönderilirken bir hata oluştu")
                } finally {
                  setIsSubmitting(false)
                }
              }}
              disabled={isSubmitting || !newComment.trim() || !state.user}
              className="bg-primary hover:bg-primary/90 font-[Manrope] px-6 sm:px-8 font-bold text-xs sm:text-sm disabled:opacity-50"
              aria-label="Yorumu gönder"
            >
              {isSubmitting ? "Gönderiliyor..." : "Gönder"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

