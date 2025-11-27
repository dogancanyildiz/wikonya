"use client"

import { useState } from "react"
import { CareerStats } from "./career-stats"
import { JobBoard } from "./job-board"
import { DevelopmentHub } from "./development-hub"
import { ScholarshipBoard } from "./scholarship-board"
import { Button } from "@/components/ui/button"

export function CareerPage() {
  const [selectedMainCategory, setSelectedMainCategory] = useState("jobs")

  const mainCategories = [
    { id: "jobs", name: "İş/Staj" },
    { id: "events", name: "Etkinlik" },
    { id: "scholarships", name: "Burs" },
  ]

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-16 py-4 sm:py-6 md:py-8">
      <div className="mb-4 sm:mb-6 md:mb-8">
        <h1 className="font-[Manrope] text-[#4d4d4d] dark:text-foreground mb-2 font-extrabold text-2xl sm:text-3xl md:text-4xl lg:text-[42px]">
          Kariyer & Gelişim
        </h1>
        <p className="font-[Manrope] text-[#4d4d4d]/60 dark:text-muted-foreground font-medium text-sm sm:text-base">
          İş fırsatları, staj ilanları ve kişisel gelişim etkinlikleri
        </p>
      </div>

      <CareerStats />

      {/* Main Category Selection */}
      <div className="mb-4 sm:mb-6 md:mb-8">
        <div className="flex items-center gap-2 flex-wrap">
          {mainCategories.map((category) => (
            <Button
              key={category.id}
              onClick={() => setSelectedMainCategory(category.id)}
              className={`
                px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-xl font-[Manrope] transition-colors font-bold text-xs sm:text-sm md:text-base
                ${selectedMainCategory === category.id
                  ? 'bg-[#03624c] text-white hover:bg-[#03624c]/90 shadow-[0_4px_20px_rgba(3,98,76,0.3)]' 
                  : 'bg-white dark:bg-card text-[#4d4d4d] dark:text-foreground hover:bg-[#f2f4f3] dark:hover:bg-accent border border-border shadow-sm'
                }
              `}
            >
              {category.name}
            </Button>
          ))}
        </div>
      </div>

      {/* Content based on selected category */}
      {selectedMainCategory === "jobs" && (
        <div className="mb-4 sm:mb-6 md:mb-8">
          <JobBoard />
        </div>
      )}

      {selectedMainCategory === "events" && (
        <DevelopmentHub />
      )}

      {selectedMainCategory === "scholarships" && (
        <div className="mb-4 sm:mb-6 md:mb-8">
          <ScholarshipBoard />
        </div>
      )}
    </div>
  )
}

