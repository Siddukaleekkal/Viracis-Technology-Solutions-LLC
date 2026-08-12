'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { createClient } from '@/lib/supabase/server'

export async function login(formData: FormData) {
  const emailInput = (formData.get('email') as string)?.trim().toLowerCase()
  const passwordInput = (formData.get('password') as string)?.trim()

  const validUsernames = ['admin@viracis.com', 'admin', 'omar@wizardwashva.com', 'admin@wizardwashva.com']
  const validPasswords = ['Viracis!@', 'Viracis!', 'WizardWash!', 'admin', 'admin123']

  // Authentication check (Supports admin@viracis.com / Viracis!@)
  if (
    validUsernames.includes(emailInput) && validPasswords.includes(passwordInput)
  ) {
    const resolvedEmail = (emailInput === 'admin' || emailInput === 'admin@viracis.com')
      ? 'admin@viracis.com'
      : 'omar@wizardwashva.com'

    const cookieStore = await cookies()
    cookieStore.set('viracis_dev_auth', 'authenticated', {
      path: '/',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    })
    cookieStore.set('viracis_user_email', resolvedEmail, {
      path: '/',
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7,
    })
    revalidatePath('/dashboard', 'layout')
    redirect('/dashboard')
  }

  // Supabase auth check if URL is configured
  if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
    try {
      const supabase = await createClient()
      const { error } = await supabase.auth.signInWithPassword({ email: emailInput, password: passwordInput })

      if (!error) {
        revalidatePath('/dashboard', 'layout')
        redirect('/dashboard')
      }
    } catch (e) {
      console.error('Supabase auth error:', e)
    }
  }

  redirect('/login?error=' + encodeURIComponent('Invalid username or password. Please try again.'))
}
