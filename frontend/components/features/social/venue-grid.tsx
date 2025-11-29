"use client"

import { useState } from "react"
import { VenueCard } from "./venue-card"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Empty, EmptyHeader, EmptyTitle, EmptyDescription, EmptyMedia, EmptyContent } from "@/components/ui/empty"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MapPin, List, Navigation, MapPinX, X, BookOpen, Coffee, Music, Gamepad2, Users, Leaf, Star, ChevronDown, Store, ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"

const ITEMS_PER_PAGE = 12

export function VenueGrid() {
  const [sortBy, setSortBy] = useState<"distance" | "rating" | "popularity">("distance")
  const [viewMode, setViewMode] = useState<"list" | "map">("list")
  const [selectedVenue, setSelectedVenue] = useState<number | null>(null)
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)

  const categories = [
    { id: "all", label: "Tümü", icon: MapPin },
    { id: "study", label: "Ders Çalışma", icon: BookOpen },
    { id: "coffee", label: "Kahve & Tatlı", icon: Coffee },
    { id: "music", label: "Canlı Müzik", icon: Music },
    { id: "games", label: "Oyun & Eğlence", icon: Gamepad2 },
    { id: "social", label: "Sosyal Buluşma", icon: Users },
    { id: "quiet", label: "Sakin Ortam", icon: Leaf },
  ]

  const allVenues = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1646681828239-843f5ed340de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBjb2ZmZWUlMjBzaG9wfGVufDF8fHx8MTc2NDE1ODY4NXww&ixlib=rb-4.1.0&q=80&w=1080",
      name: "Meram Kıraathanesi",
      location: "Meram, Merkez",
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
      name: "Study Hub Cafe",
      location: "Bosna Hersek, Selçuklu",
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
      name: "Şems-i Bistro",
      location: "Alaaddin, Karatay",
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
      name: "Bahçe Cafe & Baharat",
      location: "Yazır, Selçuklu",
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
      name: "Okuma Odası Kitap Cafe",
      location: "Fevziçakmak, Karatay",
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
      name: "Jazz Corner",
      location: "Yeni Meram, Meram",
      rating: 4.5,
      reviews: 76,
      crowdLevel: "high" as const,
      category: "Canlı Müzik",
      distance: 2.8,
      coordinates: { lat: 37.8770, lng: 32.4960 },
    },
    {
      id: 7,
      image: "https://images.unsplash.com/photo-1762744594797-bcfd17a8c032?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1lJTIwY2FmZSUyMGJvYXJkJTIwZ2FtZXN8ZW58MXx8fHwxNzY0MTc1ODQwfDA&ixlib=rb-4.1.0&q=80&w=1080",
      name: "Game Zone Cafe",
      location: "Sille, Selçuklu",
      rating: 4.8,
      reviews: 134,
      crowdLevel: "medium" as const,
      category: "Oyun & Eğlence",
      distance: 4.2,
      coordinates: { lat: 37.8780, lng: 32.4970 },
    },
    {
      id: 8,
      image: "https://images.unsplash.com/photo-1739723745132-97df9db49db2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3p5JTIwY2FmZSUyMGludGVyaW9yfGVufDF8fHx8MTc2NDE1ODI0MHww&ixlib=rb-4.1.0&q=80&w=1080",
      name: "Sessiz Liman",
      location: "Horozluhan, Selçuklu",
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
      name: "Yemyeşil Bahçe",
      location: "Aksinne, Meram",
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
      name: "Kahve Durağı",
      location: "Nalçacı, Selçuklu",
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
      name: "Akademi Kütüphane Cafe",
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
      name: "Rock & Blues Bar",
      location: "Şükran, Meram",
      rating: 4.3,
      reviews: 145,
      crowdLevel: "high" as const,
      category: "Canlı Müzik",
      distance: 3.8,
      coordinates: { lat: 37.8765, lng: 32.4955 },
    },
    {
      id: 13,
      image: "https://images.unsplash.com/photo-1511882150382-421056c89033?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      name: "Retro Arcade",
      location: "Kule, Selçuklu",
      rating: 4.7,
      reviews: 203,
      crowdLevel: "high" as const,
      category: "Oyun & Eğlence",
      distance: 2.3,
      coordinates: { lat: 37.8772, lng: 32.4962 },
    },
    {
      id: 14,
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      name: "Dostlar Meyhanesi",
      location: "Aziziye, Meram",
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
      name: "Huzur Bahçesi",
      location: "Havzan, Meram",
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
      name: "Vintage Coffee House",
      location: "Akyokuş, Selçuklu",
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
      name: "Fokus Çalışma Alanı",
      location: "Musalla Bağları, Selçuklu",
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
      name: "Akustik Sahne",
      location: "Yenişehir, Selçuklu",
      rating: 4.4,
      reviews: 123,
      crowdLevel: "high" as const,
      category: "Canlı Müzik",
      distance: 2.9,
      coordinates: { lat: 37.8768, lng: 32.4958 },
    },
    {
      id: 19,
      image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      name: "E-Sport Arena",
      location: "Tepekent, Selçuklu",
      rating: 4.6,
      reviews: 189,
      crowdLevel: "high" as const,
      category: "Oyun & Eğlence",
      distance: 3.4,
      coordinates: { lat: 37.8778, lng: 32.4968 },
    },
    {
      id: 20,
      image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      name: "Keyif Mekanı",
      location: "Saray, Karatay",
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
      name: "Zen Garden Cafe",
      location: "Dikilitaş, Meram",
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
      name: "Artisan Roastery",
      location: "Ferhuniye, Selçuklu",
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
      name: "Bilgi Evi",
      location: "Büsan, Selçuklu",
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
      name: "Indie Stage",
      location: "Küçük Aymanas, Meram",
      rating: 4.2,
      reviews: 98,
      crowdLevel: "high" as const,
      category: "Canlı Müzik",
      distance: 4.5,
      coordinates: { lat: 37.8762, lng: 32.4952 },
    },
  ]

  const categoryMap: Record<string, string> = {
    "study": "Ders Çalışma",
    "coffee": "Kahve & Tatlı",
    "music": "Canlı Müzik",
    "games": "Oyun & Eğlence",
    "social": "Sosyal Buluşma",
    "quiet": "Sakin Ortam",
  }

  const filteredVenues = selectedCategory === "all" 
    ? allVenues 
    : allVenues.filter(v => v.category === categoryMap[selectedCategory])

  const sortedVenues = [...filteredVenues].sort((a, b) => {
    if (sortBy === "distance") {
      return (a.distance || 0) - (b.distance || 0)
    } else if (sortBy === "rating") {
      return b.rating - a.rating
    } else if (sortBy === "popularity") {
      return b.reviews - a.reviews
    }
    return 0
  })

  // Pagination
  const totalPages = Math.ceil(sortedVenues.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const paginatedVenues = sortedVenues.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  const hasActiveFilters = selectedCategory !== "all" || sortBy !== "distance"
  
  const clearFilters = () => {
    setSelectedCategory("all")
    setSortBy("distance")
    setCurrentPage(1)
  }

  // Kategori veya sıralama değiştiğinde sayfa 1'e dön
  const handleCategoryChange = (catId: string) => {
    setSelectedCategory(catId)
    setCurrentPage(1)
  }

  // Konya merkez koordinatları
  const centerLat = 37.8746
  const centerLng = 32.4932

  // Google Maps URL oluştur
  const getMapUrl = () => {
    return `https://www.google.com/maps/embed/v1/view?key=AIzaSyBFw0Qbyq9zTFTd-tUY6d-s6U4ZbZ2p9M&center=${centerLat},${centerLng}&zoom=13`
  }

  const openDirections = (venue: typeof allVenues[0]) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${venue.coordinates.lat},${venue.coordinates.lng}`
    window.open(url, "_blank")
  }

  const selectedCat = categories.find(c => c.id === selectedCategory) || categories[0]

  return (
    <div>
      {/* Başlık Bölümü - Sidebar ile hizalı */}
      <div className="min-h-[88px] sm:min-h-[96px] mb-6">
        <h2 className="font-[Manrope] text-foreground font-extrabold text-xl sm:text-2xl lg:text-[28px] mb-4">
          Tüm Mekanlar
        </h2>

        {/* Filtre Satırı */}
        <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          {/* Kategori Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="outline"
                className={`h-9 px-3 rounded-lg font-[Manrope] transition-colors font-semibold text-xs border flex items-center gap-2
                  ${selectedCategory !== "all" 
                    ? "bg-primary/10 text-primary border-primary/30 hover:bg-primary/20" 
                    : "bg-card text-foreground border-border hover:bg-accent dark:hover:bg-accent"
                  }`}
              >
                <Store className="w-4 h-4" />
                <span>{selectedCategory === "all" ? "Kategori" : selectedCat.label}</span>
                <ChevronDown className="w-3 h-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-48">
              {categories.map((cat) => {
                const Icon = cat.icon
                return (
                  <DropdownMenuItem
                    key={cat.id}
                    onClick={() => handleCategoryChange(cat.id)}
                    className={`
                      font-[Manrope] cursor-pointer
                      ${selectedCategory === cat.id ? 'bg-primary text-white' : ''}
                    `}
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {cat.label}
                  </DropdownMenuItem>
                )
              })}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* View Toggle */}
          <div className="flex items-center gap-1 bg-accent p-1 rounded-xl border border-border">
            <Button
              onClick={() => setViewMode("list")}
              variant="ghost"
              size="sm"
              className={`h-8 px-3 rounded-lg font-[Manrope] transition-colors font-bold text-xs
                ${viewMode === "list"
                  ? 'bg-primary text-white shadow-sm hover:bg-primary/90'
                  : 'text-foreground/70 hover:text-foreground hover:bg-card/50'
                }
              `}
            >
              <List className="w-4 h-4 mr-1.5" />
              Liste
            </Button>
            <Button
              onClick={() => setViewMode("map")}
              variant="ghost"
              size="sm"
              className={`h-8 px-3 rounded-lg font-[Manrope] transition-colors font-bold text-xs
                ${viewMode === "map"
                  ? 'bg-primary text-white shadow-sm hover:bg-primary/90'
                  : 'text-foreground/70 hover:text-foreground hover:bg-card/50'
                }
              `}
            >
              <MapPin className="w-4 h-4 mr-1.5" />
              Harita
            </Button>
          </div>

          {hasActiveFilters && (
            <Button
              onClick={clearFilters}
              variant="ghost"
              size="sm"
              className="h-8 px-2 font-[Manrope] font-medium text-xs text-foreground/50 hover:text-primary hover:bg-transparent"
            >
              <X className="w-3 h-3 mr-1" />
              Temizle
            </Button>
          )}
        </div>

        {/* Sıralama Butonları */}
        {viewMode === "list" && (
          <div className="flex items-center gap-1 bg-accent p-1 rounded-xl border border-border">
            <Button 
              onClick={() => setSortBy("distance")}
              variant="ghost"
              size="sm"
              className={`h-8 px-3 rounded-lg font-[Manrope] transition-colors font-bold text-xs
                ${sortBy === "distance"
                  ? 'bg-primary text-white shadow-sm hover:bg-primary/90' 
                  : 'text-foreground/70 hover:text-foreground hover:bg-card/50'
                }
              `}
            >
              Mesafe
            </Button>
            <Button 
              onClick={() => setSortBy("rating")}
              variant="ghost"
              size="sm"
              className={`h-8 px-3 rounded-lg font-[Manrope] transition-colors font-bold text-xs
                ${sortBy === "rating"
                  ? 'bg-primary text-white shadow-sm hover:bg-primary/90' 
                  : 'text-foreground/70 hover:text-foreground hover:bg-card/50'
                }
              `}
            >
              Puan
            </Button>
            <Button 
              onClick={() => setSortBy("popularity")}
              variant="ghost"
              size="sm"
              className={`h-8 px-3 rounded-lg font-[Manrope] transition-colors font-bold text-xs
                ${sortBy === "popularity"
                  ? 'bg-primary text-white shadow-sm hover:bg-primary/90' 
                  : 'text-foreground/70 hover:text-foreground hover:bg-card/50'
                }
              `}
            >
              Popüler
            </Button>
          </div>
        )}
        </div>
      </div>

      {viewMode === "map" ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Map */}
          <div className="lg:col-span-2">
            <Card className="bg-card rounded-xl shadow-md dark:shadow-lg border border-border overflow-hidden">
              <div className="relative h-[500px] sm:h-[600px] lg:h-[700px]">
                <iframe
                  src={getMapUrl()}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0"
                />
              </div>
            </Card>
          </div>

          {/* Venue List Sidebar */}
          <div className="space-y-3 sm:space-y-4">
            <h3 className="font-[Manrope] text-foreground font-bold text-lg mb-3">
              Mekanlar ({sortedVenues.length})
            </h3>
            <div className="space-y-3 max-h-[700px] overflow-y-auto pr-2">
              {sortedVenues.map((venue) => (
                <Card
                  key={venue.id}
                  className={`bg-card rounded-xl border transition-all cursor-pointer ${
                    selectedVenue === venue.id
                      ? 'border-primary shadow-lg'
                      : 'border-border hover:border-primary/50'
                  }`}
                  onClick={() => setSelectedVenue(venue.id)}
                >
                  <CardContent className="p-3 sm:p-4">
                    <div className="flex items-start justify-between gap-3">
                      <Link href={`/social/venue/${venue.id}`} className="flex-1 min-w-0">
                        <h4 className="font-[Manrope] font-bold text-sm sm:text-base text-foreground mb-1 truncate hover:text-primary transition-colors">
                          {venue.name}
                        </h4>
                        <p className="font-[Manrope] text-xs text-foreground/60 dark:text-muted-foreground mb-2 flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {venue.location}
                        </p>
                        <div className="flex items-center gap-3 text-xs">
                          <span className="font-[Manrope] font-semibold text-primary flex items-center gap-1">
                            <Star className="w-3 h-3 fill-primary" />
                            {venue.rating}
                          </span>
                          <span className="font-[Manrope] text-foreground/60 dark:text-muted-foreground">
                            {venue.distance} km
                          </span>
                        </div>
                      </Link>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={(e) => {
                          e.stopPropagation()
                          openDirections(venue)
                        }}
                        className="flex-shrink-0"
                      >
                        <Navigation className="w-4 h-4 text-primary" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      ) : paginatedVenues.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {paginatedVenues.map((venue) => (
              <VenueCard key={venue.id} {...venue} />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-10">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="h-9 px-3 rounded-lg font-[Manrope] font-semibold text-xs border border-border disabled:opacity-50"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              
              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <Button
                    key={page}
                    variant="ghost"
                    size="sm"
                    onClick={() => setCurrentPage(page)}
                    className={`h-9 w-9 rounded-lg font-[Manrope] font-bold text-sm
                      ${currentPage === page
                        ? 'bg-primary text-white hover:bg-primary/90'
                        : 'text-foreground/70 hover:text-foreground hover:bg-accent'
                      }
                    `}
                  >
                    {page}
                  </Button>
                ))}
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="h-9 px-3 rounded-lg font-[Manrope] font-semibold text-xs border border-border disabled:opacity-50"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          )}
        </>
      ) : (
        <Empty className="py-12 sm:py-16">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <MapPinX className="w-12 h-12 text-muted-foreground" />
            </EmptyMedia>
            <EmptyTitle className="font-[Manrope] font-bold text-xl sm:text-2xl">
              Mekan Bulunamadı
            </EmptyTitle>
            <EmptyDescription className="font-[Manrope] text-base">
              Seçilen kriterlere uygun mekan bulunamadı. Filtreleri değiştirmeyi deneyin.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Button
              onClick={() => setSortBy("distance")}
              variant="outline"
              className="font-[Manrope] font-bold"
            >
              Filtreleri Sıfırla
            </Button>
          </EmptyContent>
        </Empty>
      )}
    </div>
  )
}

