"use client"

import { useState } from "react"
import { HousingTabs } from "./housing-tabs"
import { HousingList } from "./housing-list"
import { LifeGuideSidebar } from "./life-guide-sidebar"

export function HousingPage() {
  const [activeTab, setActiveTab] = useState<"housing" | "life-guide">("housing")

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16 py-6 sm:py-8">
      <div className="mb-6 sm:mb-8">
        <h1 className="font-[Manrope] text-[#4d4d4d] dark:text-foreground mb-2 font-extrabold text-3xl sm:text-4xl lg:text-[42px]">
          Barınma & Yaşam
        </h1>
        <p className="font-[Manrope] text-[#4d4d4d]/60 dark:text-muted-foreground font-medium text-sm sm:text-base">
          Konya&apos;da konaklama seçenekleri ve yaşam rehberleri
        </p>
      </div>

      <HousingTabs activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-6 sm:gap-8">
        <div>
          {activeTab === "housing" ? <HousingList /> : <div>Yaşam Rehberi içeriği yakında...</div>}
        </div>
        <div>
          <LifeGuideSidebar />
        </div>
      </div>
    </div>
  )
}

