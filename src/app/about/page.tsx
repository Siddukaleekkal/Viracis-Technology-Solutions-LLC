"use client";

import { motion } from "framer-motion";
import LandingNavbar from "@/components/LandingNavbar";
import SubPageHero from "@/components/SubPageHero";
import LandingBottomCta from "@/components/LandingBottomCta";
import LandingFooter from "@/components/LandingFooter";

const ease = [0.16, 1, 0.3, 1] as const;

const organizationalFacts = [
  {
    label: "Leadership",
    value: "Siddu Kaleekkal",
    subtext: "Founder & Chief Executive Officer",
  },
  {
    label: "Corporate Offices",
    value: "Dallas, TX & Richmond, VA",
    subtext: "US-Based Operations & Engineering",
  },
  {
    label: "Core Architecture",
    value: "All-in-One Field OS",
    subtext: "Maps • Fleet • CRM • SMS • Invoicing",
  },
  {
    label: "Operating Mandate",
    value: "Zero Software Stacks",
    subtext: "Save Time, Cut Overhead, Convert More Leads",
  },
];

const principles = [
  {
    number: "01",
    tag: "Architectural Consolidation",
    title: "Zero Multi-Tool Fragmentation",
    description:
      "Door-to-door businesses frequently bleed margin juggling separate tools for territory pin maps, dispatch schedules, CRM data, SMS gateways, and invoicing. Viracis consolidates all five into a single native schema with zero API latency and zero third-party sync failures.",
  },
  {
    number: "02",
    tag: "Capital Efficiency",
    title: "Eliminating the Software Tax",
    description:
      "Legacy enterprise CRMs charge exorbitant per-seat rates for bloated feature suites that field sales teams never touch. We stripped away the unnecessary complexity to deliver only the high-leverage tools that directly drive knocked doors into collected revenue.",
  },
  {
    number: "03",
    tag: "Field-First Execution",
    title: "Engineered for Rep Velocity",
    description:
      "Every millisecond matters when a rep is on a route. From dropping disposition pins to sending instant two-way SMS follow-ups and generating field invoices, every workflow in Viracis is optimized for low-latency field speed and higher conversion rates.",
  },
];

const institutionalCommitments = [
  {
    title: "Dedicated US Implementation",
    body: "Every deployment is paired with dedicated onboarding engineers from our Dallas and Richmond teams. We assist with territory boundary setup, CRM list migration, and dispatcher training.",
  },
  {
    title: "Direct Engineering Feedback Loop",
    body: "Our leadership and product engineers work directly with field operators. Product roadmap priorities are dictated by real knocking teams, not disconnected enterprise committees.",
  },
  {
    title: "Single Predictable Commercial Model",
    body: "No punitive seat tiers, no hidden addon fees for basic SMS or dispatch features, and no surprise charges. Transparent pricing that preserves operating margins as your fleet expands.",
  },
];

