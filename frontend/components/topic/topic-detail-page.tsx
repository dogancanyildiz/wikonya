import { TopicHeader } from "./topic-header"
import { CommentFeed } from "./comment-feed"
import { TopicSidebar } from "./topic-sidebar"

export function TopicDetailPage() {
  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16 py-6 sm:py-8">
      <TopicHeader />
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 mt-6 sm:mt-8">
        <div className="lg:col-span-8">
          <CommentFeed />
        </div>
        <div className="lg:col-span-4">
          <TopicSidebar />
        </div>
      </div>
    </div>
  )
}

