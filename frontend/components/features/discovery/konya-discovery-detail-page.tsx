"use client"

import { MapPin, Navigation, Calendar, ArrowLeft } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

// Veri - mustVisitPlaces ve detailedTouristGuide birleştirilmiş
const placesData = [
  {
    id: 1,
    title: "Mevlana Müzesi",
    image: "https://images.unsplash.com/photo-1759930018775-bf3c3fe9bdc6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxNZXZsYW5hJTIwTXVzZXVtJTIwVHVya2V5JTIwbGFuZG1hcmt8ZW58MXx8fHwxNzY0MTc4MDE5fDA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "Konya'nın kalbi ve manevi merkezi",
    category: "Müze",
    howToReach: {
      byBus: "11, 28, 33 numaralı otobüslerle Mevlana durağında inebilirsiniz.",
      byTram: "Tramvay ile Mevlana durağına ulaşabilirsiniz. Merkez'den yaklaşık 10 dakika.",
      byCar: "Şehir merkezinde, Alaaddin Tepesi'nin yanında. Otopark mevcut.",
      byWalking: "Şehir merkezinden yürüyerek 10-15 dakikada ulaşabilirsiniz."
    },
    bestTimeToVisit: {
      timeOfDay: "Sabah 09:00-11:00 arası veya öğleden sonra 14:00-16:00 arası daha az kalabalık olur.",
      dayOfWeek: "Hafta içi günler daha az kalabalıktır. Hafta sonları çok yoğun olabilir.",
      season: "Tüm yıl boyunca ziyaret edilebilir. Özellikle Aralık ayında Mevlana Şeb-i Arus törenleri için çok özel bir atmosfer olur.",
      specialNotes: "Pazartesi günleri kapalıdır. Giriş ücretlidir, müze kartı geçerlidir."
    }
  },
  {
    id: 2,
    title: "Sille Köyü",
    image: "https://images.unsplash.com/photo-1662020938953-81bcceca37a6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaXN0b3JpYyUyMHZpbGxhZ2UlMjBhcmNoaXRlY3R1cmV8ZW58MXx8fHwxNzY0MTc4MDE5fDA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "Tarihi evler ve doğal güzellik",
    category: "Tarihi",
    howToReach: {
      byBus: "66, 67 numaralı otobüslerle Sille durağında inebilirsiniz. Merkez'den yaklaşık 25 dakika.",
      byTram: null,
      byCar: "Konya merkezden yaklaşık 8 km. Otopark mevcut.",
      byWalking: "Yürüyerek ulaşım zor, otobüs veya araba önerilir."
    },
    bestTimeToVisit: {
      timeOfDay: "Öğleden sonra 14:00-18:00 arası ideal. Güneş batışında çok güzel manzara olur.",
      dayOfWeek: "Hafta sonları daha canlı ve etkinlikler olabilir. Hafta içi daha sakin.",
      season: "İlkbahar ve sonbahar ayları en ideal. Yaz aylarında çok sıcak olabilir.",
      specialNotes: "Tarihi evler, kiliseler ve doğal güzellikler için yarım gün ayırmanız yeterli."
    }
  },
  {
    id: 3,
    title: "Japon Parkı",
    image: "https://images.unsplash.com/photo-1593805384288-60e91a880d8b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqYXBhbmVzZSUyMGdhcmRlbiUyMHBhcmt8ZW58MXx8fHwxNzY0MTc4MDIwfDA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "Huzurlu bahçeler ve göletler",
    category: "Park",
    howToReach: {
      byBus: "22, 44, 55 numaralı otobüslerle ulaşabilirsiniz. Merkez'den yaklaşık 15 dakika.",
      byTram: null,
      byCar: "Şehir merkezine yakın, otopark mevcut.",
      byWalking: "Merkezden yürüyerek 20-25 dakikada ulaşabilirsiniz."
    },
    bestTimeToVisit: {
      timeOfDay: "Sabah erken saatler (07:00-09:00) veya akşamüstü (17:00-19:00) en huzurlu saatlerdir.",
      dayOfWeek: "Hafta içi daha sakin, hafta sonları ailelerle dolu olur.",
      season: "İlkbahar ve sonbahar aylarında çok güzel. Kiraz çiçekleri açtığında (Nisan-Mayıs) özellikle görülmeye değer.",
      specialNotes: "Giriş ücretsizdir. Piknik yapmak için ideal bir yerdir."
    }
  },
  {
    id: 4,
    title: "Bilim Merkezi",
    image: "https://images.unsplash.com/photo-1609485141709-0314813d8822?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzY2llbmNlJTIwbXVzZXVtJTIwbW9kZXJufGVufDF8fHx8MTc2NDE3NDMzMnww&ixlib=rb-4.1.0&q=80&w=1080",
    description: "Etkileşimli bilim deneyimleri",
    category: "Eğitim",
    howToReach: {
      byBus: "15, 25, 40 numaralı otobüslerle Bilim Merkezi durağında inebilirsiniz. Merkez'den yaklaşık 15 dakika.",
      byTram: "Tramvay ile Bilim Merkezi durağına ulaşabilirsiniz.",
      byCar: "Şehir merkezine yakın, geniş otopark mevcut.",
      byWalking: "Merkezden yürüyerek 20-25 dakikada ulaşabilirsiniz."
    },
    bestTimeToVisit: {
      timeOfDay: "Sabah 10:00-12:00 veya öğleden sonra 14:00-16:00 arası ideal saatlerdir.",
      dayOfWeek: "Hafta sonları ailelerle çok kalabalık olur. Hafta içi daha sakin ve rahat gezilebilir.",
      season: "Tüm yıl boyunca ziyaret edilebilir. İçeride olduğu için hava durumundan etkilenmez.",
      specialNotes: "Giriş ücretlidir. Öğrenciler için indirimli biletler mevcuttur. Etkileşimli sergiler ve deneyler için 2-3 saat ayırmanız önerilir."
    }
  },
  {
    id: 5,
    title: "Tropikal Kelebek Bahçesi",
    image: "https://images.unsplash.com/photo-1761254462038-04194111f905?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXR0ZXJmbHklMjBnYXJkZW4lMjB0cm9waWNhbHxlbnwxfHx8fDE3NjQxNzcwNDh8MA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "Renkli kelebekler ve tropikal bitkiler",
    category: "Doğa",
    howToReach: {
      byBus: "12, 31 numaralı otobüslerle ulaşabilirsiniz. Merkez'den yaklaşık 20 dakika.",
      byTram: "Tramvay ile Selçuk Üniversitesi durağına gelip, oradan otobüsle devam edebilirsiniz.",
      byCar: "Selçuk Üniversitesi kampüsü içinde. Otopark mevcut.",
      byWalking: "Kampüs içinde olduğu için yürüyerek ulaşım zor olabilir."
    },
    bestTimeToVisit: {
      timeOfDay: "Sabah 10:00-12:00 arası kelebeklerin en aktif olduğu saatlerdir.",
      dayOfWeek: "Hafta içi daha az kalabalık, hafta sonları ailelerle dolu olur.",
      season: "Tüm yıl boyunca açık. İçerisi sıcak ve nemli olduğu için yaz aylarında daha rahatsız edici olabilir.",
      specialNotes: "İçeride sıcaklık 26-28°C arasındadır. Hafif giyinmeniz önerilir. Fotoğraf çekmek serbesttir."
    }
  },
  {
    id: 6,
    title: "Alaaddin Tepesi",
    image: "https://images.unsplash.com/photo-1690708942173-721f451b455e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaXR5JTIwcGFyayUyMGxha2V8ZW58MXx8fHwxNzY0MTc4MDIxfDA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "Şehir manzarası ve tarihi park",
    category: "Park",
    howToReach: {
      byBus: "11, 28, 33 numaralı otobüslerle Alaaddin durağında inebilirsiniz. Merkez'den yaklaşık 5 dakika.",
      byTram: "Tramvay ile Alaaddin durağına ulaşabilirsiniz. Şehir merkezinde.",
      byCar: "Şehir merkezinde, Mevlana Müzesi'nin yanında. Sınırlı otopark mevcut.",
      byWalking: "Şehir merkezinden yürüyerek 5-10 dakikada ulaşabilirsiniz."
    },
    bestTimeToVisit: {
      timeOfDay: "Sabah erken saatler (06:00-08:00) veya akşamüstü (17:00-19:00) en güzel manzara ve en sakin saatlerdir.",
      dayOfWeek: "Hafta içi daha sakin, hafta sonları piknik yapan ailelerle dolu olur.",
      season: "Tüm yıl boyunca ziyaret edilebilir. İlkbahar ve sonbahar aylarında çok güzel. Yaz akşamları serin ve keyifli olur.",
      specialNotes: "Giriş ücretsizdir. Tepeden şehir manzarası muhteşemdir. Tarihi Alaaddin Camii de burada bulunur. Piknik yapmak için ideal bir yerdir."
    }
  }
]

