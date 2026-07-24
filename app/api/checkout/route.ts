import { NextResponse } from 'next/server'
import { Pesapal } from 'pesapal-v3'

export async function POST(req: Request) {
  try {
    const { email, amount } = await req.json()

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 })
    }

    const pesapal = new Pesapal({
      consumerKey: process.env.PESAPAL_CONSUMER_KEY!,
      consumerSecret: process.env.PESAPAL_CONSUMER_SECRET!,
      environment: process.env.PESAPAL_ENV === 'production' ? 'production' : 'sandbox',
    })

    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

    // Submit order request to Pesapal
    const orderResponse = await pesapal.submitOrder({
      id: `sawasite_${Date.now()}`,
      currency: 'USD',
      amount: amount || 10,
      description: 'SawaSite AI Pro Monthly Subscription',
      callback_url: `${baseUrl}/dashboard?payment=success`,
      notification_id: '', // Add your registered IPN ID here once generated
      billing_address: {
        email_address: email,
        first_name: email.split('@')[0],
      },
    })

    return NextResponse.json({ success: true, redirectUrl: orderResponse.redirect_url })
  } catch (error: any) {
    console.error('Pesapal Checkout Error:', error)
    return NextResponse.json({ error: error.message || 'Payment initiation failed' }, { status: 500 })
  }
}