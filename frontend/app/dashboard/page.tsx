import { UserDashboard } from "@/components/dashboard/user-dashboard"

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-[#f2f4f3] dark:bg-background pb-20 sm:pb-24 md:pb-0">
      <UserDashboard />
    </div>
  )
}

