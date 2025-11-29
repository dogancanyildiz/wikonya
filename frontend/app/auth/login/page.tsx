"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { useApp } from "@/contexts/app-context"
import { mockLogin, mockVerifyUser } from "@/lib/auth/mock-auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, Loader2, Mail, Lock, Sparkles, BookOpen, Users, Award, Home } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()
  const { setUser } = useApp()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    try {
      const isValid = await mockVerifyUser(email, "email")
      if (!isValid) {
        throw new Error("Sadece üniversite email'i (.edu.tr) veya test email'i kullanılabilir")
      }

      const user = await mockLogin(email)
      if (user) {
        setUser(user)
        router.push("/dashboard")
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Giriş yapılırken bir hata oluştu")
    } finally {
      setIsLoading(false)
    }
  }

  const features = [
    { icon: BookOpen, text: "Akademik kaynaklara eriş" },
    { icon: Users, text: "Toplulukla bağlan" },
    { icon: Award, text: "GençCoin kazan" },
  ]

  return (
    <div className="min-h-screen flex">
      {/* Sol Panel - Branding (sadece desktop) */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary via-primary/90 to-[#013d2f] relative overflow-hidden">
        {/* Decorative glow elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-80 h-80 bg-white/5 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 flex flex-col justify-center px-12 xl:px-20">
          <Link href="/" className="mb-12 inline-flex items-center gap-3 group">
            <div className="bg-white rounded-xl p-2 shadow-lg">
              <Image
                src="/konya-genc-logo.svg"
                alt="Konya Genç Logo"
                width={40}
                height={40}
                className="w-10 h-10 scale-[1.4]"
                priority
              />
            </div>
            <span className="font-[Manrope] text-white font-black text-3xl xl:text-4xl">
              KONYA <span className="text-white/80">GENÇ</span>
            </span>
          </Link>
          
          <h1 className="font-[Manrope] text-white font-black text-4xl xl:text-5xl leading-tight mb-6">
            Konya&apos;nın<br />
            <span className="text-white/80">Bilgi Evreni</span>
          </h1>
          
          <p className="font-[Manrope] text-white/70 font-medium text-lg xl:text-xl leading-relaxed mb-10 max-w-md">
            Öğrencilerin bilgi paylaşım platformu. Sorularını sor, deneyimlerini paylaş, toplulukla birlikte öğren.
          </p>

          <div className="space-y-4">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <span className="font-[Manrope] text-white/90 font-semibold text-base xl:text-lg">
                  {feature.text}
                </span>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="mt-16 flex items-center gap-8">
            <div>
              <p className="font-[Manrope] text-white font-black text-3xl xl:text-4xl">5K+</p>
              <p className="font-[Manrope] text-white/60 font-medium text-sm">Aktif Kullanıcı</p>
            </div>
            <div className="w-px h-12 bg-white/20" />
            <div>
              <p className="font-[Manrope] text-white font-black text-3xl xl:text-4xl">10K+</p>
              <p className="font-[Manrope] text-white/60 font-medium text-sm">Başlık</p>
            </div>
            <div className="w-px h-12 bg-white/20" />
            <div>
              <p className="font-[Manrope] text-white font-black text-3xl xl:text-4xl">50K+</p>
              <p className="font-[Manrope] text-white/60 font-medium text-sm">Yorum</p>
            </div>
          </div>
        </div>
      </div>

      {/* Sağ Panel / Mobil - Login Form */}
      <div className="w-full lg:w-1/2 bg-background flex items-center justify-center p-6 sm:p-8 lg:p-12">
        <div className="w-full max-w-md">
          {/* Mobile Header */}
          <div className="lg:hidden mb-10">
            <Link href="/" className="inline-flex items-center gap-3 group">
              <div className="bg-white rounded-xl p-2 shadow-lg">
                <Image
                  src="/konya-genc-logo.svg"
                  alt="Konya Genç Logo"
                  width={40}
                  height={40}
                  className="w-10 h-10 scale-[1.4]"
                  priority
                />
              </div>
              <span className="font-[Manrope] text-foreground font-black text-2xl">
                KONYA <span className="text-primary">GENÇ</span>
              </span>
            </Link>
          </div>

          {/* Welcome */}
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 dark:bg-primary/20 rounded-full mb-4">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="font-[Manrope] text-primary font-semibold text-sm">
                Hoş geldin!
              </span>
            </div>
            <h2 className="font-[Manrope] text-foreground font-black text-3xl sm:text-4xl mb-2">
              Giriş Yap
            </h2>
            <p className="font-[Manrope] text-foreground/60 dark:text-muted-foreground font-medium">
              Genç Kültür Kart ID veya üniversite email&apos;inizle giriş yapın
            </p>
          </div>

          {/* Form Card */}
          <div className="bg-white dark:bg-card rounded-[24px] shadow-[0_10px_40px_rgba(0,0,0,0.08)] dark:shadow-lg p-6 sm:p-8 border border-border">
            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <Alert variant="destructive" className="rounded-xl border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription className="font-[Manrope] font-medium text-sm">
                    {error}
                  </AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label 
                  htmlFor="email" 
                  className="font-[Manrope] text-foreground font-bold text-sm"
                >
                  Email veya Genç Kültür Kart ID
                </Label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/40 dark:text-muted-foreground" />
                  <Input
                    id="email"
                    type="text"
                    placeholder="ornek@selcuk.edu.tr"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={isLoading}
                    className="h-14 pl-12 pr-4 bg-accent border-0 rounded-xl font-[Manrope] font-medium text-foreground placeholder:text-foreground/40 dark:placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-primary"
                  />
                </div>
                <p className="font-[Manrope] text-[10px] text-foreground/50 dark:text-muted-foreground leading-relaxed">
                  Test: yeni_gelen@example.com, seyyah@example.com, gezgin@example.com
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label 
                    htmlFor="password" 
                    className="font-[Manrope] text-foreground font-bold text-sm"
                  >
                    Şifre
                  </Label>
                  <button
                    type="button"
                    className="font-[Manrope] text-primary font-semibold text-xs hover:underline"
                  >
                    Şifremi unuttum
                  </button>
                </div>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/40 dark:text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isLoading}
                    className="h-14 pl-12 pr-4 bg-accent border-0 rounded-xl font-[Manrope] font-medium text-foreground placeholder:text-foreground/40 dark:placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-primary"
                  />
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full h-14 bg-primary hover:bg-primary/90 text-white rounded-xl font-[Manrope] font-bold text-base transition-all duration-200 shadow-[0_4px_14px_rgba(3,98,76,0.4)] hover:shadow-[0_6px_20px_rgba(3,98,76,0.5)]" 
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    <span>Giriş yapılıyor...</span>
                  </>
                ) : (
                  "Giriş Yap"
                )}
              </Button>
            </form>
          </div>

          {/* Register Link */}
          <div className="text-center mt-8">
            <p className="font-[Manrope] text-foreground/60 dark:text-muted-foreground font-medium">
              Hesabınız yok mu?{" "}
              <Link 
                href="/auth/register" 
                className="text-primary font-bold hover:underline"
              >
                Kayıt olun
              </Link>
            </p>
          </div>

          {/* Footer */}
          <div className="text-center mt-10">
            <p className="font-[Manrope] text-foreground/40 dark:text-muted-foreground/60 text-xs">
              © 2024 Konya Büyükşehir Belediyesi
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

