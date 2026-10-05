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

const faqs: FAQItem[] = [
  {
    id: "origin-and-founder",
    question: "Why was Viracis created, and who is behind it?",
    answer:
      "Viracis was founded by Founder & CEO Siddu Kaleekkal after noticing a pervasive problem across door-to-door sales businesses: operators were either forced to pay for multiple separate products just to fit their basic operational needs, or grossly overpaying for massive enterprise CRMs simply because they needed one specific feature. On top of that, they were paying for bloated software with dozens of complex features they never touched or needed. Viracis is built specifically for every door-to-door business without needing to juggle multiple products at once. It is all built in one: territory maps, fleet calendars, CRM, 2-way SMS, and invoicing. We wanted to solve this issue so businesses can save their money and time, while helping convert more leads and drive more revenue.",
  },
  {
    id: "how-it-replaces-stack",
    question: "How does Viracis replace our current software stack?",
    answer:
      "Most field teams operate with a fragmented patchwork of standalone tools: one app for territory pins, another for fleet scheduling, a third for lead tracking, a separate SMS service, and another for invoicing. Viracis consolidates all five into a single native platform. By moving to Viracis, you can cancel those separate subscriptions and eliminate the constant errors and delays of syncing data through Zapier or spreadsheets.",
  },
  {
    id: "offline-field-usage",
    question: "Does the platform work offline when reps are in low-reception neighborhoods?",
    answer:
      "Yes. Direct sales reps frequently knock in rural or dense neighborhoods where cellular service is unreliable. The Viracis mobile client features local caching and offline-first data handling. Reps can drop territory pins, log homeowner notes, and update disposition statuses without interruption. The moment a signal is re-established, all pending records automatically synchronize with the central database.",
  },
  {
    id: "territory-permissions",
    question: "How are territories, routes, and rep permissions managed?",
    answer:
      "Viracis provides granular role-based access control (RBAC). Sales leaders and dispatchers can draw custom geographic boundaries, assign specific streets or neighborhoods to individual reps or crews, and restrict lead visibility so knockers only see their assigned turf. Leadership maintains real-time visibility across the entire regional operation.",
  },
  {
    id: "onboarding-timeline",
    question: "What does the onboarding process look like, and how long does it take?",
    answer:
      "Most teams are live in the field within 48 to 72 hours. Our US-based onboarding team in Richmond assists with importing your past customer records, uploading territory boundary files (KML/shapefiles), configuring your pipeline stages, and training both office dispatchers and knocking reps.",
  },
  {
    id: "pricing-transparency",
    question: "Are there hidden fees, per-feature charges, or surprise add-ons?",
    answer:
      "No. We operate under total commercial transparency. Unlike legacy enterprise CRMs that lock essential territory tools or SMS routing behind expensive enterprise tiers, Viracis includes all core capabilities under a single predictable plan. You never pay for features your team does not need.",
  },
  {
    id: "lead-conversion",
    question: "How does Viracis help our reps convert more leads at the door?",
    answer:
      "Speed and instant context are everything at the door. Reps can pull up property history in seconds, trigger automated two-way SMS follow-ups before leaving the driveway, and generate estimates and invoices on the spot. By removing administrative lag between the field and the back office, reps stay focused on knocking and closing deals.",
  },
  {
    id: "security-standards",
    question: "How is our customer and payment data secured?",
    answer:
      "All data is encrypted in transit using TLS 1.3 and at rest with AES-256 encryption. We process all customer payments securely through Stripe, the global standard in financial infrastructure. Integrated payments comply with strict PCI-DSS Level 1 certification, tokenized card vaulting, and SOC 2 security protocols, ensuring credit cards, customer details, and company records are safeguarded with bank-grade protection.",
  },
  {
    id: "corporate-locations",
    question: "Where is Viracis headquartered and who handles customer support?",
    answer:
      "Viracis maintains corporate operations in Richmond, VA. Our engineering, product development, and customer support teams are 100% US-based. When you reach out for technical assistance or workflow scoping, you work directly with experienced operational specialists.",
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
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

      {/* Unified Enterprise FAQ Section */}
      <section className="py-20 sm:py-24 bg-white border-b border-gray-200">
        <div className="max-w-3xl mx-auto px-6 sm:px-8">
          
          <div className="divide-y divide-gray-200 border-t border-b border-gray-200">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div key={faq.id} className="py-6 sm:py-7">
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full flex items-start justify-between text-left gap-6 group cursor-pointer focus:outline-none"
                    aria-expanded={isOpen}
                  >
                    <span className="text-base sm:text-lg font-medium text-viracis-navy group-hover:text-viracis-cyan transition-colors leading-snug">
                      {faq.question}
                    </span>
                    <span className="text-xl sm:text-2xl font-light text-gray-400 group-hover:text-viracis-navy transition-colors shrink-0 leading-none mt-0.5 select-none">
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25, ease }}
                        className="overflow-hidden"
                      >
                        <p className="pt-4 text-sm sm:text-base text-gray-600 leading-relaxed font-normal">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
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
