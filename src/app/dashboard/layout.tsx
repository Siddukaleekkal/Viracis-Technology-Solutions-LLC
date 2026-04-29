import Link from 'next/link'
import Image from 'next/image'
import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { redirect } from 'next/navigation'
import { SidebarNav } from '@/components/SidebarNav'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  // For development: If Supabase env vars are missing, use a mock user
  // so you can preview the dashboard UI without a database connected.
  const isDevelopmentBypass = !process.env.NEXT_PUBLIC_SUPABASE_URL
  const displayUser = isDevelopmentBypass 
    ? { email: 'admin@viracis.com' } 
    : user

  if (!displayUser) {
    redirect('/login')
  }

  let companyName = '' // Default to empty if not found

  if (user) {
    // We use the admin client to bypass the infinite recursion RLS policy on the users table
    const adminSupabase = createAdminClient()
    const { data: userData } = await adminSupabase
      .from('users')
      .select('tenants(name)')
      .eq('id', user.id)
      .single()

    if (userData?.tenants) {
      companyName = (userData.tenants as any).name || ''
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-gray-200 shrink-0">
          <Link href="/dashboard" className="flex items-center">
            <Image
              src="/viracis-logo.png"
              alt="Viracis"
              width={160}
              height={48}
              className="h-10 w-auto object-contain"
            />
          </Link>
        </div>
        
        <SidebarNav />

        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-full bg-viracis-navy text-white flex items-center justify-center text-xs font-bold shrink-0">
              {displayUser.email?.charAt(0).toUpperCase() || 'A'}
            </div>
            <div className="text-sm truncate">
              {companyName && <p className="font-medium text-gray-900 truncate">{companyName}</p>}
              <p className="text-gray-500 truncate">{displayUser.email}</p>
            </div>
          </div>
          <form action="/auth/signout" method="post">
            <button className="w-full text-left px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-md transition-colors">
              Sign out
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0">
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 shrink-0 md:hidden">
          <Image
            src="/viracis-logo.png"
            alt="Viracis"
            width={140}
            height={36}
            className="h-8 w-auto object-contain"
          />
          <button className="p-2 -mr-2 text-gray-500">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </header>

        <div className="flex-1 overflow-y-auto p-6 md:p-8">
          {children}
        </div>
      </main>
    </div>
  )
}
