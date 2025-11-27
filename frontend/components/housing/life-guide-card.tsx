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
      <Card className="bg-white dark:bg-card rounded-[20px] shadow-[0_4px_20px_rgba(0,0,0,0.06)] dark:shadow-lg hover:shadow-[0_6px_30px_rgba(0,0,0,0.12)] dark:hover:shadow-xl transition-all overflow-hidden group cursor-pointer border border-border w-full">
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
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#03624c] rounded-xl flex items-center justify-center shadow-lg">
            <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" strokeWidth={2.5} />
          </div>
        </div>
      </div>

      {/* Content */}
      <CardContent className="p-4 sm:p-5">
        <h3 className="font-[Manrope] text-[#4d4d4d] dark:text-foreground mb-2 group-hover:text-[#03624c] transition-colors font-extrabold text-base sm:text-[17px] leading-snug">
          {title}
        </h3>
        
        <p className="font-[Manrope] text-[#4d4d4d]/60 dark:text-muted-foreground mb-3 sm:mb-4 font-medium text-xs sm:text-[13px] leading-relaxed">
          {description}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 sm:pt-4 border-t border-gray-100 dark:border-border">
          <span className="font-[Manrope] text-[#03624c] font-bold text-xs sm:text-[13px]">
            {articles} rehber
          </span>
          <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-[#03624c] group-hover:translate-x-1 transition-transform" strokeWidth={2.5} />
        </div>
      </CardContent>
    </Card>
    </Link>
  )
}

