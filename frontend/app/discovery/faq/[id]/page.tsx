import { FAQDetailPage } from "@/components/features/discovery/faq-detail-page"

export function generateStaticParams() {
  return []
}

export default async function DiscoveryFAQPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  return (
    <div className="min-h-screen bg-background">
      <FAQDetailPage faqId={parseInt(id)} />
    </div>
  )
}

