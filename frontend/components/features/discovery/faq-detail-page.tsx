"use client"

import { ArrowLeft, Clock, ThumbsUp, MessageCircle, Share2, BookOpen, Lightbulb, Send } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useApp } from "@/contexts/app-context"

// Generate random comments for FAQ
function generateComments(count: number, faqId: number) {
  const commentTemplates = [
    "Çok faydalı bir bilgi, teşekkürler!",
    "Ben de bu mekanları denedim, gerçekten harika!",
    "Çok detaylı bir açıklama olmuş, elinize sağlık.",
    "Bu bilgiyi paylaştığınız için teşekkür ederim.",
    "Kesinlikle katılıyorum, çok doğru bilgiler.",
    "Ben de aynı deneyimi yaşadım, çok memnun kaldım.",
    "Yeni bir şey öğrendim, çok teşekkürler!",
    "Bu konuda daha fazla bilgi var mı?",
    "Çok yardımcı oldu, sağ olun.",
    "Harika bir rehber, herkese tavsiye ederim.",
    "Bu bilgileri not aldım, çok işime yarayacak.",
    "Çok açıklayıcı ve faydalı bir içerik.",
    "Teşekkürler, çok yardımcı oldunuz.",
    "Kesinlikle doğru, ben de aynı şeyi yaşadım.",
    "Çok güzel bir açıklama, elinize sağlık.",
  ]

  const authors = [
    { name: "Ahmet Yılmaz", initials: "AY" },
    { name: "Zeynep Kaya", initials: "ZK" },
    { name: "Mehmet Demir", initials: "MD" },
    { name: "Ayşe Şahin", initials: "AŞ" },
    { name: "Can Özkan", initials: "CÖ" },
    { name: "Elif Yıldız", initials: "EY" },
    { name: "Burak Kaya", initials: "BK" },
    { name: "Selin Arslan", initials: "SA" },
    { name: "Emre Çelik", initials: "EÇ" },
    { name: "Deniz Yılmaz", initials: "DY" },
  ]

  const timestamps = [
    "Az önce",
    "5 dakika önce",
    "15 dakika önce",
    "1 saat önce",
    "2 saat önce",
    "5 saat önce",
    "1 gün önce",
    "2 gün önce",
    "3 gün önce",
    "1 hafta önce",
  ]

  const comments = []
  for (let i = 0; i < count; i++) {
    const author = authors[Math.floor(Math.random() * authors.length)]
    const content = commentTemplates[Math.floor(Math.random() * commentTemplates.length)]
    const timestamp = timestamps[Math.floor(Math.random() * timestamps.length)]
    const likes = Math.floor(Math.random() * 10) // 0-9 arası rastgele beğeni

    comments.push({
      id: faqId * 1000 + i + 1, // Unique ID
      author: author.name,
      authorInitials: author.initials,
      content,
      timestamp,
      likes,
    })
  }

  return comments
}

