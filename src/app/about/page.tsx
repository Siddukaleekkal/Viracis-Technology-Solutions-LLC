"use client";

import { motion } from "framer-motion";
import LandingNavbar from "@/components/LandingNavbar";
import SubPageHero from "@/components/SubPageHero";
import LandingFooter from "@/components/LandingFooter";

const ease = [0.16, 1, 0.3, 1] as const;

const outcomes = [
  {
    title: "Save Time",
    body: "Automate the repetitive work eating up your day so your team can focus on what actually moves the business forward.",
  },
  {
    title: "Convert More Leads",
    body: "Build systems that capture interest and turn it into customers, without things falling through the cracks.",
  },
  {
    title: "Grow Your Business",
    body: "Technology that scales with you, so growth does not mean more chaos. It means more capacity.",
  },
];

const process = [
  {
    step: "01",
    title: "We learn your business",
    body: "We start by understanding how you currently operate, where you are losing time, and where you want to grow. No assumptions.",
  },
  {
    step: "02",
    title: "We build the right solution",
    body: "No unnecessary complexity. We recommend and build only what your business actually needs to move forward.",
  },
  {
    step: "03",
    title: "We deliver and stay with you",
    body: "We do not hand off and disappear. We make sure everything works and support you as your business grows.",
  },
];

export default function AboutPage() {
  return (
    <main className="bg-white">
      <LandingNavbar />
      <SubPageHero
        category="Our Story"
        title="Helping businesses grow by making technology work for them."
        subtitle="We are based in Richmond, Virginia and we exist to help businesses without a technical team implement the right systems to save time, convert more leads, and grow."
      />

      {/* Who we are */}
      <section className="py-24 bg-white border-b border-gray-200">
        <div className="max-w-[1200px] mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            {/* Left: story */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, ease }}
            >
              <p className="text-xs tracking-[0.25em] uppercase text-gray-400 font-medium mb-5">
                Why We Exist
              </p>
              <h2 className="text-3xl lg:text-4xl font-normal tracking-[-0.02em] text-viracis-navy leading-[1.1] mb-8">
                There is only so much you can do on pen and paper.
              </h2>
              <div className="space-y-5 text-base text-gray-600 leading-relaxed">
                <p>
                  Most businesses reach a point where manual processes start holding them back. Spreadsheets get messy. Leads fall through the cracks. Time gets wasted on work that should be running itself.
                </p>
                <p>
                  The problem is not a lack of ambition. It is a lack of access. Most small businesses do not have an in-house technical team, and hiring one is expensive. That is the gap Viracis was built to close.
                </p>
                <p>
                  We work with business owners to implement the right technology: websites, software, cloud tools, AI automation, in a way that is straightforward, affordable, and built around how their business actually works.
                </p>
              </div>
            </motion.div>

            {/* Right: outcome tiles */}
            <div className="flex flex-col gap-4">
              {outcomes.map((item, i) => (
                <motion.div
                  key={item.title}
                  className="bg-gray-50 border border-gray-200 rounded-2xl p-7 hover:shadow-md transition-shadow duration-300"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: i * 0.1, ease }}
                >
                  <h3 className="text-base font-semibold text-viracis-navy tracking-tight">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                    {item.body}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How we work */}
      <section className="py-24 bg-viracis-navy">
        <div className="max-w-[1200px] mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease }}
            className="mb-14"
          >
            <p className="text-xs tracking-[0.25em] uppercase text-white/40 font-medium mb-5">
              How We Work
            </p>
            <h2 className="text-3xl lg:text-4xl font-normal tracking-[-0.02em] text-white leading-[1.1]">
              Simple, transparent, and built around you.
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {process.map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.12, ease }}
              >
                <span className="text-xs tracking-[0.2em] uppercase font-medium text-white/30">
                  {item.step}
                </span>
                <h3 className="mt-3 text-lg font-semibold text-white tracking-tight">
                  {item.title}
                </h3>
                <p className="mt-2.5 text-base text-white/60 leading-relaxed">
                  {item.body}
                </p>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gray-50 border-t border-gray-200">
        <div className="max-w-[1200px] mx-auto px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease }}
          >
            <p className="text-xs tracking-[0.25em] uppercase text-gray-400 font-medium mb-5">
              Work With Us
            </p>
            <h2 className="text-4xl lg:text-5xl font-normal tracking-[-0.02em] text-viracis-navy leading-[1.1] max-w-2xl mx-auto">
              Ready to stop doing it all manually?
            </h2>
            <p className="mt-6 text-lg text-gray-600 leading-relaxed max-w-xl mx-auto">
              Tell us about your business and we will figure out the best way technology can help you grow.
            </p>
            <div className="mt-10">
              <a
                href="/contact"
                className="px-8 py-4 bg-viracis-navy text-white text-sm font-semibold tracking-wide hover:bg-[#122F54] transition-colors duration-200"
              >
                Get in touch
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <LandingFooter />
    </main>
  );
}
