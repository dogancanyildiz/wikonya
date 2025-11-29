"use client"

import { MapPin, Clock, Navigation, Heart, MessageCircle, ThumbsUp, BookOpen, Lightbulb } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export function KonyaDiscoveryPage() {
  // Must Visit Places data
  const mustVisitPlaces = [
    {
      id: 1,
      title: "Mevlana Müzesi",
      image: "https://images.unsplash.com/photo-1759930018775-bf3c3fe9bdc6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxNZXZsYW5hJTIwTXVzZXVtJTIwVHVya2V5JTIwbGFuZG1hcmt8ZW58MXx8fHwxNzY0MTc4MDE5fDA&ixlib=rb-4.1.0&q=80&w=1080",
      description: "Konya'nın kalbi ve manevi merkezi",
      category: "Müze"
    },
    {
      id: 2,
      title: "Sille Köyü",
      image: "https://images.unsplash.com/photo-1662020938953-81bcceca37a6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaXN0b3JpYyUyMHZpbGxhZ2UlMjBhcmNoaXRlY3R1cmV8ZW58MXx8fHwxNzY0MTc4MDE5fDA&ixlib=rb-4.1.0&q=80&w=1080",
      description: "Tarihi evler ve doğal güzellik",
      category: "Tarihi"
    },
    {
      id: 3,
      title: "Japon Parkı",
      image: "https://images.unsplash.com/photo-1593805384288-60e91a880d8b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqYXBhbmVzZSUyMGdhcmRlbiUyMHBhcmt8ZW58MXx8fHwxNzY0MTc4MDIwfDA&ixlib=rb-4.1.0&q=80&w=1080",
      description: "Huzurlu bahçeler ve göletler",
      category: "Park"
    },
    {
      id: 4,
      title: "Bilim Merkezi",
      image: "https://images.unsplash.com/photo-1609485141709-0314813d8822?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzY2llbmNlJTIwbXVzZXVtJTIwbW9kZXJufGVufDF8fHx8MTc2NDE3NDMzMnww&ixlib=rb-4.1.0&q=80&w=1080",
      description: "Etkileşimli bilim deneyimleri",
      category: "Eğitim"
    },
    {
      id: 5,
      title: "Tropikal Kelebek Bahçesi",
      image: "https://images.unsplash.com/photo-1761254462038-04194111f905?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXR0ZXJmbHklMjBnYXJkZW4lMjB0cm9waWNhbHxlbnwxfHx8fDE3NjQxNzcwNDh8MA&ixlib=rb-4.1.0&q=80&w=1080",
      description: "Renkli kelebekler ve tropikal bitkiler",
      category: "Doğa"
    },
    {
      id: 6,
      title: "Alaaddin Tepesi",
      image: "https://images.unsplash.com/photo-1690708942173-721f451b455e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaXR5JTIwcGFyayUyMGxha2V8ZW58MXx8fHwxNzY0MTc4MDIxfDA&ixlib=rb-4.1.0&q=80&w=1080",
      description: "Şehir manzarası ve tarihi park",
      category: "Park"
    }
  ]

  // Curated Routes data
  const routes = [
    {
      id: 1,
      title: "Bir Günde Tarih Turu",
      duration: "6-8 saat",
      difficulty: "Kolay",
      stops: [
        {
          order: 1,
          title: "Mevlana Müzesi",
          time: "09:00 - 11:00",
          description: "Manevi bir deneyim ve tarihi eserler"
        },
        {
          order: 2,
          title: "Selimiye Camii",
          time: "11:30 - 12:30",
          description: "Muhteşem Osmanlı mimarisi"
        },
        {
          order: 3,
          title: "Alaaddin Tepesi",
          time: "14:00 - 16:00",
          description: "Öğle yemeği ve şehir manzarası"
        }
      ]
    },
    {
      id: 2,
      title: "Doğa ve Rahatlama Rotası",
      duration: "4-5 saat",
      difficulty: "Çok Kolay",
      stops: [
        {
          order: 1,
          title: "Japon Parkı",
          time: "10:00 - 12:00",
          description: "Sabah yürüyüşü ve meditasyon"
        },
        {
          order: 2,
          title: "Tropikal Kelebek Bahçesi",
          time: "13:00 - 14:30",
          description: "Kelebekler arasında gezinti"
        },
        {
          order: 3,
          title: "Sille Köyü",
          time: "15:00 - 17:00",
          description: "Tarihi sokaklar ve çay keyfi"
        }
      ]
    }
  ]

  // Klasik Sorular - Tartışma Formatında
  const faqQuestions = [
    {
      id: 1,
      author: "Konya Rehberi",
      authorInitials: "KR",
      question: "Etli ekmek nerede yenir?",
      answer: "Konya'nın en meşhur etli ekmek mekanları: Meram'da bulunan tarihi etli ekmek fırınları, Alaaddin Tepesi çevresindeki restoranlar ve şehir merkezindeki geleneksel fırınlar. Özellikle 'Fırın Kebabı' olarak bilinen yerlerde en lezzetli etli ekmeği bulabilirsiniz. Meram ve Karatay ilçelerindeki eski mahalle fırınları da çok popülerdir.",
      timeAgo: "2 gün önce",
      likes: 45,
      comments: 12,
      makesSense: 23
    },
    {
      id: 2,
      author: "Konya Rehberi",
      authorInitials: "KR",
      question: "Konya'da ne zaman gidilir?",
      answer: "Konya'yı ziyaret etmek için en ideal zamanlar ilkbahar (Nisan-Mayıs) ve sonbahar (Eylül-Ekim) aylarıdır. Özellikle Aralık ayında Mevlana Şeb-i Arus törenleri için çok özel bir atmosfer olur. Yaz ayları çok sıcak olabilir, kış ayları ise soğuk ama kar manzarası güzel olabilir.",
      timeAgo: "3 gün önce",
      likes: 38,
      comments: 8,
      makesSense: 19
    },
    {
      id: 3,
      author: "Konya Rehberi",
      authorInitials: "KR",
      question: "Mevlana Müzesi'ne giriş ücretli mi?",
      answer: "Evet, Mevlana Müzesi'ne giriş ücretlidir. Ancak Müze Kart geçerlidir. Müze Kart ile yılda iki kez ücretsiz giriş yapabilirsiniz. Pazartesi günleri kapalıdır, ziyaret saatleri 09:00-17:00 arasındadır.",
      timeAgo: "4 gün önce",
      likes: 52,
      comments: 15,
      makesSense: 31
    },
    {
      id: 4,
      author: "Konya Rehberi",
      authorInitials: "KR",
      question: "Konya'da ulaşım nasıl sağlanır?",
      answer: "Konya'da ulaşım oldukça kolaydır. Tramvay hattı şehrin ana arterlerinden geçer. Otobüs hatları geniş bir ağa sahiptir. Şehir merkezi yürüyüş mesafesinde birçok yeri kapsar. Taksi ve dolmuşlar da yaygın olarak kullanılır.",
      timeAgo: "5 gün önce",
      likes: 29,
      comments: 6,
      makesSense: 15
    },
    {
      id: 5,
      author: "Konya Rehberi",
      authorInitials: "KR",
      question: "Konya'nın en ünlü yemekleri nelerdir?",
      answer: "Konya mutfağının en ünlü yemekleri: Etli ekmek, fırın kebabı, bamya çorbası, Mevlana böreği, tirit, etli pide ve sac kavurma. Tatlı olarak ise höşmerim ve peynirli irmik helvası çok meşhurdur.",
      timeAgo: "1 hafta önce",
      likes: 67,
      comments: 19,
      makesSense: 42
    },
    {
      id: 6,
      author: "Konya Rehberi",
      authorInitials: "KR",
      question: "Kelebekler Vadisi'ne nasıl gidilir?",
      answer: "Tropikal Kelebek Bahçesi (Kelebekler Vadisi), Selçuk Üniversitesi kampüsü içinde yer alır. 12 ve 31 numaralı otobüslerle ulaşabilirsiniz. Merkez'den yaklaşık 20 dakika sürer. Kampüs içinde olduğu için araba ile gitmek de mümkündür, otopark mevcuttur.",
      timeAgo: "1 hafta önce",
      likes: 41,
      comments: 10,
      makesSense: 28
    }
  ]

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-16 py-6 sm:py-8 md:py-10">
      {/* Page Header */}
      <div className="mb-6 sm:mb-8 md:mb-10">
        <h1 className="font-[Manrope] text-foreground mb-2 font-extrabold text-2xl sm:text-3xl md:text-4xl lg:text-[42px]">
          Konya Keşif Rehberi
        </h1>
        <p className="font-[Manrope] text-foreground/60 dark:text-muted-foreground font-medium text-sm sm:text-base">
          Konya&apos;nın en güzel yerlerini keşfet, rotalar oluştur ve şehri deneyimle
        </p>
      </div>

      {/* Must Visit Section */}
      <section className="mb-6 sm:mb-8 md:mb-10">
        <div className="mb-4 sm:mb-6">
          <h2 className="font-[Manrope] text-foreground font-extrabold text-lg sm:text-xl md:text-2xl lg:text-[28px]">
            Mutlaka Görülmesi Gerekenler
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {mustVisitPlaces.map((place) => (
            <PlaceCard key={place.id} {...place} />
          ))}
        </div>
      </section>

      {/* Curated Routes Section */}
      <section className="mb-6 sm:mb-8 md:mb-10">
        <div className="mb-4 sm:mb-6">
          <h2 className="font-[Manrope] text-foreground font-extrabold text-lg sm:text-xl md:text-2xl lg:text-[28px]">
            Hazır Rotalar
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {routes.map((route) => (
            <RouteCard key={route.id} route={route} />
          ))}
        </div>
      </section>

      {/* FAQ Section - Fresh Discussions Format */}
      <section>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <h2 className="font-[Manrope] font-bold text-foreground text-xl sm:text-2xl">
            Sık Sorulan Sorular
          </h2>
          <div className="flex items-center gap-2 flex-wrap">
            <Button className="px-4 py-2 bg-primary text-white rounded-xl font-[Manrope] font-semibold hover:bg-primary/90 text-sm">
              Yeni
            </Button>
            <Button variant="outline" className="px-4 py-2 bg-card text-foreground rounded-xl font-[Manrope] font-semibold hover:bg-primary hover:text-white dark:hover:bg-primary transition-colors text-sm">
              Popüler
            </Button>
            <Button variant="outline" className="px-4 py-2 bg-card text-foreground rounded-xl font-[Manrope] font-semibold hover:bg-primary hover:text-white dark:hover:bg-primary transition-colors text-sm">
              Cevaplanmamış
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          {faqQuestions.map((faq) => (
            <FAQCard key={faq.id} faq={faq} />
          ))}
        </div>
      </section>
    </div>
  )
}

