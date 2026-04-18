import HeroSection from '@/components/home/HeroSection'
import StatsSection from '@/components/home/StatsSection'
import ProductsPreview from '@/components/home/ProductsPreview'
import ReviewsSection from '@/components/home/ReviewsSection'
import AboutSection from '@/components/home/AboutSection'
import ContactSection from '@/components/home/ContactSection'
import { supabase } from '@/lib/supabase'
import type { ProductWithCategory, Category } from '@/types/database'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function HomePage(): Promise<JSX.Element> {
  const [productsResponse, categoriesResponse] = await Promise.all([
    supabase
      .from('products')
      .select('*, categories(name, slug)')
      .eq('is_visible', true)
      .order('created_at', { ascending: false })
      .limit(6),
    supabase
      .from('categories')
      .select('*')
      .eq('is_active', true)
      .order('display_order', { ascending: true })
  ])

  const products: ProductWithCategory[] = (productsResponse.data as unknown as ProductWithCategory[]) ?? []
  const categories: Category[] = (categoriesResponse.data as unknown as Category[]) ?? []

  return (
    <main>
      <HeroSection categories={categories} />
      <StatsSection />
      <ProductsPreview products={products} />
      <ReviewsSection />
      <AboutSection />
      <ContactSection />
    </main>
  )
}
