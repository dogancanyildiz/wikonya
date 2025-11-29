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
import { getVenues } from "@/lib/mock-data"

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

  // Mock data - mock-data.json dosyasından alınıyor
  const mockVenues = getVenues()
  const allVenues = mockVenues.map((venue) => ({
    ...venue,
    distance: venue.coordinates ? Math.random() * 5 : 0, // Mock distance calculation
    crowdLevel: venue.crowdLevel as "low" | "medium" | "high",
  }))

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

          {/* Sayfa Bilgisi */}
          <p className="text-center mt-4 font-[Manrope] text-muted-foreground text-sm">
            Toplam {sortedVenues.length} mekan içinden {startIndex + 1}-{Math.min(startIndex + ITEMS_PER_PAGE, sortedVenues.length)} arası gösteriliyor
          </p>
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

