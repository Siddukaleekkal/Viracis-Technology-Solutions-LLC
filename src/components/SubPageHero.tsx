"use client";

import { motion } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

interface SubPageHeroProps {
  category: string;
  title: string;
  subtitle: string;
  accentColor?: string;
}

const SubPageHero = ({ category, title, subtitle, accentColor = "white" }: SubPageHeroProps) => {
  return (
    <section className="relative w-full h-[500px] lg:h-[600px] flex flex-col justify-center bg-viracis-navy text-white overflow-hidden">
      {/* Subtle Ambient Cyan Glows matching Platform page */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-viracis-cyan/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 right-1/4 w-96 h-96 bg-viracis-cyan/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto relative z-10 pt-16">
        <div className="max-w-4xl">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="inline-block text-[10px] tracking-[0.4em] uppercase font-bold text-white/40 mb-6"
          >
            {category}
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease }}
            className="text-[clamp(2.5rem,6vw,4.5rem)] leading-[1.1] tracking-[-0.03em] text-white font-normal mb-8 text-balance"
          >
            {title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease }}
            className="text-lg lg:text-xl text-white/60 leading-relaxed max-w-2xl text-balance"
          >
            {subtitle}
          </motion.p>
        </div>
      </div>
    </section>
  );
};

export default SubPageHero;
