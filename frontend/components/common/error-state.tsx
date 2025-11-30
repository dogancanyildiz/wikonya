"use client"

import { AlertCircle, RefreshCw } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface ErrorStateProps {
  title?: string
  message: string
  onRetry?: () => void
  retryLabel?: string
}

export function ErrorState({ title = "Bir Hata Oluştu", message, onRetry, retryLabel = "Tekrar Dene" }: ErrorStateProps) {
  return (
    <Card className="bg-card rounded-xl shadow-md border border-border">
      <CardContent className="p-6 sm:p-8">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle className="font-[Manrope] font-bold">{title}</AlertTitle>
          <AlertDescription className="font-[Manrope] mt-2">
            {message}
          </AlertDescription>
        </Alert>
        {onRetry && (
          <div className="mt-4">
            <Button
              onClick={onRetry}
              variant="outline"
              className="font-[Manrope] font-bold"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              {retryLabel}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

