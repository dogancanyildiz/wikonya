"use client"

import { Bus, Home, ShoppingBasket, Zap, Utensils, Heart, ArrowLeft } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { LucideIcon } from "lucide-react"

interface Guide {
  id: number
  icon: LucideIcon
  title: string
  description: string
  image: string
  articles: number
  fullContent: string
}

const guidesData: Guide[] = [
  {
    id: 1,
    icon: Bus,
    title: "Toplu Taşıma & Elkart Rehberi",
    description: "Konya'da ulaşım sistemleri, kart fiyatları ve güzergahlar hakkında bilgi.",
    image: "https://images.unsplash.com/photo-1756723701257-46513cd36fc1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaXR5JTIwYnVzJTIwdHJhbnNwb3J0fGVufDF8fHx8MTc2NDE0ODk0NHww&ixlib=rb-4.1.0&q=80&w=1080",
    articles: 8,
    fullContent: `Konya'da toplu taşıma sistemi oldukça gelişmiş ve öğrenci dostu. İşte bilmeniz gerekenler:

**Elkart Nedir?**
Elkart, Konya Büyükşehir Belediyesi'nin akıllı kart sistemidir. Otobüs ve tramvaylarda kullanılır.

**Kart Fiyatları:**
- Öğrenci kartı: 50 TL (depozito dahil)
- Normal kart: 50 TL (depozito dahil)
- Günlük bilet: 15 TL

**Kart Yükleme:**
- Belediye bürolarından
- Kart yükleme makinelerinden
- Mobil uygulamadan

**Ana Hatlar:**
- Meram - Selçuklu hattı
- Alaaddin - Kampüs hattı
- Merkez - Sille hattı

**Öğrenci İndirimleri:**
Öğrenci kartı ile %50 indirimli seyahat edebilirsiniz. Kampüse giden hatlar özellikle öğrenciler için optimize edilmiştir.`
  },
  {
    id: 2,
    icon: Home,
    title: "En İyi Öğrenci Mahalleleri",
    description: "Kampüse yakın, güvenli ve uygun fiyatlı semtler rehberi.",
    image: "https://images.unsplash.com/photo-1616113364365-b6013f3dad25?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZWlnaGJvcmhvb2QlMjBzdHJlZXR8ZW58MXx8fHwxNzY0MDg0MTI3fDA&ixlib=rb-4.1.0&q=80&w=1080",
    articles: 12,
    fullContent: `Konya'da öğrenci yaşamı için en uygun mahalleler:

**1. Bosna Hersek (Meram)**
- Kampüse yakınlık: 10 dakika yürüyüş
- Ortalama kira: 2000-3000 TL
- Özellikler: Sakin, güvenli, öğrenci dostu

**2. Alaaddin (Karatay)**
- Kampüse yakınlık: 15 dakika yürüyüş
- Ortalama kira: 2500-3500 TL
- Özellikler: Merkezi konum, ulaşım kolay

**3. Sille (Selçuklu)**
- Kampüse yakınlık: 20 dakika otobüs
- Ortalama kira: 1800-2800 TL
- Özellikler: Tarihi atmosfer, uygun fiyat

**4. Fevziçakmak (Karatay)**
- Kampüse yakınlık: 12 dakika yürüyüş
- Ortalama kira: 2200-3200 TL
- Özellikler: Modern binalar, güvenli

**Kira İpuçları:**
- Dönem başında kiralar yükselir, erken araştırın
- Ortak ev paylaşımı maliyeti düşürür
- Depozito ve aidatları sorun`
  },
  {
    id: 3,
    icon: ShoppingBasket,
    title: "Semt Pazarları Günleri",
    description: "Taze ve ucuz alışveriş için Konya semt pazarları takvimi.",
    image: "https://images.unsplash.com/photo-1748342319942-223b99937d4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXJrZXQlMjB2ZWdldGFibGVzJTIwZnJlc2h8ZW58MXx8fHwxNzY0MTc2MTgxfDA&ixlib=rb-4.1.0&q=80&w=1080",
    articles: 6,
    fullContent: `Konya'da taze ve uygun fiyatlı alışveriş için semt pazarları:

**Pazartesi:**
- Meram Pazarı (Meram Caddesi)
- Selçuklu Pazarı (Selçuklu Merkez)

**Salı:**
- Karatay Pazarı (Karatay Merkez)
- Alaaddin Pazarı (Alaaddin Tepesi)

**Çarşamba:**
- Bosna Hersek Pazarı (Bosna Hersek)
- Sille Pazarı (Sille Köyü)

**Perşembe:**
- Merkez Pazarı (Şehir Merkezi)
- Yeni Meram Pazarı (Yeni Meram)

**Cuma:**
- Büyük Pazar (Şehir Merkezi - En büyük pazar)
- Selçuklu Pazarı (Selçuklu)

**Cumartesi:**
- Karatay Pazarı (Karatay)
- Alaaddin Pazarı (Alaaddin)

**Pazar:**
- Meram Pazarı (Meram)
- Sille Pazarı (Sille)

**İpuçları:**
- Sabah erken saatlerde daha taze ürünler
- Pazarlık yapabilirsiniz
- Nakit para getirin
- Çanta veya sepet getirin`
  },
  {
    id: 4,
    icon: Zap,
    title: "Elektrik & Su Abonelikleri",
    description: "Elektrik, su ve internet bağlatma süreçleri ve fiyatları.",
    image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJpY2l0eSUyMG1ldGVyfGVufDF8fHx8MTc2NDE3NjE4Mnww&ixlib=rb-4.1.0&q=80&w=1080",
    articles: 10,
    fullContent: `Konya'da elektrik, su ve internet bağlatma rehberi:

**Elektrik Aboneliği:**
- Başvuru: TEDAŞ ofisleri veya online
- Gerekli belgeler: Kimlik, sözleşme, fatura
- Depozito: 200-500 TL
- Bağlantı süresi: 3-5 iş günü

**Su Aboneliği:**
- Başvuru: KOSKİ ofisleri
- Gerekli belgeler: Kimlik, sözleşme
- Depozito: 100-300 TL
- Bağlantı süresi: 2-3 iş günü

**İnternet Bağlantısı:**
- Popüler sağlayıcılar: Türk Telekom, Superonline, D-Smart
- Ortalama fiyat: 150-300 TL/ay
- Kurulum: 1-3 iş günü
- Öğrenci indirimleri mevcut

**İpuçları:**
- Öğrenci belgesi ile indirim alabilirsiniz
- Ortak evlerde faturaları paylaşın
- Online başvuru daha hızlı`
  },
  {
    id: 5,
    icon: Utensils,
    title: "Uygun Fiyatlı Yemek Yerleri",
    description: "Öğrenci bütçesine uygun, lezzetli ve doyurucu yemek mekanları.",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXN0YXVyYW50JTIwZm9vZHxlbnwxfHx8fDE3NjQxNzYxODN8MA&ixlib=rb-4.1.0&q=80&w=1080",
    articles: 15,
    fullContent: `Konya'da öğrenci bütçesine uygun yemek yerleri:

**Kampüs Yemekhanesi:**
- Fiyat: 25-40 TL
- Öğrenci indirimi: %30
- Çeşit: Günlük menü, çorba, salata

**Etli Ekmek Mekanları:**
- Fiyat: 15-25 TL
- Popüler yerler: Meram, Alaaddin
- Önerilen: Mevlana Etli Ekmek

**Pide & Lahmacun:**
- Fiyat: 20-35 TL
- Popüler yerler: Şehir merkezi
- Öğrenci indirimleri mevcut

**Fast Food:**
- Fiyat: 30-50 TL
- Popüler zincirler: Burger King, McDonald's
- Öğrenci menüleri mevcut

**Kahvaltı:**
- Fiyat: 40-60 TL
- Serpme kahvaltı seçenekleri
- Öğrenci indirimleri mevcut

**İpuçları:**
- Öğrenci kartı ile indirim alın
- Kampüs yemekhanesi en ekonomik
- Ev yemekleri için semt lokantaları`
  },
  {
    id: 6,
    icon: Heart,
    title: "Sağlık Hizmetleri & Eczaneler",
    description: "Kampüse yakın sağlık merkezleri, hastaneler ve 7/24 açık eczaneler.",
    image: "https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGglMjBjZW50ZXJ8ZW58MXx8fHwxNzY0MTc2MTg0fDA&ixlib=rb-4.1.0&q=80&w=1080",
    articles: 8,
    fullContent: `Konya'da sağlık hizmetleri rehberi:

**Kampüs Sağlık Merkezi:**
- Konum: Kampüs içi
- Hizmetler: Genel muayene, aşı, ilk yardım
- Ücret: Öğrenciler için ücretsiz
- Çalışma saatleri: 08:00-17:00

**Hastaneler:**
- Selçuklu Devlet Hastanesi (Merkez)
- Konya Eğitim ve Araştırma Hastanesi
- Özel hastaneler: Memorial, Medicana

**Eczaneler:**
- Kampüse yakın eczaneler: 5-10 dakika
- 7/24 açık eczaneler mevcut
- Nöbetçi eczane bilgisi: 114

**Acil Durumlar:**
- Ambulans: 112
- Polis: 155
- İtfaiye: 110

**Öğrenci Sağlık Sigortası:**
- SGK ile anlaşmalı hastaneler
- İndirimli muayene
- İlaç desteği mevcut

**İpuçları:**
- Kampüs sağlık merkezini kullanın
- Öğrenci sağlık sigortanızı kontrol edin
- Nöbetçi eczane listesini kaydedin`
  },
]

