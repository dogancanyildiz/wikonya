"use client"

import { useState } from "react"
import { AcademicHeader } from "./academic-header"
import { ResourceGrid } from "./resource-grid"

export function AcademicPage() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-16 py-6 sm:py-8 md:py-10">
      <AcademicHeader searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      <ResourceGrid searchQuery={searchQuery} />
    </div>
  )
}

