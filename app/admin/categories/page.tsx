'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { toSlug } from '@/lib/utils'
import type { Category, CategoryInsert } from '@/types/database'
import { supabase } from '@/lib/supabase'
import { ArrowLeft, Plus, Eye, EyeOff, Trash2, ListTree } from 'lucide-react'
import GradientButton from '@/components/ui/GradientButton'
import { toast } from 'react-hot-toast'

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading]       = useState<boolean>(true)
  const [newName, setNewName]       = useState<string>('')
  const [newDesc, setNewDesc]       = useState<string>('')
  const router = useRouter()

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) { router.push('/admin/login'); return }
      loadCategories()
    })
  }, [router])

  const loadCategories = async (): Promise<void> => {
    const { data } = await supabase.from('categories').select('*').order('display_order', { ascending: true })
    setCategories((data as unknown as Category[]) ?? [])
    setLoading(false)
  }

  const addCategory = async (): Promise<void> => {
    if (!newName.trim()) {
      toast.error('Category name is required')
      return
    }
    const payload: CategoryInsert = {
      name:          newName,
      slug:          toSlug(newName),
      description:   newDesc,
      display_order: categories.length + 1,
    }
    const { error } = await supabase.from('categories').insert(payload)
    if (error) {
      toast.error(`Error adding category: ${error.message}`)
      return
    }
    toast.success('Category added successfully!')
    setNewName('')
    setNewDesc('')
    await loadCategories()
  }

  const toggleActive = async (id: string, current: boolean): Promise<void> => {
    await supabase.from('categories').update({ is_active: !current }).eq('id', id)
    await loadCategories()
  }

  const executeDeleteCategory = async (id: string): Promise<void> => {
    await supabase.from('products').update({ category_id: null }).eq('category_id', id)
    const { error } = await supabase.from('categories').delete().eq('id', id)
    if (error) {
      toast.error(`Error deleting category: ${error.message}`)
      return
    }
    toast.success('Category deleted')
    await loadCategories()
  }

  const deleteCategory = (id: string): void => {
    toast((t) => (
      <div className="flex flex-col gap-4">
        <p className="font-medium text-white max-w-xs">Are you sure you want to delete this category? Products in this category will remain, but their category will be cleared.</p>
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
              await executeDeleteCategory(id)
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
            <Link href="/admin/dashboard" className="text-muted hover:text-white flex items-center gap-2 text-sm mb-4 inline-flex">
              <ArrowLeft size={16} /> Back to Dashboard
            </Link>
            <h1 className="font-montserrat font-black text-3xl text-white flex items-center gap-3">
              <ListTree size={28} className="text-amber" />
              Manage Categories
            </h1>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Table Content */}
          <div className="lg:col-span-2">
            <div className="bg-surface2 border border-border rounded-2xl overflow-hidden overflow-x-auto">
              {loading ? (
                <div className="p-12 text-center text-muted">Loading categories...</div>
              ) : categories.length === 0 ? (
                <div className="p-12 text-center text-muted">No categories found. Create your first category.</div>
              ) : (
                <table className="w-full text-left border-collapse min-w-[500px]">
                  <thead>
                    <tr className="border-b border-border bg-[#111]">
                      <th className="p-4 text-sm font-semibold text-muted">Name</th>
                      <th className="p-4 text-sm font-semibold text-muted">Slug</th>
                      <th className="p-4 text-sm font-semibold text-muted text-center">Status</th>
                      <th className="p-4 text-sm font-semibold text-muted text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {categories.map((cat) => (
                      <tr key={cat.id} className="hover:bg-surface/50 transition-colors">
                        <td className="p-4 text-white font-medium">{cat.name}</td>
                        <td className="p-4 text-muted text-sm">{cat.slug}</td>
                        <td className="p-4 text-center">
                          <button 
                            onClick={() => toggleActive(cat.id, cat.is_active)}
                            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-colors ${
                              cat.is_active 
                                ? 'bg-[#25D366]/20 text-[#25D366] hover:bg-[#25D366]/30' 
                                : 'bg-red-500/20 text-red-500 hover:bg-red-500/30'
                            }`}
                          >
                            {cat.is_active ? <Eye size={14} /> : <EyeOff size={14} />}
                            {cat.is_active ? 'Active' : 'Hidden'}
                          </button>
                        </td>
                        <td className="p-4 text-right">
                          <button 
                            onClick={() => deleteCategory(cat.id)}
                            className="w-8 h-8 rounded-lg bg-red-500/10 border border-red-500/20 inline-flex items-center justify-center text-red-400 hover:bg-red-500 hover:text-white transition-all"
                            title="Delete Category"
                          >
                            <Trash2 size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>

          {/* Add Category Sidebar */}
          <div>
            <div className="bg-surface2 border border-border rounded-2xl p-6 sticky top-28">
              <h3 className="font-bold text-white mb-6 flex items-center gap-2">
                <Plus size={18} className="text-gold" /> Add Category
              </h3>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted">Category Name</label>
                  <input
                    type="text"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="w-full bg-[#1a1a1a] border border-[#2a2a2a] text-white rounded-xl px-4 py-3 focus:outline-none focus:border-gold transition-colors"
                    placeholder="e.g. Lighting"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted">Description (optional)</label>
                  <textarea
                    value={newDesc}
                    onChange={(e) => setNewDesc(e.target.value)}
                    rows={3}
                    className="w-full bg-[#1a1a1a] border border-[#2a2a2a] text-white rounded-xl px-4 py-3 focus:outline-none focus:border-gold transition-colors resize-none"
                    placeholder="Short description..."
                  />
                </div>

                <div className="pt-2">
                  <GradientButton 
                    onClick={addCategory} 
                    fullWidth 
                    className={!newName.trim() ? 'opacity-50 pointer-events-none' : ''}
                  >
                    Add Category
                  </GradientButton>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  )
}
