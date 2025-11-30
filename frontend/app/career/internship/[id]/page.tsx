import { InternshipDetailPage as InternshipDetailPageContent } from "@/components/features/career/internship-detail-page"

export function generateStaticParams() {
  return []
}

export default function InternshipDetailPage() {
  return (
    <div className="min-h-screen bg-background">
      <InternshipDetailPageContent />
    </div>
  )
}

