"use client"

import { useState, useMemo, useCallback } from "react"
import { HousingCard } from "./housing-card"
import { Button } from "@/components/ui/button"
import { Empty, EmptyHeader, EmptyTitle, EmptyDescription, EmptyMedia, EmptyContent } from "@/components/ui/empty"
import { ChevronDown, Home, X, ChevronLeft, ChevronRight, Filter } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const ITEMS_PER_PAGE = 6

export function HousingList() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>("all")
  const [selectedBedrooms, setSelectedBedrooms] = useState<string>("all")
  const [selectedDistrict, setSelectedDistrict] = useState<string>("all")
  const [sortBy, setSortBy] = useState<"price-low" | "price-high" | "distance" | "newest">("price-low")
  const [currentPage, setCurrentPage] = useState(1)

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
      district: "Meram",
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
      district: "Selçuklu",
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
      district: "Karatay",
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
      district: "Selçuklu",
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
      district: "Meram",
    },
    {
      id: 7,
      image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      price: 4200,
      priceText: "4.200₺",
      title: "KYK Kız Öğrenci Yurdu - Yeni Bina",
      location: "Selçuklu, Merkez",
      bedrooms: 4,
      bathrooms: 2,
      area: 110,
      tags: ["KYK", "Yeni"],
      views: 745,
      category: "government" as const,
      distance: 1.0,
      postedDate: new Date("2024-11-10"),
      district: "Selçuklu",
    },
    {
      id: 8,
      image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      price: 5800,
      priceText: "5.800₺",
      title: "Ekonomik 2+1 - Öğrenci Dostu",
      location: "Nalçacı, Selçuklu",
      bedrooms: 2,
      bathrooms: 1,
      area: 75,
      tags: ["Eşyalı", "Metro Yakın"],
      views: 412,
      category: "student" as const,
      distance: 1.5,
      postedDate: new Date("2024-11-26"),
      district: "Selçuklu",
    },
    {
      id: 9,
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      price: 8500,
      priceText: "8.500₺",
      title: "Premium Özel Yurt - Tek Kişilik Oda",
      location: "Kampüs Yanı, Selçuklu",
      bedrooms: 1,
      bathrooms: 1,
      area: 35,
      tags: ["Özel Yurt", "Kahvaltı Dahil"],
      views: 923,
      category: "private" as const,
      distance: 0.3,
      postedDate: new Date("2024-11-12"),
      district: "Selçuklu",
    },
    {
      id: 10,
      image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      price: 4800,
      priceText: "4.800₺",
      title: "Temiz 1+1 Daire - Tramvay Hattı",
      location: "Karatay, Merkez",
      bedrooms: 1,
      bathrooms: 1,
      area: 55,
      tags: ["Eşyasız", "Kombili"],
      views: 289,
      category: "student" as const,
      distance: 2.5,
      postedDate: new Date("2024-11-27"),
      district: "Karatay",
    },
    {
      id: 11,
      image: "https://images.unsplash.com/photo-1536376072261-38c75010e6c9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      price: 3800,
      priceText: "3.800₺",
      title: "KYK Yurdu - 4 Kişilik Oda",
      location: "Meram Yeni Yol",
      bedrooms: 4,
      bathrooms: 2,
      area: 100,
      tags: ["KYK", "Yemekhane"],
      views: 634,
      category: "government" as const,
      distance: 1.8,
      postedDate: new Date("2024-11-08"),
      district: "Meram",
    },
    {
      id: 12,
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      price: 11000,
      priceText: "11.000₺",
      title: "Villa Tipi Müstakil - 4 Öğrenci İçin",
      location: "Beyşehir Yolu, Selçuklu",
      bedrooms: 4,
      bathrooms: 2,
      area: 180,
      tags: ["Bahçeli", "Otopark"],
      views: 187,
      category: "student" as const,
      distance: 4.2,
      postedDate: new Date("2024-11-29"),
      district: "Selçuklu",
    },
    {
      id: 13,
      image: "https://images.unsplash.com/photo-1554995207-c18c203602cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      price: 6200,
      priceText: "6.200₺",
      title: "Yeni Yapı 2+1 - Asansörlü",
      location: "Çatalhüyük, Karatay",
      bedrooms: 2,
      bathrooms: 1,
      area: 80,
      tags: ["Eşyalı", "Asansör"],
      views: 356,
      category: "student" as const,
      distance: 3.0,
      postedDate: new Date("2024-11-24"),
      district: "Karatay",
    },
    {
      id: 14,
      image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      price: 9200,
      priceText: "9.200₺",
      title: "Lüks Özel Yurt - Havuzlu",
      location: "Akademi, Selçuklu",
      bedrooms: 2,
      bathrooms: 1,
      area: 50,
      tags: ["Özel Yurt", "Havuz"],
      views: 812,
      category: "private" as const,
      distance: 0.5,
      postedDate: new Date("2024-11-16"),
      district: "Selçuklu",
    },
    {
      id: 15,
      image: "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      price: 5500,
      priceText: "5.500₺",
      title: "Merkezi Konum 1+1 - Market Yakın",
      location: "Zafer, Meram",
      bedrooms: 1,
      bathrooms: 1,
      area: 60,
      tags: ["Eşyalı", "Doğalgaz"],
      views: 445,
      category: "student" as const,
      distance: 2.0,
      postedDate: new Date("2024-11-23"),
      district: "Meram",
    },
    {
      id: 16,
      image: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      price: 4000,
      priceText: "4.000₺",
      title: "KYK Yurdu - Yeni Dönem Kontenjan",
      location: "Selçuklu, Üniversite",
      bedrooms: 4,
      bathrooms: 2,
      area: 115,
      tags: ["KYK", "Çamaşırhane"],
      views: 978,
      category: "government" as const,
      distance: 0.6,
      postedDate: new Date("2024-11-05"),
      district: "Selçuklu",
    },
    {
      id: 17,
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      price: 7200,
      priceText: "7.200₺",
      title: "Butik Özel Yurt - Çalışma Odası",
      location: "Bosna Hersek, Selçuklu",
      bedrooms: 1,
      bathrooms: 1,
      area: 40,
      tags: ["Özel Yurt", "Çalışma Odası"],
      views: 534,
      category: "private" as const,
      distance: 1.1,
      postedDate: new Date("2024-11-19"),
      district: "Selçuklu",
    },
    {
      id: 18,
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      price: 10500,
      priceText: "10.500₺",
      title: "Dublex Daire - 3 Öğrenci İçin İdeal",
      location: "Sille, Selçuklu",
      bedrooms: 3,
      bathrooms: 2,
      area: 150,
      tags: ["Eşyalı", "Teras"],
      views: 267,
      category: "student" as const,
      distance: 5.0,
      postedDate: new Date("2024-11-30"),
      district: "Selçuklu",
    },
    {
      id: 19,
      image: "https://images.unsplash.com/photo-1571055107559-3e67626fa8be?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      price: 6800,
      priceText: "6.800₺",
      title: "Özel Yurt - Spor Salonu Mevcut",
      location: "Kampüs Karşısı, Selçuklu",
      bedrooms: 2,
      bathrooms: 1,
      area: 45,
      tags: ["Özel Yurt", "Spor Salonu"],
      views: 689,
      category: "private" as const,
      distance: 0.4,
      postedDate: new Date("2024-11-14"),
      district: "Selçuklu",
    },
    {
      id: 20,
      image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      price: 4500,
      priceText: "4.500₺",
      title: "Uygun Fiyatlı Stüdyo - Tek Kişi",
      location: "Küçük Aymanas, Karatay",
      bedrooms: 1,
      bathrooms: 1,
      area: 38,
      tags: ["Eşyasız", "Ekonomik"],
      views: 523,
      category: "student" as const,
      distance: 3.2,
      postedDate: new Date("2024-11-21"),
      district: "Karatay",
    },
    {
      id: 21,
      image: "https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      price: 3200,
      priceText: "3.200₺",
      title: "KYK Yurdu - Burs İmkanı",
      location: "Meram, Üniversite",
      bedrooms: 4,
      bathrooms: 2,
      area: 105,
      tags: ["KYK", "Burs"],
      views: 1024,
      category: "government" as const,
      distance: 1.3,
      postedDate: new Date("2024-11-01"),
      district: "Meram",
    },
    {
      id: 22,
      image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      price: 7500,
      priceText: "7.500₺",
      title: "Rezidans Daire - Güvenlik 24 Saat",
      location: "Kule Site, Selçuklu",
      bedrooms: 2,
      bathrooms: 1,
      area: 90,
      tags: ["Eşyalı", "24 Saat Güvenlik"],
      views: 378,
      category: "student" as const,
      distance: 1.7,
      postedDate: new Date("2024-11-17"),
      district: "Selçuklu",
    },
    {
      id: 23,
      image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      price: 8800,
      priceText: "8.800₺",
      title: "Premium Yurt - Tekli Oda Lüks",
      location: "Akademi Mahallesi, Selçuklu",
      bedrooms: 1,
      bathrooms: 1,
      area: 32,
      tags: ["Özel Yurt", "Klima"],
      views: 756,
      category: "private" as const,
      distance: 0.7,
      postedDate: new Date("2024-11-11"),
      district: "Selçuklu",
    },
    {
      id: 24,
      image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      price: 5000,
      priceText: "5.000₺",
      title: "Geniş 1+1 - Öğrenci Arkadaş Arıyor",
      location: "Yazır, Selçuklu",
      bedrooms: 1,
      bathrooms: 1,
      area: 70,
      tags: ["Eşyalı", "Paylaşımlı"],
      views: 612,
      category: "student" as const,
      distance: 2.3,
      postedDate: new Date("2024-11-13"),
      district: "Selçuklu",
    },
  ]

  // Filter listings - memoized
  const filteredListings = useMemo(() => listings.filter(listing => {
    // Category filter
    if (selectedCategory && listing.category !== selectedCategory) return false
    
    // Price range filter
    if (selectedPriceRange !== "all") {
      const [min, max] = selectedPriceRange.split("-").map(Number)
      if (max) {
        if (listing.price < min || listing.price > max) return false
      } else {
        if (listing.price < min) return false
      }
    }
    
    // Bedrooms filter
    if (selectedBedrooms !== "all") {
      const bedrooms = Number(selectedBedrooms)
      if (listing.bedrooms !== bedrooms) return false
    }
    
    // District filter
    if (selectedDistrict !== "all" && listing.district !== selectedDistrict) return false
    
    return true
  }), [selectedCategory, selectedPriceRange, selectedBedrooms, selectedDistrict])

  // Sort listings - memoized
  const sortedListings = useMemo(() => [...filteredListings].sort((a, b) => {
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
  }), [filteredListings, sortBy])

  // Pagination - memoized
  const totalPages = useMemo(() => Math.ceil(sortedListings.length / ITEMS_PER_PAGE), [sortedListings.length])
  const paginatedListings = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
    return sortedListings.slice(startIndex, startIndex + ITEMS_PER_PAGE)
  }, [sortedListings, currentPage])

  const priceRanges = [
    { id: "all", label: "Tüm Fiyatlar" },
    { id: "0-4000", label: "0₺ - 4.000₺" },
    { id: "4000-6000", label: "4.000₺ - 6.000₺" },
    { id: "6000-8000", label: "6.000₺ - 8.000₺" },
    { id: "8000-10000", label: "8.000₺ - 10.000₺" },
    { id: "10000-999999", label: "10.000₺+" },
  ]

  const bedroomOptions = [
    { id: "all", label: "Tüm Oda Sayıları" },
    { id: "1", label: "1 Oda" },
    { id: "2", label: "2 Oda" },
    { id: "3", label: "3 Oda" },
    { id: "4", label: "4+ Oda" },
  ]

  const districts = [
    { id: "all", label: "Tüm Bölgeler" },
    { id: "Selçuklu", label: "Selçuklu" },
    { id: "Meram", label: "Meram" },
    { id: "Karatay", label: "Karatay" },
  ]

  const selectedCategoryData = categories.find(c => c.id === selectedCategory)
  const selectedPriceRangeData = priceRanges.find(p => p.id === selectedPriceRange)
  const selectedBedroomsData = bedroomOptions.find(b => b.id === selectedBedrooms)
  const selectedDistrictData = districts.find(d => d.id === selectedDistrict)
  
  const hasActiveFilters = selectedCategory !== null || selectedPriceRange !== "all" || selectedBedrooms !== "all" || selectedDistrict !== "all" || sortBy !== "price-low"

  const clearFilters = () => {
    setSelectedCategory(null)
    setSelectedPriceRange("all")
    setSelectedBedrooms("all")
    setSelectedDistrict("all")
    setSortBy("price-low")
    setCurrentPage(1)
  }

  const handleCategoryChange = (catId: string | null) => {
    setSelectedCategory(catId)
    setCurrentPage(1)
  }

  return (
    <div>
      {/* Filtre Satırı */}
      <div className="mb-6">
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

          {/* Price Range Select */}
          <Select value={selectedPriceRange} onValueChange={(value) => { setSelectedPriceRange(value); setCurrentPage(1); }}>
            <SelectTrigger className={`h-9 px-3 rounded-lg font-[Manrope] font-semibold text-xs border w-[140px] ${
              selectedPriceRange !== "all" 
                ? "bg-primary/10 text-primary border-primary/30" 
                : "bg-card text-foreground border-border"
            }`}>
              <SelectValue placeholder="Fiyat Aralığı" />
            </SelectTrigger>
            <SelectContent>
              {priceRanges.map((range) => (
                <SelectItem key={range.id} value={range.id}>
                  {range.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Bedrooms Select */}
          <Select value={selectedBedrooms} onValueChange={(value) => { setSelectedBedrooms(value); setCurrentPage(1); }}>
            <SelectTrigger className={`h-9 px-3 rounded-lg font-[Manrope] font-semibold text-xs border w-[130px] ${
              selectedBedrooms !== "all" 
                ? "bg-primary/10 text-primary border-primary/30" 
                : "bg-card text-foreground border-border"
            }`}>
              <SelectValue placeholder="Oda Sayısı" />
            </SelectTrigger>
            <SelectContent>
              {bedroomOptions.map((option) => (
                <SelectItem key={option.id} value={option.id}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* District Select */}
          <Select value={selectedDistrict} onValueChange={(value) => { setSelectedDistrict(value); setCurrentPage(1); }}>
            <SelectTrigger className={`h-9 px-3 rounded-lg font-[Manrope] font-semibold text-xs border w-[120px] ${
              selectedDistrict !== "all" 
                ? "bg-primary/10 text-primary border-primary/30" 
                : "bg-card text-foreground border-border"
            }`}>
              <SelectValue placeholder="Bölge" />
            </SelectTrigger>
            <SelectContent>
              {districts.map((district) => (
                <SelectItem key={district.id} value={district.id}>
                  {district.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

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

