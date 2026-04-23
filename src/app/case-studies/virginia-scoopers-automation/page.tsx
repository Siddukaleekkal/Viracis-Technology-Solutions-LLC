"use client";

import ArticleTemplate from "@/components/ArticleTemplate";

export default function VirginiaScoopersCaseStudyPage() {
  const item = {
    category: "Success Stories",
    title: "Scaling Local Service Revenue Through Custom Sales Automation",
    author: {
      name: "Viracis Team",
      avatar: "/viracis-team-logo.png",
      date: "April 2026",
      readTime: "Project Timeline: 8 Weeks"
    },
    mainImage: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=2400",
    toc: [
      { id: "client", title: "The Client" },
      { id: "challenge", title: "The Challenge" },
      { id: "solution", title: "What We Built" },
      { id: "results", title: "The Results" }
    ],
    content: `
      <h2 id="client">The Client</h2>
      <p><strong>Virginia Scoopers</strong> is a premier pet waste management firm providing recurring removal services to residential and commercial properties throughout Central Virginia. As a volume-based service business, their profitability is directly tied to route density and field technician productivity. While their customer base was expanding, the underlying operational infrastructure was struggling to keep pace with the logistics of managing a growing fleet and a dispersed client list.</p>

      <h2 id="challenge">The Challenge</h2>
      <p>The primary bottleneck for Virginia Scoopers was the lack of centralized logistics. Their field operations were characterized by several critical inefficiencies:</p>
      <ul>
        <li><strong>Suboptimal Routing:</strong> Technicians were navigating between properties based on zip code groupings rather than optimized paths. This resulted in excessive "windshield time" and an estimated 15% to 20% loss in daily service capacity.</li>
        <li><strong>Friction in Sales Operations:</strong> The door-to-door sales team had no structured way to track territory coverage or lead status. Sales efforts were often redundant, and the lag between a successful sale and onboarding was causing customer churn before the first service even began.</li>
        <li><strong>Outdated Digital Identity:</strong> The legacy website was not mobile-responsive and lacked a modern conversion funnel. This forced potential clients to call for quotes rather than booking online, creating a significant barrier to entry for the modern consumer.</li>
        <li><strong>Manual Workforce Tracking:</strong> Managers had no real-time visibility into field progress, making it difficult to adjust schedules for new "same-day" requests or fleet maintenance issues.</li>
      </ul>

      <blockquote>
        "Our team was working harder than ever, but our margins were being eaten alive by fuel costs and inefficient travel. We needed a professional brain for our business operations."
        <br/><br/><strong>Dominic Kulay, Sales Associate at Virginia Scoopers</strong>
      </blockquote>

      <h2 id="solution">What We Built</h2>
      <p>Viracis implemented a dual-pronged strategy focused on front-end rebranding and back-end logistics automation, centered around the Zoho ecosystem.</p>

      <h3>Digital Rebranding & Custom Website</h3>
      <p>We executed a complete brand overhaul, moving Virginia Scoopers from a "neighborhood service" aesthetic to an enterprise-grade digital identity. The new website features a custom-built pricing calculator and a 3-step onboarding funnel that allows clients to sign up for recurring service in under 90 seconds. Web-based lead conversion improved by 180% within the first month.</p>

      <h3>Zoho Route IQ Integration</h3>
      <p>Viracis developed a custom field application using Zoho Route IQ to manage both sales and service logistics. For the sales team, we built a territory management layer that tracks door-to-door progress, prevents lead duplication, and offers real-time lead status updates. For the technicians, the system automatically calculates the most efficient daily route based on live traffic data and property proximity.</p>

      <h3>Automated Scheduling & Dispatch</h3>
      <p>We tied the CRM data directly to the route optimization engine. When a new customer signs up online, they are automatically assigned to the most efficient route for their area, and a technician is notified via the mobile application. This eliminated 14+ hours per week that the management team previously spent on manual route planning.</p>

      <h3>Enterprise Fleet Visibility</h3>
      <p>A custom management dashboard was created to provide real-time visibility into fleet location and job completion status. This allows for dynamic adjustments, such as reassigning a "missed" service to a nearby technician with spare capacity, ensuring a 99.8% service completion rate.</p>

      <h2 id="results">The Results</h2>
      <p>The 8-week transformation delivered a significant increase in operational leverage and profitability for Virginia Scoopers:</p>
      <ul>
        <li><strong>35% increase in daily route density.</strong> Technicians are now completing approximately one-third more stops per shift without increasing their working hours.</li>
        <li><strong>22% reduction in monthly fuel expenditure.</strong> Highly optimized routing significantly decreased the total mileage driven across the entire fleet.</li>
        <li><strong>14 hours reclaimed per week</strong> for the management team through the elimination of manual scheduling and route coordination tasks.</li>
        <li><strong>180% increase in web-based lead conversion</strong> attributed to the new mobile-optimized onboarding funnel and professional branding.</li>
        <li><strong>$8,500+ in estimated monthly savings</strong> through a combination of reduced fuel costs and deferred administrative hiring.</li>
        <li><strong>Zero manual entry</strong> from sale to service. The system operates as a unified data stream, reducing clerical errors by 95%.</li>
      </ul>

      <p>Virginia Scoopers is now positioned as the most technologically advanced pet waste firm in the region. By automating the logistical complexities of field service, they have turned operational efficiency into a primary competitive advantage, allowing the founder to focus on market expansion rather than daily dispatch.</p>
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
