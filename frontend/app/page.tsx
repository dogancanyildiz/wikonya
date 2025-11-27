import { Hero } from "@/components/layout/hero"
import { DiscussionFeed } from "@/components/features/home/discussion-feed"
import { Sidebar } from "@/components/layout/sidebar"
import { TrendingTopics } from "@/components/features/home/trending-topics"
import { PopularComments } from "@/components/features/home/popular-comments"
import { KBBAnnouncements } from "@/components/features/home/kbb-announcements"

export default function Home() {
  return (
    <div className="min-h-screen bg-[#f2f4f3] dark:bg-background">
      <Hero />
      
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16">
        {/* KBB Announcements */}
        <div className="mt-8 mb-6">
          <KBBAnnouncements />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 mt-6 pb-16">
          <div className="lg:col-span-8 space-y-6">
            {/* Trending Topics */}
            <TrendingTopics />
            
            {/* Popular Comments */}
            <PopularComments />
            
            {/* Discussion Feed */}
            <DiscussionFeed />
          </div>
          <div className="lg:col-span-4">
            <Sidebar />
          </div>
        </div>
      </div>
    </div>
  )
}
