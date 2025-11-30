import { EventDetailPage as EventDetailPageContent } from "@/components/features/events/event-detail-page"

export function generateStaticParams() {
  return []
}

export default function EventDetailPage() {
  return (
    <div className="min-h-screen bg-background">
      <EventDetailPageContent />
    </div>
  )
}

