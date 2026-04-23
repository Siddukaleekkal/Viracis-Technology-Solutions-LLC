"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Typewriter } from "./ui/typewriter";

const ease = [0.16, 1, 0.3, 1] as const;

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease },
});

export default function LandingHero() {
  return (
    <section className="relative min-h-screen flex items-center bg-viracis-navy overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      >
        <source src="/Hero Section.mp4" type="video/mp4" />
      </video>

      {/* Overlay — 35% for better text readability */}
      <div className="absolute inset-0 bg-black/35 z-[1]" />

      <div
        className="w-full px-4 relative z-10"
        style={{ textShadow: "0 2px 16px rgba(0,0,0,0.35)" }}
      >
        <div className="max-w-4xl">
          {/* Headline with Typewriter */}
          <motion.h1
            {...fadeUp(0.22)}
            className="text-[clamp(2.8rem,5.5vw,5.5rem)] leading-[1.05] tracking-[-0.03em] text-white font-normal mb-10"
          >
            Scale your business with
            <br />
            technology built for
            <br />
            <Typewriter
              text={[
                "Efficiency.",
                "Growth.",
                "Profit.",
                "Longevity.",
              ]}
              speed={70}
              className="text-white/80"
              waitTime={2000}
              deleteSpeed={40}
              cursorChar={"_"}
              cursorClassName="ml-1 text-white/40"
              showCursor={true}
              loop={true}
            />
          </motion.h1>

          {/* CTAs */}
          <motion.div
            {...fadeUp(0.52)}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-4"
          >
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 bg-white/10 backdrop-blur-lg border border-white/20 text-sm font-semibold text-white hover:bg-white/20 hover:border-white/30 transition-all duration-300 min-h-[56px]"
            >
              Start a Conversation
            </Link>
            <a
              href="#case-studies"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/5 backdrop-blur-lg border border-white/10 text-sm font-semibold text-white hover:bg-white/10 hover:border-white/20 hover:gap-4 transition-all duration-300 min-h-[56px]"
            >
              Case Studies
              <span className="text-white/60 text-lg leading-none">→</span>
            </a>
          </motion.div>
        </div>
      </div>

    </section>
  );
}
