"use client";

import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { login } from "./actions";

export default function LoginForm() {
  const searchParams = useSearchParams();
  const errorParam = searchParams.get("error");

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    // Allow native form action to run or invoke login action
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {errorParam && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-start gap-2.5 animate-fadeIn">
          <svg
            className="w-4 h-4 text-red-500 shrink-0 mt-0.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <span className="leading-relaxed">{errorParam}</span>
        </div>
      )}

      <form action={login} onSubmit={handleSubmit} className="space-y-5">
        {/* Email Field */}
        <div>
          <label className="text-[10px] sm:text-[11px] font-bold tracking-wider uppercase text-gray-700 mb-1.5 block">
            EMAIL ADDRESS<span className="text-viracis-cyan">*</span>
          </label>
          <input
            type="text"
            name="email"
            required
            autoComplete="username"
            placeholder="operator@company.com"
            className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white border border-gray-200 rounded-lg text-black placeholder:text-gray-400 focus:outline-none focus:border-viracis-cyan focus:ring-1 focus:ring-viracis-cyan transition-colors"
          />
        </div>

        {/* Password Field */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-[10px] sm:text-[11px] font-bold tracking-wider uppercase text-gray-700 block">
              PASSWORD<span className="text-viracis-cyan">*</span>
            </label>
            <a
              href="mailto:support@viracis.com?subject=Password%20Reset%20Request"
              className="text-[11px] text-viracis-cyan hover:text-viracis-cyan-hover hover:underline transition-colors font-medium"
            >
              Forgot password?
            </a>
          </div>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              required
              autoComplete="current-password"
              placeholder="••••••••"
              className="w-full pl-3.5 pr-10 py-2.5 text-xs sm:text-sm bg-white border border-gray-200 rounded-lg text-black placeholder:text-gray-400 focus:outline-none focus:border-viracis-cyan focus:ring-1 focus:ring-viracis-cyan transition-colors"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18"
                  />
                </svg>
              ) : (
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Remember device checkbox */}
        <div className="flex items-center gap-2 pt-1">
          <input
            type="checkbox"
            id="remember"
            name="remember"
            defaultChecked
            className="w-4 h-4 text-viracis-navy border-gray-300 rounded focus:ring-viracis-cyan cursor-pointer"
          />
          <label htmlFor="remember" className="text-xs text-gray-600 select-none cursor-pointer">
            Remember this device for 30 days
          </label>
        </div>

        {/* Support Note */}
        <p className="text-[10px] sm:text-[11px] text-gray-400 leading-normal pt-2">
          If you are looking for support, please email{" "}
          <a
            href="mailto:support@viracis.com"
            className="text-gray-600 underline hover:text-black"
          >
            support@viracis.com
          </a>
          .
        </p>

        {/* Submit Button */}
        <div className="flex justify-end pt-3">
          <button
            type="submit"
            disabled={loading}
            className="bg-viracis-navy hover:bg-viracis-cyan text-white px-8 py-2.5 rounded-full font-bold text-xs tracking-wider uppercase shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-50 flex items-center gap-2"
          >
            {loading ? (
              <>
                <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Signing In...</span>
              </>
            ) : (
              "Sign In"
            )}
          </button>
        </div>
      </form>

      {/* Demo Link Card */}
      <div className="mt-10 pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
        <span className="text-gray-500">Don&apos;t have an account yet?</span>
        <Link
          href="/contact"
          className="font-bold text-viracis-cyan hover:text-viracis-cyan-hover hover:underline transition-colors"
        >
          Schedule a 1-on-1 Demo →
        </Link>
      </div>

      {/* Direct App Link */}
      <div className="mt-4 text-center">
        <a
          href="https://app.viracis.com/login"
          className="text-[11px] text-gray-400 hover:text-gray-600 transition-colors"
        >
          Access legacy web portal directly at app.viracis.com ↗
        </a>
      </div>
    </div>
  );
}
