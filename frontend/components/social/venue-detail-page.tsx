"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { 
  Star, 
  MapPin, 
  Clock, 
  Phone, 
  Globe, 
  DollarSign, 
  Users, 
  Heart, 
  Share2,
  ArrowLeft,
  Camera,
  Navigation
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"

interface Review {
  id: number
  user: {
    name: string
    initials: string
    role: string
  }
  rating: number
  comment: string
  createdAt: string
  helpful: number
}

export function VenueDetailPage() {
  const params = useParams()
  const venueId = params?.id ? Number(params.id) : 1
  const [isFavorite, setIsFavorite] = useState(false)
  const [activeTab, setActiveTab] = useState<"info" | "reviews" | "photos">("info")

  // Mock data - gerçek uygulamada API'den gelecek
  const venue = {
    id: venueId,
    name: "Meram Kıraathanesi",
    category: "Kahve & Tatlı",
    location: "Meram, Merkez",
    fullAddress: "Meram Caddesi No: 123, Meram, Konya",
    rating: 4.8,
    reviews: 156,
    crowdLevel: "medium" as const,
    distance: 1.2,
    images: [
      "https://images.unsplash.com/photo-1646681828239-843f5ed340de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBjb2ZmZWUlMjBzaG9wfGVufDF8fHx8MTc2NDE1ODY4NXww&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1739723745132-97df9db49db2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3p5JTIwY2FmZSUyMGludGVyaW9yfGVufDF8fHx8MTc2NDE1ODI0MHww&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1667388969250-1c7220bf3f37?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXN0YXVyYW50JTIwaW50ZXJpb3J8ZW58MXx8fHwxNzY0MDkyODMwfDA&ixlib=rb-4.1.0&q=80&w=1080",
    ],
    workingHours: {
      monday: "09:00 - 23:00",
      tuesday: "09:00 - 23:00",
      wednesday: "09:00 - 23:00",
      thursday: "09:00 - 23:00",
      friday: "09:00 - 00:00",
      saturday: "10:00 - 00:00",
      sunday: "10:00 - 22:00",
    },
    phone: "+90 332 123 45 67",
    website: "https://meramkıraathanesi.com",
    menuLink: "https://meramkıraathanesi.com/menu",
    priceRange: "Orta",
    description: "Meram'ın kalbinde yer alan bu şirin kıraathane, öğrenciler için ideal bir çalışma ve sosyalleşme mekanı. Sessiz köşeler, hızlı WiFi ve lezzetli kahve seçenekleri sunuyor.",
    coordinates: {
      lat: 37.8746,
      lng: 32.4932,
    },
  }

  const reviews: Review[] = [
    {
      id: 1,
      user: { name: "Ahmet Yılmaz", initials: "AY", role: "Gezgin" },
      rating: 5,
      comment: "Harika bir mekan! Ders çalışmak için mükemmel. WiFi hızlı, ortam sakin ve kahve kalitesi çok iyi.",
      createdAt: "2 gün önce",
      helpful: 12,
    },
    {
      id: 2,
      user: { name: "Zeynep Kaya", initials: "ZK", role: "Seyyah" },
      rating: 4,
      comment: "Güzel bir yer ama hafta sonları biraz kalabalık oluyor. Kahve fiyatları makul.",
      createdAt: "5 gün önce",
      helpful: 8,
    },
    {
      id: 3,
      user: { name: "Mehmet Demir", initials: "MD", role: "Kaşif Meraklısı" },
      rating: 5,
      comment: "En sevdiğim çalışma mekanı. Personel çok yardımcı ve ortam gerçekten rahatlatıcı.",
      createdAt: "1 hafta önce",
      helpful: 15,
    },
  ]

  const crowdColors = {
    low: { bg: "bg-[#03624c]/10 dark:bg-[#03624c]/20", text: "text-[#03624c]", label: "Sakin" },
    medium: { bg: "bg-yellow-500/10 dark:bg-yellow-500/20", text: "text-yellow-600 dark:text-yellow-500", label: "Orta" },
    high: { bg: "bg-red-500/10 dark:bg-red-500/20", text: "text-red-600 dark:text-red-500", label: "Kalabalık" },
  }

  const crowd = crowdColors[venue.crowdLevel]

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: venue.name,
          text: venue.description,
          url: window.location.href,
        })
      } catch (err) {
        console.error("Share failed:", err)
      }
    }
  }

  const openMap = () => {
    const url = `https://www.google.com/maps/search/?api=1&query=${venue.coordinates.lat},${venue.coordinates.lng}`
    window.open(url, "_blank")
  }

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-16 py-4 sm:py-6 md:py-8">
      {/* Back Button */}
      <Link href="/social">
        <Button
          variant="ghost"
          className="mb-4 sm:mb-6 font-[Manrope] text-[#4d4d4d] dark:text-foreground hover:text-[#03624c]"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Geri Dön
        </Button>
      </Link>

      {/* Header Section */}
      <Card className="bg-white dark:bg-card rounded-[20px] shadow-[0_4px_20px_rgba(0,0,0,0.06)] dark:shadow-lg border border-border mb-4 sm:mb-6 overflow-hidden">
        <div className="relative h-64 sm:h-80 lg:h-96">
          <Image
            src={venue.images[0]}
            alt={venue.name}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          
          {/* Actions */}
          <div className="absolute top-4 sm:top-6 right-4 sm:right-6 flex gap-2">
            <Button
              variant="secondary"
              size="icon"
              onClick={() => setIsFavorite(!isFavorite)}
              className="bg-white/90 dark:bg-card/90 backdrop-blur-sm hover:bg-white dark:hover:bg-card"
            >
              <Heart className={`w-5 h-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-[#4d4d4d] dark:text-foreground'}`} />
            </Button>
            <Button
              variant="secondary"
              size="icon"
              onClick={handleShare}
              className="bg-white/90 dark:bg-card/90 backdrop-blur-sm hover:bg-white dark:hover:bg-card"
            >
              <Share2 className="w-5 h-5 text-[#4d4d4d] dark:text-foreground" />
            </Button>
          </div>

          {/* Category Badge */}
          <div className="absolute top-4 sm:top-6 left-4 sm:left-6">
            <Badge className="bg-[#03624c] text-white font-[Manrope] font-bold text-xs sm:text-sm px-3 py-1.5">
              {venue.category}
            </Badge>
          </div>

          {/* Info Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 lg:p-8">
            <h1 className="font-[Manrope] text-white font-extrabold text-2xl sm:text-3xl lg:text-4xl mb-2 sm:mb-3">
              {venue.name}
            </h1>
            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                <span className="font-[Manrope] text-white font-bold text-lg sm:text-xl">
                  {venue.rating}
                </span>
                <span className="font-[Manrope] text-white/80 text-sm sm:text-base">
                  ({venue.reviews} değerlendirme)
                </span>
              </div>
              <div className={`px-3 py-1.5 ${crowd.bg} backdrop-blur-sm rounded-lg flex items-center gap-1.5`}>
                <Users className={`w-4 h-4 ${crowd.text}`} />
                <span className={`font-[Manrope] ${crowd.text} font-bold text-xs sm:text-sm`}>
                  {crowd.label}
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-white/90">
                <MapPin className="w-4 h-4" />
                <span className="font-[Manrope] text-sm sm:text-base">
                  {venue.distance} km
                </span>
              </div>
            </div>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-4 sm:space-y-6">
          {/* Tabs */}
          <Card className="bg-white dark:bg-card rounded-[20px] shadow-[0_4px_20px_rgba(0,0,0,0.06)] dark:shadow-lg border border-border">
            <CardContent className="p-4 sm:p-6">
              <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as typeof activeTab)}>
                <TabsList className="grid w-full grid-cols-3 font-[Manrope] mb-6">
                  <TabsTrigger value="info">Bilgiler</TabsTrigger>
                  <TabsTrigger value="reviews">Değerlendirmeler ({venue.reviews})</TabsTrigger>
                  <TabsTrigger value="photos">Fotoğraflar ({venue.images.length})</TabsTrigger>
                </TabsList>

                <TabsContent value="info" className="space-y-6">
                  {/* Description */}
                  <div>
                    <h3 className="font-[Manrope] text-[#4d4d4d] dark:text-foreground font-bold text-lg sm:text-xl mb-3">
                      Hakkında
                    </h3>
                    <p className="font-[Manrope] text-[#4d4d4d]/70 dark:text-muted-foreground leading-relaxed">
                      {venue.description}
                    </p>
                  </div>

                  <Separator />

                  {/* Working Hours */}
                  <div>
                    <h3 className="font-[Manrope] text-[#4d4d4d] dark:text-foreground font-bold text-lg sm:text-xl mb-4 flex items-center gap-2">
                      <Clock className="w-5 h-5 text-[#03624c]" />
                      Çalışma Saatleri
                    </h3>
                    <div className="space-y-2">
                      {Object.entries(venue.workingHours).map(([day, hours]) => (
                        <div key={day} className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-border last:border-0">
                          <span className="font-[Manrope] font-semibold text-sm text-[#4d4d4d] dark:text-foreground capitalize">
                            {day === "monday" ? "Pazartesi" :
                             day === "tuesday" ? "Salı" :
                             day === "wednesday" ? "Çarşamba" :
                             day === "thursday" ? "Perşembe" :
                             day === "friday" ? "Cuma" :
                             day === "saturday" ? "Cumartesi" : "Pazar"}
                          </span>
                          <span className="font-[Manrope] text-sm text-[#4d4d4d]/60 dark:text-muted-foreground">
                            {hours}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  {/* Contact Info */}
                  <div>
                    <h3 className="font-[Manrope] text-[#4d4d4d] dark:text-foreground font-bold text-lg sm:text-xl mb-4">
                      İletişim Bilgileri
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <MapPin className="w-5 h-5 text-[#03624c]" />
                        <span className="font-[Manrope] text-sm text-[#4d4d4d]/70 dark:text-muted-foreground">
                          {venue.fullAddress}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Phone className="w-5 h-5 text-[#03624c]" />
                        <a href={`tel:${venue.phone}`} className="font-[Manrope] text-sm text-[#03624c] hover:underline">
                          {venue.phone}
                        </a>
                      </div>
                      {venue.website && (
                        <div className="flex items-center gap-3">
                          <Globe className="w-5 h-5 text-[#03624c]" />
                          <a href={venue.website} target="_blank" rel="noopener noreferrer" className="font-[Manrope] text-sm text-[#03624c] hover:underline">
                            Web Sitesi
                          </a>
                        </div>
                      )}
                      {venue.menuLink && (
                        <div className="flex items-center gap-3">
                          <DollarSign className="w-5 h-5 text-[#03624c]" />
                          <a href={venue.menuLink} target="_blank" rel="noopener noreferrer" className="font-[Manrope] text-sm text-[#03624c] hover:underline">
                            Menüyü Görüntüle
                          </a>
                        </div>
                      )}
                    </div>
                  </div>

                  <Separator />

                  {/* Price Range */}
                  <div>
                    <h3 className="font-[Manrope] text-[#4d4d4d] dark:text-foreground font-bold text-lg sm:text-xl mb-3 flex items-center gap-2">
                      <DollarSign className="w-5 h-5 text-[#03624c]" />
                      Fiyat Aralığı
                    </h3>
                    <Badge className="bg-green-100 dark:bg-green-500/20 text-green-600 dark:text-green-400 border-green-200 dark:border-green-500/30 font-[Manrope] font-bold text-sm px-4 py-2">
                      {venue.priceRange}
                    </Badge>
                  </div>
                </TabsContent>

                <TabsContent value="reviews" className="space-y-4">
                  {reviews.map((review) => (
                    <Card key={review.id} className="bg-[#f2f4f3] dark:bg-accent border border-border">
                      <CardContent className="p-4 sm:p-5">
                        <div className="flex items-start gap-4 mb-3">
                          <Avatar className="w-10 h-10">
                            <AvatarFallback className="bg-[#03624c] text-white font-[Manrope] font-bold">
                              {review.user.initials}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <div>
                                <p className="font-[Manrope] font-bold text-sm text-[#4d4d4d] dark:text-foreground">
                                  {review.user.name}
                                </p>
                                <p className="font-[Manrope] text-xs text-[#4d4d4d]/60 dark:text-muted-foreground">
                                  {review.user.role} • {review.createdAt}
                                </p>
                              </div>
                              <div className="flex items-center gap-1">
                                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                                <span className="font-[Manrope] font-bold text-sm text-[#4d4d4d] dark:text-foreground">
                                  {review.rating}
                                </span>
                              </div>
                            </div>
                            <p className="font-[Manrope] text-sm text-[#4d4d4d]/70 dark:text-muted-foreground leading-relaxed mt-2">
                              {review.comment}
                            </p>
                            <div className="flex items-center gap-2 mt-3">
                              <Button variant="ghost" size="sm" className="h-7 text-xs font-[Manrope]">
                                Yararlı ({review.helpful})
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>

                <TabsContent value="photos" className="space-y-4">
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
                    {venue.images.map((image, index) => (
                      <div key={index} className="relative aspect-square rounded-xl overflow-hidden group cursor-pointer">
                        <Image
                          src={image}
                          alt={`${venue.name} - Fotoğraf ${index + 1}`}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-300"
                          sizes="(max-width: 768px) 50vw, 33vw"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                          <Camera className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-4 sm:space-y-6">
          {/* Map Card */}
          <Card className="bg-white dark:bg-card rounded-[20px] shadow-[0_4px_20px_rgba(0,0,0,0.06)] dark:shadow-lg border border-border">
            <CardHeader>
              <CardTitle className="font-[Manrope] text-[#4d4d4d] dark:text-foreground font-bold text-lg">
                Konum
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-0">
              <div className="relative h-48 bg-[#f2f4f3] dark:bg-accent rounded-xl overflow-hidden">
                {/* Placeholder for map - gerçek uygulamada harita entegrasyonu olacak */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-12 h-12 text-[#03624c] mx-auto mb-2" />
                    <p className="font-[Manrope] text-sm text-[#4d4d4d]/60 dark:text-muted-foreground">
                      Harita görünümü
                    </p>
                  </div>
                </div>
              </div>
              <Button
                onClick={openMap}
                className="w-full bg-[#03624c] hover:bg-[#03624c]/90 font-[Manrope] font-bold"
              >
                <Navigation className="w-4 h-4 mr-2" />
                Yol Tarifi Al
              </Button>
              <p className="font-[Manrope] text-xs text-[#4d4d4d]/60 dark:text-muted-foreground">
                {venue.fullAddress}
              </p>
            </CardContent>
          </Card>

          {/* Quick Info */}
          <Card className="bg-white dark:bg-card rounded-[20px] shadow-[0_4px_20px_rgba(0,0,0,0.06)] dark:shadow-lg border border-border">
            <CardHeader>
              <CardTitle className="font-[Manrope] text-[#4d4d4d] dark:text-foreground font-bold text-lg">
                Hızlı Bilgiler
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 pt-0">
              <div className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-border">
                <span className="font-[Manrope] text-sm text-[#4d4d4d]/60 dark:text-muted-foreground">
                  Kategori
                </span>
                <span className="font-[Manrope] font-semibold text-sm text-[#4d4d4d] dark:text-foreground">
                  {venue.category}
                </span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-border">
                <span className="font-[Manrope] text-sm text-[#4d4d4d]/60 dark:text-muted-foreground">
                  Mesafe
                </span>
                <span className="font-[Manrope] font-semibold text-sm text-[#4d4d4d] dark:text-foreground">
                  {venue.distance} km
                </span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-border">
                <span className="font-[Manrope] text-sm text-[#4d4d4d]/60 dark:text-muted-foreground">
                  Puan
                </span>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  <span className="font-[Manrope] font-semibold text-sm text-[#4d4d4d] dark:text-foreground">
                    {venue.rating}
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="font-[Manrope] text-sm text-[#4d4d4d]/60 dark:text-muted-foreground">
                  Kalabalık
                </span>
                <Badge className={`${crowd.bg} ${crowd.text} border-0 font-[Manrope] font-bold text-xs`}>
                  {crowd.label}
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
