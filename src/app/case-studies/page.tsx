"use client";

import LandingNavbar from "@/components/LandingNavbar";
import LandingFooter from "@/components/LandingFooter";
import LandingCaseStudies from "@/components/LandingCaseStudies";

export default function CaseStudiesPage() {
  return (
    <main className="bg-white">
      <LandingNavbar />
      
      <div className="relative z-20 pt-20">
        <LandingCaseStudies />
      </div>

<LandingFooter />
    </main>
  );
}
