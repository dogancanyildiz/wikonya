import type { Metadata } from "next"
import { ContributionsTab } from "@/components/features/dashboard/contributions-tab"

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
  return <ContributionsTab />
}
