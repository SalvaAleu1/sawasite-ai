'use client'
import { useEffect, useState } from 'react'

export default function Home() {
  const [ipnId, setIpnId] = useState('Loading IPN ID...')

  useEffect(() => {
    fetch('/api/register-ipn')
      .then(res => res.json())
      .then(data => {
        if (data.ipn_id) {
          setIpnId(data.ipn_id)
        } else {
          setIpnId(JSON.stringify(data, null, 2))
        }
      })
      .catch(err => setIpnId('Error: ' + err.message))
  }, [])

  return (
    <main style={{ padding: '50px', fontFamily: 'sans-serif' }}>
      <h1>Your Pesapal IPN ID is:</h1>
      <pre style={{ background: '#f4f4f4', padding: '20px', fontSize: '18px', fontWeight: 'bold' }}>
        {ipnId}
      </pre>
    </main>
  )
}