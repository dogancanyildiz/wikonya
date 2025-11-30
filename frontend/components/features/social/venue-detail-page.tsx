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

// Venue data - venue-grid.tsx ile aynı veri
const allVenues = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1646681828239-843f5ed340de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBjb2ZmZWUlMjBzaG9wfGVufDF8fHx8MTc2NDE1ODY4NXww&ixlib=rb-4.1.0&q=80&w=1080",
    name: "Starbucks Konya Alaaddin",
    location: "Alaaddin, Karatay",
    rating: 4.8,
    reviews: 156,
    crowdLevel: "medium" as const,
    category: "Kahve & Tatlı",
    distance: 1.2,
    coordinates: { lat: 37.8746, lng: 32.4932 },
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1737018363337-c11847e9f39b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsaWJyYXJ5JTIwc3R1ZHklMjBzcGFjZXxlbnwxfHx8fDE3NjQxNzU4Mzh8MA&ixlib=rb-4.1.0&q=80&w=1080",
    name: "Kahve Dünyası Meram",
    location: "Meram, Merkez",
    rating: 4.9,
    reviews: 234,
    crowdLevel: "low" as const,
    category: "Ders Çalışma",
    distance: 0.8,
    coordinates: { lat: 37.8750, lng: 32.4940 },
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1667388969250-1c7220bf3f37?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXN0YXVyYW50JTIwaW50ZXJpb3J8ZW58MXx8fHwxNzY0MDkyODMwfDA&ixlib=rb-4.1.0&q=80&w=1080",
    name: "Cafe Nero Selçuklu",
    location: "Selçuklu, Merkez",
    rating: 4.7,
    reviews: 89,
    crowdLevel: "high" as const,
    category: "Sosyal Buluşma",
    distance: 2.5,
    coordinates: { lat: 37.8730, lng: 32.4910 },
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1763301331567-21c465b66e02?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYWZlJTIwb3V0ZG9vciUyMHNlYXRpbmd8ZW58MXx8fHwxNzY0MTQzMTI3fDA&ixlib=rb-4.1.0&q=80&w=1080",
    name: "Mado Konya Meram",
    location: "Meram, Merkez",
    rating: 4.6,
    reviews: 112,
    crowdLevel: "low" as const,
    category: "Sakin Ortam",
    distance: 3.1,
    coordinates: { lat: 37.8760, lng: 32.4950 },
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1624340236923-4e6e8724695d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib29rc3RvcmUlMjBjYWZlfGVufDF8fHx8MTc2NDE3NTgzOXww&ixlib=rb-4.1.0&q=80&w=1080",
    name: "Gloria Jeans Konya",
    location: "Selçuklu, Merkez",
    rating: 4.9,
    reviews: 198,
    crowdLevel: "low" as const,
    category: "Ders Çalışma",
    distance: 1.5,
    coordinates: { lat: 37.8720, lng: 32.4920 },
  },
  {
    id: 6,
    image: "https://images.unsplash.com/photo-1614014929026-c542fbe555d1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMGNvbmNlcnQlMjB2ZW51ZXxlbnwxfHx8fDE3NjQxNzU4NDB8MA&ixlib=rb-4.1.0&q=80&w=1080",
    name: "Simit Sarayı Konya",
    location: "Selçuklu, Merkez",
    rating: 4.5,
    reviews: 76,
    crowdLevel: "high" as const,
    category: "Kahve & Tatlı",
    distance: 2.8,
    coordinates: { lat: 37.8770, lng: 32.4960 },
  },
  {
    id: 7,
    image: "https://images.unsplash.com/photo-1762744594797-bcfd17a8c032?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1lJTIwY2FmZSUyMGJvYXJkJTIwZ2FtZXN8ZW58MXx8fHwxNzY0MTc1ODQwfDA&ixlib=rb-4.1.0&q=80&w=1080",
    name: "Konya Kitap Kafe",
    location: "Meram, Merkez",
    rating: 4.8,
    reviews: 134,
    crowdLevel: "medium" as const,
    category: "Ders Çalışma",
    distance: 4.2,
    coordinates: { lat: 37.8780, lng: 32.4970 },
  },
  {
    id: 8,
    image: "https://images.unsplash.com/photo-1739723745132-97df9db49db2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3p5JTIwY2FmZSUyMGludGVyaW9yfGVufDF8fHx8MTc2NDE1ODI0MHww&ixlib=rb-4.1.0&q=80&w=1080",
    name: "Konya Kütüphane Cafe",
    location: "Selçuklu, Merkez",
    rating: 4.7,
    reviews: 92,
    crowdLevel: "low" as const,
    category: "Sakin Ortam",
    distance: 1.9,
    coordinates: { lat: 37.8740, lng: 32.4930 },
  },
  {
    id: 9,
    image: "https://images.unsplash.com/photo-1667388969250-1c7220bf3f37?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXN0YXVyYW50JTIwaW50ZXJpb3J8ZW58MXx8fHwxNzY0MDkyODMwfDA&ixlib=rb-4.1.0&q=80&w=1080",
    name: "Starbucks Konya Selçuklu",
    location: "Selçuklu, Merkez",
    rating: 4.6,
    reviews: 67,
    crowdLevel: "medium" as const,
    category: "Kahve & Tatlı",
    distance: 3.5,
    coordinates: { lat: 37.8790, lng: 32.4980 },
  },
  {
    id: 10,
    image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    name: "Kahve Dünyası Selçuklu",
    location: "Selçuklu, Merkez",
    rating: 4.4,
    reviews: 87,
    crowdLevel: "medium" as const,
    category: "Kahve & Tatlı",
    distance: 2.1,
    coordinates: { lat: 37.8755, lng: 32.4945 },
  },
  {
    id: 11,
    image: "https://images.unsplash.com/photo-1521017432531-fbd92d768814?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    name: "Selçuk Üniversitesi Kütüphane Cafe",
    location: "Kampüs, Selçuklu",
    rating: 4.8,
    reviews: 312,
    crowdLevel: "low" as const,
    category: "Ders Çalışma",
    distance: 0.5,
    coordinates: { lat: 37.8748, lng: 32.4938 },
  },
  {
    id: 12,
    image: "https://images.unsplash.com/photo-1493857671505-72967e2e2760?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    name: "Mado Konya Selçuklu",
    location: "Selçuklu, Merkez",
    rating: 4.3,
    reviews: 145,
    crowdLevel: "high" as const,
    category: "Kahve & Tatlı",
    distance: 3.8,
    coordinates: { lat: 37.8765, lng: 32.4955 },
  },
  {
    id: 13,
    image: "https://images.unsplash.com/photo-1511882150382-421056c89033?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    name: "Cafe Nero Konya Meram",
    location: "Meram, Merkez",
    rating: 4.7,
    reviews: 203,
    crowdLevel: "high" as const,
    category: "Kahve & Tatlı",
    distance: 2.3,
    coordinates: { lat: 37.8772, lng: 32.4962 },
  },
  {
    id: 14,
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    name: "Gloria Jeans Meram",
    location: "Meram, Merkez",
    rating: 4.5,
    reviews: 178,
    crowdLevel: "medium" as const,
    category: "Sosyal Buluşma",
    distance: 4.1,
    coordinates: { lat: 37.8735, lng: 32.4915 },
  },
  {
    id: 15,
    image: "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    name: "Konya Çay Bahçesi",
    location: "Meram, Merkez",
    rating: 4.6,
    reviews: 94,
    crowdLevel: "low" as const,
    category: "Sakin Ortam",
    distance: 5.2,
    coordinates: { lat: 37.8742, lng: 32.4928 },
  },
  {
    id: 16,
    image: "https://images.unsplash.com/photo-1445116572660-236099ec97a0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    name: "Kahve Dünyası Alaaddin",
    location: "Alaaddin, Karatay",
    rating: 4.7,
    reviews: 167,
    crowdLevel: "medium" as const,
    category: "Kahve & Tatlı",
    distance: 1.8,
    coordinates: { lat: 37.8758, lng: 32.4948 },
  },
  {
    id: 17,
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    name: "Konya Öğrenci Kafe",
    location: "Selçuklu, Merkez",
    rating: 4.9,
    reviews: 256,
    crowdLevel: "low" as const,
    category: "Ders Çalışma",
    distance: 1.1,
    coordinates: { lat: 37.8752, lng: 32.4942 },
  },
  {
    id: 18,
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    name: "Konya Kültür Merkezi Cafe",
    location: "Selçuklu, Merkez",
    rating: 4.4,
    reviews: 123,
    crowdLevel: "high" as const,
    category: "Sosyal Buluşma",
    distance: 2.9,
    coordinates: { lat: 37.8768, lng: 32.4958 },
  },
  {
    id: 19,
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    name: "Konya Gençlik Merkezi",
    location: "Selçuklu, Merkez",
    rating: 4.6,
    reviews: 189,
    crowdLevel: "high" as const,
    category: "Sosyal Buluşma",
    distance: 3.4,
    coordinates: { lat: 37.8778, lng: 32.4968 },
  },
  {
    id: 20,
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    name: "Konya Belediye Kafe",
    location: "Karatay, Merkez",
    rating: 4.5,
    reviews: 134,
    crowdLevel: "medium" as const,
    category: "Sosyal Buluşma",
    distance: 2.7,
    coordinates: { lat: 37.8732, lng: 32.4912 },
  },
  {
    id: 21,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    name: "Konya Park Cafe",
    location: "Meram, Merkez",
    rating: 4.8,
    reviews: 145,
    crowdLevel: "low" as const,
    category: "Sakin Ortam",
    distance: 3.9,
    coordinates: { lat: 37.8745, lng: 32.4935 },
  },
  {
    id: 22,
    image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    name: "Konya Tarihi Çarşı Cafe",
    location: "Selçuklu, Merkez",
    rating: 4.9,
    reviews: 278,
    crowdLevel: "medium" as const,
    category: "Kahve & Tatlı",
    distance: 1.4,
    coordinates: { lat: 37.8760, lng: 32.4952 },
  },
  {
    id: 23,
    image: "https://images.unsplash.com/photo-1568992687947-868a62a9f521?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    name: "Konya Bilim Merkezi Cafe",
    location: "Selçuklu, Merkez",
    rating: 4.7,
    reviews: 198,
    crowdLevel: "low" as const,
    category: "Ders Çalışma",
    distance: 2.2,
    coordinates: { lat: 37.8754, lng: 32.4944 },
  },
  {
    id: 24,
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    name: "Konya Mevlana Kafe",
    location: "Meram, Merkez",
    rating: 4.2,
    reviews: 98,
    crowdLevel: "high" as const,
    category: "Sosyal Buluşma",
    distance: 4.5,
    coordinates: { lat: 37.8762, lng: 32.4952 },
  },
]

