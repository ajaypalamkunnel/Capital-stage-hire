'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Search } from 'lucide-react'

export default function SearchBar(): JSX.Element {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [value, setValue] = useState<string>(searchParams.get('search') ?? '')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setValue(e.target.value)
    const params = new URLSearchParams(searchParams.toString())
    if (e.target.value) {
      params.set('search', e.target.value)
    } else {
      params.delete('search')
    }
    router.push(`/products?${params.toString()}`)
  }

  return (
    <div className="relative w-full">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-muted" />
      </div>
      <input
        type="text"
        value={value}
        onChange={handleChange}
        placeholder="Search products..."
        className="w-full bg-[#1a1a1a] border border-border text-white rounded-xl pl-11 pr-4 py-3 focus:outline-none focus:border-gold transition-colors"
      />
    </div>
  )
}
