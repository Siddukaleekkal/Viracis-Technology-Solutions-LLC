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

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
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
          ? "bg-white/80 backdrop-blur-md border-gray-200 py-3 shadow-sm"
          : "bg-white border-transparent py-4"
          }`}
      >
        <nav className="w-full px-8 flex items-center justify-between">
          <Link href="/" className="relative flex items-center shrink-0" title="Viracis Home">
            <Image
              src="/viracis-logo.png"
              alt="Viracis Technology Solutions"
              width={180}
              height={60}
              className={`transition-all duration-300 ${isScrolled ? "h-10" : "h-12"} w-auto object-contain`}
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
              className="inline-flex items-center px-4 py-3 text-[11px] tracking-[0.2em] uppercase font-bold text-viracis-navy border-2 border-viracis-navy hover:bg-viracis-navy hover:text-white transition-all duration-300"
            >
              Client Login
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center px-6 py-3 text-[11px] tracking-[0.2em] uppercase font-bold bg-viracis-navy text-white border-2 border-viracis-navy hover:bg-[#122F54] hover:border-[#122F54] transition-all duration-300"
            >
              Get in Touch
            </Link>
          </div>
        </nav>
      </header>

      {/* Mobile Top Logo Header (Matching Web View) */}
      <header className={`md:hidden fixed top-0 left-0 right-0 z-[70] border-b transition-colors duration-300 px-6 py-4 flex items-center justify-between ${mobileOpen ? 'bg-viracis-navy border-white/10' : 'bg-white border-gray-100'}`}>
        <Link href="/" className="block" title="Viracis Home" onClick={() => setMobileOpen(false)}>
          <Image
            src="/viracis-logo.png"
            alt="Viracis Technology Solutions"
            width={100}
            height={32}
            className={`h-8 w-auto object-contain transition-all duration-300 ${mobileOpen ? 'brightness-0 invert' : ''}`}
          />
        </Link>

        {/* Hamburger */}
        <button
          onClick={() => setMobileOpen((v) => !v)}
          className="w-10 h-10 flex items-center justify-center"
          aria-label="Menu"
        >
          <div className="w-6 flex flex-col gap-[5px]">
            <span className={`h-[2px] w-full transition-all duration-300 ${mobileOpen ? "bg-white rotate-45 translate-y-[7px]" : "bg-viracis-navy"}`} />
            <span className={`h-[2px] w-full transition-all duration-300 ${mobileOpen ? "opacity-0" : "bg-viracis-navy"}`} />
            <span className={`h-[2px] w-full transition-all duration-300 ${mobileOpen ? "bg-white -rotate-45 -translate-y-[7px]" : "bg-viracis-navy"}`} />
          </div>
        </button>
      </header>

      {/* Mobile Menu Overlay */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: mobileOpen ? 1 : 0, y: mobileOpen ? 0 : -20 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className={`md:hidden fixed inset-0 z-[55] bg-viracis-navy text-white flex flex-col pt-32 px-8 ${
          mobileOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        <div className="space-y-8">
          {navLinks.map((link, i) => (
            <motion.div
              key={link.label}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: mobileOpen ? 1 : 0, x: mobileOpen ? 0 : -20 }}
              transition={{ duration: 0.4, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="group block"
              >
                <div className="flex items-center justify-between">
                  <h2 className="text-4xl font-bold tracking-tight group-hover:text-viracis-cyan transition-colors">
                    {link.label}
                  </h2>
                  <span className="text-2xl text-white/20 group-hover:text-viracis-cyan transition-colors">→</span>
                </div>
              </Link>
            </motion.div>
          ))}
          
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: mobileOpen ? 1 : 0, x: mobileOpen ? 0 : -20 }}
            transition={{ duration: 0.4, delay: navLinks.length * 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="pt-6 border-t border-white/10"
          >
            <a
              href="https://app.viracis.com/login"
              onClick={() => setMobileOpen(false)}
              className="group block mb-6"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-4xl font-bold tracking-tight text-viracis-cyan group-hover:text-white transition-colors">
                  Client Login
                </h2>
                <span className="text-2xl text-viracis-cyan group-hover:text-white transition-colors">→</span>
              </div>
            </a>
            
            <Link
              href="/contact"
              onClick={() => setMobileOpen(false)}
              className="group block"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-4xl font-bold tracking-tight text-white group-hover:text-viracis-cyan transition-colors">
                  Get Started
                </h2>
                <span className="text-2xl text-white group-hover:text-viracis-cyan transition-colors">→</span>
              </div>
            </Link>
          </motion.div>
        </div>

        <motion.div 
          className="mt-auto pb-32 pt-10 border-t border-white/5"
          initial={{ opacity: 0 }}
          animate={{ opacity: mobileOpen ? 1 : 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="grid grid-cols-1 gap-10 text-[10px] tracking-widest uppercase font-bold text-white/30">
            <div>
              <p className="mb-4 text-viracis-cyan/60">Connect</p>
              <div className="flex flex-wrap gap-8">
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
