"use client"

import { Home, Book } from "lucide-react"
import { Button } from "@/components/ui/button"

interface HousingTabsProps {
  activeTab: "housing" | "life-guide"
  onTabChange: (tab: "housing" | "life-guide") => void
}

export function HousingTabs({ activeTab, onTabChange }: HousingTabsProps) {
  return (
    <div className="flex items-center gap-2 sm:gap-3 mb-6 sm:mb-8">
      <Button
        onClick={() => onTabChange("housing")}
        className={`
          flex-1 sm:flex-initial flex items-center justify-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 rounded-xl transition-all font-[Manrope] font-extrabold text-sm sm:text-base
          ${activeTab === "housing" 
            ? 'bg-primary text-white shadow-[0_4px_16px_rgba(3,98,76,0.3)] hover:bg-primary/90' 
            : 'bg-card text-foreground hover:bg-accent dark:hover:bg-accent border border-border shadow-sm'
          }
        `}
      >
        <Home className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={2.5} />
        Konaklama
      </Button>
      
      <Button
        onClick={() => onTabChange("life-guide")}
        className={`
          flex-1 sm:flex-initial flex items-center justify-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 rounded-xl transition-all font-[Manrope] font-extrabold text-sm sm:text-base
          ${activeTab === "life-guide" 
            ? 'bg-primary text-white shadow-[0_4px_16px_rgba(3,98,76,0.3)] hover:bg-primary/90' 
            : 'bg-card text-foreground hover:bg-accent dark:hover:bg-accent border border-border shadow-sm'
          }
        `}
      >
        <Book className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={2.5} />
        Yaşam Rehberi
      </Button>
    </div>
  )
}

