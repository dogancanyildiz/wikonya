/**
 * Performance utilities
 */

import { memo, type ComponentType } from "react"

// Memo wrapper for components
export const withMemo = <P extends object>(Component: ComponentType<P>) => {
  return memo(Component) as ComponentType<P>
}

// Lazy load component wrapper
export const lazyLoad = <P extends object>(
  importFn: () => Promise<{ default: ComponentType<P> }>
) => {
  return importFn
}

// Image optimization settings
export const IMAGE_CONFIG = {
  quality: 85,
  loading: "lazy" as const,
  sizes: "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
} as const

// Debounce utility
export function debounce<T extends (...args: never[]) => void>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null

  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null
      func(...args)
    }

    if (timeout) {
      clearTimeout(timeout)
    }
    timeout = setTimeout(later, wait)
  }
}

// Throttle utility
export function throttle<T extends (...args: never[]) => void>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean

  return function executedFunction(...args: Parameters<T>) {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

