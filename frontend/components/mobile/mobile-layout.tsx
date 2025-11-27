"use client"

import { useEffect, useState } from "react"
import { MobileNavbar } from "./mobile-navbar"
import { MobileBottomNav } from "./mobile-bottom-nav"
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

  // Auth sayfalarında bottom nav gösterme
  const hideBottomNav = pathname?.startsWith("/auth/")

  // Mobile görünümde tüm sayfalar için MobileNavbar ve MobileBottomNav ekle
  if (isMobile) {
    return (
      <>
        <MobileNavbar />
        <div className={`min-h-screen bg-[#f2f4f3] dark:bg-background ${!hideBottomNav ? "pb-20 sm:pb-24" : ""}`}>
          {children}
        </div>
        {!hideBottomNav && <MobileBottomNav />}
      </>
    )
  }

  // Desktop görünüm
  return <>{children}</>
}

