import type { Metadata } from 'next'
import type { ProductWithCategory, Category } from '@/types/database'

import { supabase } from '@/lib/supabase'
import CategoryFilter from '@/components/products/CategoryFilter'

export const dynamic = 'force-dynamic'
export const revalidate = 0
import SearchBar from '@/components/products/SearchBar'
import ProductCard from '@/components/products/ProductCard'

interface ProductsPageProps {
  searchParams: {
    category?: string
    search?:   string
  }
}

export const metadata: Metadata = {
  title: 'Event Hire Products | Chairs, Tables, Lighting & More Canberra Australia ACT',
  description: "Browse Capital Stage Hire's full range of event hire products. Chairs, tables, lighting, staging, curtains and decorations available across Canberra Australia ACT.",
}

async function getCategories(): Promise<Category[]> {
  const { data } = await supabase
    .from('categories')
    .select('*')
    .eq('is_active', true)
    .order('display_order')
  return (data as unknown as Category[]) ?? []
}

async function getProducts(
  categorySlug: string | undefined,
  search: string | undefined,
): Promise<ProductWithCategory[]> {
  let query = supabase
    .from('products')
    .select('*, categories(name, slug)')
    .eq('is_visible', true)
    .order('display_order')

  if (categorySlug && categorySlug !== 'all') {
    const { data: cat } = await supabase
      .from('categories')
      .select('id')
      .eq('slug', categorySlug)
      .single()
    if (cat) query = query.eq('category_id', cat.id)
  }

  if (search?.trim()) {
    query = query.or(`name.ilike.%${search}%,description.ilike.%${search}%`)
  }

  const { data } = await query
  return (data as unknown as ProductWithCategory[]) ?? []
}

export default async function ProductsPage({
  searchParams,
}: ProductsPageProps) {
  const [categories, products] = await Promise.all([
    getCategories(),
    getProducts(searchParams.category, searchParams.search),
  ])

  return (
    <main className="min-h-screen bg-black pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-12 border-b border-border pb-12">
          <span className="text-gold font-bold inline-block mb-3 uppercase tracking-wider text-sm">
            Equipment Hire
          </span>
          <h1 className="font-montserrat font-black text-4xl md:text-5xl text-white mb-6">
            Our Products
          </h1>
          <p className="text-muted text-lg max-w-3xl">
            Explore our curated selection of premium event furniture, staging, lighting, and décor. We provide high-quality rentals for events of all sizes.
          </p>
        </div>

        {/* Layout: Sidebar + Main Content */}
        <div className="flex flex-col md:flex-row gap-8 lg:gap-12">
          
          {/* Sidebar */}
          <aside className="w-full md:w-64 flex-shrink-0 space-y-8">
            <div>
              <h3 className="text-white font-bold mb-4">Search</h3>
              <SearchBar />
            </div>
            <div>
              <h3 className="text-white font-bold mb-4">Categories</h3>
              <CategoryFilter 
                categories={categories} 
                selected={searchParams.category ?? 'all'} 
              />
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-grow">
            {products.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="py-20 text-center border border-border rounded-3xl bg-surface2">
                <h3 className="text-xl font-bold text-white mb-2">No products found</h3>
                <p className="text-muted">
                  Try adjusting your search or category filters.
                </p>
              </div>
            )}
          </div>
          
        </div>
      </div>
    </main>
  )
}
