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
          <Link href="/" className="relative flex items-center shrink-0">
            <Image
              src="/viracis-logo.png"
              alt="Viracis"
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
            <Link
              href="/contact"
              className="inline-flex items-center px-6 py-3 text-[11px] tracking-[0.2em] uppercase font-bold bg-viracis-navy text-white hover:bg-[#122F54] transition-all duration-300"
            >
              Get in Touch
            </Link>
          </div>
        </nav>
      </header>

      {/* Mobile Top Logo Header (Matching Web View) */}
      <header className="md:hidden fixed top-0 left-0 right-0 z-[60] bg-white border-b border-gray-100 px-6 py-4">
        <Link href="/" className="block">
          <Image
            src="/viracis-logo.png"
            alt="Viracis"
            width={100}
            height={32}
            className="h-8 w-auto object-contain"
          />
        </Link>
      </header>

      {/* Mobile Bottom Action Bar */}
      <div className="md:hidden fixed bottom-6 left-6 right-6 z-[60] flex items-center justify-between gap-2">
        {/* Hamburger */}
        <button
          onClick={() => setMobileOpen((v) => !v)}
          className="w-12 h-12 bg-viracis-navy rounded-sm flex items-center justify-center shadow-2xl"
          aria-label="Menu"
        >
          <div className="w-5 flex flex-col gap-[3px]">
            <span className={`h-[2px] bg-white transition-all duration-300 ${mobileOpen ? "rotate-45 translate-y-[5px]" : ""}`} />
            <span className={`h-[2px] bg-white transition-all duration-300 ${mobileOpen ? "opacity-0" : ""}`} />
            <span className={`h-[2px] bg-white transition-all duration-300 ${mobileOpen ? "-rotate-45 -translate-y-[5px]" : ""}`} />
          </div>
        </button>

        {/* Get Started Button */}
        <Link
          href="/contact"
          className="px-6 h-12 bg-white text-viracis-navy font-bold text-sm flex items-center justify-center rounded-sm shadow-2xl"
        >
          Get Started
        </Link>
      </div>

      {/* Mobile Menu Overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: mobileOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className={`md:hidden fixed inset-0 z-[55] bg-viracis-navy text-white flex flex-col p-6 ${
          mobileOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        <div className="flex-1 flex flex-col justify-center items-center space-y-12">
          {navLinks.map((link, i) => (
            <motion.div
              key={link.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: mobileOpen ? 1 : 0, y: mobileOpen ? 0 : 10 }}
              transition={{ duration: 0.4, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="group flex flex-col items-center"
              >
                <span className="text-[9px] tracking-[0.4em] uppercase text-viracis-cyan font-bold mb-2">
                  0{i + 1}
                </span>
                <h2 className="text-4xl font-bold tracking-tight group-hover:scale-105 transition-transform duration-300">
                  {link.label}
                </h2>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Menu Footer */}
        <motion.div 
          className="pb-32 pt-8 border-t border-white/5 w-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: mobileOpen ? 1 : 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="grid grid-cols-1 gap-8 text-center text-[10px] tracking-widest uppercase font-bold text-white/30">
            <div>
              <p className="mb-4 text-viracis-cyan/60">Connect</p>
              <div className="flex flex-wrap justify-center gap-x-6 gap-y-3">
                <a href="mailto:hello@viracis.com" className="hover:text-white transition-colors">Email</a>
                <a href="tel:+18045033954" className="hover:text-white transition-colors">Phone</a>
                <a href="https://www.linkedin.com/in/viracis-viracis-technology-solutions-40a7b53b3/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">LinkedIn</a>
              </div>
            </div>
            <div>
              <p className="mb-4 text-viracis-cyan/60">Location</p>
              <div className="space-y-1">
                <p>Richmond, VA</p>
                <p>© {new Date().getFullYear()} Viracis</p>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </>
  );
}
