"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const ease = [0.16, 1, 0.3, 1] as const;

const differentiators = [
  {
    title: "Technology Made Accessible",
    body: "We translate complex technology into clear, affordable solutions designed specifically for business needs.",
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

function MobileAccordionItem({ item, index }: { item: any; index: number }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-t-[2px] border-black flex flex-col bg-white group">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full text-left"
      >
        <div className="flex items-center gap-4 sm:gap-6 px-4 py-5 text-[11px] sm:text-[13px] font-bold uppercase tracking-widest text-black">
          <span>00{index + 1}</span>
          <span>{item.title}</span>
        </div>

        <div className="w-12 sm:w-14 shrink-0 border-l-[2px] border-black bg-viracis-cyan flex items-center justify-center self-stretch relative overflow-hidden">
          {/* Dotted crosshair */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-5 border-b-[2px] border-black border-dashed transition-all duration-300" />
            <div
              className={`absolute h-5 border-l-[2px] border-black border-dashed transition-all duration-300 ${
                isOpen ? "rotate-90 opacity-0" : ""
              }`}
            />
          </div>
        </div>
      </button>

      {/* Body content */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden bg-white border-t-[2px] border-black border-dotted"
          >
            <div className="p-4 sm:pl-16 text-[13px] sm:text-sm leading-relaxed text-black font-sans font-medium">
              {item.body}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function LandingAbout() {
  return (
    <section id="about" className="py-16 lg:py-20 bg-gray-50 border-t border-gray-200">
      <div className="max-w-[1200px] mx-auto px-6 sm:px-8">
        
        {/* Streamlined Problem & Mission (2 Columns) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-start">
          {/* The Problem */}
          <div className="flex flex-col">
            <h2 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3">
              The Problem
            </h2>
            <p className="text-2xl sm:text-3xl font-light leading-snug text-viracis-navy mb-3">
              Businesses struggle to find an affordable CRM that has everything they need to run successfully.
            </p>
            <p className="text-sm sm:text-base text-gray-600 font-light leading-relaxed">
              Most platforms are either overly complex enterprise software with bloated pricing, or fragmented tools that force you to juggle separate apps.
            </p>
          </div>

          {/* Our Mission */}
          <div className="flex flex-col lg:border-l lg:border-gray-200 lg:pl-12">
            <h2 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3">
              Our Mission
            </h2>
            <p className="text-2xl sm:text-3xl font-normal leading-snug text-viracis-navy mb-3">
              That&apos;s where Viracis comes in.
            </p>
            <p className="text-sm sm:text-base text-gray-600 font-light leading-relaxed mb-5">
              We partner with businesses to put enterprise-level CRM tools within reach, turning everyday customer relationships into lasting competitive advantages.
            </p>
            <div>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 text-sm font-semibold text-viracis-navy hover:text-viracis-cyan transition-colors duration-200 pb-0.5 border-b border-viracis-navy/30 hover:border-viracis-cyan"
              >
                Work with us
                <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile Accordion Differentiators */}
        <div className="mt-14 md:hidden border-[2px] border-black flex flex-col font-mono shadow-xl">
          {/* Logo Section */}
          <div className="bg-viracis-navy h-48 flex items-center justify-center p-8">
            <Image
              src="/viracis-logo.png"
              alt="Viracis"
              width={160}
              height={80}
              className="object-contain brightness-0 invert"
            />
          </div>
          
          {/* Accordion Items */}
          <div className="flex flex-col">
            {differentiators.map((item, i) => (
              <MobileAccordionItem key={i} item={item} index={i} />
            ))}
          </div>
        </div>

        {/* Desktop Differentiators */}
        <div className="hidden md:grid mt-14 pt-12 grid-cols-3 gap-12 border-t border-gray-200">
          {differentiators.map((item, i) => (
            <div key={i} className="flex flex-col">
              <h3 className="text-lg font-semibold mb-2 text-viracis-navy">
                {item.title}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
