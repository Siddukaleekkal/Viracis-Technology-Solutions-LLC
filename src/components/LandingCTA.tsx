"use client";

import { motion } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

export default function LandingCTA() {
  return (
    <section id="contact" className="py-24 bg-viracis-navy">
      <div className="w-full px-4">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease }}
            className="max-w-2xl"
          >
            <h2 className="text-4xl lg:text-5xl leading-[1.1] text-white font-normal tracking-[-0.02em] mb-6">
              Ready to scale with technology that lasts?
            </h2>
            <p className="text-lg text-gray-400 leading-relaxed">
              Translate your business objectives into reliable, production-ready systems. Experience the Viracis difference.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease }}
          >
            <a
              href="mailto:hello@viracis.com"
              className="inline-flex items-center px-10 py-5 bg-white text-viracis-navy text-sm font-bold tracking-wide hover:bg-gray-100 transition-all duration-200"
            >
              Get in Touch
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
