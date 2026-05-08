import { Metadata } from "next";
import LandingNavbar from "@/components/LandingNavbar";
import SubPageHero from "@/components/SubPageHero";
import LandingFooter from "@/components/LandingFooter";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms of Service for Viracis LLC.",
};

export default function TermsPage() {
  return (
    <main className="bg-white">
      <LandingNavbar />
      <SubPageHero
        category="Legal"
        title="Terms of Service"
        subtitle={`Last updated: ${new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}`}
      />

      <section className="py-24 bg-white border-b border-gray-200">
        <div className="max-w-[800px] mx-auto px-8 text-gray-600 leading-relaxed space-y-8">
          <div>
            <h2 className="text-2xl font-semibold text-viracis-navy mb-4">1. Acceptance of Terms</h2>
            <p>
              By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement. In addition, when using these particular services, you shall be subject to any posted guidelines or rules applicable to such services.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-viracis-navy mb-4">2. Description of Service</h2>
            <p>
              Viracis LLC provides technology consulting, software engineering, and related services. You understand and agree that the service is provided "AS-IS" and that Viracis LLC assumes no responsibility for the timeliness, deletion, mis-delivery, or failure to store any user communications or personalization settings.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-viracis-navy mb-4">3. Modification of Terms</h2>
            <p>
              Viracis LLC reserves the right to change these conditions from time to time as it sees fit and your continued use of the site will signify your acceptance of any adjustment to these terms.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-viracis-navy mb-4">4. Privacy Policy</h2>
            <p>
              Our Privacy Policy, which sets out how we will use your information, can be found at our Privacy Policy page. By using this Website, you consent to the processing described therein and warrant that all data provided by you is accurate.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-viracis-navy mb-4">5. Governing Law</h2>
            <p>
              These terms and conditions are governed by and construed in accordance with the laws of the Commonwealth of Virginia and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.
            </p>
          </div>
        </div>
      </section>

      <LandingFooter />
    </main>
  );
}
