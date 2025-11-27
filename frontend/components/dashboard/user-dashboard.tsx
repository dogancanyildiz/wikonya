"use client"

import { useState } from "react"
import { DashboardSidebar } from "./dashboard-sidebar"
import { WalletCard } from "./wallet-card"
import { ProfileCard } from "./profile-card"
import { StatsCard } from "./stats-card"
import { ActivityFeed } from "./activity-feed"
import { XPProgressBar } from "./xp-progress-bar"
import { ContributionsTab } from "./contributions-tab"
import { CoinConverter } from "./coin-converter"
import { ReferralSystem } from "./referral-system"

export function UserDashboard() {
  const [activeItem, setActiveItem] = useState("wallet")

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-16 py-4 sm:py-6 md:py-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 lg:gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-3">
          <DashboardSidebar activeItem={activeItem} onNavigate={setActiveItem} />
        </div>

        {/* Main Content */}
        <div className="lg:col-span-9 space-y-4 sm:space-y-6">
          {/* Top Section: Profile (50%) + Wallet & Stats (50%) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 items-stretch">
            {/* Left: Profile Card (50%) */}
            <div className="lg:col-span-1 flex">
              <ProfileCard />
            </div>

            {/* Right: Wallet & Stats stacked (50%) */}
            <div className="lg:col-span-1 space-y-[10px] flex flex-col">
              <div className="flex-1">
                <WalletCard />
              </div>
              <StatsCard />
            </div>
          </div>

          {/* XP Progress Bar */}
          <div className="mt-4 sm:mt-6">
            <XPProgressBar />
          </div>

          {/* Coin Converter */}
          {activeItem === "convert" && (
            <CoinConverter />
          )}

          {/* Referral System */}
          {activeItem === "referral" && (
            <ReferralSystem />
          )}

          {/* Contributions Tab */}
          {activeItem === "contributions" && (
            <ContributionsTab />
          )}

          {/* Activity Feed */}
          {activeItem === "wallet" && (
            <ActivityFeed />
          )}
        </div>
      </div>
    </div>
  )
}

