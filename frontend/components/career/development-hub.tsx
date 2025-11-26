"use client"

import { WorkshopCard } from "./workshop-card"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

export function DevelopmentHub() {
  const scrollRef = useRef<HTMLDivElement>(null)

  const workshops = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1762158007969-eb58e74ee3d3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwdWJsaWMlMjBzcGVha2luZyUyMHN0YWdlfGVufDF8fHx8MTc2NDE3Njg1MHww&ixlib=rb-4.1.0&q=80&w=1080",
      title: "KOMEK Diksiyon Kursu",
      organizer: "KOMEK",
      date: "26 Kasım 2024",
      dateDay: "26",
      dateMonth: "KAS",
      time: "14:00 - 16:00",
      location: "KOMEK Merkez",
      participants: 18,
      maxParticipants: 25,
      isFree: true,
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1675495277087-10598bf7bcd1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2RpbmclMjBwcm9ncmFtbWluZyUyMGxhcHRvcHxlbnwxfHx8fDE3NjQxNTkzMTh8MA&ixlib=rb-4.1.0&q=80&w=1080",
      title: "Web Geliştirme Atölyesi",
      organizer: "KBB Akademi",
      date: "28 Kasım 2024",
      dateDay: "28",
      dateMonth: "KAS",
      time: "10:00 - 17:00",
      location: "Konya Bilim Merkezi",
      participants: 32,
      maxParticipants: 40,
      isFree: false,
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1738676524296-364cf18900a8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmVhdGl2ZSUyMGRlc2lnbiUyMHN0dWRpb3xlbnwxfHx8fDE3NjQxNjU2MTR8MA&ixlib=rb-4.1.0&q=80&w=1080",
      title: "UI/UX Design Temelleri",
      organizer: "Tasarım Topluluğu",
      date: "1 Aralık 2024",
      dateDay: "01",
      dateMonth: "ARA",
      time: "13:00 - 16:00",
      location: "Selçuk Üniversitesi",
      participants: 24,
      maxParticipants: 30,
      isFree: true,
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1707301280425-475534ec3cc1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHByZXNlbnRhdGlvbiUyMG1lZXRpbmd8ZW58MXx8fHwxNzY0MDgwMTg4fDA&ixlib=rb-4.1.0&q=80&w=1080",
      title: "Girişimcilik ve İnovasyon",
      organizer: "NEÜ Teknokent",
      date: "3 Aralık 2024",
      dateDay: "03",
      dateMonth: "ARA",
      time: "15:00 - 18:00",
      location: "NEÜ Konferans Salonu",
      participants: 45,
      maxParticipants: 60,
      isFree: true,
    },
    {
      id: 5,
      image: "https://images.unsplash.com/photo-1761250246894-ee2314939662?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b3Jrc2hvcCUyMHRyYWluaW5nJTIwc2VtaW5hcnxlbnwxfHx8fDE3NjQxNTY0NzV8MA&ixlib=rb-4.1.0&q=80&w=1080",
      title: "Dijital Pazarlama Stratejileri",
      organizer: "KOMEK",
      date: "5 Aralık 2024",
      dateDay: "05",
      dateMonth: "ARA",
      time: "14:00 - 17:00",
      location: "Online",
      participants: 67,
      maxParticipants: 100,
      isFree: true,
    },
  ]

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 360
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      })
    }
  }

  return (
    <Card className="bg-white dark:bg-card rounded-[24px] shadow-[0_4px_20px_rgba(0,0,0,0.06)] dark:shadow-lg border border-border">
      <CardHeader>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <CardTitle className="font-[Manrope] text-[#4d4d4d] dark:text-foreground mb-1 font-extrabold text-xl sm:text-2xl lg:text-[28px]">
              Kendini Geliştir
            </CardTitle>
            <CardDescription className="font-[Manrope] text-[#4d4d4d]/60 dark:text-muted-foreground font-medium text-xs sm:text-sm">
              Kurslar, atölyeler ve sertifika programları
            </CardDescription>
          </div>

          <div className="flex items-center gap-2">
            <Button
              onClick={() => scroll("left")}
              variant="outline"
              size="icon"
              className="w-9 h-9 sm:w-10 sm:h-10 bg-[#f2f4f3] dark:bg-accent hover:bg-[#03624c] hover:text-white dark:hover:bg-[#03624c] text-[#4d4d4d] dark:text-foreground rounded-xl transition-all border border-border"
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" strokeWidth={2.5} />
            </Button>
            <Button
              onClick={() => scroll("right")}
              variant="outline"
              size="icon"
              className="w-9 h-9 sm:w-10 sm:h-10 bg-[#f2f4f3] dark:bg-accent hover:bg-[#03624c] hover:text-white dark:hover:bg-[#03624c] text-[#4d4d4d] dark:text-foreground rounded-xl transition-all border border-border"
            >
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" strokeWidth={2.5} />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {/* Scrollable Container */}
        <div
          ref={scrollRef}
          className="flex gap-4 sm:gap-6 overflow-x-auto pb-4 scrollbar-hide"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {workshops.map((workshop) => (
            <WorkshopCard key={workshop.id} {...workshop} />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

