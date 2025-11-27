"use client"

import { Star, MapPin, Users, Heart } from "lucide-react"
import Image from "next/image"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface VenueCardProps {
  image: string
  name: string
  location: string
  rating: number
  reviews: number
  crowdLevel: "low" | "medium" | "high"
  category: string
}

export function VenueCard({
  image,
  name,
  location,
  rating,
  reviews,
  crowdLevel,
  category,
}: VenueCardProps) {
  const [isFavorite, setIsFavorite] = useState(false)

  const crowdColors = {
    low: { bg: "bg-[#03624c]/10 dark:bg-[#03624c]/20", text: "text-[#03624c]", label: "Sakin" },
    medium: { bg: "bg-yellow-500/10 dark:bg-yellow-500/20", text: "text-yellow-600 dark:text-yellow-500", label: "Orta" },
    high: { bg: "bg-red-500/10 dark:bg-red-500/20", text: "text-red-600 dark:text-red-500", label: "Kalabalık" },
  }

  const crowd = crowdColors[crowdLevel]

  return (
    <Card className="bg-white dark:bg-card rounded-[20px] shadow-[0_4px_20px_rgba(0,0,0,0.06)] dark:shadow-lg hover:shadow-[0_6px_30px_rgba(0,0,0,0.12)] dark:hover:shadow-xl transition-all group overflow-hidden border border-border">
      {/* Image */}
      <div className="relative h-40 sm:h-52 overflow-hidden">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
          loading="lazy"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          quality={85}
        />
        
        {/* Favorite Button */}
        <button
          onClick={() => setIsFavorite(!isFavorite)}
          className="absolute top-3 sm:top-4 right-3 sm:right-4 w-9 h-9 sm:w-10 sm:h-10 bg-white/90 dark:bg-card/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white dark:hover:bg-card transition-all shadow-lg z-10"
        >
          <Heart
            className={`w-4 h-4 sm:w-5 sm:h-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-[#4d4d4d] dark:text-foreground'}`}
            strokeWidth={2.5}
          />
        </button>

        {/* Category Badge */}
        <div className="absolute top-3 sm:top-4 left-3 sm:left-4">
          <div className="px-2 sm:px-3 py-1 sm:py-1.5 bg-[#03624c] rounded-lg backdrop-blur-sm">
            <span className="font-[Manrope] text-white font-bold text-[10px] sm:text-[11px]">
              {category}
            </span>
          </div>
        </div>

        {/* Crowd Meter */}
        <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4">
          <div className={`px-2 sm:px-3 py-1 sm:py-1.5 ${crowd.bg} backdrop-blur-sm rounded-lg flex items-center gap-1 sm:gap-1.5`}>
            <Users className={`w-3 h-3 sm:w-4 sm:h-4 ${crowd.text}`} strokeWidth={2.5} />
            <span className={`font-[Manrope] ${crowd.text} font-bold text-[10px] sm:text-[11px]`}>
              {crowd.label}
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <CardContent className="p-4 sm:p-5">
        <h3 className="font-[Manrope] text-[#4d4d4d] dark:text-foreground mb-2 group-hover:text-[#03624c] transition-colors font-bold text-base sm:text-lg leading-snug">
          {name}
        </h3>

        <div className="flex items-center gap-1.5 mb-4">
          <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-[#4d4d4d]/60 dark:text-muted-foreground" strokeWidth={2.5} />
          <span className="font-[Manrope] text-[#4d4d4d]/60 dark:text-muted-foreground font-medium text-xs sm:text-[13px]">
            {location}
          </span>
        </div>

        {/* Rating & Reviews */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-border">
          <div className="flex items-center gap-2">
            <Star className="w-4 h-4 sm:w-5 sm:h-5 text-[#03624c] fill-[#03624c]" strokeWidth={2.5} />
            <span className="font-[Manrope] text-[#03624c] font-extrabold text-base sm:text-lg">
              {rating}
            </span>
            <span className="font-[Manrope] text-[#4d4d4d]/60 dark:text-muted-foreground font-medium text-xs sm:text-[13px]">
              ({reviews} yorum)
            </span>
          </div>

          <Button 
            className="px-3 sm:px-4 py-1.5 sm:py-2 bg-[#03624c] text-white rounded-lg font-[Manrope] hover:bg-[#03624c]/90 transition-colors font-bold text-xs sm:text-[13px]"
          >
            Detay
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

