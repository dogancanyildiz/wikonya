"use client"

import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import { useState } from "react"

export function MobileSearchBar() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  return (
    <div className="px-4 py-3 sm:py-4 bg-[#f2f4f3] dark:bg-accent">
      <form onSubmit={handleSearch} className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-[#4d4d4d]/60 dark:text-muted-foreground" strokeWidth={2.5} />
        <Input
          type="text"
          placeholder="Konuları keşfet..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full h-11 sm:h-12 pl-11 sm:pl-12 pr-4 bg-white dark:bg-card border-2 border-gray-200 dark:border-border rounded-2xl font-[Manrope] text-[#4d4d4d] dark:text-foreground placeholder:text-[#4d4d4d]/40 dark:placeholder:text-muted-foreground focus:outline-none focus:border-[#03624c] transition-colors font-medium text-sm sm:text-sm"
        />
      </form>
    </div>
  )
}