export function KonyaDiscoveryDetailPage({ placeId }: { placeId: number }) {
  const place = placesData.find(p => p.id === placeId)

  if (!place) {
    return (
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-16 py-4 sm:py-6 md:py-8">
        <div className="text-center py-12">
          <h1 className="font-[Manrope] text-foreground mb-4 font-extrabold text-2xl sm:text-3xl">
            Yer Bulunamadı
          </h1>
          <Link href="/discovery">
            <Button className="bg-primary text-white hover:bg-primary/90">
              Geri Dön
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-16 py-4 sm:py-6 md:py-8">
      {/* Back Button */}
      <Link href="/discovery">
        <Button 
          variant="ghost" 
          className="mb-4 sm:mb-6 font-[Manrope] text-foreground hover:bg-accent dark:hover:bg-accent"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Geri Dön
        </Button>
      </Link>

      {/* Page Header */}
      <div className="mb-4 sm:mb-6 md:mb-8">
        <h1 className="font-[Manrope] text-foreground mb-2 font-extrabold text-2xl sm:text-3xl md:text-4xl lg:text-[42px]">
          Turistik Yerler Rehberi
        </h1>
        <p className="font-[Manrope] text-foreground/60 dark:text-muted-foreground font-medium text-sm sm:text-base">
          Nasıl gidilir ve ne zaman gidilir - Detaylı bilgiler
        </p>
      </div>

      {/* Place Image */}
      <div className="relative h-64 sm:h-80 md:h-96 lg:h-[500px] rounded-xl overflow-hidden mb-6 sm:mb-8 shadow-lg">
        <Image
          src={place.image}
          alt={place.title}
          fill
          className="object-cover"
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6">
          <div className="px-2 sm:px-3 py-1 sm:py-1.5 bg-primary rounded-lg inline-block mb-2">
            <span className="font-[Manrope] text-white font-bold text-[10px] sm:text-[11px]">
              {place.category}
            </span>
          </div>
          <h2 className="font-[Manrope] text-white mb-2 font-extrabold text-2xl sm:text-3xl md:text-4xl">
            {place.title}
          </h2>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-white" strokeWidth={2.5} />
            <span className="font-[Manrope] text-white font-medium text-sm sm:text-base">
              {place.description}
            </span>
          </div>
        </div>
      </div>

      {/* How to Reach Section */}
      <section className="mb-6 sm:mb-8">
        <Card className="bg-card rounded-xl shadow-md dark:shadow-lg border border-border">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center gap-2 mb-4 sm:mb-6">
              <Navigation className="w-5 h-5 sm:w-6 sm:h-6 text-primary" strokeWidth={2.5} />
              <h3 className="font-[Manrope] text-foreground font-extrabold text-lg sm:text-xl md:text-2xl">
                Nasıl Gidilir?
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <span className="font-[Manrope] text-primary font-bold text-xs sm:text-[13px] block mb-2">
                  Otobüs ile:
                </span>
                <p className="font-[Manrope] text-foreground/70 dark:text-muted-foreground font-medium text-sm sm:text-base">
                  {place.howToReach.byBus}
                </p>
              </div>
              {place.howToReach.byTram && (
                <div>
                  <span className="font-[Manrope] text-primary font-bold text-xs sm:text-[13px] block mb-2">
                    Tramvay ile:
                  </span>
                  <p className="font-[Manrope] text-foreground/70 dark:text-muted-foreground font-medium text-sm sm:text-base">
                    {place.howToReach.byTram}
                  </p>
                </div>
              )}
              <div>
                <span className="font-[Manrope] text-primary font-bold text-xs sm:text-[13px] block mb-2">
                  Araba ile:
                </span>
                <p className="font-[Manrope] text-foreground/70 dark:text-muted-foreground font-medium text-sm sm:text-base">
                  {place.howToReach.byCar}
                </p>
              </div>
              <div>
                <span className="font-[Manrope] text-primary font-bold text-xs sm:text-[13px] block mb-2">
                  Yürüyerek:
                </span>
                <p className="font-[Manrope] text-foreground/70 dark:text-muted-foreground font-medium text-sm sm:text-base">
                  {place.howToReach.byWalking}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Best Time to Visit Section */}
      <section>
        <Card className="bg-card rounded-xl shadow-md dark:shadow-lg border border-border">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center gap-2 mb-4 sm:mb-6">
              <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-primary" strokeWidth={2.5} />
              <h3 className="font-[Manrope] text-foreground font-extrabold text-lg sm:text-xl md:text-2xl">
                Ne Zaman Gidilir?
              </h3>
            </div>
            <div className="space-y-4 sm:space-y-6">
              <div>
                <span className="font-[Manrope] text-primary font-bold text-xs sm:text-[13px] block mb-2">
                  Günün Saati:
                </span>
                <p className="font-[Manrope] text-foreground/70 dark:text-muted-foreground font-medium text-sm sm:text-base">
                  {place.bestTimeToVisit.timeOfDay}
                </p>
              </div>
              <div>
                <span className="font-[Manrope] text-primary font-bold text-xs sm:text-[13px] block mb-2">
                  Haftanın Günü:
                </span>
                <p className="font-[Manrope] text-foreground/70 dark:text-muted-foreground font-medium text-sm sm:text-base">
                  {place.bestTimeToVisit.dayOfWeek}
                </p>
              </div>
              <div>
                <span className="font-[Manrope] text-primary font-bold text-xs sm:text-[13px] block mb-2">
                  Mevsim:
                </span>
                <p className="font-[Manrope] text-foreground/70 dark:text-muted-foreground font-medium text-sm sm:text-base">
                  {place.bestTimeToVisit.season}
                </p>
              </div>
              <div>
                <span className="font-[Manrope] text-primary font-bold text-xs sm:text-[13px] block mb-2">
                  Özel Notlar:
                </span>
                <p className="font-[Manrope] text-foreground/70 dark:text-muted-foreground font-medium text-sm sm:text-base">
                  {place.bestTimeToVisit.specialNotes}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}

