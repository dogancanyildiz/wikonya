"use client"

import { MapPin, Bus, Clock, Navigation, Heart } from "lucide-react"
import Image from "next/image"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export function KonyaKesifPage() {
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

  // Transport Tips data
  const transportTips = [
    {
      id: 1,
      destination: "Mevlana Müzesi",
      buses: ["11", "28", "33"],
      tram: "Mevlana Durağı",
      duration: "Merkez'den 10 dk"
    },
    {
      id: 2,
      destination: "Sille Köyü",
      buses: ["66", "67"],
      tram: null,
      duration: "Merkez'den 25 dk"
    },
    {
      id: 3,
      destination: "Japon Parkı",
      buses: ["22", "44", "55"],
      tram: null,
      duration: "Merkez'den 15 dk"
    },
    {
      id: 4,
      destination: "Tropikal Kelebek Bahçesi",
      buses: ["12", "31"],
      tram: null,
      duration: "Merkez'den 20 dk"
    }
  ]

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-16 py-4 sm:py-6 md:py-8">
      {/* Page Header */}
      <div className="mb-4 sm:mb-6 md:mb-8">
        <h1 className="font-[Manrope] text-[#4d4d4d] dark:text-foreground mb-2 font-extrabold text-2xl sm:text-3xl md:text-4xl lg:text-[42px]">
          Konya Keşif Rehberi
        </h1>
        <p className="font-[Manrope] text-[#4d4d4d]/60 dark:text-muted-foreground font-medium text-sm sm:text-base">
          Konya&apos;nın en güzel yerlerini keşfet, rotalar oluştur ve şehri deneyimle
        </p>
      </div>

      {/* Must Visit Section */}
      <section className="mb-4 sm:mb-6 md:mb-8">
        <div className="mb-3 sm:mb-4 md:mb-6">
          <h2 className="font-[Manrope] text-[#4d4d4d] dark:text-foreground font-extrabold text-lg sm:text-xl md:text-2xl lg:text-[28px]">
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
      <section className="mb-4 sm:mb-6 md:mb-8">
        <div className="mb-3 sm:mb-4 md:mb-6">
          <h2 className="font-[Manrope] text-[#4d4d4d] dark:text-foreground font-extrabold text-lg sm:text-xl md:text-2xl lg:text-[28px]">
            Hazır Rotalar
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {routes.map((route) => (
            <RouteCard key={route.id} route={route} />
          ))}
        </div>
      </section>

      {/* Transport Tips Section */}
      <section>
        <div className="mb-3 sm:mb-4 md:mb-6">
          <h2 className="font-[Manrope] text-[#4d4d4d] dark:text-foreground font-extrabold text-lg sm:text-xl md:text-2xl lg:text-[28px]">
            Ulaşım İpuçları
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {transportTips.map((tip) => (
            <TransportCard key={tip.id} {...tip} />
          ))}
        </div>
      </section>
    </div>
  )
}

