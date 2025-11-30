"use client"

import { useState, useMemo, useCallback } from "react"
import * as React from "react"
import { JobCard } from "./job-card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Empty, EmptyHeader, EmptyTitle, EmptyDescription, EmptyMedia, EmptyContent } from "@/components/ui/empty"
import { ChevronDown, Briefcase, X, ChevronLeft, ChevronRight } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const ITEMS_PER_PAGE = 5

interface JobBoardProps {
  searchQuery?: string
}

export function JobBoard({ searchQuery = "" }: JobBoardProps) {
  const [selectedType, setSelectedType] = useState("all")
  const [selectedLocation, setSelectedLocation] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)

  const jobTypes = [
    { id: "all", name: "Tümü" },
    { id: "part-time", name: "Part-Time" },
    { id: "full-time", name: "Full-Time" },
    { id: "remote", name: "Remote" },
    { id: "hybrid", name: "Hybrid" },
  ]

  const locations = [
    { id: "all", name: "Tüm Konumlar" },
    { id: "selcuklu", name: "Selçuklu" },
    { id: "meram", name: "Meram" },
    { id: "karatay", name: "Karatay" },
    { id: "remote", name: "Remote" },
    { id: "hybrid", name: "Hybrid" },
  ]

  const selectedTypeData = jobTypes.find(t => t.id === selectedType)
  const selectedLocationData = locations.find(l => l.id === selectedLocation)

  const jobs = [
    {
      id: 1,
      company: "TechHub Konya",
      companyLogo: "TH",
      role: "Marketing Intern",
      location: "Konya, Selçuklu",
      type: "Part-Time" as const,
      postedDays: 2,
      salary: "5.000₺",
    },
    {
      id: 2,
      company: "Digital Minds",
      companyLogo: "DM",
      role: "Frontend Developer (Stajyer)",
      location: "Remote",
      type: "Remote" as const,
      postedDays: 3,
      salary: "7.500₺",
    },
    {
      id: 3,
      company: "Konya Bilim Merkezi",
      companyLogo: "KB",
      role: "Sosyal Medya Uzmanı",
      location: "Karatay, Konya",
      type: "Full-Time" as const,
      postedDays: 5,
      salary: "12.000₺",
    },
    {
      id: 4,
      company: "StartupLab",
      companyLogo: "SL",
      role: "Graphic Design Intern",
      location: "Meram, Konya",
      type: "Part-Time" as const,
      postedDays: 1,
      salary: "4.500₺",
    },
    {
      id: 5,
      company: "Konya Tech",
      companyLogo: "KT",
      role: "Content Writer",
      location: "Hybrid",
      type: "Hybrid" as const,
      postedDays: 4,
      salary: "6.000₺",
    },
    {
      id: 6,
      company: "EduPlatform",
      companyLogo: "EP",
      role: "Customer Support Specialist",
      location: "Remote",
      type: "Remote" as const,
      postedDays: 7,
      salary: "8.000₺",
    },
    {
      id: 7,
      company: "Konya Yazılım",
      companyLogo: "KY",
      role: "Backend Developer",
      location: "Selçuklu, Konya",
      type: "Full-Time" as const,
      postedDays: 3,
      salary: "15.000₺",
    },
    {
      id: 8,
      company: "Data Analytics Co",
      companyLogo: "DA",
      role: "Data Science Intern",
      location: "Remote",
      type: "Part-Time" as const,
      postedDays: 6,
      salary: "6.500₺",
    },
    {
      id: 9,
      company: "Creative Studio",
      companyLogo: "CS",
      role: "UI/UX Designer",
      location: "Meram, Konya",
      type: "Full-Time" as const,
      postedDays: 2,
      salary: "13.000₺",
    },
    {
      id: 10,
      company: "Marketing Pro",
      companyLogo: "MP",
      role: "Social Media Manager",
      location: "Hybrid",
      type: "Hybrid" as const,
      postedDays: 4,
      salary: "9.000₺",
    },
    {
      id: 11,
      company: "Tech Solutions",
      companyLogo: "TS",
      role: "DevOps Engineer",
      location: "Remote",
      type: "Remote" as const,
      postedDays: 8,
      salary: "18.000₺",
    },
    {
      id: 12,
      company: "Startup Inc",
      companyLogo: "SI",
      role: "Product Manager Intern",
      location: "Karatay, Konya",
      type: "Part-Time" as const,
      postedDays: 1,
      salary: "5.500₺",
    },
  ]

  const filteredJobs = useMemo(() => jobs.filter(job => {
    // Type filter
    const typeMatch = selectedType === "all" || 
      (selectedType === "part-time" && job.type === "Part-Time") ||
      (selectedType === "full-time" && job.type === "Full-Time") ||
      (selectedType === "remote" && job.type === "Remote") ||
      (selectedType === "hybrid" && job.type === "Hybrid")
    
    // Location filter
    const locationMatch = selectedLocation === "all" ||
      (selectedLocation === "selcuklu" && job.location.toLowerCase().includes("selçuklu")) ||
      (selectedLocation === "meram" && job.location.toLowerCase().includes("meram")) ||
      (selectedLocation === "karatay" && job.location.toLowerCase().includes("karatay")) ||
      (selectedLocation === "remote" && job.location.toLowerCase().includes("remote")) ||
      (selectedLocation === "hybrid" && job.location.toLowerCase().includes("hybrid"))
    
    // Search query filter
    const searchMatch = !searchQuery.trim() ||
      job.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.location.toLowerCase().includes(searchQuery.toLowerCase())
    
    return typeMatch && locationMatch && searchMatch
  }), [selectedType, selectedLocation, searchQuery])

  // Pagination logic
  const totalPages = useMemo(() => Math.ceil(filteredJobs.length / ITEMS_PER_PAGE), [filteredJobs.length])
  const paginatedJobs = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
    const endIndex = startIndex + ITEMS_PER_PAGE
    return filteredJobs.slice(startIndex, endIndex)
  }, [filteredJobs, currentPage])

  // Reset to page 1 when filter changes
  const handleFilterChange = useCallback((type: string) => {
    setSelectedType(type)
    setCurrentPage(1)
  }, [])

  const handleLocationChange = useCallback((location: string) => {
    setSelectedLocation(location)
    setCurrentPage(1)
  }, [])

  // Reset page when search query changes
  React.useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery])

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4 sm:mb-6">
        <h2 className="font-[Manrope] text-foreground font-extrabold text-xl sm:text-2xl lg:text-[28px]">
          İş & Staj İlanları
        </h2>
        <div className="flex items-center gap-2 flex-wrap">
          {/* Type Filter Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="outline"
                className="px-3 sm:px-4 py-2 bg-card text-foreground rounded-xl font-[Manrope] hover:bg-accent dark:hover:bg-accent transition-colors shadow-sm font-bold text-xs sm:text-sm border border-border flex items-center gap-2"
              >
                {selectedTypeData?.name || "Tümü"}
                <ChevronDown className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              {jobTypes.map((type) => (
                <DropdownMenuItem
                  key={type.id}
                  onClick={() => handleFilterChange(type.id)}
                  className={selectedType === type.id ? 'bg-primary text-white' : ''}
                >
                  {type.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          {selectedType !== "all" && (
            <>
              <Button
                onClick={() => handleFilterChange("all")}
                variant="outline"
                size="sm"
                className="font-[Manrope] font-bold text-xs text-foreground/60 dark:text-muted-foreground hover:text-primary"
              >
                <X className="w-3 h-3 mr-1" />
                Temizle
              </Button>
              <Badge className="font-[Manrope] font-bold text-xs bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary">
                1 aktif filtre
              </Badge>
            </>
          )}
        </div>
      </div>

      <div className="space-y-3 sm:space-y-4">
        {paginatedJobs.length > 0 ? (
          paginatedJobs.map((job) => (
            <JobCard key={job.id} {...job} />
          ))
        ) : (
          <Empty className="py-12 sm:py-16">
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <Briefcase className="w-12 h-12 text-muted-foreground" />
              </EmptyMedia>
              <EmptyTitle className="font-[Manrope] font-bold text-xl sm:text-2xl">
                İlan Bulunamadı
              </EmptyTitle>
              <EmptyDescription className="font-[Manrope] text-base">
                Seçilen kriterlere uygun iş veya staj ilanı bulunamadı. Filtreleri değiştirmeyi deneyin.
              </EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
              <Button
                onClick={() => handleFilterChange("all")}
                variant="outline"
                className="font-[Manrope] font-bold"
              >
                Tüm İlanları Göster
              </Button>
            </EmptyContent>
          </Empty>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-6 sm:mt-8">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="h-9 px-3 rounded-lg font-[Manrope] font-semibold text-xs border border-border disabled:opacity-50"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          
          <div className="flex items-center gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant="ghost"
                size="sm"
                onClick={() => setCurrentPage(page)}
                className={`h-9 w-9 rounded-lg font-[Manrope] font-bold text-sm
                  ${currentPage === page
                    ? 'bg-primary text-white hover:bg-primary/90'
                    : 'text-foreground/70 hover:text-foreground hover:bg-accent'
                  }
                `}
              >
                {page}
              </Button>
            ))}
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="h-9 px-3 rounded-lg font-[Manrope] font-semibold text-xs border border-border disabled:opacity-50"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      )}
    </div>
  )
}
