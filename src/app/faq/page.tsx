"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LandingNavbar from "@/components/LandingNavbar";
import SubPageHero from "@/components/SubPageHero";
import LandingBottomCta from "@/components/LandingBottomCta";
import LandingFooter from "@/components/LandingFooter";

const ease = [0.16, 1, 0.3, 1] as const;

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

interface FAQSection {
  number: string;
  title: string;
  tag: string;
  description: string;
  items: FAQItem[];
}

const faqSections: FAQSection[] = [
  {
    number: "01",
    tag: "Corporate & Origins",
    title: "Company & Mission",
    description:
      "Our founding purpose, leadership mandate, and the operational inefficiencies in direct sales that Viracis was built to eliminate.",
    items: [
      {
        id: "who-founded",
        question: "Who founded Viracis, and what is the story behind it?",
        answer:
          "Viracis was founded by Founder & CEO Siddu Kaleekkal. Viracis was formed because he noticed how a lot of door-to-door businesses were caught in a frustrating trap: they were either paying for multiple different products just to fit their day-to-day business needs, or overpaying for enterprise CRMs simply because they needed one specific feature. On top of that, they were paying for products that had dozens of complex features they never touched or needed. Viracis is perfect for every door-to-door business without needing to have multiple products at once. It is all built in one. We wanted to solve this issue for all businesses that could save their money and time to help convert them more leads and money.",
      },
      {
        id: "corporate-locations",
        question: "Where are your corporate offices located?",
        answer:
          "Viracis maintains dual operations in Dallas, TX and Richmond, VA. All systems engineering, platform development, and executive onboarding teams are 100% US-based, serving field sales organizations across the nation.",
      },
      {
        id: "target-industries",
        question: "What industries are built for the Viracis operating system?",
        answer:
          "Viracis is engineered specifically for door-to-door canvassing, direct sales, and mobile field service companies—including roofing and exterior restoration, residential solar and clean energy, pest control, turf management, residential HVAC and plumbing, and security/home automation.",
      },
    ],
  },
  {
    number: "02",
    tag: "Unified Systems",
    title: "Platform Architecture",
    description:
      "How our unified single-database schema eliminates third-party sync lag, Zapier fragility, and multi-app confusion in the field.",
    items: [
      {
        id: "core-engines",
        question: "What core operational engines are built into Viracis?",
        answer:
          "Viracis combines five mission-critical systems into one cohesive platform: (1) Live Territory Mapping with GPS pins and density overlays, (2) Multi-Fleet Dispatch and route scheduling, (3) Client Relationship Management (Field CRM) tailored for canvassers, (4) Two-Way SMS Gateway with automated follow-ups, and (5) Instant Digital Invoicing with on-site payment collection.",
      },
      {
        id: "why-all-in-one",
        question: "Why is an all-in-one platform superior to multiple specialized apps?",
        answer:
          "Operating separate point solutions creates data silos, delayed lead handoffs, and multiple software bills. When a rep updates a door disposition in Viracis, the change instantly reflects across dispatch calendars, triggers real-time homeowner SMS alerts, and updates client records without middleware or Zapier bridges.",
      },
      {
        id: "legacy-replacement",
        question: "Does Viracis replace tools like Spotio, SalesRabbit, Jobber, and HubSpot?",
        answer:
          "Yes. Viracis is architected to fully replace the fragmented stack of standalone canvassing trackers, calendar apps, third-party SMS providers, and bloated desktop CRMs into a single operational interface. Consolidating into Viracis lowers SaaS expenditure and eliminates data synchronization errors.",
      },
      {
        id: "offline-capabilities",
        question: "How does the platform handle low or intermittent cellular reception?",
        answer:
          "The Viracis field client uses local caching and offline-first data handling. Reps can drop territory pins, record dispositions, and add prospect notes without an active network connection. All data automatically synchronizes with the server once connectivity is restored.",
      },
    ],
  },
  {
    number: "03",
    tag: "Value & Commercials",
    title: "Commercials & Pricing",
    description:
      "Transparent commercial terms, predictable pricing models, and how consolidating software delivers immediate margin expansion.",
    items: [
      {
        id: "hidden-fees",
        question: "Are there hidden fees, per-feature charges, or surprise add-ons?",
        answer:
          "No. We operate under total commercial transparency. Unlike legacy enterprise CRMs that lock essential territory or dispatch tools behind premium tiers, Viracis includes all core engines under a single predictable commercial agreement. You never pay for features you don't need.",
      },
      {
        id: "measurable-roi",
        question: "What measurable return on investment (ROI) do operators experience?",
        answer:
          "Operators typically achieve two direct financial benefits: First, eliminating 3 to 5 separate software subscriptions saves thousands annually in SaaS overhead. Second, automating dispatch and follow-up workflows returns an average of 12+ administrative hours per manager weekly while accelerating rep lead conversion.",
      },
    ],
  },
  {
    number: "04",
    tag: "Scale & Compliance",
    title: "Deployment & Security",
    description:
      "Rapid team onboarding, role-based boundary enforcement, and bank-grade data security protocols.",
    items: [
      {
        id: "deployment-timeline",
        question: "What is the typical deployment and onboarding timeline?",
        answer:
          "Most field organizations are fully operational within 48 to 72 hours. Our dedicated US-based onboarding team handles territory polygon imports, customer database migrations, and dispatcher training with zero operational interruption.",
      },
      {
        id: "role-based-permissions",
        question: "How are territory boundaries and rep permissions managed?",
        answer:
          "Viracis features granular role-based access control (RBAC). Leadership can draw custom geographic boundaries, assign specific streets or neighborhoods to designated reps or squads, and restrict data visibility to ensure reps only access their active turf while managers retain regional oversight.",
      },
      {
        id: "security-standards",
        question: "How is customer and payment data secured?",
        answer:
          "All data is encrypted in transit via TLS 1.3 and at rest using AES-256 encryption. Integrated digital payment processing complies with strict PCI-DSS Level 1 standards, ensuring financial transactions and customer records adhere to institutional security protocols.",
      },
    ],
  },
];

