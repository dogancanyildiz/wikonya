"use client"

import { VenueCard } from "./venue-card"
import { Button } from "@/components/ui/button"

export function VenueGrid() {
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
    },
  ]

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4 sm:mb-6">
        <h2 className="font-[Manrope] text-[#4d4d4d] dark:text-foreground font-extrabold text-xl sm:text-2xl lg:text-[28px]">
          Tüm Mekanlar
        </h2>
        <div className="flex items-center gap-2 flex-wrap">
          <Button 
            className="px-3 sm:px-4 py-2 bg-[#03624c] text-white rounded-xl font-[Manrope] transition-colors hover:bg-[#03624c]/90 font-bold text-xs sm:text-sm"
          >
            Mesafeye Göre
          </Button>
          <Button 
            variant="outline"
            className="px-3 sm:px-4 py-2 bg-white dark:bg-card text-[#4d4d4d] dark:text-foreground rounded-xl font-[Manrope] hover:bg-[#f2f4f3] dark:hover:bg-accent transition-colors shadow-sm font-bold text-xs sm:text-sm border border-border"
          >
            Puana Göre
          </Button>
          <Button 
            variant="outline"
            className="px-3 sm:px-4 py-2 bg-white dark:bg-card text-[#4d4d4d] dark:text-foreground rounded-xl font-[Manrope] hover:bg-[#f2f4f3] dark:hover:bg-accent transition-colors shadow-sm font-bold text-xs sm:text-sm border border-border"
          >
            Popülerlik
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {venues.map((venue) => (
          <VenueCard key={venue.id} {...venue} />
        ))}
      </div>
    </div>
  )
}

