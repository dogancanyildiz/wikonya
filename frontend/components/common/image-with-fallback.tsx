"use client"

import Image from "next/image"
import { useState } from "react"

interface ImageWithFallbackProps {
  src: string
  alt: string
  className?: string
  width?: number
  height?: number
  fill?: boolean
  sizes?: string
  priority?: boolean
}

export function ImageWithFallback({ 
  src, 
  alt, 
  className, 
  width, 
  height,
  fill,
  sizes,
  priority 
}: ImageWithFallbackProps) {
  const [imgSrc, setImgSrc] = useState(src)
  const [hasError, setHasError] = useState(false)

  const handleError = () => {
    if (!hasError) {
      setHasError(true)
      setImgSrc("/placeholder-image.svg")
    }
  }

  if (fill) {
    return (
      <Image
        src={imgSrc}
        alt={alt}
        fill
        className={className}
        sizes={sizes || "100vw"}
        priority={priority}
        onError={handleError}
      />
    )
  }

  return (
    <Image
      src={imgSrc}
      alt={alt}
      className={className}
      width={width || 800}
      height={height || 600}
      sizes={sizes}
      priority={priority}
      onError={handleError}
    />
  )
}

