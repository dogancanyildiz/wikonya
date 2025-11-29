import type { Metadata } from "next"
import { Hero } from "@/components/layout/hero"
import { DiscussionFeed } from "@/components/features/home/discussion-feed"
import { Sidebar } from "@/components/layout/sidebar"
import { PopularComments } from "@/components/features/home/popular-comments"
import { KBBAnnouncements } from "@/components/features/home/kbb-announcements"
import { StructuredData } from "@/components/seo/structured-data"

export const metadata: Metadata = {
  title: "Ana Sayfa | Konya Genç - Bilgi Evreni",
  description: "Konya'daki üniversite öğrencilerinin bilgi paylaşım platformu. Akademik kaynaklar, barınma rehberleri, etkinlikler ve daha fazlası.",
  openGraph: {
    title: "Konya Genç - Bilgi Evreni",
    description: "Konya'daki üniversite öğrencilerinin bilgi paylaşım platformu",
    type: "website",
    url: "/",
    siteName: "Konya Genç",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Konya Genç - Bilgi Evreni",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Konya Genç - Bilgi Evreni",
    description: "Konya'daki üniversite öğrencilerinin bilgi paylaşım platformu",
    images: ["/og-image.jpg"],
  },
}

export default function Home() {
  return (
    <>
      <StructuredData
        type="Organization"
        data={{
          name: "Konya Genç",
          description: "Konya'daki üniversite öğrencilerinin bilgi paylaşım platformu",
        }}
      />
      <StructuredData
        type="WebSite"
        data={{}}
      />
      <div className="min-h-screen bg-background">
        <Hero />
        
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          {/* KBB Announcements */}
          <div className="mt-6 sm:mt-8 md:mt-10 mb-6 sm:mb-8">
            <KBBAnnouncements />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-10 mt-6 sm:mt-8 pb-16 md:pb-20">
            <div className="lg:col-span-8 space-y-6 sm:space-y-8">
              {/* Discussion Feed */}
              <DiscussionFeed />

              {/* Popular Comments */}
              <PopularComments />
            </div>
            <aside className="hidden lg:block lg:col-span-4">
              <Sidebar />
            </aside>
          </div>
        </div>
      </div>
    </>
  )
}
