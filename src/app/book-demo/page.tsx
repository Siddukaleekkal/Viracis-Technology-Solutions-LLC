"use client";

import LandingNavbar from "@/components/LandingNavbar";
import LandingContact from "@/components/LandingContact";

export default function BookDemoPage() {
  return (
    <main className="min-h-screen bg-white flex flex-col">
      <LandingNavbar logoOnly />
      <LandingContact />
    </main>
  );
}
