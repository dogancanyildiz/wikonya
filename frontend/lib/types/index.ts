// Common Types
export type PageRoute = 'home' | 'topic' | 'dashboard' | 'academic' | 'social' | 'housing' | 'career' | 'kesif'

export type JobType = "Part-Time" | "Full-Time" | "Remote" | "Hybrid"
export type CrowdLevel = "low" | "medium" | "high"

// User & Profile Types
export interface User {
  id: number
  name: string
  initials: string
  email?: string
  avatar?: string
}

// Discussion & Comment Types
export interface Discussion {
  id: number
  author: string
  authorInitials: string
  category: string
  title: string
  excerpt: string
  timeAgo: string
  likes: number
  comments: number
}

export interface Comment {
  id: number
  author: string
  authorInitials: string
  timeAgo: string
  content: string
  upvotes: number
  downvotes: number
  replies: number
  isUpvoted?: boolean
  isDownvoted?: boolean
}

// Career Types
export interface JobCardProps {
  company: string
  companyLogo: string
  role: string
  location: string
  type: JobType
  postedDays: number
  salary?: string
  category?: string
  subCategory?: string
}

export interface WorkshopCardProps {
  image: string
  title: string
  organizer: string
  dateDay: string
  dateMonth: string
  time: string
  location: string
  attendees: number
  isRegistered?: boolean
}

export interface ScholarshipCardProps {
  organization: string
  organizationLogo: string
  title: string
  amount: string
  location: string
  deadline: string
  deadlineDays: number
  requirements: string[]
}

// Housing Types
export interface HousingCardProps {
  image: string
  price: string
  title: string
  location: string
  bedrooms: number
  bathrooms: number
  area: number
  tags: string[]
  views: number
}

export interface LifeGuideCardProps {
  title: string
  description: string
  icon: React.ReactNode
  link: string
}

// Social Types
export interface VenueCardProps {
  image: string
  name: string
  location: string
  rating: number
  reviews: number
  crowdLevel: CrowdLevel
  category: string
}

// Academic Types
export interface ResourceCardProps {
  title: string
  fileType: string
  fileSize: string
  uploadedBy: string
  uploaderInitials: string
  uploadDate: string
  downloads: number
  views: number
}

// Component Props Types
export interface DiscussionFeedProps {
  onNavigateToTopic?: () => void
}

export interface SidebarProps {
  onNavigateToTopic?: () => void
}

export interface PageTransitionProps {
  children: React.ReactNode
}

export interface ImageWithFallbackProps {
  src: string
  alt: string
  className?: string
  width?: number
  height?: number
}

// Mobile Component Types
export interface MobileNavbarProps {
  onMenuClick?: () => void
}

export interface MobileLayoutProps {
  children: React.ReactNode
}

export interface MobileHomePageProps {
  onNavigateToTopic?: () => void
}

export interface MobileTopicDetailPageProps {
  topicId?: string
  onBack?: () => void
}

export interface MobileBottomNavProps {
  activeTab?: string
  onTabChange?: (tab: string) => void
}

export interface MobileFeedCardProps {
  discussion: Discussion
  onNavigateToTopic?: () => void
}

export interface MobileTrendingCardProps {
  topic: {
    id: number
    title: string
    category: string
    views: number
    comments: number
    trend: "up" | "down"
  }
}

// Dashboard Types
export interface DashboardSidebarProps {
  activeItem?: string
  onNavigate?: (item: string) => void
}

// Housing Types
export interface HousingTabsProps {
  activeTab?: string
  onTabChange?: (tab: string) => void
}

// Topic Types
export interface Topic {
  id: number
  title: string
  content: string
  author: User
  category: string
  createdAt: string
  views: number
  likes: number
  comments: number
  tags: string[]
}

