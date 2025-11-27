/**
 * Accessibility utilities and constants
 */

// ARIA labels for common actions
export const ARIA_LABELS = {
  search: "Arama kutusu",
  searchButton: "Ara",
  like: "Beğen",
  unlike: "Beğenmeyi geri al",
  comment: "Yorum yap",
  share: "Paylaş",
  bookmark: "Yer imlerine ekle",
  unbookmark: "Yer imlerinden çıkar",
  favorite: "Favorilere ekle",
  unfavorite: "Favorilerden çıkar",
  close: "Kapat",
  open: "Aç",
  menu: "Menü",
  navigation: "Navigasyon",
  main: "Ana içerik",
  footer: "Alt bilgi",
  skipToContent: "İçeriğe atla",
} as const

// Keyboard shortcuts
export const KEYBOARD_SHORTCUTS = {
  search: "Ctrl+K",
  escape: "Escape",
  enter: "Enter",
} as const

// Focus management
export const focusElement = (element: HTMLElement | null) => {
  if (element) {
    element.focus()
    element.scrollIntoView({ behavior: "smooth", block: "nearest" })
  }
}

// Skip to content link component (use in .tsx files)
export const skipToContentClassName = "sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md"

