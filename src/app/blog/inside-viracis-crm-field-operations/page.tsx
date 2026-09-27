"use client";

import ArticleTemplate from "@/components/ArticleTemplate";

export default function InsideViracisCRMPage() {
  const post = {
    category: "Product",
    title: "Inside Viracis CRM: The All in One Engine for Door to Door Sales, Map Visualization, and Fleet Scheduling",
    author: {
      name: "Viracis Team",
      avatar: "/favicon.png",
      date: "September 26, 2026",
      readTime: "7 min read"
    },
    mainImage: "/images/blog/viracis-crm-map-operations-full.png",
    imageContainerClassName: "mb-10 md:mb-16 w-full overflow-hidden rounded-xl border border-gray-200 shadow-2xl bg-white",
    imageClassName: "w-full h-auto block",
    toc: [
      { id: "the-field-problem", title: "The Fragmented Field Software Problem" },
      { id: "map-visualization", title: "SalesRabbit Style Map Visualization & Pin Filtering" },
      { id: "multi-truck-calendar", title: "Multi Truck Fleet Tracking & Color Coded Calendar" },
      { id: "google-calendar-sync", title: "Two Way Google Calendar Integration" },
      { id: "sms-and-invoicing", title: "Direct SMS Messaging & Built In Invoicing" },
      { id: "command-dashboard", title: "The All in One Command Dashboard" },
      { id: "door-to-door-advantage", title: "Why It Is the Ultimate Tool for Door to Door Companies" },
      { id: "political-campaigns", title: "Coming Soon: Viracis CRM for Political Campaigns" }
    ],
    content: `
      <h2 id="the-field-problem">The Fragmented Field Software Problem</h2>
      <p>If you run a door to door sales organization or a field service company, whether for pressure washing, roofing, solar, pest control, or home exterior maintenance, you already know the frustration of the modern software stack.</p>
      <p>Until today, running field operations forced companies into an expensive juggling act. You paid for SalesRabbit or Spotio for field canvassing and territory mapping. You paid for Jobber or Housecall Pro to manage appointments. You subscribed to an SMS platform like Podium or Twilio for client text alerts, QuickBooks for generating invoices, and tried to stitch everything together with disjointed Google Calendars.</p>
      <p>The result? Staggering monthly software subscriptions, data silos, lost leads, and dispatchers tearing their hair out switching between five different tabs. We built Viracis CRM to eliminate that chaos once and for all, unifying your customer database, route mapping, fleet calendar, two way SMS, and billing into a single, cohesive command platform.</p>

      <h2 id="map-visualization">SalesRabbit Style Map Visualization & Pin Filtering</h2>
      <p>At the center of Viracis CRM is our proprietary interactive map visualization. Just like dedicated canvassing software such as SalesRabbit, Viracis CRM allows field reps and sales managers to visualize their entire customer and prospect base geographically in real time.</p>

      <p>What makes our map truly powerful is the lifecycle pin filtering. With a single click, your managers and reps can filter leads and clients across three key stages:</p>
      <ul>
        <li>Quoted: Pinpoints homeowners or commercial properties that have received an estimate but have not yet booked. Reps working the neighborhood can follow up in person or trigger automatic check in messages.</li>
        <li>Scheduled: Displays all active jobs confirmed on the calendar. Drivers and technicians can visualize their daily service clusters and minimize windshield time.</li>
        <li>Completed: Highlights past clients whose service is finished. This enables instant geographic retargeting for seasonal maintenance, neighbor referral blitzes, and review generation campaigns.</li>
      </ul>
      <p>No more blind canvassing or guessing which house on the street was already pitched. Your field team has full situational awareness in the palm of their hand.</p>

      <h2 id="multi-truck-calendar">Multi Truck Fleet Tracking & Color Coded Calendar</h2>
      <p>Coordinating multiple vehicles on the road is one of the quickest ways for operations to break down. When dispatchers cannot see where every truck is scheduled, routes overlap, fuel gets wasted, and double bookings happen.</p>
      <p>Viracis CRM solves this with a built in, multi truck color coded dispatch calendar:</p>
      <ul>
        <li>Dedicated Fleet Lanes: Every truck or service crew in your operation receives its own distinct color identity on the calendar.</li>
        <li>Instant Visual Balance: Dispatchers can view all trucks side by side across daily, weekly, or monthly matrices. Gaps in a crew schedule stand out immediately, allowing your office to route newly quoted jobs to the nearest truck in seconds.</li>
        <li>Drag and Drop Reassignment: When weather hits or a technician is delayed, simply drag the appointment from Truck 1 to Truck 2 to rebalance the workload without interrupting customer communications.</li>
      </ul>

      <h2 id="google-calendar-sync">Two Way Google Calendar Integration</h2>
      <p>While Viracis CRM features its own lightning fast internal scheduling engine, we know technicians and sales reps rely on the tools already built into their phones. That is why Viracis CRM features seamless two way synchronization with Google Calendar.</p>
      <p>When a dispatcher schedules an appointment or a rep books a demo in Viracis CRM, it reflects instantly on the technician native Google Calendar on their iPhone or Android device. If a rep updates an appointment timing in Google Calendar while on the road, the Viracis CRM dispatch matrix updates simultaneously. No manual double entry. No miscommunications.</p>

      <h2 id="sms-and-invoicing">Direct SMS Messaging & Built In Invoicing</h2>
      <p>Customer communication and cash flow are the lifeblood of any growing business. In Viracis CRM, neither requires leaving the platform:</p>
      <ul>
        <li>Two Way SMS from Your Business Line: Text clients directly through the CRM dashboard. Send automated appointment reminders, dispatch notifications ("Your technician Mike is on the way!"), and answer customer inquiries in real time with a 98% open rate.</li>
        <li>1 Click Integrated Invoicing: Convert accepted estimates into branded invoices in seconds. Send invoices straight to the client via SMS or email, collect payment instantly through credit card, Apple Pay, or bank transfer (ACH), and let the system automatically send polite payment reminders for overdue balances.</li>
      </ul>

      <h2 id="command-dashboard">The All in One Command Dashboard</h2>
      <p>As an owner or general manager, you should not have to pull three reports to understand how your business performed today. Viracis CRM features a centralized executive dashboard that displays your complete operational picture in real time:</p>
      <ul>
        <li>Total revenue collected and pending accounts receivable.</li>
        <li>Active jobs scheduled today across all field trucks.</li>
        <li>Door to door conversion rates by territory and sales representative.</li>
        <li>Customer lifetime value (LTV) and repeat service retention metrics.</li>
      </ul>

      <h2 id="door-to-door-advantage">Why It Is the Ultimate Tool for Door to Door Companies</h2>
      <p>Door to door (D2D) companies operate under tight margins and rapid sales cycles. A rep who has to open three apps at a homeowner front door will lose that sale. With Viracis CRM:</p>
      <ol>
        <li>The rep pulls up the neighborhood map to identify unknocked houses and past quoted prospects.</li>
        <li>At the door, they deliver the pitch and create an on the spot estimate directly in the CRM.</li>
        <li>When the customer says yes, the rep checks the multi truck calendar to find an open time slot, books the appointment with automatic Google Calendar sync, and sends a confirmation text message before stepping off the porch.</li>
        <li>When the job wraps up, the invoice and payment receipt are automatically dispatched via SMS.</li>
      </ol>
      <p>That level of speed and professionalism is unmatched in field sales today.</p>

      <blockquote>
        "Viracis CRM replaces five fragmented software subscriptions with one cohesive command platform designed for the realities of field execution."
      </blockquote>

      <h2 id="political-campaigns">Coming Soon: Viracis CRM for Political Campaigns & Turf Management</h2>
      <p>The exact same operational challenges that field sales teams face, including territory management, door knocking, volunteer tracking, and real time data collection, are the biggest bottlenecks in modern political campaigns.</p>
      <p>We are excited to announce that we are currently engineering a specialized edition of Viracis CRM tailored specifically for political campaigns. Built for campaign managers, field directors, and canvassing operations, this version will include:</p>
      <ul>
        <li>Intelligent Turf Cutting: Easily carve precincts, neighborhoods, and districts into optimized walk lists for volunteers and paid canvassers.</li>
        <li>Live Canvasser & Knocker Tracking: Monitor door knockers in real time on the campaign map, verifying doors visited, knock speed, and turf completion rates.</li>
        <li>Instant Voter Sentiment Logging: Canvassers can record voter support levels, issue priorities, yard sign requests, and vote by mail status with one tap at the door.</li>
        <li>Election Day GOTV Command: Live heatmaps of turnout progress so campaign managers can surge volunteers into underperforming precincts before the polls close.</li>
      </ul>
      <p>Whether you are running a multi truck home service fleet or managing a high stakes grassroots campaign, Viracis is building the software infrastructure that turns boots on the ground effort into predictable victory.</p>
      <p>Want to see Viracis CRM in action for your team? Reach out to us today for a live walkthrough tailored to your operations.</p>
    `,
    recentPosts: [
      {
        title: "Optimizing Remote Teams with AI Collaboration Tools",
        date: "July 20, 2026",
        image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80&w=800",
        slug: "/blog/optimizing-remote-teams-ai-tools"
      },
      {
        title: "Why Every Business Needs a CRM",
        date: "April 15, 2026",
        image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800",
        slug: "/blog/data-growth-for-local-business"
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
