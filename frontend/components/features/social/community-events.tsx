"use client"

import { Calendar, MapPin, Users, ArrowRight, Plus } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export function CommunityEvents() {
  const events = [
    {
      id: 1,
      title: "Trekking Topluluğu Buluşması",
      image: "https://images.unsplash.com/photo-1631801753372-589f27049c4d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50cyUyMGhpa2luZyUyMG1vdW50YWlufGVufDF8fHx8MTc2NDE3NTgzOXww&ixlib=rb-4.1.0&q=80&w=1080",
      date: "30 Kas",
      time: "09:00",
      location: "Alaaddin Tepesi",
      participants: 24,
      maxParticipants: 30,
    },
    {
      id: 2,
      title: "Kitap Kulübü - Orhan Pamuk",
      image: "https://images.unsplash.com/photo-1624340236923-4e6e8724695d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib29rc3RvcmUlMjBjYWZlfGVufDF8fHx8MTc2NDE3NTgzOXww&ixlib=rb-4.1.0&q=80&w=1080",
      date: "2 Ara",
      time: "18:30",
      location: "Kitap & Kahve",
      participants: 12,
      maxParticipants: 15,
    },
    {
      id: 3,
      title: "Board Game Night",
      image: "https://images.unsplash.com/photo-1762744594797-bcfd17a8c032?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1lJTIwY2FmZSUyMGJvYXJkJTIwZ2FtZXN8ZW58MXx8fHwxNzY0MTc1ODQwfDA&ixlib=rb-4.1.0&q=80&w=1080",
      date: "5 Ara",
      time: "20:00",
      location: "Game Zone Cafe",
      participants: 8,
      maxParticipants: 20,
    },
    {
      id: 4,
      title: "Fotoğrafçılık Workshop",
      image: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      date: "8 Ara",
      time: "14:00",
      location: "Mevlana Müzesi",
      participants: 15,
      maxParticipants: 20,
    },
  ]

  return (
    <div>
      {/* Başlık Bölümü - Venue grid ile hizalı */}
      <div className="min-h-[88px] sm:min-h-[96px] mb-6 flex items-end">
        <div className="flex items-center justify-between w-full">
          <h2 className="font-[Manrope] text-foreground font-extrabold text-xl sm:text-2xl lg:text-[28px]">
            Etkinlikler
          </h2>
          <Link 
            href="/events"
            className="font-[Manrope] text-primary hover:text-primary/80 transition-colors flex items-center gap-1 font-semibold text-xs"
          >
            Tümünü Gör
            <ArrowRight className="w-3.5 h-3.5" strokeWidth={2} />
          </Link>
        </div>
      </div>

      {/* Etkinlik Kartları */}
      <div className="space-y-3">
        {events.map((event) => {
          const filledPercentage = (event.participants / event.maxParticipants) * 100
          const spotsLeft = event.maxParticipants - event.participants
          
          return (
            <Link 
              key={event.id}
              href={`/events/${event.id}`}
              className="block"
            >
              <article className="bg-card rounded-xl border border-border overflow-hidden flex shadow-md dark:shadow-lg hover:shadow-lg dark:hover:shadow-xl transition-all duration-300">
                {/* Görsel - Solda */}
                <div className="relative w-24 h-24 flex-shrink-0">
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>

                {/* İçerik - Sağda */}
                <div className="flex-1 p-3 flex flex-col justify-between min-w-0">
                  <div>
                    <h3 className="font-[Manrope] text-foreground font-bold text-sm leading-snug mb-1 truncate">
                      {event.title}
                    </h3>
                    
                    <div className="flex items-center gap-3 mb-1.5">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-primary" strokeWidth={2.5} />
                        <span className="font-[Manrope] text-foreground font-medium text-[11px]">
                          {event.date}, {event.time}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-muted-foreground" strokeWidth={2.5} />
                        <span className="font-[Manrope] text-muted-foreground text-[11px] truncate">
                          {event.location}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Katılımcı & Progress */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-1">
                        <Users className="w-3 h-3 text-muted-foreground" strokeWidth={2.5} />
                        <span className="font-[Manrope] text-muted-foreground font-medium text-[11px]">
                          {event.participants}/{event.maxParticipants}
                        </span>
                      </div>
                      <span className={`font-[Manrope] font-bold text-[11px] ${
                        spotsLeft <= 5 ? 'text-amber-500' : 'text-primary'
                      }`}>
                        {spotsLeft} yer
                      </span>
                    </div>
                    
                    <div className="w-full h-1 bg-accent rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all ${
                          filledPercentage >= 80 ? 'bg-amber-500' : 'bg-primary'
                        }`}
                        style={{ width: `${filledPercentage}%` }}
                      />
                    </div>
                  </div>
                </div>
              </article>
            </Link>
          )
        })}
      </div>

      {/* Etkinlik Oluştur */}
      <Button 
        variant="outline"
        className="w-full h-10 mt-4 border-dashed border-border rounded-xl font-[Manrope] text-muted-foreground hover:text-primary hover:border-primary transition-all font-semibold text-xs"
      >
        <Plus className="w-4 h-4 mr-1.5" />
        Etkinlik Oluştur
      </Button>
    </div>
  )
}

