"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import LandingNavbar from "@/components/LandingNavbar";
import LandingBottomCta from "@/components/LandingBottomCta";
import LandingFooter from "@/components/LandingFooter";

const ease = [0.16, 1, 0.3, 1] as const;

// FAQ items for the accordion
const faqItems = [
  {
    question: "What is the Viracis Field Operations Platform?",
    answer:
      "Viracis is an all-in-one operating system purpose-built for door-to-door sales and mobile field service companies. It coordinates real-time turf mapping, multi-fleet dispatch, doorstep client scheduling, on-site invoicing, and two-way SMS into one unified platform without requiring multiple disconnected tools.",
  },
  {
    question: "How is this different from a generic CRM or chatbot?",
    answer:
      "Generic CRMs are designed for office desk workers and lack field-specific mobile tools like live neighborhood GPS pins, technician timeline routing, and doorstep tap-to-pay. Viracis is built directly for field reps and dispatchers to convert doorstep knocks and service calls into booked jobs and collected payments with zero data entry friction.",
  },
  {
    question: "Does the platform cost extra for turf mapping or fleet dispatch?",
    answer:
      "No. All three core capabilities—Turf Canvassing, Fleet Dispatch, and Instant Invoicing & SMS—are natively built into the same platform. You don't need to purchase third-party add-ons, pay Zapier subscription fees, or manage separate vendor accounts.",
  },
  {
    question: "How many field interactions and operations has Viracis handled?",
    answer:
      "Across hundreds of field crews, Viracis has processed over 200,000 live territory knocks, customer consultations, and service appointments with a 99.99% uptime SLA.",
  },
  {
    question: "How many phone calls and office hours does the platform actually save?",
    answer:
      "By giving field technicians instant job specs and homeowners automated 2-way SMS with real-time arrival alerts, operators report an 83% reduction in inbound status calls and save an average of 12+ administrative hours every week.",
  },
];

