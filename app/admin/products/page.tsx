'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import type { ProductWithCategory } from '@/types/database'
import { supabase } from '@/lib/supabase'
import { Plus, Eye, EyeOff, Edit, Trash2, Camera, ArrowLeft } from 'lucide-react'
import { toast } from 'react-hot-toast'

export default function ManageProductsPage() {
  const [products, setProducts] = useState<ProductWithCategory[]>([])
  const [loading, setLoading]   = useState<boolean>(true)
  const router = useRouter()

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) { router.push('/admin/login'); return }
      loadProducts()
    })
  }, [router])

  const loadProducts = async (): Promise<void> => {
    const { data } = await supabase
      .from('products')
      .select('*, categories(name)')
      .order('created_at', { ascending: false })
    setProducts((data as unknown as ProductWithCategory[]) ?? [])
    setLoading(false)
  }

  const toggleVisibility = async (id: string, current: boolean): Promise<void> => {
    await supabase.from('products').update({ is_visible: !current }).eq('id', id)
    await loadProducts()
  }

  const executeDeleteProduct = async (id: string, imagePaths: string[]): Promise<void> => {
    for (const path of imagePaths) {
      if (!path) continue
      const filename = path.split('/').pop()
      if (filename) {
        await supabase.storage.from('product-images').remove([filename])
      }
    }
    
    const { error } = await supabase.from('products').delete().eq('id', id)
    if (error) {
      toast.error(`Error deleting product: ${error.message}`)
      return
    }
    toast.success('Product deleted')
    await loadProducts()
  }

  const deleteProduct = (id: string, imagePaths: string[]): void => {
    toast((t) => (
      <div className="flex flex-col gap-4">
        <p className="font-medium text-white max-w-xs">Are you sure you want to delete this product? This cannot be undone.</p>
        <div className="flex gap-2 justify-end">
          <button 
            onClick={() => toast.dismiss(t.id)}
            className="px-4 py-2 text-sm bg-[#2a2a2a] text-white rounded-lg hover:bg-[#3a3a3a] transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={async () => {
              toast.dismiss(t.id)
              await executeDeleteProduct(id, imagePaths)
            }}
            className="px-4 py-2 text-sm bg-red-500/20 border border-red-500 text-red-400 rounded-lg hover:bg-red-500 hover:text-white transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    ), { duration: Infinity, position: 'top-center' })
  }

  return (
    <div className="min-h-screen bg-black pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <Link href="/admin/dashboard" className="text-muted hover:text-white flex items-center gap-2 text-sm mb-4">
              <ArrowLeft size={16} /> Back to Dashboard
            </Link>
            <h1 className="font-montserrat font-black text-3xl text-white">Manage Products</h1>
          </div>
          <Link 
            href="/admin/products/add"
            className="flex items-center gap-2 gradient-bg text-black font-bold px-6 py-3 rounded-xl hover:scale-105 transition-transform"
          >
            <Plus size={20} />
            Add New Product
          </Link>
        </div>

        {/* Table */}
        <div className="bg-surface2 border border-border rounded-2xl overflow-hidden overflow-x-auto">
          {loading ? (
            <div className="p-12 text-center text-muted">Loading products...</div>
          ) : products.length === 0 ? (
            <div className="p-12 text-center text-muted">No products found. Add your first product.</div>
          ) : (
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="border-b border-border bg-[#111]">
                  <th className="p-4 text-sm font-semibold text-muted">Image</th>
                  <th className="p-4 text-sm font-semibold text-muted">Name</th>
                  <th className="p-4 text-sm font-semibold text-muted">Category</th>
                  <th className="p-4 text-sm font-semibold text-muted text-center">Status</th>
                  <th className="p-4 text-sm font-semibold text-muted text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {products.map((product) => (
                  <tr key={product.id} className="hover:bg-surface/50 transition-colors">
                    <td className="p-4">
                      <div className="w-16 h-12 bg-surface rounded-lg overflow-hidden border border-border relative flex items-center justify-center">
                        {product.image_urls?.[0] ? (
                          <Image src={product.image_urls[0]} alt="" fill className="object-cover" sizes="64px" />
                        ) : (
                          <Camera size={16} className="text-muted opacity-50" />
                        )}
                      </div>
                    </td>
                    <td className="p-4 text-white font-medium">{product.name}</td>
                    <td className="p-4 text-muted">{product.categories?.name ?? '—'}</td>
                    <td className="p-4 text-center">
                      <button 
                        onClick={() => toggleVisibility(product.id, product.is_visible)}
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-colors ${
                          product.is_visible 
                            ? 'bg-[#25D366]/20 text-[#25D366] hover:bg-[#25D366]/30' 
                            : 'bg-red-500/20 text-red-500 hover:bg-red-500/30'
                        }`}
                      >
                        {product.is_visible ? <Eye size={14} /> : <EyeOff size={14} />}
                        {product.is_visible ? 'Visible' : 'Hidden'}
                      </button>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex justify-end gap-2">
                        {/* 
                        <Link 
                          href={`/admin/products/edit/${product.id}`}
                          className="w-8 h-8 rounded-lg bg-surface border border-border flex items-center justify-center text-muted hover:text-white hover:border-white transition-all"
                          title="Edit Product"
                        >
                          <Edit size={16} />
                        </Link>
                        */}
                        <button 
                          onClick={() => deleteProduct(product.id, product.image_urls)}
                          className="w-8 h-8 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400 hover:bg-red-500 hover:text-white transition-all"
                          title="Delete Product"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

      </div>
    </div>
  )
}
