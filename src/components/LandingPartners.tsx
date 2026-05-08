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
    <section className="py-24 bg-white border-t border-gray-100 overflow-hidden relative">
      <div className="max-w-[1200px] mx-auto px-8 mb-16">
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

      {/* Infinite Carousel */}
      <div className="relative w-full overflow-hidden flex items-center py-4">
        {/* Gradient fades on edges */}
        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-white to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-white to-transparent z-10" />
        
        <motion.div
          className="flex items-center w-max"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ ease: "linear", duration: 30, repeat: Infinity }}
        >
          {[...partners, ...partners].map((partner, i) => (
            <div
              key={`${partner.name}-${i}`}
              className="flex items-center justify-center shrink-0 h-20 pr-16 md:pr-24 group relative"
            >
              <img
                src={partner.logo}
                alt={partner.name}
                style={{ 
                  transform: `scale(${partner.scale})`,
                  maxHeight: '4.5rem',
                  maxWidth: '10rem'
                }}
                className="object-contain transition-all duration-500"
              />
            </div>
          ))}
        </motion.div>
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
