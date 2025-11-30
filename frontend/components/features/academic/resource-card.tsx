"use client"

import { FileText, Download, Eye, MessageSquare, Calendar, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface ResourceCardProps {
  title: string
  fileType: string
  fileSize: string
  uploadedBy: string
  uploaderInitials: string
  uploadDate: string
  downloads: number
  views: number
  type?: "notes" | "exams" | "reviews" | "calendar"
  rating?: number
  helpful?: number
  eventDate?: string
}

export function ResourceCard({
  title,
  fileType,
  fileSize,
  uploadedBy,
  uploadDate,
  downloads,
  views,
  type = "notes",
  rating,
  helpful,
  eventDate,
}: ResourceCardProps) {
  const isReview = type === "reviews"
  const isCalendar = type === "calendar"
  
  return (
    <div className="group p-4 bg-card rounded-xl border border-border shadow-md dark:shadow-lg hover:border-primary/30 hover:shadow-lg dark:hover:shadow-xl transition-all duration-300">
      {/* Üst Satır: Tip ve Aksiyon */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className={`w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center`}>
            {isReview ? (
              <MessageSquare className="w-4 h-4 text-primary" />
            ) : isCalendar ? (
              <Calendar className="w-4 h-4 text-primary" />
            ) : (
              <FileText className="w-4 h-4 text-primary" />
            )}
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="font-[Manrope] text-foreground font-semibold text-[11px]">
              {fileType}
            </Badge>
            {!isReview && !isCalendar && fileSize && (
              <span className="font-[Manrope] text-muted-foreground font-medium text-[11px]">
                {fileSize}
              </span>
            )}
          </div>
        </div>
        {!isReview && !isCalendar ? (
          <Button 
            size="sm"
            className="h-8 px-3 bg-primary hover:bg-primary/90 rounded-lg font-[Manrope] text-primary-foreground font-semibold text-xs"
          >
            <Download className="w-3.5 h-3.5 mr-1.5" />
            İndir
          </Button>
        ) : (
          <Button 
            size="sm"
            variant="outline"
            className="h-8 px-3 rounded-lg font-[Manrope] font-semibold text-xs"
          >
            {isReview ? "Detay" : "Görüntüle"}
          </Button>
        )}
      </div>

      {/* Başlık */}
      <h3 className="font-[Manrope] text-foreground mb-3 line-clamp-2 group-hover:text-primary transition-colors font-bold text-[15px] leading-snug">
        {title}
      </h3>

      {/* Review Rating */}
      {isReview && rating !== undefined && (
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`w-4 h-4 ${
                  star <= Math.round(rating)
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-muted-foreground/30"
                }`}
              />
            ))}
          </div>
          <span className="font-[Manrope] text-foreground font-semibold text-xs">
            {rating.toFixed(1)}
          </span>
          {helpful !== undefined && (
            <span className="font-[Manrope] text-muted-foreground font-medium text-xs">
              ({helpful} faydalı)
            </span>
          )}
        </div>
      )}

      {/* Calendar Event Date */}
      {isCalendar && eventDate && (
        <div className="mb-3">
          <Badge variant="secondary" className="font-[Manrope] text-xs">
            {eventDate}
          </Badge>
        </div>
      )}

      {/* Alt Bilgiler */}
      <div className="flex items-center justify-between pt-3 border-t border-border">
        <div className="flex items-center gap-2 min-w-0">
          <span className="font-[Manrope] text-foreground/70 truncate font-medium text-xs">
            {uploadedBy}
          </span>
          <span className="text-muted-foreground">·</span>
          <span className="font-[Manrope] text-muted-foreground font-medium text-xs whitespace-nowrap">
            {uploadDate}
          </span>
        </div>
        <div className="flex items-center gap-3 flex-shrink-0">
          <div className="flex items-center gap-1 text-muted-foreground">
            <Eye className="w-3.5 h-3.5" />
            <span className="font-[Manrope] font-medium text-[11px]">{views}</span>
          </div>
          {!isReview && !isCalendar && (
            <div className="flex items-center gap-1 text-muted-foreground">
              <Download className="w-3.5 h-3.5" />
              <span className="font-[Manrope] font-medium text-[11px]">{downloads}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

