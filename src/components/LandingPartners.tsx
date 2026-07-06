"use client";

const partners = [
  { name: "AWS", logo: "/aws.png", scale: 0.85, keyword: "Cloud Infrastructure" },
  { name: "Azure", logo: "/azure.png", scale: 0.75, keyword: "Enterprise Systems" },
  { name: "GCP", logo: "/gcp.png", scale: 0.85, keyword: "Data Engineering" },
  { name: "Anthropic", logo: "/anthropic_v2.webp", scale: 0.95, keyword: "Advanced LLMs" },
  { name: "OpenAI", logo: "/openai.png", scale: 1.6, keyword: "Generative AI" },
  { name: "Microsoft", logo: "/microsoft.jpg", scale: 0.75, keyword: "Ecosystem Integration" },
  { name: "Salesforce", logo: "/salesforce.png", scale: 0.75, keyword: "CRM Architecture" },
  { name: "Zoho", logo: "/zoho.png", scale: 0.85, keyword: "Business Automation" },
];

const LandingPartners = () => {
  return (
    <section className="bg-white border-t border-gray-200 pt-24 pb-32">
      <div className="max-w-[1200px] mx-auto px-8 mb-16">
        <div className="flex flex-col items-center text-center">
          <h2 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-4">
            Technical Capabilities
          </h2>
          <p className="text-3xl lg:text-4xl font-semibold text-viracis-navy">
            Powered by Enterprise Infrastructure
          </p>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 border-l border-t border-gray-200 bg-white">
          {partners.map((partner) => (
            <div
              key={partner.name}
              className="flex flex-col items-center justify-center p-8 lg:p-12 border-r border-b border-gray-200"
            >
              <div className="h-16 flex items-center justify-center mb-6 w-full">
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="object-contain"
                  style={{ transform: `scale(${partner.scale})`, maxHeight: '3.5rem', maxWidth: '8rem' }}
                />
              </div>
              <p className="text-xs font-bold uppercase tracking-wider text-viracis-navy text-center">
                {partner.keyword}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LandingPartners;

