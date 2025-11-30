import { JobDetailPage as JobDetailPageContent } from "@/components/features/career/job-detail-page"

export function generateStaticParams() {
  return []
}

export default function JobDetailPage() {
  return (
    <div className="min-h-screen bg-background">
      <JobDetailPageContent />
    </div>
  )
}

