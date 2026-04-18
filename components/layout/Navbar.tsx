'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X } from 'lucide-react'

interface NavLink {
  label: string
  href: string
}

const navLinks: NavLink[] = [
  { label: 'Home', href: '/' },
  { label: 'Products', href: '/products' },
  { label: 'About', href: '/#about' },
  { label: 'Contact', href: '/#contact' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [scrolled, setScrolled] = useState<boolean>(false)

  const handleScroll = (): void => {
    setScrolled(window.scrollY > 80)
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        scrolled 
          ? 'py-4 px-4 sm:px-6 lg:px-8' 
          : 'py-0 px-0'
      }`}
    >
      <div 
        className={`max-w-7xl mx-auto transition-all duration-500 ${
          scrolled 
            ? 'bg-[#0a0a0a]/70 backdrop-blur-2xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.6)] rounded-full px-6' 
            : 'bg-[#121212] sm:bg-transparent border-b border-border sm:border-transparent px-4 sm:px-6 lg:px-8'
        }`}
      >
        <div className={`flex justify-between items-center transition-all duration-500 ${scrolled ? 'h-16' : 'h-24'}`}>
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center group">
              <Image 
                src="/capital_stage_hire_logo.jpg" 
                alt="Capital Stage Hire" 
                width={200} 
                height={60} 
                className={`w-auto object-contain rounded-md transition-all duration-500 ${scrolled ? 'h-10' : 'h-12'} group-hover:scale-105`}
                priority
              />
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-10">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="relative text-white/80 hover:text-white font-medium text-sm uppercase tracking-wide transition-colors group py-2"
              >
                {link.label}
                <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-gradient-to-r from-[#f8be1e] to-[#eb8b09] scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 rounded-full shadow-[0_0_10px_rgba(248,190,30,0.5)]" />
              </Link>
            ))}
            <a
              href="https://wa.me/+61493735612"
              target="_blank"
              rel="noopener noreferrer"
              className="relative inline-flex h-10 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 focus:ring-offset-black hover:scale-105 transition-transform group"
            >
              <span className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#eb8b09_0%,#f8be1e_50%,#eb8b09_100%)]" />
              <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-[#121212] group-hover:bg-black transition-colors px-6 py-1 text-sm font-semibold text-white/90 uppercase tracking-wide backdrop-blur-3xl">
                Get a Quote
              </span>
            </a>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white/80 hover:text-white transition-colors focus:outline-none p-2"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu - Premium Dropdown */}
      <div 
        className={`md:hidden absolute inset-x-4 top-full mt-4 transition-all duration-300 origin-top overflow-hidden rounded-3xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.8)] backdrop-blur-2xl bg-[#0a0a0a]/95 ${
          isOpen ? 'opacity-100 scale-y-100 translate-y-0' : 'opacity-0 scale-y-95 -translate-y-4 pointer-events-none'
        }`}
      >
        <div className="p-6 space-y-6">
          {navLinks.map((link, i) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="block text-white/80 hover:text-gold text-lg font-bold tracking-wide transition-colors"
              style={{ transitionDelay: `${i * 50}ms` }}
            >
              <span className="block border-b border-white/5 pb-4">{link.label}</span>
            </Link>
          ))}
          <a
            href="https://wa.me/+61493735612"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full text-center gradient-bg text-black px-6 py-4 rounded-xl font-bold uppercase tracking-wider text-sm mt-4 shadow-[0_0_20px_rgba(248,190,30,0.3)]"
            onClick={() => setIsOpen(false)}
          >
            Get a Quote
          </a>
        </div>
      </div>
    </nav>
  )
}
