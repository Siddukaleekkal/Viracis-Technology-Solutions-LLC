"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { Typewriter } from "./ui/typewriter";

const ease = [0.16, 1, 0.3, 1] as const;

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease },
});

export default function LandingHero() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Force play on mount to ensure reliability on mobile Safari/Chrome
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.log("Autoplay prevented:", error);
      });
    }
  }, []);

  return (
    <section className="relative min-h-screen flex items-end pb-16 md:pb-20 bg-viracis-navy overflow-hidden">
      {/* Background Video */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      >
        <source src="/Updated Hero Section.mp4" type="video/mp4" />
      </video>

      {/* Overlay — 35% for better text readability */}
      <div className="absolute inset-0 bg-black/35 z-[1]" />

      <div
        className="w-full px-4 lg:px-8 relative z-10 flex flex-col md:flex-row md:justify-between md:items-end mb-2"
        style={{ textShadow: "0 2px 16px rgba(0,0,0,0.35)" }}
      >
        <div className="max-w-3xl">
          {/* Badge */}
          <motion.div
            {...fadeUp(0.1)}
            className="inline-block bg-black/80 px-2 py-1 mb-6 text-[10px] tracking-[0.2em] text-white uppercase font-mono border border-white/10"
          >
            Built from high stakes production
          </motion.div>

          {/* Headline with Typewriter */}
          <motion.h1
            {...fadeUp(0.22)}
            className="text-[clamp(1.75rem,3.5vw,3.5rem)] leading-[1.05] tracking-tighter mb-0"
          >
            <span className="text-white block font-semibold md:font-normal">
              The complete command platform
            </span>
            <span className="text-white/60 block font-semibold md:font-normal">
              built to power your
              <br />
              <Typewriter
                text={[
                  "field.",
                  "pipeline.",
                  "team.",
                  "mission.",
                ]}
                speed={70}
                className="text-white/60"
                waitTime={2000}
                deleteSpeed={40}
                cursorChar={"_"}
                cursorClassName="ml-1 text-white/30"
                showCursor={true}
                loop={true}
              />
            </span>
          </motion.h1>

          {/* Mobile Subheader */}
          <motion.p
            {...fadeUp(0.3)}
            className="md:hidden mt-6 text-[15px] text-white/80 leading-snug font-medium pr-4"
          >
            Viracis delivers a modern CRM engineered to eliminate operational friction and help your business succeed.
          </motion.p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="absolute bottom-6 md:bottom-8 w-full z-20">
        <div className="w-full border-t border-white/20 mb-4" />
        <div className="px-4 md:px-8 flex justify-between items-center text-[9px] sm:text-[10px] md:text-[11px] tracking-[0.1em] sm:tracking-[0.2em] uppercase text-white font-mono gap-2">
          <span className="truncate max-w-[50%] md:max-w-none">[ LOC-US/RICHMOND & DALLAS ]</span>
          <span className="hidden md:inline-block shrink-0">[ 32.7767° N / 96.7970° W ]</span>
          <span className="hidden sm:inline-block shrink-0">[ 001 ]</span>
          <span className="shrink-0">SCROLL DOWN</span>
        </div>
      </div>
    </section>
  );
}
