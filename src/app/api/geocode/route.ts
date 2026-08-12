import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const q = searchParams.get('q')

  if (!q) {
    return NextResponse.json({ error: 'Query parameter "q" is required' }, { status: 400 })
  }

  try {
    const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(q)}&countrycodes=us&limit=1`, {
      headers: {
        'User-Agent': 'ViracisWizardWashCRM/1.0 (contact@viracis.com)',
        'Accept-Language': 'en',
      },
    })

    if (!res.ok) {
      return NextResponse.json({ error: 'Geocoding service unavailable' }, { status: res.status })
    }

    const data = await res.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Geocoding error:', error)
    return NextResponse.json({ error: 'Internal server error during geocoding' }, { status: 500 })
  }
}
