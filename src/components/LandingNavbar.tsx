"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Platform", href: "/platform" },
  { label: "Blog", href: "/blog" },
  { label: "FAQ", href: "/faq" },
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
  useEffect(() => {
    const handlePageShow = () => {
      setIsLoggingIn(false);
    };
    window.addEventListener("pageshow", handlePageShow);
    return () => {
      window.removeEventListener("pageshow", handlePageShow);
    };
  }, []);

  return (
    <>
      {/* Desktop Header */}
      <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-200 shadow-sm hidden md:block">
        <nav className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 flex items-center py-3.5">
          {/* Left: Brand Logo */}
          <div className="flex-1 flex items-center justify-start">
            <Link href="/" className="relative flex items-center shrink-0" title="Viracis Home">
              <Image
                src="/viracis-logo.png"
                alt="Viracis Technology Solutions"
                width={180}
                height={60}
                className="h-11 w-auto object-contain"
                priority
              />
            </Link>
          </div>

          {/* Center: Navigation Links */}
          <div className="flex items-center justify-center gap-6 lg:gap-8 shrink-0">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="font-sans text-[12px] tracking-[0.16em] uppercase font-medium text-black hover:text-viracis-navy transition-colors px-2 py-1"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right: Actions */}
          <div className="flex-1 flex items-center justify-end gap-3 shrink-0">
            <a
              href="https://app.viracis.com/login"
              onMouseEnter={() => {
                const prefetchLink = document.createElement("link");
                prefetchLink.rel = "prefetch";
                prefetchLink.href = "https://app.viracis.com/login";
                document.head.appendChild(prefetchLink);
              }}
              className="font-sans inline-flex items-center px-4 py-3 text-[11px] tracking-[0.2em] uppercase font-bold text-black border-2 border-black hover:bg-black hover:text-white transition-all duration-300 touch-manipulation"
            >
              Login
            </a>
            <Link
              href="/contact"
              className="font-sans inline-flex items-center px-6 py-3 text-[11px] tracking-[0.2em] uppercase font-bold bg-viracis-navy text-white border-2 border-viracis-navy hover:bg-[#122F54] hover:border-[#122F54] transition-all duration-300"
            >
              Book Demo
            </Link>
          </div>
        </nav>
      </header>

      {/* Mobile Top Logo Header (Matching Web View) */}
      <header className={`md:hidden sticky top-0 z-[70] w-full border-b transition-colors duration-300 ${mobileOpen ? 'bg-viracis-navy border-white/10' : 'bg-white border-gray-100 shadow-sm'}`}>
        <div className="max-w-6xl mx-auto px-5 sm:px-6 py-3 flex items-center justify-between">
          <Link href="/" className="block" title="Viracis Home" onClick={() => setMobileOpen(false)}>
            <Image
              src="/viracis-logo.png"
              alt="Viracis Technology Solutions"
              width={100}
              height={32}
              className={`h-8 w-auto object-contain transition-all duration-300 ${mobileOpen ? 'brightness-0 invert' : ''}`}
            />
          </Link>

          {/* Actions: Login, Book Demo & Hamburger */}
          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href="https://app.viracis.com/login"
              onClick={() => setIsLoggingIn(true)}
              onTouchStart={() => {
                const prefetchLink = document.createElement("link");
                prefetchLink.rel = "prefetch";
                prefetchLink.href = "https://app.viracis.com/login";
                document.head.appendChild(prefetchLink);
              }}
              onMouseEnter={() => {
                const prefetchLink = document.createElement("link");
                prefetchLink.rel = "prefetch";
                prefetchLink.href = "https://app.viracis.com/login";
                document.head.appendChild(prefetchLink);
              }}
              className={`font-sans inline-flex items-center justify-center min-w-[54px] px-2.5 sm:px-3 py-1.5 text-[10px] tracking-[0.18em] uppercase font-bold transition-all duration-300 touch-manipulation ${
                mobileOpen
                  ? "text-white border border-white/60 hover:bg-white/10"
                  : "text-black border border-black hover:bg-black hover:text-white"
              }`}
            >
              {isLoggingIn ? (
                <span className="inline-block w-3 h-3 border-2 border-current border-t-transparent rounded-full animate-spin" />
              ) : (
                "Login"
              )}
            </a>

            <Link
              href="/contact"
              onClick={() => setMobileOpen(false)}
              className={`font-sans inline-flex items-center px-3 sm:px-3.5 py-1.5 text-[10px] tracking-[0.18em] uppercase font-bold transition-all duration-300 touch-manipulation shrink-0 ${
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
              className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center shrink-0 -mr-1.5 sm:-mr-2 touch-manipulation"
              aria-label="Menu"
            >
              <div className="w-5 sm:w-6 flex flex-col gap-[5px]">
                <span className={`h-[2px] w-full transition-all duration-300 ${mobileOpen ? "bg-white rotate-45 translate-y-[7px]" : "bg-black"}`} />
                <span className={`h-[2px] w-full transition-all duration-300 ${mobileOpen ? "opacity-0" : "bg-black"}`} />
                <span className={`h-[2px] w-full transition-all duration-300 ${mobileOpen ? "bg-white -rotate-45 -translate-y-[7px]" : "bg-black"}`} />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu (Drops down from the top) */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden border-t border-white/10 bg-viracis-navy shadow-2xl"
            >
              <div className="px-6 pt-5 pb-7 space-y-4">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.label}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25, delay: i * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="group flex items-center justify-between py-2 border-b border-white/5"
                    >
                      <span className="text-xl font-semibold tracking-tight text-white group-hover:text-viracis-cyan transition-colors">
                        {link.label}
                      </span>
                      <span className="text-lg text-white/30 group-hover:text-viracis-cyan transition-colors">
                        →
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Mobile Menu Backdrop */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}

