"use client"

import { Button } from "@/components/ui/button"
import { Empty, EmptyHeader, EmptyMedia, EmptyTitle, EmptyDescription, EmptyContent } from "@/components/ui/empty"
import { LucideIcon } from "lucide-react"

interface EmptyStateProps {
  icon: LucideIcon
  title: string
  description: string
  action?: {
    label: string
    onClick: () => void
  }
  secondaryAction?: {
    label: string
    onClick: () => void
  }
}

export function EmptyState({ icon: Icon, title, description, action, secondaryAction }: EmptyStateProps) {
  return (
    <Empty className="py-12 sm:py-16">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Icon className="w-12 h-12 sm:w-16 sm:h-16 text-muted-foreground" />
        </EmptyMedia>
        <EmptyTitle className="font-[Manrope] font-bold text-xl sm:text-2xl">
          {title}
        </EmptyTitle>
        <EmptyDescription className="font-[Manrope] text-base">
          {description}
        </EmptyDescription>
      </EmptyHeader>
      {(action || secondaryAction) && (
        <EmptyContent className="flex flex-col sm:flex-row gap-3">
          {action && (
            <Button
              onClick={action.onClick}
              className="font-[Manrope] font-bold"
            >
              {action.label}
            </Button>
          )}
          {secondaryAction && (
            <Button
              onClick={secondaryAction.onClick}
              variant="outline"
              className="font-[Manrope] font-bold"
            >
              {secondaryAction.label}
            </Button>
          )}
        </EmptyContent>
      )}
    </Empty>
  )
}

