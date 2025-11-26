import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { DiscussionFeed } from "@/components/discussion-feed"
import { Sidebar } from "@/components/sidebar"
import { ModeToggle } from "@/components/mode-toggle"

export default function Home() {
  return (
    <div className="min-h-screen bg-[#f2f4f3] dark:bg-background">
      <Navbar />
      <div className="absolute top-8 right-8 z-50">
        <ModeToggle />
      </div>
      <Hero />
      
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16">
        
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 mt-12 pb-16">
          <div className="lg:col-span-8">
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
