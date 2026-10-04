"use client";

import LandingNavbar from "@/components/LandingNavbar";
import SubPageHero from "@/components/SubPageHero";
import LandingBlog from "@/components/LandingBlog";
import LandingBottomCta from "@/components/LandingBottomCta";
import LandingFooter from "@/components/LandingFooter";

export default function BlogPage() {
  return (
    <main className="bg-white">
      <LandingNavbar />
      
      <SubPageHero
        size="compact"
        category="Field Intelligence & Insights"
        title="Direct Sales & Field Operations Insights"
        subtitle="Tactical frameworks, engineering breakdowns, and operational strategies for scaling high-velocity door-to-door sales teams."
      />

      <LandingBlog hideHeader={true} />

      <LandingBottomCta />

      <LandingFooter />
    </main>
  );
}
