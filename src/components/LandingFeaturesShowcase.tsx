"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const ease = [0.16, 1, 0.3, 1] as const;

interface FeatureItem {
  id: string;
  badge: string;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  imageType: "phone" | "tablet";
  imageOnLeft?: boolean;
}

const features: FeatureItem[] = [
  {
    id: "territory-mapping",
    badge: "TERRITORY & MAPPING",
    title: "Map Your Turf and Track Every Single Knock",
    description:
      "Eliminate overlapping routes and chaotic paper maps. Pin leads on live turf, color-code prospect statuses in real time, and give your field reps the clarity to close more doors every day.",
    imageSrc: "/images/Device Images/feature-iphone-maps.png",
    imageAlt: "Viracis CRM Live Territory Map on iPhone",
    imageType: "phone",
    imageOnLeft: false,
  },
  {
    id: "dispatch-calendar",
    badge: "DISPATCH & SCHEDULING",
    title: "Keep Crews Moving with Live Multi-Fleet Dispatch",
    description:
      "Route, reassign, and dispatch technicians with drag-and-drop simplicity. Keep your sales reps in sync with field service crews in real time without endless phone calls or missed appointments.",
    imageSrc: "/images/Device Images/feature-ipad-calendar.png",
    imageAlt: "Viracis CRM Fleet Dispatch Calendar on iPad",
    imageType: "tablet",
    imageOnLeft: true,
  },
  {
    id: "client-management",
    badge: "CLIENT MANAGEMENT",
    title: "Book Customers on the Spot with Zero Friction",
    description:
      "Capture customer contact info, special instructions, and property details directly on the doorstep. Schedule the job instantly before the rep ever leaves the driveway.",
    imageSrc: "/images/Device Images/feature-ipad-scheduling.png",
    imageAlt: "Viracis CRM Client Profile & Scheduling on iPad",
    imageType: "tablet",
    imageOnLeft: false,
  },
  {
    id: "invoicing-billing",
    badge: "AUTOMATED BILLING",
    title: "Collect Invoices on the Spot, Say Goodbye to Delays",
    description:
      "Generate branded invoices, capture digital signatures, and collect payments on the spot with real-time QuickBooks sync. Keep your company books accurate and eliminate 30-day billing delays permanently.",
    imageSrc: "/images/Device Images/feature-ipad-invoicing.png",
    imageAlt: "Viracis CRM Invoicing & Payment Processing on iPad",
    imageType: "tablet",
    imageOnLeft: true,
  },
];

export default function LandingFeaturesShowcase() {
  return (
    <section id="platform" className="py-24 sm:py-32 bg-white overflow-hidden scroll-mt-20 relative">
      <div id="features" className="absolute top-0" />
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-24 sm:mb-32">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease }}
            className="font-sans text-viracis-cyan font-bold text-xs sm:text-[13px] tracking-[0.2em] uppercase mb-4 inline-block"
          >
            ALWAYS OPERATOR-FIRST
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, ease }}
            className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-[46px] xl:text-[50px] font-normal text-black leading-[1.15] max-w-5xl mx-auto md:whitespace-nowrap"
          >
            Purpose-Built for Door-to-Door & Field Teams
          </motion.h2>
        </div>

        {/* Alternating Feature Rows */}
        <div className="space-y-28 sm:space-y-36 md:space-y-44">
          {features.map((feature) => {
            return (
              <div
                key={feature.id}
                className="grid grid-cols-1 lg:grid-cols-2 items-center gap-12 lg:gap-16 xl:gap-20"
              >
                {/* Text Content */}
                <motion.div
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.7, ease }}
                  className={`flex flex-col items-start ${
                    feature.imageOnLeft
                      ? "lg:order-2 lg:pl-6"
                      : "lg:order-1 lg:pr-6"
                  }`}
                >
                  <span className="font-sans text-viracis-cyan font-bold text-[11px] sm:text-xs tracking-[0.2em] uppercase mb-3.5 inline-block">
                    {feature.badge}
                  </span>
                  <h3 className="font-heading text-2xl sm:text-3xl lg:text-[38px] font-normal text-black leading-[1.2] tracking-[-0.01em] mb-5 max-w-md">
                    {feature.title}
                  </h3>
                  <p className="font-sans text-[15px] sm:text-[16px] text-gray-600 font-normal leading-[1.65] mb-8 max-w-md">
                    {feature.description}
                  </p>

                  <div className="flex flex-col items-start">
                    <Link
                      href="/contact"
                      className="font-sans inline-flex items-center justify-center px-7 py-3 bg-viracis-navy hover:bg-[#122F54] text-white text-[13px] font-medium tracking-wide border border-viracis-navy shadow-sm transition-colors duration-200"
                    >
                      Request a Demo
                    </Link>
                    <Link
                      href="/contact"
                      className="font-sans inline-flex items-center gap-1 text-[13px] font-semibold text-viracis-navy hover:text-viracis-cyan transition-colors mt-3 pl-1"
                    >
                      Learn More <span aria-hidden="true">&rarr;</span>
                    </Link>
                  </div>
                </motion.div>

                {/* Device Mockup */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.8, ease }}
                  className={`flex justify-center items-center ${
                    feature.imageOnLeft ? "lg:order-1" : "lg:order-2"
                  }`}
                >
                  {feature.imageType === "phone" ? (
                    <div className="w-full max-w-[230px] sm:max-w-[260px] md:max-w-[285px] drop-shadow-[0_20px_35px_rgba(0,0,0,0.12)]">
                      <Image
                        src={feature.imageSrc}
                        alt={feature.imageAlt}
                        width={873}
                        height={1816}
                        quality={95}
                        className="w-full h-auto object-contain select-none"
                      />
                    </div>
                  ) : (
                    <div className="w-full max-w-[520px] sm:max-w-[560px] lg:max-w-[600px] drop-shadow-[0_25px_45px_rgba(0,0,0,0.10)]">
                      <Image
                        src={feature.imageSrc}
                        alt={feature.imageAlt}
                        width={1854}
                        height={1440}
                        quality={95}
                        className="w-full h-auto object-contain select-none"
                      />
                    </div>
                  )}
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
