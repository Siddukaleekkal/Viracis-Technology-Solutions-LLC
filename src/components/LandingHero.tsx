"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

const ease = [0.16, 1, 0.3, 1] as const;

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease },
});

export default function LandingHero() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => { });
    }
  }, []);

  return (
    <section className="relative min-h-[calc(100vh-70px)] pt-24 sm:pt-24 md:pt-24 lg:pt-32 pb-12 md:pb-24 bg-white overflow-hidden flex flex-col justify-start items-center">
      {/* Background Video: New hero section v1.mp4 */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden select-none">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/New hero section v1.mp4" type="video/mp4" />
        </video>
        {/* Soft wash overlay so black typography stays crisp and bottom blends smoothly into white */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-transparent to-white" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        {/* Headline in Lexend Deca */}
        <motion.h1
          {...fadeUp(0.1)}
          className="font-sans text-[26px] sm:text-[36px] md:text-[44px] lg:text-[52px] xl:text-[58px] font-semibold text-black leading-[1.15] tracking-[-0.015em] mb-6 max-w-5xl mx-auto"
        >
          <span className="block sm:whitespace-nowrap">The All in One Door to Door</span>
          <span className="block">Operating System</span>
        </motion.h1>

        {/* Subtitle in Lexend Deca */}
        <motion.p
          {...fadeUp(0.2)}
          className="font-sans text-[15px] sm:text-[17px] md:text-[18px] lg:text-[19px] leading-[1.6] text-black/75 font-normal max-w-3xl mx-auto mb-9 sm:mb-11 px-2 sm:px-0"
        >
          <span className="sm:block">Ditch messy spreadsheets, scattered maps, and lost invoices. Pin leads on</span>
          <span className="sm:block">live turf, schedule jobs on the spot, and keep your crews closing faster.</span>
        </motion.p>

        {/* Rectangular CTA Button */}
        <motion.div
          {...fadeUp(0.28)}
          className="mb-10 sm:mb-12 md:mb-16 flex justify-center"
        >
          <Link
            href="/contact"
            className="font-sans inline-flex items-center justify-center px-8 sm:px-9 py-3.5 sm:py-4 bg-viracis-navy hover:bg-[#122F54] text-white font-medium text-[14px] sm:text-[15px] md:text-[16px] tracking-wide border border-viracis-navy shadow-[0_10px_25px_rgba(10,37,64,0.18)] transition-colors duration-200"
          >
            Request Your 1:1 Demo & Consultation
          </Link>
        </motion.div>

        {/* Devices Showcase (Separate, Side-by-Side without overlapping) */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.3, ease }}
          className="relative mx-auto max-w-5xl px-2 sm:px-4 flex flex-row items-end justify-center gap-3 sm:gap-6 md:gap-8 lg:gap-10 w-full"
        >
          {/* iPhone Mockup (Left, separate side-by-side) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.4, ease }}
            className="w-[30%] sm:w-[28%] md:w-[24%] max-w-[240px] shrink-0 drop-shadow-[0_20px_35px_rgba(0,0,0,0.14)]"
          >
            <Image
              src="/images/Device Images/hero-iphone.png"
              alt="Viracis CRM Client Messaging on iPhone"
              width={733}
              height={1524}
              priority
              quality={95}
              className="w-full h-auto object-contain select-none"
            />
          </motion.div>

          {/* iPad Mockup (Right, separate, fully visible) */}
          <div className="w-[68%] sm:w-[70%] md:w-[74%] max-w-[780px] drop-shadow-[0_25px_50px_rgba(0,0,0,0.12)]">
            <Image
              src="/images/Device Images/hero-ipad.png"
              alt="Viracis CRM Dashboard on iPad"
              width={1859}
              height={1423}
              priority
              quality={95}
              className="w-full h-auto object-contain select-none"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
