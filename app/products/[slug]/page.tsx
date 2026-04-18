import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import type { ProductWithCategory } from '@/types/database'
import { supabase } from '@/lib/supabase'
import ImageGallery from '@/components/products/ImageGallery'
import ProductCard from '@/components/products/ProductCard'

interface PageProps {
  params: { slug: string }
}

async function getProduct(slug: string): Promise<ProductWithCategory | null> {
  const { data } = await supabase
    .from('products')
    .select('*, categories(name, slug)')
    .eq('slug', slug)
    .eq('is_visible', true)
    .single()
  return data as unknown as ProductWithCategory
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const product = await getProduct(params.slug)
  if (!product) return { title: 'Product Not Found' }
  return {
    title: `${product.name} Hire Sydney`,
    description: product.description?.slice(0, 160) ?? '',
    openGraph: {
      images: product.image_urls?.[0] ? [{ url: product.image_urls[0] }] : [],
    },
  }
}

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const { data } = await supabase
    .from('products')
    .select('slug')
    .eq('is_visible', true)
  return (data ?? []).map(p => ({ slug: p.slug }))
}

export default async function ProductDetailPage({ params }: PageProps) {
  const product = await getProduct(params.slug)
  if (!product) notFound()

  // Fetch related products
  const { data: related } = await supabase
    .from('products')
    .select('*, categories(name, slug)')
    .eq('category_id', product.category_id ?? '')
    .eq('is_visible', true)
    .neq('id', product.id)
    .limit(3)

  const relatedProducts: ProductWithCategory[] = (related as unknown as ProductWithCategory[]) ?? []

  const phone: string = '+61493735612'
  const message: string = encodeURIComponent(
    `Hi, I'm interested in hiring "${product.name}". Could you please share availability and pricing?`
  )
  const whatsappUrl: string = `https://wa.me/${phone}?text=${message}`

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: product.name,
            description: product.description,
            image: product.image_urls?.[0] ?? '',
            brand: { '@type': 'Brand', name: 'Capital Stage Hire' },
            offers: {
              '@type': 'Offer',
              availability: 'https://schema.org/InStock',
              priceCurrency: 'AUD',
              seller: {
                '@type': 'LocalBusiness',
                name: 'Capital Stage Hire',
                address: {
                  '@type': 'PostalAddress',
                  addressRegion: 'NSW',
                  addressCountry: 'AU',
                },
              },
            },
          }),
        }}
      />

      <main className="min-h-screen bg-black pt-28 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumbs */}
          <nav className="flex items-center space-x-2 text-sm text-muted mb-10 overflow-x-auto whitespace-nowrap hide-scrollbar">
            <Link href="/" className="hover:text-gold transition-colors">Home</Link>
            <ChevronRight size={14} />
            <Link href="/products" className="hover:text-gold transition-colors">Products</Link>
            <ChevronRight size={14} />
            <Link 
              href={`/products?category=${product.categories?.slug ?? 'all'}`} 
              className="hover:text-gold transition-colors"
            >
              {product.categories?.name ?? 'Category'}
            </Link>
            <ChevronRight size={14} />
            <span className="text-white font-medium truncate">{product.name}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            
            {/* Left — Image Gallery */}
            <div>
              <ImageGallery images={product.image_urls ?? []} name={product.name} />
            </div>

            {/* Right — Product Details */}
            <div>
              {/* Category Badge */}
              <div className="inline-block gradient-bg text-black text-xs font-bold px-3 py-1.5 rounded-full mb-6">
                {product.categories?.name ?? 'Hire Item'}
              </div>

              <h1 className="font-montserrat font-black text-3xl md:text-4xl text-white mb-6 leading-tight">
                {product.name}
              </h1>

              <div className="prose prose-invert prose-p:text-muted prose-p:leading-relaxed max-w-none mb-10">
                <p>{product.description}</p>
              </div>

              <hr className="border-border my-8" />

              {/* WhatsApp CTA Block */}
              <div className="gradient-bg rounded-2xl p-6 sm:p-8 flex flex-col items-start shadow-xl">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center text-white flex-shrink-0">
                    <svg fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-montserrat font-black text-black text-xl mb-1">Ready to hire this item?</h3>
                    <p className="text-black/80 font-medium text-sm">Send us a message for pricing and availability.</p>
                  </div>
                </div>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-black text-white rounded-full px-8 py-4 w-full text-center font-bold hover:scale-[1.02] transition-transform"
                >
                  Enquire on WhatsApp
                </a>
              </div>
            </div>
            
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div className="mt-24 pt-16 border-t border-border">
              <h2 className="font-montserrat font-black text-2xl md:text-3xl text-white mb-8">
                You May Also Like
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {relatedProducts.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </div>
          )}

        </div>
      </main>
    </>
  )
}
