import { SocialHero } from "./social-hero"
import { SocialFilterChips } from "./social-filter-chips"
import { VenueGrid } from "./venue-grid"
import { CommunityEvents } from "./community-events"

export function SocialPage() {
  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16 py-6 sm:py-8">
      <div className="mb-6 sm:mb-8">
        <h1 className="font-[Manrope] text-[#4d4d4d] dark:text-foreground mb-2 font-extrabold text-3xl sm:text-4xl lg:text-[42px]">
          Sosyal Yaşam & Mekan Rehberi
        </h1>
        <p className="font-[Manrope] text-[#4d4d4d]/60 dark:text-muted-foreground font-medium text-sm sm:text-base">
          Konya&apos;nın en iyi kafelerini, çalışma alanlarını ve sosyal mekanlarını keşfet
        </p>
      </div>

      <SocialHero />
      <SocialFilterChips />

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6 sm:gap-8">
        <VenueGrid />
        <CommunityEvents />
      </div>
    </div>
  )
}

