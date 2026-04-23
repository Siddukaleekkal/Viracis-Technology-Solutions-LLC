"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const ease = [0.16, 1, 0.3, 1] as const;

type Service = {
  id: string;
  title: string;
  description: string;
  features?: string[];
  accent: boolean;
  colSpan: string;
};

const services: Service[] = [
  {
    id: "software",
    title: "Software Engineering",
    description:
      "Custom web and mobile applications built for your business. From MVPs to full-scale platforms, we own the entire delivery lifecycle: design, development, and deployment.",
    accent: false,
    colSpan: "lg:col-span-2",
  },
  {
    id: "ai",
    title: "AI & Automation",
    description:
      "Eliminate repetitive work and surface actionable insights with AI-powered workflows and machine learning pipelines tailored to your operations.",
    accent: false,
    colSpan: "lg:col-span-1",
  },
  {
    id: "cloud",
    title: "Cloud Services",
    description:
      "Reliable, cost-efficient cloud infrastructure on AWS and Azure. We design, migrate, and optimize so your systems scale with your business.",
    accent: false,
    colSpan: "lg:col-span-1",
  },
  {
    id: "starter",
    title: "Starter Pack",
    description:
      "Everything a small business needs to establish a professional digital presence, packaged and ready to launch.",
    features: [
      "Professional domain & business email",
      "Custom website",
      "CRM setup & onboarding",
      "Social media marketing package",
    ],
    accent: true,
    colSpan: "lg:col-span-2",
  },
];

const LandingServices = () => {
  return (
    <section id="services" className="py-32 bg-white border-t border-gray-200">
      <div className="max-w-[1200px] mx-auto px-8">
        {/* Section header */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease }}
        >
          <div className="flex items-center gap-5 mb-5">
            <span className="text-xs tracking-[0.25em] uppercase text-gray-400 font-medium whitespace-nowrap">
              What We Do
            </span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>
          <h2 className="text-3xl lg:text-4xl leading-[1.1] font-normal tracking-[-0.02em] text-viracis-navy">
            Solutions built for small business growth.
          </h2>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {services.map((service, i) => (
            <motion.div
              key={service.id}
              className={`${service.colSpan} rounded-2xl p-8 flex flex-col ${
                service.accent
                  ? "bg-viracis-navy"
                  : "bg-gray-50 border border-gray-200"
              }`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08, ease }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
            >
              <h3
                className={`text-xl font-semibold tracking-tight ${
                  service.accent ? "text-white" : "text-viracis-navy"
                }`}
              >
                {service.title}
              </h3>
              <p
                className={`mt-3 text-base leading-relaxed ${
                  service.accent ? "text-white/70" : "text-gray-600"
                }`}
              >
                {service.description}
              </p>
              {service.features && (
                <ul className="mt-6 space-y-3">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <span className="mt-0.5 text-viracis-cyan text-sm font-bold shrink-0">
                        ✓
                      </span>
                      <span className="text-sm text-white/80">{feature}</span>
                    </li>
                  ))}
                </ul>
              )}
              {service.accent && (
                <Link
                  href="/contact"
                  className="mt-8 inline-flex items-center justify-center px-6 py-3 bg-white text-viracis-navy text-sm font-bold rounded-lg hover:bg-gray-100 transition-colors duration-200 self-start"
                >
                  Get started
                </Link>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LandingServices;
