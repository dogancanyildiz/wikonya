"use client"

import { useState } from "react"
import { VenueCard } from "./venue-card"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Empty, EmptyHeader, EmptyTitle, EmptyDescription, EmptyMedia, EmptyContent } from "@/components/ui/empty"
import { MapPin, List, Navigation, MapPinX, X } from "lucide-react"
import Link from "next/link"

export function VenueGrid() {
  const [sortBy, setSortBy] = useState<"distance" | "rating" | "popularity">("distance")
  const [viewMode, setViewMode] = useState<"list" | "map">("list")
  const [selectedVenue, setSelectedVenue] = useState<number | null>(null)

  const venues = [
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
  ]

  const sortedVenues = [...venues].sort((a, b) => {
    if (sortBy === "distance") {
      return (a.distance || 0) - (b.distance || 0)
    } else if (sortBy === "rating") {
      return b.rating - a.rating
    } else if (sortBy === "popularity") {
      return b.reviews - a.reviews
    }
    return 0
  })

  // Konya merkez koordinatları
  const centerLat = 37.8746
  const centerLng = 32.4932

  // Google Maps URL oluştur
  const getMapUrl = () => {
    return `https://www.google.com/maps/embed/v1/view?key=AIzaSyBFw0Qbyq9zTFTd-tUY6d-s6U4ZbZ2p9M&center=${centerLat},${centerLng}&zoom=13`
  }

  const openDirections = (venue: typeof venues[0]) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${venue.coordinates.lat},${venue.coordinates.lng}`
    window.open(url, "_blank")
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4 sm:mb-6">
        <h2 className="font-[Manrope] text-[#4d4d4d] dark:text-foreground font-extrabold text-xl sm:text-2xl lg:text-[28px]">
          {viewMode === "map" ? "Harita Görünümü" : "Tüm Mekanlar"}
        </h2>
        <div className="flex items-center gap-2 flex-wrap">
          {/* View Toggle */}
          <div className="flex items-center gap-2 bg-white dark:bg-card rounded-xl p-1 border border-border mr-2">
            <Button
              onClick={() => setViewMode("list")}
              variant={viewMode === "list" ? "default" : "ghost"}
              size="sm"
              className={`font-[Manrope] font-bold text-xs sm:text-sm ${
                viewMode === "list"
                  ? 'bg-[#03624c] text-white'
                  : 'text-[#4d4d4d] dark:text-foreground'
              }`}
            >
              <List className="w-4 h-4 mr-1" />
              Liste
            </Button>
            <Button
              onClick={() => setViewMode("map")}
              variant={viewMode === "map" ? "default" : "ghost"}
              size="sm"
              className={`font-[Manrope] font-bold text-xs sm:text-sm ${
                viewMode === "map"
                  ? 'bg-[#03624c] text-white'
                  : 'text-[#4d4d4d] dark:text-foreground'
              }`}
            >
              <MapPin className="w-4 h-4 mr-1" />
              Harita
            </Button>
          </div>

          {viewMode === "list" && (
            <>
              <Button 
                onClick={() => setSortBy("distance")}
                className={`px-3 sm:px-4 py-2 rounded-xl font-[Manrope] transition-colors font-bold text-xs sm:text-sm ${
                  sortBy === "distance"
                    ? 'bg-[#03624c] text-white hover:bg-[#03624c]/90 border-[#03624c]'
                    : 'bg-white dark:bg-card text-[#4d4d4d] dark:text-foreground hover:bg-[#f2f4f3] dark:hover:bg-accent border border-border shadow-sm'
                }`}
              >
                Mesafeye Göre
              </Button>
              <Button 
                onClick={() => setSortBy("rating")}
                className={`px-3 sm:px-4 py-2 rounded-xl font-[Manrope] transition-colors font-bold text-xs sm:text-sm ${
                  sortBy === "rating"
                    ? 'bg-[#03624c] text-white hover:bg-[#03624c]/90 border-[#03624c]'
                    : 'bg-white dark:bg-card text-[#4d4d4d] dark:text-foreground hover:bg-[#f2f4f3] dark:hover:bg-accent border border-border shadow-sm'
                }`}
              >
                Puana Göre
              </Button>
              <Button 
                onClick={() => setSortBy("popularity")}
                className={`px-3 sm:px-4 py-2 rounded-xl font-[Manrope] transition-colors font-bold text-xs sm:text-sm ${
                  sortBy === "popularity"
                    ? 'bg-[#03624c] text-white hover:bg-[#03624c]/90 border-[#03624c]'
                    : 'bg-white dark:bg-card text-[#4d4d4d] dark:text-foreground hover:bg-[#f2f4f3] dark:hover:bg-accent border border-border shadow-sm'
                }`}
              >
                Popülerlik
              </Button>
            </>
          )}
          {viewMode === "list" && sortBy !== "distance" && (
            <>
              <Button
                onClick={() => setSortBy("distance")}
                variant="outline"
                size="sm"
                className="font-[Manrope] font-bold text-xs text-[#4d4d4d]/60 dark:text-muted-foreground hover:text-[#03624c]"
              >
                <X className="w-3 h-3 mr-1" />
                Sıfırla
              </Button>
              <Badge className="font-[Manrope] font-bold text-xs bg-[#03624c]/10 text-[#03624c] dark:bg-[#03624c]/20 dark:text-[#03624c]">
                1 aktif filtre
              </Badge>
            </>
          )}
        </div>
      </div>

      {viewMode === "map" ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Map */}
          <div className="lg:col-span-2">
            <Card className="bg-white dark:bg-card rounded-[20px] shadow-[0_4px_20px_rgba(0,0,0,0.06)] dark:shadow-lg border border-border overflow-hidden">
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
            <h3 className="font-[Manrope] text-[#4d4d4d] dark:text-foreground font-bold text-lg mb-3">
              Mekanlar ({sortedVenues.length})
            </h3>
            <div className="space-y-3 max-h-[700px] overflow-y-auto pr-2">
              {sortedVenues.map((venue) => (
                <Card
                  key={venue.id}
                  className={`bg-white dark:bg-card rounded-xl border transition-all cursor-pointer ${
                    selectedVenue === venue.id
                      ? 'border-[#03624c] shadow-lg'
                      : 'border-border hover:border-[#03624c]/50'
                  }`}
                  onClick={() => setSelectedVenue(venue.id)}
                >
                  <CardContent className="p-3 sm:p-4">
                    <div className="flex items-start justify-between gap-3">
                      <Link href={`/social/venue/${venue.id}`} className="flex-1 min-w-0">
                        <h4 className="font-[Manrope] font-bold text-sm sm:text-base text-[#4d4d4d] dark:text-foreground mb-1 truncate hover:text-[#03624c] transition-colors">
                          {venue.name}
                        </h4>
                        <p className="font-[Manrope] text-xs text-[#4d4d4d]/60 dark:text-muted-foreground mb-2 flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {venue.location}
                        </p>
                        <div className="flex items-center gap-3 text-xs">
                          <span className="font-[Manrope] font-semibold text-[#03624c]">
                            ⭐ {venue.rating}
                          </span>
                          <span className="font-[Manrope] text-[#4d4d4d]/60 dark:text-muted-foreground">
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
                        <Navigation className="w-4 h-4 text-[#03624c]" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      ) : sortedVenues.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {sortedVenues.map((venue) => (
            <VenueCard key={venue.id} {...venue} />
          ))}
        </div>
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

