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
      "No. All core capabilities—Turf Canvassing, Fleet Dispatch, Client Management, Two-Way SMS, and Instant Invoicing—are natively built into the same platform. You don't need to purchase third-party add-ons, pay Zapier subscription fees, or manage separate vendor accounts.",
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

      {/* HERO SECTION: NAVY BLUE BACKGROUND, INFO ON LEFT, IPAD DASHBOARD ON RIGHT */}
      <section className="relative bg-viracis-navy text-white pt-12 sm:pt-16 md:pt-20 lg:pt-24 pb-16 sm:pb-20 lg:pb-24 overflow-hidden">
        {/* Subtle Ambient Cyan Glows */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-viracis-cyan/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 right-1/4 w-96 h-96 bg-viracis-cyan/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 xl:gap-14 items-center">
            {/* Left Column: Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease }}
              className="lg:col-span-6 flex flex-col items-start text-left"
            >
              {/* Main Headline */}
              <h1 className="font-sans text-[20px] min-[380px]:text-[22px] sm:text-[28px] md:text-[32px] lg:text-[30px] xl:text-[35px] 2xl:text-[38px] font-semibold text-white leading-[1.2] tracking-[-0.015em] mb-6 max-w-2xl">
                <span className="block whitespace-nowrap">No Need for Multiple Softwares.</span>
                <span className="block whitespace-nowrap text-white">Everything You Need, All in One.</span>
              </h1>

              {/* Subtitle */}
              <p className="font-sans text-[14px] sm:text-[16px] lg:text-[16.5px] leading-[1.6] text-white/80 font-normal max-w-xl mb-8">
                Stop paying for disconnected tools and juggling separate logins. From live turf mapping and fleet dispatch to client CRM, two-way SMS, and instant invoicing.
              </p>

              {/* Request a Demo Button */}
              <div>
                <Link
                  href="/contact"
                  className="font-sans inline-flex items-center justify-center px-8 py-3.5 sm:py-4 bg-white hover:bg-gray-100 text-viracis-navy font-semibold text-[14px] sm:text-[15px] tracking-wide shadow-md transition-all duration-200"
                >
                  Request a Demo
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
              <div className="relative w-full max-w-[700px] lg:max-w-none filter drop-shadow-[0_25px_50px_rgba(0,0,0,0.45)] transition-transform duration-500 hover:scale-[1.01]">
                <Image
                  src="/images/Device Images/Ipad/Dashboard.png"
                  alt="Viracis Operations Dashboard on iPad"
                  width={1852}
                  height={1418}
                  priority
                  className="w-full h-auto object-contain"
                  sizes="(max-width: 1024px) 95vw, 58vw"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* PILLAR 1: REAL-TIME TERRITORY INTELLIGENCE & GPS FIELD OPERATIONS */}
      {/* SHOWCASES: Maps.png */}
      {/* ========================================================================= */}
      <section id="territory-gps" className="py-20 sm:py-28 bg-white scroll-mt-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          {/* Section Header */}
          <div className="max-w-3xl mb-12 sm:mb-16">
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-[42px] font-normal text-black tracking-tight leading-[1.15] mb-4">
              Turn Neighborhoods into Real-Time Revenue Turf
            </h2>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              Eliminate overlapping canvassing routes, paper territory sheets, and blind technician dispatches. Viracis combines high-definition topographical GIS mapping with real-time pin density so your reps own their turf and dispatch trucks on the spot.
            </p>
          </div>

          {/* Content Grid: Device Mockup + High-Level Breakdown */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
              {/* Left Column: iPad Mockup Screen */}
              <div className="lg:col-span-7 flex flex-col items-center justify-center">
                <div className="relative w-full max-w-[720px] filter drop-shadow-[0_20px_45px_rgba(10,37,64,0.12)] transition-transform duration-300">
                  <Image
                    src="/images/Device Images/Ipad/Maps.png"
                    alt="Viracis Field Operations Hub GPS Territory Map on iPad"
                    width={1852}
                    height={1418}
                    priority
                    className="w-full h-auto object-contain"
                    sizes="(max-width: 1024px) 100vw, 55vw"
                  />
                </div>

                {/* Subtitle caption */}
                <p className="text-xs text-gray-500 mt-4 text-center">
                  Field Operations Hub showing Richmond territory pin density, active neighborhood clusters, and live route status.
                </p>
              </div>

              {/* Right Column: Deep-Dive Operational Breakdown */}
              <div className="lg:col-span-5 flex flex-col justify-center space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-black mb-2">
                    Real-Time Color-Coded Neighborhood Visibility
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Canvassers and managers see the exact pulse of any subdivision without opening a spreadsheet. Pins reflect real-time status across the sales cycle:
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white border border-gray-200/80 shadow-xs">
                    <span className="w-3.5 h-3.5 rounded-full bg-amber-500 mt-1 shrink-0" />
                    <div>
                      <div className="text-xs font-bold text-black">Quoted Leads (Amber)</div>
                      <div className="text-xs text-gray-500">Estimates delivered on the doorstep, awaiting customer sign-off or follow-up.</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white border border-gray-200/80 shadow-xs">
                    <span className="w-3.5 h-3.5 rounded-full bg-blue-500 mt-1 shrink-0" />
                    <div>
                      <div className="text-xs font-bold text-black">Scheduled Dispatches (Blue)</div>
                      <div className="text-xs text-gray-500">Confirmed bookings locked into fleet vehicles with date and service specs.</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white border border-gray-200/80 shadow-xs">
                    <span className="w-3.5 h-3.5 rounded-full bg-emerald-500 mt-1 shrink-0" />
                    <div>
                      <div className="text-xs font-bold text-black">Completed Jobs (Green)</div>
                      <div className="text-xs text-gray-500">Serviced homes with invoiced accounts, creating instant neighborhood social proof.</div>
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-gray-200">
                  <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                    Operational Advantage
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Includes instant property search by name or address, topographical elevation contours, and zoom controls that enable reps to group nearby jobs into tight clusters, reducing fleet drive time by up to 35%.
                  </p>
                </div>
              </div>
            </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* PILLAR 2: MULTI-FLEET DISPATCH & CALENDAR */}
      {/* SHOWCASES: Calendar.png */}
      {/* ========================================================================= */}
      <section id="fleet-calendar" className="py-20 sm:py-28 bg-[#fafafa] scroll-mt-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          {/* Section Header */}
          <div className="max-w-3xl mb-12 sm:mb-16">
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-[42px] font-normal text-black tracking-tight leading-[1.15] mb-4">
              Real-Time Fleet Dispatch Timeline. Zero Bottlenecks.
            </h2>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              Field operations cannot run on a generic office calendar. Viracis delivers multi-truck fleet routing with live truck layer toggles, job revenue density tracking, and two-way Google Calendar synchronization.
            </p>
          </div>

          {/* Grid Layout: iPad Image + High-Level Explanation */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
              {/* Left Column: iPad Image Display */}
              <div className="lg:col-span-7 flex flex-col items-center justify-center">
                <div className="relative w-full max-w-[720px] filter drop-shadow-[0_20px_45px_rgba(10,37,64,0.12)]">
                  <Image
                    src="/images/Device Images/Ipad/Calendar.png"
                    alt="Viracis Multi-Fleet Schedule and Dispatch Calendar Week View on iPad"
                    width={1852}
                    height={1418}
                    priority
                    className="w-full h-auto object-contain"
                    sizes="(max-width: 1024px) 100vw, 55vw"
                  />
                </div>

                {/* Subtitle Caption */}
                <p className="text-xs text-gray-500 mt-4 text-center">
                  Multi-Fleet Schedule and Dispatch Calendar showing vehicle layers (Truck 1, Truck 2) and live Google Calendar sync status.
                </p>
              </div>

              {/* Right Column: Detailed High-Level Architecture */}
              <div className="lg:col-span-5 flex flex-col justify-center space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-black mb-2">
                    Multi-Fleet Layers & Two-Way Google Calendar Sync
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Built for dispatchers managing multiple trucks simultaneously. The Week view maps out appointment timelines while monitoring fleet capacity:
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-200/80 shadow-xs">
                    <div className="text-xs font-bold text-black mb-1">Independent Fleet Layers</div>
                    <div className="text-xs text-gray-600">Filter calendar cards by Truck 1, Truck 2, or Completed Jobs to isolate routes and identify schedule conflicts instantly.</div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-200/80 shadow-xs">
                    <div className="text-xs font-bold text-black mb-1">Real-Time Google Calendar Synchronization</div>
                    <div className="text-xs text-gray-600">Displays real-time sync status (e.g. <span className="font-mono text-viracis-cyan">admin@viracis.com - 9 dispatch jobs synchronized</span>). Any update on the iPad board pushes to technician Google Calendars within seconds.</div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-200/80 shadow-xs">
                    <div className="text-xs font-bold text-black mb-1">Route Revenue Density</div>
                    <div className="text-xs text-gray-600">Every appointment card displays customer name, service item, and deal revenue ($410, $345, $280, $650, $475, $520, $390), ensuring dispatchers meet daily truck revenue quotas.</div>
                  </div>
                </div>

                <div className="pt-2 border-t border-gray-200">
                  <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                    Operational Result
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    No more technicians arriving at the same job site or overlapping service zones. Dispatchers maintain total control over route pacing and driver capacity.
                  </p>
                </div>
              </div>
            </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* PILLAR 3: CENTRALIZED CLIENT DIRECTORY & PIPELINE CRM */}
      {/* SHOWCASES: Clients.png */}
      {/* ========================================================================= */}
      <section id="client-directory" className="py-20 sm:py-28 bg-white scroll-mt-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          {/* Section Header */}
          <div className="max-w-3xl mb-12 sm:mb-16">
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-[42px] font-normal text-black tracking-tight leading-[1.15] mb-4">
              The Single Source of Truth for Every Field Customer
            </h2>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              Every doorstep conversation, map pin, and technician quote automatically synchronizes into a clean, searchable client directory. Say goodbye to forgotten customer notes and lost lead records.
            </p>
          </div>

          {/* Deep-Dive Grid: Showcase Mockup on Left + Features on Right */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
            {/* Left Column: iPad Image */}
            <div className="lg:col-span-7 flex flex-col items-center">
              <div className="relative w-full max-w-[720px] filter drop-shadow-[0_20px_45px_rgba(10,37,64,0.12)]">
                <Image
                  src="/images/Device Images/Ipad/Clients.png"
                  alt="Viracis Client Directory and Customer CRM Table on iPad"
                  width={1852}
                  height={1418}
                  priority
                  className="w-full h-auto object-contain"
                  sizes="(max-width: 1024px) 100vw, 55vw"
                />
              </div>
              <p className="text-xs text-gray-500 mt-4 text-center">
                Viracis Client Directory showing auto-synced map pins, customer lifecycle status, and row-level mobile triggers.
              </p>
            </div>

            {/* Right Column: High-Level Explanations */}
            <div className="lg:col-span-5 space-y-6">
              <h3 className="text-2xl sm:text-3xl font-normal text-black font-heading leading-tight">
                No Data Entry Lag. From Doorstep Pin to Active Customer.
              </h3>

              <p className="text-gray-600 text-sm leading-relaxed">
                Generic CRMs fail field sales teams because reps hate tedious data entry after walking 10 miles. In Viracis, pins dropped on the neighborhood map instantly generate full client records with address, contact details, and deal estimates.
              </p>

              {/* 3 Core Highlights */}
              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-lg bg-viracis-cyan/10 text-viracis-cyan flex items-center justify-center shrink-0 mt-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="m16 11 2 2 4-4" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-black mb-0.5">Lifecycle Status Tracking</h4>
                    <p className="text-xs text-gray-500 leading-relaxed">
                      Instant filtering by Quoted, Scheduled, or Completed. Track deal amounts ($230, $390, $475, $650, $410) and customer IDs (e.g. CUST-880, CUST-660) at every stage.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-lg bg-viracis-cyan/10 text-viracis-cyan flex items-center justify-center shrink-0 mt-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="7 10 12 15 17 10" />
                      <line x1="12" x2="12" y1="15" y2="3" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-black mb-0.5">One-Click CSV Import & Global Search</h4>
                    <p className="text-xs text-gray-500 leading-relaxed">
                      Migrate existing customer databases or county tax assessor files in seconds with the &ldquo;Import CSV&rdquo; engine. Search instantly by customer name, phone, or street address.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-lg bg-viracis-cyan/10 text-viracis-cyan flex items-center justify-center shrink-0 mt-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect width="18" height="18" x="3" y="3" rx="2" />
                      <path d="m9 12 2 2 4-4" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-black mb-0.5">Direct Row-Level Actions</h4>
                    <p className="text-xs text-gray-500 leading-relaxed">
                      Every customer row features dedicated action buttons: open the full Profile, re-schedule with Sched, launch 2-way SMS with Msg, or manage records with Del.
                    </p>
                  </div>
                </div>
              </div>

              {/* Bottom CTA */}
              <div className="pt-4 border-t border-gray-100 flex items-center gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center text-xs font-semibold text-viracis-cyan hover:text-viracis-cyan-hover transition-colors"
                >
                  See client directory in action →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* PILLAR 4: CLIENT MESSAGING CENTER & TWO-WAY SMS GATEWAY */}
      {/* SHOWCASES: Messaging.png */}
      {/* ========================================================================= */}
      <section id="messaging-center" className="py-20 sm:py-28 bg-[#fafafa] scroll-mt-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          {/* Section Header */}
          <div className="max-w-3xl mb-12 sm:mb-16">
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-[42px] font-normal text-black tracking-tight leading-[1.15] mb-4">
              Automated Communication That Cuts Office Calls by 83%
            </h2>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              When homeowners don&apos;t know when a field technician is arriving, they bombard the office with frantic calls. Viracis replaces that friction with a unified, carrier-grade 2-Way SMS Gateway and automated dispatch notifications.
            </p>
          </div>

          {/* Deep-Dive Grid: Feature Breakdown on Left + Showcase Mockup on Right */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
            {/* Left Column: High-Level Explanations */}
            <div className="lg:col-span-5 order-2 lg:order-1 space-y-6">
              <h3 className="text-2xl sm:text-3xl font-normal text-black font-heading leading-tight">
                Keep Techs Off Personal Phones. Centralize All Customer Chat.
              </h3>

              <p className="text-gray-600 text-sm leading-relaxed">
                When technicians use personal cell phones, customer communication becomes invisible to management. Viracis routes every text and confirmation through your official business gateway with full conversation history.
              </p>

              {/* 3 Core Highlights */}
              <div className="space-y-4 pt-2">
                <div className="p-4 rounded-xl bg-white border border-gray-200/80 shadow-xs">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                    <h4 className="text-xs font-bold text-black uppercase tracking-wider">SMS Gateway Active Status</h4>
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    Always-on two-way SMS connection with 99.9% delivery rate. Homeowners receive and reply to texts directly on their phones without downloading any app.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white border border-gray-200/80 shadow-xs">
                  <div className="text-xs font-bold text-black mb-1">One-Tap Quick Dispatch Templates</div>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    Pre-built rapid dispatch macros include <span className="font-semibold text-viracis-navy">&ldquo;Confirm Job&rdquo;</span>, <span className="font-semibold text-viracis-navy">&ldquo;Send Invoice Note&rdquo;</span>, and <span className="font-semibold text-viracis-navy">&ldquo;En Route&rdquo;</span>. Techs send standardized updates with a single screen tap.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white border border-gray-200/80 shadow-xs">
                  <div className="text-xs font-bold text-black mb-1">Integrated &ldquo;Call Client&rdquo; Phone Trigger</div>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    Need instant verbal clarity? Tap the dedicated &ldquo;Call Client&rdquo; button inside the chat header to initiate a phone call without looking up phone numbers.
                  </p>
                </div>
              </div>

              {/* Stat Callout */}
              <div className="p-4 rounded-xl bg-viracis-navy text-white flex items-center justify-between">
                <div>
                  <div className="text-xs text-gray-300 font-medium">Inbound Status Call Reduction</div>
                  <div className="text-xs text-gray-400">Homeowners get automated ETA updates</div>
                </div>
                <div className="font-heading text-3xl font-normal text-viracis-cyan">
                  -83%
                </div>
              </div>
            </div>

            {/* Right Column: iPad Mockup */}
            <div className="lg:col-span-7 order-1 lg:order-2 flex flex-col items-center">
              <div className="relative w-full max-w-[720px] filter drop-shadow-[0_20px_45px_rgba(10,37,64,0.12)]">
                <Image
                  src="/images/Device Images/Ipad/Messaging.png"
                  alt="Viracis Client Messaging Center and Two-Way SMS Feed on iPad"
                  width={1852}
                  height={1418}
                  priority
                  className="w-full h-auto object-contain"
                  sizes="(max-width: 1024px) 100vw, 55vw"
                />
              </div>
              <p className="text-xs text-gray-500 mt-4 text-center">
                Viracis Client Messaging Center showing active SMS gateway, client chat thread with Clara Vance, and one-tap templates.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* PILLAR 5: AUTOMATED BILLING, INVOICES & CASH-FLOW ACCELERATION */}
      {/* SHOWCASES: Invoicing.png */}
      {/* ========================================================================= */}
      <section id="billing-engine" className="py-20 sm:py-28 bg-white scroll-mt-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          {/* Section Header */}
          <div className="max-w-3xl mb-12 sm:mb-16">
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-[42px] font-normal text-black tracking-tight leading-[1.15] mb-4">
              Collect on the Spot. Eliminate the 30-Day Payment Lag.
            </h2>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              Field service companies bleed cash when completed work waits weeks for back-office billing. Viracis puts automated PDF statement generation and instant payment reconciliation directly in the field rep&apos;s hands.
            </p>
          </div>

          {/* Deep-Dive Grid: Showcase Mockup on Left + Features on Right */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
            {/* Left Column: iPad Image */}
            <div className="lg:col-span-7 flex flex-col items-center">
              <div className="relative w-full max-w-[720px] filter drop-shadow-[0_20px_45px_rgba(10,37,64,0.12)]">
                <Image
                  src="/images/Device Images/Ipad/Invoicing.png"
                  alt="Viracis Billing and Invoices Hub with Financial KPI Meters on iPad"
                  width={1852}
                  height={1418}
                  priority
                  className="w-full h-auto object-contain"
                  sizes="(max-width: 1024px) 100vw, 55vw"
                />
              </div>
              <p className="text-xs text-gray-500 mt-4 text-center">
                Viracis Billing & Invoices Hub displaying executive receivables cards, status filtering, and 1-tap PDF statement delivery.
              </p>
            </div>

            {/* Right Column: High-Level Explanations */}
            <div className="lg:col-span-5 space-y-6">
              <h3 className="text-2xl sm:text-3xl font-normal text-black font-heading leading-tight">
                Doorstep-to-Deposit Financial Control.
              </h3>

              <p className="text-gray-600 text-sm leading-relaxed">
                Transform every job completion into an immediate, collected revenue event. No printing paper invoices at night, no forgotten billing emails, and zero manual spreadsheet balancing.
              </p>

              {/* 4 Financial Meters from the screen */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-200">
                  <div className="text-[10px] uppercase font-bold text-gray-500 tracking-wider">Total Receivables</div>
                  <div className="text-xl font-bold text-black mt-0.5">$2,100</div>
                  <div className="text-[11px] text-gray-500">6 active statements</div>
                </div>

                <div className="p-3.5 rounded-xl bg-emerald-50/60 border border-emerald-200/80">
                  <div className="text-[10px] uppercase font-bold text-emerald-800 tracking-wider">Paid Invoices</div>
                  <div className="text-xl font-bold text-emerald-700 mt-0.5">$1,400</div>
                  <div className="text-[11px] text-emerald-700 font-semibold">67% collected</div>
                </div>

                <div className="p-3.5 rounded-xl bg-blue-50/60 border border-blue-200/80">
                  <div className="text-[10px] uppercase font-bold text-blue-800 tracking-wider">Pending Due</div>
                  <div className="text-xl font-bold text-blue-700 mt-0.5">$700</div>
                  <div className="text-[11px] text-blue-600">2 awaiting payment</div>
                </div>

                <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-200">
                  <div className="text-[10px] uppercase font-bold text-gray-500 tracking-wider">Overdue Balance</div>
                  <div className="text-xl font-bold text-black mt-0.5">$0</div>
                  <div className="text-[11px] text-gray-500">0 overdue accounts</div>
                </div>
              </div>

              {/* 3 Core Workflow Features */}
              <div className="space-y-3 pt-2">
                <div className="p-3.5 rounded-xl bg-white border border-gray-200/80 shadow-xs">
                  <div className="text-xs font-bold text-black mb-0.5">Automated PDF Statement Dispatch</div>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    Tap <span className="font-semibold text-viracis-navy">&ldquo;PDF Statement&rdquo;</span> or <span className="font-semibold text-viracis-navy">&ldquo;Send Email&rdquo;</span> to instantly generate branded invoices with itemized service descriptions and dispatch directly to the homeowner.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-white border border-gray-200/80 shadow-xs">
                  <div className="text-xs font-bold text-black mb-0.5">1-Click &ldquo;Mark Paid&rdquo; Reconciliation</div>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    When customer pays on the driveway via check, card, or cash, technicians tap <span className="font-semibold text-emerald-700">&ldquo;Mark Paid&rdquo;</span> to immediately update account status across the entire company ledger.
                  </p>
                </div>
              </div>

              {/* Bottom CTA */}
              <div className="pt-2">
                <Link
                  href="/contact"
                  className="font-sans inline-flex items-center justify-center px-6 py-3 bg-viracis-navy hover:bg-[#122F54] text-white text-xs font-medium tracking-wide shadow-sm transition-colors"
                >
                  Request a Complete Invoicing Demo
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: FAQ ACCORDION */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-4xl mx-auto px-6 sm:px-8">
          <div className="bg-gray-50 rounded-3xl p-8 sm:p-12 shadow-xs">
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
