"use client";

import ArticleTemplate from "@/components/ArticleTemplate";

export default function WizardWashCaseStudyPage() {
  const item = {
    category: "Success Stories",
    title: "From Manual Chaos to 42% More Bookings in 60 Days",
    author: {
      name: "Viracis Team",
      avatar: "/viracis-team-logo.png",
      date: "March 2026",
      readTime: "Project Timeline: 6 Weeks"
    },
    mainImage: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=2400",
    toc: [
      { id: "client", title: "The Client" },
      { id: "challenge", title: "The Challenge" },
      { id: "solution", title: "What We Built" },
      { id: "results", title: "The Results" }
    ],
    content: `
      <h2 id="client">The Client</h2>
      <p><strong>Wizard Wash</strong> is a Virginia-based commercial and residential power washing company serving the greater Richmond metro area. Despite consistent year-over-year revenue growth and a strong referral pipeline, the business was reaching an operational ceiling. The founder was allocating a disproportionate amount of time to administrative overhead, and the absence of scalable digital infrastructure was resulting in lost leads, delayed revenue capture, and inefficient resource utilization.</p>

      <h2 id="challenge">The Challenge</h2>
      <p>When Wizard Wash engaged Viracis, their day-to-day operations were almost entirely manual. A comprehensive audit identified the following bottlenecks:</p>
      <ul>
        <li><strong>Scheduling inefficiency:</strong> All appointments were managed via text messages and a physical calendar. This resulted in frequent double-bookings and an estimated 3 to 5 hours of lost productivity per week dedicated solely to coordination.</li>
        <li><strong>Invoicing latency:</strong> Invoices were generated manually in a Word document post-service, often with a 4 to 7 day delay. This created significant cash flow gaps and extended the average accounts receivable cycle to 14+ days.</li>
        <li><strong>Zero digital presence:</strong> Wizard Wash had no website, no online booking system, and no digital lead capture mechanism. Internal estimates indicated that approximately 60% of inbound leads were being lost due to the absence of a structured intake funnel.</li>
        <li><strong>No CRM or customer data layer:</strong> There was no centralized database of client records, service history, or automated follow-up triggers. Repeat business was entirely dependent on organic recall rather than systematic outreach.</li>
      </ul>

      <blockquote>
        "I was spending half my day on the phone and the other half trying to remember who I needed to invoice. I knew I was leaving money on the table but I didn't know where to start fixing it."
        <br/><br/><strong>Omar Elshami, CEO of Wizard Wash</strong>
      </blockquote>

      <h2 id="solution">What We Built</h2>
      <p>Viracis designed and deployed a complete digital operations stack for Wizard Wash over a 6-week implementation sprint. Every technology decision was optimized for maximum operational impact while maintaining a monthly SaaS overhead of under $50.</p>

      <h3>Custom Website and Domain</h3>
      <p>A fully responsive, SEO-optimized website was developed from scratch, featuring dedicated service pages, a structured quote request form, and keyword targeting for "power washing" queries in the Richmond DMA. Within 30 days of launch, organic search accounted for 38% of all new inbound lead volume.</p>

      <h3>Zoho CRM Implementation</h3>
      <p>A full CRM pipeline was configured inside Zoho, providing Wizard Wash with a unified dashboard to manage every lead from initial inquiry through job completion. Each contact record stores service history, site photos, internal notes, and configurable follow-up dates.</p>

      <h3>Scheduler Automation</h3>
      <p>Zoho Bookings was integrated directly with the website, enabling clients to self-schedule appointments based on real-time crew availability. Automated SMS and email confirmations are dispatched immediately upon booking, and the owner receives a consolidated daily briefing of the next day's service queue every evening at 7:00 PM.</p>

      <h3>Invoice Automation</h3>
      <p>Upon marking a job as "Complete" in the CRM, an invoice is auto-generated and delivered to the client via email within 60 seconds. Each invoice includes an embedded one-tap payment link. Automated overdue reminders are triggered at the 3-day, 7-day, and 14-day marks, eliminating the need for manual collections outreach.</p>

      <h3>Customer Care Workflows</h3>
      <p>Automated lifecycle sequences were deployed across key touchpoints: a thank-you email at 24 hours post-service, a Google review request at 72 hours, and a seasonal re-engagement campaign targeting dormant clients who have not booked in 90+ days.</p>

      <h2 id="results">The Results</h2>
      <p>Within 60 days of full deployment, the operational transformation produced measurable improvements across every tracked KPI:</p>
      <ul>
        <li><strong>12+ hours reclaimed per week</strong> across scheduling, invoicing, and client follow-up workflows. This capacity was reinvested directly into additional service jobs.</li>
        <li><strong>Invoice turnaround reduced from 5 days to under 60 seconds.</strong> Average time-to-payment improved from 14 days to 3.2 days, significantly improving cash flow predictability.</li>
        <li><strong>42% increase in monthly bookings</strong> attributed to the new website, SEO presence, and self-service scheduling capability.</li>
        <li><strong>28% repeat booking rate</strong> generated through the automated re-engagement campaigns, up from a near-zero baseline when no follow-up system was in place.</li>
        <li><strong>Zero double-bookings</strong> recorded since the automated scheduler replaced the legacy paper-based system.</li>
        <li><strong>$0 in additional FTE costs.</strong> The entire system operates autonomously with no additional staff required.</li>
      </ul>

      <p>Wizard Wash transitioned from a manually operated service business constrained by administrative overhead to a digitally enabled, process-driven operation. The technology layer did not replace the core service; it systematically removed every friction point that was preventing the business from scaling.</p>
    `,
    recentPosts: []
  };

  return (
    <ArticleTemplate 
      {...item}
      backLink="/case-studies"
      backText="Back to Portfolio"
    />
  );
}
