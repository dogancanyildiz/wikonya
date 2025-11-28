"use client"

import { useState } from "react"
import { BookOpen, DollarSign, Music, Gamepad2, Coffee, Wifi, Clock, Users, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function SocialFilterChips() {
  const [activeFilter, setActiveFilter] = useState<string | null>(null)

  const filters = [
    { id: "study", label: "Ders Çalışma", icon: BookOpen },
    { id: "affordable", label: "Uygun Fiyatlı", icon: DollarSign },
    { id: "music", label: "Canlı Müzik", icon: Music },
    { id: "games", label: "Oyun & Eğlence", icon: Gamepad2 },
    { id: "coffee", label: "Kahve & Tatlı", icon: Coffee },
    { id: "wifi", label: "Hızlı WiFi", icon: Wifi },
    { id: "late", label: "Gece Açık", icon: Clock },
    { id: "social", label: "Sosyal Buluşma", icon: Users },
  ]

  const selectedFilter = filters.find(f => f.id === activeFilter)

  const handleClear = () => {
    setActiveFilter(null)
  }

  return (
    <div className="mb-6 sm:mb-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-[Manrope] text-foreground font-bold text-base sm:text-lg">
          Kategoriler
        </h3>
        {activeFilter && (
          <button 
            onClick={handleClear}
            className="font-[Manrope] text-primary hover:text-primary/80 transition-colors font-bold text-xs sm:text-sm"
          >
            Tümünü Temizle
          </button>
        )}
      </div>

      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="outline"
            className="px-4 sm:px-5 py-2 sm:py-3 bg-card text-foreground rounded-2xl font-[Manrope] hover:bg-accent dark:hover:bg-accent transition-colors shadow-sm font-bold text-xs sm:text-sm border border-border flex items-center gap-2"
          >
            {selectedFilter ? (
              <>
                {selectedFilter.icon && (
                  <selectedFilter.icon className="w-4 h-4 sm:w-5 sm:h-5" strokeWidth={2.5} />
                )}
                {selectedFilter.label}
              </>
            ) : (
              <>
                <BookOpen className="w-4 h-4 sm:w-5 sm:h-5" strokeWidth={2.5} />
                Kategori Seçin
              </>
            )}
            <ChevronDown className="w-4 h-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-56" onCloseAutoFocus={(e) => e.preventDefault()}>
          {filters.map((filter) => {
            const Icon = filter.icon
            const isActive = activeFilter === filter.id
            
            return (
              <DropdownMenuItem
                key={filter.id}
                onClick={() => setActiveFilter(isActive ? null : filter.id)}
                className={isActive ? 'bg-primary text-white' : ''}
              >
                <Icon className="w-4 h-4 mr-2" strokeWidth={2.5} />
                {filter.label}
              </DropdownMenuItem>
            )
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

