"use client"

import { useState } from "react"
import { Calendar, MapPin, Users, Clock, ArrowRight, Filter, CalendarX, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
  description?: string
  organizer?: string
}

export function EventsPage() {
  const [activeTab, setActiveTab] = useState<"all" | "student" | "kbb">("all")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

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
      description: "Konyalı genç sanatçıların performansları",
      organizer: "Konya Büyükşehir Belediyesi",
    },
  ]

  const allEvents = [...studentEvents, ...kbbEvents]

  const filteredEvents = allEvents.filter(event => {
    if (activeTab === "all") return true
    if (activeTab === "student") return event.category === "student"
    if (activeTab === "kbb") return event.category === "kbb"
    return true
  })

  const categories = ["Tümü", "Spor", "Kültür", "Eğitim", "Sosyal", "Müzik"]

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-16 py-4 sm:py-6 md:py-8">
      <div className="mb-4 sm:mb-6 md:mb-8">
        <h1 className="font-[Manrope] text-foreground mb-2 font-extrabold text-2xl sm:text-3xl md:text-4xl lg:text-[42px]">
          Etkinlikler
        </h1>
        <p className="font-[Manrope] text-foreground/60 dark:text-muted-foreground font-medium text-sm sm:text-base">
          Öğrenci etkinlikleri ve KBB merkezi etkinlikleri
        </p>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as typeof activeTab)} className="mb-6">
        <TabsList className="grid w-full sm:w-auto grid-cols-3 font-[Manrope] mb-6">
          <TabsTrigger value="all">Tümü ({allEvents.length})</TabsTrigger>
          <TabsTrigger value="student">Öğrenci ({studentEvents.length})</TabsTrigger>
          <TabsTrigger value="kbb">KBB ({kbbEvents.length})</TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Category Filters */}
      <div className="mb-6 flex items-center gap-2 flex-wrap">
        <Filter className="w-4 h-4 text-foreground/60 dark:text-muted-foreground" />
        {categories.map((category) => (
          <Button
            key={category}
            onClick={() => setSelectedCategory(category === "Tümü" ? null : category)}
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredEvents.map((event) => {
          const filledPercentage = (event.participants / event.maxParticipants) * 100
          const isFull = event.participants >= event.maxParticipants

          return (
            <Card
              key={event.id}
              className="bg-card rounded-xl shadow-md dark:shadow-lg border border-border overflow-hidden hover:shadow-lg dark:hover:shadow-xl hover:scale-[1.02] transition-all duration-300 group"
            >
              {/* Event Image */}
              <Link href={`/events/${event.id}`}>
                <div className="relative h-48 sm:h-56 overflow-hidden">
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <Badge className={`font-[Manrope] font-bold text-xs ${
                      event.category === "student"
                        ? 'bg-blue-500 text-white'
                        : event.category === "kbb"
                        ? 'bg-primary text-white'
                        : 'bg-purple-500 text-white'
                    }`}>
                      {event.category === "student" ? "Öğrenci" : event.category === "kbb" ? "KBB" : "Belediye"}
                    </Badge>
                  </div>

                  {/* Participants Badge */}
                  <div className="absolute top-4 right-4">
                    <div className="px-3 py-1.5 bg-black/50 backdrop-blur-sm rounded-lg">
                      <div className="flex items-center gap-1.5">
                        <Users className="w-3 h-3 text-white" />
                        <span className="font-[Manrope] text-white font-bold text-xs">
                          {event.participants}/{event.maxParticipants}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>

              {/* Event Info */}
              <CardContent className="p-4 sm:p-5">
                <Link href={`/events/${event.id}`}>
                  <h3 className="font-[Manrope] text-foreground mb-3 group-hover:text-primary transition-colors font-bold text-lg sm:text-xl leading-snug">
                    {event.title}
                  </h3>
                </Link>

                {event.description && (
                  <p className="font-[Manrope] text-foreground/70 dark:text-muted-foreground text-sm mb-4 line-clamp-2">
                    {event.description}
                  </p>
                )}

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-primary" />
                    <span className="font-[Manrope] text-foreground/70 dark:text-muted-foreground font-medium text-sm">
                      {event.date}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-primary" />
                    <span className="font-[Manrope] text-foreground/70 dark:text-muted-foreground font-medium text-sm">
                      {event.time}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-primary" />
                    <span className="font-[Manrope] text-foreground/70 dark:text-muted-foreground font-medium text-sm">
                      {event.location}
                    </span>
                  </div>
                  {event.organizer && (
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-primary" />
                      <span className="font-[Manrope] text-foreground/70 dark:text-muted-foreground font-medium text-sm">
                        {event.organizer}
                      </span>
                    </div>
                  )}
                </div>

                {/* Participants Progress */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-[Manrope] text-foreground font-semibold text-sm">
                      Katılımcı: {event.participants}/{event.maxParticipants}
                    </span>
                    <span className={`font-[Manrope] font-bold text-xs ${
                      isFull ? 'text-red-500' : 'text-primary'
                    }`}>
                      {Math.round(filledPercentage)}%
                    </span>
                  </div>
                  <div className="w-full h-2 bg-gray-100 dark:bg-accent rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-500 ${
                        isFull 
                          ? 'bg-red-500' 
                          : 'bg-gradient-to-r from-primary to-[#03624c]/80'
                      }`}
                      style={{ width: `${filledPercentage}%` }}
                    />
                  </div>
                </div>

                {/* Join Button */}
                <Link href={`/events/${event.id}`}>
                  <Button 
                    className="w-full py-2.5 bg-primary text-white rounded-xl font-[Manrope] hover:bg-primary/90 transition-all flex items-center justify-center gap-2 font-bold text-sm"
                    disabled={isFull}
                  >
                    {isFull ? "Dolu" : "Detayları Gör"}
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          )
        })}
        </div>
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

      {/* Create Event Button */}
      {filteredEvents.length > 0 && (
        <div className="mt-8 text-center">
          <Button 
            variant="outline"
            className="px-6 py-3 border-2 border-dashed border-primary rounded-xl font-[Manrope] text-primary hover:bg-primary/5 dark:hover:bg-primary/10 transition-all font-bold text-sm sm:text-base"
          >
            + Yeni Etkinlik Oluştur
          </Button>
        </div>
      )}
    </div>
  )
}