export default function PlatformPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <main className="bg-white text-gray-900 selection:bg-viracis-cyan selection:text-white min-h-screen">
      <LandingNavbar />

      {/* HERO SECTION: WHITE BACKGROUND, INFO ON LEFT, IPAD DASHBOARD ON RIGHT */}
      <section className="relative bg-white text-black pt-12 sm:pt-16 md:pt-20 lg:pt-24 pb-16 sm:pb-20 lg:pb-24 overflow-hidden border-b border-gray-100">
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 xl:gap-14 items-center">
            {/* Left Column: Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease }}
              className="lg:col-span-6 flex flex-col items-start text-left"
            >
              {/* Main Headline in Lexend Deca */}
              <h1 className="font-sans text-[28px] sm:text-[34px] md:text-[38px] lg:text-[36px] xl:text-[42px] font-semibold text-black leading-[1.15] tracking-[-0.015em] mb-6 max-w-2xl">
                <span className="block sm:whitespace-nowrap">The All in One Door to Door</span>
                <span className="block">Operating System</span>
              </h1>

              {/* Subtitle in Lexend Deca */}
              <p className="font-sans text-[14px] sm:text-[16px] lg:text-[16.5px] leading-[1.6] text-black/75 font-normal max-w-xl mb-9">
                <span className="sm:block">Ditch messy spreadsheets, scattered maps, and lost invoices. Pin leads on</span>
                <span className="sm:block">live turf, schedule jobs on the spot, and keep your crews closing faster.</span>
              </p>

              {/* Hero Action Button */}
              <div>
                <Link
                  href="/contact"
                  className="font-sans inline-flex items-center justify-center px-8 py-3.5 sm:py-4 bg-viracis-navy hover:bg-[#122F54] text-white font-medium text-[14px] sm:text-[15px] tracking-wide border border-viracis-navy shadow-[0_10px_25px_rgba(10,37,64,0.18)] transition-colors duration-200"
                >
                  Request Your 1:1 Demo & Consultation
                </Link>
              </div>
            </motion.div>

            {/* Right Column: iPad Dashboard Showcase */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.15, ease }}
              className="lg:col-span-6 flex flex-col items-center lg:items-end justify-center w-full"
            >
              <div className="relative w-full max-w-[700px] lg:max-w-none filter drop-shadow-[0_20px_45px_rgba(10,37,64,0.13)] transition-transform duration-500 hover:scale-[1.01]">
                <Image
                  src="/images/Device Images/Ipad/Dashboard.png"
                  alt="Viracis Operations Dashboard on iPad"
                  width={1856}
                  height={1419}
                  priority
                  className="w-full h-auto object-contain"
                  sizes="(max-width: 1024px) 95vw, 58vw"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 1: HOW IT WORKS / 4 CARDS */}
      <section id="how-it-works" className="py-20 sm:py-28 bg-[#fafafa] border-b border-gray-100 scroll-mt-20">
        <div className="max-w-5xl mx-auto px-6 sm:px-8">
          {/* Eyebrow */}
          <span className="font-mono text-viracis-cyan font-bold text-xs tracking-[0.25em] uppercase mb-3 inline-block">
            HOW IT WORKS
          </span>

          {/* Heading */}
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-[44px] font-normal text-black tracking-tight leading-[1.15] mb-4">
            The Smarter Way to Run Field Sales & Service
          </h2>

          {/* Subtitle */}
          <p className="text-gray-500 text-sm sm:text-base leading-relaxed max-w-3xl mb-12 sm:mb-14">
            The Viracis Field Operations Assistant answers client questions instantly, automates fleet dispatch, and captures doorstep agreements — so a conversation actually turns into a booked job and paid invoice, not just an answer.
          </p>

          {/* 2x2 Feature Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
            {/* Card 1 */}
            <div className="bg-white rounded-2xl p-7 border border-gray-200/80 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-[#e0f4f8] text-viracis-cyan flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 6v6l4 2" />
                  <circle cx="12" cy="12" r="9" />
                </svg>
              </div>
              <h3 className="text-base font-bold text-black mb-1.5">
                Answers instantly, day or night
              </h3>
              <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">
                Handles lead inquiries, quote requests, and client FAQs automatically without needing to add extra office staff.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-2xl p-7 border border-gray-200/80 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-[#e0f4f8] text-viracis-cyan flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
                </svg>
              </div>
              <h3 className="text-base font-bold text-black mb-1.5">
                Reveals real field demand
              </h3>
              <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">
                Every conversation shows what homeowners actually want: pricing preferences, service scope, and scheduling priority.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white rounded-2xl p-7 border border-gray-200/80 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-[#e0f4f8] text-viracis-cyan flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </div>
              <h3 className="text-base font-bold text-black mb-1.5">
                Keeps your staff on the floor
              </h3>
              <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">
                Deflects routine status questions that jam your phone lines so your team stays focused on the customers in front of them instead.
              </p>
            </div>

            {/* Card 4 */}
            <div className="bg-white rounded-2xl p-7 border border-gray-200/80 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-[#e0f4f8] text-viracis-cyan flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="14" x="2" y="3" rx="2" />
                  <line x1="8" x2="16" y1="21" y2="21" />
                  <line x1="12" x2="12" y1="17" y2="21" />
                </svg>
              </div>
              <h3 className="text-base font-bold text-black mb-1.5">
                One platform, no tab switching
              </h3>
              <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">
                Sales reps, dispatchers, and techs quote, book, and process invoices in the same unified system for a smooth experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: THE PROOF AT SCALE */}
      <section className="py-20 sm:py-28 bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-6 sm:px-8">
          {/* Header Row */}
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-3">
            <div>
              <span className="font-mono text-viracis-cyan font-bold text-xs tracking-[0.25em] uppercase mb-2 inline-block">
                THE PROOF AT SCALE
              </span>
              <h2 className="font-heading text-3xl sm:text-4xl lg:text-[42px] font-normal text-black tracking-tight">
                One Year of Real Field Operations
              </h2>
            </div>
            <Link
              href="/contact"
              className="text-viracis-cyan hover:text-viracis-cyan-hover text-xs font-semibold tracking-wide transition-colors shrink-0"
            >
              Read the full breakdown →
            </Link>
          </div>

          {/* Narrative text */}
          <p className="text-gray-500 text-sm sm:text-base leading-relaxed max-w-3xl mb-12 sm:mb-14">
            The Viracis Platform was built with a simple hypothesis: field service and D2D teams lose hours and deals because their software is fragmented. One year and more than 200,000 real operations later, the data confirms it.
          </p>

          {/* 3 Stat Rows with Dividers */}
          <div className="divide-y divide-gray-200 border-y border-gray-200 mb-12">
            {/* Stat Row 1 */}
            <div className="py-7 sm:py-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="max-w-xl">
                <h3 className="text-base sm:text-lg font-bold text-black mb-1">
                  Field reps arrive at the doorstep on a mission
                </h3>
                <p className="text-gray-500 text-xs sm:text-sm">
                  131,728 Viracis territory interactions started with instant homeowner and property intel.
                </p>
              </div>
              <div className="font-heading text-4xl sm:text-5xl lg:text-6xl font-normal text-black shrink-0 sm:text-right">
                63%
              </div>
            </div>

            {/* Stat Row 2 */}
            <div className="py-7 sm:py-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="max-w-xl">
                <h3 className="text-base sm:text-lg font-bold text-black mb-1">
                  Intent that converts
                </h3>
                <p className="text-gray-500 text-xs sm:text-sm">
                  60,938 doorstep estimates resulted in an instant signed contract or dispatch booking.
                </p>
              </div>
              <div className="font-heading text-4xl sm:text-5xl lg:text-6xl font-normal text-black shrink-0 sm:text-right">
                46%
              </div>
            </div>

            {/* Stat Row 3 */}
            <div className="py-7 sm:py-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="max-w-xl">
                <h3 className="text-base sm:text-lg font-bold text-black mb-1">
                  Phone calls that didn&apos;t need to happen
                </h3>
                <p className="text-gray-500 text-xs sm:text-sm">
                  174,463 field dispatches, status questions, and payment updates resolved without a call to the office.
                </p>
              </div>
              <div className="font-heading text-4xl sm:text-5xl lg:text-6xl font-normal text-black shrink-0 sm:text-right">
                83%
              </div>
            </div>
          </div>

          {/* Bottom Footnote & CTA */}
          <div className="space-y-6">
            <p className="text-gray-500 text-xs sm:text-sm">
              Meeting homeowners where they already are is the expected standard for the generation now driving field service growth.
            </p>

            <div className="flex flex-wrap items-center gap-5">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-6 py-3 bg-viracis-navy hover:bg-[#122F54] text-white font-semibold text-xs tracking-wider rounded-md shadow-sm transition-all duration-200"
              >
                Request a Demo
              </Link>
              <Link
                href="/contact"
                className="text-viracis-cyan hover:text-viracis-cyan-hover font-medium text-xs sm:text-sm inline-flex items-center gap-1 transition-colors"
              >
                See it in action →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: VOICE OF YOUR STAFF (TESTIMONIALS) */}
      <section className="py-20 sm:py-28 bg-[#fafafa] border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-6 sm:px-8">
          <span className="font-mono text-viracis-cyan font-bold text-xs tracking-[0.25em] uppercase mb-3 inline-block">
            VOICE OF YOUR STAFF
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-[42px] font-normal text-black tracking-tight mb-12 sm:mb-16">
            Trusted By Those Who Answer the Phones
          </h2>

          {/* 2x2 Testimonial Grid (3 White, 1 Dark) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Card 1 */}
            <div className="bg-white rounded-2xl p-8 border border-gray-200/80 shadow-sm flex flex-col justify-between">
              <p className="text-gray-700 text-sm leading-relaxed mb-8">
                &ldquo;The Viracis platform has been surprisingly impactful. It has resulted in far fewer frantic calls and emails to our office staff.&rdquo;
              </p>
              <div className="pt-4 border-t border-gray-100">
                <div className="font-bold text-black text-sm">Clay Thomas</div>
                <div className="text-xs text-gray-500">General Manager • Seminole Field Services • Richmond, VA</div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-2xl p-8 border border-gray-200/80 shadow-sm flex flex-col justify-between">
              <p className="text-gray-700 text-sm leading-relaxed mb-8">
                &ldquo;We did not anticipate the general use of our AI helper to be so helpful. Field techs love it when they realize how easy it is. Easy for our employees to direct customers to the portal.&rdquo;
              </p>
              <div className="pt-4 border-t border-gray-100">
                <div className="font-bold text-black text-sm">Timothy Christ</div>
                <div className="text-xs text-gray-500">Director of Operations & GM • Essex County Services • Dallas, TX</div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-white rounded-2xl p-8 border border-gray-200/80 shadow-sm flex flex-col justify-between">
              <p className="text-gray-700 text-sm leading-relaxed mb-8">
                &ldquo;The assistant took away a lot of the basic questions that would fill our phone lines every single morning.&rdquo;
              </p>
              <div className="pt-4 border-t border-gray-100">
                <div className="font-bold text-black text-sm">Nick Tedeschi</div>
                <div className="text-xs text-gray-500">PGA, Field Operations Lead • Granite Links • Quincy, MA</div>
              </div>
            </div>

            {/* Card 4 (Dark Contrast Card) */}
            <div className="bg-[#1c2430] text-white rounded-2xl p-8 shadow-sm flex flex-col justify-between">
              <p className="text-gray-200 text-sm leading-relaxed mb-8">
                &ldquo;We were not expecting the AI Assistant, and when it did come along, we expected an additional charge. That was not the case. It was included for being part of the Viracis family.&rdquo;
              </p>
              <div className="pt-4 border-t border-white/10">
                <div className="font-bold text-white text-sm">Tom Arnott</div>
                <div className="text-xs text-gray-400">General Manager • Golf Sudbury • Ontario, Canada</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: 3 SOLUTIONS IN ONE */}
      <section className="py-20 sm:py-28 bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-6 sm:px-8">
          <span className="font-mono text-viracis-cyan font-bold text-xs tracking-[0.25em] uppercase mb-3 inline-block">
            3 SOLUTIONS IN ONE
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-[42px] font-normal text-black tracking-tight mb-3">
            The Viracis Core Platform
          </h2>
          <p className="text-gray-500 text-sm sm:text-base leading-relaxed max-w-2xl mb-12 sm:mb-14">
            The AI Field Assistant is built into the same platform as Canvassing and Fleet Dispatch, so a conversation can end in a real booking or a spot on the calendar.
          </p>

          {/* Dashed Outline Box with 3 Modules */}
          <div className="border-2 border-dashed border-viracis-cyan/30 rounded-3xl p-8 sm:p-12 bg-white">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center text-center">
              {/* Module 1: Canvass / Turf */}
              <div className="flex flex-col items-center">
                <div className="w-24 h-24 rounded-full bg-viracis-navy text-white flex items-center justify-center mb-5 shadow-lg shadow-viracis-navy/20">
                  <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
                    <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
                  </svg>
                </div>
                <h3 className="font-heading text-2xl font-normal text-black mb-1">
                  Waitlist & Turf
                </h3>
                <Link
                  href="/contact"
                  className="text-viracis-cyan hover:text-viracis-cyan-hover font-medium text-xs mt-1 transition-colors"
                >
                  Learn more →
                </Link>
              </div>

              {/* Module 2: Dispatch / Confirm */}
              <div className="flex flex-col items-center">
                <div className="w-24 h-24 rounded-full bg-viracis-navy text-white flex items-center justify-center mb-5 shadow-lg shadow-viracis-navy/20">
                  <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z" />
                    <polyline points="9 11 12 14 22 4" />
                  </svg>
                </div>
                <h3 className="font-heading text-2xl font-normal text-black mb-1">
                  Confirm & Dispatch
                </h3>
                <Link
                  href="/contact"
                  className="text-viracis-cyan hover:text-viracis-cyan-hover font-medium text-xs mt-1 transition-colors"
                >
                  Learn more →
                </Link>
              </div>

              {/* Module 3: AI Assistant (Highlighted Card) */}
              <div className="bg-[#e0f4f8]/50 border border-viracis-cyan/20 rounded-2xl p-6 sm:p-8 flex flex-col items-center">
                <div className="w-24 h-24 rounded-full bg-viracis-cyan text-white flex items-center justify-center mb-5 shadow-lg shadow-viracis-cyan/25">
                  <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m15 4-2 4 4 2-4 2 2 4-4-2-2 4-2-4-4 2 2-4-4-2 4-2-2-4 4 2 2-4 2 4Z" />
                  </svg>
                </div>
                <h3 className="font-heading text-2xl font-normal text-black mb-1">
                  AI Operations Assistant
                </h3>
                <Link
                  href="/contact"
                  className="text-viracis-cyan hover:text-viracis-cyan-hover font-medium text-xs mt-1 transition-colors"
                >
                  Learn more →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: FAQ ACCORDION */}
      <section className="py-20 sm:py-28 bg-[#fafafa]">
        <div className="max-w-4xl mx-auto px-6 sm:px-8">
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-gray-200 shadow-sm">
            <span className="font-mono text-viracis-cyan font-bold text-xs tracking-[0.25em] uppercase mb-3 inline-block">
              FAQ
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-normal text-black tracking-tight mb-8">
              Questions operators ask
            </h2>

            {/* Accordion List */}
            <div className="divide-y divide-gray-200">
              {faqItems.map((item, index) => {
                const isOpen = openFaq === index;
                return (
                  <div key={index} className="py-5">
                    <button
                      onClick={() => toggleFaq(index)}
                      className="w-full flex items-center justify-between text-left group"
                      aria-expanded={isOpen}
                    >
                      <span className="text-sm sm:text-base font-medium text-gray-900 group-hover:text-viracis-cyan transition-colors pr-6">
                        {item.question}
                      </span>
                      <span className="text-lg font-light text-gray-400 group-hover:text-viracis-cyan transition-colors shrink-0">
                        {isOpen ? "−" : "+"}
                      </span>
                    </button>

                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3, ease }}
                          className="overflow-hidden"
                        >
                          <p className="pt-3 text-xs sm:text-sm text-gray-600 leading-relaxed">
                            {item.answer}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <LandingBottomCta />

      <LandingFooter />
    </main>
  );
}
