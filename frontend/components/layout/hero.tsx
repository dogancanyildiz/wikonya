"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Hero() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  // Tag'lere göre kategori mapping
  const getCategoryForTag = (tag: string): string | null => {
    const tagMap: Record<string, string> = {
      "Yurt Önerileri": "yurt",
      "Ders Notları": "ders-notlari",
      "Etkinlikler": "etkinlikler",
      "Sosyal Kulüpler": "sosyal-kulupler",
    }
    return tagMap[tag] || null
  }

  const handleTagClick = (tag: string) => {
    const category = getCategoryForTag(tag)
    if (category) {
      // Kategoriye göre filtreli search sayfasına git
      router.push(`/search?category=${encodeURIComponent(category)}`)
    } else {
      // Eğer kategori yoksa normal arama sayfasına git
      router.push(`/search?q=${encodeURIComponent(tag)}`)
    }
  }

  return (
    <section className="pt-12 pb-10 md:pt-16 md:pb-12">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="font-[Manrope] font-black text-foreground mb-6 text-3xl sm:text-4xl lg:text-5xl xl:text-6xl tracking-tight">
            Konya&apos;nın Bilgi Evreni
          </h1>
          <p className="font-[Manrope] font-medium text-muted-foreground mb-10 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
            Öğrencilerin bilgi paylaşım platformu. Sorularını sor, deneyimlerini paylaş, toplulukla birlikte öğren.
          </p>
          
          {/* Premium Search Bar */}
          <form onSubmit={handleSearch} className="relative max-w-3xl mx-auto">
            <div className="relative flex items-center bg-card rounded-xl shadow-lg border border-border hover:shadow-xl transition-shadow duration-300">
              <Search className="absolute left-4 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Konuları, soruları keşfet..."
                className="w-full h-12 md:h-14 pl-11 pr-24 md:pr-28 bg-transparent rounded-xl font-[Manrope] font-medium text-foreground placeholder:text-muted-foreground focus:outline-none border-0 focus-visible:ring-0 text-sm md:text-base"
                aria-label="Arama kutusu"
              />
              <Button 
                type="submit"
                className="absolute right-2 h-8 md:h-10 px-4 md:px-6 bg-primary hover:bg-primary/90 rounded-lg font-[Manrope] font-semibold text-primary-foreground text-sm"
                aria-label="Ara"
              >
                Ara
              </Button>
            </div>
          </form>

          {/* Quick Tags */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mt-6 md:mt-8">
            <span className="font-[Manrope] font-semibold text-muted-foreground text-sm">Popüler:</span>
            {["Yurt Önerileri", "Ders Notları", "Etkinlikler", "Sosyal Kulüpler"].map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => handleTagClick(tag)}
                className="px-3 sm:px-4 py-1.5 bg-card hover:bg-primary hover:text-primary-foreground text-foreground rounded-full font-[Manrope] font-semibold transition-all duration-200 text-sm border border-border hover:border-primary"
                aria-label={`${tag} konusunda ara`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

