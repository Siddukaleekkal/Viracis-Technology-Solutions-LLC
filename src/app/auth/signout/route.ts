import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function POST(req: Request) {
  const cookieStore = await cookies()
  cookieStore.delete('viracis_dev_auth')

  if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
    try {
      const supabase = await createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        await supabase.auth.signOut()
      }
    } catch (e) {
      console.error('Signout error:', e)
    }
  }

  revalidatePath('/', 'layout')
  
  return NextResponse.redirect(new URL('/login', req.url), {
    status: 302,
  })
}
