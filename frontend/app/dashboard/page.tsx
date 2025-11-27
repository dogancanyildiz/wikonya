import { ProfileCard } from "@/components/dashboard/profile-card"
import { StatsCard } from "@/components/dashboard/stats-card"
import { ActivityFeed } from "@/components/dashboard/activity-feed"
import { XPProgressBar } from "@/components/dashboard/xp-progress-bar"
import { WalletCard } from "@/components/dashboard/wallet-card"

export default function DashboardPage() {
  return (
    <div className="space-y-4 sm:space-y-6">
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

      {/* Activity Feed - Yorumlar ve gönderiler */}
      <ActivityFeed />
    </div>
  )
}
