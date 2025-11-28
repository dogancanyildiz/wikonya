"use client"

import { LucideIcon, ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"

interface LifeGuideCardProps {
  id: number
  icon: LucideIcon
  title: string
  description: string
  image: string
  articles: number
}

export function LifeGuideCard({ id, icon: Icon, title, description, image, articles }: LifeGuideCardProps) {
  return (
    <Link href={`/life-guide/${id}`} className="block w-full">
      <Card className="bg-card rounded-xl shadow-md dark:shadow-lg hover:shadow-lg dark:hover:shadow-xl transition-all overflow-hidden group cursor-pointer border border-border w-full">
      {/* Image */}
      <div className="relative h-32 sm:h-40 overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        
        {/* Icon Badge */}
        <div className="absolute top-3 sm:top-4 left-3 sm:left-4">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary rounded-xl flex items-center justify-center shadow-lg">
            <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" strokeWidth={2.5} />
          </div>
        </div>
      </div>

      {/* Content */}
      <CardContent className="p-4 sm:p-5">
        <h3 className="font-[Manrope] text-foreground mb-2 group-hover:text-primary transition-colors font-extrabold text-base sm:text-[17px] leading-snug">
          {title}
        </h3>
        
        <p className="font-[Manrope] text-foreground/60 dark:text-muted-foreground mb-3 sm:mb-4 font-medium text-xs sm:text-[13px] leading-relaxed">
          {description}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 sm:pt-4 border-t border-border">
          <span className="font-[Manrope] text-primary font-bold text-xs sm:text-[13px]">
            {articles} rehber
          </span>
          <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-primary group-hover:translate-x-1 transition-transform" strokeWidth={2.5} />
        </div>
      </CardContent>
    </Card>
    </Link>
  )
}

