"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { commentSchema, type CommentFormData } from "@/lib/validations"

interface CommentFormProps {
  onSubmit: (data: CommentFormData) => void | Promise<void>
  isLoading?: boolean
}

export function CommentForm({ onSubmit, isLoading = false }: CommentFormProps) {
  const form = useForm<CommentFormData>({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      content: "",
    },
  })

  const handleSubmit = async (data: CommentFormData) => {
    await onSubmit(data)
    form.reset()
  }

  return (
    <Card className="mt-4 sm:mt-6 bg-white dark:bg-card rounded-[20px] shadow-[0_4px_20px_rgba(0,0,0,0.06)] dark:shadow-lg border border-border">
      <CardHeader>
        <CardTitle className="font-[Manrope] text-[#4d4d4d] dark:text-foreground font-bold text-lg sm:text-xl">
          Görüş Bildir
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Deneyimlerinizi ve düşüncelerinizi paylaşın..."
                      className="w-full p-3 sm:p-4 bg-[#f2f4f3] dark:bg-accent rounded-xl font-[Manrope] text-[#4d4d4d] dark:text-foreground resize-none focus:outline-none focus:ring-2 focus:ring-[#03624c] font-medium min-h-[100px] sm:min-h-[120px] text-sm sm:text-base"
                      aria-label="Yorum metni"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
              <span className="font-[Manrope] text-[#4d4d4d]/60 dark:text-muted-foreground font-medium text-xs sm:text-sm">
                Lütfen yapıcı ve saygılı yorumlar yazın
              </span>
              <Button
                type="submit"
                disabled={isLoading}
                className="bg-[#03624c] hover:bg-[#03624c]/90 font-[Manrope] px-6 sm:px-8 font-bold text-xs sm:text-sm"
                aria-label="Yorumu gönder"
              >
                {isLoading ? "Gönderiliyor..." : "Gönder"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