// FAQ Data - konya-discovery-page.tsx'teki ile aynı
// Her FAQ için 3-13 arası rastgele yorum sayısı belirle
const faqData = [
  {
    id: 1,
    author: "Konya Rehberi",
    authorInitials: "KR",
    question: "Etli ekmek nerede yenir?",
    answer: "Konya'nın en meşhur etli ekmek mekanları: Meram'da bulunan tarihi etli ekmek fırınları, Alaaddin Tepesi çevresindeki restoranlar ve şehir merkezindeki geleneksel fırınlar. Özellikle 'Fırın Kebabı' olarak bilinen yerlerde en lezzetli etli ekmeği bulabilirsiniz. Meram ve Karatay ilçelerindeki eski mahalle fırınları da çok popülerdir.",
    detailedAnswer: `Konya'nın en meşhur etli ekmek mekanları şunlardır:

**Meram Bölgesi:**
- Meram'da bulunan tarihi etli ekmek fırınları yüzyıllardır aynı lezzeti sunmaktadır
- Özellikle Meram Çarşısı çevresindeki fırınlar çok popülerdir
- Geleneksel odun fırınında pişen etli ekmeklerin tadı bir başkadır

**Alaaddin Tepesi Çevresi:**
- Şehir merkezindeki restoranlar turistler için ideal konumdadır
- Hem geleneksel hem de modern sunum seçenekleri bulunur
- Öğle ve akşam yemekleri için mükemmel bir seçenektir

**Karatay İlçesi:**
- Eski mahalle fırınları otantik deneyim sunar
- Yerel halkın tercih ettiği mekanlar genellikle bu bölgededir
- Fiyatlar daha uygun ve porsiyonlar daha büyüktür

**Öneriler:**
- Öğle saatlerinde (12:00-14:00) en taze etli ekmekleri bulabilirsiniz
- Akşam saatlerinde (18:00-20:00) daha kalabalık olur, rezervasyon önerilir
- Hafta sonları çok yoğun olur, hafta içi tercih edilirse daha rahat yersiniz`,
    timeAgo: "2 gün önce",
    likes: 45,
    comments: getCommentCount(1), // 3-13 arası deterministik
    makesSense: 23,
    category: "Yemek & Restoran",
    relatedQuestions: [
      { id: 2, question: "Konya'nın en ünlü yemekleri nelerdir?" },
      { id: 5, question: "Konya'da nerede kahvaltı yapılır?" }
    ]
  },
  {
    id: 2,
    author: "Konya Rehberi",
    authorInitials: "KR",
    question: "Konya'da ne zaman gidilir?",
    answer: "Konya'yı ziyaret etmek için en ideal zamanlar ilkbahar (Nisan-Mayıs) ve sonbahar (Eylül-Ekim) aylarıdır. Özellikle Aralık ayında Mevlana Şeb-i Arus törenleri için çok özel bir atmosfer olur. Yaz ayları çok sıcak olabilir, kış ayları ise soğuk ama kar manzarası güzel olabilir.",
    detailedAnswer: `Konya'yı ziyaret etmek için en ideal zamanlar:

**İlkbahar (Nisan-Mayıs):**
- Hava sıcaklığı çok uygun, ortalama 15-25°C
- Doğa yeşillenir, parklar ve bahçeler çok güzel olur
- Turist sayısı henüz çok fazla değildir
- Fiyatlar daha uygun olur

**Yaz (Haziran-Ağustos):**
- Çok sıcak olur, gündüz 35-40°C'ye çıkabilir
- Sabah erken saatlerde (06:00-10:00) veya akşam saatlerinde (18:00-22:00) gezmek daha rahat olur
- İç mekanlar (müzeler, camiler) daha serin olur
- Turist sayısı en yüksek seviyededir

**Sonbahar (Eylül-Ekim):**
- En ideal mevsim, hava çok uygun
- Turist kalabalığı azalır
- Fiyatlar daha uygun olur
- Doğa renkleri çok güzeldir

**Kış (Kasım-Mart):**
- Soğuk olur ama kar manzarası güzel olabilir
- Aralık ayında Mevlana Şeb-i Arus törenleri çok özel bir atmosfer yaratır
- İç mekanlar daha sıcak olur
- Turist sayısı en azdır, daha sakin bir deneyim sunar

**Özel Etkinlikler:**
- Aralık ayı: Mevlana Şeb-i Arus törenleri (mutlaka görülmeli)
- Nisan-Mayıs: Kiraz çiçekleri açtığında Japon Parkı çok güzel olur
- Yaz ayları: Çeşitli festivaller ve etkinlikler düzenlenir`,
    timeAgo: "3 gün önce",
    likes: 38,
    comments: getCommentCount(2), // 3-13 arası deterministik
    makesSense: 19,
    category: "Ziyaret Planı",
    relatedQuestions: [
      { id: 1, question: "Etli ekmek nerede yenir?" },
      { id: 3, question: "Mevlana Müzesi'ne giriş ücretli mi?" }
    ]
  },
  {
    id: 3,
    author: "Konya Rehberi",
    authorInitials: "KR",
    question: "Mevlana Müzesi'ne giriş ücretli mi?",
    answer: "Evet, Mevlana Müzesi'ne giriş ücretlidir. Ancak Müze Kart geçerlidir. Müze Kart ile yılda iki kez ücretsiz giriş yapabilirsiniz. Pazartesi günleri kapalıdır, ziyaret saatleri 09:00-17:00 arasındadır.",
    detailedAnswer: `Mevlana Müzesi giriş bilgileri:

**Giriş Ücretleri:**
- Tam bilet: 150 TL (2024)
- Öğrenci: 50 TL (öğrenci belgesi ile)
- Müze Kart: Geçerli (yılda 2 kez ücretsiz giriş)
- 18 yaş altı: Ücretsiz

**Ziyaret Saatleri:**
- Açılış: 09:00
- Kapanış: 17:00 (kış), 19:00 (yaz)
- Pazartesi: Kapalı
- Bayram günleri: Özel program

**Müze Kart:**
- Türkiye'deki tüm müzeler için geçerlidir
- Yılda 2 kez ücretsiz giriş hakkı verir
- Online veya müze girişinde satın alınabilir
- Öğrenciler için indirimli seçenekler mevcuttur

**Ziyaret İpuçları:**
- Sabah erken saatlerde (09:00-11:00) daha az kalabalık olur
- Hafta içi günler hafta sonlarından daha sakin olur
- Rehberli turlar mevcuttur (ek ücret)
- Fotoğraf çekmek serbesttir (flaş kullanmayın)
- İçeride yaklaşık 1-2 saat geçirebilirsiniz`,
    timeAgo: "4 gün önce",
    likes: 52,
    comments: getCommentCount(3), // 3-13 arası deterministik
    makesSense: 31,
    category: "Müze & Tarihi Yerler",
    relatedQuestions: [
      { id: 2, question: "Konya'da ne zaman gidilir?" },
      { id: 4, question: "Konya'da ulaşım nasıl sağlanır?" }
    ]
  },
  {
    id: 4,
    author: "Konya Rehberi",
    authorInitials: "KR",
    question: "Konya'da ulaşım nasıl sağlanır?",
    answer: "Konya'da ulaşım oldukça kolaydır. Tramvay hattı şehrin ana arterlerinden geçer. Otobüs hatları geniş bir ağa sahiptir. Şehir merkezi yürüyüş mesafesinde birçok yeri kapsar. Taksi ve dolmuşlar da yaygın olarak kullanılır.",
    detailedAnswer: `Konya'da ulaşım seçenekleri:

**Tramvay:**
- Şehrin ana arterlerinden geçer
- Merkez'den Mevlana, Alaaddin, Selçuk Üniversitesi gibi önemli noktalara ulaşım sağlar
- Bilet: 5 TL (2024)
- İndirimli biletler öğrenciler için mevcuttur
- Sık aralıklarla çalışır (5-10 dakika)

**Otobüs:**
- Geniş bir hat ağına sahiptir
- Şehrin her yerine ulaşım sağlar
- Bilet: 5 TL
- Kent Kart ile daha uygun fiyatlı
- Mobil uygulama ile hat bilgilerine erişilebilir

**Taksi:**
- Yaygın olarak kullanılır
- Taksimetre ile çalışır
- Merkez içi kısa mesafeler için uygun
- Gece saatlerinde ek ücret alınabilir

**Dolmuş:**
- Belirli güzergahlarda çalışır
- Daha uygun fiyatlıdır
- Yerel halk tarafından sık kullanılır

**Yürüyüş:**
- Şehir merkezi yürüyüş mesafesinde birçok yeri kapsar
- Mevlana, Alaaddin Tepesi, şehir merkezi arası yürünebilir mesafededir
- Sağlıklı ve ekonomik bir seçenektir

**Öneriler:**
- Kent Kart almak uzun süreli ziyaretler için avantajlıdır
- Mobil uygulamalar ile hat bilgilerine erişilebilir
- Merkez'de konaklıyorsanız çoğu yere yürüyerek gidebilirsiniz`,
    timeAgo: "5 gün önce",
    likes: 29,
    comments: getCommentCount(4), // 3-13 arası deterministik
    makesSense: 15,
    category: "Ulaşım",
    relatedQuestions: [
      { id: 3, question: "Mevlana Müzesi'ne giriş ücretli mi?" },
      { id: 6, question: "Kelebekler Vadisi'ne nasıl gidilir?" }
    ]
  },
  {
    id: 5,
    author: "Konya Rehberi",
    authorInitials: "KR",
    question: "Konya'nın en ünlü yemekleri nelerdir?",
    answer: "Konya mutfağının en ünlü yemekleri: Etli ekmek, fırın kebabı, bamya çorbası, Mevlana böreği, tirit, etli pide ve sac kavurma. Tatlı olarak ise höşmerim ve peynirli irmik helvası çok meşhurdur.",
    detailedAnswer: `Konya mutfağının en ünlü yemekleri:

**Ana Yemekler:**
- **Etli Ekmek:** Konya'nın simgesi, ince açılmış hamur üzerine kıyma ve baharat
- **Fırın Kebabı:** Özel fırınlarda pişirilen, çok lezzetli bir kebab çeşidi
- **Bamya Çorbası:** Geleneksel çorba, özellikle kış aylarında çok sevilir
- **Mevlana Böreği:** İnce yufka ile yapılan, özel bir börek çeşidi
- **Tirit:** Et suyu, ekmek ve et ile yapılan geleneksel yemek
- **Etli Pide:** Kalın hamur üzerine et ve baharat
- **Sac Kavurma:** Sac üzerinde pişirilen et yemeği

**Tatlılar:**
- **Höşmerim:** Peynirli, çok özel bir tatlı
- **Peynirli İrmik Helvası:** Konya'ya özgü bir helva çeşidi
- **Tahinli Pide:** Tatlı bir pide çeşidi
- **Cevizli Sucuk:** Ceviz ve pekmezle yapılan geleneksel tatlı

**Nerede Yenir:**
- Meram bölgesindeki restoranlar geleneksel lezzetleri sunar
- Alaaddin Tepesi çevresinde modern ve geleneksel seçenekler bulunur
- Şehir merkezindeki lokantalar turistler için idealdir

**Öneriler:**
- Etli ekmek mutlaka denenmeli
- Fırın kebabı özel fırınlarda daha lezzetli olur
- Geleneksel tatlılar için özel tatlıcıları ziyaret edin`,
    timeAgo: "1 hafta önce",
    likes: 67,
    comments: getCommentCount(5), // 3-13 arası deterministik
    makesSense: 42,
    category: "Yemek & Restoran",
    relatedQuestions: [
      { id: 1, question: "Etli ekmek nerede yenir?" },
      { id: 2, question: "Konya'da ne zaman gidilir?" }
    ]
  },
  {
    id: 6,
    author: "Konya Rehberi",
    authorInitials: "KR",
    question: "Kelebekler Vadisi'ne nasıl gidilir?",
    answer: "Tropikal Kelebek Bahçesi (Kelebekler Vadisi), Selçuk Üniversitesi kampüsü içinde yer alır. 12 ve 31 numaralı otobüslerle ulaşabilirsiniz. Merkez'den yaklaşık 20 dakika sürer. Kampüs içinde olduğu için araba ile gitmek de mümkündür, otopark mevcuttur.",
    detailedAnswer: `Tropikal Kelebek Bahçesi (Kelebekler Vadisi) ulaşım bilgileri:

**Konum:**
- Selçuk Üniversitesi kampüsü içinde yer alır
- Kampüsün doğu tarafında, Bilim Merkezi'nin yanında
- Merkez'den yaklaşık 8-10 km uzaklıkta

**Otobüs ile:**
- 12 numaralı otobüs: Merkez'den direkt kampüse gider
- 31 numaralı otobüs: Kampüs içinden geçer
- Süre: Merkez'den yaklaşık 20-25 dakika
- Bilet: 5 TL

**Tramvay + Otobüs:**
- Tramvay ile Selçuk Üniversitesi durağına gelin
- Oradan kampüs içi servis veya otobüs ile devam edin
- Toplam süre: 25-30 dakika

**Araba ile:**
- Kampüs içinde otopark mevcuttur
- Merkez'den yaklaşık 15-20 dakika sürer
- Navigasyon ile kolayca bulunabilir

**Ziyaret Bilgileri:**
- Açılış: 09:00
- Kapanış: 17:00
- Giriş ücreti: 50 TL (öğrenci: 25 TL)
- İçeride sıcaklık 26-28°C, hafif giyinmeniz önerilir
- Fotoğraf çekmek serbesttir

**Öneriler:**
- Sabah saatlerinde (10:00-12:00) kelebekler daha aktif olur
- Hafta içi daha az kalabalık olur
- Kampüs içinde yemek yeme seçenekleri mevcuttur`,
    timeAgo: "1 hafta önce",
    likes: 41,
    comments: getCommentCount(6), // 3-13 arası deterministik
    makesSense: 28,
    category: "Ulaşım",
    relatedQuestions: [
      { id: 4, question: "Konya'da ulaşım nasıl sağlanır?" },
      { id: 3, question: "Mevlana Müzesi'ne giriş ücretli mi?" }
    ]
  }
]

