"use client"

import { usePathname } from "next/navigation"
import { Navbar } from "@/components/layout/navbar"
import { MobileLayout } from "@/components/mobile/mobile-layout"
import { PageTransition } from "@/components/common/page-transition"
import { Toaster } from "@/components/ui/sonner"

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isAuthPage = pathname?.startsWith("/auth")

  if (isAuthPage) {
    return <>{children}</>
  }

  return (
    <>
      <Toaster position="top-right" richColors />
      <div className="hidden md:block">
        <Navbar />
      </div>
      <div>
        <MobileLayout>
          <PageTransition>
            {children}
          </PageTransition>
        </MobileLayout>
      </div>
    </>
  )
}

