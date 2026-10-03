"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const navLinks = [
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Blog", href: "/blog" },
  { label: "Case Studies", href: "/case-studies" },
];

export default function LandingNavbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Lock body scroll when mobile menu is open & prewarm CRM connection
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
      // Prewarm CRM connection when mobile menu is opened
      const prefetchLink = document.createElement("link");
      prefetchLink.rel = "prefetch";
      prefetchLink.href = "https://app.viracis.com/login";
      document.head.appendChild(prefetchLink);
    } else {
      document.body.style.overflow = "unset";
      setIsLoggingIn(false);
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileOpen]);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Desktop Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b hidden md:block ${isScrolled
          ? "bg-white/95 backdrop-blur-md border-gray-200 shadow-sm"
          : "bg-white border-transparent"
          }`}
      >
        {/* Top Announcement Bar */}
        <div className="bg-viracis-navy text-white border-b border-white/10 py-2.5 px-6">
          <div className="max-w-[1240px] mx-auto flex items-center justify-center gap-3 sm:gap-4 text-center">
            <p className="text-xs sm:text-sm text-gray-200 font-light tracking-wide">
              Introducing Viracis CRM with built in territory mapping, multi fleet dispatch, and automated billing.
            </p>
            <Link
              href="/blog/inside-viracis-crm-field-operations"
              className="text-xs text-white hover:text-viracis-cyan underline underline-offset-4 transition-colors shrink-0"
            >
              Read release &rarr;
            </Link>
          </div>
        </div>

        <nav className={`w-full px-8 flex items-center justify-between transition-all duration-300 ${isScrolled ? "py-2.5" : "py-3.5"}`}>
          <Link href="/" className="relative flex items-center shrink-0" title="Viracis Home">
            <Image
              src="/viracis-logo.png"
              alt="Viracis Technology Solutions"
              width={180}
              height={60}
              className={`transition-all duration-300 ${isScrolled ? "h-9" : "h-11"} w-auto object-contain`}
              priority
            />
          </Link>

          <div className="flex items-center gap-4 lg:gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-[11px] tracking-[0.2em] uppercase font-bold text-gray-400 hover:text-viracis-navy transition-colors px-2 py-1"
              >
                {link.label}
              </Link>
            ))}
            <a
              href="https://app.viracis.com/login"
              onMouseEnter={() => {
                const prefetchLink = document.createElement("link");
                prefetchLink.rel = "prefetch";
                prefetchLink.href = "https://app.viracis.com/login";
                document.head.appendChild(prefetchLink);
              }}
              className="inline-flex items-center px-4 py-3 text-[11px] tracking-[0.2em] uppercase font-bold text-viracis-navy border-2 border-viracis-navy hover:bg-viracis-navy hover:text-white transition-all duration-300 touch-manipulation"
            >
              Login
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center px-6 py-3 text-[11px] tracking-[0.2em] uppercase font-bold bg-viracis-navy text-white border-2 border-viracis-navy hover:bg-[#122F54] hover:border-[#122F54] transition-all duration-300"
            >
              Book Demo
            </Link>
          </div>
        </nav>
      </header>

      {/* Mobile Top Logo Header (Matching Web View) */}
      <header className={`md:hidden fixed top-0 left-0 right-0 z-[70] border-b transition-colors duration-300 ${mobileOpen ? 'bg-viracis-navy border-white/10' : 'bg-white border-gray-100'}`}>
        {!mobileOpen && (
          <div className="bg-viracis-navy text-white text-[11px] py-2 px-4 border-b border-white/10 flex items-center justify-center gap-2.5 text-center">
            <span className="text-gray-200 font-light truncate">
              Viracis CRM is now live
            </span>
            <Link
              href="/blog/inside-viracis-crm-field-operations"
              className="shrink-0 text-white hover:text-viracis-cyan underline underline-offset-2 transition-colors font-light"
            >
              Read release &rarr;
            </Link>
          </div>
        )}

        <div className="px-5 sm:px-6 py-3 flex items-center justify-between">
          <Link href="/" className="block" title="Viracis Home" onClick={() => setMobileOpen(false)}>
            <Image
              src="/viracis-logo.png"
              alt="Viracis Technology Solutions"
              width={100}
              height={32}
              className={`h-8 w-auto object-contain transition-all duration-300 ${mobileOpen ? 'brightness-0 invert' : ''}`}
            />
          </Link>

          {/* Actions: Book Demo & Hamburger */}
          <div className="flex items-center gap-3">
            <Link
              href="/contact"
              onClick={() => setMobileOpen(false)}
              className={`inline-flex items-center px-3.5 py-1.5 text-[10px] tracking-[0.18em] uppercase font-bold transition-all duration-300 touch-manipulation ${
                mobileOpen
                  ? "bg-white text-viracis-navy border border-white hover:bg-gray-100"
                  : "bg-viracis-navy text-white border border-viracis-navy hover:bg-[#122F54]"
              }`}
            >
              Book Demo
            </Link>

            {/* Hamburger button */}
            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="w-10 h-10 flex items-center justify-center shrink-0 -mr-2 touch-manipulation"
              aria-label="Menu"
            >
              <div className="w-6 flex flex-col gap-[5px]">
                <span className={`h-[2px] w-full transition-all duration-300 ${mobileOpen ? "bg-white rotate-45 translate-y-[7px]" : "bg-viracis-navy"}`} />
                <span className={`h-[2px] w-full transition-all duration-300 ${mobileOpen ? "opacity-0" : "bg-viracis-navy"}`} />
                <span className={`h-[2px] w-full transition-all duration-300 ${mobileOpen ? "bg-white -rotate-45 -translate-y-[7px]" : "bg-viracis-navy"}`} />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: mobileOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className={`md:hidden fixed inset-0 z-[55] bg-black/40 backdrop-blur-sm ${
          mobileOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
        onClick={() => setMobileOpen(false)}
      />

      {/* Mobile Menu Drawer */}
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: mobileOpen ? "0%" : "100%" }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className={`md:hidden fixed top-0 right-0 bottom-0 w-[80%] max-w-[320px] z-[60] bg-viracis-navy border-l border-white/10 flex flex-col pt-28 px-6 shadow-2xl ${
          mobileOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        <div className="space-y-6">
          {navLinks.map((link, i) => (
            <motion.div
              key={link.label}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: mobileOpen ? 1 : 0, x: mobileOpen ? 0 : 20 }}
              transition={{ duration: 0.3, delay: i * 0.05 + 0.1 }}
            >
              <Link
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="group block"
              >
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-semibold tracking-tight text-white group-hover:text-viracis-cyan transition-colors">
                    {link.label}
                  </h2>
                  <span className="text-xl text-white/20 group-hover:text-viracis-cyan transition-colors">→</span>
                </div>
              </Link>
            </motion.div>
          ))}
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: mobileOpen ? 1 : 0, x: mobileOpen ? 0 : 20 }}
            transition={{ duration: 0.3, delay: navLinks.length * 0.05 + 0.1 }}
            className="pt-6 border-t border-white/10"
          >
            <a
              href="https://app.viracis.com/login"
              onClick={() => {
                setIsLoggingIn(true);
              }}
              className="group block touch-manipulation"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold tracking-tight text-viracis-cyan group-hover:text-white transition-colors flex items-center gap-3">
                  <span>{isLoggingIn ? "Opening CRM..." : "Login"}</span>
                  {isLoggingIn && (
                    <span className="inline-block w-4 h-4 border-2 border-viracis-cyan border-t-transparent rounded-full animate-spin" />
                  )}
                </h2>
                <span className="text-xl text-viracis-cyan group-hover:text-white transition-colors">
                  {isLoggingIn ? "" : "→"}
                </span>
              </div>
            </a>
          </motion.div>
        </div>

        <motion.div 
          className="mt-auto pb-8 pt-8 border-t border-white/5"
          initial={{ opacity: 0 }}
          animate={{ opacity: mobileOpen ? 1 : 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <div className="grid grid-cols-1 gap-6 text-[10px] tracking-widest uppercase font-bold text-white/30">
            <div>
              <p className="mb-3 text-viracis-cyan/60">Connect</p>
              <div className="flex flex-wrap gap-6">
                <a href="mailto:siddu@viracis.com" className="hover:text-white transition-colors">Email</a>
                <a href="tel:+18045033954" className="hover:text-white transition-colors">Phone</a>
                <a href="https://www.linkedin.com/company/viracis" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">LinkedIn</a>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </>
  );
}
