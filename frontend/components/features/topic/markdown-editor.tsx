"use client"

import { useState } from "react"
import { Bold, Italic, List, Link, Heading1, Heading2, Code, Quote } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"

interface MarkdownEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  minHeight?: string
  disabled?: boolean
}

export function MarkdownEditor({
  value,
  onChange,
  placeholder = "Markdown formatında yazın...",
  minHeight = "300px",
  disabled = false,
}: MarkdownEditorProps) {
  const [activeTab, setActiveTab] = useState<"edit" | "preview">("edit")

  const insertText = (before: string, after: string = "") => {
    const textarea = document.getElementById("markdown-editor") as HTMLTextAreaElement
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = value.substring(start, end)
    const newText = value.substring(0, start) + before + selectedText + after + value.substring(end)
    
    onChange(newText)
    
    // Cursor pozisyonunu ayarla
    setTimeout(() => {
      textarea.focus()
      const newCursorPos = start + before.length + selectedText.length
      textarea.setSelectionRange(newCursorPos, newCursorPos)
    }, 0)
  }

  const toolbarButtons = [
    {
      icon: Bold,
      label: "Kalın",
      action: () => insertText("**", "**"),
    },
    {
      icon: Italic,
      label: "İtalik",
      action: () => insertText("*", "*"),
    },
    {
      icon: Heading1,
      label: "Başlık 1",
      action: () => insertText("# ", ""),
    },
    {
      icon: Heading2,
      label: "Başlık 2",
      action: () => insertText("## ", ""),
    },
    {
      icon: List,
      label: "Liste",
      action: () => insertText("- ", ""),
    },
    {
      icon: Quote,
      label: "Alıntı",
      action: () => insertText("> ", ""),
    },
    {
      icon: Code,
      label: "Kod",
      action: () => insertText("`", "`"),
    },
    {
      icon: Link,
      label: "Link",
      action: () => insertText("[", "](url)"),
    },
  ]

  const renderMarkdown = (text: string) => {
    // Basit markdown renderer
    const html = text
      // Başlıklar
      .replace(/^### (.*$)/gim, "<h3 class='font-bold text-lg mt-4 mb-2'>$1</h3>")
      .replace(/^## (.*$)/gim, "<h2 class='font-bold text-xl mt-4 mb-2'>$1</h2>")
      .replace(/^# (.*$)/gim, "<h1 class='font-bold text-2xl mt-4 mb-2'>$1</h1>")
      // Kalın
      .replace(/\*\*(.*?)\*\*/g, "<strong class='font-bold'>$1</strong>")
      // İtalik
      .replace(/\*(.*?)\*/g, "<em class='italic'>$1</em>")
      // Kod
      .replace(/`(.*?)`/g, "<code class='bg-gray-200 dark:bg-gray-800 px-1 py-0.5 rounded text-sm font-mono'>$1</code>")
      // Linkler
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-primary hover:underline" target="_blank" rel="noopener noreferrer">$1</a>')
      // Liste
      .replace(/^- (.*$)/gim, "<li class='ml-4'>$1</li>")
      // Alıntı
      .replace(/^> (.*$)/gim, "<blockquote class='border-l-4 border-primary pl-4 italic my-2'>$1</blockquote>")
      // Paragraflar
      .split("\n")
      .map((line) => {
        if (!line.match(/^<[h|b|l|]/) && line.trim()) {
          return `<p class='mb-2'>${line}</p>`
        }
        return line
      })
      .join("\n")

    return { __html: html }
  }

  return (
    <div className="space-y-2">
      {/* Toolbar */}
      <div className="flex items-center gap-1 p-2 bg-accent rounded-lg border border-border">
        {toolbarButtons.map((button, index) => {
          const Icon = button.icon
          return (
            <Button
              key={index}
              type="button"
              variant="ghost"
              size="sm"
              onClick={button.action}
              disabled={disabled}
              className="h-8 w-8 p-0 font-[Manrope]"
              title={button.label}
            >
              <Icon className="w-4 h-4" />
            </Button>
          )
        })}
      </div>

      {/* Editor/Preview Tabs */}
      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as "edit" | "preview")} className="w-full">
        <TabsList className="grid w-full grid-cols-2 font-[Manrope]">
          <TabsTrigger value="edit">Düzenle</TabsTrigger>
          <TabsTrigger value="preview">Önizleme</TabsTrigger>
        </TabsList>
        
        <TabsContent value="edit" className="mt-2">
          <Textarea
            id="markdown-editor"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className={`font-[Manrope] text-sm sm:text-base font-mono ${minHeight ? `min-h-[${minHeight}]` : ""}`}
            style={{ minHeight }}
            disabled={disabled}
          />
          <p className="text-xs text-muted-foreground mt-2 font-[Manrope]">
            Markdown formatını kullanabilirsiniz. Önizleme sekmesinden sonucu görebilirsiniz.
          </p>
        </TabsContent>
        
        <TabsContent value="preview" className="mt-2">
          <ScrollArea className={`border rounded-lg p-4 bg-card ${minHeight ? `min-h-[${minHeight}]` : ""}`} style={{ minHeight }}>
            {value ? (
              <div
                className="prose prose-sm max-w-none font-[Manrope] text-foreground"
                dangerouslySetInnerHTML={renderMarkdown(value)}
              />
            ) : (
              <p className="text-muted-foreground font-[Manrope] italic">Önizleme için içerik girin...</p>
            )}
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  )
}

