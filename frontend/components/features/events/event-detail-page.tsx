"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { 
  Calendar, 
  MapPin, 
  Clock, 
  ArrowLeft,
  Share2,
  Heart,
  CheckCircle2,
  Navigation
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export function EventDetailPage() {
  const params = useParams()
  const eventId = params?.id ? Number(params.id) : 1
  const [isFavorite, setIsFavorite] = useState(false)
  const [isJoined, setIsJoined] = useState(false)

  // Mock data - gerçek uygulamada API'den gelecek
  const event = {
    id: eventId,
    title: "Trekking Topluluğu Buluşması",
    category: "student" as const,
    image: "https://images.unsplash.com/photo-1631801753372-589f27049c4d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50cyUyMGhpa2luZyUyMG1vdW50YWlufGVufDF8fHx8MTc2NDE3NTgzOXww&ixlib=rb-4.1.0&q=80&w=1080",
    date: "30 Kasım 2024",
    time: "09:00",
    endTime: "16:00",
    location: "Alaaldin Tepesi",
    fullAddress: "Alaaddin Tepesi, Meram, Konya",
    participants: 24,
    maxParticipants: 30,
    description: "Doğa severler için harika bir gün! Alaaddin Tepesi'nde trekking yapıp, doğanın tadını çıkaracağız. Piknik molası ve fotoğraf çekimi de planlanmıştır. Uygun kıyafet ve ayakkabı getirmeyi unutmayın!",
    organizer: {
      name: "Trekking Topluluğu",
      avatar: "TT",
      role: "Topluluk Lideri",
    },
    requirements: [
      "Rahat yürüyüş ayakkabısı",
      "Su matarası",
      "Hafif sırt çantası",
      "Yağmurluk (hava durumuna göre)",
    ],
    coordinates: {
      lat: 37.8746,
      lng: 32.4932,
    },
  }

  const participants = [
    { id: 1, name: "Ahmet Yılmaz", initials: "AY", role: "Gezgin" },
    { id: 2, name: "Zeynep Kaya", initials: "ZK", role: "Seyyah" },
    { id: 3, name: "Mehmet Demir", initials: "MD", role: "Kaşif Meraklısı" },
    { id: 4, name: "Ayşe Öz", initials: "AÖ", role: "Gezgin" },
    { id: 5, name: "Can Yıldız", initials: "CY", role: "Seyyah" },
  ]

  const filledPercentage = (event.participants / event.maxParticipants) * 100
  const isFull = event.participants >= event.maxParticipants

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: event.title,
          text: event.description,
          url: window.location.href,
        })
      } catch (err) {
        console.error("Share failed:", err)
      }
    }
  }

  const handleJoin = () => {
    if (!isFull && !isJoined) {
      setIsJoined(true)
      // Gerçek uygulamada API çağrısı yapılacak
    }
  }

  const openMap = () => {
    const url = `https://www.google.com/maps/search/?api=1&query=${event.coordinates.lat},${event.coordinates.lng}`
    window.open(url, "_blank")
  }

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-16 py-4 sm:py-6 md:py-8">
      {/* Back Button */}
      <Link href="/events">
        <Button
          variant="ghost"
          className="mb-4 sm:mb-6 font-[Manrope] text-foreground hover:text-primary"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Geri Dön
        </Button>
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-4 sm:space-y-6">
          {/* Hero Image */}
          <Card className="bg-card rounded-xl shadow-md dark:shadow-lg border border-border overflow-hidden">
            <div className="relative h-64 sm:h-80 lg:h-96">
              <Image
                src={event.image}
                alt={event.title}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 66vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              
              {/* Actions */}
              <div className="absolute top-4 sm:top-6 right-4 sm:right-6 flex gap-2">
                <Button
                  variant="secondary"
                  size="icon"
                  onClick={() => setIsFavorite(!isFavorite)}
                  className="bg-card/90 backdrop-blur-sm hover:bg-white dark:hover:bg-card"
                >
                  <Heart className={`w-5 h-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-foreground'}`} />
                </Button>
                <Button
                  variant="secondary"
                  size="icon"
                  onClick={handleShare}
                  className="bg-card/90 backdrop-blur-sm hover:bg-white dark:hover:bg-card"
                >
                  <Share2 className="w-5 h-5 text-foreground" />
                </Button>
              </div>

              {/* Category Badge */}
              <div className="absolute top-4 sm:top-6 left-4 sm:left-6">
                <Badge className={`font-[Manrope] font-bold text-xs sm:text-sm px-3 py-1.5 ${
                  event.category === "student"
                    ? 'bg-blue-500 text-white'
                    : event.category === "kbb"
                    ? 'bg-primary text-white'
                    : 'bg-purple-500 text-white'
                }`}>
                  {event.category === "student" ? "Öğrenci Etkinliği" : event.category === "kbb" ? "KBB Etkinliği" : "Belediye Etkinliği"}
                </Badge>
              </div>

              {/* Info Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 lg:p-8">
                <h1 className="font-[Manrope] text-white font-extrabold text-2xl sm:text-3xl lg:text-4xl mb-3">
                  {event.title}
                </h1>
                <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-white" />
                    <span className="font-[Manrope] text-white font-semibold text-sm sm:text-base">
                      {event.date}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-white" />
                    <span className="font-[Manrope] text-white font-semibold text-sm sm:text-base">
                      {event.time} - {event.endTime}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-white" />
                    <span className="font-[Manrope] text-white font-semibold text-sm sm:text-base">
                      {event.location}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Description */}
          <Card className="bg-card rounded-xl shadow-md dark:shadow-lg border border-border">
            <CardHeader>
              <CardTitle className="font-[Manrope] text-foreground font-bold text-lg sm:text-xl">
                Etkinlik Hakkında
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-[Manrope] text-foreground/70 dark:text-muted-foreground leading-relaxed">
                {event.description}
              </p>
            </CardContent>
          </Card>

          {/* Requirements */}
          <Card className="bg-card rounded-xl shadow-md dark:shadow-lg border border-border">
            <CardHeader>
              <CardTitle className="font-[Manrope] text-foreground font-bold text-lg sm:text-xl">
                Gereksinimler
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {event.requirements.map((req, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-accent rounded-xl">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="font-[Manrope] text-sm text-foreground">
                      {req}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Participants */}
          <Card className="bg-card rounded-xl shadow-md dark:shadow-lg border border-border">
            <CardHeader>
              <CardTitle className="font-[Manrope] text-foreground font-bold text-lg sm:text-xl">
                Katılımcılar ({event.participants}/{event.maxParticipants})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-[Manrope] text-foreground font-semibold text-sm">
                    Katılım Oranı
                  </span>
                  <span className={`font-[Manrope] font-bold text-sm ${
                    isFull ? 'text-red-500' : 'text-primary'
                  }`}>
                    {Math.round(filledPercentage)}%
                  </span>
                </div>
                <div className="w-full h-3 bg-gray-100 dark:bg-accent rounded-full overflow-hidden">
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

              <Separator className="my-4" />

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {participants.map((participant) => (
                  <div key={participant.id} className="flex items-center gap-2 p-2 bg-accent rounded-lg">
                    <Avatar className="w-8 h-8">
                      <AvatarFallback className="bg-primary text-white font-[Manrope] font-bold text-xs">
                        {participant.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="font-[Manrope] font-semibold text-xs text-foreground truncate">
                        {participant.name}
                      </p>
                      <p className="font-[Manrope] text-[10px] text-foreground/60 dark:text-muted-foreground truncate">
                        {participant.role}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-4 sm:space-y-6">
          {/* Join Card */}
          <Card className="bg-card rounded-xl shadow-md dark:shadow-lg border border-border">
            <CardHeader>
              <CardTitle className="font-[Manrope] text-foreground font-bold text-lg">
                Etkinliğe Katıl
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-0">
              {isJoined ? (
                <div className="text-center py-4">
                  <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto mb-3" />
                  <p className="font-[Manrope] font-bold text-primary mb-2">
                    Etkinliğe katıldınız!
                  </p>
                  <p className="font-[Manrope] text-sm text-foreground/60 dark:text-muted-foreground">
                    Etkinlik günü görüşmek üzere!
                  </p>
                </div>
              ) : (
                <>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-accent rounded-xl">
                      <span className="font-[Manrope] text-sm text-foreground/60 dark:text-muted-foreground">
                        Katılımcı
                      </span>
                      <span className="font-[Manrope] font-bold text-sm text-foreground">
                        {event.participants}/{event.maxParticipants}
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-accent rounded-xl">
                      <span className="font-[Manrope] text-sm text-foreground/60 dark:text-muted-foreground">
                        Tarih
                      </span>
                      <span className="font-[Manrope] font-bold text-sm text-foreground">
                        {event.date}
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-accent rounded-xl">
                      <span className="font-[Manrope] text-sm text-foreground/60 dark:text-muted-foreground">
                        Saat
                      </span>
                      <span className="font-[Manrope] font-bold text-sm text-foreground">
                        {event.time}
                      </span>
                    </div>
                  </div>
                  <Button
                    onClick={handleJoin}
                    disabled={isFull}
                    className={`w-full py-3 font-[Manrope] font-bold ${
                      isFull
                        ? 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                        : 'bg-primary hover:bg-primary/90 text-white'
                    }`}
                  >
                    {isFull ? "Etkinlik Dolu" : "Etkinliğe Katıl"}
                  </Button>
                </>
              )}
            </CardContent>
          </Card>

          {/* Organizer */}
          <Card className="bg-card rounded-xl shadow-md dark:shadow-lg border border-border">
            <CardHeader>
              <CardTitle className="font-[Manrope] text-foreground font-bold text-lg">
                Organizatör
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3">
                <Avatar className="w-12 h-12">
                  <AvatarFallback className="bg-primary text-white font-[Manrope] font-bold">
                    {event.organizer.avatar}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-[Manrope] font-bold text-sm text-foreground">
                    {event.organizer.name}
                  </p>
                  <p className="font-[Manrope] text-xs text-foreground/60 dark:text-muted-foreground">
                    {event.organizer.role}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Location */}
          <Card className="bg-card rounded-xl shadow-md dark:shadow-lg border border-border">
            <CardHeader>
              <CardTitle className="font-[Manrope] text-foreground font-bold text-lg">
                Konum
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-0">
              <div className="relative h-48 bg-accent rounded-xl overflow-hidden">
                {/* Placeholder for map */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-12 h-12 text-primary mx-auto mb-2" />
                    <p className="font-[Manrope] text-sm text-foreground/60 dark:text-muted-foreground">
                      Harita görünümü
                    </p>
                  </div>
                </div>
              </div>
              <Button
                onClick={openMap}
                className="w-full bg-primary hover:bg-primary/90 font-[Manrope] font-bold"
              >
                <Navigation className="w-4 h-4 mr-2" />
                Yol Tarifi Al
              </Button>
              <p className="font-[Manrope] text-xs text-foreground/60 dark:text-muted-foreground">
                {event.fullAddress}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

