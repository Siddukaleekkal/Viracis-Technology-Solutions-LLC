"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import LandingNavbar from "@/components/LandingNavbar";
import LandingBottomCta from "@/components/LandingBottomCta";
import LandingFooter from "@/components/LandingFooter";

const ease = [0.16, 1, 0.3, 1] as const;

export default function PlatformPage() {
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

                <div className="space-y-4 pt-1">
                  <div className="flex items-start gap-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                    <div>
                      <h4 className="text-sm font-semibold text-black">Quoted Leads (Amber)</h4>
                      <p className="text-xs text-gray-600 leading-relaxed mt-0.5">Estimates delivered on the doorstep, awaiting customer sign-off or follow-up.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                    <div>
                      <h4 className="text-sm font-semibold text-black">Scheduled Dispatches (Blue)</h4>
                      <p className="text-xs text-gray-600 leading-relaxed mt-0.5">Confirmed bookings locked into fleet vehicles with date and service specs.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                    <div>
                      <h4 className="text-sm font-semibold text-black">Completed Jobs (Green)</h4>
                      <p className="text-xs text-gray-600 leading-relaxed mt-0.5">Serviced homes with invoiced accounts, creating instant neighborhood social proof.</p>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <div className="text-xs font-semibold text-viracis-navy uppercase tracking-wider mb-1.5">
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

                <div className="space-y-4 pt-1">
                  <div>
                    <h4 className="text-sm font-semibold text-black mb-1">Independent Fleet Layers</h4>
                    <p className="text-xs text-gray-600 leading-relaxed">Filter calendar cards by individual vehicles, crew teams, or completed jobs to isolate routes and identify schedule conflicts instantly.</p>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-black mb-1">Real-Time Google Calendar Synchronization</h4>
                    <p className="text-xs text-gray-600 leading-relaxed">Two-way synchronization ensures schedule parity across office and field teams. Any appointment booked or updated on the dispatch board pushes directly to technician Google Calendars within seconds.</p>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-black mb-1">Route Revenue Density</h4>
                    <p className="text-xs text-gray-600 leading-relaxed">Every appointment card displays customer details, scheduled service item, and estimated deal value, ensuring dispatchers optimize route efficiency and hit daily crew revenue targets.</p>
                  </div>
                </div>

                <div className="pt-2">
                  <div className="text-xs font-semibold text-viracis-navy uppercase tracking-wider mb-1.5">
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
              <div className="space-y-4 pt-1">
                <div>
                  <h4 className="text-sm font-semibold text-black mb-1">Lifecycle Status Tracking</h4>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Instant filtering across Quoted, Scheduled, and Completed stages. Monitor deal values, customer history, and account progression at every step of the sales pipeline.
                  </p>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-black mb-1">One-Click CSV Import & Global Search</h4>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Migrate existing customer databases or county tax assessor files in seconds with seamless CSV import. Search instantly across your entire territory by customer name, phone number, or street address.
                  </p>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-black mb-1">Direct Row-Level Actions</h4>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Every customer record features quick-action controls: view comprehensive client profiles, schedule service dispatches, initiate two-way SMS messaging, or manage records with a single tap.
                  </p>
                </div>
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
              <div className="space-y-4 pt-1">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <h4 className="text-sm font-semibold text-black">SMS Gateway Active Status</h4>
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Always-on two-way SMS connection with 99.9% delivery rate. Homeowners receive and reply to texts directly on their phones without downloading any app.
                  </p>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-black mb-1">One-Tap Quick Dispatch Templates</h4>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Pre-built rapid response macros allow technicians to send standardized arrival estimates, booking confirmations, and service completion notes with a single tap.
                  </p>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-black mb-1">Direct Phone Call Integration</h4>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Need immediate verbal clarity? Reps and dispatchers can launch direct voice calls straight from the conversation thread without manually looking up phone numbers.
                  </p>
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
              Field service companies bleed cash when completed work waits weeks for back-office billing. Viracis connects automated driveway invoicing directly with QuickBooks, ensuring your company&apos;s books, general ledger, and accounting records are always up to date and in sync.
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
            </div>

            {/* Right Column: High-Level Explanations */}
            <div className="lg:col-span-5 space-y-6">
              <h3 className="text-2xl sm:text-3xl font-normal text-black font-heading leading-tight">
                Doorstep-to-Deposit Financial Control.
              </h3>

              <p className="text-gray-600 text-sm leading-relaxed">
                Transform every job completion into an immediate, collected revenue event. Invoices and payments sync directly with QuickBooks, eliminating late-night paper invoice filing, double data entry, and manual spreadsheet balancing.
              </p>

              <div className="space-y-4 pt-1">
                <div>
                  <h4 className="text-sm font-semibold text-black mb-1">Two-Way QuickBooks Accounting Sync</h4>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Viracis connects directly with QuickBooks to ensure your books and accounting records stay completely up to date. Every invoiced job, line item, and collected payment syncs in real time, eliminating manual data entry and keeping your chart of accounts accurate.
                  </p>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-black mb-1">Live Receivables & Cash Flow</h4>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Real-time oversight of total billed revenue, collected driveway cash, and outstanding balances across all active service crews.
                  </p>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-black mb-1">Automated PDF Statement Generation</h4>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Instantly generate branded, professional invoices with itemized service line items and deliver them directly to the homeowner via email or SMS with one click.
                  </p>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-black mb-1">Driveway Payment Reconciliation</h4>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    When a customer settles on the driveway via check, card, or cash, technicians record payment on site to instantly synchronize account balances across your company ledger.
                  </p>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-black mb-1">Automated Payment Reminders</h4>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Eliminate 30-day payment delays with automated SMS and email reminders that prompt homeowners to settle balances seamlessly.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      <LandingBottomCta />

      <LandingFooter />
    </main>
  );
}
