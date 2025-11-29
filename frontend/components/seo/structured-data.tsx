/**
 * Structured Data (JSON-LD) Component
 * SEO için JSON-LD structured data ekler
 */

interface StructuredDataProps {
  type: "Organization" | "WebSite" | "Article" | "BreadcrumbList"
  data: Record<string, unknown>
}

export function StructuredData({ type, data }: StructuredDataProps) {
  const getStructuredData = () => {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://konyagenç.com"
    
    switch (type) {
      case "Organization":
        return {
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Konya Genç",
          url: baseUrl,
          logo: `${baseUrl}/logo.png`,
          description: "Konya'daki üniversite öğrencilerinin bilgi paylaşım platformu",
          sameAs: [
            // Social media links can be added here
          ],
          ...data,
        }
      
      case "WebSite":
        return {
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "Konya Genç",
          url: baseUrl,
          description: "Konya'daki üniversite öğrencilerinin bilgi paylaşım platformu",
          potentialAction: {
            "@type": "SearchAction",
            target: {
              "@type": "EntryPoint",
              urlTemplate: `${baseUrl}/search?q={search_term_string}`,
            },
            "query-input": "required name=search_term_string",
          },
          ...data,
        }
      
      case "Article":
        return {
          "@context": "https://schema.org",
          "@type": "Article",
          ...data,
        }
      
      case "BreadcrumbList":
        return {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: data.items || [],
        }
      
      default:
        return data
    }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(getStructuredData()) }}
    />
  )
}

