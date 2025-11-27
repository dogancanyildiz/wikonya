"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { searchSchema, type SearchFormData } from "@/lib/validations"

interface SearchFormProps {
  onSubmit: (data: SearchFormData) => void
  placeholder?: string
  className?: string
}

export function SearchForm({ onSubmit, placeholder = "Konuları, soruları keşfet...", className }: SearchFormProps) {
  const form = useForm<SearchFormData>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      query: "",
    },
  })

  const handleSubmit = (data: SearchFormData) => {
    onSubmit(data)
    form.reset()
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={className}>
        <div className="relative flex items-center bg-white dark:bg-card rounded-[20px] shadow-[0_10px_40px_rgba(0,0,0,0.08)] dark:shadow-lg hover:shadow-[0_15px_50px_rgba(0,0,0,0.12)] dark:hover:shadow-xl transition-shadow duration-300">
          <Search className="absolute left-4 sm:left-6 w-5 h-5 sm:w-6 sm:h-6 text-[#03624c]" aria-hidden="true" />
          <FormField
            control={form.control}
            name="query"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    placeholder={placeholder}
                    className="w-full h-[60px] pl-12 sm:pl-16 pr-28 sm:pr-32 bg-transparent rounded-[20px] font-[Manrope] font-medium text-[#4d4d4d] dark:text-foreground placeholder:text-[#4d4d4d]/40 dark:placeholder:text-muted-foreground focus:outline-none border-0 focus-visible:ring-0"
                    aria-label="Arama kutusu"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="absolute right-2 h-[48px] px-6 sm:px-8 bg-[#03624c] hover:bg-[#03624c]/90 rounded-[16px] font-[Manrope] font-semibold text-white"
            aria-label="Ara"
          >
            Ara
          </Button>
        </div>
      </form>
    </Form>
  )
}

