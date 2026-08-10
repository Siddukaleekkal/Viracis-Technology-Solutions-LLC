'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { createClient } from '@/lib/supabase/server'

export async function login(formData: FormData) {
  const email = (formData.get('email') as string)?.trim().toLowerCase()
  const password = (formData.get('password') as string)?.trim()

  const validEmails = ['omar@wizardwashva.com', 'admin@viracis.com']
  const validPasswords = ['Viracis!', 'WizardWash!']

  // Development & Admin credentials check
  if (validEmails.includes(email) && validPasswords.includes(password)) {
    const cookieStore = await cookies()
    cookieStore.set('viracis_dev_auth', 'authenticated', {
      path: '/',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    })
    revalidatePath('/dashboard', 'layout')
    redirect('/dashboard')
  }

  // Supabase auth check if URL is configured
  if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
    try {
      const supabase = await createClient()
      const { error } = await supabase.auth.signInWithPassword({ email, password })

      if (!error) {
        revalidatePath('/dashboard', 'layout')
        redirect('/dashboard')
      }
    } catch (e) {
      console.error('Supabase auth error:', e)
    }
  }

  redirect('/login?error=' + encodeURIComponent('Invalid email or password. Please try again.'))
}
