# Proje Klasör Yapısı

## Yeni Yapı

```
frontend/
├── app/                          # Next.js App Router
│   ├── (routes)/                # Sayfa route'ları
│   │   ├── academic/
│   │   ├── career/
│   │   ├── dashboard/
│   │   ├── housing/
│   │   ├── kesif/
│   │   ├── social/
│   │   └── topic/
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Ana sayfa
│   ├── loading.tsx              # Global loading
│   ├── error.tsx                # Error page
│   ├── not-found.tsx            # 404 page
│   └── globals.css              # Global styles
│
├── components/
│   ├── ui/                      # shadcn/ui components
│   ├── layout/                  # Layout components
│   │   ├── hero.tsx
│   │   ├── navbar.tsx
│   │   ├── sidebar.tsx
│   │   ├── mode-toggle.tsx
│   │   └── theme-provider.tsx
│   ├── features/                # Feature-specific components
│   │   ├── home/
│   │   │   └── discussion-feed.tsx
│   │   ├── academic/
│   │   ├── career/
│   │   ├── dashboard/
│   │   ├── housing/
│   │   ├── kesif/
│   │   ├── social/
│   │   └── topic/
│   ├── mobile/                  # Mobile-specific components
│   ├── forms/                   # Form components
│   └── common/                  # Shared/common components
│       ├── error-boundary.tsx
│       ├── page-transition.tsx
│       ├── image-with-fallback.tsx
│       └── icons/
│           └── coin-icon.tsx
│
├── lib/
│   ├── api/                     # API client & functions
│   │   ├── client.ts
│   │   └── index.ts
│   ├── constants/               # App constants
│   │   └── index.ts
│   ├── types/                   # TypeScript types
│   │   └── index.ts
│   ├── utils/                   # Utility functions
│   │   ├── accessibility.ts
│   │   ├── performance.ts
│   │   └── hooks/
│   │       └── use-mobile.ts
│   ├── utils.ts                 # shadcn/ui utils (cn function)
│   └── validations/              # Zod schemas
│       └── index.ts
│
├── contexts/                    # React contexts
│   └── app-context.tsx
│
└── public/                      # Static assets
```

## Organizasyon Prensipleri

1. **Layout Components**: Navbar, sidebar, hero gibi layout component'leri `components/layout/` altında
2. **Feature Components**: Her feature için ayrı klasör (`components/features/`)
3. **Common Components**: Paylaşılan component'ler `components/common/` altında
4. **Mobile Components**: Mobile-specific component'ler `components/mobile/` altında
5. **Utils**: Utility fonksiyonlar `lib/utils/` altında organize edildi
6. **Hooks**: Custom hook'lar `lib/utils/hooks/` altında

## İyileştirmeler

- ✅ Root level component'ler organize edildi
- ✅ Layout component'leri ayrı klasöre taşındı
- ✅ Feature component'leri features/ altında gruplandı
- ✅ Common component'ler common/ altında toplandı
- ✅ Utility dosyalar lib/utils/ altında organize edildi
- ✅ Hooks lib/utils/hooks/ altına taşındı
- ✅ figma/ klasörü kaldırıldı, dosyalar common/ altına taşındı
