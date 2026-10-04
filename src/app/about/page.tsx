"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import LandingNavbar from "@/components/LandingNavbar";
import SubPageHero from "@/components/SubPageHero";
import LandingFooter from "@/components/LandingFooter";

const ease = [0.16, 1, 0.3, 1] as const;

const outcomes = [
  {
    title: "No Multiple Subscriptions",
    body: "Stop paying for 4 or 5 disconnected tools. Territory mapping, fleet scheduling, CRM, SMS, and invoicing all live under one roof.",
  },
  {
    title: "Cut Bloat & Save Money",
    body: "No overpaying for complex enterprise CRMs with hundreds of features you will never use. Only the high-impact tools your business actually needs.",
  },
  {
    title: "Convert More Leads",
    body: "Empower your reps at the door to capture details instantly, follow up within seconds, and turn more knocks into closed revenue.",
  },
];

const process = [
  {
    step: "01",
    title: "Built for Door-to-Door",
    body: "Engineered specifically around how field reps knock, qualify, and close—fast, lightweight, and zero friction.",
  },
  {
    step: "02",
    title: "All Built in One",
    body: "Maps, calendar, pipeline, 2-way SMS messaging, and invoices connect seamlessly without buggy third-party bridges.",
  },
  {
    step: "03",
    title: "Time & Money Saved",
    body: "Eliminate wasted operational hours, lower software overhead, and reinvest those savings into growing your sales force.",
  },
];

