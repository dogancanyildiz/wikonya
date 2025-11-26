"use client"

import { useState } from "react"
import { JobCard } from "./job-card"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function JobBoard() {
  const [selectedType, setSelectedType] = useState("all")

  const jobTypes = [
    { id: "all", name: "Tümü" },
    { id: "part-time", name: "Part-Time" },
    { id: "full-time", name: "Full-Time" },
    { id: "remote", name: "Remote" },
    { id: "hybrid", name: "Hybrid" },
  ]

  const selectedTypeData = jobTypes.find(t => t.id === selectedType)

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
  ]

  const filteredJobs = jobs.filter(job => {
    const typeMatch = selectedType === "all" || 
      (selectedType === "part-time" && job.type === "Part-Time") ||
      (selectedType === "full-time" && job.type === "Full-Time") ||
      (selectedType === "remote" && job.type === "Remote") ||
      (selectedType === "hybrid" && job.type === "Hybrid")
    
    return typeMatch
  })

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4 sm:mb-6">
        <h2 className="font-[Manrope] text-[#4d4d4d] dark:text-foreground font-extrabold text-xl sm:text-2xl lg:text-[28px]">
          İş & Staj İlanları
        </h2>
        <div className="flex items-center gap-2 flex-wrap">
          {/* Type Filter Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="outline"
                className="px-3 sm:px-4 py-2 bg-white dark:bg-card text-[#4d4d4d] dark:text-foreground rounded-xl font-[Manrope] hover:bg-[#f2f4f3] dark:hover:bg-accent transition-colors shadow-sm font-bold text-xs sm:text-sm border border-border flex items-center gap-2"
              >
                {selectedTypeData?.name || "Tümü"}
                <ChevronDown className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              {jobTypes.map((type) => (
                <DropdownMenuItem
                  key={type.id}
                  onClick={() => setSelectedType(type.id)}
                  className={selectedType === type.id ? 'bg-[#03624c] text-white' : ''}
                >
                  {type.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="space-y-3 sm:space-y-4">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => (
            <JobCard key={job.id} {...job} />
          ))
        ) : (
          <div className="text-center py-12">
            <p className="font-[Manrope] text-[#4d4d4d]/60 dark:text-muted-foreground font-medium">
              Seçilen kriterlere uygun ilan bulunamadı.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

