"use client";

import { motion } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

interface SubPageHeroProps {
  category: string;
  title: string;
  subtitle: string;
  accentColor?: string;
  size?: "default" | "compact";
}

const SubPageHero = ({
  category,
  title,
  subtitle,
  accentColor = "white",
  size = "default",
}: SubPageHeroProps) => {
  const isCompact = size === "compact";

  return (
    <section
      className={`relative w-full flex flex-col justify-center bg-viracis-navy text-white overflow-hidden ${
        isCompact
          ? "py-14 sm:py-16 lg:py-20"
          : "h-[480px] lg:h-[560px]"
      }`}
    >
      {/* Subtle Ambient Cyan Glows matching Platform page */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-viracis-cyan/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 right-1/4 w-96 h-96 bg-viracis-cyan/10 rounded-full blur-3xl pointer-events-none" />

      <div
        className={`w-full px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto relative z-10 ${
          isCompact ? "pt-2 sm:pt-4" : "pt-12 sm:pt-16"
        }`}
      >
        <div className="max-w-4xl">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease }}
            className={`inline-block text-[10px] tracking-[0.35em] uppercase font-bold text-white/40 ${
              isCompact ? "mb-3 sm:mb-4" : "mb-6"
            }`}
          >
            {category}
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08, ease }}
            className={`${
              isCompact
                ? "text-3xl sm:text-4xl lg:text-[2.75rem]"
                : "text-[clamp(2.5rem,6vw,4.5rem)]"
            } leading-[1.12] tracking-[-0.025em] text-white font-normal ${
              isCompact ? "mb-3 sm:mb-4" : "mb-8"
            } text-balance`}
          >
            {title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.16, ease }}
            className={`${
              isCompact ? "text-base sm:text-lg" : "text-lg lg:text-xl"
            } text-white/60 leading-relaxed max-w-2xl text-balance`}
          >
            {subtitle}
          </motion.p>
        </div>
      </div>
    </section>
  );
};

export default SubPageHero;
