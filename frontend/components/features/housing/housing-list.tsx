"use client"

import { useState } from "react"
import { HousingCard } from "./housing-card"
import { Button } from "@/components/ui/button"
import { Empty, EmptyHeader, EmptyTitle, EmptyDescription, EmptyMedia, EmptyContent } from "@/components/ui/empty"
import { ChevronDown, Home, X, ChevronLeft, ChevronRight } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { getHousing } from "@/lib/mock-data"

const ITEMS_PER_PAGE = 6

export function HousingList() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [sortBy, setSortBy] = useState<"price-low" | "price-high" | "distance" | "newest">("price-low")
  const [currentPage, setCurrentPage] = useState(1)

  const categories = [
    { id: "government", label: "Devlet Yurdu" },
    { id: "private", label: "Özel Yurt" },
    { id: "student", label: "Öğrenciye Özel Daire" },
  ]

  // Mock data - mock-data.json dosyasından alınıyor
  const mockHousing = getHousing()
  const listings = mockHousing.map(h => ({
    ...h,
    image: h.images?.[0] || "",
    postedDate: new Date(h.postedDate),
    distance: h.coordinates ? Math.random() * 5 : 0, // Mock distance calculation
  }))

  // Filter by category
  const filteredListings = selectedCategory
    ? listings.filter(listing => listing.category === selectedCategory)
    : listings

  // Sort listings
  const sortedListings = [...filteredListings].sort((a, b) => {
    if (sortBy === "price-low") {
      return a.price - b.price
    } else if (sortBy === "price-high") {
      return b.price - a.price
    } else if (sortBy === "distance") {
      return a.distance - b.distance
    } else if (sortBy === "newest") {
      return b.postedDate.getTime() - a.postedDate.getTime()
    }
    return 0
  })

  // Pagination
  const totalPages = Math.ceil(sortedListings.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const paginatedListings = sortedListings.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  const selectedCategoryData = categories.find(c => c.id === selectedCategory)
  const hasActiveFilters = selectedCategory !== null || sortBy !== "price-low"

  const clearFilters = () => {
    setSelectedCategory(null)
    setSortBy("price-low")
    setCurrentPage(1)
  }

  const handleCategoryChange = (catId: string | null) => {
    setSelectedCategory(catId)
    setCurrentPage(1)
  }

  return (
    <div>
      {/* Başlık Bölümü - Sidebar ile hizalı */}
      <div className="min-h-[88px] sm:min-h-[96px] mb-6">
        <h2 className="font-[Manrope] text-foreground font-extrabold text-xl sm:text-2xl lg:text-[28px] mb-4">
          Konaklama Seçenekleri
        </h2>

        {/* Filtre Satırı */}
        <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          {/* Kategori Dropdown */}
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="outline"
                className={`h-9 px-3 rounded-lg font-[Manrope] transition-colors font-semibold text-xs border flex items-center gap-2
                  ${selectedCategory !== null 
                    ? "bg-primary/10 text-primary border-primary/30 hover:bg-primary/20" 
                    : "bg-card text-foreground border-border hover:bg-accent dark:hover:bg-accent"
                  }`}
              >
                <Home className="w-4 h-4" />
                <span>{selectedCategoryData ? selectedCategoryData.label : "Kategori"}</span>
                <ChevronDown className="w-3 h-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-48" onCloseAutoFocus={(e) => e.preventDefault()}>
              <DropdownMenuItem
                onClick={() => handleCategoryChange(null)}
                className={`font-[Manrope] cursor-pointer ${!selectedCategory ? 'bg-primary text-white' : ''}`}
              >
                Tümü
              </DropdownMenuItem>
              {categories.map((category) => (
                <DropdownMenuItem
                  key={category.id}
                  onClick={() => handleCategoryChange(category.id)}
                  className={`font-[Manrope] cursor-pointer ${selectedCategory === category.id ? 'bg-primary text-white' : ''}`}
                >
                  {category.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

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
        <div className="flex items-center gap-1 bg-accent p-1 rounded-xl border border-border">
          <Button 
            onClick={() => setSortBy("price-low")}
            variant="ghost"
            size="sm"
            className={`h-8 px-3 rounded-lg font-[Manrope] transition-colors font-bold text-xs
              ${sortBy === "price-low"
                ? 'bg-primary text-white shadow-sm hover:bg-primary/90' 
                : 'text-foreground/70 hover:text-foreground hover:bg-card/50'
              }
            `}
          >
            Ucuz
          </Button>
          <Button 
            onClick={() => setSortBy("price-high")}
            variant="ghost"
            size="sm"
            className={`h-8 px-3 rounded-lg font-[Manrope] transition-colors font-bold text-xs
              ${sortBy === "price-high"
                ? 'bg-primary text-white shadow-sm hover:bg-primary/90' 
                : 'text-foreground/70 hover:text-foreground hover:bg-card/50'
              }
            `}
          >
            Pahalı
          </Button>
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
            Yakın
          </Button>
          <Button 
            onClick={() => setSortBy("newest")}
            variant="ghost"
            size="sm"
            className={`h-8 px-3 rounded-lg font-[Manrope] transition-colors font-bold text-xs
              ${sortBy === "newest"
                ? 'bg-primary text-white shadow-sm hover:bg-primary/90' 
                : 'text-foreground/70 hover:text-foreground hover:bg-card/50'
              }
            `}
          >
            Yeni
          </Button>
        </div>
        </div>
      </div>

      {paginatedListings.length > 0 ? (
        <>
          <div className="space-y-4 sm:space-y-5">
            {paginatedListings.map((listing) => (
              <HousingCard key={listing.id} {...listing} price={listing.priceText} />
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
            Toplam {sortedListings.length} ilan içinden {startIndex + 1}-{Math.min(startIndex + ITEMS_PER_PAGE, sortedListings.length)} arası gösteriliyor
          </p>
        </>
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
              onClick={clearFilters}
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

