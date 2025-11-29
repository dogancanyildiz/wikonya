/**
 * Application-wide constants
 */

// Colors
export const COLORS = {
  primary: "#03624c",
  textPrimary: "#4d4d4d",
  backgroundLight: "#f2f4f3",
  white: "#ffffff",
} as const

// Routes
export const ROUTES = {
  home: "/",
  academic: "/academic",
  social: "/social",
  housing: "/housing",
  career: "/career",
  discovery: "/discovery",
  dashboard: "/dashboard",
  topic: (id: string | number) => `/topic/${id}`,
} as const

// Navigation Menu Items
export const NAV_MENU_ITEMS = [
  { id: "akademik", label: "Akademik", href: ROUTES.academic },
  { id: "sosyal", label: "Sosyal Yaşam & Mekan", href: ROUTES.social },
  { id: "barinma", label: "Barınma & Yaşam", href: ROUTES.housing },
  { id: "kariyer", label: "Kariyer & Gelişim", href: ROUTES.career },
  { id: "discovery", label: "Konya Keşif", href: ROUTES.discovery },
] as const

// Breakpoints
export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
} as const

// API Configuration
export const API_CONFIG = {
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api",
  timeout: 30000,
  retries: 3,
} as const

// Pagination
export const PAGINATION = {
  defaultPageSize: 10,
  maxPageSize: 100,
} as const

// Categories
export const CATEGORIES = {
  academic: "Akademik",
  social: "Sosyal",
  housing: "Barınma",
  career: "Kariyer",
} as const

// Job Types
export const JOB_TYPES = {
  partTime: "Part-Time",
  fullTime: "Full-Time",
  remote: "Remote",
  hybrid: "Hybrid",
} as const

// Housing Categories
export const HOUSING_CATEGORIES = [
  { id: "government", label: "Devlet Yurdu" },
  { id: "private", label: "Özel Yurt" },
  { id: "student", label: "Öğrenciye Özel Daire" },
] as const

// Scholarship Types
export const SCHOLARSHIP_TYPES = {
  merit: "Merit",
  needBased: "Need-Based",
  athletic: "Athletic",
  government: "Government",
} as const

// Crowd Levels
export const CROWD_LEVELS = {
  low: "low",
  medium: "medium",
  high: "high",
} as const

// Universities
export const UNIVERSITIES = [
  {
    id: "selcuk",
    name: "Selçuk Üniversitesi",
    abbr: "SÜ",
    description: "Konya'nın en köklü devlet üniversitesi. Geniş akademik program yelpazesi ve güçlü araştırma altyapısı ile öne çıkar.",
    location: "Selçuklu, Konya",
    students: "70,000+",
    established: "1975",
  },
  {
    id: "neu",
    name: "Necmettin Erbakan Üniversitesi",
    abbr: "NEÜ",
    description: "Modern eğitim anlayışı ve yenilikçi programları ile öğrencilere kapsamlı akademik imkanlar sunar.",
    location: "Meram, Konya",
    students: "45,000+",
    established: "2010",
  },
  {
    id: "kto",
    name: "KTO Karatay Üniversitesi",
    abbr: "KTO",
    description: "Özel üniversite olarak hizmet veren, iş dünyası ile güçlü bağları olan modern bir eğitim kurumu.",
    location: "Karatay, Konya",
    students: "8,000+",
    established: "2008",
  },
  {
    id: "ktun",
    name: "Konya Teknik Üniversitesi",
    abbr: "KTÜN",
    description: "Teknik ve mühendislik alanlarında uzmanlaşmış, modern laboratuvarları ve güçlü endüstri işbirlikleri ile öne çıkan üniversite.",
    location: "Selçuklu, Konya",
    students: "15,000+",
    established: "2018",
  },
  {
    id: "kgtu",
    name: "Konya Gıda ve Tarım Üniversitesi",
    abbr: "KGTÜ",
    description: "Gıda bilimleri ve tarım alanlarında öncü, araştırma odaklı bir üniversite. Sürdürülebilir tarım ve gıda güvenliği konularında uzmanlaşmış.",
    location: "Meram, Konya",
    students: "3,500+",
    established: "2010",
  },
] as const

