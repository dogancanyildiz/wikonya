"use client"

import { useState } from "react"
import { Calendar, MapPin, Users, Clock, ArrowRight, Filter, CalendarX, X, ChevronLeft, ChevronRight, ChevronDown } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Empty, EmptyHeader, EmptyTitle, EmptyDescription, EmptyMedia, EmptyContent } from "@/components/ui/empty"

interface Event {
  id: number
  title: string
  image: string
  date: string
  time: string
  location: string
  participants: number
  maxParticipants: number
  category: "student" | "kbb" | "municipality"
  eventCategory?: "Spor" | "Kültür" | "Eğitim" | "Sosyal" | "Müzik"
  description?: string
  organizer?: string
}

const ITEMS_PER_PAGE = 12

export function EventsPage() {
  const [activeTab, setActiveTab] = useState<"all" | "student" | "kbb">("all")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)

  const studentEvents: Event[] = [
    {
      id: 1,
      title: "Trekking Topluluğu Buluşması",
      image: "https://images.unsplash.com/photo-1631801753372-589f27049c4d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50cyUyMGhpa2luZyUyMG1vdW50YWlufGVufDF8fHx8MTc2NDE3NTgzOXww&ixlib=rb-4.1.0&q=80&w=1080",
      date: "30 Kasım 2024",
      time: "09:00",
      location: "Alaaldin Tepesi",
      participants: 24,
      maxParticipants: 30,
      category: "student",
      eventCategory: "Spor",
      description: "Doğa yürüyüşü ve piknik etkinliği",
      organizer: "Trekking Topluluğu",
    },
    {
      id: 2,
      title: "Kitap Kulübü - Orhan Pamuk",
      image: "https://images.unsplash.com/photo-1624340236923-4e6e8724695d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib29rc3RvcmUlMjBjYWZlfGVufDF8fHx8MTc2NDE3NTgzOXww&ixlib=rb-4.1.0&q=80&w=1080",
      date: "2 Aralık 2024",
      time: "18:30",
      location: "Kitap & Kahve",
      participants: 12,
      maxParticipants: 15,
      category: "student",
      eventCategory: "Kültür",
      description: "Orhan Pamuk'un eserlerini tartışıyoruz",
      organizer: "Kitap Kulübü",
    },
    {
      id: 3,
      title: "Board Game Night",
      image: "https://images.unsplash.com/photo-1762744594797-bcfd17a8c032?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1lJTIwY2FmZSUyMGJvYXJkJTIwZ2FtZXN8ZW58MXx8fHwxNzY0MTc1ODQwfDA&ixlib=rb-4.1.0&q=80&w=1080",
      date: "5 Aralık 2024",
      time: "20:00",
      location: "Game Zone Cafe",
      participants: 8,
      maxParticipants: 20,
      category: "student",
      eventCategory: "Sosyal",
      description: "Strateji ve kutu oyunları gecesi",
      organizer: "Oyun Topluluğu",
    },
  ]

  const kbbEvents: Event[] = [
    {
      id: 4,
      title: "Gençlik Merkezi Açılış Töreni",
      image: "https://images.unsplash.com/photo-1511578314322-379afb476865?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3V0aCUyMGNlbnRlcnxlbnwxfHx8fDE3NjQxNzU4NDF8MA&ixlib=rb-4.1.0&q=80&w=1080",
      date: "10 Aralık 2024",
      time: "14:00",
      location: "Konya Gençlik Merkezi",
      participants: 150,
      maxParticipants: 200,
      category: "kbb",
      eventCategory: "Sosyal",
      description: "Yeni gençlik merkezinin açılış töreni ve tanıtım etkinliği",
      organizer: "Konya Büyükşehir Belediyesi",
    },
    {
      id: 5,
      title: "Kültür Kart Tanıtım Günü",
      image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXJkJTIwcGF5bWVudHxlbnwxfHx8fDE3NjQxNzU4NDF8MA&ixlib=rb-4.1.0&q=80&w=1080",
      date: "15 Aralık 2024",
      time: "11:00",
      location: "Konya Büyükşehir Belediyesi",
      participants: 80,
      maxParticipants: 100,
      category: "kbb",
      eventCategory: "Eğitim",
      description: "Genç Kültür Kart'ın özellikleri ve avantajları hakkında bilgilendirme",
      organizer: "Konya Büyükşehir Belediyesi",
    },
    {
      id: 6,
      title: "Öğrenci Konseri - Yerel Sanatçılar",
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25jZXJ0JTIwbXVzaWN8ZW58MXx8fHwxNzY0MTc1ODQyfDA&ixlib=rb-4.1.0&q=80&w=1080",
      date: "20 Aralık 2024",
      time: "19:00",
      location: "Konya Kültür Merkezi",
      participants: 200,
      maxParticipants: 300,
      category: "kbb",
      eventCategory: "Müzik",
      description: "Konyalı genç sanatçıların performansları",
      organizer: "Konya Büyükşehir Belediyesi",
    },
  ]

  const allEvents = [...studentEvents, ...kbbEvents]

  const filteredEvents = allEvents.filter(event => {
    // Tab filtresi
    if (activeTab === "student" && event.category !== "student") return false
    if (activeTab === "kbb" && event.category !== "kbb") return false
    
    // Kategori filtresi
    if (selectedCategory !== null && event.eventCategory !== selectedCategory) return false
    
    return true
  })

  // Pagination
  const totalPages = Math.ceil(filteredEvents.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const paginatedEvents = filteredEvents.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  // Tab veya kategori değiştiğinde sayfa 1'e dön
  const handleTabChange = (tab: typeof activeTab) => {
    setActiveTab(tab)
    setCurrentPage(1)
  }

  const handleCategoryChange = (category: string | null) => {
    setSelectedCategory(category === "Tümü" ? null : category)
    setCurrentPage(1)
  }

  const categories = ["Tümü", "Spor", "Kültür", "Eğitim", "Sosyal", "Müzik"]

  const getTabLabel = () => {
    if (activeTab === "all") return `Tümü (${allEvents.length})`
    if (activeTab === "student") return `Öğrenci (${studentEvents.length})`
    if (activeTab === "kbb") return `KBB (${kbbEvents.length})`
    return "Tümü"
  }

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-16 py-6 sm:py-8 md:py-10">
      <div className="mb-6 sm:mb-8 md:mb-10">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            <h1 className="font-[Manrope] text-foreground mb-2 font-extrabold text-2xl sm:text-3xl md:text-4xl lg:text-[42px]">
              Etkinlikler
            </h1>
            <p className="font-[Manrope] text-foreground/60 dark:text-muted-foreground font-medium text-sm sm:text-base">
              Öğrenci etkinlikleri ve KBB merkezi etkinlikleri
            </p>
          </div>
          <Button 
            variant="outline"
            className="px-4 sm:px-6 py-2 sm:py-3 border-2 border-dashed border-primary rounded-xl font-[Manrope] text-primary hover:bg-primary/5 dark:hover:bg-primary/10 transition-all font-bold text-xs sm:text-sm whitespace-nowrap"
          >
            + Etkinlik Oluştur
          </Button>
        </div>
      </div>

      {/* Event Type Dropdown */}
      <div className="mb-6">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="outline"
              className="px-3 sm:px-4 py-2 bg-card text-foreground rounded-xl font-[Manrope] hover:bg-accent dark:hover:bg-accent transition-colors font-bold text-xs sm:text-sm border border-border flex items-center gap-2"
            >
              {getTabLabel()}
              <ChevronDown className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-56">
            <DropdownMenuItem
              onClick={() => handleTabChange("all")}
              className={`font-[Manrope] cursor-pointer ${
                activeTab === "all" ? 'bg-primary text-white' : ''
              }`}
            >
              Tümü ({allEvents.length})
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handleTabChange("student")}
              className={`font-[Manrope] cursor-pointer ${
                activeTab === "student" ? 'bg-primary text-white' : ''
              }`}
            >
              Öğrenci ({studentEvents.length})
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handleTabChange("kbb")}
              className={`font-[Manrope] cursor-pointer ${
                activeTab === "kbb" ? 'bg-primary text-white' : ''
              }`}
            >
              KBB ({kbbEvents.length})
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Category Filters */}
      <div className="mb-6 flex items-center gap-2 flex-wrap">
        <Filter className="w-4 h-4 text-foreground/60 dark:text-muted-foreground" />
        {categories.map((category) => (
          <Button
            key={category}
            onClick={() => handleCategoryChange(category)}
            variant={selectedCategory === category || (category === "Tümü" && selectedCategory === null) ? "default" : "outline"}
            className={`font-[Manrope] font-bold text-xs sm:text-sm ${
              selectedCategory === category || (category === "Tümü" && selectedCategory === null)
                ? 'bg-primary text-white'
                : ''
            }`}
          >
            {category}
          </Button>
        ))}
        {(selectedCategory !== null || activeTab !== "all") && (
          <Button
            onClick={() => {
              setSelectedCategory(null)
              setActiveTab("all")
              setCurrentPage(1)
            }}
            variant="outline"
            size="sm"
            className="font-[Manrope] font-bold text-xs text-foreground/60 dark:text-muted-foreground hover:text-primary"
          >
            <X className="w-3 h-3 mr-1" />
            Temizle
          </Button>
        )}
        {(selectedCategory !== null || activeTab !== "all") && (
          <Badge className="font-[Manrope] font-bold text-xs bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary">
            {[selectedCategory, activeTab !== "all" ? activeTab : null].filter(Boolean).length} aktif filtre
          </Badge>
        )}
      </div>

      {/* Events Grid */}
      {filteredEvents.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {paginatedEvents.map((event) => {
            const filledPercentage = (event.participants / event.maxParticipants) * 100
            const isFull = event.participants >= event.maxParticipants

            return (
              <Card
                key={event.id}
                className="bg-card rounded-2xl shadow-md dark:shadow-lg border border-border overflow-hidden hover:shadow-lg dark:hover:shadow-xl transition-all duration-300 group"
              >
                {/* Event Image */}
                <Link href={`/events/${event.id}`}>
                  <div className="relative h-24 sm:h-28 overflow-hidden">
                    <Image
                      src={event.image}
                      alt={event.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      loading="lazy"
                      quality={85}
                    />
                  </div>
                </Link>

                {/* Event Info */}
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <Link href={`/events/${event.id}`} className="flex-1">
                      <h3 className="font-[Manrope] text-foreground mb-2 group-hover:text-primary transition-colors font-bold text-[15px] leading-snug">
                        {event.title}
                      </h3>
                    </Link>
                    <Badge className="font-[Manrope] font-bold text-xs flex-shrink-0 bg-primary text-white">
                      {event.category === "student" ? "Öğrenci" : event.category === "kbb" ? "KBB" : "Belediye"}
                    </Badge>
                  </div>

                  {event.description && (
                    <p className="font-[Manrope] text-foreground/70 dark:text-muted-foreground text-xs mb-3 line-clamp-2">
                      {event.description}
                    </p>
                  )}

                  <div className="space-y-1.5 mb-3">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                      <span className="font-[Manrope] text-foreground/70 dark:text-muted-foreground font-medium text-xs">
                        {event.date}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                      <span className="font-[Manrope] text-foreground/70 dark:text-muted-foreground font-medium text-xs">
                        {event.time}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                      <span className="font-[Manrope] text-foreground/70 dark:text-muted-foreground font-medium text-xs truncate">
                        {event.location}
                      </span>
                    </div>
                    {event.organizer && (
                      <div className="flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                        <span className="font-[Manrope] text-foreground/70 dark:text-muted-foreground font-medium text-xs truncate">
                          {event.organizer}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Participants Progress */}
                  <div className="mb-3">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-[Manrope] text-foreground font-semibold text-xs">
                        Katılımcı: {event.participants}/{event.maxParticipants}
                      </span>
                      <span className={`font-[Manrope] font-bold text-xs ${
                        isFull ? 'text-red-500' : 'text-primary'
                      }`}>
                        {Math.round(filledPercentage)}%
                      </span>
                    </div>
                    <div className="w-full h-1.5 bg-gray-100 dark:bg-accent rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all duration-500 ${
                          isFull 
                            ? 'bg-red-500' 
                            : 'bg-gradient-to-r from-primary to-primary/80'
                        }`}
                        style={{ width: `${filledPercentage}%` }}
                      />
                    </div>
                  </div>

                  {/* Join Button */}
                  <Link href={`/events/${event.id}`}>
                    <Button 
                      className="w-full py-2 bg-primary text-white rounded-lg font-[Manrope] hover:bg-primary/90 transition-all flex items-center justify-center gap-2 font-bold text-xs"
                      disabled={isFull}
                    >
                      {isFull ? "Dolu" : "Detayları Gör"}
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            )
          })}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-10">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="h-9 px-3 rounded-lg font-[Manrope] font-semibold text-xs border border-border disabled:opacity-50"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              
              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <Button
                    key={page}
                    variant="ghost"
                    size="sm"
                    onClick={() => setCurrentPage(page)}
                    className={`h-9 w-9 rounded-lg font-[Manrope] font-bold text-sm
                      ${currentPage === page
                        ? 'bg-primary text-white hover:bg-primary/90'
                        : 'text-foreground/70 hover:text-foreground hover:bg-accent'
                      }
                    `}
                  >
                    {page}
                  </Button>
                ))}
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="h-9 px-3 rounded-lg font-[Manrope] font-semibold text-xs border border-border disabled:opacity-50"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          )}
        </>
      ) : (
        <Empty className="py-12 sm:py-16">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <CalendarX className="w-12 h-12 text-muted-foreground" />
            </EmptyMedia>
            <EmptyTitle className="font-[Manrope] font-bold text-xl sm:text-2xl">
              Etkinlik Bulunamadı
            </EmptyTitle>
            <EmptyDescription className="font-[Manrope] text-base">
              Seçilen kriterlere uygun etkinlik bulunamadı. Filtreleri değiştirmeyi deneyin veya yeni bir etkinlik oluşturun.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                onClick={() => {
                  setActiveTab("all")
                  setSelectedCategory(null)
                  setCurrentPage(1)
                }}
                variant="outline"
                className="font-[Manrope] font-bold"
              >
                Filtreleri Temizle
              </Button>
              <Button
                variant="outline"
                className="px-6 py-3 border-2 border-dashed border-primary rounded-xl font-[Manrope] text-primary hover:bg-primary/5 dark:hover:bg-primary/10 transition-all font-bold text-sm sm:text-base"
              >
                + Yeni Etkinlik Oluştur
              </Button>
            </div>
          </EmptyContent>
        </Empty>
      )}
    </div>
  )
}

