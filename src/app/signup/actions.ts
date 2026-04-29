'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export async function signup(formData: FormData) {
  const supabase = await createClient()

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
    options: {
      data: {
        company_name: formData.get('companyName') as string,
        full_name: formData.get('fullName') as string,
      }
    }
  }

  // Next.js App Router server action signup
  const { data: authData, error } = await supabase.auth.signUp(data)

  if (error) {
    redirect('/signup?error=' + encodeURIComponent(error.message))
  }

  // Sync the authenticated user to the public schema to create their tenant
  if (authData?.user) {
    const { error: rpcError } = await supabase.rpc('create_tenant_and_user', {
      company_name: data.options.data.company_name,
      user_id: authData.user.id,
      user_email: authData.user.email,
      user_full_name: data.options.data.full_name
    })

    if (rpcError) {
      console.error('RPC Error creating tenant:', rpcError)
    }
  }

  revalidatePath('/', 'layout')
  redirect('/dashboard')
}
