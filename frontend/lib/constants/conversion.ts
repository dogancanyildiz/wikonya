/**
 * Conversion Rate Management
 * KBB Admin Panelinden ayarlanabilir dönüşüm oranı sistemi
 */

// Default conversion rate - gerçek uygulamada database'den veya config'den gelecek
export const DEFAULT_CONVERSION_RATE = 100 // 100 GençCoin = 1 Kültür Kart Puanı

/**
 * Conversion rate configuration
 * Gerçek uygulamada bu değerler admin panelinden yönetilecek
 */
export interface ConversionConfig {
  rate: number // GençCoin to Kültür Kart Puanı oranı
  minAmount: number // Minimum dönüştürülebilir miktar
  maxAmountPerDay?: number // Günlük maksimum dönüşüm limiti
  lastUpdated?: string
  updatedBy?: string
}

/**
 * Get current conversion rate
 * Gerçek uygulamada API'den gelecek
 */
export function getConversionRate(): number {
  // Şimdilik default rate döndürüyoruz
  // Gerçek uygulamada: return await api.getConversionRate()
  return DEFAULT_CONVERSION_RATE
}

/**
 * Get conversion config
 * Gerçek uygulamada API'den gelecek
 */
export function getConversionConfig(): ConversionConfig {
  return {
    rate: DEFAULT_CONVERSION_RATE,
    minAmount: DEFAULT_CONVERSION_RATE,
    maxAmountPerDay: 10000, // Günlük maksimum 10,000 GençCoin
    lastUpdated: new Date().toISOString(),
    updatedBy: "admin",
  }
}

