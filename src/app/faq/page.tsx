"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LandingNavbar from "@/components/LandingNavbar";
import SubPageHero from "@/components/SubPageHero";
import LandingBottomCta from "@/components/LandingBottomCta";
import LandingFooter from "@/components/LandingFooter";

const ease = [0.16, 1, 0.3, 1] as const;

interface FAQItem {
  category: "all" | "origin" | "platform" | "pricing" | "deployment";
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  // Origin & Company
  {
    category: "origin",
    question: "Who founded Viracis, and what is the story behind it?",
    answer:
      "Viracis was founded by Founder & CEO Siddu Kaleekkal. Viracis was formed because he noticed how a lot of door-to-door businesses were caught in a frustrating trap: they were either paying for multiple different products just to fit their day-to-day business needs, or overpaying for enterprise CRMs simply because they needed one specific feature. On top of that, they were paying for products that had dozens of complex features they never touched or needed. Viracis is perfect for every door-to-door business without needing to have multiple products at once. It is all built in one. We wanted to solve this issue for all businesses to save them money and time, while helping convert more leads and drive more revenue.",
  },
  {
    category: "origin",
    question: "Where is Viracis headquartered?",
    answer:
      "Viracis maintains corporate operations in Dallas, TX and Richmond, VA. Our engineering, product development, and customer implementation teams are 100% US-based, serving door-to-door sales teams and field organizations nationwide.",
  },

  // Platform & Architecture
  {
    category: "platform",
    question: "What core capabilities are built into the Viracis platform?",
    answer:
      "Viracis brings five mission-critical field operations into one seamless dashboard: (1) Live Territory Mapping with GPS pins and density overlays, (2) Multi-Fleet Dispatch and route scheduling, (3) Client Relationship Management (Field CRM) purpose-built for canvassers, (4) Two-Way SMS Gateway with automated follow-ups, and (5) Instant Digital Invoicing with on-site payment collection.",
  },
  {
    category: "platform",
    question: "Why is an all-in-one platform better than using multiple specialized software tools?",
    answer:
      "Using separate apps for territory pins, fleet scheduling, CRM, and invoicing creates data silos, delayed lead handoffs, and multiple monthly software bills. Reps in the field shouldn't have to switch between three different apps just to qualify a lead and book an estimate. In Viracis, every action is natively synchronized in real time—saving hours of administrative overhead and preventing hot leads from falling through the cracks.",
  },
  {
    category: "platform",
    question: "Does Viracis replace tools like Spotio, SalesRabbit, Jobber, and HubSpot?",
    answer:
      "Yes. Most Viracis clients completely replace their existing patchwork of standalone canvassing apps, calendar tools, third-party SMS services, and generic enterprise CRMs. Consolidating into Viracis eliminates multiple monthly subscriptions and removes the need for fragile Zapier or webhook integrations.",
  },
  {
    category: "platform",
    question: "Can field reps use Viracis when mobile cellular coverage is weak?",
    answer:
      "Yes. The Viracis mobile client is engineered with local caching and offline-first data handling. Field reps can drop pins, update lead disposition statuses, and log homeowner notes even in low-signal neighborhoods. The moment network connectivity is re-established, all pending records automatically synchronize with the central system.",
  },

  // Pricing & Commercials
  {
    category: "pricing",
    question: "Are there hidden fees, per-feature charges, or surprise add-ons?",
    answer:
      "No. We believe in total commercial transparency. Unlike legacy enterprise CRMs that lock essential field tools behind expensive enterprise tiers or charge extra for basic SMS routing, Viracis provides all core engines under a single predictable plan. You never pay for features you don't need.",
  },
  {
    category: "pricing",
    question: "How does Viracis save our business money and time?",
    answer:
      "Businesses save in two primary ways: First, by eliminating 3 to 5 separate software subscriptions in favor of one unified platform. Second, by automating repetitive administrative tasks like route scheduling, appointment dispatch, and lead follow-ups—saving operators an average of 12+ administrative hours every week while boosting rep lead conversion.",
  },

