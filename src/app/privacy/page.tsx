import { Metadata } from "next";
import LandingNavbar from "@/components/LandingNavbar";
import SubPageHero from "@/components/SubPageHero";
import LandingFooter from "@/components/LandingFooter";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for Viracis LLC.",
};

export default function PrivacyPage() {
  return (
    <main className="bg-white">
      <LandingNavbar />
      <SubPageHero
        category="Legal"
        title="Privacy Policy"
        subtitle={`Last updated: ${new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}`}
      />

      <section className="py-24 bg-white border-b border-gray-200">
        <div className="max-w-[800px] mx-auto px-8 text-gray-600 leading-relaxed space-y-8">
          <div>
            <h2 className="text-2xl font-semibold text-viracis-navy mb-4">1. Information We Collect</h2>
            <p>
              We collect information from you when you register on our site, place an order, subscribe to our newsletter, respond to a survey, or fill out a form. When ordering or registering on our site, as appropriate, you may be asked to enter your: name, e-mail address, mailing address, phone number or credit card information.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-viracis-navy mb-4">2. How We Use Your Information</h2>
            <p>
              Any of the information we collect from you may be used in one of the following ways: to personalize your experience, to improve our website, to improve customer service, to process transactions, or to send periodic emails.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-viracis-navy mb-4">3. Information Protection</h2>
            <p>
              We implement a variety of security measures to maintain the safety of your personal information when you place an order or enter, submit, or access your personal information.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-viracis-navy mb-4">4. Cookies</h2>
            <p>
              Yes. Cookies are small files that a site or its service provider transfers to your computer's hard drive through your Web browser (if you allow) that enables the sites or service providers systems to recognize your browser and capture and remember certain information.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-viracis-navy mb-4">5. Third-Party Disclosure</h2>
            <p>
              We do not sell, trade, or otherwise transfer to outside parties your personally identifiable information. This does not include trusted third parties who assist us in operating our website, conducting our business, or servicing you, so long as those parties agree to keep this information confidential.
            </p>
          </div>
          
          <div>
            <h2 className="text-2xl font-semibold text-viracis-navy mb-4">6. Contacting Us</h2>
            <p>
              If there are any questions regarding this privacy policy you may contact us using the information provided on our contact page or at hello@viracis.com.
            </p>
          </div>
        </div>
      </section>

      <LandingFooter />
    </main>
  );
}
