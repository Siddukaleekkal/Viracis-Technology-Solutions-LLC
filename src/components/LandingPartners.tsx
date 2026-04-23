"use client";

import { motion } from "framer-motion";

const partners = [
  { name: "AWS", logo: "/aws.png", scale: 0.85 },
  { name: "Azure", logo: "/azure.png", scale: 0.75 },
  { name: "GCP", logo: "/gcp.png", scale: 0.85 },
  { name: "Anthropic", logo: "/anthropic_v2.webp", scale: 1.0 },
  { name: "OpenAI", logo: "/openai.png", scale: 1.9 }, // Significant boost for square-mass alignment
  { name: "Microsoft", logo: "/microsoft.jpg", scale: 0.65 }, // Reduced due to extreme horizontal mass
  { name: "Salesforce", logo: "/salesforce.png", scale: 0.7 },
  { name: "Zoho", logo: "/zoho.png", scale: 0.85 },
];

const LandingPartners = () => {
  // Use two sets for a perfect 50% shift
  const duplicatedPartners = [...partners, ...partners];

  return (
    <section className="py-10 bg-transparent overflow-hidden">
      <div className="w-full px-4 mb-10">
        <div className="flex flex-col items-center text-center text-viracis-navy/30">
          <h2 className="text-[10px] tracking-[0.4em] uppercase font-bold mb-3">
            Enterprise Technical Expertise
          </h2>
          <div className="w-6 h-[1.5px] bg-gray-100" />
        </div>
      </div>

      <div className="relative w-full overflow-hidden">
        <motion.div
          className="flex items-center w-max"
          animate={{
            x: ["0%", "-50%"],
          }}
          transition={{
            duration: 60,
            ease: "linear",
            repeat: Infinity,
          }}
        >
          {duplicatedPartners.map((partner, i) => (
            <div
              key={i}
              className="flex items-center justify-center h-14 w-[240px] px-10"
            >
              <div className="relative w-full h-full flex items-center justify-center">
                <img
                  src={partner.logo}
                  alt={partner.name}
                  style={{ 
                    transform: `scale(${partner.scale})`,
                    maxHeight: '100%',
                    maxWidth: '100%'
                  }}
                  className="object-contain transition-transform duration-300 hover:scale-105"
                />
              </div>
            </div>
          ))}
        </motion.div>
        
        {/* Fade gradients */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
      </div>
    </section>
  );
};

export default LandingPartners;
