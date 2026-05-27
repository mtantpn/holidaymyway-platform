import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json()
    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
    }

    const formId = process.env.NEXT_PUBLIC_KIT_FORM_ID
    const apiSecret = process.env.KIT_API_SECRET

    if (!formId || formId === '0000000' || !apiSecret || apiSecret === 'your_kit_api_secret') {
      // Kit not configured yet — succeed silently in dev
      return NextResponse.json({ ok: true })
    }

    const res = await fetch(`https://api.convertkit.com/v3/forms/${formId}/subscribe`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ api_secret: apiSecret, email }),
    })

    if (!res.ok) {
      const body = await res.text()
      console.error('Kit API error:', body)
      return NextResponse.json({ error: 'Subscription failed' }, { status: 502 })
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Subscribe route error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
