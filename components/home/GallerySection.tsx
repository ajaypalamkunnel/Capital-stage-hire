"use client"

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react'
import SectionTitle from '@/components/ui/SectionTitle'

const images = [
  { src: '/gallery_images/capital-stage-hire-event-setup-1.jpg', alt: 'Capital Stage Hire Event Setup' },
  { src: '/gallery_images/capital-stage-hire-outdoor-stage-2.jpg', alt: 'Capital Stage Hire Outdoor Stage' },
  { src: '/gallery_images/professional-stage-lighting-setup-3.jpg', alt: 'Professional Stage Lighting Setup' },
  { src: '/gallery_images/corporate-event-stage-design-4.jpg', alt: 'Corporate Event Stage Design' },
  { src: '/gallery_images/wedding-stage-decoration-hire-5.jpg', alt: 'Wedding Stage Decoration Hire' },
  { src: '/gallery_images/concert-stage-rental-services-6.jpg', alt: 'Concert Stage Rental Services' },
  { src: '/gallery_images/premium-event-furniture-hire-7.jpg', alt: 'Premium Event Furniture Hire' },
  { src: '/gallery_images/capital-events-stage-platform-8.jpg', alt: 'Capital Events Stage Platform' },
  { src: '/gallery_images/live-music-performance-stage-9.jpg', alt: 'Live Music Performance Stage' },
  { src: '/gallery_images/custom-stage-backdrop-hire-10.jpg', alt: 'Custom Stage Backdrop Hire' },
  { src: '/gallery_images/festival-stage-sound-system-11.jpg', alt: 'Festival Stage Sound System' },
  { src: '/gallery_images/gala-dinner-stage-setup-12.jpg', alt: 'Gala Dinner Stage Setup' },
  { src: '/gallery_images/exhibition-stand-stage-hire-13.jpg', alt: 'Exhibition Stand Stage Hire' },
]

export default function GallerySection() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  // Handle keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return
      
      if (e.key === 'Escape') setSelectedIndex(null)
      if (e.key === 'ArrowLeft') showPrev()
      if (e.key === 'ArrowRight') showNext()
    }
    
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedIndex])

  // Prevent scrolling when lightbox is open
  useEffect(() => {
    if (selectedIndex !== null) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [selectedIndex])

  const showNext = () => {
    setSelectedIndex((prev) => (prev === null ? null : (prev + 1) % images.length))
  }

  const showPrev = () => {
    setSelectedIndex((prev) => (prev === null ? null : (prev - 1 + images.length) % images.length))
  }

  return (
    <section className="py-24 bg-surface bg-opacity-50 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle 
          eyebrow="Our Portfolio" 
          title="Previous Works & Installations" 
          center 
        />
        
        {/* Gallery Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          {images.map((image, index) => (
            <div 
              key={index}
              className="relative group overflow-hidden rounded-2xl cursor-pointer break-inside-avoid shadow-lg transition-transform duration-300 hover:scale-[1.02]"
              onClick={() => setSelectedIndex(index)}
            >
              <Image
                src={image.src}
                alt={image.alt}
                width={600}
                height={800}
                className="w-full h-auto object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-3">
                <div className="w-12 h-12 rounded-full gradient-bg flex items-center justify-center text-black transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <Maximize2 size={24} />
                </div>
                <span className="text-white font-medium tracking-wide transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                  View Large
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selectedIndex !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm p-4 md:p-8">
          <button 
            onClick={() => setSelectedIndex(null)}
            className="absolute top-6 right-6 md:top-8 md:right-8 text-white/70 hover:text-white transition-colors z-50 p-2 rounded-full bg-black/50 hover:bg-black/80"
            aria-label="Close"
          >
            <X size={32} />
          </button>
          
          <button 
            onClick={(e) => { e.stopPropagation(); showPrev(); }}
            className="absolute left-4 md:left-8 text-white/70 hover:text-white transition-colors z-50 p-3 rounded-full bg-black/50 hover:bg-black/80"
            aria-label="Previous image"
          >
            <ChevronLeft size={32} />
          </button>

          <div className="relative w-full max-w-6xl max-h-[85vh] h-full flex items-center justify-center">
            <div className="relative w-full h-full">
              <Image
                src={images[selectedIndex].src}
                alt={images[selectedIndex].alt}
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />
            </div>
            
            {/* Image Counter & Caption */}
            <div className="absolute -bottom-12 md:-bottom-16 left-0 right-0 text-center text-white">
              <p className="font-medium text-lg mb-1">{images[selectedIndex].alt}</p>
              <p className="text-white/60 text-sm">{selectedIndex + 1} / {images.length}</p>
            </div>
          </div>

          <button 
            onClick={(e) => { e.stopPropagation(); showNext(); }}
            className="absolute right-4 md:right-8 text-white/70 hover:text-white transition-colors z-50 p-3 rounded-full bg-black/50 hover:bg-black/80"
            aria-label="Next image"
          >
            <ChevronRight size={32} />
          </button>
        </div>
      )}
    </section>
  )
}
