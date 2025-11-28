"use client"

import { MapPin, Clock, Bookmark, DollarSign } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface ScholarshipCardProps {
  id: number
  organization: string
  organizationLogo: string
  title: string
  amount: string
  location: string
  deadline: string
  deadlineDays: number
  type: "Merit" | "Need-Based" | "Athletic" | "Government"
  category?: string
  subCategory?: string
}

export function ScholarshipCard({
  id,
  organization,
  organizationLogo,
  title,
  amount,
  location,
  deadlineDays,
  type,
}: Omit<ScholarshipCardProps, 'deadline'>) {
  const [isBookmarked, setIsBookmarked] = useState(false)

  const typeColors = {
    "Merit": "bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-400",
    "Need-Based": "bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-400",
    "Athletic": "bg-purple-100 dark:bg-purple-500/20 text-purple-700 dark:text-purple-400",
    "Government": "bg-amber-100 dark:bg-amber-500/20 text-amber-700 dark:text-amber-400",
  }

  return (
    <Card className="bg-card rounded-xl shadow-md dark:shadow-lg hover:shadow-lg dark:hover:shadow-xl transition-all group border border-border">
      <CardContent className="p-4 sm:p-6">
        <div className="flex items-start gap-3 sm:gap-4">
          {/* Organization Logo */}
          <div className="w-12 h-12 sm:w-14 sm:h-14 bg-accent rounded-xl flex items-center justify-center flex-shrink-0 border-2 border-border">
            <span className="font-[Manrope] text-primary font-extrabold text-base sm:text-lg">
              {organizationLogo}
            </span>
          </div>

          {/* Scholarship Details */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-2">
              <Link href={`/career/scholarship/${id}`} className="flex-1">
                <h3 className="font-[Manrope] text-foreground mb-1 group-hover:text-primary transition-colors font-bold text-base sm:text-lg leading-snug cursor-pointer">
                  {title}
                </h3>
                <p className="font-[Manrope] text-foreground/70 dark:text-muted-foreground font-semibold text-xs sm:text-sm">
                  {organization}
                </p>
              </Link>
              
              <button
                onClick={() => setIsBookmarked(!isBookmarked)}
                className="w-8 h-8 sm:w-9 sm:h-9 bg-accent hover:bg-primary/10 dark:hover:bg-primary/20 rounded-lg flex items-center justify-center transition-all"
              >
                <Bookmark
                  className={`w-3 h-3 sm:w-4 sm:h-4 ${isBookmarked ? 'fill-primary text-primary' : 'text-foreground/60 dark:text-muted-foreground'}`}
                  strokeWidth={2.5}
                />
              </button>
            </div>

            {/* Meta Info */}
            <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4 flex-wrap">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-foreground/60 dark:text-muted-foreground" strokeWidth={2.5} />
                <span className="font-[Manrope] text-foreground/60 dark:text-muted-foreground font-medium text-xs sm:text-[13px]">
                  {location}
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-3 h-3 sm:w-4 sm:h-4 text-foreground/60 dark:text-muted-foreground" strokeWidth={2.5} />
                <span className="font-[Manrope] text-foreground/60 dark:text-muted-foreground font-medium text-xs sm:text-[13px]">
                  {deadlineDays} gün kaldı
                </span>
              </div>
            </div>

            {/* Tags and Action */}
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <div className="flex items-center gap-2 flex-wrap">
                <span className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg font-[Manrope] ${typeColors[type]} font-bold text-[10px] sm:text-[11px]`}>
                  {type}
                </span>
                <span className="px-2 sm:px-3 py-1 sm:py-1.5 bg-gradient-to-r from-primary to-primary/80 rounded-lg font-[Manrope] text-white font-bold text-[10px] sm:text-[11px] flex items-center gap-1">
                  <DollarSign className="w-3 h-3" />
                  {amount}
                </span>
              </div>

              <Button 
                asChild
                variant="outline"
                className="px-4 sm:px-5 py-1.5 sm:py-2 border-2 border-primary rounded-xl font-[Manrope] text-primary hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white transition-all font-bold text-xs sm:text-[13px]"
              >
                <Link href={`/career/scholarship/${id}`}>
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

