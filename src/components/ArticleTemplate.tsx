"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import LandingNavbar from "@/components/LandingNavbar";
import LandingFooter from "@/components/LandingFooter";

interface TableOfContentsItem {
  id: string;
  title: string;
}

interface RecentPost {
  title: string;
  date: string;
  image: string;
  slug: string;
}

interface ArticleTemplateProps {
  category: string;
  title: string;
  author: {
    name: string;
    avatar: string;
    date: string;
    readTime: string;
  };
  mainImage: string;
  content: string;
  toc: TableOfContentsItem[];
  recentPosts: RecentPost[];
  backLink: string;
  backText: string;
}

const ease = [0.16, 1, 0.3, 1] as const;

export default function ArticleTemplate({
  category,
  title,
  author,
  mainImage,
  content,
  toc,
  recentPosts,
  backLink,
  backText,
}: ArticleTemplateProps) {
  const [scrollProgress, setScrollProgress] = React.useState(0);

  React.useEffect(() => {
    const handleScroll = () => {
      const height = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress((window.scrollY / height) * 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="bg-white min-h-screen">
      <LandingNavbar />

      {/* Reading progress bar */}
      <div className="fixed top-0 left-0 w-full h-0.5 z-50 bg-gray-100">
        <div
          className="h-full bg-viracis-cyan transition-all duration-75"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <div className="pt-24 pb-16 md:pb-24">
        <div className="max-w-[1200px] mx-auto px-4 md:px-8">

          {/* Back link */}
          <Link
            href={backLink}
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-medium text-gray-400 hover:text-viracis-navy transition-colors duration-200 mb-10 group"
          >
            <span className="group-hover:-translate-x-1 transition-transform duration-200">←</span>
            {backText}
          </Link>

          {/* Article header */}
          <motion.header
            className="max-w-3xl mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
          >
            <span className="text-xs tracking-[0.2em] uppercase font-medium text-viracis-cyan mb-4 block">
              {category}
            </span>
            <h1 className="text-2xl sm:text-3xl lg:text-5xl font-normal tracking-[-0.02em] text-viracis-navy leading-[1.15] mb-6 md:mb-8">
              {title}
            </h1>
            <div className="flex flex-wrap items-center gap-6 pt-6 border-t border-gray-200 text-sm text-gray-500">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gray-100 overflow-hidden flex items-center justify-center shrink-0">
                  <img src={author.avatar} alt={author.name} className="w-full h-full object-contain p-1" />
                </div>
                <span className="font-medium text-viracis-navy">{author.name}</span>
              </div>
              <span className="text-gray-300 hidden sm:block">|</span>
              <span>{author.date}</span>
              <span className="text-gray-300 hidden sm:block">|</span>
              <span>{author.readTime}</span>
            </div>
          </motion.header>

          {/* Hero image */}
          <motion.div
            className="mb-10 md:mb-16 aspect-[4/3] sm:aspect-[16/9] lg:aspect-[21/9] w-full overflow-hidden rounded-xl border border-gray-200"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease }}
          >
            <img src={mainImage} alt={title} className="w-full h-full object-cover" />
          </motion.div>

          {/* Body + sidebar */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">

            {/* Article content */}
            <motion.div
              className="lg:col-span-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15, ease }}
            >
              <article
                className="article-content"
                dangerouslySetInnerHTML={{ __html: content }}
              />

              {/* Read next */}
              {recentPosts.length > 0 && (
                <div className="mt-16 pt-10 border-t border-gray-200">
                  <p className="text-xs tracking-[0.25em] uppercase text-gray-400 font-medium mb-8">
                    Read Next
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {recentPosts.map((post) => (
                      <Link key={post.slug} href={post.slug} className="group block">
                        <div className="aspect-[16/9] rounded-xl overflow-hidden mb-4 border border-gray-200">
                          <img
                            src={post.image}
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                        <p className="text-xs text-gray-400 mb-1.5">{post.date}</p>
                        <h4 className="text-base font-semibold text-viracis-navy group-hover:text-viracis-cyan transition-colors leading-snug">
                          {post.title}
                        </h4>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>

            {/* Sidebar */}
            <aside className="lg:col-span-4 order-first lg:order-last">
              <div className="lg:sticky lg:top-28 space-y-6">

                {/* Table of contents */}
                {toc.length > 0 && (
                  <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
                    <p className="text-xs tracking-[0.2em] uppercase text-gray-400 font-medium mb-5 pb-4 border-b border-gray-200">
                      In this article
                    </p>
                    <nav className="space-y-3">
                      {toc.map((item, i) => (
                        <a
                          key={item.id}
                          href={`#${item.id}`}
                          className="flex items-start gap-3 text-sm text-gray-500 hover:text-viracis-navy transition-colors duration-200 group"
                        >
                          <span className="text-xs text-gray-300 group-hover:text-viracis-cyan font-medium shrink-0 mt-0.5">
                            0{i + 1}
                          </span>
                          {item.title}
                        </a>
                      ))}
                    </nav>
                  </div>
                )}

                {/* CTA */}
                <div className="bg-viracis-navy rounded-xl p-6 text-white">
                  <h4 className="text-base font-semibold text-white mb-2">
                    Ready to get started?
                  </h4>
                  <p className="text-sm text-white/60 leading-relaxed mb-6">
                    Tell us about your business and we will figure out the best way technology can help you grow.
                  </p>
                  <Link
                    href="/contact"
                    className="block text-center py-3 px-5 bg-white text-viracis-navy text-sm font-semibold hover:bg-gray-100 transition-colors duration-200 rounded-lg"
                  >
                    Get in touch
                  </Link>
                </div>

              </div>
            </aside>
          </div>

        </div>
      </div>

      <LandingFooter />
    </main>
  );
}
