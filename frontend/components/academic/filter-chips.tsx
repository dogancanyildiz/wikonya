"use client"

import { useState } from "react"
import { FileText, ClipboardList, MessageSquare, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"

export function FilterChips() {
  const [activeFilter, setActiveFilter] = useState("notes")

  const filters = [
    { id: "notes", label: "Ders Notları", icon: FileText },
    { id: "exams", label: "Sınav Soruları", icon: ClipboardList },
    { id: "reviews", label: "Hoca Yorumları", icon: MessageSquare },
    { id: "calendar", label: "Akademik Takvim", icon: Calendar },
  ]

  return (
    <div className="flex items-center gap-3 mb-6 overflow-x-auto pb-2 scrollbar-hide">
      {filters.map((filter) => {
        const Icon = filter.icon
        const isActive = activeFilter === filter.id
        
        return (
          <Button
            key={filter.id}
            onClick={() => setActiveFilter(filter.id)}
            variant={isActive ? "default" : "outline"}
            className={`
              flex items-center gap-2 px-4 sm:px-6 py-3 rounded-2xl transition-all flex-shrink-0 font-[Manrope] font-bold text-sm sm:text-[15px]
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
  )
}

