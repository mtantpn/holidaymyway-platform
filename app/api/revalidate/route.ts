import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'

export async function POST(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get('secret')
  if (secret !== process.env.SANITY_REVALIDATE_SECRET) {
    return NextResponse.json({ error: 'Invalid secret' }, { status: 401 })
  }

  try {
    const body = await req.json()
    const { _type, slug } = body

    switch (_type) {
      case 'article':
        revalidatePath('/blog')
        revalidatePath('/')
        if (slug?.current) revalidatePath(`/blog/${slug.current}`)
        break
      case 'destination':
        revalidatePath('/destinations')
        revalidatePath('/')
        if (slug?.current) revalidatePath(`/destinations/${slug.current}`)
        break
      case 'category':
        if (slug?.current) revalidatePath(`/blog/category/${slug.current}`)
        break
      case 'siteSettings':
        revalidatePath('/', 'layout')
        break
    }

    return NextResponse.json({ revalidated: true, type: _type })
  } catch (err) {
    console.error('Revalidate error:', err)
    return NextResponse.json({ error: 'Revalidation failed' }, { status: 500 })
  }
}
