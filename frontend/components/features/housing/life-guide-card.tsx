"use client"

import { LucideIcon, FileText } from "lucide-react"
import Link from "next/link"

interface LifeGuideCardProps {
  id: number
  icon: LucideIcon
  title: string
  description: string
  image: string
  articles: number
}

export function LifeGuideCard({ id, icon: Icon, title, description, articles }: LifeGuideCardProps) {
  return (
    <Link href={`/life-guide/${id}`} className="block">
      <article className="bg-card rounded-xl border border-border overflow-hidden shadow-md dark:shadow-lg hover:shadow-lg dark:hover:shadow-xl transition-all duration-300">
        <div className="flex items-center gap-4 p-4">
          {/* Icon */}
          <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
            <Icon className="w-6 h-6 text-primary" strokeWidth={2} />
          </div>

          {/* İçerik */}
          <div className="flex-1 min-w-0">
            <h3 className="font-[Manrope] text-foreground font-bold text-sm leading-tight mb-1">
              {title}
            </h3>
            <p className="font-[Manrope] text-muted-foreground text-xs line-clamp-1">
              {description}
            </p>
            <div className="flex items-center gap-1 mt-1.5">
              <FileText className="w-3 h-3 text-primary" strokeWidth={2} />
              <span className="font-[Manrope] text-primary font-semibold text-[11px]">
                {articles} rehber
              </span>
            </div>
          </div>
        </div>
      </article>
    </Link>
  )
}

