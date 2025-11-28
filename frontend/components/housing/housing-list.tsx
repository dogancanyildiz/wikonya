"use client"

import { useState } from "react"
import { HousingCard } from "./housing-card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Empty, EmptyHeader, EmptyTitle, EmptyDescription, EmptyMedia, EmptyContent } from "@/components/ui/empty"
import { ChevronDown, Home, X } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function HousingList() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [sortBy, setSortBy] = useState<"price" | "distance" | "newest">("price")
  const [priceOrder, setPriceOrder] = useState<"low-high" | "high-low">("low-high")

  const categories = [
    { id: "government", label: "Devlet Yurdu" },
    { id: "private", label: "Özel Yurt" },
    { id: "student", label: "Öğrenciye Özel Daire" },
  ]

  const listings = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1662454419736-de132ff75638?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcGFydG1lbnQlMjBiZWRyb29tfGVufDF8fHx8MTc2NDE0MzU1NHww&ixlib=rb-4.1.0&q=80&w=1080",
      price: 8000,
      priceText: "8.000₺",
      title: "Selçuklu Modern Residence - Kampüse Yakın",
      location: "Bosna Hersek, Selçuklu",
      bedrooms: 2,
      bathrooms: 1,
      area: 85,
      tags: ["Özel Yurt", "Eşyalı"],
      views: 456,
      category: "private" as const,
      distance: 1.2,
      postedDate: new Date("2024-11-20"),
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1520277739336-7bf67edfa768?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50JTIwZG9ybWl0b3J5JTIwcm9vbXxlbnwxfHx8fDE3NjQxNzYxNzh8MA&ixlib=rb-4.1.0&q=80&w=1080",
      price: 3500,
      priceText: "3.500₺",
      title: "KYK Erkek Öğrenci Yurdu - Merkezi Konum",
      location: "Meram, Merkez",
      bedrooms: 4,
      bathrooms: 2,
      area: 120,
      tags: ["KYK"],
      views: 892,
      category: "government" as const,
      distance: 0.8,
      postedDate: new Date("2024-11-15"),
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1612419299101-6c294dc2901d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3p5JTIwYXBhcnRtZW50JTIwbGl2aW5nJTIwcm9vbXxlbnwxfHx8fDE3NjQxNTIxODB8MA&ixlib=rb-4.1.0&q=80&w=1080",
      price: 6500,
      priceText: "6.500₺",
      title: "Ferah 1+1 Daire - Öğrenciye Özel",
      location: "Yazır, Selçuklu",
      bedrooms: 1,
      bathrooms: 1,
      area: 65,
      tags: ["Eşyalı", "Balkonlu"],
      views: 234,
      category: "student" as const,
      distance: 2.1,
      postedDate: new Date("2024-11-25"),
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1610123172763-1f587473048f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmdXJuaXNoZWQlMjBzdHVkaW8lMjBhcGFydG1lbnR8ZW58MXx8fHwxNzY0MTc2MTc5fDA&ixlib=rb-4.1.0&q=80&w=1080",
      price: 5200,
      priceText: "5.200₺",
      title: "Stüdyo Daire - Tek Kişilik İdeal",
      location: "Fevziçakmak, Karatay",
      bedrooms: 1,
      bathrooms: 1,
      area: 45,
      tags: ["Eşyalı", "WiFi"],
      views: 567,
      category: "student" as const,
      distance: 3.5,
      postedDate: new Date("2024-11-22"),
    },
    {
      id: 5,
      image: "https://images.unsplash.com/photo-1651752523215-9bf678c29355?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcGFydG1lbnQlMjBidWlsZGluZyUyMGV4dGVyaW9yfGVufDF8fHx8MTc2NDE2NDA5NXww&ixlib=rb-4.1.0&q=80&w=1080",
      price: 7800,
      priceText: "7.800₺",
      title: "Modern Residence - Güvenlikli Site",
      location: "Horozluhan, Selçuklu",
      bedrooms: 2,
      bathrooms: 1,
      area: 95,
      tags: ["Özel Yurt", "Güvenlik"],
      views: 678,
      category: "private" as const,
      distance: 1.8,
      postedDate: new Date("2024-11-18"),
    },
    {
      id: 6,
      image: "https://images.unsplash.com/photo-1662454419736-de132ff75638?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcGFydG1lbnQlMjBiZWRyb29tfGVufDF8fHx8MTc2NDE0MzU1NHww&ixlib=rb-4.1.0&q=80&w=1080",
      price: 9500,
      priceText: "9.500₺",
      title: "Lüks 3+1 Daire - Arkadaş Grubu İçin",
      location: "Aksinne, Meram",
      bedrooms: 3,
      bathrooms: 2,
      area: 140,
      tags: ["Eşyalı", "Otopark"],
      views: 321,
      category: "student" as const,
      distance: 2.8,
      postedDate: new Date("2024-11-28"),
    },
  ]

  // Filter by category
  const filteredListings = selectedCategory
    ? listings.filter(listing => listing.category === selectedCategory)
    : listings

  // Sort listings
  const sortedListings = [...filteredListings].sort((a, b) => {
    if (sortBy === "price") {
      return priceOrder === "low-high" ? a.price - b.price : b.price - a.price
    } else if (sortBy === "distance") {
      return a.distance - b.distance
    } else if (sortBy === "newest") {
      return b.postedDate.getTime() - a.postedDate.getTime()
    }
    return 0
  })

  const selectedCategoryData = categories.find(c => c.id === selectedCategory)

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4 sm:mb-6">
        <div>
          <h2 className="font-[Manrope] text-[#4d4d4d] dark:text-foreground mb-1 font-extrabold text-xl sm:text-2xl lg:text-[28px]">
            Uygun Konaklama Seçenekleri
          </h2>
          <p className="font-[Manrope] text-[#4d4d4d]/60 dark:text-muted-foreground font-medium text-xs sm:text-sm">
            {sortedListings.length} ilan bulundu
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {/* Category Dropdown */}
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="outline"
                className="px-3 sm:px-4 py-2 bg-white dark:bg-card text-[#4d4d4d] dark:text-foreground rounded-xl font-[Manrope] hover:bg-[#f2f4f3] dark:hover:bg-accent transition-colors shadow-sm font-bold text-xs sm:text-sm border border-border flex items-center gap-2"
              >
                {selectedCategoryData ? selectedCategoryData.label : "Kategori Seç"}
                <ChevronDown className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56" onCloseAutoFocus={(e) => e.preventDefault()}>
              <DropdownMenuItem
                onClick={() => setSelectedCategory(null)}
                className={!selectedCategory ? 'bg-[#03624c] text-white' : ''}
              >
                Tümü
              </DropdownMenuItem>
              {categories.map((category) => (
                <DropdownMenuItem
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={selectedCategory === category.id ? 'bg-[#03624c] text-white' : ''}
                >
                  {category.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Sort Dropdown */}
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="outline"
                className="px-3 sm:px-4 py-2 bg-white dark:bg-card text-[#4d4d4d] dark:text-foreground rounded-xl font-[Manrope] hover:bg-[#f2f4f3] dark:hover:bg-accent transition-colors shadow-sm font-bold text-xs sm:text-sm border border-border flex items-center gap-2"
              >
                {sortBy === "price" && `Fiyat: ${priceOrder === "low-high" ? "Düşük - Yüksek" : "Yüksek - Düşük"}`}
                {sortBy === "distance" && "Mesafe"}
                {sortBy === "newest" && "Yeni İlanlar"}
                <ChevronDown className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56" onCloseAutoFocus={(e) => e.preventDefault()}>
              <DropdownMenuItem
                onClick={() => {
                  setSortBy("price")
                  setPriceOrder("low-high")
                }}
                className={sortBy === "price" && priceOrder === "low-high" ? 'bg-[#03624c] text-white' : ''}
              >
                Fiyat: Düşük - Yüksek
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setSortBy("price")
                  setPriceOrder("high-low")
                }}
                className={sortBy === "price" && priceOrder === "high-low" ? 'bg-[#03624c] text-white' : ''}
              >
                Fiyat: Yüksek - Düşük
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setSortBy("distance")}
                className={sortBy === "distance" ? 'bg-[#03624c] text-white' : ''}
              >
                Mesafe
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setSortBy("newest")}
                className={sortBy === "newest" ? 'bg-[#03624c] text-white' : ''}
              >
                Yeni İlanlar
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          {(selectedCategory !== null || sortBy !== "price" || priceOrder !== "low-high") && (
            <>
              <Button
                onClick={() => {
                  setSelectedCategory(null)
                  setSortBy("price")
                  setPriceOrder("low-high")
                }}
                variant="outline"
                size="sm"
                className="font-[Manrope] font-bold text-xs text-[#4d4d4d]/60 dark:text-muted-foreground hover:text-[#03624c]"
              >
                <X className="w-3 h-3 mr-1" />
                Temizle
              </Button>
              <Badge className="font-[Manrope] font-bold text-xs bg-[#03624c]/10 text-[#03624c] dark:bg-[#03624c]/20 dark:text-[#03624c]">
                {[selectedCategory !== null ? 1 : 0, sortBy !== "price" || priceOrder !== "low-high" ? 1 : 0].reduce((a, b) => a + b, 0)} aktif filtre
              </Badge>
            </>
          )}
        </div>
      </div>

      {sortedListings.length > 0 ? (
        <div className="space-y-4 sm:space-y-6">
          {sortedListings.map((listing) => (
            <HousingCard key={listing.id} {...listing} price={listing.priceText} />
          ))}
        </div>
      ) : (
        <Empty className="py-12 sm:py-16">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <Home className="w-12 h-12 text-muted-foreground" />
            </EmptyMedia>
            <EmptyTitle className="font-[Manrope] font-bold text-xl sm:text-2xl">
              İlan Bulunamadı
            </EmptyTitle>
            <EmptyDescription className="font-[Manrope] text-base">
              Seçilen kriterlere uygun konaklama ilanı bulunamadı. Filtreleri değiştirmeyi deneyin.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Button
              onClick={() => {
                setSelectedCategory(null)
                setSortBy("price")
                setPriceOrder("low-high")
              }}
              variant="outline"
              className="font-[Manrope] font-bold"
            >
              Filtreleri Temizle
            </Button>
          </EmptyContent>
        </Empty>
      )}
    </div>
  )
}

