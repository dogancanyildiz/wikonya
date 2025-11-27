/**
 * Simple diff utility for comparing text
 */

export interface DiffLine {
  type: "added" | "removed" | "unchanged"
  content: string
  lineNumber?: number
}

/**
 * Basit diff algoritması - satır bazlı karşılaştırma
 */
export function computeDiff(oldText: string, newText: string): DiffLine[] {
  const oldLines = oldText.split("\n")
  const newLines = newText.split("\n")
  const diff: DiffLine[] = []

  // En uzun ortak alt dizi (LCS) benzeri basit algoritma
  let oldIndex = 0
  let newIndex = 0

  while (oldIndex < oldLines.length || newIndex < newLines.length) {
    if (oldIndex >= oldLines.length) {
      // Sadece yeni satırlar kaldı
      diff.push({
        type: "added",
        content: newLines[newIndex],
        lineNumber: newIndex + 1,
      })
      newIndex++
    } else if (newIndex >= newLines.length) {
      // Sadece eski satırlar kaldı
      diff.push({
        type: "removed",
        content: oldLines[oldIndex],
        lineNumber: oldIndex + 1,
      })
      oldIndex++
    } else if (oldLines[oldIndex] === newLines[newIndex]) {
      // Satırlar aynı
      diff.push({
        type: "unchanged",
        content: oldLines[oldIndex],
        lineNumber: oldIndex + 1,
      })
      oldIndex++
      newIndex++
    } else {
      // Satırlar farklı - önce eski satırı sil, sonra yeni satırı ekle
      // Basit yaklaşım: eğer bir sonraki satır eşleşiyorsa, bu satır değişmiş demektir
      const nextOldMatches = oldIndex + 1 < oldLines.length && 
        newLines.slice(newIndex).includes(oldLines[oldIndex + 1])
      const nextNewMatches = newIndex + 1 < newLines.length && 
        oldLines.slice(oldIndex).includes(newLines[newIndex + 1])

      if (nextOldMatches && !nextNewMatches) {
        // Eski satır silindi
        diff.push({
          type: "removed",
          content: oldLines[oldIndex],
          lineNumber: oldIndex + 1,
        })
        oldIndex++
      } else if (nextNewMatches && !nextOldMatches) {
        // Yeni satır eklendi
        diff.push({
          type: "added",
          content: newLines[newIndex],
          lineNumber: newIndex + 1,
        })
        newIndex++
      } else {
        // Her ikisi de değişti
        diff.push({
          type: "removed",
          content: oldLines[oldIndex],
          lineNumber: oldIndex + 1,
        })
        diff.push({
          type: "added",
          content: newLines[newIndex],
          lineNumber: newIndex + 1,
        })
        oldIndex++
        newIndex++
      }
    }
  }

  return diff
}

/**
 * Diff'i HTML'e dönüştürür
 */
export function diffToHtml(diff: DiffLine[]): string {
  return diff
    .map((line) => {
      const escaped = line.content
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;")

      if (line.type === "added") {
        return `<div class="diff-line diff-added">+ ${escaped}</div>`
      } else if (line.type === "removed") {
        return `<div class="diff-line diff-removed">- ${escaped}</div>`
      } else {
        return `<div class="diff-line diff-unchanged">  ${escaped}</div>`
      }
    })
    .join("\n")
}

