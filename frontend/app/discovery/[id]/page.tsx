import { KonyaDiscoveryDetailPage } from "@/components/features/discovery/konya-discovery-detail-page"

export default async function DiscoveryDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  return (
    <div className="min-h-screen bg-[#f2f4f3] dark:bg-background">
      <KonyaDiscoveryDetailPage placeId={parseInt(id)} />
    </div>
  )
}

