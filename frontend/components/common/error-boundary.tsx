"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, RefreshCw, Home } from "lucide-react"
import { useRouter } from "next/navigation"

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
}

interface ErrorBoundaryProps {
  children: React.ReactNode
  fallback?: React.ComponentType<{ error: Error | null; resetError: () => void }>
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo)
    
    // Log to error tracking service (e.g., Sentry) in production
    if (typeof window !== "undefined" && process.env.NODE_ENV === "production") {
      // Sentry.captureException(error, { contexts: { react: errorInfo } })
    }
  }

  resetError = () => {
    this.setState({ hasError: false, error: null })
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        const Fallback = this.props.fallback
        return <Fallback error={this.state.error} resetError={this.resetError} />
      }
      return <DefaultErrorFallback error={this.state.error} resetError={this.resetError} />
    }

    return this.props.children
  }
}

function DefaultErrorFallback({ error, resetError }: { error: Error | null; resetError: () => void }) {
  const router = useRouter()

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <Card className="max-w-md w-full bg-card border border-border">
        <CardHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-red-100 dark:bg-red-900/20 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400" />
            </div>
            <CardTitle className="font-[Manrope] font-bold text-xl text-foreground">
              Bir Hata Oluştu
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="font-[Manrope] text-sm text-muted-foreground">
            Üzgünüz, beklenmeyen bir hata oluştu. Lütfen sayfayı yenileyin veya ana sayfaya dönün.
          </p>
          
          {error && process.env.NODE_ENV === "development" && (
            <div className="p-3 bg-muted rounded-lg">
              <p className="font-[Manrope] text-xs font-semibold text-foreground mb-1">
                Hata Detayı (Sadece Development):
              </p>
              <p className="font-mono text-xs text-muted-foreground break-all">
                {error.message}
              </p>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-2">
            <Button
              onClick={resetError}
              className="font-[Manrope] font-bold flex-1"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Tekrar Dene
            </Button>
            <Button
              variant="outline"
              onClick={() => router.push("/")}
              className="font-[Manrope] flex-1"
            >
              <Home className="w-4 h-4 mr-2" />
              Ana Sayfa
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Hook for functional components
export function useErrorHandler() {
  return (error: Error, errorInfo?: React.ErrorInfo) => {
    console.error("Error caught by useErrorHandler:", error, errorInfo)
    
    if (typeof window !== "undefined" && process.env.NODE_ENV === "production") {
      // Sentry.captureException(error, { contexts: { react: errorInfo } })
    }
  }
}
