"use client"

import { useState } from "react"
import { Search, Briefcase, GraduationCap, Calendar, Check } from "lucide-react"
import { JobBoard } from "./job-board"
import { DevelopmentHub } from "./development-hub"
import { ScholarshipBoard } from "./scholarship-board"
import { Input } from "@/components/ui/input"

export function CareerPage() {
  const [selectedMainCategory, setSelectedMainCategory] = useState("jobs")
  const [searchQuery, setSearchQuery] = useState("")

  const categories = [
    { id: "jobs", name: "İş/Staj", count: 12, icon: Briefcase },
    { id: "scholarships", name: "Burs", count: 3, icon: GraduationCap },
    { id: "events", name: "Etkinlik", count: 5, icon: Calendar },
  ]

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-16 py-6 sm:py-8 md:py-10">
      {/* Header */}
      <div className="mb-6 sm:mb-8 md:mb-10">
        <h1 className="font-[Manrope] text-foreground mb-3 font-extrabold text-2xl sm:text-3xl md:text-4xl lg:text-[42px]">
          Kariyer & Gelişim
        </h1>
        <p className="font-[Manrope] text-foreground/60 dark:text-muted-foreground font-medium text-sm sm:text-base mb-6 sm:mb-8">
          İş fırsatları, staj ilanları, burs fırsatları ve kişisel gelişim etkinlikleri
        </p>

        {/* Search */}
        <div className="relative max-w-xl">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/40 dark:text-muted-foreground" />
          <Input
            type="text"
            placeholder="İş, staj veya burs ara..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-12 pl-12 pr-4 bg-card border border-border rounded-xl font-[Manrope] text-foreground placeholder:text-foreground/40 dark:placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium text-sm"
          />
        </div>
      </div>

      {/* Category Selection Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3 mb-6 sm:mb-8">
        {categories.map((category) => {
          const Icon = category.icon
          const isActive = selectedMainCategory === category.id
          
          return (
            <button
              key={category.id}
              onClick={() => setSelectedMainCategory(category.id)}
              className={`
                relative bg-card rounded-xl p-3 sm:p-4 transition-all duration-200 cursor-pointer group
                border-2 hover:shadow-md
                ${isActive 
                  ? 'border-primary ring-2 ring-primary/20 shadow-md' 
                  : 'border-border hover:border-foreground/20'
                }
              `}
            >
              {/* Selection indicator */}
              <div className={`
                absolute top-2 right-2 w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all
                ${isActive 
                  ? 'border-primary bg-primary/10 dark:bg-primary/20' 
                  : 'border-foreground/20 group-hover:border-foreground/40'
                }
              `}>
                {isActive && <Check className="w-2.5 h-2.5 text-primary" strokeWidth={3} />}
              </div>
              
              <div className="flex items-center gap-2.5 sm:gap-3 pr-6">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center bg-primary/10 dark:bg-primary/20 flex-shrink-0">
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-primary" strokeWidth={2.5} />
                </div>
                
                <div className="text-left flex-1 min-w-0">
                  <p className="font-[Manrope] text-foreground font-bold text-sm sm:text-base truncate">
                    {category.name}
                  </p>
                  <p className="font-[Manrope] font-medium text-xs text-foreground/50 dark:text-muted-foreground">
                    <span className="font-[Manrope] font-black text-lg sm:text-xl text-primary mr-1">
                      {category.count}
                    </span>
                    aktif ilan
                  </p>
                </div>
              </div>
            </button>
          )
        })}
      </div>

      {/* Content based on selected category */}
      {selectedMainCategory === "jobs" && (
        <div className="mb-4 sm:mb-6 md:mb-8">
          <JobBoard searchQuery={searchQuery} />
        </div>
      )}

      {selectedMainCategory === "scholarships" && (
        <div className="mb-4 sm:mb-6 md:mb-8">
          <ScholarshipBoard searchQuery={searchQuery} />
        </div>
      )}

      {selectedMainCategory === "events" && (
        <DevelopmentHub searchQuery={searchQuery} />
      )}
    </div>
  )
}