// Simple markdown parser for bold and lists
function parseMarkdown(text: string) {
  const lines = text.split('\n')
  const result: JSX.Element[] = []
  let inList = false
  let listItems: JSX.Element[] = []
  
  lines.forEach((line, index) => {
    const trimmedLine = line.trim()
    
    if (trimmedLine === '') {
      if (inList && listItems.length > 0) {
        result.push(
          <ul key={`list-${index}`} className="list-disc list-inside mb-4 space-y-1">
            {listItems}
          </ul>
        )
        listItems = []
        inList = false
      }
      result.push(<br key={`br-${index}`} />)
      return
    }
    
    // Bold text **text**
    const boldRegex = /\*\*(.*?)\*\*/g
    const parts: (string | JSX.Element)[] = []
    let lastIndex = 0
    let match
    
    while ((match = boldRegex.exec(line)) !== null) {
      if (match.index > lastIndex) {
        parts.push(line.substring(lastIndex, match.index))
      }
      parts.push(<strong key={`bold-${index}-${match.index}`} className="font-bold text-foreground">{match[1]}</strong>)
      lastIndex = match.index + match[0].length
    }
    
    if (lastIndex < line.length) {
      parts.push(line.substring(lastIndex))
    }
    
    if (parts.length === 0) {
      parts.push(line)
    }
    
    // Check if it's a list item
    if (trimmedLine.startsWith('- ')) {
      if (!inList) {
        inList = true
      }
      listItems.push(
        <li key={index} className="font-[Manrope] text-foreground/70 dark:text-muted-foreground">
          {parts}
        </li>
      )
    } else {
      if (inList && listItems.length > 0) {
        result.push(
          <ul key={`list-${index}`} className="list-disc list-inside mb-4 space-y-1">
            {listItems}
          </ul>
        )
        listItems = []
        inList = false
      }
      result.push(
        <p key={index} className="mb-2 font-[Manrope] text-foreground/70 dark:text-muted-foreground leading-relaxed">
          {parts}
        </p>
      )
    }
  })
  
  // Close any remaining list
  if (inList && listItems.length > 0) {
    result.push(
      <ul key="list-final" className="list-disc list-inside mb-4 space-y-1">
        {listItems}
      </ul>
    )
  }
  
  return result
}

