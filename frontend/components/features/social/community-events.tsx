"use client"

import { Calendar, MapPin, Users, Clock, ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function CommunityEvents() {
  const events = [
    {
      id: 1,
      title: "Trekking Topluluğu Buluşması",
      image: "https://images.unsplash.com/photo-1631801753372-589f27049c4d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50cyUyMGhpa2luZyUyMG1vdW50YWlufGVufDF8fHx8MTc2NDE3NTgzOXww&ixlib=rb-4.1.0&q=80&w=1080",
      date: "30 Kasım 2024",
      time: "09:00",
      location: "Alaaldin Tepesi",
      participants: 24,
      maxParticipants: 30,
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
    },
  ]

  return (
    <Card className="rounded-xl shadow-md border-border">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="font-[Manrope] text-foreground font-extrabold text-xl sm:text-2xl">
            Öğrenci Etkinlikleri
          </CardTitle>
          <Link 
            href="/events"
            className="font-[Manrope] text-primary hover:text-primary/80 transition-colors flex items-center gap-1 font-bold text-xs sm:text-sm"
          >
            Tümü
            <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" strokeWidth={2.5} />
          </Link>
        </div>
      </CardHeader>
      <CardContent className="space-y-3 sm:space-y-4 pt-0">
        {events.map((event) => {
          const filledPercentage = (event.participants / event.maxParticipants) * 100
          
          return (
            <div
              key={event.id}
              className="group rounded-xl overflow-hidden border-2 border-border hover:border-primary transition-all"
            >
              {/* Event Image */}
              <div className="relative h-24 sm:h-32 overflow-hidden">
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              </div>

              {/* Event Info */}
              <div className="p-3 sm:p-4">
                <h3 className="font-[Manrope] text-foreground mb-2 sm:mb-3 group-hover:text-primary transition-colors font-bold text-sm sm:text-base leading-snug">
                  {event.title}
                </h3>

                <div className="space-y-1.5 sm:space-y-2 mb-3 sm:mb-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3 h-3 sm:w-4 sm:h-4 text-primary" strokeWidth={2.5} />
                    <span className="font-[Manrope] text-muted-foreground font-medium text-xs sm:text-[13px]">
                      {event.date}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-3 h-3 sm:w-4 sm:h-4 text-primary" strokeWidth={2.5} />
                    <span className="font-[Manrope] text-muted-foreground font-medium text-xs sm:text-[13px]">
                      {event.time}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-primary" strokeWidth={2.5} />
                    <span className="font-[Manrope] text-muted-foreground font-medium text-xs sm:text-[13px]">
                      {event.location}
                    </span>
                  </div>
                </div>

                {/* Participants Progress */}
                <div className="mb-3 sm:mb-4">
                  <div className="flex items-center justify-between mb-1.5 sm:mb-2">
                    <div className="flex items-center gap-1.5">
                      <Users className="w-3 h-3 sm:w-4 sm:h-4 text-primary" strokeWidth={2.5} />
                      <span className="font-[Manrope] text-foreground font-semibold text-xs sm:text-[13px]">
                        {event.participants}/{event.maxParticipants} Katılımcı
                      </span>
                    </div>
                    <span className="font-[Manrope] text-primary font-bold text-[10px] sm:text-xs">
                      {Math.round(filledPercentage)}%
                    </span>
                  </div>
                  <div className="w-full h-1.5 sm:h-2 bg-accent rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-primary to-primary/80 rounded-full transition-all duration-500"
                      style={{ width: `${filledPercentage}%` }}
                    ></div>
                  </div>
                </div>

                {/* Join Button */}
                <Link href={`/events/${event.id}`}>
                  <Button 
                    className="w-full py-2 sm:py-2.5 bg-primary text-primary-foreground rounded-lg font-[Manrope] hover:bg-primary/90 transition-all flex items-center justify-center gap-2 font-bold text-xs sm:text-sm"
                  >
                    Detayları Gör
                    <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" strokeWidth={2.5} />
                  </Button>
                </Link>
              </div>
            </div>
          )
        })}
      </CardContent>

      {/* Create Event Button */}
      <CardContent className="pt-0">
        <Button 
          variant="outline"
          className="w-full py-2 sm:py-3 border-2 border-dashed border-primary rounded-lg font-[Manrope] text-primary hover:bg-primary/5 dark:hover:bg-primary/10 transition-all font-bold text-xs sm:text-sm"
        >
          + Yeni Etkinlik Oluştur
        </Button>
      </CardContent>
    </Card>
  )
}

