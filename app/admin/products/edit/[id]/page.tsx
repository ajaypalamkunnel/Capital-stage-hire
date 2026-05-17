'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { toSlug } from '@/lib/utils'
import type { Category, ProductFormState, ProductWithCategory } from '@/types/database'
import { supabase } from '@/lib/supabase'
import { ArrowLeft, UploadCloud, X, Loader2 } from 'lucide-react'
import GradientButton from '@/components/ui/GradientButton'
import { toast } from 'react-hot-toast'

interface EditProductPageProps {
  params: { id: string }
}

export default function EditProductPage({ params }: EditProductPageProps) {
  const [form, setForm] = useState<ProductFormState>({
    name:          '',
    slug:          '',
    description:   '',
    category_id:   '',
    is_visible:    true,
    display_order: 0,
  })

  const [categories, setCategories] = useState<Category[]>([])
  
  // Image handling states
  const [existingImages, setExistingImages] = useState<string[]>([])
  const [imagesToDelete, setImagesToDelete] = useState<string[]>([])
  const [files, setFiles]                   = useState<File[]>([])
  const [previews, setPreviews]             = useState<string[]>([])
  
  const [uploading, setUploading] = useState<boolean>(false)
  const [loading, setLoading]     = useState<boolean>(true)
  const router = useRouter()

  const loadProductAndCategories = useCallback(async () => {
    // Load Categories
    const { data: catData } = await supabase.from('categories').select('*').order('display_order')
    setCategories((catData as unknown as Category[]) ?? [])

    // Load Product
    const { data: prodData, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', params.id)
      .single()

    if (error || !prodData) {
      toast.error('Product not found')
      router.push('/admin/products')
      return
    }

    const product = prodData as unknown as ProductWithCategory
    
    setForm({
      name: product.name,
      slug: product.slug,
      description: product.description ?? '',
      category_id: product.category_id ?? '',
      is_visible: product.is_visible,
      display_order: product.display_order,
    })

    setExistingImages(product.image_urls ?? [])
    setLoading(false)
  }, [params.id, router])

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) { router.push('/admin/login'); return }
      loadProductAndCategories()
    })
  }, [loadProductAndCategories, router])


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

  const removeExistingImage = (idx: number): void => {
    const urlToRemove = existingImages[idx]
    setImagesToDelete(prev => [...prev, urlToRemove])
    setExistingImages(prev => prev.filter((_, i) => i !== idx))
  }

  const removeNewFile = (idx: number): void => {
    setFiles(prev => prev.filter((_, i) => i !== idx))
    setPreviews(prev => prev.filter((_, i) => i !== idx))
  }

  const validate = (): boolean => {
    if (!form.name.trim()) { toast.error('Name is required'); return false }
    if (!form.category_id) { toast.error('Category is required'); return false }
    if (!form.description.trim()) { toast.error('Description is required'); return false }
    if (existingImages.length === 0 && files.length === 0) { 
      toast.error('At least one image must be present')
      return false 
    }
    return true
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    if (!validate()) return
    setUploading(true)

    // 1. Delete removed images from storage
    for (const url of imagesToDelete) {
      if (!url) continue
      const filename = url.split('/').pop()
      if (filename) {
        await supabase.storage.from('product-images').remove([filename])
      }
    }

    // 2. Upload new images
    const newImageUrls: string[] = []
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
        newImageUrls.push(publicUrl)
      }
    }

    // 3. Combine remaining existing images with new uploaded images
    const finalImageUrls = [...existingImages, ...newImageUrls]

    // 4. Update product in DB
    const { error } = await supabase.from('products').update({
      ...form,
      image_urls: finalImageUrls,
      updated_at: new Date().toISOString()
    }).eq('id', params.id)

    if (error) {
      toast.error(`Error updating product: ${error.message}`)
      setUploading(false)
      return
    }

    toast.success('Product updated successfully!')
    setUploading(false)
    router.push('/admin/products')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black pt-24 pb-20 flex items-center justify-center">
        <Loader2 className="animate-spin text-gold" size={48} />
      </div>
    )
  }

  const totalImages = existingImages.length + previews.length

  return (
    <div className="min-h-screen bg-black pt-24 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <Link href="/admin/products" className="text-muted hover:text-white flex items-center gap-2 text-sm mb-8 inline-flex">
          <ArrowLeft size={16} /> Back to Products
        </Link>
        
        <h1 className="font-montserrat font-black text-3xl text-white mb-10">Edit Product</h1>

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
              
              {/* Render Existing Images */}
              {existingImages.map((src, idx) => (
                <div key={`existing-${idx}`} className="relative aspect-square border border-border rounded-xl overflow-hidden bg-surface group">
                  <Image src={src} alt="Existing product image" fill className="object-cover" sizes="200px" />
                  <button
                    type="button"
                    onClick={() => removeExistingImage(idx)}
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

              {/* Render New Upload Previews */}
              {previews.map((src, idx) => (
                <div key={`new-${idx}`} className="relative aspect-square border border-border rounded-xl overflow-hidden bg-surface group">
                  <Image src={src} alt="New preview" fill className="object-cover" sizes="200px" />
                  <button
                    type="button"
                    onClick={() => removeNewFile(idx)}
                    className="absolute top-2 right-2 w-8 h-8 bg-black/50 hover:bg-red-500 text-white rounded-full flex items-center justify-center backdrop-blur-sm transition-colors opacity-0 group-hover:opacity-100"
                  >
                    <X size={16} />
                  </button>
                  {existingImages.length === 0 && idx === 0 && (
                    <div className="absolute bottom-0 inset-x-0 bg-gold/90 text-black text-[10px] font-bold text-center py-1">
                      COVER
                    </div>
                  )}
                </div>
              ))}
              
              {/* Upload Button */}
              {totalImages < 4 && (
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
                <><Loader2 className="animate-spin" size={20} /> Updating...</>
              ) : 'Update Product'}
            </GradientButton>
          </div>
        </form>

      </div>
    </div>
  )
}
