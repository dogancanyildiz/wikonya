"use client"

import { Star, MapPin, Heart } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

interface VenueCardProps {
  id: number
  image: string
  name: string
  location: string
  rating: number
  reviews: number
  crowdLevel: "low" | "medium" | "high"
  category: string
}

export function VenueCard({
  id,
  image,
  name,
  location,
  rating,
  reviews,
  category,
}: VenueCardProps) {
  const [isFavorite, setIsFavorite] = useState(false)

  return (
    <Link href={`/social/venue/${id}`} className="block group">
      <article className="bg-card rounded-2xl overflow-hidden border border-border">
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover"
            loading="lazy"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            quality={85}
          />
          
          {/* Favorite Button */}
          <button
            onClick={(e) => {
              e.preventDefault()
              setIsFavorite(!isFavorite)
            }}
            className="absolute top-3 right-3 w-8 h-8 bg-white/95 dark:bg-card/95 rounded-full flex items-center justify-center shadow-sm z-10"
          >
            <Heart
              className={`w-4 h-4 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-foreground/60'}`}
              strokeWidth={2}
            />
          </button>
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Category & Rating */}
          <div className="flex items-center justify-between mb-2">
            <span className="font-[Manrope] text-primary font-semibold text-xs">
              {category}
            </span>
            <div className="flex items-center gap-1">
              <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              <span className="font-[Manrope] text-foreground font-bold text-sm">
                {rating}
              </span>
              <span className="font-[Manrope] text-muted-foreground text-xs">
                ({reviews})
              </span>
            </div>
          </div>

          {/* Name */}
          <h3 className="font-[Manrope] text-foreground font-bold text-[15px] leading-snug mb-2">
            {name}
          </h3>

          {/* Location */}
          <div className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" strokeWidth={2} />
            <span className="font-[Manrope] text-muted-foreground text-xs truncate">
              {location}
            </span>
          </div>
        </div>
      </article>
    </Link>
  )
}

