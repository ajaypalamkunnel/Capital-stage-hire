import Link from 'next/link'
import Image from 'next/image'
import { supabase } from '@/lib/supabase'
import type { Category } from '@/types/database'

interface FooterLink {
  label: string
  href:  string
}

const quickLinks: FooterLink[] = [
  { label: 'Home',     href: '/'         },
  { label: 'Products', href: '/products' },
  { label: 'About',    href: '/#about'   },
  { label: 'Contact',  href: '/#contact' },
]

const productLinks: FooterLink[] = [
  { label: 'Chairs',        href: '/products?category=chairs'        },
  { label: 'Tables',        href: '/products?category=tables'        },
  { label: 'Lighting',      href: '/products?category=lighting'      },
  { label: 'Curtains',      href: '/products?category=curtains'      },
  { label: 'Decorations',   href: '/products?category=decorations'   },
  { label: 'Staging',       href: '/products?category=staging'       },
  { label: 'Welcome Boards',href: '/products?category=welcome-boards'},
]

export default async function Footer() {
  const { data } = await supabase
    .from('categories')
    .select('name, slug')
    .eq('is_active', true)
    .order('display_order', { ascending: true })
    
  const dynamicCategories: Pick<Category, 'name' | 'slug'>[] = (data as unknown as Pick<Category, 'name' | 'slug'>[]) ?? []
  return (
    <footer className="bg-[#0a0a0a] border-t border-border pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand & Contact */}
          <div className="md:col-span-2">
            <Link href="/" className="inline-block mb-6">
              <Image 
                src="/capital_stage_hire_logo.jpg" 
                alt="Capital Stage Hire" 
                width={200} 
                height={60} 
                className="h-12 w-auto object-contain rounded-md"
              />
            </Link>
            <p className="text-muted text-sm leading-relaxed mb-6">
              Canberra Australia ACT's premier event hire company. Supplying premium furniture, lighting, and décor for weddings, parties, and corporate events across Canberra Australia ACT.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-montserrat font-bold text-lg mb-6">Quick Links</h3>
            <ul className="space-y-4">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-muted hover:text-white transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-white font-montserrat font-bold text-lg mb-6">Equipment Hire</h3>
            <ul className="space-y-4">
              {dynamicCategories.length > 0 ? dynamicCategories.map((cat) => (
                <li key={cat.slug}>
                  <Link href={`/products?category=${cat.slug}`} className="text-muted hover:text-white transition-colors text-sm">
                    {cat.name}
                  </Link>
                </li>
              )) : productLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-muted hover:text-white transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-montserrat font-bold text-lg mb-6">Contact Us</h3>
            <ul className="space-y-4 text-sm text-muted">
              <li>
                <span className="block text-white mb-1">WhatsApp / Phone:</span>
                <a href="https://wa.me/+61493735612" className="hover:text-white transition-colors">
                  +61 493 735 612
                </a>
              </li>
              <li>
                <span className="block text-white mb-1">Email:</span>
                <a href="mailto:info@capitalstagehire.com" className="hover:text-white transition-colors">
                  info@capitalstagehire.com
                </a>
              </li>
              <li>
                <span className="block text-white mb-1">Location:</span>
                <a 
                  href="https://maps.app.goo.gl/4aMAoQ8fRKjixdoM6?g_st=aw" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors block leading-relaxed"
                >
                  Canberra Australia ACT<br />
                  <span className="text-xs text-gold">View on Google Maps &rarr;</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted text-sm text-center md:text-left">
            &copy; {new Date().getFullYear()} Capital Stage Hire. All rights reserved.
          </p>
          <p className="text-muted text-sm text-center md:text-right">
            Website by Console Technologies
          </p>
        </div>
      </div>
    </footer>
  )
}
