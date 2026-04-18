'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import type { AuthError } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabase'
import GradientButton from '@/components/ui/GradientButton'
import { Loader2 } from 'lucide-react'
import { toast } from 'react-hot-toast'

export default function AdminLoginPage(): JSX.Element {
  const [email, setEmail]       = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [error, setError]       = useState<string | null>(null)
  const [loading, setLoading]   = useState<boolean>(false)
  const [showPass, setShowPass] = useState<boolean>(false)
  const router = useRouter()

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) router.push('/admin/dashboard')
    })
  }, [router])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const { error: authError }: { error: AuthError | null } = await supabase.auth.signInWithPassword({ 
      email, 
      password 
    })

    if (authError) {
      toast.error(authError.message)
      setLoading(false)
      return
    }

    toast.success('Logged in successfully')
    router.push('/admin/dashboard')
  }

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-surface2 border border-border rounded-3xl p-8 shadow-2xl relative overflow-hidden">
        
        {/* Glow effect */}
        <div className="absolute -top-20 -left-20 w-40 h-40 gradient-bg rounded-full opacity-20 blur-3xl pointer-events-none" />

        <div className="text-center mb-8 relative z-10 flex flex-col items-center">
          <Image 
            src="/capital_stage_hire_logo.jpg" 
            alt="Capital Stage Hire" 
            width={240} 
            height={80} 
            className="h-16 w-auto object-contain rounded-md mb-4"
            priority
          />
          <p className="text-white font-bold text-lg">Admin Login</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted">Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#1a1a1a] border border-[#2a2a2a] text-white rounded-xl px-4 py-3 focus:outline-none focus:border-gold transition-colors"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <label className="text-sm font-medium text-muted">Password</label>
              <button 
                type="button" 
                onClick={() => setShowPass(!showPass)}
                className="text-xs text-gold hover:underline"
              >
                {showPass ? 'Hide' : 'Show'}
              </button>
            </div>
            <input
              type={showPass ? 'text' : 'password'}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#1a1a1a] border border-[#2a2a2a] text-white rounded-xl px-4 py-3 focus:outline-none focus:border-gold transition-colors"
            />
          </div>

          <GradientButton type="submit" fullWidth className={loading ? 'opacity-70' : ''}>
            {loading ? <><Loader2 className="animate-spin" size={20} /> Authenticating...</> : 'Login'}
          </GradientButton>
        </form>

      </div>
    </div>
  )
}
