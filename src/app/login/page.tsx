import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import LoginForm from "./LoginForm";

export const metadata: Metadata = {
  title: "Sign In | Viracis Field Operations Platform",
  description:
    "Log in to the Viracis Platform to manage territory canvassing, automated fleet dispatch, doorstep agreements, and real-time operations.",
};

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#071626] text-white flex flex-col lg:flex-row">
      {/* LEFT COLUMN: Viracis Case Studies & Results Showcase */}
      <div className="w-full lg:w-[54%] xl:w-[56%] bg-gradient-to-br from-[#071b2f] via-[#0A2540] to-[#040f1a] p-6 sm:p-10 lg:p-14 xl:p-16 border-b lg:border-b-0 lg:border-r border-white/10 relative overflow-hidden">
        {/* Ambient Cyan Glows */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-viracis-cyan/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 -right-32 w-80 h-80 bg-viracis-cyan/10 rounded-full blur-3xl pointer-events-none" />

        {/* Topographic Contour Overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-15 mix-blend-overlay">
          <svg
            viewBox="0 0 1000 1200"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full object-cover"
            preserveAspectRatio="none"
          >
            <path
              d="M-100,100 C150,50 350,220 600,120 C850,20 950,250 1100,180"
              fill="none"
              stroke="#ffffff"
              strokeWidth="2"
            />
            <path
              d="M-100,260 C200,200 420,380 700,280 C950,180 1000,400 1100,340"
              fill="none"
              stroke="#ffffff"
              strokeWidth="2"
            />
            <path
              d="M-100,420 C240,360 500,540 800,440 C1050,340 1050,560 1100,500"
              fill="none"
              stroke="#ffffff"
              strokeWidth="2"
            />
            <path
              d="M-100,580 C220,520 460,700 750,600 C1000,500 1020,720 1100,660"
              fill="none"
              stroke="#ffffff"
              strokeWidth="2"
            />
            <path
              d="M-100,740 C180,680 380,860 650,760 C900,660 980,880 1100,820"
              fill="none"
              stroke="#ffffff"
              strokeWidth="2"
            />
          </svg>
        </div>

        <div className="relative z-10 max-w-2xl mx-auto lg:mx-0">
          {/* Top Eyebrow */}
          <span className="font-mono text-viracis-cyan font-bold text-xs tracking-[0.25em] uppercase mb-4 inline-block">
            LET&apos;S TALK
          </span>

          {/* Main Headline */}
          <h1 className="font-heading text-3xl sm:text-4xl lg:text-[46px] font-normal text-white leading-[1.12] tracking-tight mb-5">
            See What Viracis Can Do For Your Field Operations
          </h1>

          {/* Subheading */}
          <p className="text-white/80 text-xs sm:text-sm md:text-[15px] leading-relaxed max-w-xl mb-10">
            We&apos;ll connect and show you the platform built for the field service operator to maximize revenue while enhancing the customer experience.
          </p>

          {/* Section Subhead */}
          <h2 className="font-heading text-xl sm:text-2xl font-normal text-white tracking-tight mb-8">
            Proven Results in the Field
          </h2>

          {/* CASE STUDY CARD 1 */}
          <div className="mb-14 pb-12 border-b border-white/10">
            {/* Visual Frame */}
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden bg-gradient-to-b from-[#0b294a] via-[#09203a] to-[#051324] border border-white/15 p-6 sm:p-8 flex items-center justify-center shadow-2xl mb-6">
              {/* Subtle Ambient light behind device */}
              <div className="absolute inset-0 bg-radial from-viracis-cyan/20 via-transparent to-transparent pointer-events-none" />

              <div className="relative z-10 w-full max-w-[280px] sm:max-w-[320px] transition-transform duration-300 hover:scale-[1.02]">
                <Image
                  src="/images/Device Images/hero-iphone.png"
                  alt="Viracis Field Tech Mobile Interface"
                  width={340}
                  height={680}
                  className="w-full h-auto object-contain drop-shadow-2xl"
                  priority
                />
              </div>
            </div>

            {/* Story Title */}
            <h3 className="font-heading text-xl sm:text-2xl font-normal text-white leading-snug tracking-tight mb-3">
              At One of Virginia&apos;s Most In-Demand Exterior Teams, Crews Can Finally Stop Refreshing the Dispatch Sheet
            </h3>

            {/* Story Description */}
            <p className="text-white/75 text-xs sm:text-sm leading-relaxed mb-6">
              How Wizard Wash gave field crews a live route onto territory maps, took a manual scheduling process off their staff&apos;s plate, and saved nearly 4,000 office dispatch calls.
            </p>

            {/* Stat Rows */}
            <div className="divide-y divide-white/10 border-y border-white/10">
              <div className="py-3.5 flex items-center justify-between gap-4">
                <span className="font-heading text-2xl sm:text-3xl font-normal text-white">
                  14,049
                </span>
                <span className="text-xs sm:text-sm text-white/70 text-right">
                  Properties & Doors Canvassed
                </span>
              </div>
              <div className="py-3.5 flex items-center justify-between gap-4">
                <span className="font-heading text-2xl sm:text-3xl font-normal text-white">
                  4,586
                </span>
                <span className="text-xs sm:text-sm text-white/70 text-right">
                  Automated Route Updates
                </span>
              </div>
              <div className="py-3.5 flex items-center justify-between gap-4">
                <span className="font-heading text-2xl sm:text-3xl font-normal text-white">
                  3,963
                </span>
                <span className="text-xs sm:text-sm text-white/70 text-right">
                  Office Dispatch Calls Saved
                </span>
              </div>
            </div>
          </div>

          {/* CASE STUDY CARD 2 */}
          <div className="mb-4">
            {/* Visual Frame */}
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden bg-gradient-to-b from-[#0b294a] via-[#09203a] to-[#051324] border border-white/15 p-6 sm:p-8 flex items-center justify-center shadow-2xl mb-6">
              <div className="absolute inset-0 bg-radial from-viracis-cyan/20 via-transparent to-transparent pointer-events-none" />

              <div className="relative z-10 w-full max-w-[420px] transition-transform duration-300 hover:scale-[1.02]">
                <Image
                  src="/images/Device Images/feature-ipad-invoicing.png"
                  alt="Viracis Field Invoicing and Payment Recapture Dashboard"
                  width={460}
                  height={320}
                  className="w-full h-auto object-contain drop-shadow-2xl"
                />
              </div>
            </div>

            {/* Story Title */}
            <h3 className="font-heading text-xl sm:text-2xl font-normal text-white leading-snug tracking-tight mb-3">
              Beating Chargebacks and Filling Cancellations Across Field Fleets
            </h3>

            {/* Story Description */}
            <p className="text-white/75 text-xs sm:text-sm leading-relaxed mb-6">
              How field service operators used Viracis to build the paper trail that made doorstep agreements stick, put $120,000 back on the books in their first season, and found a platform that kept crews closing.
            </p>

            {/* Stat Rows */}
            <div className="divide-y divide-white/10 border-y border-white/10">
              <div className="py-3.5 flex items-center justify-between gap-4">
                <span className="font-heading text-2xl sm:text-3xl font-normal text-white">
                  $120,859
                </span>
                <span className="text-xs sm:text-sm text-white/70 text-right">
                  Revenue Recovered from Uncollected Invoices
                </span>
              </div>
              <div className="py-3.5 flex items-center justify-between gap-4">
                <span className="font-heading text-2xl sm:text-3xl font-normal text-white">
                  2,335
                </span>
                <span className="text-xs sm:text-sm text-white/70 text-right">
                  Field Appointments Recaptured
                </span>
              </div>
              <div className="py-3.5 flex items-center justify-between gap-4">
                <span className="font-heading text-2xl sm:text-3xl font-normal text-white">
                  6,411
                </span>
                <span className="text-xs sm:text-sm text-white/70 text-right">
                  Homeowners Served
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN: Clean White Login Portal */}
      <div className="w-full lg:w-[46%] xl:w-[44%] bg-white text-gray-900 p-6 sm:p-10 lg:p-14 xl:p-16 flex flex-col justify-between min-h-screen">
        <div className="max-w-md w-full mx-auto my-auto py-8">
          {/* Viracis Brand Logo */}
          <div className="mb-10">
            <Link href="/" className="inline-block group" title="Return to Viracis Home">
              <Image
                src="/viracis-logo.png"
                alt="Viracis Technology Solutions"
                width={130}
                height={40}
                className="h-8 sm:h-9 w-auto object-contain transition-opacity group-hover:opacity-85"
                priority
              />
            </Link>
          </div>

          {/* Form Header */}
          <div className="mb-8">
            <span className="font-mono text-viracis-cyan font-bold text-xs tracking-[0.2em] uppercase mb-2 block">
              OPERATOR SIGN IN
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl lg:text-[32px] font-normal text-gray-900 tracking-tight mb-2">
              Sign In to Viracis
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
              Enter your operator credentials to access your dispatch matrix, canvassing maps, and CRM.
            </p>
          </div>

          {/* Form with Suspense for URL query reading */}
          <Suspense
            fallback={
              <div className="py-16 text-center text-xs text-gray-400">
                <span className="inline-block w-5 h-5 border-2 border-viracis-cyan border-t-transparent rounded-full animate-spin mb-2" />
                <p>Loading sign-in form...</p>
              </div>
            }
          >
            <LoginForm />
          </Suspense>
        </div>

        {/* Footer info at bottom of form column */}
        <div className="max-w-md w-full mx-auto pt-6 text-center lg:text-left text-[11px] text-gray-400">
          <p>© {new Date().getFullYear()} Viracis Technology Solutions LLC. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}
