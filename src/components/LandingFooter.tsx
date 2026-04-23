import Image from "next/image";
import Link from "next/link";

const LandingFooter = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-viracis-navy py-8 border-t border-white/5">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8">
        {/* Main row */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          {/* Logo */}
          <Link href="/" className="shrink-0">
            <Image
              src="/viracis-logo.png"
              alt="Viracis"
              width={110}
              height={38}
              className="brightness-0 invert"
            />
          </Link>

          {/* Nav */}
          <nav className="flex flex-wrap items-center gap-5 text-sm text-gray-400">
            <Link href="/about" className="hover:text-white transition-colors duration-200">About</Link>
            <Link href="/services" className="hover:text-white transition-colors duration-200">Services</Link>
            <Link href="/blog" className="hover:text-white transition-colors duration-200">Blog</Link>
            <Link href="/case-studies" className="hover:text-white transition-colors duration-200">Case Studies</Link>
            <Link href="/contact" className="hover:text-white transition-colors duration-200">Contact</Link>
          </nav>

          {/* Contact */}
          <div className="flex items-center gap-5">
            <a href="mailto:hello@viracis.com" className="text-gray-400 hover:text-white transition-colors duration-200" title="Email">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
            </a>
            <a href="tel:+18045033954" className="text-gray-400 hover:text-white transition-colors duration-200" title="Phone">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            </a>
            <a
              href="https://www.linkedin.com/in/viracis-viracis-technology-solutions-40a7b53b3/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors duration-200"
              title="LinkedIn"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-6 pt-6 border-t border-white/5">
          <p className="text-xs text-gray-500">
            &copy; {year} Viracis Technology Solutions LLC. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default LandingFooter;
