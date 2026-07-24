import { NextResponse } from 'next/server'

export async function GET() {
  const pesapalEnv = process.env.PESAPAL_ENV || 'sandbox'
  const key = process.env.PESAPAL_CONSUMER_KEY
  const secret = process.env.PESAPAL_CONSUMER_SECRET

  const baseUrl =
    pesapalEnv === 'production'
      ? 'https://pay.pesapal.com/v3'
      : 'https://cybqa.pesapal.com/pesapalv3'

  try {
    // 1. Get Auth Token
    const authRes = await fetch(`${baseUrl}/api/Auth/RequestToken`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ consumer_key: key, consumer_secret: secret }),
    })
    const authData = await authRes.json()

    if (!authData.token) {
      return NextResponse.json({ error: 'Auth failed', authData }, { status: 400 })
    }

    // 2. Register IPN URL
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://sawasite-ai-3o5p.vercel.app'
    const ipnRes = await fetch(`${baseUrl}/api/URLSetup/RegisterIPN`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${authData.token}`,
      },
      body: JSON.stringify({
        url: `${appUrl}/api/checkout`,
        ipn_notification_type: 'POST',
      }),
    })

    const ipnData = await ipnRes.json()
    return NextResponse.json(ipnData)
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}