export function LifeGuideDetailPage({ guideId }: { guideId: number }) {
  const guide = guidesData.find(g => g.id === guideId)
  const Icon = guide?.icon || Bus

  if (!guide) {
    return (
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-16 py-4 sm:py-6 md:py-8">
        <div className="text-center py-12">
          <h1 className="font-[Manrope] text-foreground mb-4 font-extrabold text-2xl sm:text-3xl">
            Rehber Bulunamadı
          </h1>
          <Link href="/housing">
            <Button className="bg-primary text-white hover:bg-primary/90">
              Geri Dön
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-16 py-6 sm:py-8 md:py-10">
      {/* Back Button */}
      <Link href="/housing">
        <Button 
          variant="ghost" 
          className="mb-4 sm:mb-6 font-[Manrope] text-foreground hover:bg-accent dark:hover:bg-accent"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Geri Dön
        </Button>
      </Link>

      {/* Guide Card */}
      <Card className="bg-card rounded-xl shadow-md dark:shadow-lg border border-border overflow-hidden">
        {/* Image */}
        <div className="relative h-64 sm:h-80 overflow-hidden">
          <Image
            src={guide.image}
            alt={guide.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 66vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          
          {/* Icon Badge */}
          <div className="absolute top-4 sm:top-6 left-4 sm:left-6">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-primary rounded-xl flex items-center justify-center shadow-lg">
              <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" strokeWidth={2.5} />
            </div>
          </div>
        </div>

        {/* Content */}
        <CardContent className="p-6 sm:p-8 md:p-10">
          <div className="mb-6 sm:mb-8">
            <h1 className="font-[Manrope] text-foreground mb-3 sm:mb-4 font-extrabold text-2xl sm:text-3xl lg:text-4xl">
              {guide.title}
            </h1>
            <p className="font-[Manrope] text-foreground/60 dark:text-muted-foreground font-medium text-sm sm:text-base">
              {guide.description}
            </p>
          </div>

          <div className="max-w-none">
            <div className="font-[Manrope] text-foreground text-sm sm:text-base md:text-lg leading-relaxed whitespace-pre-line space-y-4">
              {guide.fullContent.split('\n').map((line, index) => {
                // Bold text detection
                if (line.startsWith('**') && line.endsWith('**')) {
                  const boldText = line.slice(2, -2)
                  return (
                    <h3 key={index} className="font-bold text-base sm:text-lg md:text-xl text-primary dark:text-primary mt-6 mb-3">
                      {boldText}
                    </h3>
                  )
                }
                // List items
                if (line.trim().startsWith('-')) {
                  return (
                    <div key={index} className="flex items-start gap-2 pl-4">
                      <span className="text-primary mt-2">•</span>
                      <span className="flex-1">{line.trim().substring(1).trim()}</span>
                    </div>
                  )
                }
                // Empty lines
                if (line.trim() === '') {
                  return <br key={index} />
                }
                // Regular text
                return (
                  <p key={index} className="mb-2">
                    {line}
                  </p>
                )
              })}
            </div>
          </div>

          <div className="mt-8 sm:mt-10 pt-6 sm:pt-8 border-t border-border">
            <div className="flex items-center justify-between">
              <span className="font-[Manrope] text-primary font-bold text-sm sm:text-base">
                {guide.articles} rehber içeriği
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

