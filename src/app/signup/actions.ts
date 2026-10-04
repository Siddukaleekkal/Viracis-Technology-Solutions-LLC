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

    // Notify siddu@viracis.com of new account registration
    if (process.env.RESEND_API_KEY) {
      try {
        const { Resend } = await import('resend');
        const resend = new Resend(process.env.RESEND_API_KEY);
        const fromEmail = process.env.RESEND_FROM_EMAIL || "Viracis Notifications <onboarding@resend.dev>";
        await resend.emails.send({
          from: fromEmail,
          to: ["siddu@viracis.com"],
          subject: `New Account Created: ${data.options.data.full_name} (${data.options.data.company_name})`,
          html: `
            <div style="font-family: sans-serif; max-width: 500px; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
              <h2 style="color: #0B1B3D; margin-top: 0;">New Account Registered</h2>
              <p>A new user just created an account on Viracis:</p>
              <ul>
                <li><strong>Name:</strong> ${data.options.data.full_name}</li>
                <li><strong>Company:</strong> ${data.options.data.company_name}</li>
                <li><strong>Email:</strong> <a href="mailto:${data.email}">${data.email}</a></li>
              </ul>
            </div>
          `,
        });
      } catch (notifyErr) {
        console.error("Failed to send signup notification to siddu@viracis.com:", notifyErr);
      }
    }
  }

  revalidatePath('/', 'layout')
  redirect('/dashboard')
}
