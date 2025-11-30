/**
 * LocalStorage Manager - Centralized localStorage management with data migration
 */

const STORAGE_VERSION = "1.0.0"
const STORAGE_VERSION_KEY = "wikonya_storage_version"

/**
 * Get storage version
 */
export function getStorageVersion(): string {
  if (typeof window === "undefined") return STORAGE_VERSION
  return localStorage.getItem(STORAGE_VERSION_KEY) || STORAGE_VERSION
}

/**
 * Set storage version
 */
export function setStorageVersion(version: string): void {
  if (typeof window === "undefined") return
  localStorage.setItem(STORAGE_VERSION_KEY, version)
}

/**
 * Migrate data if needed
 */
export function migrateStorageData(): void {
  if (typeof window === "undefined") return
  
  const currentVersion = getStorageVersion()
  
  // Future migrations can be added here
  if (currentVersion !== STORAGE_VERSION) {
    // Example: Migrate old data format to new format
    // This is a placeholder for future migrations
    
    setStorageVersion(STORAGE_VERSION)
  }
}

/**
 * Safe localStorage get with error handling
 */
export function safeGetItem(key: string): string | null {
  if (typeof window === "undefined") return null
  
  try {
    return localStorage.getItem(key)
  } catch (error) {
    console.error(`Error reading localStorage key "${key}":`, error)
    return null
  }
}

/**
 * Safe localStorage set with error handling
 */
export function safeSetItem(key: string, value: string): boolean {
  if (typeof window === "undefined") return false
  
  try {
    localStorage.setItem(key, value)
    return true
  } catch (error) {
    console.error(`Error writing localStorage key "${key}":`, error)
    // If quota exceeded, try to clean up old data
    if (error instanceof DOMException && error.name === "QuotaExceededError") {
      cleanupOldData()
      try {
        localStorage.setItem(key, value)
        return true
      } catch {
        return false
      }
    }
    return false
  }
}

/**
 * Clean up old data to free space
 */
function cleanupOldData(): void {
  if (typeof window === "undefined") return
  
  try {
    // Keep only last 50 items for history-based keys
    const historyKeys = [
      "conversion_history",
      "referral_history",
      "moderation_history",
      "wiki_history",
    ]
    
    historyKeys.forEach(keyPrefix => {
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i)
        if (key?.startsWith(keyPrefix)) {
          try {
            const data = JSON.parse(localStorage.getItem(key) || "[]")
            if (Array.isArray(data) && data.length > 50) {
              localStorage.setItem(key, JSON.stringify(data.slice(0, 50)))
            }
          } catch {
            // Skip invalid entries
          }
        }
      }
    })
  } catch (error) {
    console.error("Error cleaning up old data:", error)
  }
}

/**
 * Initialize storage on app load
 */
export function initializeStorage(): void {
  if (typeof window === "undefined") return
  
  migrateStorageData()
}

