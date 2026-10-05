"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function LandingContact() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    jobTitle: "",
    phone: "",
    company: "",
    industry: "",
  });

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  // Pre-fill from query params if coming from another CTA
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const name = params.get("name") || "";
      const email = params.get("email") || "";
      const phone = params.get("phone") || "";
      const company = params.get("company") || "";
      const industry = params.get("industry") || params.get("service") || "";

      let firstName = "";
      let lastName = "";
      if (name) {
        const parts = name.split(" ");
        firstName = parts[0] || "";
        lastName = parts.slice(1).join(" ") || "";
      }

      setForm((prev) => ({
        firstName: firstName || prev.firstName,
        lastName: lastName || prev.lastName,
        email: email || prev.email,
        phone: phone || prev.phone,
        company: company || prev.company,
        jobTitle: prev.jobTitle,
        industry: industry || prev.industry,
      }));
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          phone: form.phone,
          company: form.company,
          jobTitle: form.jobTitle,
          industry: form.industry,
          source: "Book a Demo Page (/contact)",
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setStatus("success");
      } else {
        throw new Error(data.error || "Failed to submit demo request.");
      }
    } catch (err: any) {
      console.error("Submission error:", err);
      setErrorMessage(err.message || "Something went wrong. Please try again.");
      setStatus("error");
    }
  };

  return (
    <div className="w-full flex-1 flex flex-col bg-[#0e131d]">
      {/* Main Split Screen */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12">
        
        {/* Left Column: Dark Value Showcase matching Noteefy */}
        <div className="lg:col-span-6 bg-[#0e131d] text-white p-6 sm:p-8 lg:p-12 xl:p-14 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-white/10">
          <div>
            <span className="font-mono text-viracis-cyan font-bold text-xs tracking-[0.25em] uppercase mb-4 inline-block">
              LET&apos;S TALK
            </span>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-normal text-white leading-[1.12] tracking-tight mb-4">
              See What Viracis Can Do For Your Business
            </h1>

            <p className="text-white/70 text-sm sm:text-base leading-relaxed max-w-xl mb-6 sm:mb-8">
              We&apos;ll connect and show you the platform built for the door to door operator to maximize revenue while enhancing the customer experience.
            </p>

            {/* Media Showcase Card using Potential Hero Section & cropped Schedule.png */}
            <div className="relative rounded-2xl overflow-hidden border border-white/15 shadow-2xl bg-[#080b11] aspect-[16/10] sm:aspect-[16/10.5] w-full">
              {/* Background Suburban Aerial Turf Image */}
              <Image
                src="/Potential Hero Section.avif"
                alt="Neighborhood Aerial Field Turf"
                fill
                className="object-cover opacity-50 select-none"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0e131d] via-[#0e131d]/30 to-transparent" />

              {/* Overlaid Cropped iPad Schedule */}
              <div className="relative z-10 w-full h-full flex items-center justify-center p-3 sm:p-5">
                <Image
                  src="/images/Device Images/Ipad/Schedule.png"
                  alt="Viracis Schedule & Dispatch Calendar on iPad"
                  width={1852}
                  height={1418}
                  className="max-h-[92%] w-auto object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.7)]"
                  priority
                />
              </div>
            </div>

            {/* Caption / Impact Highlight */}
            <div className="mt-6 space-y-2 max-w-xl">
              <h4 className="text-white text-base sm:text-lg font-semibold tracking-tight leading-snug">
                At High-Demand Field Operations, Crews Close More and Dispatch Faster
              </h4>
              <p className="text-white/60 text-xs sm:text-sm leading-relaxed">
                Experience how live neighborhood GPS pins, multi-truck route coordination, 2-way homeowner SMS, and instant digital invoicing work together in one unified operating system.
              </p>
            </div>
          </div>

          {/* Footer note in left column */}
          <div className="pt-10 mt-10 border-t border-white/10 text-xs text-white/40 flex items-center justify-between">
            <span>© {new Date().getFullYear()} Viracis LLC. All rights reserved.</span>
            <span>Richmond, VA</span>
          </div>
        </div>

        {/* Right Column: Clean White Form matching Noteefy */}
        <div className="lg:col-span-6 bg-white p-6 sm:p-8 lg:p-12 xl:p-14 flex flex-col justify-start">
          <div className="max-w-xl mx-auto w-full pt-2 sm:pt-4 lg:pt-7 xl:pt-8">
            {status === "success" ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-16 text-center"
              >
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-5 text-3xl font-bold">
                  ✓
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
                  Demo Request Received!
                </h2>
                <p className="text-gray-600 text-sm sm:text-base max-w-md mx-auto mb-8 leading-relaxed">
                  Thank you, <strong className="text-black">{form.firstName}</strong>. A Viracis field operations specialist will reach out shortly to tailor your 1:1 walkthrough.
                </p>
                <button
                  onClick={() => {
                    setStatus("idle");
                    setForm({
                      firstName: "",
                      lastName: "",
                      email: "",
                      jobTitle: "",
                      phone: "",
                      company: "",
                      industry: "",
                    });
                  }}
                  className="font-sans px-6 py-2.5 bg-viracis-navy text-white text-xs font-semibold uppercase tracking-wider border border-viracis-navy hover:bg-[#122F54] transition-colors cursor-pointer"
                >
                  Submit Another Request
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4.5 sm:space-y-5">
                {/* Error Banner */}
                {status === "error" && (
                  <div className="p-3.5 bg-red-50 border border-red-200 rounded-lg text-red-600 text-xs font-medium">
                    {errorMessage || "Submission failed. Please check your details and try again."}
                  </div>
                )}

                {/* First Name & Last Name */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] sm:text-xs font-bold tracking-wider uppercase text-gray-700 mb-1.5 block">
                      FIRST NAME<span className="text-viracis-navy font-bold">*</span>
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      required
                      placeholder="Jane"
                      value={form.firstName}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 sm:py-3 text-xs sm:text-sm bg-white border border-gray-300 rounded-lg text-black placeholder:text-gray-400 focus:outline-none focus:border-viracis-navy focus:ring-1 focus:ring-viracis-navy transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] sm:text-xs font-bold tracking-wider uppercase text-gray-700 mb-1.5 block">
                      LAST NAME<span className="text-viracis-navy font-bold">*</span>
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      required
                      placeholder="Doe"
                      value={form.lastName}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 sm:py-3 text-xs sm:text-sm bg-white border border-gray-300 rounded-lg text-black placeholder:text-gray-400 focus:outline-none focus:border-viracis-navy focus:ring-1 focus:ring-viracis-navy transition-colors"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="text-[11px] sm:text-xs font-bold tracking-wider uppercase text-gray-700 mb-1.5 block">
                    EMAIL<span className="text-viracis-navy font-bold">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="jane@company.com"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 sm:py-3 text-xs sm:text-sm bg-white border border-gray-300 rounded-lg text-black placeholder:text-gray-400 focus:outline-none focus:border-viracis-navy focus:ring-1 focus:ring-viracis-navy transition-colors"
                  />
                </div>

                {/* Job Title & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] sm:text-xs font-bold tracking-wider uppercase text-gray-700 mb-1.5 block">
                      JOB TITLE<span className="text-viracis-navy font-bold">*</span>
                    </label>
                    <input
                      type="text"
                      name="jobTitle"
                      required
                      placeholder="Owner / Operations Manager"
                      value={form.jobTitle}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 sm:py-3 text-xs sm:text-sm bg-white border border-gray-300 rounded-lg text-black placeholder:text-gray-400 focus:outline-none focus:border-viracis-navy focus:ring-1 focus:ring-viracis-navy transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] sm:text-xs font-bold tracking-wider uppercase text-gray-700 mb-1.5 block">
                      PHONE NUMBER<span className="text-viracis-navy font-bold">*</span>
                    </label>
                    <div className="relative flex items-center">
                      <span className="absolute left-3.5 text-xs text-gray-500 flex items-center gap-1 select-none pointer-events-none">
                        🇺🇸 <span className="font-mono text-gray-700 text-[11px] font-semibold">+1</span>
                      </span>
                      <input
                        type="tel"
                        name="phone"
                        required
                        placeholder="(555) 000-0000"
                        value={form.phone}
                        onChange={handleChange}
                        className="w-full pl-16 pr-4 py-2.5 sm:py-3 text-xs sm:text-sm bg-white border border-gray-300 rounded-lg text-black placeholder:text-gray-400 focus:outline-none focus:border-viracis-navy focus:ring-1 focus:ring-viracis-navy transition-colors"
                      />
                    </div>
                  </div>
                </div>

                {/* Company Name */}
                <div>
                  <label className="text-[11px] sm:text-xs font-bold tracking-wider uppercase text-gray-700 mb-1.5 block">
                    COMPANY NAME<span className="text-viracis-navy font-bold">*</span>
                  </label>
                  <input
                    type="text"
                    name="company"
                    required
                    placeholder="Apex Field Services LLC"
                    value={form.company}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 sm:py-3 text-xs sm:text-sm bg-white border border-gray-300 rounded-lg text-black placeholder:text-gray-400 focus:outline-none focus:border-viracis-navy focus:ring-1 focus:ring-viracis-navy transition-colors"
                  />
                </div>

                {/* Industry Type */}
                <div>
                  <label className="text-[11px] sm:text-xs font-bold tracking-wider uppercase text-gray-700 mb-1.5 block">
                    INDUSTRY TYPE<span className="text-viracis-navy font-bold">*</span>
                  </label>
                  <select
                    name="industry"
                    required
                    value={form.industry}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 sm:py-3 text-xs sm:text-sm bg-white border border-gray-300 rounded-lg text-black focus:outline-none focus:border-viracis-navy focus:ring-1 focus:ring-viracis-navy transition-colors cursor-pointer"
                  >
                    <option value="" disabled>Select your industry</option>
                    <option value="Roofing & Gutters">Roofing & Gutters</option>
                    <option value="Solar & Clean Energy">Solar & Clean Energy</option>
                    <option value="Pest Control">Pest Control</option>
                    <option value="Turf & Lawn Care">Turf & Lawn Care</option>
                    <option value="Pressure Washing & Exterior">Pressure Washing & Exterior</option>
                    <option value="HVAC & Plumbing">HVAC & Plumbing</option>
                    <option value="Security & Home Automation">Security & Home Automation</option>
                    <option value="Other Field Service">Other Field Service</option>
                  </select>
                </div>

                {/* Support & FAQ note */}
                <p className="text-[11px] sm:text-xs text-gray-400 leading-relaxed pt-0.5">
                  If you are looking for support, please email{" "}
                  <a href="mailto:support@viracis.com" className="text-gray-700 font-medium underline hover:text-viracis-navy">
                    support@viracis.com
                  </a>{" "}
                  or visit our{" "}
                  <Link href="/faq" className="text-gray-700 font-medium underline hover:text-viracis-navy">
                    FAQ page
                  </Link>.
                </p>

                {/* Submit button: Compact rounded navy button matching Viracis brand */}
                <div className="flex justify-end pt-2 sm:pt-3">
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="font-sans bg-viracis-navy hover:bg-[#122F54] text-white px-9 sm:px-10 py-2.5 sm:py-3 font-bold text-xs sm:text-sm tracking-wide border border-viracis-navy shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-50 cursor-pointer"
                  >
                    {status === "loading" ? "Submitting..." : "Submit"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
