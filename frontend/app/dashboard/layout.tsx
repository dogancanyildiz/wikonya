"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"
import { ProfileCard } from "@/components/features/dashboard/profile-card"
import { StatsCard } from "@/components/features/dashboard/stats-card"
import { WalletCard } from "@/components/features/dashboard/wallet-card"
import { SocialResponsibilityCard } from "@/components/features/dashboard/social-responsibility-card"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  // Dashboard sayfasına gidildiğinde scroll pozisyonunu en üste al
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-16 py-4 sm:py-6 md:py-8">
        <div className="space-y-4 sm:space-y-6">
          {/* Top Section: Profile (50%) + Wallet & Stats (50%) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 sm:gap-4 items-stretch">
            {/* Left: Profile Card (50%) */}
            <div className="lg:col-span-1 w-full">
              <ProfileCard />
            </div>

            {/* Right: Wallet & Stats stacked (50%) */}
            <div className="lg:col-span-1 space-y-2 sm:space-y-4 flex flex-col">
              <div className="flex-1">
                <WalletCard />
              </div>
              <StatsCard />
            </div>
          </div>

            {/* Social Responsibility Card */}
            <SocialResponsibilityCard />

          {/* Tab Content - Changes based on route */}
            {children}
        </div>
      </div>
    </div>
  )
}

