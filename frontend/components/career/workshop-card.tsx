"use client"

import { Users, Clock, MapPin } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface WorkshopCardProps {
  image: string
  title: string
  organizer: string
  date: string
  dateDay: string
  dateMonth: string
  time: string
  location: string
  participants: number
  maxParticipants: number
  isFree: boolean
}

export function WorkshopCard({
  image,
  title,
  organizer,
  dateDay,
  dateMonth,
  time,
  location,
  participants,
  maxParticipants,
  isFree,
}: WorkshopCardProps) {
  return (
    <Card className="bg-white dark:bg-card rounded-[20px] shadow-[0_4px_20px_rgba(0,0,0,0.06)] dark:shadow-lg hover:shadow-[0_6px_30px_rgba(0,0,0,0.12)] dark:hover:shadow-xl transition-all overflow-hidden group w-[320px] sm:w-[340px] flex-shrink-0 border border-border">
      {/* Image with Date Badge */}
      <div className="relative h-36 sm:h-44 overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        
        {/* Calendar Badge */}
        <div className="absolute top-3 sm:top-4 left-3 sm:left-4">
          <div className="bg-[#03624c] rounded-2xl overflow-hidden shadow-lg">
            <div className="bg-white px-3 sm:px-4 py-1">
              <span className="font-[Manrope] text-[#03624c] block text-center font-extrabold text-[9px] sm:text-[10px] letter-spacing-wide">
                {dateMonth}
              </span>
            </div>
            <div className="px-3 sm:px-4 py-1.5 sm:py-2">
              <span className="font-[Manrope] text-white block text-center font-black text-xl sm:text-2xl lg:text-[24px] leading-none">
                {dateDay}
              </span>
            </div>
          </div>
        </div>

        {/* Free Badge */}
        {isFree && (
          <div className="absolute top-3 sm:top-4 right-3 sm:right-4">
            <div className="px-2 sm:px-3 py-1 sm:py-1.5 bg-green-500 rounded-lg">
              <span className="font-[Manrope] text-white font-bold text-[10px] sm:text-[11px]">
                ÜCRETSİZ
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <CardContent className="p-4 sm:p-5">
        <div className="mb-2 sm:mb-3">
          <span className="font-[Manrope] text-[#03624c] font-bold text-xs sm:text-xs">
            {organizer}
          </span>
        </div>

        <h3 className="font-[Manrope] text-[#4d4d4d] dark:text-foreground mb-2 sm:mb-3 group-hover:text-[#03624c] transition-colors line-clamp-2 min-h-[2.6rem] font-bold text-sm sm:text-base leading-snug">
          {title}
        </h3>

        {/* Details */}
        <div className="space-y-1.5 sm:space-y-2 mb-3 sm:mb-4">
          <div className="flex items-center gap-2">
            <Clock className="w-3 h-3 sm:w-4 sm:h-4 text-[#03624c]" strokeWidth={2.5} />
            <span className="font-[Manrope] text-[#4d4d4d]/70 dark:text-muted-foreground font-medium text-xs sm:text-[13px]">
              {time}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-[#03624c]" strokeWidth={2.5} />
            <span className="font-[Manrope] text-[#4d4d4d]/70 dark:text-muted-foreground font-medium text-xs sm:text-[13px]">
              {location}
            </span>
          </div>
        </div>

        {/* Participants */}
        <div className="mb-3 sm:mb-4">
          <div className="flex items-center justify-between mb-1.5 sm:mb-2">
            <div className="flex items-center gap-1.5">
              <Users className="w-3 h-3 sm:w-4 sm:h-4 text-[#03624c]" strokeWidth={2.5} />
              <span className="font-[Manrope] text-[#4d4d4d] dark:text-foreground font-semibold text-xs sm:text-xs">
                {participants}/{maxParticipants} Katılımcı
              </span>
            </div>
          </div>
          <div className="w-full h-1 sm:h-1.5 bg-gray-100 dark:bg-accent rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-[#03624c] to-[#03624c]/80 rounded-full transition-all"
              style={{ width: `${(participants / maxParticipants) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Register Button */}
        <Button 
          className="w-full py-2 sm:py-2.5 bg-[#03624c] text-white rounded-xl font-[Manrope] hover:bg-[#03624c]/90 transition-all font-bold text-xs sm:text-sm"
        >
          Kayıt Ol
        </Button>
      </CardContent>
    </Card>
  )
}

