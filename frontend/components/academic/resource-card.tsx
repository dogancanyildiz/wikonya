"use client"

import { FileText, Download, Eye, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"

interface ResourceCardProps {
  title: string
  fileType: string
  fileSize: string
  uploadedBy: string
  uploaderInitials: string
  uploadDate: string
  downloads: number
  views: number
}

export function ResourceCard({
  title,
  fileType,
  fileSize,
  uploadedBy,
  uploaderInitials,
  uploadDate,
  downloads,
  views,
}: ResourceCardProps) {
  return (
    <Card className="bg-white dark:bg-card rounded-[20px] shadow-[0_4px_20px_rgba(0,0,0,0.06)] dark:shadow-lg hover:shadow-[0_6px_30px_rgba(0,0,0,0.1)] dark:hover:shadow-xl hover:scale-[1.01] transition-all duration-300 group border border-border">
      <CardContent className="p-4 sm:p-6">
        {/* Icon */}
        <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-[#03624c]/10 to-[#03624c]/5 dark:from-[#03624c]/20 dark:to-[#03624c]/10 rounded-2xl flex items-center justify-center mb-4 group-hover:from-[#03624c]/20 group-hover:to-[#03624c]/10 dark:group-hover:from-[#03624c]/30 dark:group-hover:to-[#03624c]/20 transition-all">
          <FileText className="w-6 h-6 sm:w-8 sm:h-8 text-[#03624c]" strokeWidth={2.5} />
        </div>

        {/* Title */}
        <h3 className="font-[Manrope] text-[#4d4d4d] dark:text-foreground mb-3 line-clamp-2 min-h-[3.5rem] group-hover:text-[#03624c] transition-colors font-bold text-base sm:text-lg leading-snug">
          {title}
        </h3>

        {/* File Info */}
        <div className="flex items-center gap-2 mb-4">
          <span className="px-3 py-1 bg-[#f2f4f3] dark:bg-accent rounded-lg font-[Manrope] text-[#03624c] font-bold text-xs">
            {fileType}
          </span>
          <span className="font-[Manrope] text-[#4d4d4d]/60 dark:text-muted-foreground font-medium text-xs">
            {fileSize}
          </span>
        </div>

        {/* Uploader Info */}
        <div className="flex items-center gap-2 mb-4 pb-4 border-b border-gray-100 dark:border-border">
          <Avatar className="w-7 h-7 sm:w-8 sm:h-8 border-2 border-[#f2f4f3] dark:border-border">
            <AvatarFallback className="bg-[#03624c] text-white font-[Manrope] font-bold text-[10px] sm:text-[11px]">
              {uploaderInitials}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="font-[Manrope] text-[#4d4d4d] dark:text-foreground truncate font-semibold text-xs sm:text-[13px]">
              {uploadedBy}
            </p>
            <div className="flex items-center gap-1 text-[#4d4d4d]/60 dark:text-muted-foreground">
              <Calendar className="w-3 h-3" />
              <span className="font-[Manrope] font-medium text-[10px] sm:text-[11px]">
                {uploadDate}
              </span>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-1 text-[#4d4d4d]/60 dark:text-muted-foreground">
            <Eye className="w-4 h-4" strokeWidth={2.5} />
            <span className="font-[Manrope] font-semibold text-xs">
              {views}
            </span>
          </div>
          <div className="flex items-center gap-1 text-[#4d4d4d]/60 dark:text-muted-foreground">
            <Download className="w-4 h-4" strokeWidth={2.5} />
            <span className="font-[Manrope] font-semibold text-xs">
              {downloads}
            </span>
          </div>
        </div>

        {/* Download Button */}
        <Button 
          className="w-full h-10 sm:h-11 bg-[#03624c] hover:bg-[#03624c]/90 rounded-xl font-[Manrope] text-white font-bold"
        >
          <Download className="w-4 h-4 mr-2" strokeWidth={2.5} />
          İndir
        </Button>
      </CardContent>
    </Card>
  )
}

