import { AcademicHeader } from "./academic-header"
import { FilterChips } from "./filter-chips"
import { ResourceGrid } from "./resource-grid"

export function AcademicPage() {
  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16 py-6 sm:py-8">
      <AcademicHeader />
      <FilterChips />
      <div className="mt-2">
        <ResourceGrid />
      </div>
    </div>
  )
}

