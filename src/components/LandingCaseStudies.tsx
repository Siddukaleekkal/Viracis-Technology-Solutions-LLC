"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const ease = [0.16, 1, 0.3, 1] as const;

const cases = [
  {
    company: "Wizard Wash",
    title: "From Manual Chaos to 42% More Bookings in 60 Days",
    slug: "wizard-wash-automation",
    description: "How a Virginia power washing company reclaimed 12+ hours per week and cut invoice turnaround from 5 days to 60 seconds.",
    tag: "Small Business Automation",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=1200"
  },
  {
    company: "Virginia Scoopers",
    title: "Scaling Local Service Revenue Through Custom Sales Automation",
    slug: "virginia-scoopers-automation",
    description: "Modernizing a pet waste management firm with custom route optimization via Zoho Route IQ and a complete brand overhaul.",
    tag: "Operational Strategy",
    image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=1200"
  },
];

const LandingCaseStudies = () => {
  return (
    <section id="case-studies" className="py-12 bg-white">
      <div className="w-full px-4">
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease }}
        >
          <div className="flex items-center gap-5 mb-5">
            <span className="text-xs tracking-[0.25em] uppercase text-gray-400 font-medium whitespace-nowrap">
              Success Stories
            </span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>
          <h2 className="text-4xl lg:text-5xl leading-[1.1] font-normal tracking-[-0.02em] text-viracis-navy">
            Measurable impact in production.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
          {cases.map((item, i) => (
            <Link key={item.slug} href={`/case-studies/${item.slug}`}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, delay: i * 0.1, ease }}
                className="group cursor-pointer"
              >
              <div className="aspect-[16/9] bg-gray-50 border border-gray-100 mb-8 overflow-hidden relative">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-[10px] tracking-[0.2em] uppercase font-bold text-viracis-navy border border-viracis-navy/20 px-2 py-0.5">
                  {item.tag}
                </span>
                <span className="text-xs text-gray-400 font-medium">{item.company}</span>
              </div>
              <h3 className="text-2xl font-semibold text-viracis-navy tracking-tight mb-3 group-hover:underline underline-offset-4 decoration-viracis-navy/30">
                {item.title}
              </h3>
              <p className="text-base text-gray-600 leading-relaxed max-w-lg">
                {item.description}
              </p>
            </motion.div>
          </Link>
        ))}
        </div>
      </div>
    </section>
  );
};

export default LandingCaseStudies;
