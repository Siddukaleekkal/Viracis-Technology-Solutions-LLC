import LandingNavbar from "@/components/LandingNavbar";
import LandingHero from "@/components/LandingHero";
import LandingStatement from "@/components/LandingStatement";
import LandingFeaturesShowcase from "@/components/LandingFeaturesShowcase";
import LandingRoiCalculator from "@/components/LandingRoiCalculator";
import LandingBlog from "@/components/LandingBlog";
import LandingBottomCta from "@/components/LandingBottomCta";

import LandingFooter from "@/components/LandingFooter";

export default function Home() {
  return (
    <main className="bg-white">
      <LandingNavbar />
      <LandingHero />
      <LandingStatement />
      <LandingFeaturesShowcase />
      <LandingRoiCalculator />
      <LandingBlog isFeaturedOnly={true} />
      <LandingBottomCta />

      <LandingFooter />
    </main>
  );
}
