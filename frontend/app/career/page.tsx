import { Navbar } from "@/components/navbar"
import { ModeToggle } from "@/components/mode-toggle"
import { CareerPage as CareerPageContent } from "@/components/career/career-page"

export default function CareerPage() {
  return (
    <div className="min-h-screen bg-[#f2f4f3] dark:bg-background">
      <Navbar />
      <div className="absolute top-8 right-8 z-50">
        <ModeToggle />
      </div>
      <CareerPageContent />
    </div>
  )
}

