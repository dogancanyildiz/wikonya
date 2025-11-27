"use client"

import { MapPin, Clock, Bookmark } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface JobCardProps {
  id: number
  company: string
  companyLogo: string
  role: string
  location: string
  type: "Part-Time" | "Full-Time" | "Remote" | "Hybrid"
  postedDays: number
  salary?: string
  category?: string
  subCategory?: string
}

export function JobCard({
  id,
  company,
  companyLogo,
  role,
  location,
  type,
  postedDays,
  salary,
}: JobCardProps) {
  const [isBookmarked, setIsBookmarked] = useState(false)

  const typeColors = {
    "Part-Time": "bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-400",
    "Full-Time": "bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-400",
    "Remote": "bg-purple-100 dark:bg-purple-500/20 text-purple-700 dark:text-purple-400",
    "Hybrid": "bg-amber-100 dark:bg-amber-500/20 text-amber-700 dark:text-amber-400",
  }

  return (
    <Card className="bg-white dark:bg-card rounded-[20px] shadow-[0_4px_20px_rgba(0,0,0,0.06)] dark:shadow-lg hover:shadow-[0_6px_30px_rgba(0,0,0,0.1)] dark:hover:shadow-xl transition-all group border border-border">
      <CardContent className="p-4 sm:p-6">
        <div className="flex items-start gap-3 sm:gap-4">
          {/* Company Logo */}
          <div className="w-12 h-12 sm:w-14 sm:h-14 bg-[#f2f4f3] dark:bg-accent rounded-xl flex items-center justify-center flex-shrink-0 border-2 border-gray-100 dark:border-border">
            <span className="font-[Manrope] text-[#03624c] font-extrabold text-base sm:text-lg">
              {companyLogo}
            </span>
          </div>

          {/* Job Details */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-2">
              <Link href={`/career/job/${id}`} className="flex-1">
                <h3 className="font-[Manrope] text-[#4d4d4d] dark:text-foreground mb-1 group-hover:text-[#03624c] transition-colors font-bold text-base sm:text-lg leading-snug cursor-pointer">
                  {role}
                </h3>
                <p className="font-[Manrope] text-[#4d4d4d]/70 dark:text-muted-foreground font-semibold text-xs sm:text-sm">
                  {company}
                </p>
              </Link>
              
              <button
                onClick={() => setIsBookmarked(!isBookmarked)}
                className="w-8 h-8 sm:w-9 sm:h-9 bg-[#f2f4f3] dark:bg-accent hover:bg-[#03624c]/10 dark:hover:bg-[#03624c]/20 rounded-lg flex items-center justify-center transition-all"
              >
                <Bookmark
                  className={`w-3 h-3 sm:w-4 sm:h-4 ${isBookmarked ? 'fill-[#03624c] text-[#03624c]' : 'text-[#4d4d4d]/60 dark:text-muted-foreground'}`}
                  strokeWidth={2.5}
                />
              </button>
            </div>

            {/* Meta Info */}
            <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4 flex-wrap">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-[#4d4d4d]/60 dark:text-muted-foreground" strokeWidth={2.5} />
                <span className="font-[Manrope] text-[#4d4d4d]/60 dark:text-muted-foreground font-medium text-xs sm:text-[13px]">
                  {location}
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-3 h-3 sm:w-4 sm:h-4 text-[#4d4d4d]/60 dark:text-muted-foreground" strokeWidth={2.5} />
                <span className="font-[Manrope] text-[#4d4d4d]/60 dark:text-muted-foreground font-medium text-xs sm:text-[13px]">
                  {postedDays} gün önce
                </span>
              </div>
            </div>

            {/* Tags and Action */}
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <div className="flex items-center gap-2 flex-wrap">
                <span className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg font-[Manrope] ${typeColors[type]} font-bold text-[10px] sm:text-[11px]`}>
                  {type}
                </span>
                {salary && (
                  <span className="px-2 sm:px-3 py-1 sm:py-1.5 bg-[#f2f4f3] dark:bg-accent rounded-lg font-[Manrope] text-[#03624c] font-bold text-[10px] sm:text-[11px]">
                    {salary}
                  </span>
                )}
              </div>

              <Button 
                asChild
                variant="outline"
                className="px-4 sm:px-5 py-1.5 sm:py-2 border-2 border-[#03624c] rounded-xl font-[Manrope] text-[#03624c] hover:bg-[#03624c] hover:text-white dark:hover:bg-[#03624c] dark:hover:text-white transition-all font-bold text-xs sm:text-[13px]"
              >
                <Link href={`/career/job/${id}`}>
                  Detaylar
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

