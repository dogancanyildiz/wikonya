"use client"

import { useState } from "react"
import { Star, MapPin, TrendingUp, Users, Vote, Check } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export function SocialHero() {
  const [isVoteModalOpen, setIsVoteModalOpen] = useState(false)
  const [selectedVenueId, setSelectedVenueId] = useState<number | null>(null)

  // Trend olan mekanlar ve venue-grid'deki gerçek ID'leri
  const trendingVenues = [
    { id: 5, name: "Okuma Odası Kitap Cafe", category: "Ders Çalışma", visitors: "245" },
    { id: 1, name: "Meram Kıraathanesi", category: "Kahve & Tatlı", visitors: "189" },
    { id: 2, name: "Study Hub Cafe", category: "Ders Çalışma", visitors: "167" },
  ]

  // All venues for voting (from venue-grid)
  const allVenues = [
    { id: 1, name: "Meram Kıraathanesi", category: "Kahve & Tatlı", location: "Meram, Merkez", rating: 4.8 },
    { id: 2, name: "Study Hub Cafe", category: "Ders Çalışma", location: "Bosna Hersek, Selçuklu", rating: 4.9 },
    { id: 3, name: "Şems-i Bistro", category: "Sosyal Buluşma", location: "Alaaddin, Karatay", rating: 4.7 },
    { id: 4, name: "Bahçe Cafe & Baharat", category: "Sakin Ortam", location: "Yazır, Selçuklu", rating: 4.6 },
    { id: 5, name: "Okuma Odası Kitap Cafe", category: "Ders Çalışma", location: "Fevziçakmak, Karatay", rating: 4.9 },
    { id: 6, name: "Müzik & Konser Mekanı", category: "Eğlence", location: "Meram, Merkez", rating: 4.5 },
  ]

  const handleVote = () => {
    if (selectedVenueId) {
      // TODO: API call to submit vote
      console.log("Voted for venue:", selectedVenueId)
      setIsVoteModalOpen(false)
      setSelectedVenueId(null)
      // Show success message or toast
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-10 sm:mb-12 md:mb-14">
      {/* Left Side - Venue of the Week */}
      <div className="relative rounded-2xl overflow-hidden h-[400px] sm:h-[500px]">
        <Image
          src="https://images.unsplash.com/photo-1739723745132-97df9db49db2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3p5JTIwY2FmZSUyMGludGVyaW9yfGVufDF8fHx8MTc2NDE1ODI0MHww&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Kitap & Kahve"
          fill
          className="object-cover"
          unoptimized
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/10"></div>
        
        {/* Badge */}
        <div className="absolute top-5 sm:top-6 left-5 sm:left-6">
          <div className="px-4 py-2 bg-white/95 dark:bg-white rounded-lg">
            <span className="font-[Manrope] text-primary font-bold text-xs sm:text-sm tracking-wide uppercase">
              Haftanın Mekanı
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-8">
          <div className="flex items-center gap-2 mb-3">
            <Star className="w-5 h-5 text-amber-400 fill-amber-400" strokeWidth={2} />
            <span className="font-[Manrope] text-white font-bold text-lg">
              4.9
            </span>
          </div>
          <h2 className="font-[Manrope] text-white mb-3 font-extrabold text-3xl sm:text-4xl lg:text-[44px] leading-tight tracking-tight">
            Kitap & Kahve
          </h2>
          <div className="flex items-center gap-1.5 mb-4">
            <MapPin className="w-4 h-4 text-white/70" strokeWidth={2} />
            <span className="font-[Manrope] text-white/80 font-medium text-sm sm:text-base">
              Bosna Hersek, Meram
            </span>
          </div>
          <p className="font-[Manrope] text-white/70 mb-6 font-normal text-sm sm:text-base leading-relaxed max-w-md">
            Sakin ortam, sınırsız kahve ve kitap seçenekleriyle ders çalışmak için ideal.
          </p>
          <Link href="/social/venue/5">
            <Button 
              className="px-6 py-3 bg-white rounded-lg font-[Manrope] text-foreground hover:bg-white/90 transition-colors font-bold text-sm cursor-pointer"
            >
              Detayları Gör
            </Button>
          </Link>
        </div>
      </div>

      {/* Sağ Taraf - En Çok Trend Olan 3 Mekan */}
      <Card className="bg-card rounded-xl shadow-md dark:shadow-lg border border-border h-[400px] sm:h-[500px] flex flex-col">
        <CardContent className="p-6 sm:p-8 flex flex-col flex-1">
          <div className="flex items-center gap-2 mb-4 sm:mb-6">
            <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-primary" strokeWidth={2.5} />
            <h3 className="font-[Manrope] text-foreground font-extrabold text-xl sm:text-2xl">
              Bu Hafta Trend
            </h3>
          </div>

          <div className="space-y-2">
            {trendingVenues.map((venue, index) => (
              <Link
                key={venue.id}
                href={`/social/venue/${venue.id}`}
                className="flex items-center gap-4 sm:gap-5 py-4 sm:py-5 border-b border-border last:border-b-0 cursor-pointer group"
              >
                {/* Rank Number */}
                <span className="font-[Manrope] text-primary font-black text-3xl sm:text-4xl w-8 sm:w-10 flex-shrink-0">
                  {index + 1}
                </span>

                {/* Venue Info */}
                <div className="flex-1 min-w-0">
                  <h4 className="font-[Manrope] text-foreground mb-1 font-bold text-base sm:text-lg truncate">
                    {venue.name}
                  </h4>
                  <p className="font-[Manrope] text-foreground/50 dark:text-muted-foreground font-medium text-xs sm:text-sm">
                    {venue.category}
                  </p>
                </div>

                {/* Visitors Count */}
                <div className="flex items-center gap-1.5 flex-shrink-0">
                  <Users className="w-4 h-4 text-foreground/40" strokeWidth={2} />
                  <span className="font-[Manrope] text-foreground/60 font-semibold text-sm">
                    {venue.visitors}
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {/* Vote Button */}
          <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-border">
            <Button 
              variant="outline"
              onClick={() => setIsVoteModalOpen(true)}
              className="w-full py-4 sm:py-5 border-2 border-primary rounded-xl font-[Manrope] text-primary hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white transition-all font-bold text-sm sm:text-base cursor-pointer"
            >
              <Vote className="w-5 h-5 sm:w-6 sm:h-6 mr-2" />
              Bu Haftanın Mekanını Oyla
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Vote Modal */}
      <Dialog open={isVoteModalOpen} onOpenChange={setIsVoteModalOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] flex flex-col rounded-2xl p-0">
          <div className="p-6 flex-shrink-0 border-b border-border">
            <DialogHeader>
              <DialogTitle className="font-[Manrope] text-foreground font-extrabold text-xl sm:text-2xl flex items-center gap-2">
                <Vote className="w-6 h-6 text-primary" />
                Bu Haftanın Mekanını Oyla
              </DialogTitle>
            </DialogHeader>
          </div>
          
          <div className="flex-1 overflow-y-auto px-6 py-4">
            <div className="space-y-3">
              {allVenues.map((venue) => (
                <button
                  key={venue.id}
                  onClick={() => setSelectedVenueId(venue.id)}
                  className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                    selectedVenueId === venue.id
                      ? "border-primary bg-primary/10 dark:bg-primary/20"
                      : "border-border hover:border-primary/50 hover:bg-accent dark:hover:bg-accent"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-[Manrope] text-foreground font-bold text-base sm:text-lg">
                          {venue.name}
                        </h4>
                        {selectedVenueId === venue.id && (
                          <Check className="w-5 h-5 text-primary" />
                        )}
                      </div>
                      <p className="font-[Manrope] text-foreground/60 dark:text-muted-foreground font-medium text-sm mb-1">
                        {venue.category}
                      </p>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-primary" />
                          <span className="font-[Manrope] text-foreground/60 dark:text-muted-foreground text-xs">
                            {venue.location}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 text-primary fill-primary" />
                          <span className="font-[Manrope] text-foreground font-bold text-xs">
                            {venue.rating}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="p-6 flex-shrink-0 border-t border-border">
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => {
                  setIsVoteModalOpen(false)
                  setSelectedVenueId(null)
                }}
                className="flex-1 font-[Manrope] font-bold"
              >
                İptal
              </Button>
              <Button
                onClick={handleVote}
                disabled={!selectedVenueId}
                className="flex-1 bg-primary hover:bg-primary/90 text-white font-[Manrope] font-bold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Vote className="w-4 h-4 mr-2" />
                Oyla
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

