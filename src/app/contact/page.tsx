"use client";

import LandingNavbar from "@/components/LandingNavbar";
import LandingContact from "@/components/LandingContact";
import LandingFooter from "@/components/LandingFooter";

export default function ContactPage() {
  return (
    <main className="bg-white">
      <LandingNavbar />
      <LandingContact />
      <LandingFooter />
    </main>
  );
}
