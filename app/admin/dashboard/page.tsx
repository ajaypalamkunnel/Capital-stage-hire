'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import type { Session } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabase'
import { LogOut, Package, ListTree, Eye, EyeOff } from 'lucide-react'

export default function AdminDashboard() {
  const [session, setSession] = useState<Session | null>(null)
  const [stats, setStats] = useState<{
    totalProducts:      number
    visibleProducts:    number
    totalCategories:    number
    activeCategories:   number
  }>({
    totalProducts: 0, visibleProducts: 0,
    totalCategories: 0, activeCategories: 0,
  })
  const router = useRouter()

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) { router.push('/admin/login'); return }
      setSession(session)
      loadStats()
    })
  }, [router])

  const loadStats = async (): Promise<void> => {
    const [
      { count: totalProducts },
      { count: visibleProducts },
      { count: totalCategories },
      { count: activeCategories },
    ] = await Promise.all([
      supabase.from('products').select('*', { count: 'exact', head: true }),
      supabase.from('products').select('*', { count: 'exact', head: true }).eq('is_visible', true),
      supabase.from('categories').select('*', { count: 'exact', head: true }),
      supabase.from('categories').select('*', { count: 'exact', head: true }).eq('is_active', true),
    ])
    setStats({
      totalProducts:    totalProducts    ?? 0,
      visibleProducts:  visibleProducts  ?? 0,
      totalCategories:  totalCategories  ?? 0,
      activeCategories: activeCategories ?? 0,
    })
  }

  const handleLogout = async (): Promise<void> => {
    await supabase.auth.signOut()
    router.push('/admin/login')
  }

  if (!session) return <div className="min-h-screen bg-black" />

  return (
    <div className="min-h-screen bg-black pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-12">
          <div>
            <h1 className="font-montserrat font-black text-3xl text-white mb-2">Admin Dashboard</h1>
            <p className="text-muted">Welcome back, {session.user.email}</p>
          </div>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-surface2 border border-border rounded-lg text-white hover:text-red-400 hover:border-red-400/50 transition-colors"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
          <Link href="/admin/products" className="group bg-surface2 border border-border p-6 rounded-2xl hover:border-gold transition-colors flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center text-black">
                <Package size={24} />
              </div>
              <div>
                <h3 className="text-white font-bold text-lg group-hover:text-gold transition-colors">Manage Products</h3>
                <p className="text-muted text-sm">Add, edit, or remove hire equipment</p>
              </div>
            </div>
            <div className="text-gold opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:translate-x-1">&rarr;</div>
          </Link>

          <Link href="/admin/categories" className="group bg-surface2 border border-border p-6 rounded-2xl hover:border-amber transition-colors flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center text-black">
                <ListTree size={24} />
              </div>
              <div>
                <h3 className="text-white font-bold text-lg group-hover:text-amber transition-colors">Manage Categories</h3>
                <p className="text-muted text-sm">Organise your product hierarchy</p>
              </div>
            </div>
            <div className="text-amber opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:translate-x-1">&rarr;</div>
          </Link>
        </div>

        {/* Stats Grid */}
        <h2 className="text-xl font-bold text-white mb-6">Overview</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-surface border border-border p-6 rounded-2xl">
            <div className="flex items-center justify-between mb-4">
              <div className="text-muted font-medium">Total Products</div>
              <Package size={18} className="text-gold" />
            </div>
            <div className="font-montserrat font-black text-4xl text-white">{stats.totalProducts}</div>
          </div>

          <div className="bg-surface border border-border p-6 rounded-2xl">
            <div className="flex items-center justify-between mb-4">
              <div className="text-muted font-medium">Visible Online</div>
              <Eye size={18} className="text-[#25D366]" />
            </div>
            <div className="font-montserrat font-black text-4xl text-white">{stats.visibleProducts}</div>
            <div className="text-xs text-muted mt-2">{stats.totalProducts - stats.visibleProducts} hidden</div>
          </div>

          <div className="bg-surface border border-border p-6 rounded-2xl">
            <div className="flex items-center justify-between mb-4">
              <div className="text-muted font-medium">Categories</div>
              <ListTree size={18} className="text-amber" />
            </div>
            <div className="font-montserrat font-black text-4xl text-white">{stats.totalCategories}</div>
          </div>

          <div className="bg-surface border border-border p-6 rounded-2xl">
            <div className="flex items-center justify-between mb-4">
              <div className="text-muted font-medium">Hidden Categories</div>
              <EyeOff size={18} className="text-red-400" />
            </div>
            <div className="font-montserrat font-black text-4xl text-white">{stats.totalCategories - stats.activeCategories}</div>
          </div>
        </div>

      </div>
    </div>
  )
}
