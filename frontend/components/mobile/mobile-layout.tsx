"use client"

import { useEffect, useState } from "react"
import { MobileHomePage } from "./mobile-home-page"
import { MobileTopicDetailPage } from "./mobile-topic-detail-page"
import { MobileNavbar } from "./mobile-navbar"
import { usePathname } from "next/navigation"

interface MobileLayoutProps {
  children: React.ReactNode
}

export function MobileLayout({ children }: MobileLayoutProps) {
  const [isMobile, setIsMobile] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // Mobile görünümde özel sayfalar
  if (isMobile) {
    if (pathname === "/") {
      return <MobileHomePage />
    }
    if (pathname.startsWith("/topic/")) {
      const topicId = pathname.split("/topic/")[1]
      return <MobileTopicDetailPage topicId={topicId} />
    }
    // Diğer mobil sayfalar için MobileNavbar ekle
    return (
      <>
        <MobileNavbar />
        {children}
      </>
    )
  }

  // Desktop görünüm veya diğer sayfalar
  return <>{children}</>
}

