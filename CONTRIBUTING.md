# Contributing Guide

Bu dokümantasyon, projeye katkıda bulunurken takip edilmesi gereken commit ve branch yapısını açıklar.

## Branch Stratejisi

Proje, Git Flow benzeri bir branch stratejisi kullanmaktadır. Aşağıdaki branch'ler kullanılır:

### Ana Branch'ler

- **`main`**: Production'a hazır, stabil kod. Her zaman deploy edilebilir durumda olmalıdır.
- **`develop`**: Geliştirme branch'i. Tüm feature'lar buraya merge edilir.

### Feature Branch'leri

- **`feature/*`**: Yeni özellikler için kullanılır.
  - Örnek: `feature/user-authentication`, `feature/dark-mode`
  - `develop` branch'inden oluşturulur ve `develop`'a merge edilir.

### Release Branch'leri

- **`release/*`**: Production release hazırlığı için kullanılır.
  - Örnek: `release/v1.0.0`, `release/v1.1.0`
  - `develop` branch'inden oluşturulur.
  - Hem `main` hem de `develop`'a merge edilir.

### Hotfix Branch'leri

- **`hotfix/*`**: Production'daki kritik hataların düzeltilmesi için kullanılır.
  - Örnek: `hotfix/security-patch`, `hotfix/critical-bug`
  - `main` branch'inden oluşturulur.
  - Hem `main` hem de `develop`'a merge edilir.

### Test & QA Branch'i

- **`t&q`**: Test ve kalite kontrolü için kullanılır.
  - Release öncesi testler bu branch'te yapılır.

## Commit Mesaj Formatı

Proje, [Conventional Commits](https://www.conventionalcommits.org/) formatını kullanır.

### Format

```
<type>(<scope>): <subject>

[optional body]

[optional footer]
```

### Commit Types

- **`feat`**: Yeni bir özellik ekler
  - Örnek: `feat(ui): add mode toggle component`
  - Örnek: `feat(auth): implement user login`

- **`fix`**: Bir hata düzeltir
  - Örnek: `fix(lint): resolve unused variable warning`
  - Örnek: `fix(api): handle null response correctly`

- **`docs`**: Dokümantasyon değişiklikleri
  - Örnek: `docs: add contributing guide`
  - Örnek: `docs(readme): update installation steps`

- **`style`**: Kod formatı, noktalama, eksik noktalı virgül vb. (kod mantığını etkilemeyen)
  - Örnek: `style: format code with prettier`
  - Örnek: `style(components): fix indentation`

- **`refactor`**: Kod refaktörü (ne hata düzeltir ne de özellik ekler)
  - Örnek: `refactor(auth): simplify session logic`
  - Örnek: `refactor(utils): extract common functions`

- **`perf`**: Performans iyileştirmeleri
  - Örnek: `perf(api): optimize database queries`
  - Örnek: `perf(ui): reduce bundle size`

- **`test`**: Test ekleme veya düzeltme
  - Örnek: `test(utils): add unit tests for helpers`
  - Örnek: `test(api): fix integration test`

- **`chore`**: Build süreçleri, araçlar, bağımlılıklar vb.
  - Örnek: `chore(deps): update dependencies`
  - Örnek: `chore(config): add eslint configuration`
  - Örnek: `chore(ci): add GitHub Actions workflow`

- **`ci`**: CI/CD yapılandırma değişiklikleri
  - Örnek: `ci: add GitHub Actions workflow`
  - Örnek: `ci: update build configuration`

### Scope (Opsiyonel)

Scope, commit'in etkilediği alanı belirtir. Örnekler:

- `ui`: UI component'leri
- `api`: API endpoint'leri
- `auth`: Authentication
- `theme`: Tema sistemi
- `config`: Yapılandırma dosyaları
- `deps`: Bağımlılıklar
- `lint`: Linting
- `build`: Build süreçleri

### Subject

- İlk harf küçük olmalı
- Nokta ile bitmemeli
- Emir kipi kullanılmalı (add, fix, update, remove vb.)
- 50 karakteri geçmemeli (mümkünse)

### Örnek Commit Mesajları

```bash
feat(ui): add mode toggle component
fix(lint): resolve unused variable warning
docs: add contributing guide
chore(deps): update next.js to latest version
refactor(auth): simplify session management
perf(api): optimize database queries
test(utils): add unit tests for helpers
ci: add GitHub Actions workflow
```

## CI/CD

GitHub Actions, aşağıdaki durumlarda otomatik olarak çalışır:

### Push Trigger'ları

- `main`
- `develop`
- `feature/*`
- `release/*`
- `hotfix/*`
- `t&q`

### Pull Request Trigger'ları

- `main`
- `develop`
- `release/*`
- `t&q`

### CI İşlemleri

1. **Lint and Type Check**: ESLint ve TypeScript type checking
2. **Build**: Next.js production build kontrolü

Tüm CI işlemleri başarılı olmalıdır, aksi takdirde merge edilemez.

## Workflow Örnekleri

### Yeni Feature Ekleme

```bash
# develop'den feature branch oluştur
git checkout develop
git pull origin develop
git checkout -b feature/new-feature

# Değişiklikleri yap ve commit et
git add .
git commit -m "feat(feature): add new feature"

# Push et ve PR oluştur
git push origin feature/new-feature
```

### Hotfix Oluşturma

```bash
# main'den hotfix branch oluştur
git checkout main
git pull origin main
git checkout -b hotfix/critical-bug

# Düzeltmeyi yap ve commit et
git add .
git commit -m "fix(bug): resolve critical issue"

# Push et ve PR oluştur
git push origin hotfix/critical-bug
```

### Release Hazırlama

```bash
# develop'den release branch oluştur
git checkout develop
git pull origin develop
git checkout -b release/v1.0.0

# Release notlarını güncelle, version bump yap
git add .
git commit -m "chore(release): prepare v1.0.0"

# Push et
git push origin release/v1.0.0
```

## İpuçları

1. **Küçük ve odaklı commit'ler yapın**: Her commit tek bir değişikliği temsil etmelidir.
2. **Açıklayıcı mesajlar yazın**: Commit mesajı, değişikliğin nedenini ve ne yaptığını açıklamalıdır.
3. **CI'ı geçmeden merge etmeyin**: Tüm testler ve lint kontrolleri başarılı olmalıdır.
4. **Branch'leri güncel tutun**: Merge etmeden önce base branch'i pull edin.
5. **Pull Request'lerde açıklama yapın**: PR açıklaması, değişiklikleri ve test durumunu içermelidir.

