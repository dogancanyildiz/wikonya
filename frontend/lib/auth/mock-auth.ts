/**
 * Mock Authentication System - Geliştirme için mock auth
 * Not: Production'da gerçek auth sistemi kullanılmalı
 */

import { User, UserRole } from "@/lib/types"
import { getUserRole } from "@/lib/gamification/role-system"

/**
 * Mock kullanıcı verileri
 */
const MOCK_USERS: Record<string, User> = {
  "yeni_gelen@example.com": {
    id: 1,
    name: "Yeni Kullanıcı",
    initials: "YK",
    email: "yeni_gelen@example.com",
    role: "yeni_gelen",
    totalCoins: 250,
    badges: [],
    xp: {
      current: 250,
      nextLevel: 500,
      progress: 50,
    },
    joinedAt: new Date().toISOString(),
    location: "Konya",
    bio: "Platformu yeni keşfediyorum!",
  },
  "seyyah@example.com": {
    id: 2,
    name: "Seyyah Kullanıcı",
    initials: "SK",
    email: "seyyah@example.com",
    role: "seyyah",
    totalCoins: 1200,
    badges: [
      {
        id: "first_comment",
        name: "İlk Yorum",
        icon: "💬",
        description: "İlk yorumunu yaptın!",
        earnedAt: new Date().toISOString(),
      },
    ],
    xp: {
      current: 1200,
      nextLevel: 2500,
      progress: 48,
    },
    joinedAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    location: "Meram, Konya",
    bio: "Platforma katkıda bulunmayı seviyorum!",
  },
  "gezgin@example.com": {
    id: 3,
    name: "Gezgin Kullanıcı",
    initials: "GK",
    email: "gezgin@example.com",
    role: "gezgin",
    totalCoins: 5000,
    badges: [
      {
        id: "first_comment",
        name: "İlk Yorum",
        icon: "💬",
        description: "İlk yorumunu yaptın!",
        earnedAt: new Date().toISOString(),
      },
      {
        id: "first_topic",
        name: "İlk Başlık",
        icon: "📝",
        description: "İlk başlığını açtın!",
        earnedAt: new Date().toISOString(),
      },
    ],
    xp: {
      current: 5000,
      nextLevel: 10000,
      progress: 50,
    },
    joinedAt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(),
    location: "Selçuklu, Konya",
    bio: "Güvenilir içerik üreticisi",
  },
  "kasif@example.com": {
    id: 4,
    name: "Kaşif Meraklısı",
    initials: "KM",
    email: "kasif@example.com",
    role: "kasif_meraklisi",
    totalCoins: 25000,
    badges: [
      {
        id: "moderator",
        name: "Moderatör",
        icon: "🛡️",
        description: "Topluluk lideri",
        earnedAt: new Date().toISOString(),
      },
    ],
    xp: {
      current: 25000,
      nextLevel: 50000,
      progress: 50,
    },
    joinedAt: new Date(Date.now() - 180 * 24 * 60 * 60 * 1000).toISOString(),
    location: "Karatay, Konya",
    bio: "Topluluk sağlığını koruyorum",
  },
  "bilge@example.com": {
    id: 5,
    name: "Konya Bilgesi",
    initials: "KB",
    email: "bilge@example.com",
    role: "konya_bilgesi",
    totalCoins: 75000,
    badges: [
      {
        id: "elite",
        name: "Elit",
        icon: "👑",
        description: "Platformun zirvesi",
        earnedAt: new Date().toISOString(),
      },
    ],
    xp: {
      current: 75000,
      nextLevel: 75000,
      progress: 100,
    },
    joinedAt: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).toISOString(),
    location: "Meram, Konya",
    bio: "Usta rehber ve elit katılımcı",
  },
}

/**
 * Mock login fonksiyonu
 */
export async function mockLogin(email: string, password?: string): Promise<User | null> {
  // Simüle edilmiş API çağrısı
  await new Promise((resolve) => setTimeout(resolve, 500))

  const user = MOCK_USERS[email]
  if (!user) {
    throw new Error("Kullanıcı bulunamadı")
  }

  return user
}

/**
 * Mock register fonksiyonu
 */
export async function mockRegister(
  email: string,
  name: string,
  password?: string
): Promise<User> {
  // Simüle edilmiş API çağrısı
  await new Promise((resolve) => setTimeout(resolve, 500))

  // Email'in .edu.tr ile bitip bitmediğini kontrol et (mock validation)
  if (!email.endsWith(".edu.tr") && !email.includes("@example.com")) {
    throw new Error("Sadece üniversite email'i (.edu.tr) veya test email'i kullanılabilir")
  }

  // Yeni kullanıcı oluştur
  const newUser: User = {
    id: Object.keys(MOCK_USERS).length + 1,
    name,
    initials: name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2),
    email,
    role: "yeni_gelen",
    totalCoins: 0,
    badges: [],
    xp: {
      current: 0,
      nextLevel: 500,
      progress: 0,
    },
    joinedAt: new Date().toISOString(),
    location: "Konya",
  }

  // Mock storage'a ekle (gerçek uygulamada backend'e gönderilir)
  MOCK_USERS[email] = newUser

  return newUser
}

/**
 * Mock logout fonksiyonu
 */
export async function mockLogout(): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 200))
}

/**
 * Mock kullanıcı doğrulama (Genç Kültür Kart ID veya email)
 */
export async function mockVerifyUser(
  identifier: string,
  type: "email" | "culture_card_id"
): Promise<boolean> {
  await new Promise((resolve) => setTimeout(resolve, 300))

  if (type === "email") {
    // .edu.tr email kontrolü
    return identifier.endsWith(".edu.tr") || identifier.includes("@example.com")
  }

  // Genç Kültür Kart ID kontrolü (mock)
  return identifier.length >= 6
}

