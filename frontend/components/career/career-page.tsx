import { CareerStats } from "./career-stats"
import { JobBoard } from "./job-board"
import { DevelopmentHub } from "./development-hub"

export function CareerPage() {
  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16 py-6 sm:py-8">
      <div className="mb-6 sm:mb-8">
        <h1 className="font-[Manrope] text-[#4d4d4d] dark:text-foreground mb-2 font-extrabold text-3xl sm:text-4xl lg:text-[42px]">
          Kariyer & Gelişim
        </h1>
        <p className="font-[Manrope] text-[#4d4d4d]/60 dark:text-muted-foreground font-medium text-sm sm:text-base">
          İş fırsatları, staj ilanları ve kişisel gelişim etkinlikleri
        </p>
      </div>

      <CareerStats />

      <div className="mb-6 sm:mb-8">
        <JobBoard />
      </div>

      <DevelopmentHub />
    </div>
  )
}

