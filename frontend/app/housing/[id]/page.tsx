import { HousingDetailPage as HousingDetailPageContent } from "@/components/features/housing/housing-detail-page"

export function generateStaticParams() {
  return []
}

export default function HousingDetailPage() {
  return (
    <div className="min-h-screen bg-background">
      <HousingDetailPageContent />
    </div>
  )
}

