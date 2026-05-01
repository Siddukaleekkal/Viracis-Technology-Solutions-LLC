"use client";

import ArticleTemplate from "@/components/ArticleTemplate";

export default function InfrastructureIntelligencePage() {
  const post = {
    category: "Engineering",
    title: "Infrastructure for Intelligence: How We Built an AI Lead Scorer (And Why It Matters)",
    author: {
      name: "Viracis Engineering",
      avatar: "/viracis-team-logo.png",
      date: "May 01, 2026",
      readTime: "6 min read"
    },
    mainImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=2400",
    toc: [
      { id: "the-noise-problem", title: "The Signal vs. Noise Problem" },
      { id: "engineering-the-score", title: "Engineering the Score" },
      { id: "data-enrichment", title: "The Power of Enrichment" },
      { id: "business-scaling", title: "Scaling Your Business" }
    ],
    content: `
      <h2 id="the-noise-problem">The Signal vs. Noise Problem</h2>
      <p>In the world of B2B outreach, the biggest bottleneck isn't sending emails or making calls—it's deciding who to contact in the first place. If you have a list of 1,000 businesses, calling them alphabetically is a recipe for burnout. Some of those businesses are desperate for your service, while others will never need it.</p>
      <p>Scaling a business requires moving from "brute force" to "intelligent targeting." That's why we built our internal AI Lead Scorer.</p>

      <h2 id="engineering-the-score">Engineering the Score: Turning Data into Decisions</h2>
      <p>A Lead Scorer is a piece of software that takes raw business data and outputs a numerical "rank" of how likely that lead is to convert. Instead of a human guessing, we use an algorithm to quantify intent.</p>
      <p>For our commercial service clients, we look at specific "triggers" in the data. For example, in our power washing vertical, we've engineered a scoring engine that looks at business categories:</p>
      <ul>
        <li><strong>High-Intensity Sites (Score 50+):</strong> Fuel stations and car washes. These sites generate heavy grease and oil, meaning they need frequent, specialized cleaning. They are "high-intent" leads.</li>
        <li><strong>Food Service (Score 30-40):</strong> Restaurants and fast-food outlets. Dumpster pads and patios are high-maintenance areas.</li>
        <li><strong>General Commercial (Score 10-20):</strong> Office buildings or retail stores that might only need seasonal maintenance.</li>
      </ul>
      <p>By automating this logic, we filter out the "noise" before a human ever sees the list.</p>

      <h2 id="data-enrichment">The Power of Data Enrichment</h2>
      <p>A score is only as good as the data feeding it. This is where the "Engineering" part of AI comes in. Our pipeline doesn't just look at a name and a phone number. It performs automated <strong>Data Enrichment</strong>.</p>
      <p>Does the business have a website? Is their Google profile updated? Do they have a high volume of foot traffic? If a business has a professional website but "dirty" physical infrastructure (like a grease-heavy fast-food patio), our AI identifies a "Visual Gap"—a business that cares about their image but has a physical problem they need solved. That is a goldmine lead.</p>

      <blockquote>
        "Scaling isn't about working harder; it's about making sure every minute of your team's work is spent on the highest-probability outcome."
      </blockquote>

      <h2 id="business-scaling">Scaling Your Business with AI Infrastructure</h2>
      <p>How does this help a business scale? It comes down to <strong>Opportunity Cost</strong>. If your sales team spends 80% of their day talking to people who will never buy, you are effectively paying them to fail. When you implement a scoring infrastructure, you reverse that ratio.</p>
      <p>By only focusing on the top 20% of leads—the ones our engine identifies as high-intent—our clients have seen:</p>
      <ol>
        <li><strong>Reduced Burnout:</strong> Sales teams only talk to people who actually have the problem they solve.</li>
        <li><strong>Higher Conversion Rates:</strong> Every conversation starts with a specific "Trigger Reason" identified by the AI.</li>
        <li><strong>Faster Growth:</strong> You can process 10x more leads because the software is doing the heavy lifting of sorting and qualification.</li>
      </ol>

      <p>At Viracis, we don't just "use AI"—we build the infrastructure that turns AI into a business asset. If you're ready to stop guessing and start engineering your growth, let's talk.</p>
    `,
    recentPosts: [
      {
        title: "Beyond SEO: The New Rules of Search",
        date: "April 29, 2026",
        image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&q=80&w=800",
        slug: "/blog/beyond-seo-new-rules-of-search"
      },
      {
        title: "5 Ways AI Can Save Your Business 10+ Hours a Week",
        date: "April 22, 2026",
        image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=800",
        slug: "/blog/ai-for-small-business-operations"
      }
    ]
  };

  return (
    <ArticleTemplate 
      {...post}
      backLink="/blog"
      backText="Back to Insights"
    />
  );
}
