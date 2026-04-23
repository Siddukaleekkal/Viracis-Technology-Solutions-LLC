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
    <section id="about" className="py-32 bg-gray-50 border-t border-gray-200">
      <div className="max-w-[1200px] mx-auto px-8">
        {/* Centered header */}
        <motion.div
          className="text-center max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease }}
        >
          <p className="text-xs tracking-[0.25em] uppercase text-gray-400 font-medium mb-5">
            Our Mission
          </p>
          <h2 className="text-4xl lg:text-5xl leading-[1.1] font-normal tracking-[-0.02em] text-viracis-navy">
            We help small businesses achieve better outcomes through technology.
          </h2>
          <p className="mt-6 text-lg text-gray-600 leading-relaxed">
            Viracis partners with small and growing businesses to make
            enterprise-grade technology accessible and practical, turning
            complex challenges into competitive advantages.
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-viracis-navy hover:gap-3 transition-all duration-200"
          >
            Work with us
            <span>→</span>
          </Link>
        </motion.div>

        {/* Differentiator cards */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6">
          {differentiators.map((item, i) => (
            <motion.div
              key={i}
              className="bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-md transition-shadow duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.12, ease }}
            >
              <span className="text-xs tracking-[0.2em] uppercase font-medium text-viracis-navy/40">
                0{i + 1}
              </span>
              <h3 className="mt-3 text-lg font-semibold text-viracis-navy tracking-tight">
                {item.title}
              </h3>
              <p className="mt-2.5 text-base text-gray-600 leading-relaxed">
                {item.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
