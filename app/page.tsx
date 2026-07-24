'use client'

import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()

  return (
    <main style={{ padding: '60px 20px', fontFamily: 'sans-serif', textAlign: 'center', background: '#f9fafb', minHeight: '100vh' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto', background: 'white', padding: '40px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '15px', color: '#111' }}>SawaSite AI</h1>
        <p style={{ fontSize: '1.1rem', color: '#6b7280', marginBottom: '30px' }}>
          Welcome back! Your intelligent application and website builder platform is ready.
        </p>
        <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
          <button
            onClick={() => router.push('/login')}
            style={{ background: '#2563eb', color: 'white', border: 'none', padding: '12px 25px', fontSize: '1rem', fontWeight: 'bold', borderRadius: '8px', cursor: 'pointer' }}
          >
            Login to Dashboard
          </button>
          <button
            onClick={() => router.push('/pricing')}
            style={{ background: '#f3f4f6', color: '#374151', border: '1px solid #d1d5db', padding: '12px 25px', fontSize: '1rem', fontWeight: 'bold', borderRadius: '8px', cursor: 'pointer' }}
          >
            View Pricing
          </button>
        </div>
      </div>
    </main>
  )
}