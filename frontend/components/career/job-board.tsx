"use client"

import { JobCard } from "./job-card"
import { Button } from "@/components/ui/button"

export function JobBoard() {
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

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4 sm:mb-6">
        <h2 className="font-[Manrope] text-[#4d4d4d] dark:text-foreground font-extrabold text-xl sm:text-2xl lg:text-[28px]">
          İş & Staj İlanları
        </h2>
        <div className="flex items-center gap-2 flex-wrap">
          <Button 
            className="px-3 sm:px-4 py-2 bg-[#03624c] text-white rounded-xl font-[Manrope] transition-colors hover:bg-[#03624c]/90 font-bold text-xs sm:text-sm"
          >
            Tümü
          </Button>
          <Button 
            variant="outline"
            className="px-3 sm:px-4 py-2 bg-white dark:bg-card text-[#4d4d4d] dark:text-foreground rounded-xl font-[Manrope] hover:bg-[#f2f4f3] dark:hover:bg-accent transition-colors shadow-sm font-bold text-xs sm:text-sm border border-border"
          >
            Staj
          </Button>
          <Button 
            variant="outline"
            className="px-3 sm:px-4 py-2 bg-white dark:bg-card text-[#4d4d4d] dark:text-foreground rounded-xl font-[Manrope] hover:bg-[#f2f4f3] dark:hover:bg-accent transition-colors shadow-sm font-bold text-xs sm:text-sm border border-border"
          >
            Part-Time
          </Button>
          <Button 
            variant="outline"
            className="px-3 sm:px-4 py-2 bg-white dark:bg-card text-[#4d4d4d] dark:text-foreground rounded-xl font-[Manrope] hover:bg-[#f2f4f3] dark:hover:bg-accent transition-colors shadow-sm font-bold text-xs sm:text-sm border border-border"
          >
            Remote
          </Button>
        </div>
      </div>

      <div className="space-y-3 sm:space-y-4">
        {jobs.map((job) => (
          <JobCard key={job.id} {...job} />
        ))}
      </div>
    </div>
  )
}

