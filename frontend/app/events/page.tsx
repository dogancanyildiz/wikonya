import type { Metadata } from "next"
import { EventsPage as EventsPageContent } from "@/components/features/events/events-page"

export const metadata: Metadata = {
  title: "Etkinlikler | Konya Genç",
  description: "Konya'daki öğrenci etkinlikleri ve KBB merkezi etkinlikleri. Konserler, tiyatrolar, sosyal aktiviteler ve daha fazlası.",
  openGraph: {
    title: "Etkinlikler | Konya Genç",
    description: "Konya'daki öğrenci etkinlikleri ve KBB merkezi etkinlikleri",
    type: "website",
  },
}

export default function EventsPage() {
  return (
    <div className="min-h-screen bg-background">
      <EventsPageContent />
    </div>
  )
}

