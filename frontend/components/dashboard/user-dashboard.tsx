"use client"

import { useState } from "react"
import { DashboardSidebar } from "./dashboard-sidebar"
import { WalletCard } from "./wallet-card"
import { ProfileCard } from "./profile-card"
import { StatsCard } from "./stats-card"
import { ActivityFeed } from "./activity-feed"

export function UserDashboard() {
  const [activeItem, setActiveItem] = useState("wallet")

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16 py-6 sm:py-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-3">
          <DashboardSidebar activeItem={activeItem} onNavigate={setActiveItem} />
        </div>

        {/* Main Content */}
        <div className="lg:col-span-9 space-y-4 sm:space-y-6">
          {/* Top Section: Wallet + Profile */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            <WalletCard />
            <ProfileCard />
          </div>

          {/* Stats Row */}
          <StatsCard />

          {/* Activity Feed */}
          <ActivityFeed />
        </div>
      </div>
    </div>
  )
}

