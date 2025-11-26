import { Navbar } from "@/components/navbar"
import { ModeToggle } from "@/components/mode-toggle"
import { AcademicPage as AcademicPageContent } from "@/components/academic/academic-page"

export default function AcademicPage() {
  return (
    <div className="min-h-screen bg-[#f2f4f3] dark:bg-background">
      <Navbar />
      <div className="absolute top-8 right-8 z-50">
        <ModeToggle />
      </div>
      <AcademicPageContent />
    </div>
  )
}

