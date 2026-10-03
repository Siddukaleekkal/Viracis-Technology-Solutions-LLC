"use client";

import { motion } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

export default function LandingStatement() {
  return (
    <section className="py-20 sm:py-28 md:py-32 bg-white border-t border-gray-100 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
          {/* Left: Headline in Queens Editorial Serif */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease }}
            className="lg:col-span-5"
          >
            <h2 className="font-heading text-3xl sm:text-4xl md:text-[44px] lg:text-[48px] font-normal text-black leading-[1.18] tracking-[-0.015em]">
              What is Viracis?
            </h2>
          </motion.div>

          {/* Right: Paragraph in Lexend Deca */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, ease }}
            className="lg:col-span-7"
          >
            <p className="font-sans text-[16px] sm:text-[18px] md:text-[19px] text-gray-700 font-normal leading-[1.7] max-w-2xl">
              Viracis brings together your teams, turf maps, live dispatch, and customer billing on the same platform, so every field interaction drives revenue. Reps close more doors. Fleets dispatch without friction. Invoices get paid on the spot.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
