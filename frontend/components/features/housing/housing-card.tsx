"use client"

import { MapPin, Bed, Bath, Ruler, Heart, Eye } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface HousingCardProps {
  id: number
  image: string
  price: string
  title: string
  location: string
  bedrooms: number
  bathrooms: number
  area: number
  tags: string[]
  views: number
}

export function HousingCard({
  id,
  image,
  price,
  title,
  location,
  bedrooms,
  bathrooms,
  area,
  tags,
  views,
}: HousingCardProps) {
  const [isFavorite, setIsFavorite] = useState(false)

  return (
    <Card className="rounded-xl shadow-md hover:shadow-lg hover:scale-[1.01] transition-all duration-300 overflow-hidden group border-border p-0">
      <div className="flex flex-col sm:flex-row sm:items-stretch">
        {/* Left - Image */}
        <div className="relative w-full sm:w-[280px] h-[200px] sm:h-auto flex-shrink-0 overflow-hidden rounded-t-xl sm:rounded-l-xl sm:rounded-tr-none sm:rounded-bl-xl sm:rounded-br-none">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
            style={{ 
              borderRadius: 'inherit',
              objectPosition: 'center',
              width: '100%',
              height: '100%'
            }}
            loading="lazy"
            sizes="(max-width: 768px) 100vw, 280px"
            quality={85}
          />
          
          {/* Favorite Button */}
          <button
            onClick={() => setIsFavorite(!isFavorite)}
            className="absolute top-3 sm:top-4 right-3 sm:right-4 w-9 h-9 sm:w-10 sm:h-10 bg-card/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white dark:hover:bg-card transition-all shadow-lg z-10"
          >
            <Heart
              className={`w-4 h-4 sm:w-5 sm:h-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-foreground'}`}
              strokeWidth={2.5}
            />
          </button>

          {/* Tags */}
          <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <div 
                key={index}
                className="px-2 sm:px-3 py-1 sm:py-1.5 bg-primary rounded-lg backdrop-blur-sm"
              >
                <span className="font-[Manrope] text-primary-foreground font-bold text-[10px] sm:text-[11px]">
                  {tag}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right - Details */}
        <CardContent className="flex-1 p-4 sm:p-6 flex flex-col min-h-[200px] sm:min-h-[240px]">
          {/* Price */}
          <div className="mb-2 sm:mb-3">
            <span className="font-[Manrope] text-primary font-black text-xl sm:text-2xl lg:text-[24px]">
              {price}
            </span>
            <span className="font-[Manrope] text-muted-foreground ml-1 font-semibold text-xs sm:text-sm">
              /ay
            </span>
          </div>

          {/* Title */}
          <Link href={`/housing/${id}`}>
            <h3 className="font-[Manrope] text-foreground mb-2 group-hover:text-primary transition-colors font-bold text-base sm:text-lg leading-snug cursor-pointer">
              {title}
            </h3>
          </Link>

          {/* Location */}
          <div className="flex items-center gap-2 mb-3 sm:mb-4">
            <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-muted-foreground" strokeWidth={2.5} />
            <span className="font-[Manrope] text-muted-foreground font-medium text-xs sm:text-sm">
              {location}
            </span>
          </div>

          {/* Features */}
          <div className="flex items-center gap-4 sm:gap-6 mb-3 sm:mb-4 flex-wrap">
            <div className="flex items-center gap-2">
              <Bed className="w-4 h-4 sm:w-5 sm:h-5 text-primary" strokeWidth={2.5} />
              <span className="font-[Manrope] text-foreground font-semibold text-xs sm:text-sm">
                {bedrooms} Oda
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Bath className="w-4 h-4 sm:w-5 sm:h-5 text-primary" strokeWidth={2.5} />
              <span className="font-[Manrope] text-foreground font-semibold text-xs sm:text-sm">
                {bathrooms} Banyo
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Ruler className="w-4 h-4 sm:w-5 sm:h-5 text-primary" strokeWidth={2.5} />
              <span className="font-[Manrope] text-foreground font-semibold text-xs sm:text-sm">
                {area}m²
              </span>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="mt-auto flex items-center justify-between pt-3 sm:pt-4 border-t border-border">
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Eye className="w-3 h-3 sm:w-4 sm:h-4" strokeWidth={2.5} />
              <span className="font-[Manrope] font-semibold text-xs sm:text-[13px]">
                {views} görüntülenme
              </span>
            </div>

            <Button 
              asChild
              className="px-4 sm:px-6 py-2 sm:py-2.5 bg-primary text-primary-foreground rounded-lg font-[Manrope] hover:bg-primary/90 transition-colors font-bold text-xs sm:text-sm"
            >
              <Link href={`/housing/${id}`}>
                Detayları Gör
              </Link>
            </Button>
          </div>
        </CardContent>
      </div>
    </Card>
  )
}

