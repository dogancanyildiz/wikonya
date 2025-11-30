"use client"

import { motion } from "framer-motion"
import { usePathname } from "next/navigation"
import { ReactNode, useEffect, useState, useRef } from "react"

interface PageTransitionProps {
  children: ReactNode
}

export function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname()
  const [isFirstRender, setIsFirstRender] = useState(true)
  const prevPathnameRef = useRef<string | null>(null)

  // Track first render to skip animation on initial load
  // This pattern is necessary for page transition behavior
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- Necessary for page transition behavior
    setIsFirstRender(false)
  }, [])

  // Dashboard sayfaları arasında geçiş yapıldığında animasyonu devre dışı bırak
  const [isDashboardTransition, setIsDashboardTransition] = useState(false)
  const isDashboardRoute = pathname?.startsWith("/dashboard")

  useEffect(() => {
    const prevPathname = prevPathnameRef.current
    const isPrevDashboardRoute = prevPathname?.startsWith("/dashboard")
    const shouldDisableTransition = Boolean(isDashboardRoute && isPrevDashboardRoute && pathname !== prevPathname)
    // eslint-disable-next-line react-hooks/set-state-in-effect -- Necessary for dashboard transition detection
    setIsDashboardTransition(shouldDisableTransition)
    prevPathnameRef.current = pathname
  }, [pathname, isDashboardRoute])

  if (isFirstRender) {
    return <>{children}</>
  }

  // Dashboard sayfaları arasında geçiş yapıldığında animasyon yok
  if (isDashboardTransition) {
    return <>{children}</>
  }

  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: .8,
        ease: [0.25, 0.1, 0.25, 1],
      }}
    >
      {children}
    </motion.div>
  )
}

