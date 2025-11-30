"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { 
  MapPin, 
  Bed, 
  Bath, 
  Ruler, 
  Heart, 
  Share2,
  ArrowLeft,
  Phone,
  Mail,
  Calendar,
  Eye,
  Check,
  Navigation,
  Camera,
  Wifi,
  Car,
  Shield,
  Utensils
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { LeafletMap } from "@/components/common/leaflet-map"

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

export function HousingDetailPage() {
  const params = useParams()
  const housingId = params?.id ? Number(params.id) : 1
  const [isFavorite, setIsFavorite] = useState(false)
  const [activeTab, setActiveTab] = useState<"info" | "reviews" | "photos">("info")
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)

  // Mock data - gerçek uygulamada API'den gelecek
  const housing = {
    id: housingId,
    title: "Selçuklu Modern Residence - Kampüse Yakın",
    category: "Özel Yurt",
    location: "Bosna Hersek, Selçuklu",
    fullAddress: "Bosna Hersek Mahallesi, Atatürk Caddesi No: 45, Selçuklu, Konya",
    price: 8000,
    priceText: "8.000₺",
    bedrooms: 2,
    bathrooms: 1,
    area: 85,
    tags: ["Özel Yurt", "Eşyalı", "WiFi", "Otopark", "Güvenlik"],
    views: 456,
    images: [
      "https://images.unsplash.com/photo-1662454419736-de132ff75638?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcGFydG1lbnQlMjBiZWRyb29tfGVufDF8fHx8MTc2NDE0MzU1NHww&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1612419299101-6c294dc2901d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3p5JTIwYXBhcnRtZW50JTIwbGl2aW5nJTIwcm9vbXxlbnwxfHx8fDE3NjQxNTIxODB8MA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1610123172763-1f587473048f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmdXJuaXNoZWQlMjBzdHVkaW8lMjBhcGFydG1lbnR8ZW58MXx8fHwxNzY0MTc2MTc5fDA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1520277739336-7bf67edfa768?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50JTIwZG9ybWl0b3J5JTIwcm9vbXxlbnwxfHx8fDE3NjQxNzYxNzh8MA&ixlib=rb-4.1.0&q=80&w=1080",
    ],
    description: "Kampüse sadece 1.2 km uzaklıkta, modern ve ferah bir öğrenci yurdu. Tam eşyalı odalar, hızlı WiFi, güvenlikli giriş ve otopark imkanı sunuyor. Ulaşım kolaylığı ve sessiz bir çevre.",
    features: [
      { icon: Wifi, label: "Hızlı WiFi" },
      { icon: Car, label: "Otopark" },
      { icon: Shield, label: "24/7 Güvenlik" },
      { icon: Utensils, label: "Mutfak" },
    ],
    availableFrom: "2025-01-15",
    postedDate: "2024-11-20",
    contact: {
      name: "Ahmet Yılmaz",
      phone: "+90 532 123 45 67",
      email: "ahmet.yilmaz@example.com",
    },
    coordinates: {
      lat: 37.8746,
      lng: 32.4932,
    },
    distance: 1.2,
    rating: 4.6,
    reviews: 23,
  }

  const reviews: Review[] = [
    {
      id: 1,
      user: { name: "Mehmet Demir", initials: "MD", role: "Gezgin" },
      rating: 5,
      comment: "Harika bir yurt! Odalar temiz, WiFi hızlı ve yönetim çok yardımcı. Kampüse yakın olması büyük avantaj.",
      createdAt: "1 hafta önce",
      helpful: 8,
    },
    {
      id: 2,
      user: { name: "Ayşe Kaya", initials: "AK", role: "Seyyah" },
      rating: 4,
      comment: "Güzel bir yer ama fiyat biraz yüksek. Otopark sorunu yok, güvenlik iyi.",
      createdAt: "2 hafta önce",
      helpful: 5,
    },
  ]

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: housing.title,
          text: housing.description,
          url: window.location.href,
        })
      } catch (err) {
        console.error("Share failed:", err)
      }
    }
  }

  const openMap = () => {
    const url = `https://www.openstreetmap.org/?mlat=${housing.coordinates.lat}&mlon=${housing.coordinates.lng}&zoom=15`
    window.open(url, "_blank")
  }

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-16 py-4 sm:py-6 md:py-8">
      {/* Back Button */}
      <Link href="/housing">
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
          {/* Image Gallery */}
          <Card className="bg-card rounded-xl shadow-md dark:shadow-lg border border-border overflow-hidden">
            <div className="relative h-64 sm:h-80 lg:h-96">
              <Image
                src={housing.images[selectedImageIndex]}
                alt={housing.title}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 66vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              
              {/* Actions */}
              <div className="absolute top-4 sm:top-6 right-4 sm:right-6 flex gap-2">
                <Button
                  variant="secondary"
                  size="icon"
                  onClick={() => setIsFavorite(!isFavorite)}
                  className="bg-card/90 backdrop-blur-sm hover:bg-white dark:hover:bg-card"
                >
                  <Heart className={`w-5 h-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-foreground'}`} />
                </Button>
                <Button
                  variant="secondary"
                  size="icon"
                  onClick={handleShare}
                  className="bg-card/90 backdrop-blur-sm hover:bg-white dark:hover:bg-card"
                >
                  <Share2 className="w-5 h-5 text-foreground" />
                </Button>
              </div>

              {/* Category Badge */}
              <div className="absolute top-4 sm:top-6 left-4 sm:left-6">
                <Badge className="bg-primary text-white font-[Manrope] font-bold text-xs sm:text-sm px-3 py-1.5">
                  {housing.category}
                </Badge>
              </div>

              {/* Price Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 lg:p-8">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="font-[Manrope] text-white font-extrabold text-2xl sm:text-3xl lg:text-4xl mb-2">
                      {housing.title}
                    </h1>
                    <div className="flex items-center gap-3 text-white/90">
                      <MapPin className="w-4 h-4" />
                      <span className="font-[Manrope] text-sm sm:text-base">
                        {housing.location} • {housing.distance} km
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-[Manrope] text-white font-black text-3xl sm:text-4xl">
                      {housing.priceText}
                    </div>
                    <div className="font-[Manrope] text-white/80 text-sm sm:text-base">
                      /ay
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Thumbnail Gallery */}
            <div className="p-4 sm:p-6 border-t border-border">
              <div className="grid grid-cols-4 gap-2 sm:gap-3">
                {housing.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImageIndex === index
                        ? 'border-primary ring-2 ring-primary/20'
                        : 'border-transparent hover:border-gray-300 dark:hover:border-border'
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${housing.title} - Fotoğraf ${index + 1}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 25vw, 16vw"
                    />
                  </button>
                ))}
              </div>
            </div>
          </Card>

          {/* Tabs */}
          <Card className="bg-card rounded-xl shadow-md dark:shadow-lg border border-border">
            <CardContent className="p-4 sm:p-6">
              <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as typeof activeTab)}>
                <TabsList className="grid w-full grid-cols-3 font-[Manrope] mb-6">
                  <TabsTrigger value="info">Bilgiler</TabsTrigger>
                  <TabsTrigger value="reviews">Değerlendirmeler ({housing.reviews})</TabsTrigger>
                  <TabsTrigger value="photos">Fotoğraflar ({housing.images.length})</TabsTrigger>
                </TabsList>

                <TabsContent value="info" className="space-y-6">
                  {/* Description */}
                  <div>
                    <h3 className="font-[Manrope] text-foreground font-bold text-lg sm:text-xl mb-3">
                      Açıklama
                    </h3>
                    <p className="font-[Manrope] text-foreground/70 dark:text-muted-foreground leading-relaxed">
                      {housing.description}
                    </p>
                  </div>

                  <Separator />

                  {/* Features */}
                  <div>
                    <h3 className="font-[Manrope] text-foreground font-bold text-lg sm:text-xl mb-4">
                      Özellikler
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      <div className="flex items-center gap-3 p-3 bg-accent rounded-xl">
                        <Bed className="w-5 h-5 text-primary" />
                        <div>
                          <p className="font-[Manrope] font-bold text-sm text-foreground">
                            {housing.bedrooms}
                          </p>
                          <p className="font-[Manrope] text-xs text-foreground/60 dark:text-muted-foreground">
                            Oda
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-accent rounded-xl">
                        <Bath className="w-5 h-5 text-primary" />
                        <div>
                          <p className="font-[Manrope] font-bold text-sm text-foreground">
                            {housing.bathrooms}
                          </p>
                          <p className="font-[Manrope] text-xs text-foreground/60 dark:text-muted-foreground">
                            Banyo
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-accent rounded-xl">
                        <Ruler className="w-5 h-5 text-primary" />
                        <div>
                          <p className="font-[Manrope] font-bold text-sm text-foreground">
                            {housing.area}
                          </p>
                          <p className="font-[Manrope] text-xs text-foreground/60 dark:text-muted-foreground">
                            m²
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-accent rounded-xl">
                        <Eye className="w-5 h-5 text-primary" />
                        <div>
                          <p className="font-[Manrope] font-bold text-sm text-foreground">
                            {housing.views}
                          </p>
                          <p className="font-[Manrope] text-xs text-foreground/60 dark:text-muted-foreground">
                            Görüntüleme
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Amenities */}
                  <div>
                    <h3 className="font-[Manrope] text-foreground font-bold text-lg sm:text-xl mb-4">
                      Olanaklar
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {housing.features.map((feature, index) => {
                        const Icon = feature.icon
                        return (
                          <div key={index} className="flex items-center gap-2 p-3 bg-accent rounded-xl">
                            <Icon className="w-5 h-5 text-primary" />
                            <span className="font-[Manrope] font-semibold text-sm text-foreground">
                              {feature.label}
                            </span>
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  <Separator />

                  {/* Tags */}
                  <div>
                    <h3 className="font-[Manrope] text-foreground font-bold text-lg sm:text-xl mb-4">
                      Etiketler
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {housing.tags.map((tag, index) => (
                        <Badge key={index} className="bg-primary/10 dark:bg-primary/20 text-primary border-primary/20 dark:border-primary/30 font-[Manrope] font-bold text-sm px-3 py-1.5">
                          <Check className="w-3 h-3 mr-1.5" />
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  {/* Availability */}
                  <div>
                    <h3 className="font-[Manrope] text-foreground font-bold text-lg sm:text-xl mb-3 flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-primary" />
                      Müsaitlik
                    </h3>
                    <p className="font-[Manrope] text-sm text-foreground/70 dark:text-muted-foreground">
                      Müsaitlik tarihi: <span className="font-bold text-primary">{new Date(housing.availableFrom).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                    </p>
                    <p className="font-[Manrope] text-xs text-foreground/60 dark:text-muted-foreground mt-1">
                      İlan tarihi: {new Date(housing.postedDate).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </p>
                  </div>
                </TabsContent>

                <TabsContent value="reviews" className="space-y-4">
                  {reviews.map((review) => (
                    <Card key={review.id} className="bg-accent border border-border">
                      <CardContent className="p-4 sm:p-5">
                        <div className="flex items-start gap-4 mb-3">
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <div>
                                <p className="font-[Manrope] font-bold text-sm text-foreground">
                                  {review.user.name}
                                </p>
                                <p className="font-[Manrope] text-xs text-foreground/60 dark:text-muted-foreground">
                                  {review.user.role} • {review.createdAt}
                                </p>
                              </div>
                              <div className="flex items-center gap-1">
                                {[...Array(5)].map((_, i) => (
                                  <div
                                    key={i}
                                    className={`w-4 h-4 rounded ${
                                      i < review.rating
                                        ? 'bg-yellow-400'
                                        : 'bg-gray-200 dark:bg-gray-700'
                                    }`}
                                  />
                                ))}
                              </div>
                            </div>
                            <p className="font-[Manrope] text-sm text-foreground/70 dark:text-muted-foreground leading-relaxed mt-2">
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
                    {housing.images.map((image, index) => (
                      <div key={index} className="relative aspect-square rounded-xl overflow-hidden group cursor-pointer">
                        <Image
                          src={image}
                          alt={`${housing.title} - Fotoğraf ${index + 1}`}
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
          {/* Contact Card */}
          <Card className="bg-card rounded-xl shadow-md dark:shadow-lg border border-border">
            <CardHeader>
              <CardTitle className="font-[Manrope] text-foreground font-bold text-lg">
                İletişim
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-0">
              <div>
                <p className="font-[Manrope] font-bold text-sm text-foreground mb-1">
                  {housing.contact.name}
                </p>
                <div className="space-y-2 mt-3">
                  <a
                    href={`tel:${housing.contact.phone}`}
                    className="flex items-center gap-3 p-3 bg-accent rounded-xl hover:bg-primary/10 dark:hover:bg-primary/20 transition-colors group"
                  >
                    <Phone className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
                    <span className="font-[Manrope] font-semibold text-sm text-foreground group-hover:text-primary">
                      {housing.contact.phone}
                    </span>
                  </a>
                  <a
                    href={`mailto:${housing.contact.email}`}
                    className="flex items-center gap-3 p-3 bg-accent rounded-xl hover:bg-primary/10 dark:hover:bg-primary/20 transition-colors group"
                  >
                    <Mail className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
                    <span className="font-[Manrope] font-semibold text-sm text-foreground group-hover:text-primary">
                      E-posta Gönder
                    </span>
                  </a>
                </div>
              </div>
              <Button className="w-full bg-primary hover:bg-primary/90 font-[Manrope] font-bold">
                Mesaj Gönder
              </Button>
            </CardContent>
          </Card>

          {/* Map Card */}
          <Card className="bg-card rounded-xl shadow-md dark:shadow-lg border border-border">
            <CardHeader>
              <CardTitle className="font-[Manrope] text-foreground font-bold text-lg">
                Konum
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-0">
              <div className="relative h-48 bg-accent rounded-xl overflow-hidden">
                <LeafletMap
                  lat={housing.coordinates.lat}
                  lng={housing.coordinates.lng}
                  zoom={15}
                  height="100%"
                  showPopup={true}
                  popupContent={
                    <div className="font-[Manrope]">
                      <h3 className="font-bold text-sm mb-1">{housing.title}</h3>
                      <p className="text-xs text-foreground/60">{housing.fullAddress}</p>
                    </div>
                  }
                />
              </div>
              <Button
                onClick={openMap}
                className="w-full bg-primary hover:bg-primary/90 font-[Manrope] font-bold"
              >
                <Navigation className="w-4 h-4 mr-2" />
                Yol Tarifi Al
              </Button>
              <p className="font-[Manrope] text-xs text-foreground/60 dark:text-muted-foreground">
                {housing.fullAddress}
              </p>
            </CardContent>
          </Card>

          {/* Quick Info */}
          <Card className="bg-card rounded-xl shadow-md dark:shadow-lg border border-border">
            <CardHeader>
              <CardTitle className="font-[Manrope] text-foreground font-bold text-lg">
                Hızlı Bilgiler
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 pt-0">
              <div className="flex items-center justify-between py-2 border-b border-border">
                <span className="font-[Manrope] text-sm text-foreground/60 dark:text-muted-foreground">
                  Fiyat
                </span>
                <span className="font-[Manrope] font-bold text-lg text-primary">
                  {housing.priceText}/ay
                </span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-border">
                <span className="font-[Manrope] text-sm text-foreground/60 dark:text-muted-foreground">
                  Mesafe
                </span>
                <span className="font-[Manrope] font-semibold text-sm text-foreground">
                  {housing.distance} km
                </span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-border">
                <span className="font-[Manrope] text-sm text-foreground/60 dark:text-muted-foreground">
                  Puan
                </span>
                <span className="font-[Manrope] font-semibold text-sm text-foreground">
                  {housing.rating} ⭐
                </span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="font-[Manrope] text-sm text-foreground/60 dark:text-muted-foreground">
                  Kategori
                </span>
                <Badge className="bg-primary text-white font-[Manrope] font-bold text-xs">
                  {housing.category}
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

