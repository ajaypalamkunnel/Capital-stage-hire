import ProductCard from '@/components/products/ProductCard'
import SectionTitle from '@/components/ui/SectionTitle'
import GradientButton from '@/components/ui/GradientButton'
import type { ProductWithCategory } from '@/types/database'

interface ProductsPreviewProps {
  products: ProductWithCategory[]
}

export default function ProductsPreview({
  products,
}: ProductsPreviewProps) {
  return (
    <section className="py-24 bg-[#0a0a0a] relative overflow-hidden" id="products">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute top-1/4 -right-64 w-[600px] h-[600px] bg-gradient-to-bl from-gold/5 blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute bottom-1/4 -left-64 w-[600px] h-[600px] bg-gradient-to-tr from-[#eb8b09]/5 blur-[120px] pointer-events-none rounded-full" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <SectionTitle 
            eyebrow="Our Collection" 
            title="Popular Hire Items" 
            subtitle="Browse our most requested furniture and decor items for your next event."
          />
          <div className="hidden md:block pb-12">
            <GradientButton href="/products">View All Products &rarr;</GradientButton>
          </div>
        </div>

        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-surface2 rounded-3xl border border-border">
            <h3 className="text-xl text-white font-medium mb-2">Check back soon</h3>
            <p className="text-muted">We are currently updating our product catalog.</p>
          </div>
        )}

        <div className="mt-12 text-center md:hidden">
          <GradientButton href="/products" fullWidth>View All Products &rarr;</GradientButton>
        </div>
      </div>
    </section>
  )
}
