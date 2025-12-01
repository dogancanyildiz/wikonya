# Konya Genç - Bilgi Evreni

Konya'daki üniversite öğrencilerinin bilgi paylaşım platformu. Akademik kaynaklar, barınma rehberleri, etkinlikler, kariyer fırsatları ve sosyal etkileşim imkanları sunan kapsamlı bir platform.

## 🚀 Özellikler

- **Akademik Destek**: Ders notları, hoca rehberleri, geçmiş sınav soruları ve akademik kaynaklar
- **Kariyer Fırsatları**: Staj, iş ilanları ve burs fırsatları
- **Barınma Rehberi**: Öğrenci evleri, yurtlar ve yaşam rehberleri
- **Etkinlikler**: Üniversite etkinlikleri ve sosyal aktiviteler
- **Keşif**: Konya'daki mekanlar, rotalar ve öneriler
- **Sosyal Platform**: Tartışma forumları, başlıklar ve yorumlar
- **Dashboard**: Kişisel profil, başarımlar, mesajlar ve bildirimler

## 🛠️ Teknoloji Stack

- **Framework**: [Next.js](https://nextjs.org) 16.0.4 (App Router)
- **React**: 19.2.0
- **TypeScript**: 5.x
- **Styling**: [Tailwind CSS](https://tailwindcss.com) 4.x
- **UI Components**: [Shadcn/UI](https://ui.shadcn.com)
- **Form Management**: React Hook Form + Zod
- **State Management**: React Context API
- **Maps**: Leaflet & React Leaflet
- **Charts**: Recharts
- **Package Manager**: pnpm

## 📋 Gereksinimler

- Node.js 20.x veya üzeri
- pnpm 9.x veya üzeri

## 🏃 Başlangıç

### Kurulum

```bash
# Bağımlılıkları yükle
pnpm install
```

### Geliştirme Sunucusu

```bash
pnpm dev
```

Tarayıcıda [http://localhost:3000](http://localhost:3000) adresini açın.

### Production Build

```bash
# Build oluştur
pnpm build

# Production sunucusunu başlat
pnpm start
```

### Linting

```bash
pnpm lint
```

## 📁 Proje Yapısı

```
frontend/
├── app/                    # Next.js App Router sayfaları
│   ├── academic/          # Akademik kaynaklar
│   ├── career/            # Kariyer fırsatları
│   ├── dashboard/        # Kullanıcı dashboard'u
│   ├── housing/           # Barınma rehberleri
│   ├── discovery/         # Keşif ve rotalar
│   ├── social/            # Sosyal platform
│   └── topic/             # Başlıklar ve tartışmalar
│
├── components/
│   ├── ui/                # Shadcn/UI component'leri
│   ├── layout/            # Layout component'leri
│   ├── features/          # Feature-specific component'ler
│   ├── mobile/            # Mobile-specific component'ler
│   ├── forms/             # Form component'leri
│   └── common/            # Ortak component'ler
│
├── lib/
│   ├── api/               # API client ve fonksiyonlar
│   ├── constants/         # Uygulama sabitleri
│   ├── types/             # TypeScript type tanımları
│   ├── utils/             # Utility fonksiyonlar
│   └── validations/       # Zod validation şemaları
│
├── contexts/              # React Context'ler
└── public/                # Statik dosyalar
```

Detaylı yapı için [STRUCTURE.md](./STRUCTURE.md) dosyasına bakın.

## 🎨 Stil Rehberi

- **CSS**: Sadece Tailwind CSS kullanılır, `.css` dosyaları oluşturulmaz
- **Component'ler**: Shadcn/UI component'leri tercih edilir
- **Responsive**: Tüm UI responsive ve erişilebilir olmalıdır
- **Dark Mode**: Next Themes ile dark mode desteği

## 📝 Commit Mesajları

Proje [Conventional Commits](https://www.conventionalcommits.org/) formatını kullanır:

```
<type>(<scope>): <subject>
```

Örnekler:
- `feat(ui): add mode toggle component`
- `fix(api): resolve prisma connection issue`
- `refactor(auth): simplify session logic`
- `chore(config): update environment variables`

Detaylı bilgi için [CONTRIBUTING.md](../CONTRIBUTING.md) dosyasına bakın.

## 🚢 Deployment

### GitHub Pages

Proje GitHub Actions ile otomatik olarak GitHub Pages'e deploy edilir. `main` branch'ine push yapıldığında otomatik build ve deploy işlemi başlar.

### Environment Variables

Production için gerekli environment variable'lar:

```env
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

## 📚 Öğrenme Kaynakları

- [Next.js Dokümantasyonu](https://nextjs.org/docs)
- [Tailwind CSS Dokümantasyonu](https://tailwindcss.com/docs)
- [Shadcn/UI Dokümantasyonu](https://ui.shadcn.com)
- [React Hook Form](https://react-hook-form.com)
- [Zod](https://zod.dev)

## 🤝 Katkıda Bulunma

Katkıda bulunmak için [CONTRIBUTING.md](../CONTRIBUTING.md) dosyasını okuyun.

## 📄 Lisans

Bu proje Konya Büyükşehir Belediyesi tarafından geliştirilmiştir.
