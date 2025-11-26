"use client"

import { HousingCard } from "./housing-card"
import { Button } from "@/components/ui/button"

export function HousingList() {
  const listings = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1662454419736-de132ff75638?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcGFydG1lbnQlMjBiZWRyb29tfGVufDF8fHx8MTc2NDE0MzU1NHww&ixlib=rb-4.1.0&q=80&w=1080",
      price: "8.000₺",
      title: "Selçuklu Modern Residence - Kampüse Yakın",
      location: "Bosna Hersek, Selçuklu",
      bedrooms: 2,
      bathrooms: 1,
      area: 85,
      tags: ["Özel Yurt", "Eşyalı"],
      views: 456,
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1520277739336-7bf67edfa768?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50JTIwZG9ybWl0b3J5JTIwcm9vbXxlbnwxfHx8fDE3NjQxNzYxNzh8MA&ixlib=rb-4.1.0&q=80&w=1080",
      price: "3.500₺",
      title: "KYK Erkek Öğrenci Yurdu - Merkezi Konum",
      location: "Meram, Merkez",
      bedrooms: 4,
      bathrooms: 2,
      area: 120,
      tags: ["KYK"],
      views: 892,
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1612419299101-6c294dc2901d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3p5JTIwYXBhcnRtZW50JTIwbGl2aW5nJTIwcm9vbXxlbnwxfHx8fDE3NjQxNTIxODB8MA&ixlib=rb-4.1.0&q=80&w=1080",
      price: "6.500₺",
      title: "Ferah 1+1 Daire - Öğrenciye Özel",
      location: "Yazır, Selçuklu",
      bedrooms: 1,
      bathrooms: 1,
      area: 65,
      tags: ["Eşyalı", "Balkonlu"],
      views: 234,
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1610123172763-1f587473048f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmdXJuaXNoZWQlMjBzdHVkaW8lMjBhcGFydG1lbnR8ZW58MXx8fHwxNzY0MTc2MTc5fDA&ixlib=rb-4.1.0&q=80&w=1080",
      price: "5.200₺",
      title: "Stüdyo Daire - Tek Kişilik İdeal",
      location: "Fevziçakmak, Karatay",
      bedrooms: 1,
      bathrooms: 1,
      area: 45,
      tags: ["Eşyalı", "WiFi"],
      views: 567,
    },
    {
      id: 5,
      image: "https://images.unsplash.com/photo-1651752523215-9bf678c29355?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcGFydG1lbnQlMjBidWlsZGluZyUyMGV4dGVyaW9yfGVufDF8fHx8MTc2NDE2NDA5NXww&ixlib=rb-4.1.0&q=80&w=1080",
      price: "7.800₺",
      title: "Modern Residence - Güvenlikli Site",
      location: "Horozluhan, Selçuklu",
      bedrooms: 2,
      bathrooms: 1,
      area: 95,
      tags: ["Özel Yurt", "Güvenlik"],
      views: 678,
    },
    {
      id: 6,
      image: "https://images.unsplash.com/photo-1662454419736-de132ff75638?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcGFydG1lbnQlMjBiZWRyb29tfGVufDF8fHx8MTc2NDE0MzU1NHww&ixlib=rb-4.1.0&q=80&w=1080",
      price: "9.500₺",
      title: "Lüks 3+1 Daire - Arkadaş Grubu İçin",
      location: "Aksinne, Meram",
      bedrooms: 3,
      bathrooms: 2,
      area: 140,
      tags: ["Eşyalı", "Otopark"],
      views: 321,
    },
  ]

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4 sm:mb-6">
        <div>
          <h2 className="font-[Manrope] text-[#4d4d4d] dark:text-foreground mb-1 font-extrabold text-xl sm:text-2xl lg:text-[28px]">
            Uygun Konaklama Seçenekleri
          </h2>
          <p className="font-[Manrope] text-[#4d4d4d]/60 dark:text-muted-foreground font-medium text-xs sm:text-sm">
            {listings.length} ilan bulundu
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <Button 
            className="px-3 sm:px-4 py-2 bg-[#03624c] text-white rounded-xl font-[Manrope] transition-colors hover:bg-[#03624c]/90 font-bold text-xs sm:text-sm"
          >
            Fiyat: Düşük - Yüksek
          </Button>
          <Button 
            variant="outline"
            className="px-3 sm:px-4 py-2 bg-white dark:bg-card text-[#4d4d4d] dark:text-foreground rounded-xl font-[Manrope] hover:bg-[#f2f4f3] dark:hover:bg-accent transition-colors shadow-sm font-bold text-xs sm:text-sm border border-border"
          >
            Mesafe
          </Button>
          <Button 
            variant="outline"
            className="px-3 sm:px-4 py-2 bg-white dark:bg-card text-[#4d4d4d] dark:text-foreground rounded-xl font-[Manrope] hover:bg-[#f2f4f3] dark:hover:bg-accent transition-colors shadow-sm font-bold text-xs sm:text-sm border border-border"
          >
            Yeni İlanlar
          </Button>
        </div>
      </div>

      <div className="space-y-4 sm:space-y-6">
        {listings.map((listing) => (
          <HousingCard key={listing.id} {...listing} />
        ))}
      </div>
    </div>
  )
}

