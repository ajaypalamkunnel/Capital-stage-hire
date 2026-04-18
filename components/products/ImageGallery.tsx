'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Camera } from 'lucide-react'

interface ImageGalleryProps {
  images: string[]
  name:   string
}

export default function ImageGallery({
  images,
  name,
}: ImageGalleryProps) {
  const [active, setActive] = useState<number>(0)

  if (!images || images.length === 0) {
    return (
      <div className="w-full aspect-square md:aspect-[4/3] bg-surface2 rounded-2xl border border-border flex flex-col items-center justify-center text-muted">
        <Camera size={64} className="mb-4 opacity-20" />
        <span className="text-lg font-medium opacity-50">No Image Available</span>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative w-full aspect-square md:aspect-[4/3] bg-surface rounded-2xl overflow-hidden border border-border">
        <Image
          src={images[active]}
          alt={`${name} - Image ${active + 1}`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
        />
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-2">
          {images.map((src, idx) => (
            <button
              key={idx}
              onClick={() => setActive(idx)}
              className={`relative flex-shrink-0 w-20 h-20 md:w-24 md:h-24 rounded-lg overflow-hidden border-2 transition-all ${
                active === idx ? 'border-gold opacity-100' : 'border-transparent opacity-60 hover:opacity-100'
              }`}
            >
              <Image
                src={src}
                alt={`${name} thumbnail ${idx + 1}`}
                fill
                className="object-cover"
                sizes="96px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
