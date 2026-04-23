"use client";

import LandingNavbar from "@/components/LandingNavbar";
import LandingFooter from "@/components/LandingFooter";
import LandingBlog from "@/components/LandingBlog";

export default function BlogPage() {
  return (
    <main className="bg-white">
      <LandingNavbar />
      
      <div className="relative z-20 pt-20">
        <LandingBlog />
      </div>

      <LandingFooter />
    </main>
  );
}