// Place Card Component
function PlaceCard({ image, title, description, category }: {
  image: string
  title: string
  description: string
  category: string
}) {
  const [isFavorite, setIsFavorite] = useState(false)

  return (
    <Card className="bg-white dark:bg-card rounded-[20px] shadow-[0_4px_20px_rgba(0,0,0,0.06)] dark:shadow-lg hover:shadow-[0_6px_30px_rgba(0,0,0,0.12)] dark:hover:shadow-xl transition-all group overflow-hidden border border-border">
      {/* Image */}
      <div className="relative h-40 sm:h-52 overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
          unoptimized
        />
        
        {/* Favorite Button */}
        <button
          onClick={() => setIsFavorite(!isFavorite)}
          className="absolute top-3 sm:top-4 right-3 sm:right-4 w-9 h-9 sm:w-10 sm:h-10 bg-white/90 dark:bg-card/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white dark:hover:bg-card transition-all shadow-lg z-10"
        >
          <Heart
            className={`w-4 h-4 sm:w-5 sm:h-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-[#4d4d4d] dark:text-foreground'}`}
            strokeWidth={2.5}
          />
        </button>

        {/* Category Badge */}
        <div className="absolute top-3 sm:top-4 left-3 sm:left-4">
          <div className="px-2 sm:px-3 py-1 sm:py-1.5 bg-[#03624c] rounded-lg backdrop-blur-sm">
            <span className="font-[Manrope] text-white font-bold text-[10px] sm:text-[11px]">
              {category}
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <CardContent className="p-4 sm:p-5">
        <h3 className="font-[Manrope] text-[#4d4d4d] dark:text-foreground mb-2 group-hover:text-[#03624c] transition-colors font-bold text-base sm:text-lg leading-snug">
          {title}
        </h3>

        <div className="flex items-center gap-1.5 mb-3 sm:mb-4">
          <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-[#4d4d4d]/60 dark:text-muted-foreground" strokeWidth={2.5} />
          <span className="font-[Manrope] text-[#4d4d4d]/60 dark:text-muted-foreground font-medium text-xs sm:text-[13px]">
            {description}
          </span>
        </div>

        {/* Action Button */}
        <div className="pt-3 sm:pt-4 border-t border-gray-100 dark:border-border">
          <Button 
            className="w-full px-4 py-2 sm:py-2.5 bg-[#03624c] text-white rounded-lg font-[Manrope] hover:bg-[#03624c]/90 transition-colors font-bold text-xs sm:text-sm"
          >
            Detayları Gör
          </Button>
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
    <Card className="bg-white dark:bg-card rounded-[20px] shadow-[0_4px_20px_rgba(0,0,0,0.06)] dark:shadow-lg hover:shadow-[0_6px_30px_rgba(0,0,0,0.12)] dark:hover:shadow-xl transition-all border border-border">
      <CardContent className="p-4 sm:p-6">
        {/* Route Header */}
        <div className="mb-4 sm:mb-6">
          <h3 className="font-[Manrope] text-[#4d4d4d] dark:text-foreground mb-2 sm:mb-3 font-bold text-lg sm:text-xl">
            {route.title}
          </h3>
          <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              <Clock className="w-3 h-3 sm:w-4 sm:h-4 text-[#03624c]" strokeWidth={2.5} />
              <span className="font-[Manrope] text-[#4d4d4d] dark:text-foreground font-medium text-xs sm:text-[13px]">
                {route.duration}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Navigation className="w-3 h-3 sm:w-4 sm:h-4 text-[#03624c]" strokeWidth={2.5} />
              <span className="font-[Manrope] text-[#4d4d4d] dark:text-foreground font-medium text-xs sm:text-[13px]">
                {route.difficulty}
              </span>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="relative mb-4 sm:mb-6">
          {route.stops.map((stop, index) => (
            <div key={stop.order} className="relative flex gap-3 sm:gap-4 pb-4 sm:pb-6 last:pb-0">
              {/* Timeline Line and Dot */}
              <div className="flex flex-col items-center">
                {/* Dot */}
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#03624c] border-3 sm:border-4 border-[#03624c]/20 z-10 flex-shrink-0"></div>
                {/* Line */}
                {index < route.stops.length - 1 && (
                  <div className="w-0.5 h-full bg-[#03624c]/30 mt-1"></div>
                )}
              </div>

              {/* Stop Content */}
              <div className="flex-1 pb-2">
                <div className="font-[Manrope] text-[#03624c] mb-1 font-bold text-[10px] sm:text-[11px] tracking-wide">
                  {stop.time}
                </div>
                <h4 className="font-[Manrope] text-[#4d4d4d] dark:text-foreground mb-1 font-bold text-sm sm:text-base">
                  {stop.title}
                </h4>
                <p className="font-[Manrope] text-[#4d4d4d]/60 dark:text-muted-foreground font-medium text-xs sm:text-[13px]">
                  {stop.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Start Route Button */}
        <Button 
          className="w-full px-4 py-2 sm:py-2.5 bg-[#03624c] text-white rounded-lg font-[Manrope] hover:bg-[#03624c]/90 transition-colors font-bold text-xs sm:text-sm"
        >
          Rotayı Başlat
        </Button>
      </CardContent>
    </Card>
  )
}

// Transport Card Component
function TransportCard({ destination, buses, tram, duration }: {
  destination: string
  buses: string[]
  tram: string | null
  duration: string
}) {
  return (
    <Card className="bg-white dark:bg-card rounded-[20px] shadow-[0_4px_20px_rgba(0,0,0,0.06)] dark:shadow-lg border-l-4 border-[#03624c] border border-border">
      <CardContent className="p-4 sm:p-6">
        <div className="flex items-start gap-3 mb-3 sm:mb-4">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#03624c]/10 dark:bg-[#03624c]/20 flex items-center justify-center flex-shrink-0">
            <Bus className="w-4 h-4 sm:w-5 sm:h-5 text-[#03624c]" strokeWidth={2.5} />
          </div>
          <div>
            <h3 className="font-[Manrope] text-[#4d4d4d] dark:text-foreground mb-1 font-bold text-base sm:text-lg">
              {destination}
            </h3>
            <span className="font-[Manrope] text-[#4d4d4d]/60 dark:text-muted-foreground font-medium text-xs sm:text-[13px]">
              {duration}
            </span>
          </div>
        </div>

        <div className="space-y-2 sm:space-y-3">
          {/* Bus Numbers */}
          <div>
            <span className="font-[Manrope] text-[#4d4d4d]/70 dark:text-muted-foreground block mb-1.5 sm:mb-2 font-bold text-[10px] sm:text-[11px] tracking-wide">
              OTOBÜS HATLARI
            </span>
            <div className="flex gap-2 flex-wrap">
              {buses.map((bus) => (
                <span
                  key={bus}
                  className="px-2 sm:px-3 py-1 sm:py-1.5 bg-[#03624c] rounded-lg font-[Manrope] text-white font-bold text-xs sm:text-[13px]"
                >
                  {bus}
                </span>
              ))}
            </div>
          </div>

          {/* Tram Station if available */}
          {tram && (
            <div>
              <span className="font-[Manrope] text-[#4d4d4d]/70 dark:text-muted-foreground block mb-1.5 sm:mb-2 font-bold text-[10px] sm:text-[11px] tracking-wide">
                TRAMVAY DURAĞI
              </span>
              <span className="font-[Manrope] text-[#03624c] font-bold text-sm sm:text-sm">
                {tram}
              </span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

