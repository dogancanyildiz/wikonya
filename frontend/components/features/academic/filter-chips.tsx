"use client"

import { useState } from "react"
import { FileText, ClipboardList, MessageSquare, Calendar, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function FilterChips() {
  const [activeFilter, setActiveFilter] = useState("notes")

  const filters = [
    { id: "notes", label: "Ders Notları", icon: FileText },
    { id: "exams", label: "Sınav Soruları", icon: ClipboardList },
    { id: "reviews", label: "Hoca Yorumları", icon: MessageSquare },
    { id: "calendar", label: "Akademik Takvim", icon: Calendar },
  ]

  const activeFilterData = filters.find((f) => f.id === activeFilter) || filters[0]
  const ActiveIcon = activeFilterData.icon

  return (
    <div className="mb-8 sm:mb-10">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="outline"
            className="px-3 sm:px-4 py-2 bg-card text-foreground rounded-xl font-[Manrope] hover:bg-accent dark:hover:bg-accent transition-colors font-bold text-xs sm:text-sm border border-border flex items-center gap-2"
          >
            <ActiveIcon className="w-4 h-4" />
            {activeFilterData.label}
            <ChevronDown className="w-4 h-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-56">
          {filters.map((filter) => {
            const Icon = filter.icon
            return (
              <DropdownMenuItem
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`
                  font-[Manrope] cursor-pointer flex items-center gap-2
                  ${activeFilter === filter.id ? 'bg-primary text-white' : ''}
                `}
              >
                <Icon className="w-4 h-4" />
                {filter.label}
              </DropdownMenuItem>
            )
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