// Place Card Component
function PlaceCard({ id, image, title, description, category }: {
  id: number
  image: string
  title: string
  description: string
  category: string
}) {
  const [isFavorite, setIsFavorite] = useState(false)

  return (
    <Card className="bg-card rounded-xl shadow-md dark:shadow-lg border border-border overflow-hidden">
      {/* Image */}
      <div className="relative h-40 sm:h-52 overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
          unoptimized
        />
        
        {/* Favorite Button */}
        <button
          onClick={() => setIsFavorite(!isFavorite)}
          className="absolute top-3 sm:top-4 right-3 sm:right-4 w-9 h-9 sm:w-10 sm:h-10 bg-card/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white dark:hover:bg-card transition-all shadow-lg z-10"
        >
          <Heart
            className={`w-4 h-4 sm:w-5 sm:h-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-foreground'}`}
            strokeWidth={2.5}
          />
        </button>
      </div>

      {/* Content */}
      <CardContent className="p-3 sm:p-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="px-2 py-0.5 bg-primary rounded-lg flex items-center">
            <span className="font-[Manrope] text-white font-bold text-[10px] sm:text-[11px]">
              {category}
            </span>
          </span>
        </div>

        <h3 className="font-[Manrope] text-foreground mb-2 font-bold text-base sm:text-lg leading-snug">
          {title}
        </h3>

        <div className="flex items-center gap-1.5 mb-3">
          <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-foreground/60 dark:text-muted-foreground" strokeWidth={2.5} />
          <span className="font-[Manrope] text-foreground/60 dark:text-muted-foreground font-medium text-xs sm:text-[13px]">
            {description}
          </span>
        </div>

        {/* Action Button */}
        <div className="flex justify-end">
          <Link href={`/discovery/${id}`}>
            <Button 
              className="inline-flex px-2 py-1 bg-primary text-white rounded-lg font-[Manrope] hover:bg-primary/90 transition-colors font-semibold text-[10px] sm:text-[11px] cursor-pointer"
            >
              Detayları Gör
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}

// Route Card Component
function RouteCard({ route }: {
  route: {
    id: number
    title: string
    duration: string
    difficulty: string
    stops: Array<{
      order: number
      title: string
      time: string
      description: string
    }>
  }
}) {
  return (
    <Card className="bg-card rounded-xl shadow-md dark:shadow-lg border border-border">
      <CardContent className="p-4 sm:p-6">
        {/* Route Header */}
        <div className="mb-4 sm:mb-6">
          <h3 className="font-[Manrope] text-foreground mb-2 sm:mb-3 font-bold text-lg sm:text-xl">
            {route.title}
          </h3>
          <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              <Clock className="w-3 h-3 sm:w-4 sm:h-4 text-primary" strokeWidth={2.5} />
              <span className="font-[Manrope] text-foreground font-medium text-xs sm:text-[13px]">
                {route.duration}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Navigation className="w-3 h-3 sm:w-4 sm:h-4 text-primary" strokeWidth={2.5} />
              <span className="font-[Manrope] text-foreground font-medium text-xs sm:text-[13px]">
                {route.difficulty}
              </span>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="relative">
          {route.stops.map((stop, index) => (
            <div key={stop.order} className="relative flex gap-3 sm:gap-4 pb-4 sm:pb-6 last:pb-0">
              {/* Timeline Line and Dot */}
              <div className="flex flex-col items-center">
                {/* Dot */}
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-primary border-3 sm:border-4 border-primary/20 z-10 flex-shrink-0"></div>
                {/* Line */}
                {index < route.stops.length - 1 && (
                  <div className="w-0.5 h-full bg-primary/30 mt-1"></div>
                )}
              </div>

              {/* Stop Content */}
              <div className="flex-1 pb-2">
                <div className="font-[Manrope] text-primary mb-1 font-bold text-[10px] sm:text-[11px] tracking-wide">
                  {stop.time}
                </div>
                <h4 className="font-[Manrope] text-foreground mb-1 font-bold text-sm sm:text-base">
                  {stop.title}
                </h4>
                <p className="font-[Manrope] text-foreground/60 dark:text-muted-foreground font-medium text-xs sm:text-[13px]">
                  {stop.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

// FAQ Card Component - Fresh Discussions Format
function FAQCard({ faq }: {
  faq: {
    id: number
    author: string
    authorInitials: string
    question: string
    answer: string
    timeAgo: string
    likes: number
    comments: number
    makesSense: number
  }
}) {
  return (
    <Card className="bg-card border border-border rounded-xl shadow-md dark:shadow-lg">
      <CardContent className="p-4 sm:p-6">
        <div className="flex items-start gap-4">
          <Avatar className="w-10 h-10 sm:w-12 sm:h-12 border-2 border-border">
            <AvatarFallback className="bg-primary text-white font-[Manrope] font-bold">
              {faq.authorInitials}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2">
              <span className="font-[Manrope] font-bold text-foreground text-sm sm:text-base">
                {faq.author}
              </span>
              <span className="px-3 py-1 bg-accent rounded-full font-[Manrope] font-semibold text-primary text-xs sm:text-sm">
                Rehber
              </span>
              <div className="flex items-center gap-1 text-foreground/60 dark:text-muted-foreground">
                <Clock className="w-4 h-4" />
                <span className="font-[Manrope] font-medium text-xs sm:text-sm">{faq.timeAgo}</span>
              </div>
            </div>

            <h3 className="font-[Manrope] font-bold text-foreground mb-2 text-sm sm:text-base">
              {faq.question}
            </h3>

            <p className="font-[Manrope] font-medium text-foreground/70 dark:text-muted-foreground mb-4 text-sm sm:text-base line-clamp-2">
              {faq.answer}
            </p>

            <div className="flex flex-wrap items-center gap-4 sm:gap-6">
              <button className="flex items-center gap-2 text-foreground/60 dark:text-muted-foreground hover:text-primary transition-colors cursor-pointer">
                <ThumbsUp className="w-4 h-4" />
                <span className="font-[Manrope] font-semibold text-xs sm:text-sm">{faq.likes}</span>
              </button>
              <button className="flex items-center gap-2 text-foreground/60 dark:text-muted-foreground hover:text-primary transition-colors cursor-pointer">
                <Lightbulb className="w-4 h-4" />
                <span className="font-[Manrope] font-semibold text-xs sm:text-sm">{faq.makesSense}</span>
                <span className="font-[Manrope] font-medium text-[10px] sm:text-xs text-foreground/50 dark:text-muted-foreground/70 hidden sm:inline">Mantıklı</span>
              </button>
              <button className="flex items-center gap-2 text-foreground/60 dark:text-muted-foreground hover:text-primary transition-colors cursor-pointer">
                <MessageCircle className="w-4 h-4" />
                <span className="font-[Manrope] font-semibold text-xs sm:text-sm">{faq.comments}</span>
              </button>
              <Link 
                href={`/discovery/faq/${faq.id}`}
                className="flex items-center gap-2 text-foreground/60 dark:text-muted-foreground hover:text-primary transition-colors ml-auto cursor-pointer"
              >
                <BookOpen className="w-4 h-4" />
                <span className="font-[Manrope] font-semibold text-xs sm:text-sm">Devamını Oku</span>
              </Link>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

