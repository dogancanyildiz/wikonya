import type { Metadata } from "next"
import { DiscussionPage as DiscussionPageContent } from "@/components/features/discussion/discussion-page"

export const metadata: Metadata = {
  title: "Tartışmalar | Konya Genç",
  description: "Konya'daki üniversite öğrencilerinin sorularını sorduğu ve cevapladığı tartışma platformu. Akademik, barınma, sosyal ve kariyer konularında tartışmalar.",
  openGraph: {
    title: "Tartışmalar | Konya Genç",
    description: "Konya'daki üniversite öğrencilerinin tartışma platformu",
    type: "website",
  },
}

export default function DiscussionPage() {
  return (
    <div className="min-h-screen bg-background">
      <DiscussionPageContent />
    </div>
  )
}

