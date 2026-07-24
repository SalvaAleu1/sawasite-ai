import { NextResponse } from 'next/server'

export async function GET() {
  const pesapalEnv = 'sandbox'
  const key = 'wAVSG7E4ekp4on46SUkDOOUnYHC2PZvU'
  const secret = 'C34n62mexyt1mTDtQbkI90cV1F8='

  const baseUrl = 'https://cybqa.pesapal.com/pesapalv3'

  try {
    const authRes = await fetch(\/api/Auth/RequestToken, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ consumer_key: key, consumer_secret: secret }),
    })
    const authData = await authRes.json()

    if (!authData.token) {
      return NextResponse.json({ error: 'Auth failed', authData }, { status: 400 })
    }

    const appUrl = 'https://sawasite-ai-gr21.vercel.app'
    const ipnRes = await fetch(\/api/URLSetup/RegisterIPN, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: Bearer \,
      },
      body: JSON.stringify({
        url: \/api/checkout,
        ipn_notification_type: 'POST',
      }),
    })

    const ipnData = await ipnRes.json()
    return NextResponse.json(ipnData)
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
