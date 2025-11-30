import { TopicHeader } from "./topic-header"
import { CommentFeed } from "./comment-feed"
import { TopicSidebar } from "./topic-sidebar"

interface TopicDetailPageProps {
  topicId: number
}

export function TopicDetailPage({ topicId }: TopicDetailPageProps) {
  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-16 py-4 sm:py-6 md:py-8">
      <TopicHeader topicId={topicId} />
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 lg:gap-8 mt-4 sm:mt-6 lg:mt-8">
        <div className="lg:col-span-8">
          <CommentFeed topicId={topicId} />
        </div>
        <div className="hidden lg:block lg:col-span-4">
          <TopicSidebar topicId={topicId} />
        </div>
      </div>
    </div>
  )
}

