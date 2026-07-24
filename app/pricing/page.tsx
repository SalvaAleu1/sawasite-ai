'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

export default function PricingPage() {
  const [user, setUser] = useState<{ id: string; email: string } | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const supabase = createClient()
  const router = useRouter()

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (user?.email) {
        setUser({ id: user.id, email: user.email })
      }
    }
    getUser()
  }, [supabase])

  const handlePesapalCheckout = async () => {
    if (!user) {
      router.push('/login')
      return
    }

    setLoading(true)
    setError(null)

    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: user.email, amount: 10 }),
      })

      const data = await res.json()

      if (!res.ok || !data.redirectUrl) {
        throw new Error(data.error || 'Failed to initiate Pesapal checkout')
      }

      // Redirect user to Pesapal secure payment page
      window.location.href = data.redirectUrl
    } catch (err: any) {
      setError(err.message || 'Payment failed to load')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col items-center justify-center p-6">
      <div className="max-w-4xl w-full text-center mb-12">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-teal-200 bg-clip-text text-transparent mb-3">
          SawaSite AI Pricing
        </h1>
        <p className="text-slate-400 text-sm">
          Select a plan to start generating and saving AI websites.
        </p>
      </div>

      {error && (
        <div className="mb-6 p-3 bg-red-500/10 border border-red-500/20 text-red-400 text-xs rounded-lg max-w-md w-full text-center">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full">
        {/* Free Plan */}
        <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6 flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-200 mb-2">Free Starter</h2>
            <p className="text-xs text-slate-400 mb-6">Explore AI website creation</p>
            <div className="text-3xl font-extrabold text-white mb-6">$0 <span className="text-xs font-normal text-slate-400">/ forever</span></div>
            <ul className="text-xs text-slate-300 space-y-3 mb-6 text-left">
              <li>✓ Generate basic website designs</li>
              <li>✓ Live preview inside iframe</li>
              <li>✓ Copy generated code</li>
              <li className="text-slate-500">✗ Save sites to Supabase</li>
            </ul>
          </div>
          <button
            onClick={() => router.push('/dashboard')}
            className="w-full py-2.5 bg-slate-700 hover:bg-slate-600 font-semibold rounded-lg text-xs transition"
          >
            Continue with Free
          </button>
        </div>

        {/* Pro Plan */}
        <div className="bg-slate-800/80 border-2 border-emerald-500/80 rounded-2xl p-6 flex flex-col justify-between relative shadow-lg shadow-emerald-500/10">
          <div className="absolute -top-3 right-6 bg-emerald-500 text-slate-950 font-bold text-[10px] uppercase px-2.5 py-0.5 rounded-full">
            Recommended
          </div>
          <div>
            <h2 className="text-xl font-bold text-emerald-400 mb-2">Pro Plan</h2>
            <p className="text-xs text-slate-400 mb-6">Full storage & unlimited site generation</p>
            <div className="text-3xl font-extrabold text-white mb-6">$10 <span className="text-xs font-normal text-slate-400">/ month</span></div>
            <ul className="text-xs text-slate-300 space-y-3 mb-6 text-left">
              <li>✓ Unlimited AI website generations</li>
              <li>✓ Save & manage sites in Supabase</li>
              <li>✓ Export & download `.html` files</li>
              <li>✓ Card & Mobile Payments via Pesapal</li>
            </ul>
          </div>
          <button
            onClick={handlePesapalCheckout}
            disabled={loading}
            className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 text-slate-950 font-bold rounded-lg text-xs transition"
          >
            {loading ? 'Redirecting to Pesapal...' : 'Subscribe with Pesapal'}
          </button>
        </div>
      </div>
    </div>
  )
}