/**
 * Accessibility utilities for ARIA labels and keyboard navigation
 */

export const ARIA_LABELS = {
  // Navigation
  mainNav: "Ana navigasyon",
  mobileNav: "Mobil navigasyon",
  breadcrumb: "Breadcrumb navigasyonu",
  
  // Actions
  search: "Ara",
  searchInput: "Arama kutusu",
  filter: "Filtrele",
  sort: "Sırala",
  close: "Kapat",
  open: "Aç",
  save: "Kaydet",
  delete: "Sil",
  edit: "Düzenle",
  share: "Paylaş",
  bookmark: "Favorilere ekle",
  unbookmark: "Favorilerden çıkar",
  like: "Beğen",
  unlike: "Beğeniyi geri al",
  follow: "Takip et",
  unfollow: "Takip etmeyi bırak",
  
  // Content
  topic: "Başlık",
  comment: "Yorum",
  user: "Kullanıcı profili",
  image: "Görsel",
  video: "Video",
  
  // Forms
  submit: "Gönder",
  cancel: "İptal",
  next: "Sonraki",
  previous: "Önceki",
  
  // Status
  loading: "Yükleniyor",
  error: "Hata",
  success: "Başarılı",
} as const

/**
 * Generate ARIA label for pagination
 */
export function getPaginationLabel(currentPage: number, totalPages: number): string {
  return `Sayfa ${currentPage} / ${totalPages}`
}

/**
 * Generate ARIA label for filter
 */
export function getFilterLabel(filterName: string, isActive: boolean): string {
  return `${filterName} filtresi${isActive ? " (aktif)" : ""}`
}

/**
 * Generate ARIA label for sort option
 */
export function getSortLabel(sortName: string, isActive: boolean): string {
  return `${sortName} sıralama${isActive ? " (aktif)" : ""}`
}

/**
 * Keyboard navigation helpers
 */
export const KEYBOARD_KEYS = {
  ENTER: "Enter",
  SPACE: " ",
  ESCAPE: "Escape",
  ARROW_UP: "ArrowUp",
  ARROW_DOWN: "ArrowDown",
  ARROW_LEFT: "ArrowLeft",
  ARROW_RIGHT: "ArrowRight",
  TAB: "Tab",
  HOME: "Home",
  END: "End",
} as const

/**
 * Handle keyboard navigation for interactive elements
 */
export function handleKeyboardNavigation(
  event: React.KeyboardEvent,
  onEnter?: () => void,
  onEscape?: () => void,
  onArrowUp?: () => void,
  onArrowDown?: () => void
) {
  switch (event.key) {
    case KEYBOARD_KEYS.ENTER:
    case KEYBOARD_KEYS.SPACE:
      event.preventDefault()
      onEnter?.()
      break
    case KEYBOARD_KEYS.ESCAPE:
      event.preventDefault()
      onEscape?.()
      break
    case KEYBOARD_KEYS.ARROW_UP:
      event.preventDefault()
      onArrowUp?.()
      break
    case KEYBOARD_KEYS.ARROW_DOWN:
      event.preventDefault()
      onArrowDown?.()
      break
  }
}

/**
 * Focus management utilities
 */
export function focusElement(element: HTMLElement | null) {
  if (element) {
    element.focus()
    element.scrollIntoView({ behavior: "smooth", block: "nearest" })
  }
}

export function trapFocus(container: HTMLElement | null) {
  if (!container) return

  const focusableElements = container.querySelectorAll<HTMLElement>(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  )
  
  const firstElement = focusableElements[0]
  const lastElement = focusableElements[focusableElements.length - 1]

  const handleTab = (e: KeyboardEvent) => {
    if (e.key !== KEYBOARD_KEYS.TAB) return

    if (e.shiftKey) {
      if (document.activeElement === firstElement) {
        e.preventDefault()
        lastElement?.focus()
      }
    } else {
      if (document.activeElement === lastElement) {
        e.preventDefault()
        firstElement?.focus()
      }
    }
  }

  container.addEventListener("keydown", handleTab)
  
  return () => {
    container.removeEventListener("keydown", handleTab)
  }
}