// Generate descriptions based on venue category and name
const getVenueDescription = (venue: typeof allVenues[0]): string => {
  const descriptions: Record<string, string> = {
    "Starbucks Konya Alaaddin": "Alaaddin bölgesinde yer alan bu Starbucks şubesi, öğrenciler için ideal bir çalışma ortamı sunuyor. Hızlı WiFi, rahat koltuklar ve geniş masa alanları ile ders çalışmak için mükemmel.",
    "Kahve Dünyası Meram": "Meram'ın kalbinde yer alan bu şube, sessiz ortamı ve kaliteli kahve seçenekleriyle öğrencilerin tercih ettiği bir mekan. Ders çalışmak için ideal bir atmosfer.",
    "Cafe Nero Selçuklu": "Selçuklu merkezde bulunan bu cafe, sosyal buluşmalar için harika bir mekan. Geniş oturma alanı ve lezzetli yemek seçenekleri sunuyor.",
    "Mado Konya Meram": "Meram'da sakin bir ortam arayanlar için ideal. Dondurma ve tatlı çeşitleriyle ünlü bu mekan, huzurlu bir çalışma ortamı sağlıyor.",
    "Gloria Jeans Konya": "Selçuklu'da öğrencilerin en çok tercih ettiği mekanlardan biri. Sessiz köşeler, hızlı WiFi ve uygun fiyatlı menü seçenekleriyle ders çalışmak için mükemmel.",
    "Simit Sarayı Konya": "Kahvaltı ve atıştırmalık seçenekleriyle ünlü bu mekan, hızlı bir mola için ideal. Öğrenci dostu fiyatlarıyla dikkat çekiyor.",
    "Konya Kitap Kafe": "Kitap severler için özel tasarlanmış bu mekan, geniş kitap koleksiyonu ve sessiz ortamıyla dikkat çekiyor. Okumak ve çalışmak için harika bir atmosfer.",
    "Konya Kütüphane Cafe": "Kütüphane atmosferinde çalışmak isteyenler için ideal. Sessiz ortam ve geniş çalışma masalarıyla öğrencilerin tercih ettiği bir mekan.",
    "Starbucks Konya Selçuklu": "Selçuklu'da bulunan bu şube, modern tasarımı ve rahat ortamıyla öne çıkıyor. Ders çalışmak veya sosyalleşmek için uygun bir mekan.",
    "Kahve Dünyası Selçuklu": "Selçuklu merkezde yer alan bu şube, kaliteli kahve ve atıştırmalık seçenekleriyle öğrencilere hizmet veriyor.",
    "Selçuk Üniversitesi Kütüphane Cafe": "Kampüs içinde yer alan bu cafe, öğrencilerin en çok tercih ettiği mekanlardan biri. Ders aralarında hızlı bir mola için ideal.",
    "Mado Konya Selçuklu": "Selçuklu'da bulunan bu şube, dondurma ve tatlı çeşitleriyle ünlü. Sosyal buluşmalar için harika bir mekan.",
    "Cafe Nero Konya Meram": "Meram'da modern bir atmosfer arayanlar için ideal. Geniş oturma alanı ve lezzetli menü seçenekleri sunuyor.",
    "Gloria Jeans Meram": "Meram'da öğrenci dostu fiyatlarıyla dikkat çeken bu mekan, sessiz ortamıyla ders çalışmak için uygun.",
    "Konya Çay Bahçesi": "Geleneksel çay bahçesi atmosferinde huzurlu bir ortam arayanlar için ideal. Açık havada oturma imkanı sunuyor.",
    "Kahve Dünyası Alaaddin": "Alaaddin bölgesinde yer alan bu şube, tarihi atmosfer içinde modern bir kahve deneyimi sunuyor.",
    "Konya Öğrenci Kafe": "Öğrenciler için özel tasarlanmış bu mekan, uygun fiyatları ve geniş çalışma alanlarıyla öne çıkıyor.",
    "Konya Kültür Merkezi Cafe": "Kültür merkezi içinde yer alan bu cafe, sanat ve kültür etkinliklerine yakın olmak isteyenler için ideal.",
    "Konya Gençlik Merkezi": "Gençlik merkezi içinde bulunan bu mekan, sosyal aktiviteler ve buluşmalar için harika bir ortam sunuyor.",
    "Konya Belediye Kafe": "Belediye binası yakınında yer alan bu cafe, şehir merkezinde hızlı bir mola için uygun.",
    "Konya Park Cafe": "Park içinde yer alan bu mekan, doğa ile iç içe huzurlu bir ortam sunuyor. Açık havada oturma imkanı var.",
    "Konya Tarihi Çarşı Cafe": "Tarihi çarşı içinde yer alan bu cafe, geleneksel atmosfer ve modern hizmet anlayışını bir araya getiriyor.",
    "Konya Bilim Merkezi Cafe": "Bilim merkezi içinde bulunan bu mekan, bilim ve teknoloji meraklıları için ideal bir çalışma ortamı sunuyor.",
    "Konya Mevlana Kafe": "Mevlana Müzesi yakınında yer alan bu cafe, turistler ve yerel halkın buluşma noktası. Tarihi atmosfer içinde modern hizmet.",
  }
  return descriptions[venue.name] || `${venue.name}, ${venue.location} bölgesinde yer alan bu mekan, ${venue.category.toLowerCase()} kategorisinde hizmet veriyor. Öğrenciler için uygun bir ortam sunuyor.`
}

