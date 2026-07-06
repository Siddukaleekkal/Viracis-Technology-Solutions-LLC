"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const ease = [0.16, 1, 0.3, 1] as const;

const differentiators = [
  {
    title: "Technology Made Accessible",
    body: "We translate complex technology into clear, affordable solutions designed specifically for small business needs.",
  },
  {
    title: "Outcomes Over Output",
    body: "We measure success by your business results: more customers, lower costs, and saved time. Not by hours billed.",
  },
  {
    title: "Partners, Not Vendors",
    body: "We invest in your growth long-term, acting as your dedicated technology partner rather than a one-time contractor.",
  },
];

export default function LandingAbout() {
  return (
    <section id="about" className="py-24 lg:py-32 bg-gray-50 border-t border-gray-200">
      <div className="max-w-[1200px] mx-auto px-8">
        <div className="max-w-4xl">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-6">
            Our Mission
          </h2>
          <p className="text-3xl lg:text-4xl xl:text-5xl font-light leading-tight mb-10 text-viracis-navy">
            Viracis partners with small and growing businesses to make enterprise-grade technology accessible, turning complex challenges into competitive advantages.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 text-viracis-navy font-medium hover:text-blue-600 transition-colors duration-200 pb-1 border-b border-viracis-navy/30 hover:border-blue-600"
          >
            Work with us
            <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>

        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16 pt-16 border-t border-gray-200">
          {differentiators.map((item, i) => (
            <div key={i} className="flex flex-col">
              <h3 className="text-xl font-medium mb-4 text-viracis-navy">
                {item.title}
              </h3>
              <p className="text-base text-gray-600 leading-relaxed">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
