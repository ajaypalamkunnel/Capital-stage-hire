'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import type { Category } from '@/types/database'

interface CategoryFilterProps {
  categories: Category[]
  selected:   string
}

export default function CategoryFilter({
  categories,
  selected,
}: CategoryFilterProps): JSX.Element {
  const router = useRouter()
  const searchParams = useSearchParams()

  const handleSelect = (slug: string): void => {
    const params = new URLSearchParams(searchParams.toString())
    if (slug === 'all') {
      params.delete('category')
    } else {
      params.set('category', slug)
    }
    router.push(`/products?${params.toString()}`)
  }

  return (
    <div className="flex overflow-x-auto hide-scrollbar md:flex-col gap-2 pb-4 md:pb-0">
      <button
        onClick={() => handleSelect('all')}
        className={`whitespace-nowrap px-4 py-2 rounded-lg text-left text-sm font-medium transition-colors ${
          selected === 'all' 
            ? 'gradient-bg text-black' 
            : 'text-muted hover:text-white hover:bg-surface2'
        }`}
      >
        All Products
      </button>
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => handleSelect(cat.slug)}
          className={`whitespace-nowrap px-4 py-2 rounded-lg text-left text-sm font-medium transition-colors ${
            selected === cat.slug 
              ? 'gradient-bg text-black' 
              : 'text-muted hover:text-white hover:bg-surface2'
          }`}
        >
          {cat.name}
        </button>
      ))}
    </div>
  )
}
