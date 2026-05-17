'use client'

import Link from 'next/link'
import { Star, CheckCircle } from 'lucide-react'
import GradientButton from '@/components/ui/GradientButton'
import WhatsAppButton from '@/components/ui/WhatsAppButton'
import type { Category } from '@/types/database'

interface HeroSectionProps {
  categories: Category[]
}

export default function HeroSection({ categories }: HeroSectionProps) {
  return (
    <section className="relative min-h-[100dvh] bg-[#050505] pt-32 pb-20 overflow-hidden flex items-center">
      {/* Dynamic Background Assets */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 w-[800px] h-[600px] bg-gradient-to-br from-amber-500/10 via-gold/5 to-transparent rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/3 w-[600px] h-[600px] bg-gradient-to-tr from-[#f8be1e]/15 to-transparent rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 -mt-16 lg:-mt-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Column */}
          <div className="relative">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-gold"></span>
              </span>
              <span className="text-white/90 font-medium text-xs tracking-wider uppercase">
                Canberra Australia ACT's Premier Event Hire
              </span>
            </div>

            <h1 className="font-montserrat font-black text-5xl md:text-6xl lg:text-[5.5rem] leading-[1.05] tracking-tight mb-8">
              <div className="text-white animate-fade-in-up" style={{ animationDelay: '0.2s' }}>Curating</div>
              <div className="bg-gradient-to-r from-[#f8be1e] via-[#ffda75] to-[#eb8b09] text-transparent bg-clip-text animate-fade-in-up pb-2" style={{ animationDelay: '0.3s' }}>Unforgettable</div>
              <div className="text-white/40 animate-fade-in-up flex items-center gap-4" style={{ animationDelay: '0.4s' }}>
                Moments <span className="hidden md:block w-32 h-2 shrink-0 bg-gradient-to-r from-[#f8be1e] to-transparent rounded-full" />
              </div>
            </h1>

            <p className="text-muted text-lg md:text-xl font-inter max-w-2xl mb-10 animate-fade-in-up md:max-w-xl" style={{ animationDelay: '0.5s' }}>
              From elegant Tiffany chairs to stunning floral arches and complete staging setups. We supply everything you need to create the perfect atmosphere for weddings, parties, and corporate events.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
              <GradientButton href="/products">
                Browse Our Products
              </GradientButton>
              <WhatsAppButton variant="primary" label="WhatsApp Us Now" />
            </div>

            <div className="flex flex-wrap items-center gap-6 animate-fade-in-up" style={{ animationDelay: '0.7s' }}>
              {[
                'Premium Quality',
                'On-Time Delivery',
                'Canberra Australia ACT Wide',
              ].map((text) => (
                <div key={text} className="flex items-center gap-2">
                  <CheckCircle size={20} className="text-gold" />
                  <span className="text-white font-medium text-sm">{text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Premium Bento UI */}
          <div className="relative animate-fade-in-up lg:ml-auto w-full max-w-xl mx-auto lg:mx-0 grid gap-4 grid-cols-2" style={{ animationDelay: '0.4s' }}>
            
            {/* Top Wide Card */}
            <div className="col-span-2 relative bg-gradient-to-br from-[#1a1a1a]/80 to-[#0a0a0a]/90 backdrop-blur-xl rounded-[2rem] border border-white/10 p-8 shadow-2xl overflow-hidden group hover:border-gold/30 transition-colors duration-500">
              <div className="absolute inset-0 bg-gradient-to-r from-gold/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10 flex justify-between items-start">
                <div>
                  <h3 className="text-white font-montserrat font-black text-2xl mb-2">Trending Setup</h3>
                  <p className="text-white/50 text-sm max-w-xs">White Tiffany Chairs perfectly paired with our Round Banquet Tables.</p>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center -rotate-6 transform group-hover:rotate-0 transition-transform duration-500">
                  <Star className="text-gold fill-gold" size={20} />
                </div>
              </div>
            </div>

            {/* Bottom Left Square */}
            <div className="col-span-1 relative bg-gradient-to-br from-[#1a1a1a]/80 to-[#0a0a0a]/90 backdrop-blur-xl rounded-[2rem] border border-white/10 p-6 flex flex-col justify-between aspect-square group hover:-translate-y-2 transition-transform duration-500">
              <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center mb-4">
                <CheckCircle className="text-gold" size={20} />
              </div>
              <div>
                <div className="text-3xl font-black text-white mb-1">100%</div>
                <div className="text-white/50 text-xs font-medium tracking-wide uppercase">Delivery Rate</div>
              </div>
            </div>

            {/* Bottom Right Floating Badge Block */}
            <div className="col-span-1 relative bg-gradient-to-tl from-gold/20 to-[#1a1a1a]/80 backdrop-blur-xl rounded-[2rem] border border-gold/20 p-6 flex flex-col justify-between aspect-square group hover:scale-[1.03] transition-transform duration-500 overflow-hidden">
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-gold/30 blur-2xl rounded-full" />
              <div className="relative z-10 flex gap-1 mb-2">
                {[1,2,3,4,5].map(star => <Star key={star} size={16} className="fill-gold text-gold drop-shadow-md" />)}
              </div>
              <div className="relative z-10">
                <div className="text-4xl font-black text-white drop-shadow-lg mb-1">4.9</div>
                <div className="text-white/80 font-medium text-sm">Customer Rating</div>
                <div className="text-white/40 text-xs mt-1">Based on 150+ events</div>
              </div>
            </div>

          </div>

        </div>

        {/* Bottom Category Strip */}
        <div className="mt-24 pt-8 border-t border-white/5 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
          <p className="text-center text-xs font-bold text-white/30 uppercase tracking-[0.2em] mb-8">Curated Collections</p>
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/products?category=${cat.slug}`}
                className="group relative px-6 py-2.5 rounded-full bg-white/5 border border-white/10 text-white/80 hover:text-black overflow-hidden transition-all duration-300 backdrop-blur-md"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-[#f8be1e] to-[#eb8b09] -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out" />
                <span className="relative z-10 font-medium text-sm tracking-wide">{cat.name}</span>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
