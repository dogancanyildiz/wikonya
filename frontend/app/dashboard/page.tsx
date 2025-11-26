import { Navbar } from "@/components/navbar"
import { ModeToggle } from "@/components/mode-toggle"
import { UserDashboard } from "@/components/dashboard/user-dashboard"

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-[#f2f4f3] dark:bg-background">
      <Navbar />
      <div className="absolute top-8 right-8 z-50">
        <ModeToggle />
      </div>
      <UserDashboard />
    </div>
  )
}