export default function AboutPage() {
  return (
    <main className="bg-white">
      <LandingNavbar />
      
      {/* SubPage Hero */}
      <SubPageHero
        category="Company & Origin"
        title="The unified operating system for door-to-door businesses."
        subtitle="Viracis was founded to eliminate software fragmentation, replace legacy CRM bloat, and provide door-to-door sales teams with everything they need in one seamless platform."
      />

      {/* Institutional Metadata Ribbon */}
      <section className="border-b border-gray-200 bg-gray-50/70">
        <div className="max-w-[1200px] mx-auto px-6 sm:px-8 py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {organizationalFacts.map((fact) => (
              <div key={fact.label} className="border-l-2 border-viracis-navy/20 pl-4">
                <div className="text-[11px] uppercase tracking-wider font-semibold text-gray-500">
                  {fact.label}
                </div>
                <div className="text-base sm:text-lg font-semibold text-viracis-navy mt-1 tracking-tight">
                  {fact.value}
                </div>
                <div className="text-xs text-gray-500 mt-0.5">
                  {fact.subtext}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Executive Founder Statement */}
      <section className="py-20 lg:py-28 bg-white border-b border-gray-200">
        <div className="max-w-[1200px] mx-auto px-6 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Left Column: Metadata & Positioning */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, ease }}
              className="lg:col-span-4 lg:sticky lg:top-28"
            >
              <div className="border border-gray-200 bg-gray-50/80 rounded-2xl p-6 sm:p-8">
                <div className="inline-block text-[11px] tracking-[0.25em] uppercase font-bold text-viracis-navy/60 mb-4">
                  Executive Briefing
                </div>
                <h3 className="text-xl font-semibold text-viracis-navy tracking-tight leading-snug mb-4">
                  A statement on why Viracis was founded.
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-6">
                  Observations from field operations that led to building the all-in-one operating system for door-to-door sales organizations.
                </p>

                <div className="pt-6 border-t border-gray-200 space-y-4">
                  <div>
                    <div className="text-[11px] uppercase tracking-wider text-gray-400 font-medium">Author</div>
                    <div className="text-base font-semibold text-viracis-navy mt-0.5">Siddu Kaleekkal</div>
                    <div className="text-xs text-gray-500 font-medium">Founder & CEO, Viracis</div>
                  </div>
                  <div>
                    <div className="text-[11px] uppercase tracking-wider text-gray-400 font-medium">Company</div>
                    <div className="text-sm font-medium text-viracis-navy mt-0.5">Viracis Technology Solutions LLC</div>
                  </div>
                  <div>
                    <div className="text-[11px] uppercase tracking-wider text-gray-400 font-medium">Headquarters</div>
                    <div className="text-sm font-medium text-gray-600 mt-0.5">Dallas, TX • Richmond, VA</div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Column: Founder's Letter */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.65, delay: 0.1, ease }}
              className="lg:col-span-8 flex flex-col"
            >
              <div className="space-y-6 text-gray-700 leading-relaxed text-base sm:text-[17px]">
                
                <p className="text-xl sm:text-2xl font-normal text-viracis-navy leading-snug tracking-[-0.01em]">
                  Viracis was formed because I noticed how a lot of door-to-door businesses were caught in an unnecessary and expensive operational bind.
                </p>

                <p>
                  Across the direct-sales and field service industries, operators were consistently facing one of two frustrating choices:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
                  <div className="border border-gray-200 bg-white rounded-xl p-5 shadow-sm">
                    <div className="text-xs font-bold tracking-wider text-red-600 uppercase mb-2">Trap 01: Fragmentation</div>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      Paying for multiple disconnected software tools to satisfy basic operational needs—territory pin mapping, rep dispatch, CRM logging, 2-way SMS, and invoicing—wasting hours keeping data in sync.
                    </p>
                  </div>

                  <div className="border border-gray-200 bg-white rounded-xl p-5 shadow-sm">
                    <div className="text-xs font-bold tracking-wider text-red-600 uppercase mb-2">Trap 02: Software Bloat</div>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      Significantly overpaying for legacy enterprise CRMs just because they needed one specific feature, while paying for dozens of complex modules their knocking reps never touched or needed.
                    </p>
                  </div>
                </div>

                <p>
                  They were paying for software that had endless features they didn&apos;t need, while still lacking the direct, fast field workflows their reps actually required at the door.
                </p>

                <div className="border-l-2 border-viracis-navy pl-6 py-2 my-6 bg-gray-50/50 rounded-r-xl">
                  <p className="text-lg font-medium text-viracis-navy leading-relaxed">
                    Viracis is perfect for every door-to-door business without needing to have multiple products at once. It is all built in one.
                  </p>
                </div>

                <p>
                  We wanted to solve this issue for all door-to-door businesses so they could save both their money and their time. By eliminating redundant subscriptions and replacing complex bloat with high-velocity tools, Viracis empowers sales teams to focus on what actually moves the needle: knocking routes effectively, converting more leads, and growing their bottom-line revenue.
                </p>

                <div className="pt-8 mt-4 border-t border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="font-semibold text-viracis-navy text-lg">Siddu Kaleekkal</div>
                    <div className="text-sm text-gray-500">Founder & CEO, Viracis</div>
                  </div>
                  <div className="text-xs font-medium uppercase tracking-wider text-gray-400">
                    Viracis Technology Solutions LLC
                  </div>
                </div>

              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Operating Architecture Principles */}
      <section className="py-24 bg-gray-50/50 border-b border-gray-200">
        <div className="max-w-[1200px] mx-auto px-6 sm:px-8">
          <div className="max-w-3xl mb-16">
            <p className="text-xs tracking-[0.25em] uppercase text-gray-400 font-semibold mb-4">
              Architecture & Strategy
            </p>
            <h2 className="text-3xl lg:text-4xl font-normal tracking-[-0.02em] text-viracis-navy leading-[1.1]">
              Engineered around three non-negotiable operational principles.
            </h2>
            <p className="mt-4 text-base text-gray-600 leading-relaxed">
              How our unified platform design directly translates to higher rep conversion rates and lower software overhead.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {principles.map((item, i) => (
              <motion.div
                key={item.title}
                className="bg-white border border-gray-200/90 rounded-2xl p-8 hover:shadow-lg transition-shadow duration-300 flex flex-col justify-between"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.1, ease }}
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-xs font-bold tracking-widest text-viracis-navy/40 uppercase">
                      {item.number}
                    </span>
                    <span className="text-[10px] uppercase font-semibold tracking-wider px-2.5 py-1 rounded bg-viracis-navy/5 text-viracis-navy">
                      {item.tag}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-viracis-navy tracking-tight mb-3">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Institutional Commitments */}
      <section className="py-24 bg-viracis-navy text-white">
        <div className="max-w-[1200px] mx-auto px-6 sm:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease }}
            className="mb-14 max-w-2xl"
          >
            <p className="text-xs tracking-[0.25em] uppercase text-white/40 font-semibold mb-4">
              Institutional Delivery
            </p>
            <h2 className="text-3xl lg:text-4xl font-normal tracking-[-0.02em] text-white leading-[1.1]">
              How we partner with door-to-door organizations.
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {institutionalCommitments.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.12, ease }}
                className="border border-white/10 rounded-2xl p-7 bg-white/[0.02]"
              >
                <h3 className="text-lg font-semibold text-white tracking-tight mb-3">
                  {item.title}
                </h3>
                <p className="text-sm text-white/60 leading-relaxed">
                  {item.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enterprise Bottom CTA matching Home and Platform pages */}
      <LandingBottomCta />

      {/* Footer */}
      <LandingFooter />
    </main>
  );
}