  // Deployment, Security & Permissions
  {
    category: "deployment",
    question: "How fast can our field team be onboarded?",
    answer:
      "Most teams are fully operational within 48 to 72 hours. Our dedicated US-based onboarding specialists assist with territory boundary imports, customer list migrations, and dispatcher training so your field team experiences zero downtime.",
  },
  {
    category: "deployment",
    question: "How are sales territories and rep permissions managed?",
    answer:
      "Viracis includes granular role-based access control (RBAC). Sales leaders can draw custom geographic boundaries, assign specific streets or neighborhoods to individual reps or squads, and ensure knockers only see the data relevant to their active turf. Managers and dispatchers retain full visibility across entire regional fleets.",
  },
  {
    category: "deployment",
    question: "How is our customer and transaction data protected?",
    answer:
      "All data is encrypted in transit using TLS 1.3 and at rest with AES-256 encryption. Payment processing adheres to strict PCI-DSS Level 1 compliance, ensuring that digital invoices and card transactions are processed with bank-grade security.",
  },
];

const categories = [
  { id: "all", label: "All Questions" },
  { id: "origin", label: "Company & Origin" },
  { id: "platform", label: "Platform Architecture" },
  { id: "pricing", label: "Pricing & Savings" },
  { id: "deployment", label: "Deployment & Security" },
] as const;

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const filteredFaqs =
    activeCategory === "all"
      ? faqData
      : faqData.filter((item) => item.category === activeCategory);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <main className="bg-white">
      <LandingNavbar />

      {/* SubPage Hero matching navy theme */}
      <SubPageHero
        category="Knowledge & Answers"
        title="Frequently Asked Questions"
        subtitle="Everything you need to know about Viracis—our origin story, all-in-one architecture, territory canvassing, pricing, and rapid field deployment."
      />

      {/* FAQ Section */}
      <section className="py-20 lg:py-28 bg-white border-b border-gray-200">
        <div className="max-w-[1100px] mx-auto px-6 sm:px-8">
          
          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 mb-14">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    setActiveCategory(cat.id);
                    setOpenIndex(null);
                  }}
                  className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold tracking-wide transition-all duration-200 ${
                    isActive
                      ? "bg-viracis-navy text-white shadow-sm"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-black"
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* FAQ Accordion List */}
          <div className="space-y-4">
            {filteredFaqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <motion.div
                  key={faq.question}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.04, ease }}
                  className={`border rounded-2xl overflow-hidden transition-all duration-300 ${
                    isOpen
                      ? "border-viracis-navy/30 bg-gray-50/60 shadow-sm"
                      : "border-gray-200 bg-white hover:border-gray-300"
                  }`}
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full text-left p-6 sm:p-7 flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                    aria-expanded={isOpen}
                  >
                    <span className="text-base sm:text-lg font-semibold text-viracis-navy tracking-tight leading-snug">
                      {faq.question}
                    </span>
                    <span
                      className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center border text-sm font-medium transition-all duration-300 ${
                        isOpen
                          ? "bg-viracis-navy text-white border-viracis-navy rotate-45"
                          : "bg-white text-gray-500 border-gray-200 hover:border-gray-400"
                      }`}
                    >
                      +
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 sm:px-7 pb-6 sm:pb-7 text-sm sm:text-base text-gray-600 leading-relaxed border-t border-gray-100/80 pt-4">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>

          {/* Quick Contact Box */}
          <div className="mt-16 p-8 rounded-2xl bg-gray-50 border border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
            <div>
              <h3 className="text-lg font-semibold text-viracis-navy">
                Have a question not listed here?
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                Our executive field team is available to assist you directly.
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <a
                href="mailto:siddu@viracis.com"
                className="px-5 py-2.5 rounded-full border border-gray-300 bg-white text-xs font-semibold text-gray-700 hover:text-black hover:border-black transition-colors"
              >
                Email Founder
              </a>
              <a
                href="/contact"
                className="px-5 py-2.5 rounded-full bg-viracis-navy text-white text-xs font-semibold hover:bg-[#122F54] transition-colors"
              >
                Schedule 1:1 Call
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
