import Link from 'next/link'
import Image from 'next/image'
import { signup } from './actions'

export default async function SignupPage(props: { searchParams: Promise<{ error?: string }> }) {
  const searchParams = await props.searchParams
  return (
    <div className="min-h-screen flex items-center justify-center relative bg-[#FAFAFA] overflow-hidden py-12">
      
      {/* Premium Enterprise Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay pointer-events-none"></div>
        {/* Soft abstract orbs */}
        <div className="absolute top-[10%] right-[10%] w-[40%] h-[50%] bg-viracis-cyan/10 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-[10%] left-[10%] w-[40%] h-[50%] bg-viracis-navy/5 rounded-full blur-[120px] pointer-events-none"></div>
      </div>

      {/* Signup Card */}
      <div className="relative z-10 w-full max-w-[440px] p-6 sm:p-10">
        
        <div className="flex justify-center mb-8">
          <Link href="/">
            <Image
              src="/viracis-logo.png"
              alt="Viracis"
              width={160}
              height={50}
              className="h-9 w-auto object-contain"
            />
          </Link>
        </div>

        <div className="bg-white/80 backdrop-blur-xl border border-gray-200/60 shadow-[0_8px_40px_-12px_rgba(0,0,0,0.1)] rounded-2xl p-8 sm:p-10">
          
          <div className="mb-8 text-center">
            <h1 className="text-[22px] font-semibold text-gray-900 tracking-tight mb-1.5">
              Create your account
            </h1>
            <p className="text-[14px] text-gray-500">
              Deploy your autonomous lead engine
            </p>
          </div>

          <form className="space-y-4">
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-[13px] font-medium text-gray-700" htmlFor="companyName">
                  Company
                </label>
                <input
                  id="companyName"
                  name="companyName"
                  type="text"
                  required
                  className="w-full px-3.5 py-2.5 bg-white border border-gray-200/80 rounded-lg text-[14px] text-gray-900 focus:ring-2 focus:ring-viracis-navy/20 focus:border-viracis-navy transition-all outline-none shadow-sm placeholder:text-gray-400"
                  placeholder="Viracis"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-[13px] font-medium text-gray-700" htmlFor="fullName">
                  Full Name
                </label>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  required
                  className="w-full px-3.5 py-2.5 bg-white border border-gray-200/80 rounded-lg text-[14px] text-gray-900 focus:ring-2 focus:ring-viracis-navy/20 focus:border-viracis-navy transition-all outline-none shadow-sm placeholder:text-gray-400"
                  placeholder="John Smith"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-[13px] font-medium text-gray-700" htmlFor="email">
                Work Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="w-full px-3.5 py-2.5 bg-white border border-gray-200/80 rounded-lg text-[14px] text-gray-900 focus:ring-2 focus:ring-viracis-navy/20 focus:border-viracis-navy transition-all outline-none shadow-sm placeholder:text-gray-400"
                placeholder="admin@viracis.com"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-[13px] font-medium text-gray-700" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="w-full px-3.5 py-2.5 bg-white border border-gray-200/80 rounded-lg text-[14px] text-gray-900 focus:ring-2 focus:ring-viracis-navy/20 focus:border-viracis-navy transition-all outline-none shadow-sm placeholder:text-gray-400"
                placeholder="••••••••"
                minLength={6}
              />
            </div>

            {searchParams?.error && (
              <div className="p-3 bg-red-50 text-red-600 text-[13px] rounded-lg border border-red-100 flex items-center gap-2">
                <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {searchParams.error}
              </div>
            )}

            <button
              formAction={signup}
              className="w-full py-2.5 px-4 bg-gray-900 text-white text-[14px] font-medium rounded-lg shadow-sm hover:bg-gray-800 focus:ring-2 focus:ring-gray-900/20 focus:outline-none transition-all mt-4"
            >
              Continue
            </button>
            
            <p className="text-[12px] text-gray-500 text-center mt-4">
              By continuing, you agree to our Terms of Service and Privacy Policy.
            </p>
          </form>

        </div>

        <div className="mt-6 text-center">
          <p className="text-[14px] text-gray-500">
            Already have an account?{' '}
            <Link href="/login" className="font-medium text-gray-900 hover:text-gray-700 transition-colors">
              Sign in
            </Link>
          </p>
        </div>

      </div>
    </div>
  )
}
