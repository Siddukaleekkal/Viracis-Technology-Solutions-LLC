"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const ease = [0.16, 1, 0.3, 1] as const;

type Service = {
  id: string;
  title: string;
  description: string;
  features?: string[];
  accent: boolean;
  colSpan: string;
};

const services: Service[] = [
  {
    id: "software",
    title: "Software Engineering",
    description:
      "Custom web and mobile applications built for your business. From MVPs to full-scale platforms, we own the entire delivery lifecycle: design, development, and deployment.",
    accent: false,
    colSpan: "lg:col-span-2",
  },
  {
    id: "ai",
    title: "AI & Automation",
    description:
      "Eliminate repetitive work and surface actionable insights with AI-powered workflows and machine learning pipelines tailored to your operations.",
    accent: false,
    colSpan: "lg:col-span-1",
  },
  {
    id: "cloud",
    title: "Cloud Services",
    description:
      "Reliable, cost-efficient cloud infrastructure on AWS and Azure. We design, migrate, and optimize so your systems scale with your business.",
    accent: false,
    colSpan: "lg:col-span-1",
  },
  {
    id: "starter",
    title: "Starter Pack",
    description:
      "Everything a small business needs to establish a professional digital presence, packaged and ready to launch.",
    features: [
      "Professional domain & business email",
      "Custom website",
      "CRM setup & onboarding",
      "Social media marketing package",
    ],
    accent: true,
    colSpan: "lg:col-span-2",
  },
];

const LandingServices = () => {
  return (
    <section id="services" className="bg-white border-t border-gray-200">
      {/* Heavy, structured header - Light Theme */}
      <div className="bg-gray-50 pt-24 pb-40 px-8 border-b border-gray-200">
        <div className="max-w-[1200px] mx-auto">
          <div className="max-w-3xl">
            <h2 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-6">
              What We Do
            </h2>
            <p className="text-4xl lg:text-5xl font-semibold leading-tight text-viracis-navy mb-6">
              Enterprise-grade solutions built to scale.
            </p>
            <p className="text-xl text-gray-600">
              We deliver end-to-end technology services that move your business from manual chaos to automated clarity.
            </p>
          </div>
        </div>
      </div>

      {/* Rigid, Sharp Card Grid */}
      <div className="max-w-[1200px] mx-auto px-8 -mt-24 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, i) => (
            <div 
              key={service.id} 
              className={`flex flex-col p-8 sm:p-10 shadow-lg ${
                service.accent 
                  ? "bg-viracis-navy text-white border-t-4 border-viracis-cyan" 
                  : "bg-white border-t-4 border-viracis-navy"
              }`}
            >
              <h3 className={`text-xl font-bold mb-4 ${service.accent ? "text-white" : "text-viracis-navy"}`}>
                {service.title}
              </h3>
              <p className={`text-base leading-relaxed mb-8 flex-1 ${service.accent ? "text-gray-300" : "text-gray-600"}`}>
                {service.description}
              </p>
              
              {service.features && (
                <ul className="mb-8 space-y-3">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <div className={`mt-1.5 w-1.5 h-1.5 shrink-0 ${service.accent ? "bg-viracis-cyan" : "bg-viracis-navy"}`} />
                      <span className={`text-sm font-medium ${service.accent ? "text-gray-200" : "text-gray-700"}`}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
              
              <div className="mt-auto pt-6 border-t border-gray-200/20">
                <Link
                  href="/contact"
                  className={`inline-flex items-center text-sm font-bold uppercase tracking-wider ${
                    service.accent ? "text-viracis-cyan hover:text-white" : "text-viracis-navy hover:text-blue-600"
                  } transition-colors`}
                >
                  Learn More
                  <span className="ml-2" aria-hidden="true">&rarr;</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LandingServices;
