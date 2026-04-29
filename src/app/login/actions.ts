'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export async function login(formData: FormData) {
  const email = (formData.get('email') as string)?.trim()
  const password = (formData.get('password') as string)?.trim()

  // Development bypass for hardcoded admin
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    if (email === 'admin@viracis.com' && password === 'Sidpav2003!@') {
      revalidatePath('/dashboard', 'layout')
      redirect('/dashboard')
    } else {
      console.log('Bypass failed for:', { email, password })
      redirect('/login?error=Invalid credentials for local dev mode.')
    }
  }

  const supabase = await createClient()

  const data = { email, password }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    redirect('/login?error=' + encodeURIComponent(error.message))
  }

  revalidatePath('/dashboard', 'layout')
  redirect('/dashboard')
}
