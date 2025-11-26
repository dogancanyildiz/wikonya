import { Navbar } from "@/components/navbar"
import { ModeToggle } from "@/components/mode-toggle"
import { SocialPage as SocialPageContent } from "@/components/social/social-page"

export default function SocialPage() {
  return (
    <div className="min-h-screen bg-[#f2f4f3] dark:bg-background">
      <Navbar />
      <div className="absolute top-8 right-8 z-50">
        <ModeToggle />
      </div>
      <SocialPageContent />
    </div>
  )
}

