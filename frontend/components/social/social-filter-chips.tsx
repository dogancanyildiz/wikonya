"use client"

import { useState } from "react"
import { BookOpen, DollarSign, Music, Gamepad2, Coffee, Wifi, Clock, Users } from "lucide-react"
import { Button } from "@/components/ui/button"

export function SocialFilterChips() {
  const [activeFilter, setActiveFilter] = useState("study")

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

  return (
    <div className="mb-6 sm:mb-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-[Manrope] text-[#4d4d4d] dark:text-foreground font-bold text-base sm:text-lg">
          Kategoriler
        </h3>
        <button 
          className="font-[Manrope] text-[#03624c] hover:text-[#03624c]/80 transition-colors font-bold text-xs sm:text-sm"
        >
          Tümünü Temizle
        </button>
      </div>

      <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto pb-2 scrollbar-hide">
        {filters.map((filter) => {
          const Icon = filter.icon
          const isActive = activeFilter === filter.id
          
          return (
            <Button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              variant={isActive ? "default" : "outline"}
              className={`
                flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-3 rounded-2xl transition-all flex-shrink-0 font-[Manrope] font-bold text-xs sm:text-sm
                ${isActive 
                  ? 'bg-[#03624c] text-white shadow-[0_4px_20px_rgba(3,98,76,0.3)] hover:bg-[#03624c]/90' 
                  : 'bg-white dark:bg-card text-[#4d4d4d] dark:text-foreground shadow-[0_2px_12px_rgba(0,0,0,0.06)] dark:shadow-md hover:shadow-[0_4px_16px_rgba(0,0,0,0.1)] dark:hover:shadow-lg border border-border'
                }
              `}
            >
              <Icon className="w-4 h-4 sm:w-5 sm:h-5" strokeWidth={2.5} />
              {filter.label}
            </Button>
          )
        })}
      </div>
    </div>
  )
}

