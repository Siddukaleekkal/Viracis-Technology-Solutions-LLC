import LandingNavbar from "@/components/LandingNavbar";
import LandingHero from "@/components/LandingHero";
import LandingAbout from "@/components/LandingAbout";
import LandingServices from "@/components/LandingServices";
import LandingPartners from "@/components/LandingPartners";
import LandingBlog from "@/components/LandingBlog";
import LandingCaseStudies from "@/components/LandingCaseStudies";
import LandingFooter from "@/components/LandingFooter";

export default function Home() {
  return (
    <main className="bg-white">
      <LandingNavbar />
      <LandingHero />
      <LandingAbout />
      <LandingPartners />
      <LandingServices />
      <LandingBlog isFeaturedOnly={true} />
      <LandingCaseStudies />
      <LandingFooter />
    </main>
  );
}
