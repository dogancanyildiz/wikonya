import { VenueDetailPage as VenueDetailPageContent } from "@/components/features/social/venue-detail-page"

export function generateStaticParams() {
  return []
}

export default function VenueDetailPage() {
  return (
    <div className="min-h-screen bg-background">
      <VenueDetailPageContent />
    </div>
  )
}

