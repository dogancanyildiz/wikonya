"use client"

import { Home, Book } from "lucide-react"

interface HousingTabsProps {
  activeTab: "housing" | "life-guide"
  onTabChange: (tab: "housing" | "life-guide") => void
}

export function HousingTabs({ activeTab, onTabChange }: HousingTabsProps) {
  const tabs = [
    { id: "housing" as const, label: "Konaklama", icon: Home },
    { id: "life-guide" as const, label: "Yaşam Rehberi", icon: Book },
  ]

  return (
    <div className="flex items-center gap-1.5 p-1.5 bg-accent rounded-2xl w-fit mb-8 border border-border">
      {tabs.map((tab) => {
        const Icon = tab.icon
        const isActive = activeTab === tab.id
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`
              flex items-center gap-2 px-5 py-2.5 rounded-xl font-[Manrope] font-bold text-sm transition-all
              ${isActive 
                ? 'bg-primary text-white shadow-md' 
                : 'text-foreground/70 hover:text-foreground hover:bg-card/50'
              }
            `}
          >
            <Icon className={`w-4 h-4 ${isActive ? '' : 'opacity-70'}`} strokeWidth={2} />
            {tab.label}
          </button>
        )
      })}
    </div>
  )
}

