"use client"

import { MapPin, Bed, Bath, Ruler, Heart } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { Badge } from "@/components/ui/badge"

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
}: HousingCardProps) {
  const [isFavorite, setIsFavorite] = useState(false)

  return (
    <Link href={`/housing/${id}`} className="block">
      <article className="bg-card rounded-2xl border border-border overflow-hidden">
        <div className="flex flex-col sm:flex-row">
          {/* Görsel */}
          <div className="relative w-full sm:w-[240px] aspect-[16/10] sm:aspect-auto sm:h-auto flex-shrink-0">
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover"
              loading="lazy"
              sizes="(max-width: 768px) 100vw, 240px"
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

          {/* İçerik */}
          <div className="flex-1 p-4 sm:p-5 flex flex-col">
            {/* Fiyat & Tags */}
            <div className="flex items-start justify-between gap-2 mb-2">
              <div>
                <span className="font-[Manrope] text-primary font-black text-xl sm:text-2xl">
                  {price}
                </span>
                <span className="font-[Manrope] text-muted-foreground ml-1 font-medium text-xs">
                  /ay
                </span>
              </div>
              <div className="flex gap-1.5 flex-wrap justify-end">
                {tags.slice(0, 2).map((tag, index) => (
                  <Badge 
                    key={index}
                    variant="secondary"
                    className="font-[Manrope] font-semibold text-[10px] px-2 py-0.5"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Başlık */}
            <h3 className="font-[Manrope] text-foreground font-bold text-[15px] leading-snug mb-2">
              {title}
            </h3>

            {/* Konum */}
            <div className="flex items-center gap-1.5 mb-3">
              <MapPin className="w-3.5 h-3.5 text-muted-foreground" strokeWidth={2} />
              <span className="font-[Manrope] text-muted-foreground text-xs">
                {location}
              </span>
            </div>

            {/* Özellikler */}
            <div className="flex items-center gap-4 mt-auto pt-3 border-t border-border">
              <div className="flex items-center gap-1.5">
                <Bed className="w-4 h-4 text-muted-foreground" strokeWidth={2} />
                <span className="font-[Manrope] text-foreground font-medium text-xs">
                  {bedrooms} Oda
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <Bath className="w-4 h-4 text-muted-foreground" strokeWidth={2} />
                <span className="font-[Manrope] text-foreground font-medium text-xs">
                  {bathrooms} Banyo
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <Ruler className="w-4 h-4 text-muted-foreground" strokeWidth={2} />
                <span className="font-[Manrope] text-foreground font-medium text-xs">
                  {area}m²
                </span>
              </div>
            </div>
          </div>
        </div>
      </article>
    </Link>
  )
}

