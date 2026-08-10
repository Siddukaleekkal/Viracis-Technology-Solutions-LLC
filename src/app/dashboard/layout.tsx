import Link from 'next/link'
import Image from 'next/image'
import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { SidebarNav } from '@/components/SidebarNav'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const cookieStore = await cookies()
  const isDevAuth = cookieStore.get('viracis_dev_auth')?.value === 'authenticated'

  let user = null
  if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
    try {
      const supabase = await createClient()
      const { data } = await supabase.auth.getUser()
      user = data.user
    } catch (e) {
      console.error('Supabase get user error:', e)
    }
  }

  const isAuthenticated = isDevAuth || !!user

  if (!isAuthenticated) {
    redirect('/login')
  }

  const userEmail = user?.email || 'omar@wizardwashva.com'
  let companyName = 'Wizard Wash'

  if (user) {
    try {
      const adminSupabase = createAdminClient()
      const { data: userData } = await adminSupabase
        .from('users')
        .select('tenants(name)')
        .eq('id', user.id)
        .single()

      if (userData?.tenants) {
        companyName = (userData.tenants as any).name || companyName
      }
    } catch (e) {
      console.error('Fetch tenant error:', e)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-white border-r border-slate-200 hidden md:flex flex-col">
        
        {/* Top Left of Screen: Viracis Logo */}
        <div className="h-16 flex items-center px-6 border-b border-slate-200 shrink-0">
          <Link href="/dashboard" className="flex items-center">
            <Image
              src="/viracis-logo.png"
              alt="Viracis"
              width={160}
              height={48}
              className="h-9 w-auto object-contain"
              priority
            />
          </Link>
        </div>
        
        <SidebarNav />

        {/* Wizard Wash Section above Sign Out */}
        <div className="p-4 border-t border-slate-200 space-y-3">
          <div className="flex items-center gap-3 p-2 rounded-xl bg-slate-50 border border-slate-200/80">
            <Image
              src="/CRM/Wizard Wash Logo.png"
              alt="Wizard Wash"
              width={40}
              height={40}
              className="w-10 h-10 object-contain rounded-lg shrink-0"
            />
            <div className="text-xs truncate min-w-0">
              <p className="font-extrabold text-slate-900 truncate">{companyName}</p>
              <p className="text-slate-500 truncate text-[11px] font-medium">{userEmail}</p>
            </div>
          </div>

          <form action="/auth/signout" method="post">
            <button className="w-full text-left px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 rounded-lg transition-colors flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Sign out
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 shrink-0 md:hidden">
          <Link href="/dashboard" className="flex items-center">
            <Image
              src="/viracis-logo.png"
              alt="Viracis"
              width={140}
              height={36}
              className="h-8 w-auto object-contain"
            />
          </Link>
          <div className="flex items-center gap-2">
            <Image
              src="/CRM/Wizard Wash Logo.png"
              alt="Wizard Wash"
              width={28}
              height={28}
              className="w-7 h-7 object-contain rounded"
            />
            <form action="/auth/signout" method="post">
              <button className="text-xs text-red-600 font-semibold px-2.5 py-1 bg-red-50 rounded">
                Sign out
              </button>
            </form>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-6 md:p-8">
          {children}
        </div>
      </main>
    </div>
  )
}
