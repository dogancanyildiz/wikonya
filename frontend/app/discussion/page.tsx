import type { Metadata } from "next"
import { DiscussionPage as DiscussionPageContent } from "@/components/features/discussion/discussion-page"

export const metadata: Metadata = {
  title: "Tartışmalar | Konya Genç",
  description: "Konya'daki üniversite öğrencilerinin sorularını sorduğu ve cevapladığı tartışma platformu. Akademik, barınma, sosyal ve kariyer konularında tartışmalar.",
  openGraph: {
    title: "Tartışmalar | Konya Genç",
    description: "Konya'daki üniversite öğrencilerinin tartışma platformu",
    type: "website",
    url: "/discussion",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Tartışmalar | Konya Genç",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tartışmalar | Konya Genç",
    description: "Konya'daki üniversite öğrencilerinin tartışma platformu",
    images: ["/og-image.jpg"],
  },
}

export default function DiscussionPage() {
  return (
    <div className="min-h-screen bg-background">
      <DiscussionPageContent />
    </div>
  )
}

