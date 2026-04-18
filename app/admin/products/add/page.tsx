'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { toSlug } from '@/lib/utils'
import type { Category, ProductFormState } from '@/types/database'
import { supabase } from '@/lib/supabase'
import { ArrowLeft, UploadCloud, X, Loader2 } from 'lucide-react'
import GradientButton from '@/components/ui/GradientButton'
import { toast } from 'react-hot-toast'

export default function AddProductPage(): JSX.Element {
  const [form, setForm] = useState<ProductFormState>({
    name:          '',
    slug:          '',
    description:   '',
    category_id:   '',
    is_visible:    true,
    display_order: 0,
  })

  const [categories, setCategories] = useState<Category[]>([])
  const [files, setFiles]           = useState<File[]>([])
  const [previews, setPreviews]     = useState<string[]>([])
  const [uploading, setUploading]   = useState<boolean>(false)
  const router = useRouter()

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) { router.push('/admin/login'); return }
      loadCategories()
    })
  }, [router])

  const loadCategories = async (): Promise<void> => {
    const { data } = await supabase.from('categories').select('*').order('display_order')
    setCategories((data as unknown as Category[]) ?? [])
  }

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const name = e.target.value
    setForm(prev => ({ ...prev, name, slug: toSlug(name) }))
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>): void => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const selected = Array.from(e.target.files ?? [])
    setFiles(prev => [...prev, ...selected])
    setPreviews(prev => [...prev, ...selected.map(f => URL.createObjectURL(f))])
  }

  const removeFile = (idx: number): void => {
    setFiles(prev => prev.filter((_, i) => i !== idx))
    setPreviews(prev => prev.filter((_, i) => i !== idx))
  }

  const validate = (): boolean => {
    if (!form.name.trim()) { toast.error('Name is required'); return false }
    if (!form.category_id) { toast.error('Category is required'); return false }
    if (!form.description.trim()) { toast.error('Description is required'); return false }
    if (files.length === 0) { toast.error('At least one image must be uploaded'); return false }
    return true
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    if (!validate()) return
    setUploading(true)

    const imageUrls: string[] = []

    for (const file of files) {
      const ext = file.name.split('.').pop()
      const path = `${Date.now()}-${Math.random().toString(36).substring(7)}.${ext}`
      
      const { error } = await supabase.storage
        .from('product-images')
        .upload(path, file)
        
      if (!error) {
        const { data: { publicUrl } } = supabase.storage
          .from('product-images')
          .getPublicUrl(path)
        imageUrls.push(publicUrl)
      }
    }

    const { error } = await supabase.from('products').insert({
      ...form,
      image_urls: imageUrls,
    })

    if (error) {
      toast.error(`Error saving product: ${error.message}`)
      setUploading(false)
      return
    }

    toast.success('Product added successfully!')
    setUploading(false)
    router.push('/admin/products')
  }

  return (
    <div className="min-h-screen bg-black pt-24 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <Link href="/admin/products" className="text-muted hover:text-white flex items-center gap-2 text-sm mb-8 inline-flex">
          <ArrowLeft size={16} /> Back to Products
        </Link>
        
        <h1 className="font-montserrat font-black text-3xl text-white mb-10">Add New Product</h1>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="bg-surface2 border border-border rounded-3xl p-8 space-y-6">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted">Product Name <span className="text-gold">*</span></label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleNameChange}
                  className="w-full bg-[#1a1a1a] border border-[#2a2a2a] focus:border-gold text-white rounded-xl px-4 py-3 focus:outline-none transition-colors"
                  placeholder="e.g. White Tiffany Chair"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-muted">Category <span className="text-gold">*</span></label>
                <select
                  name="category_id"
                  value={form.category_id}
                  onChange={handleChange}
                  className="w-full bg-[#1a1a1a] border border-[#2a2a2a] focus:border-gold text-white rounded-xl px-4 py-3 focus:outline-none appearance-none transition-colors"
                >
                  <option value="" disabled>Select a category</option>
                  {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>
            </div>

            <div className="space-y-2 relative">
              <label className="text-sm font-medium text-muted items-center flex justify-between">
                <div>URL Slug <span className="text-gold">*</span></div>
              </label>
              <input
                type="text"
                name="slug"
                value={form.slug}
                readOnly
                className="w-full bg-[#111] border border-[#2a2a2a] text-muted rounded-xl px-4 py-3 focus:outline-none cursor-not-allowed"
              />
              <p className="text-xs text-muted/60 absolute -bottom-5 left-0">Auto-generated from name</p>
            </div>

            <div className="space-y-2 pt-2">
              <label className="text-sm font-medium text-muted">Description <span className="text-gold">*</span></label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows={5}
                className="w-full bg-[#1a1a1a] border border-[#2a2a2a] focus:border-gold text-white rounded-xl px-4 py-3 focus:outline-none resize-none transition-colors"
                placeholder="Describe the product details, specs, and ideal use cases..."
              />
            </div>

            <div className="pt-2 flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-white block mb-1">Visibility</label>
                <span className="text-xs text-muted">Show this product publicly on the website</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={form.is_visible} 
                  onChange={(e) => setForm(p => ({ ...p, is_visible: e.target.checked }))}
                  className="sr-only peer" 
                />
                <div className="w-11 h-6 bg-[#2a2a2a] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gold"></div>
              </label>
            </div>
            
          </div>

          <div className="bg-surface2 border border-border rounded-3xl p-8 space-y-6">
            <div>
              <h3 className="text-white font-bold mb-1">Product Images</h3>
              <p className="text-xs text-muted">Upload up to 4 images. First image will be the cover.</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {previews.map((src, idx) => (
                <div key={idx} className="relative aspect-square border border-border rounded-xl overflow-hidden bg-surface group">
                  <Image src={src} alt="Preview" fill className="object-cover" />
                  <button
                    type="button"
                    onClick={() => removeFile(idx)}
                    className="absolute top-2 right-2 w-8 h-8 bg-black/50 hover:bg-red-500 text-white rounded-full flex items-center justify-center backdrop-blur-sm transition-colors opacity-0 group-hover:opacity-100"
                  >
                    <X size={16} />
                  </button>
                  {idx === 0 && (
                    <div className="absolute bottom-0 inset-x-0 bg-gold/90 text-black text-[10px] font-bold text-center py-1">
                      COVER
                    </div>
                  )}
                </div>
              ))}
              
              {previews.length < 4 && (
                <label className="aspect-square border-2 border-dashed border-border rounded-xl flex flex-col items-center justify-center text-muted hover:text-white hover:border-white hover:bg-surface cursor-pointer py-4 transition-all group">
                  <UploadCloud size={24} className="mb-2 text-muted group-hover:text-gold transition-colors" />
                  <span className="text-xs font-medium text-center px-2">Click to browse<br/>or drag</span>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
              )}
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <GradientButton 
              type="submit" 
              className={uploading ? 'opacity-70 pointer-events-none' : ''}
            >
              {uploading ? (
                <><Loader2 className="animate-spin" size={20} /> Publishing...</>
              ) : 'Publish Product'}
            </GradientButton>
          </div>
        </form>

      </div>
    </div>
  )
}