// App Configuration
export const APP_CONFIG = {
  name: "Konya Genç",
  description: "Konya'nın Bilgi Evreni - Öğrencilerin bilgi paylaşım platformu",
  version: "0.1.0",
} as const

// Default Avatar
export const DEFAULT_AVATAR_URL = "https://media.licdn.com/dms/image/v2/D4D03AQEY4vuxF4orog/profile-displayphoto-scale_200_200/B4DZio9EDTHYAY-/0/1755181238136?e=1766016000&v=beta&t=jxL9zX1LRCK0VnDRBhBi1min-Hoe4bREKGmMpqy3VbA"

// User Roles & Gamification
export const USER_ROLES = {
  yeni_gelen: {
    id: "yeni_gelen",
    name: "Yeni Gelen",
    minCoins: 0,
    maxCoins: 500,
    multiplier: 1.0,
    description: "Meraklı Gözlemci",
    canCreateTopic: false,
    canEditWiki: false,
    canEditWikiProposal: true,
    canModerate: false,
    commentLimitPerHour: 5,
  },
  seyyah: {
    id: "seyyah",
    name: "Seyyah",
    minCoins: 501,
    maxCoins: 2500,
    multiplier: 1.2,
    description: "Katkıda Bulunan",
    canCreateTopic: false,
    canEditWiki: true,
    canEditWikiProposal: false,
    canModerate: false,
    commentLimitPerHour: null, // No limit
  },
  gezgin: {
    id: "gezgin",
    name: "Gezgin",
    minCoins: 2501,
    maxCoins: 10000,
    multiplier: 1.5,
    description: "Güvenilir İçerik Üretici",
    canCreateTopic: true,
    canEditWiki: true,
    canEditWikiProposal: false,
    canModerate: false,
    commentLimitPerHour: null,
  },
  kasif_meraklisi: {
    id: "kasif_meraklisi",
    name: "Kaşif Meraklısı",
    minCoins: 10001,
    maxCoins: 50000,
    multiplier: 2.0,
    description: "Topluluk Lideri / Moderatör",
    canCreateTopic: true,
    canEditWiki: true,
    canEditWikiProposal: false,
    canModerate: true,
    canApproveProposals: true,
    commentLimitPerHour: null,
  },
  konya_bilgesi: {
    id: "konya_bilgesi",
    name: "Konya Bilgesi",
    minCoins: 50001,
    maxCoins: Infinity,
    multiplier: 2.5,
    description: "Usta Rehber / Elit Katılımcı",
    canCreateTopic: true,
    canEditWiki: true,
    canEditWikiProposal: false,
    canModerate: true,
    canApproveProposals: true,
    canAccessAdminPanel: true,
    commentLimitPerHour: null,
  },
} as const

// Coin Earning Matrix (Base points for "Yeni Gelen" role)
// Not: wikiVoteUseful ve wikiVoteNotUseful artık wiki_received_useful_vote ve wiki_received_not_useful_vote için kullanılıyor
// Oy veren kullanıcı coin kazanmaz, oy alan (düzenleyen/yorum yazan) kullanıcı coin kazanır/kaybeder
export const COIN_MATRIX = {
  createTopic: 20,
  editWiki: 10,
  comment: 2,
  wikiVoteUseful: 5, // Wiki düzenleyen kullanıcı yararlı oy aldığında
  wikiVoteNotUseful: -10, // Wiki düzenleyen kullanıcı yararsız oy aldığında
  commentLike: 1, // Yorum sahibi beğeni aldığında
  commentLogical: 2,
  socialResponsibilityProject: 100,
} as const

// Role Display Names (Turkish)
export const ROLE_DISPLAY_NAMES: Record<string, string> = {
  yeni_gelen: "Yeni Gelen",
  seyyah: "Seyyah",
  gezgin: "Gezgin",
  kasif_meraklisi: "Kaşif Meraklısı",
  konya_bilgesi: "Konya Bilgesi",
} as const