export function FAQDetailPage({ faqId }: { faqId: number }) {
  const { state } = useApp()
  const faq = faqData.find(f => f.id === faqId)
  const [localFaq, setLocalFaq] = useState(faq ? { ...faq } : null)
  const [isLiked, setIsLiked] = useState(false)
  const [isMakesSense, setIsMakesSense] = useState(false)
  const [showComments, setShowComments] = useState(true)
  const [commentInput, setCommentInput] = useState("")
  // FAQ'nin gerçek yorum sayısına göre yorumlar oluştur
  const [comments, setComments] = useState(() => {
    if (!faq) return []
    return generateComments(faq.comments, faq.id)
  })
  const [animations, setAnimations] = useState<{ [key: string]: boolean }>({})

  if (!faq || !localFaq) {
    return (
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-16 py-4 sm:py-6 md:py-8">
        <div className="text-center py-12">
          <h1 className="font-[Manrope] text-foreground mb-4 font-extrabold text-2xl sm:text-3xl">
            Soru Bulunamadı
          </h1>
          <Link href="/discovery">
            <Button className="bg-primary text-white hover:bg-primary/90 font-[Manrope] font-bold">
              Geri Dön
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: faq.question,
          text: faq.answer,
          url: window.location.href,
        })
        toast.success("Paylaşıldı", {
          description: "İçerik başarıyla paylaşıldı",
          duration: 3000,
        })
      } catch (err) {
        // User cancelled or error
        if (err instanceof Error && err.name !== 'AbortError') {
          toast.error("Paylaşım başarısız", {
            description: "İçerik paylaşılamadı. Lütfen tekrar deneyin.",
            duration: 3000,
          })
        }
      }
    } else {
      // Fallback: Copy to clipboard
      try {
        await navigator.clipboard.writeText(window.location.href)
        toast.success("Link kopyalandı", {
          description: "Bağlantı panoya kopyalandı",
          duration: 3000,
        })
      } catch (err) {
        toast.error("Kopyalama başarısız", {
          description: "Link kopyalanamadı",
          duration: 3000,
        })
      }
    }
  }

  const handleLike = () => {
    if (!state.user) return

    const newIsLiked = !isLiked
    setIsLiked(newIsLiked)

    if (newIsLiked) {
      const animationKey = `like-${faq.id}`
      setAnimations({ ...animations, [animationKey]: true })
      setTimeout(() => {
        setAnimations({ ...animations, [animationKey]: false })
      }, 600)
    }

    setLocalFaq({
      ...localFaq,
      likes: newIsLiked ? localFaq.likes + 1 : localFaq.likes - 1,
    })
  }

  const handleMakesSense = () => {
    if (!state.user) return

    const newIsMakesSense = !isMakesSense
    setIsMakesSense(newIsMakesSense)

    if (newIsMakesSense) {
      const animationKey = `logical-${faq.id}`
      setAnimations({ ...animations, [animationKey]: true })
      setTimeout(() => {
        setAnimations({ ...animations, [animationKey]: false })
      }, 600)
    }

    setLocalFaq({
      ...localFaq,
      makesSense: newIsMakesSense ? localFaq.makesSense + 1 : localFaq.makesSense - 1,
    })
  }

  const handleSendComment = () => {
    if (!commentInput.trim() || !state.user) return

    const newComment = {
      id: Date.now(),
      author: state.user.name,
      authorInitials: state.user.initials,
      content: commentInput.trim(),
      timestamp: "Az önce",
      likes: 0,
    }

    setComments([...comments, newComment])
    setCommentInput("")
    setLocalFaq({
      ...localFaq,
      comments: localFaq.comments + 1,
    })
  }

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-16 py-4 sm:py-6 md:py-8">
      {/* Back Button */}
      <Link href="/discovery">
        <Button
          variant="ghost"
          className="mb-4 sm:mb-6 font-[Manrope] text-foreground hover:text-primary"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Geri Dön
        </Button>
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-4 sm:space-y-6">
          {/* Question Header */}
          <Card className="bg-card rounded-xl shadow-md dark:shadow-lg border border-border">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-4 flex-1">
                  <Avatar className="w-12 h-12 sm:w-14 sm:h-14 border-2 border-border">
                    <AvatarFallback className="bg-primary text-primary-foreground font-[Manrope] font-bold text-lg sm:text-xl">
                      {faq.authorInitials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2">
                      <span className="font-[Manrope] font-bold text-foreground text-base sm:text-lg">
                        {faq.author}
                      </span>
                      <Badge className="bg-primary/10 text-primary border-0 font-[Manrope] font-semibold text-xs sm:text-sm">
                        Rehber
                      </Badge>
                      <Badge variant="secondary" className="font-[Manrope] text-xs sm:text-sm">
                        {faq.category}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground mb-4">
                      <Clock className="w-4 h-4" />
                      <span className="font-[Manrope] font-medium text-xs sm:text-sm">{faq.timeAgo}</span>
                    </div>
                    <h1 className="font-[Manrope] text-foreground mb-4 font-extrabold text-2xl sm:text-3xl lg:text-4xl">
                      {faq.question}
                    </h1>
                    
                    {/* Answer right below question */}
                    <div className="mb-4 p-4 bg-accent rounded-xl">
                      <p className="font-[Manrope] text-foreground/80 dark:text-muted-foreground leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3 pt-4 border-t border-border">
                <button 
                  onClick={handleLike}
                  className={`relative flex items-center gap-2 px-3 py-2 bg-accent rounded-lg hover:bg-primary/10 dark:hover:bg-primary/20 transition-colors ${
                    isLiked ? 'bg-primary/10 dark:bg-primary/20' : ''
                  }`}
                  aria-label={`${localFaq.likes} beğeni`}
                >
                  <ThumbsUp className={`w-4 h-4 text-primary ${isLiked ? 'fill-primary' : ''}`} />
                  <span className="font-[Manrope] font-bold text-sm text-foreground">{localFaq.likes}</span>
                  {animations[`like-${faq.id}`] && (
                    <span className="absolute -top-1 -right-1 bg-primary text-white text-xs font-bold px-1.5 py-0.5 rounded-full animate-bounce">
                      +1
                    </span>
                  )}
                </button>
                <button 
                  onClick={handleMakesSense}
                  className={`relative flex items-center gap-2 px-3 py-2 bg-accent rounded-lg hover:bg-primary/10 dark:hover:bg-primary/20 transition-colors ${
                    isMakesSense ? 'bg-primary/10 dark:bg-primary/20' : ''
                  }`}
                  aria-label={`${localFaq.makesSense} mantıklı`}
                >
                  <Lightbulb className={`w-4 h-4 text-primary ${isMakesSense ? 'fill-primary' : ''}`} />
                  <span className="font-[Manrope] font-bold text-sm text-foreground">{localFaq.makesSense}</span>
                  <span className="font-[Manrope] font-medium text-xs text-foreground/60 dark:text-muted-foreground hidden sm:inline">Mantıklı</span>
                  {animations[`logical-${faq.id}`] && (
                    <span className="absolute -top-1 -right-1 bg-primary text-white text-xs font-bold px-1.5 py-0.5 rounded-full animate-bounce">
                      +1
                    </span>
                  )}
                </button>
                <button 
                  onClick={() => setShowComments(!showComments)}
                  className={`flex items-center gap-2 px-3 py-2 bg-accent rounded-lg hover:bg-primary/10 dark:hover:bg-primary/20 transition-colors ${
                    showComments ? 'bg-primary/10 dark:bg-primary/20' : ''
                  }`}
                  aria-label={`${localFaq.comments} yorum`}
                >
                  <MessageCircle className="w-4 h-4 text-primary" />
                  <span className="font-[Manrope] font-bold text-sm text-foreground">{localFaq.comments}</span>
                </button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleShare}
                  className="ml-auto font-[Manrope] font-semibold"
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Paylaş
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Detailed Answer */}
          <Card className="bg-card rounded-xl shadow-md dark:shadow-lg border border-border">
            <CardHeader>
              <CardTitle className="font-[Manrope] text-foreground font-bold text-lg sm:text-xl flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-primary" />
                Detaylı Cevap
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose prose-sm dark:prose-invert max-w-none">
                <div className="font-[Manrope] text-foreground/70 dark:text-muted-foreground leading-relaxed">
                  {parseMarkdown(faq.detailedAnswer)}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Comments Section */}
          {showComments && (
            <Card className="bg-card rounded-xl shadow-md dark:shadow-lg border border-border">
              <CardHeader>
                <CardTitle className="font-[Manrope] text-foreground font-bold text-lg sm:text-xl flex items-center gap-2">
                  <MessageCircle className="w-5 h-5 text-primary" />
                  Yorumlar ({localFaq.comments})
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <ScrollArea className="h-[400px] pr-4">
                  <div className="space-y-4">
                    {comments.map((comment) => (
                      <div key={comment.id} className="flex gap-3 pb-4 border-b border-border last:border-0">
                        <Avatar className="w-8 h-8">
                          <AvatarFallback className="bg-primary text-primary-foreground font-[Manrope] font-bold text-xs">
                            {comment.authorInitials}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-[Manrope] font-bold text-sm text-foreground">
                              {comment.author}
                            </span>
                            <span className="font-[Manrope] text-xs text-muted-foreground">
                              {comment.timestamp}
                            </span>
                          </div>
                          <p className="font-[Manrope] text-sm text-foreground/80 dark:text-muted-foreground mb-2">
                            {comment.content}
                          </p>
                          <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors">
                            <ThumbsUp className="w-3 h-3" />
                            <span>{comment.likes}</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
                
                {/* Comment Input */}
                {state.user && (
                  <div className="pt-4 border-t border-border">
                    <div className="flex gap-2">
                      <Textarea
                        value={commentInput}
                        onChange={(e) => setCommentInput(e.target.value)}
                        placeholder="Yorumunuzu yazın..."
                        className="font-[Manrope] min-h-[80px]"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault()
                            handleSendComment()
                          }
                        }}
                      />
                      <Button
                        onClick={handleSendComment}
                        disabled={!commentInput.trim()}
                        className="bg-primary hover:bg-primary/90 font-[Manrope] font-bold self-end"
                      >
                        <Send className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-4 sm:space-y-6">
          {/* Related Questions */}
          <Card className="bg-card rounded-xl shadow-md dark:shadow-lg border border-border">
            <CardHeader>
              <CardTitle className="font-[Manrope] text-foreground font-bold text-lg">
                İlgili Sorular
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {faq.relatedQuestions.map((related) => (
                <Link
                  key={related.id}
                  href={`/discovery/faq/${related.id}`}
                  className="block p-3 bg-accent rounded-xl hover:bg-primary/10 dark:hover:bg-primary/20 transition-colors group"
                >
                  <p className="font-[Manrope] font-semibold text-sm text-foreground group-hover:text-primary transition-colors">
                    {related.question}
                  </p>
                </Link>
              ))}
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  )
}

