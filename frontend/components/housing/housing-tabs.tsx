"use client"

import { Home, Book } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface HousingTabsProps {
  activeTab: "housing" | "life-guide"
  onTabChange: (tab: "housing" | "life-guide") => void
}

export function HousingTabs({ activeTab, onTabChange }: HousingTabsProps) {
  return (
    <Card className="bg-white dark:bg-card rounded-[24px] p-2 shadow-[0_4px_20px_rgba(0,0,0,0.06)] dark:shadow-lg mb-6 sm:mb-8 inline-flex border border-border">
      <Button
        onClick={() => onTabChange("housing")}
        variant={activeTab === "housing" ? "default" : "ghost"}
        className={`
          flex items-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 rounded-[20px] transition-all font-[Manrope] font-extrabold text-sm sm:text-lg
          ${activeTab === "housing" 
            ? 'bg-[#03624c] text-white shadow-[0_4px_16px_rgba(3,98,76,0.3)] hover:bg-[#03624c]/90' 
            : 'text-[#4d4d4d] dark:text-foreground hover:bg-[#f2f4f3] dark:hover:bg-accent'
          }
        `}
      >
        <Home className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={2.5} />
        Konaklama
      </Button>
      
      <Button
        onClick={() => onTabChange("life-guide")}
        variant={activeTab === "life-guide" ? "default" : "ghost"}
        className={`
          flex items-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 rounded-[20px] transition-all font-[Manrope] font-extrabold text-sm sm:text-lg
          ${activeTab === "life-guide" 
            ? 'bg-[#03624c] text-white shadow-[0_4px_16px_rgba(3,98,76,0.3)] hover:bg-[#03624c]/90' 
            : 'text-[#4d4d4d] dark:text-foreground hover:bg-[#f2f4f3] dark:hover:bg-accent'
          }
        `}
      >
        <Book className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={2.5} />
        Yaşam Rehberi
      </Button>
    </Card>
  )
}

