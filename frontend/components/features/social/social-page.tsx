import { SocialHero } from "./social-hero"
import { VenueGrid } from "./venue-grid"
import { CommunityEvents } from "./community-events"

export function SocialPage() {
  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-16 py-6 sm:py-8 md:py-10">
      <div className="mb-6 sm:mb-8 md:mb-10">
        <h1 className="font-[Manrope] text-foreground mb-2 font-extrabold text-2xl sm:text-3xl md:text-4xl lg:text-[42px]">
          Sosyal Yaşam & Mekan Rehberi
        </h1>
        <p className="font-[Manrope] text-foreground/60 dark:text-muted-foreground font-medium text-sm sm:text-base">
          Konya&apos;nın en iyi kafelerini, çalışma alanlarını ve sosyal mekanlarını keşfet
        </p>
      </div>

      <SocialHero />

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-4 sm:gap-6 lg:gap-8">
        <VenueGrid />
        <div className="hidden lg:block">
          <CommunityEvents />
        </div>
      </div>
    </div>
  )
}

