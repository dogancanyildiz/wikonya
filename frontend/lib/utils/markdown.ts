/**
 * Basit Markdown renderer
 * Wiki içeriklerini HTML'e dönüştürür
 */

export function renderMarkdown(text: string): string {
  if (!text) return ""

  let html = text
    // Başlıklar (öncelik sırası önemli)
    .replace(/^### (.*$)/gim, "<h3 class='font-[Manrope] font-bold text-lg mt-4 mb-2 text-foreground'>$1</h3>")
    .replace(/^## (.*$)/gim, "<h2 class='font-[Manrope] font-bold text-xl mt-4 mb-2 text-foreground'>$1</h2>")
    .replace(/^# (.*$)/gim, "<h1 class='font-[Manrope] font-bold text-2xl mt-4 mb-2 text-foreground'>$1</h1>")
    // Kod blokları (satır içi kod'dan önce)
    .replace(/```([\s\S]*?)```/g, "<pre class='bg-accent p-3 rounded-lg my-2 overflow-x-auto'><code class='font-mono text-sm'>$1</code></pre>")
    // Kalın (çift yıldız) - önce kalın'ı işle
    .replace(/\*\*(.*?)\*\*/g, "<strong class='font-bold'>$1</strong>")
    // İtalik (tek yıldız) - kalın işlendikten sonra kalan tek yıldızlar
    .replace(/\*([^*]+)\*/g, (match, content) => {
      // Eğer zaten strong içindeyse, olduğu gibi bırak
      if (match.includes("<strong")) return match
      // İtalik olarak işle
      return `<em class='italic'>${content}</em>`
    })
    // Satır içi kod
    .replace(/`([^`]+)`/g, "<code class='bg-accent px-1.5 py-0.5 rounded text-sm font-mono text-primary'>$1</code>")
    // Linkler
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-primary hover:underline font-medium" target="_blank" rel="noopener noreferrer">$1</a>')
    // Alıntı
    .replace(/^> (.*$)/gim, "<blockquote class='border-l-4 border-primary pl-4 italic my-2 text-muted-foreground'>$1</blockquote>")
    // Liste
    .replace(/^- (.*$)/gim, "<li class='ml-4 mb-1'>$1</li>")
    .replace(/^\d+\. (.*$)/gim, "<li class='ml-4 mb-1 list-decimal'>$1</li>")

  // Paragraflar (diğer elementlerden sonra)
  html = html
    .split("\n")
    .map((line) => {
      const trimmed = line.trim()
      // Eğer zaten bir HTML tag'i ile başlıyorsa veya boşsa, olduğu gibi bırak
      if (!trimmed || trimmed.startsWith("<")) {
        return line
      }
      // Liste item'ları için özel işlem
      if (trimmed.startsWith("<li")) {
        return line
      }
      // Paragraf olarak wrap et
      return `<p class='mb-2 font-[Manrope] leading-relaxed'>${line}</p>`
    })
    .join("\n")

  // Liste item'larını ul/ol ile wrap et
  html = html.replace(/(<li[^>]*>[\s\S]*?<\/li>)/g, (match) => {
    // Eğer zaten ul/ol içindeyse, olduğu gibi bırak
    if (match.includes("<ul") || match.includes("<ol")) {
      return match
    }
    return `<ul class='list-disc ml-6 my-2'>${match}</ul>`
  })

  return html
}

