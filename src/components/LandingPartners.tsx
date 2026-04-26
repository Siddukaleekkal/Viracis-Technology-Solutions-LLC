"use client";

import { motion } from "framer-motion";

const partners = [
  { name: "AWS", logo: "/aws.png", scale: 0.85 },
  { name: "Azure", logo: "/azure.png", scale: 0.75 },
  { name: "GCP", logo: "/gcp.png", scale: 0.85 },
  { name: "Anthropic", logo: "/anthropic_v2.webp", scale: 0.95 },
  { name: "OpenAI", logo: "/openai.png", scale: 1.6 }, 
  { name: "Microsoft", logo: "/microsoft.jpg", scale: 0.75 },
  { name: "Salesforce", logo: "/salesforce.png", scale: 0.75 },
  { name: "Zoho", logo: "/zoho.png", scale: 0.85 },
];

const LandingPartners = () => {
  return (
    <section className="py-24 bg-white border-t border-gray-100 overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-8">
        <div className="mb-16">
          <div className="flex flex-col items-center text-center">
            <h2 className="text-[10px] tracking-[0.4em] uppercase font-bold text-viracis-navy/40 mb-3">
              Enterprise Technical Expertise
            </h2>
            <div className="w-8 h-[1.5px] bg-viracis-cyan/30" />
            <p className="mt-6 text-2xl lg:text-3xl font-normal text-viracis-navy max-w-2xl">
              We build on world-class infrastructure and AI platforms.
            </p>
          </div>
        </div>

        {/* Static Zig-Zag Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-16 lg:gap-y-24">
          {partners.map((partner, i) => {
            // Calculations for zig-zag offset
            // We want alternating rows or columns to be slightly shifted
            const isEvenColumn = i % 2 === 1;
            const isSecondRow = i >= 4;
            
            return (
              <motion.div
                key={partner.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`flex items-center justify-center h-20 transition-all duration-500
                  ${isEvenColumn ? 'md:translate-y-12' : ''}
                `}
              >
                <div className="relative group">
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    style={{ 
                      transform: `scale(${partner.scale})`,
                      maxHeight: '4.5rem',
                      maxWidth: '10rem'
                    }}
                    className="object-contain transition-all duration-500 cursor-default"
                  />
                  {/* Subtle hover indicator */}
                  <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-viracis-cyan/40 transition-all duration-300 group-hover:w-full opacity-0 group-hover:opacity-100" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Background Decorative Element */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden -z-10 opacity-[0.03]">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>
    </section>
  );
};

export default LandingPartners;