export default function FAQPage() {
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});

  const toggleItem = (id: string) => {
    setOpenItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <main className="bg-white">
      <LandingNavbar />

      {/* Hero */}
      <SubPageHero
        size="compact"
        category="Knowledge Base"
        title="Frequently Asked Questions"
        subtitle="Detailed operational answers regarding our unified door-to-door operating system, architecture, commercials, and field deployment."
      />

      {/* Enterprise Multi-Section FAQ */}
      <section className="py-20 lg:py-28 bg-white border-b border-gray-200">
        <div className="max-w-[1200px] mx-auto px-6 sm:px-8 space-y-24">
          {faqSections.map((section) => (
            <div
              key={section.number}
              className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start pt-12 first:pt-0 border-t first:border-t-0 border-gray-200"
            >
              {/* Left Column: Section Title & Narrative */}
              <div className="lg:col-span-4 lg:sticky lg:top-28">
                <div className="flex items-center gap-2 mb-3">
                  <span className="font-mono text-xs font-semibold tracking-wider text-viracis-navy/50">
                    {section.number}
                  </span>
                  <span className="text-[10px] uppercase font-bold tracking-widest px-2.5 py-0.5 rounded bg-viracis-navy/5 text-viracis-navy">
                    {section.tag}
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-normal tracking-[-0.02em] text-viracis-navy leading-tight mb-4">
                  {section.title}
                </h2>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {section.description}
                </p>
              </div>

              {/* Right Column: Accordion Table */}
              <div className="lg:col-span-8 divide-y divide-gray-200 border-t border-b border-gray-200">
                {section.items.map((item) => {
                  const isOpen = !!openItems[item.id];
                  return (
                    <div key={item.id} className="py-6 first:pt-6 last:pb-6">
                      <button
                        onClick={() => toggleItem(item.id)}
                        className="w-full flex items-start justify-between text-left gap-6 group cursor-pointer"
                        aria-expanded={isOpen}
                      >
                        <span className="text-base sm:text-lg font-medium text-viracis-navy group-hover:text-viracis-cyan transition-colors leading-snug">
                          {item.question}
                        </span>
                        <span
                          className={`shrink-0 w-7 h-7 rounded-full border flex items-center justify-center text-xs font-semibold transition-all duration-300 mt-0.5 ${
                            isOpen
                              ? "bg-viracis-navy text-white border-viracis-navy rotate-45"
                              : "border-gray-300 text-gray-500 group-hover:border-viracis-navy group-hover:text-viracis-navy"
                          }`}
                        >
                          +
                        </span>
                      </button>

                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3, ease }}
                            className="overflow-hidden"
                          >
                            <p className="pt-4 text-sm sm:text-base text-gray-600 leading-relaxed font-normal">
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
          ))}

          {/* Institutional Support Bar */}
          <div className="border border-gray-200 bg-gray-50/70 rounded-2xl p-8 sm:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-widest text-viracis-navy/60 block mb-1">
                Executive Scoping & Support
              </span>
              <h3 className="text-xl font-semibold text-viracis-navy tracking-tight">
                Need enterprise technical specifications or custom fleet scoping?
              </h3>
              <p className="text-sm text-gray-600 mt-1 max-w-xl">
                Speak directly with an enterprise field consultant or reach out to our executive leadership team.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <a
                href="mailto:siddu@viracis.com"
                className="px-5 py-2.5 rounded-full border border-gray-300 bg-white text-xs font-semibold text-gray-700 hover:text-black hover:border-black transition-colors"
              >
                Email Leadership
              </a>
              <a
                href="/contact"
                className="px-6 py-2.5 rounded-full bg-viracis-navy text-white text-xs font-semibold tracking-wide hover:bg-[#122F54] transition-colors"
              >
                Request 1:1 Consultation
              </a>
            </div>
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
