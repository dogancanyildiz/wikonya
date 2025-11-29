import type { Metadata } from "next"
import { ProfileCard } from "@/components/features/dashboard/profile-card"
import { StatsCard } from "@/components/features/dashboard/stats-card"
import { ActivityFeed } from "@/components/features/dashboard/activity-feed"
import { WalletCard } from "@/components/features/dashboard/wallet-card"
import { SocialResponsibilityCard } from "@/components/features/dashboard/social-responsibility-card"

export const metadata: Metadata = {
  title: "Dashboard | Konya Genç",
  description: "Konya Genç kullanıcı dashboard'u. Profil, coin bakiyesi, aktiviteler ve katkılarınızı görüntüleyin.",
  openGraph: {
    title: "Dashboard | Konya Genç",
    description: "Kullanıcı dashboard'u - Profil, coin bakiyesi ve aktiviteler",
    type: "website",
    url: "/dashboard",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Dashboard | Konya Genç",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dashboard | Konya Genç",
    description: "Kullanıcı dashboard'u - Profil, coin bakiyesi ve aktiviteler",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: false,
    follow: false,
  },
}

export default function DashboardPage() {
  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Top Section: Profile (50%) + Wallet & Stats (50%) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-stretch">
        {/* Left: Profile Card (50%) */}
        <div className="lg:col-span-1 flex">
          <ProfileCard />
        </div>

        {/* Right: Wallet & Stats stacked (50%) */}
        <div className="lg:col-span-1 space-y-4 flex flex-col">
          <div className="flex-1">
            <WalletCard />
          </div>
          <StatsCard />
        </div>
      </div>


      {/* Social Responsibility Card */}
      <div className="mt-6 sm:mt-8">
        <SocialResponsibilityCard />
      </div>

      {/* Activity Feed - Yorumlar ve gönderiler */}
      <ActivityFeed />
    </div>
  )
}