export default function AboutPage() {
  return (
    <main className="bg-white">
      <LandingNavbar />
      <SubPageHero
        category="Our Story"
        title="The all-in-one operating system built for door-to-door businesses."
        subtitle="Viracis was founded to eliminate software fragmentation, cut wasteful overhead, and give door-to-door teams everything they need to run their entire business in one place."
      />

      {/* Founder & CEO Origin Story */}
      <section className="py-20 lg:py-28 bg-white border-b border-gray-100 relative overflow-hidden">
        {/* Subtle background ambient light */}
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-viracis-cyan/5 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />

        <div className="max-w-[1200px] mx-auto px-6 sm:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left: Founder Card / Image */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, ease }}
              className="lg:col-span-5"
            >
              <div className="relative mx-auto max-w-[420px] lg:max-w-none">
                {/* Glow backdrop */}
                <div className="absolute -inset-2 bg-gradient-to-tr from-viracis-navy/10 via-viracis-cyan/20 to-transparent rounded-3xl blur-md -z-10" />
                
                <div className="overflow-hidden rounded-2xl border border-gray-200/80 bg-gray-50 shadow-xl">
                  <div className="relative aspect-[4/5] w-full overflow-hidden bg-gray-100">
                    <Image
                      src="/siddu-ceo.jpeg"
                      alt="Siddu Kaleekkal - Founder & CEO of Viracis"
                      fill
                      className="object-cover object-top hover:scale-[1.02] transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 450px"
                      priority
                    />
                  </div>
                  
                  {/* Founder Title Bar */}
                  <div className="p-6 bg-white border-t border-gray-100">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <h3 className="text-xl font-semibold text-viracis-navy tracking-tight">
                          Siddu Kaleekkal
                        </h3>
                        <p className="text-sm font-semibold text-viracis-cyan mt-0.5">
                          Founder & CEO, Viracis
                        </p>
                      </div>
                      <div className="px-3 py-1.5 rounded-full bg-viracis-navy/5 text-[11px] font-semibold tracking-wider text-viracis-navy uppercase">
                        Leadership
                      </div>
                    </div>
                    <p className="text-xs text-gray-400 mt-3 border-t border-gray-100 pt-3">
                      Dallas, TX • Richmond, VA
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right: The Origin Story / Founder's Message */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, ease }}
              className="lg:col-span-7 flex flex-col justify-center"
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-viracis-navy/5 border border-viracis-navy/10 text-xs font-semibold uppercase tracking-[0.2em] text-viracis-navy mb-6 w-fit">
                Founder&apos;s Story
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-[2.6rem] font-normal tracking-[-0.02em] text-viracis-navy leading-[1.15] mb-6">
                Why I built Viracis for door-to-door businesses.
              </h2>

              <div className="space-y-5 text-base sm:text-lg text-gray-600 leading-relaxed font-normal">
                <p>
                  Viracis was formed because I noticed how a lot of door-to-door businesses were caught in a frustrating trap: they were either paying for multiple different products just to fit their day-to-day business needs, or overpaying for enterprise CRMs simply because they needed one specific feature.
                </p>
                <p>
                  And worse, they were paying for products loaded with so many features they didn&apos;t need and never used. Teams were forced to juggle separate subscriptions for pin mapping, route calendars, customer tracking, SMS messaging, and invoicing.
                </p>
                <p className="text-viracis-navy font-semibold bg-gray-50 border-l-4 border-viracis-cyan p-4 rounded-r-xl">
                  Viracis is perfect for every door-to-door business without needing to have multiple products at once. It is all built in one.
                </p>
                <p>
                  We wanted to solve this issue for all businesses so they could save their money and time, while converting more leads and driving more revenue.
                </p>
              </div>

              {/* Founder Signoff */}
              <div className="mt-8 pt-6 border-t border-gray-100 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-base font-semibold text-viracis-navy">
                    Siddu Kaleekkal
                  </p>
                  <p className="text-xs text-gray-500">
                    Founder & CEO, Viracis Technology Solutions
                  </p>
                </div>
                <div className="text-xs font-medium text-viracis-navy/60 italic">
                  &ldquo;Built in one. Built for the field.&rdquo;
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Why We Exist / Outcomes */}
      <section className="py-24 bg-gray-50/50 border-b border-gray-200">
        <div className="max-w-[1200px] mx-auto px-8">
          <div className="max-w-3xl mb-16">
            <p className="text-xs tracking-[0.25em] uppercase text-gray-400 font-medium mb-4">
              The Viracis Advantage
            </p>
            <h2 className="text-3xl lg:text-4xl font-normal tracking-[-0.02em] text-viracis-navy leading-[1.1]">
              Solve the software headache once and for all.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {outcomes.map((item, i) => (
              <motion.div
                key={item.title}
                className="bg-white border border-gray-200/80 rounded-2xl p-8 hover:shadow-lg transition-shadow duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.1, ease }}
              >
                <div className="w-10 h-10 rounded-xl bg-viracis-navy/5 flex items-center justify-center text-viracis-navy font-bold text-sm mb-6">
                  0{i + 1}
                </div>
                <h3 className="text-lg font-semibold text-viracis-navy tracking-tight mb-3">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {item.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How we work */}
      <section className="py-24 bg-viracis-navy">
        <div className="max-w-[1200px] mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease }}
            className="mb-14"
          >
            <p className="text-xs tracking-[0.25em] uppercase text-white/40 font-medium mb-5">
              How We Work
            </p>
            <h2 className="text-3xl lg:text-4xl font-normal tracking-[-0.02em] text-white leading-[1.1]">
              Simple, transparent, and built around your team.
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {process.map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.12, ease }}
              >
                <span className="text-xs tracking-[0.2em] uppercase font-medium text-white/30">
                  {item.step}
                </span>
                <h3 className="mt-3 text-lg font-semibold text-white tracking-tight">
                  {item.title}
                </h3>
                <p className="mt-2.5 text-base text-white/60 leading-relaxed">
                  {item.body}
                </p>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gray-50 border-t border-gray-200">
        <div className="max-w-[1200px] mx-auto px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease }}
          >
            <p className="text-xs tracking-[0.25em] uppercase text-gray-400 font-medium mb-5">
              Work With Us
            </p>
            <h2 className="text-4xl lg:text-5xl font-normal tracking-[-0.02em] text-viracis-navy leading-[1.1] max-w-2xl mx-auto">
              Ready to stop juggling multiple softwares?
            </h2>
            <p className="mt-6 text-lg text-gray-600 leading-relaxed max-w-xl mx-auto">
              See how Viracis brings your maps, schedule, CRM, SMS, and invoicing into one unified platform.
            </p>
            <div className="mt-10">
              <a
                href="/contact"
                className="inline-block px-8 py-4 bg-viracis-navy text-white text-sm font-semibold tracking-wide hover:bg-[#122F54] transition-colors duration-200"
              >
                Request Your 1:1 Demo
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <LandingFooter />
    </main>
  );
}
