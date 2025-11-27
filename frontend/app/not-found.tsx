import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Home, Search } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <Card className="max-w-md w-full">
        <CardHeader className="text-center">
          <div className="text-6xl font-bold text-muted-foreground mb-4">404</div>
          <CardTitle className="font-[Manrope] text-2xl">
            Sayfa Bulunamadı
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-center">
          <p className="font-[Manrope] text-muted-foreground">
            Aradığınız sayfa mevcut değil veya taşınmış olabilir.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild className="font-[Manrope]">
              <Link href="/">
                <Home className="w-4 h-4 mr-2" />
                Ana Sayfaya Dön
              </Link>
            </Button>
            <Button asChild variant="outline" className="font-[Manrope]">
              <Link href="/">
                <Search className="w-4 h-4 mr-2" />
                Arama Yap
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

