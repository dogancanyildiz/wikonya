"use client"

import { MapPin, Clock, Bookmark, DollarSign, Building2 } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

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

  return (
    <Card className="rounded-xl border border-border bg-card shadow-md dark:shadow-lg hover:shadow-lg dark:hover:shadow-xl transition-all duration-300 group">
      <CardContent className="p-4 sm:p-5">
        <div className="flex items-start gap-3 sm:gap-4">
          {/* Organization Logo */}
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-primary/10 dark:bg-primary/20 flex items-center justify-center flex-shrink-0">
            <span className="font-[Manrope] text-primary font-extrabold text-sm sm:text-base">
              {organizationLogo}
            </span>
          </div>

          {/* Scholarship Details */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-3 mb-3">
              <div className="flex-1 min-w-0">
                <Link href={`/career/scholarship/${id}`}>
                  <h3 className="font-[Manrope] text-foreground mb-1.5 group-hover:text-primary transition-colors font-bold text-base sm:text-lg leading-tight cursor-pointer line-clamp-2">
                    {title}
                  </h3>
                </Link>
                <div className="flex items-center gap-2 mb-2">
                  <Building2 className="w-3.5 h-3.5 text-foreground/50 dark:text-muted-foreground flex-shrink-0" strokeWidth={2} />
                  <span className="font-[Manrope] text-foreground/70 dark:text-muted-foreground font-semibold text-sm truncate">
                    {organization}
                  </span>
                </div>
              </div>
              
              <button
                onClick={(e) => {
                  e.preventDefault()
                  setIsBookmarked(!isBookmarked)
                }}
                className="w-8 h-8 rounded-lg bg-muted hover:bg-primary/10 dark:hover:bg-primary/20 flex items-center justify-center transition-all flex-shrink-0"
              >
                <Bookmark
                  className={`w-4 h-4 ${isBookmarked ? 'fill-primary text-primary' : 'text-foreground/50 dark:text-muted-foreground'}`}
                  strokeWidth={2.5}
                />
              </button>
            </div>

            {/* Meta Info */}
            <div className="flex items-center gap-3 sm:gap-4 mb-3 flex-wrap">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-foreground/50 dark:text-muted-foreground" strokeWidth={2} />
                <span className="font-[Manrope] text-foreground/60 dark:text-muted-foreground font-medium text-xs sm:text-sm">
                  {location}
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-foreground/50 dark:text-muted-foreground" strokeWidth={2} />
                <span className="font-[Manrope] text-foreground/60 dark:text-muted-foreground font-medium text-xs sm:text-sm">
                  {deadlineDays} gün kaldı
                </span>
              </div>
            </div>

            {/* Tags and Action */}
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <div className="flex items-center gap-2 flex-wrap">
                <Badge 
                  variant="outline" 
                  className="px-2.5 py-1 rounded-lg font-[Manrope] border-primary/30 bg-primary/5 dark:bg-primary/10 text-primary font-semibold text-xs"
                >
                  {type}
                </Badge>
                <Badge 
                  className="px-2.5 py-1 rounded-lg font-[Manrope] bg-primary text-primary-foreground font-semibold text-xs flex items-center gap-1"
                >
                  <DollarSign className="w-3 h-3" strokeWidth={2.5} />
                  {amount}
                </Badge>
              </div>

              <Button 
                asChild
                variant="outline"
                size="sm"
                className="px-4 py-1.5 border-primary/50 rounded-lg font-[Manrope] text-primary hover:bg-primary hover:text-primary-foreground transition-all font-semibold text-xs sm:text-sm"
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
