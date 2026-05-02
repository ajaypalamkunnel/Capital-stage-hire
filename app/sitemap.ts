import type { MetadataRoute } from 'next'
import { supabase } from '@/lib/supabase'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { data: products } = await supabase
    .from('products')
    .select('slug, updated_at')
    .eq('is_visible', true)

  const productUrls: MetadataRoute.Sitemap = (products ?? []).map(p => ({
    url: `https://www.capitalstagehire.com/products/${p.slug}`,
    lastModified:    new Date(p.updated_at),
    changeFrequency: 'weekly',
    priority:        0.8,
  }))

  return [
    {
      url: 'https://www.capitalstagehire.com',
      lastModified:    new Date(),
      changeFrequency: 'daily',
      priority:        1,
    },
    {
      url: 'https://www.capitalstagehire.com/products',
      lastModified:    new Date(),
      changeFrequency: 'daily',
      priority:        0.9,
    },
    ...productUrls,
  ]
}
