"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const ease = [0.16, 1, 0.3, 1] as const;

const posts = [
  {
    title: "Beyond SEO: The Plain English Guide to the New Rules of Search",
    slug: "beyond-seo-new-rules-of-search",
    date: "April 29, 2026",
    excerpt: "SEO alone will not cut it anymore. Here is a plain English breakdown of GEO, AIO, AEO, and SXO, the four strategies your business needs to stay visible in the age of AI search.",
    category: "Marketing",
    image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&q=80&w=2400"
  },
  {
    title: "5 Ways AI Can Save Your Small Business 10+ Hours a Week",
    slug: "ai-for-small-business-operations",
    date: "April 22, 2026",
    excerpt: "Practical ways small business owners are using AI right now to handle customer responses, follow-ups, content, and scheduling.",
    category: "Small Business",
    image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=2400"
  },
  {
    title: "Why Every Local Business Needs a CRM (Even If You Only Have 50 Customers)",
    slug: "data-growth-for-local-business",
    date: "April 15, 2026",
    excerpt: "How a simple customer management system can stop leads from slipping through the cracks and turn one-time buyers into repeat clients.",
    category: "Strategy",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=2400"
  },
  {
    title: "What Your Website Should Actually Do For You (Besides Look Nice)",
    slug: "serverless-for-small-business",
    date: "April 08, 2026",
    excerpt: "Your website should be generating leads and booking appointments while you sleep. Here is how to make that happen.",
    category: "Growth",
    image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?auto=format&fit=crop&q=80&w=2400"
  },
];

interface LandingBlogProps {
  isFeaturedOnly?: boolean;
}

const LandingBlog = ({ isFeaturedOnly = false }: LandingBlogProps) => {
  return (
    <section id="blog" className="py-24 bg-gray-50 border-t border-gray-200">
      <div className="w-full px-4">
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease }}
        >
          <div className="flex items-center gap-5 mb-5">
            <span className="text-xs tracking-[0.25em] uppercase text-gray-400 font-medium whitespace-nowrap">
              Insights
            </span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>
          <h2 className="text-4xl lg:text-5xl leading-[1.1] font-normal tracking-[-0.02em] text-viracis-navy">
            Thoughts on the future of technology delivery.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-8">
          {(isFeaturedOnly ? posts.slice(0, 3) : posts).map((post, i) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="block"
            >
              <motion.article
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: i * 0.12, ease }}
                className="group cursor-pointer"
              >
              <div className="aspect-[16/9] bg-gray-100 border border-gray-200 mb-8 overflow-hidden relative rounded-sm">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="flex items-center gap-4 mb-4">
                <span className="text-[10px] tracking-[0.2em] uppercase font-bold text-viracis-navy border border-viracis-navy/20 px-2 py-0.5">
                  {post.category}
                </span>
                <div className="w-1 h-1 rounded-full bg-gray-300" />
                <span className="text-xs text-gray-400 font-medium">{post.date}</span>
              </div>
              <h3 className="text-lg sm:text-2xl font-semibold text-viracis-navy tracking-tight mb-3 group-hover:underline underline-offset-4 decoration-viracis-navy/30">
                {post.title}
              </h3>
              <p className="text-base text-gray-600 leading-relaxed max-w-xl">
                {post.excerpt}
              </p>
            </motion.article>
          </Link>
        ))}
        </div>
        
        {isFeaturedOnly && (
          <div className="mt-16 text-center">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm font-semibold text-viracis-navy hover:gap-3 transition-all duration-200"
            >
              View all articles
              <span>→</span>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default LandingBlog;
