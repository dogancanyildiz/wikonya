"use client"

import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"

interface AcademicHeaderProps {
  searchQuery: string
  onSearchChange: (value: string) => void
}

export function AcademicHeader({ searchQuery, onSearchChange }: AcademicHeaderProps) {
  return (
    <div className="mb-8 sm:mb-10 md:mb-12">
      <h1 className="font-[Manrope] text-foreground mb-3 font-extrabold text-2xl sm:text-3xl md:text-4xl lg:text-[42px]">
        Akademik Kaynaklar
      </h1>
      <p className="font-[Manrope] text-foreground/60 dark:text-muted-foreground font-medium text-sm sm:text-base mb-6 sm:mb-8">
        Konya üniversiteleri için ders notları, sınav soruları ve akademik içerikler
      </p>

      <div className="relative max-w-xl">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/40 dark:text-muted-foreground" />
        <Input
          type="text"
          placeholder="Ders, hoca veya konu ara..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full h-12 pl-12 pr-4 bg-card border border-border rounded-xl font-[Manrope] text-foreground placeholder:text-foreground/40 dark:placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium text-sm"
        />
      </div>
    </div>
  )
}

