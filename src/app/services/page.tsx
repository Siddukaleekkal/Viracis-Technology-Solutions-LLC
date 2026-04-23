"use client";

import { motion } from "framer-motion";
import LandingNavbar from "@/components/LandingNavbar";
import SubPageHero from "@/components/SubPageHero";
import LandingFooter from "@/components/LandingFooter";

const ease = [0.16, 1, 0.3, 1] as const;

const services = [
  {
    number: "01",
    title: "Software Engineering",
    tagline: "Built for your business, owned end-to-end.",
    description:
      "Whether you need a customer-facing website, an internal tool, or a full product, we design and build it from scratch. We own every step of the delivery so you never have to juggle multiple vendors.",
    capabilities: [
      "Custom websites & web apps",
      "Mobile-friendly design",
      "E-commerce solutions",
      "Internal business tools",
      "Ongoing maintenance & support",
      "Performance optimization",
    ],
  },
  {
    number: "02",
    title: "Cloud Services",
    tagline: "Reliable infrastructure without the complexity.",
    description:
      "Get secure, scalable cloud infrastructure on AWS and Azure without needing an in-house IT team. We set it up, manage it, and keep it running so your business stays online.",
    capabilities: [
      "Cloud setup & migration",
      "AWS & Azure management",
      "Automated backups",
      "Security & access control",
      "Cost optimization",
      "24/7 monitoring",
    ],
  },
  {
    number: "03",
    title: "AI & Automation",
    tagline: "Save hours every week on work that should run itself.",
    description:
      "From AI chatbots to automated workflows, we build tools that handle the repetitive work so your team can focus on your customers and growth.",
    capabilities: [
      "Business process automation",
      "AI-powered chatbots",
      "Data reporting & dashboards",
      "Email & CRM automation",
      "Custom AI integrations",
      "Workflow optimization",
    ],
  },
];

const starterFeatures = [
  { label: "Professional domain & business email", detail: "Look credible from day one" },
  { label: "Custom website", detail: "Designed and built to convert visitors" },
  { label: "CRM setup & onboarding", detail: "Manage your customers in one place" },
  { label: "Social media marketing package", detail: "Get in front of the right audience" },
];

export default function ServicesPage() {
  return (
    <main className="bg-white">
      <LandingNavbar />
      <SubPageHero
        category="What We Do"
        title="Solutions built for small business growth."
        subtitle="From a simple website to full cloud infrastructure, we handle the technology so you can focus on running your business."
      />

      {/* Core services */}
      <section className="py-24 border-b border-gray-200">
        <div className="max-w-[1200px] mx-auto px-8">
          <div className="divide-y divide-gray-200">
            {services.map((service, i) => (
              <motion.div
                key={service.number}
                className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-16 py-16 first:pt-0 last:pb-0"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.05, ease }}
              >
                {/* Left: number + title */}
                <div>
                  <span className="text-xs tracking-[0.2em] uppercase font-medium text-viracis-navy/30">
                    {service.number}
                  </span>
                  <h2 className="mt-3 text-2xl font-semibold text-viracis-navy tracking-tight">
                    {service.title}
                  </h2>
                  <p className="mt-2 text-sm text-viracis-cyan font-medium">
                    {service.tagline}
                  </p>
                </div>

                {/* Middle: description */}
                <div className="flex flex-col justify-between gap-8">
                  <p className="text-base text-gray-600 leading-relaxed">
                    {service.description}
                  </p>
                  <a
                    href="/contact"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-viracis-navy hover:gap-3 transition-all duration-200 self-start"
                  >
                    Talk to us about this →
                  </a>
                </div>

                {/* Right: capabilities */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
                  {service.capabilities.map((cap) => (
                    <div key={cap} className="flex items-start gap-2.5">
                      <span className="mt-0.5 text-viracis-cyan text-sm font-bold shrink-0">✓</span>
                      <span className="text-sm text-gray-600">{cap}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Starter Pack */}
      <section className="py-24 bg-viracis-navy">
        <div className="max-w-[1200px] mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease }}
          >
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
              <div>
                <span className="text-xs tracking-[0.2em] uppercase font-medium text-white/30">
                  04
                </span>
                <h2 className="mt-3 text-3xl lg:text-4xl font-semibold text-white tracking-tight">
                  Starter Pack
                </h2>
                <p className="mt-2 text-sm text-viracis-cyan font-medium">
                  Everything you need to launch, in one package.
                </p>
              </div>
              <p className="text-base text-white/60 leading-relaxed max-w-lg">
                The Starter Pack bundles everything a small business needs to establish a professional digital presence, packaged and ready to launch.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {starterFeatures.map((feature, i) => (
                <motion.div
                  key={feature.label}
                  className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-colors duration-200"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: i * 0.1, ease }}
                >
                  <span className="text-viracis-cyan text-lg font-bold">✓</span>
                  <h3 className="mt-3 text-sm font-semibold text-white leading-snug">
                    {feature.label}
                  </h3>
                  <p className="mt-1.5 text-xs text-white/50 leading-relaxed">
                    {feature.detail}
                  </p>
                </motion.div>
              ))}
            </div>

            <div className="mt-10">
              <a
                href="/contact"
                className="inline-flex items-center gap-2 text-sm font-semibold text-viracis-cyan hover:gap-3 transition-all duration-200"
              >
                Get started with the Starter Pack →
              </a>
            </div>
          </motion.div>
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
              Get Started
            </p>
            <h2 className="text-4xl lg:text-5xl font-normal tracking-[-0.02em] text-viracis-navy leading-[1.1] max-w-2xl mx-auto">
              Not sure which service is right for you?
            </h2>
            <p className="mt-6 text-lg text-gray-600 leading-relaxed max-w-xl mx-auto">
              We will take the time to understand your business and recommend only what you actually need.
            </p>
            <div className="mt-10">
              <a
                href="/contact"
                className="px-8 py-4 bg-viracis-navy text-white text-sm font-semibold tracking-wide hover:bg-[#122F54] transition-colors duration-200"
              >
                Talk to us
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <LandingFooter />
    </main>
  );
}