// Generate full address based on location
const getFullAddress = (venue: typeof allVenues[0]): string => {
  const addresses: Record<string, string> = {
    "Alaaddin, Karatay": "Alaaddin Tepesi, Karatay, Konya",
    "Meram, Merkez": "Meram Caddesi, Meram, Konya",
    "Selçuklu, Merkez": "Selçuklu Caddesi, Selçuklu, Konya",
    "Kampüs, Selçuklu": "Selçuk Üniversitesi Kampüsü, Selçuklu, Konya",
    "Karatay, Merkez": "Karatay Caddesi, Karatay, Konya",
  }
  return addresses[venue.location] || `${venue.location}, Konya`
}

export function VenueDetailPage() {
  const params = useParams()
  const venueId = params?.id ? Number(params.id) : 1
  const [isFavorite, setIsFavorite] = useState(false)
  const [activeTab, setActiveTab] = useState<"info" | "reviews" | "photos">("info")

  // Find venue by ID
  const baseVenue = allVenues.find(v => v.id === venueId) || allVenues[0]

  // Generate venue data with additional details
  const venue = {
    id: baseVenue.id,
    name: baseVenue.name,
    category: baseVenue.category,
    location: baseVenue.location,
    fullAddress: getFullAddress(baseVenue),
    rating: baseVenue.rating,
    reviews: baseVenue.reviews,
    crowdLevel: baseVenue.crowdLevel,
    distance: baseVenue.distance,
    images: [
      baseVenue.image,
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
    website: `https://${baseVenue.name.toLowerCase().replace(/\s+/g, '')}.com`,
    menuLink: `https://${baseVenue.name.toLowerCase().replace(/\s+/g, '')}.com/menu`,
    priceRange: baseVenue.category === "Ders Çalışma" ? "Uygun" : baseVenue.category === "Sakin Ortam" ? "Orta" : "Orta-Yüksek",
    description: getVenueDescription(baseVenue),
    coordinates: baseVenue.coordinates,
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
    low: { bg: "bg-primary/10 dark:bg-primary/20", text: "text-primary", label: "Sakin" },
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
    const url = `https://www.openstreetmap.org/?mlat=${venue.coordinates.lat}&mlon=${venue.coordinates.lng}&zoom=15`
    window.open(url, "_blank")
  }

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-16 py-4 sm:py-6 md:py-8">
      {/* Back Button */}
      <Link href="/social">
        <Button
          variant="ghost"
          className="mb-4 sm:mb-6 font-[Manrope] text-foreground hover:text-primary"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Geri Dön
        </Button>
      </Link>

      {/* Header Section */}
      <Card className="bg-card rounded-xl shadow-md dark:shadow-lg border border-border mb-4 sm:mb-6 overflow-hidden">
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
          <Card className="bg-card rounded-xl shadow-md dark:shadow-lg border border-border">
            <CardContent className="p-4 sm:p-6">
              <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as typeof activeTab)}>
                <TabsList className="grid w-full grid-cols-3 font-[Manrope] mb-6 bg-muted dark:bg-muted/50 border border-border">
                  <TabsTrigger value="info" className="dark:data-[state=active]:bg-card dark:data-[state=active]:text-foreground dark:text-muted-foreground">Bilgiler</TabsTrigger>
                  <TabsTrigger value="reviews" className="dark:data-[state=active]:bg-card dark:data-[state=active]:text-foreground dark:text-muted-foreground">Değerlendirmeler ({venue.reviews})</TabsTrigger>
                  <TabsTrigger value="photos" className="dark:data-[state=active]:bg-card dark:data-[state=active]:text-foreground dark:text-muted-foreground">Fotoğraflar ({venue.images.length})</TabsTrigger>
                </TabsList>

                <TabsContent value="info" className="space-y-6">
                  {/* Description */}
                  <div>
                    <h3 className="font-[Manrope] text-foreground font-bold text-lg sm:text-xl mb-3">
                      Hakkında
                    </h3>
                    <p className="font-[Manrope] text-foreground/70 dark:text-muted-foreground leading-relaxed">
                      {venue.description}
                    </p>
                  </div>

                  <Separator />

                  {/* Working Hours */}
                  <div>
                    <h3 className="font-[Manrope] text-foreground font-bold text-lg sm:text-xl mb-4 flex items-center gap-2">
                      <Clock className="w-5 h-5 text-primary" />
                      Çalışma Saatleri
                    </h3>
                    <div className="space-y-2">
                      {Object.entries(venue.workingHours).map(([day, hours]) => (
                        <div key={day} className="flex justify-between items-center py-2 border-b border-border last:border-0">
                          <span className="font-[Manrope] font-semibold text-sm text-foreground capitalize">
                            {day === "monday" ? "Pazartesi" :
                             day === "tuesday" ? "Salı" :
                             day === "wednesday" ? "Çarşamba" :
                             day === "thursday" ? "Perşembe" :
                             day === "friday" ? "Cuma" :
                             day === "saturday" ? "Cumartesi" : "Pazar"}
                          </span>
                          <span className="font-[Manrope] text-sm text-foreground/60 dark:text-muted-foreground">
                            {hours}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  {/* Contact Info */}
                  <div>
                    <h3 className="font-[Manrope] text-foreground font-bold text-lg sm:text-xl mb-4">
                      İletişim Bilgileri
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <MapPin className="w-5 h-5 text-primary" />
                        <span className="font-[Manrope] text-sm text-foreground/70 dark:text-muted-foreground">
                          {venue.fullAddress}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Phone className="w-5 h-5 text-primary" />
                        <a href={`tel:${venue.phone}`} className="font-[Manrope] text-sm text-primary hover:underline">
                          {venue.phone}
                        </a>
                      </div>
                      {venue.website && (
                        <div className="flex items-center gap-3">
                          <Globe className="w-5 h-5 text-primary" />
                          <a href={venue.website} target="_blank" rel="noopener noreferrer" className="font-[Manrope] text-sm text-primary hover:underline">
                            Web Sitesi
                          </a>
                        </div>
                      )}
                      {venue.menuLink && (
                        <div className="flex items-center gap-3">
                          <DollarSign className="w-5 h-5 text-primary" />
                          <a href={venue.menuLink} target="_blank" rel="noopener noreferrer" className="font-[Manrope] text-sm text-primary hover:underline">
                            Menüyü Görüntüle
                          </a>
                        </div>
                      )}
                    </div>
                  </div>

                  <Separator />

                  {/* Price Range */}
                  <div>
                    <h3 className="font-[Manrope] text-foreground font-bold text-lg sm:text-xl mb-3 flex items-center gap-2">
                      <DollarSign className="w-5 h-5 text-primary" />
                      Fiyat Aralığı
                    </h3>
                    <Badge className="bg-green-100 dark:bg-green-500/20 text-green-600 dark:text-green-400 border-green-200 dark:border-green-500/30 font-[Manrope] font-bold text-sm px-4 py-2">
                      {venue.priceRange}
                    </Badge>
                  </div>
                </TabsContent>

                <TabsContent value="reviews" className="space-y-4">
                  {reviews.map((review) => (
                    <Card key={review.id} className="bg-accent border border-border">
                      <CardContent className="p-4 sm:p-5">
                        <div className="flex items-start gap-4 mb-3">
                          <Avatar className="w-10 h-10">
                            <AvatarFallback className="bg-primary text-white font-[Manrope] font-bold">
                              {review.user.initials}
                            </AvatarFallback>
                          </Avatar>
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
                                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                                <span className="font-[Manrope] font-bold text-sm text-foreground">
                                  {review.rating}
                                </span>
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
          <Card className="bg-card rounded-xl shadow-md dark:shadow-lg border border-border">
            <CardHeader>
              <CardTitle className="font-[Manrope] text-foreground font-bold text-lg">
                Konum
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-0">
              <div className="relative h-48 bg-accent rounded-xl overflow-hidden">
                <LeafletMap
                  lat={venue.coordinates.lat}
                  lng={venue.coordinates.lng}
                  zoom={15}
                  height="100%"
                  showPopup={true}
                  popupContent={
                    <div className="font-[Manrope]">
                      <h3 className="font-bold text-sm mb-1">{venue.name}</h3>
                      <p className="text-xs text-foreground/60">{venue.fullAddress}</p>
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
                {venue.fullAddress}
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
                  Kategori
                </span>
                <span className="font-[Manrope] font-semibold text-sm text-foreground">
                  {venue.category}
                </span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-border">
                <span className="font-[Manrope] text-sm text-foreground/60 dark:text-muted-foreground">
                  Mesafe
                </span>
                <span className="font-[Manrope] font-semibold text-sm text-foreground">
                  {venue.distance} km
                </span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-border">
                <span className="font-[Manrope] text-sm text-foreground/60 dark:text-muted-foreground">
                  Puan
                </span>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  <span className="font-[Manrope] font-semibold text-sm text-foreground">
                    {venue.rating}
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="font-[Manrope] text-sm text-foreground/60 dark:text-muted-foreground">
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
