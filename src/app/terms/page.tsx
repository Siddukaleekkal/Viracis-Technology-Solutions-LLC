import { Metadata } from "next";
import LandingNavbar from "@/components/LandingNavbar";
import SubPageHero from "@/components/SubPageHero";
import LandingFooter from "@/components/LandingFooter";

export const metadata: Metadata = {
  title: "Terms of Service | Viracis",
  description: "Comprehensive Terms of Service and Master Services Agreement for Viracis LLC.",
};

export default function TermsPage() {
  return (
    <main className="bg-white">
      <LandingNavbar />
      <SubPageHero
        category="Legal & Compliance"
        title="Terms of Service"
        subtitle={`Last updated: ${new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}`}
      />

      <section className="py-24 bg-white border-b border-gray-200">
        <div className="max-w-[1200px] mx-auto px-8 text-gray-600 leading-relaxed space-y-12">
          
          <div className="prose prose-lg prose-blue max-w-none">
            <p className="text-xl text-gray-800 mb-8">
              These Terms of Service ("Terms") constitute a legally binding agreement made between you, whether personally or on behalf of an entity ("you") and Viracis LLC ("Company", "we", "us", or "our"), concerning your access to and use of the viracis.com website as well as any other media form, media channel, mobile website or mobile application related, linked, or otherwise connected thereto (collectively, the "Site").
            </p>

            <h2 className="text-2xl font-bold text-viracis-navy mb-4 border-b pb-2">1. Agreement to Terms</h2>
            <p>You agree that by accessing the Site, you have read, understood, and agree to be bound by all of these Terms of Service. If you do not agree with all of these terms, then you are expressly prohibited from using the Site and you must discontinue use immediately.</p>
            <p className="mt-4">Supplemental terms and conditions or documents that may be posted on the Site from time to time are hereby expressly incorporated herein by reference. We reserve the right, in our sole discretion, to make changes or modifications to these Terms of Service at any time and for any reason. We will alert you about any changes by updating the "Last updated" date of these Terms of Service, and you waive any right to receive specific notice of each such change.</p>

            <h2 className="text-2xl font-bold text-viracis-navy mt-12 mb-4 border-b pb-2">2. Intellectual Property Rights</h2>
            <p>Unless otherwise indicated, the Site and our consulting methodologies, software, and services are our proprietary property and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the Site (collectively, the "Content") and the trademarks, service marks, and logos contained therein (the "Marks") are owned or controlled by us or licensed to us, and are protected by copyright and trademark laws and various other intellectual property rights and unfair competition laws of the United States, international copyright laws, and international conventions.</p>
            <p className="mt-4">The Content and the Marks are provided on the Site "AS IS" for your information and personal use only. Except as expressly provided in these Terms of Service, no part of the Site and no Content or Marks may be copied, reproduced, aggregated, republished, uploaded, posted, publicly displayed, encoded, translated, transmitted, distributed, sold, licensed, or otherwise exploited for any commercial purpose whatsoever, without our express prior written permission.</p>

            <h2 className="text-2xl font-bold text-viracis-navy mt-12 mb-4 border-b pb-2">3. User Representations</h2>
            <p>By using the Site, you represent and warrant that:</p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>All registration information you submit will be true, accurate, current, and complete.</li>
              <li>You will maintain the accuracy of such information and promptly update such registration information as necessary.</li>
              <li>You have the legal capacity and you agree to comply with these Terms of Service.</li>
              <li>You are not a minor in the jurisdiction in which you reside.</li>
              <li>You will not access the Site through automated or non-human means, whether through a bot, script or otherwise.</li>
              <li>You will not use the Site for any illegal or unauthorized purpose.</li>
              <li>Your use of the Site will not violate any applicable law or regulation.</li>
            </ul>

            <h2 className="text-2xl font-bold text-viracis-navy mt-12 mb-4 border-b pb-2">4. Prohibited Activities</h2>
            <p>You may not access or use the Site for any purpose other than that for which we make the Site available. The Site may not be used in connection with any commercial endeavors except those that are specifically endorsed or approved by us.</p>
            <p className="mt-4">As a user of the Site, you agree not to:</p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>Systematically retrieve data or other content from the Site to create or compile, directly or indirectly, a collection, compilation, database, or directory without written permission from us.</li>
              <li>Trick, defraud, or mislead us and other users, especially in any attempt to learn sensitive account information such as user passwords.</li>
              <li>Circumvent, disable, or otherwise interfere with security-related features of the Site, including features that prevent or restrict the use or copying of any Content or enforce limitations on the use of the Site and/or the Content contained therein.</li>
              <li>Disparage, tarnish, or otherwise harm, in our opinion, us and/or the Site.</li>
              <li>Use any information obtained from the Site in order to harass, abuse, or harm another person.</li>
              <li>Make improper use of our support services or submit false reports of abuse or misconduct.</li>
              <li>Use the Site in a manner inconsistent with any applicable laws or regulations.</li>
              <li>Engage in unauthorized framing of or linking to the Site.</li>
              <li>Upload or transmit (or attempt to upload or to transmit) viruses, Trojan horses, or other material, including excessive use of capital letters and spamming (continuous posting of repetitive text), that interferes with any party's uninterrupted use and enjoyment of the Site.</li>
              <li>Engage in any automated use of the system, such as using scripts to send comments or messages, or using any data mining, robots, or similar data gathering and extraction tools.</li>
            </ul>

            <h2 className="text-2xl font-bold text-viracis-navy mt-12 mb-4 border-b pb-2">5. Service Provision and Warranties</h2>
            <p>Our consulting, software engineering, and AI automation services are subject to separate Master Services Agreements (MSA) and Statements of Work (SOW). Nothing in these Terms of Service supersedes the explicit contractual agreements formed between Viracis LLC and its clients. However, any software, prototypes, or deliverables provided through the Site are provided on an "AS-IS" and "AS-AVAILABLE" basis.</p>
            <p className="mt-4">WE DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED, IN CONNECTION WITH THE SITE AND YOUR USE THEREOF, INCLUDING, WITHOUT LIMITATION, THE IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.</p>

            <h2 className="text-2xl font-bold text-viracis-navy mt-12 mb-4 border-b pb-2">6. Limitation of Liability</h2>
            <p>IN NO EVENT WILL WE OR OUR DIRECTORS, EMPLOYEES, OR AGENTS BE LIABLE TO YOU OR ANY THIRD PARTY FOR ANY DIRECT, INDIRECT, CONSEQUENTIAL, EXEMPLARY, INCIDENTAL, SPECIAL, OR PUNITIVE DAMAGES, INCLUDING LOST PROFIT, LOST REVENUE, LOSS OF DATA, OR OTHER DAMAGES ARISING FROM YOUR USE OF THE SITE, EVEN IF WE HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.</p>
            <p className="mt-4">NOTWITHSTANDING ANYTHING TO THE CONTRARY CONTAINED HEREIN, OUR LIABILITY TO YOU FOR ANY CAUSE WHATSOEVER AND REGARDLESS OF THE FORM OF THE ACTION, WILL AT ALL TIMES BE LIMITED TO THE AMOUNT PAID, IF ANY, BY YOU TO US DURING THE SIX (6) MONTH PERIOD PRIOR TO ANY CAUSE OF ACTION ARISING.</p>

            <h2 className="text-2xl font-bold text-viracis-navy mt-12 mb-4 border-b pb-2">7. Indemnification</h2>
            <p>You agree to defend, indemnify, and hold us harmless, including our subsidiaries, affiliates, and all of our respective officers, agents, partners, and employees, from and against any loss, damage, liability, claim, or demand, including reasonable attorneys' fees and expenses, made by any third party due to or arising out of:</p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>Your use of the Site</li>
              <li>Breach of these Terms of Service</li>
              <li>Any breach of your representations and warranties set forth in these Terms of Service</li>
              <li>Your violation of the rights of a third party, including but not limited to intellectual property rights</li>
              <li>Any overt harmful act toward any other user of the Site with whom you connected via the Site</li>
            </ul>

            <h2 className="text-2xl font-bold text-viracis-navy mt-12 mb-4 border-b pb-2">8. Governing Law</h2>
            <p>These Terms shall be governed by and defined following the laws of the Commonwealth of Virginia. Viracis LLC and yourself irrevocably consent that the courts of Virginia shall have exclusive jurisdiction to resolve any dispute which may arise in connection with these terms.</p>

            <h2 className="text-2xl font-bold text-viracis-navy mt-12 mb-4 border-b pb-2">9. User Data</h2>
            <p>We will maintain certain data that you transmit to the Site for the purpose of managing the performance of the Site, as well as data relating to your use of the Site. Although we perform regular routine backups of data, you are solely responsible for all data that you transmit or that relates to any activity you have undertaken using the Site. You agree that we shall have no liability to you for any loss or corruption of any such data, and you hereby waive any right of action against us arising from any such loss or corruption of such data.</p>

            <h2 className="text-2xl font-bold text-viracis-navy mt-12 mb-4 border-b pb-2">10. Contact Us</h2>
            <p>In order to resolve a complaint regarding the Site or to receive further information regarding use of the Site, please contact us at:</p>
            <address className="mt-4 not-italic">
              <strong>Viracis LLC</strong><br />
              siddu@viracis.com<br />
              Richmond, Virginia
            </address>
          </div>

        </div>
      </section>

      <LandingFooter />
    </main>
  );
}
