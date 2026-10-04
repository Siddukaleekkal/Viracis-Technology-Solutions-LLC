"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LandingBottomCta() {
  const router = useRouter();

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
          source: "Homepage Bottom CTA",
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
      // Fallback: seamlessly link to the Book a Demo page (/contact) with prefilled details
      const fullName = `${form.firstName} ${form.lastName}`.trim();
      const params = new URLSearchParams({
        name: fullName,
        email: form.email,
        phone: form.phone,
        company: form.company,
        service: form.industry || "Field Operations OS",
      });
      router.push(`/contact?${params.toString()}`);
    }
  };

  return (
    <section className="relative bg-white py-16 sm:py-20 lg:py-24 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="relative rounded-3xl sm:rounded-[32px] overflow-hidden shadow-2xl bg-gradient-to-br from-[#071b2f] via-[#0A2540] to-[#0e355c] border border-cyan-500/20 text-white">
          {/* Subtle Ambient Cyan Glows */}
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-viracis-cyan/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-viracis-cyan/10 rounded-full blur-3xl pointer-events-none" />

          {/* Topographic Contour Texture Overlay */}
          <div className="absolute inset-0 pointer-events-none opacity-20 mix-blend-overlay">
            <svg
              viewBox="0 0 1000 600"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full object-cover"
              preserveAspectRatio="none"
            >
              <path
                d="M-100,100 C150,50 350,220 600,120 C850,20 950,250 1100,180"
                fill="none"
                stroke="#ffffff"
                strokeWidth="2"
              />
              <path
                d="M-100,180 C180,120 380,300 650,200 C900,100 980,320 1100,260"
                fill="none"
                stroke="#ffffff"
                strokeWidth="2"
              />
              <path
                d="M-100,260 C200,200 420,380 700,280 C950,180 1000,400 1100,340"
                fill="none"
                stroke="#ffffff"
                strokeWidth="2"
              />
              <path
                d="M-100,340 C220,280 460,460 750,360 C1000,260 1020,480 1100,420"
                fill="none"
                stroke="#ffffff"
                strokeWidth="2"
              />
              <path
                d="M-100,420 C240,360 500,540 800,440 C1050,340 1050,560 1100,500"
                fill="none"
                stroke="#ffffff"
                strokeWidth="2"
              />
            </svg>
          </div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 p-8 sm:p-12 lg:p-14 items-center">
            {/* Left Content */}
            <div className="lg:col-span-5 flex flex-col justify-center">
              <span className="font-mono text-viracis-cyan font-bold text-xs tracking-[0.25em] uppercase mb-4 inline-block">
                LET&apos;S TALK
              </span>

              <h2 className="font-heading text-3xl sm:text-4xl lg:text-[44px] font-normal text-white leading-[1.15] tracking-tight mb-5">
                Built for modern field teams ready to capture every opportunity.
              </h2>

              <p className="text-white/80 text-xs sm:text-sm md:text-[15px] leading-relaxed max-w-md">
                See how Viracis can automate revenue capture, reduce no-shows, and unlock new field insights while elevating your customer experience.
              </p>
            </div>

            {/* Right White Form Card */}
            <div className="lg:col-span-7">
              <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-xl text-gray-900">
                {status === "success" ? (
                  <div className="py-12 text-center">
                    <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                      ✓
                    </div>
                    <h3 className="text-xl font-bold text-black mb-2">
                      Demo Request Received!
                    </h3>
                    <p className="text-gray-600 text-xs sm:text-sm max-w-sm mx-auto mb-6">
                      Thank you for reaching out. A Viracis operations specialist will contact you shortly to schedule your 1:1 walkthrough.
                    </p>
                    <button
                      onClick={() => setStatus("idle")}
                      className="text-xs font-semibold text-viracis-cyan hover:underline uppercase tracking-wider"
                    >
                      Submit Another Inquiry
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* First & Last Name */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[10px] sm:text-[11px] font-bold tracking-wider uppercase text-gray-700 mb-1 block">
                          FIRST NAME<span className="text-viracis-cyan">*</span>
                        </label>
                        <input
                          type="text"
                          name="firstName"
                          required
                          value={form.firstName}
                          onChange={handleChange}
                          className="w-full px-3.5 py-2 text-xs sm:text-sm bg-white border border-gray-200 rounded-lg text-black focus:outline-none focus:border-viracis-cyan focus:ring-1 focus:ring-viracis-cyan transition-colors"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] sm:text-[11px] font-bold tracking-wider uppercase text-gray-700 mb-1 block">
                          LAST NAME<span className="text-viracis-cyan">*</span>
                        </label>
                        <input
                          type="text"
                          name="lastName"
                          required
                          value={form.lastName}
                          onChange={handleChange}
                          className="w-full px-3.5 py-2 text-xs sm:text-sm bg-white border border-gray-200 rounded-lg text-black focus:outline-none focus:border-viracis-cyan focus:ring-1 focus:ring-viracis-cyan transition-colors"
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div>
                      <label className="text-[10px] sm:text-[11px] font-bold tracking-wider uppercase text-gray-700 mb-1 block">
                        EMAIL<span className="text-viracis-cyan">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={form.email}
                        onChange={handleChange}
                        className="w-full px-3.5 py-2 text-xs sm:text-sm bg-white border border-gray-200 rounded-lg text-black focus:outline-none focus:border-viracis-cyan focus:ring-1 focus:ring-viracis-cyan transition-colors"
                      />
                    </div>

                    {/* Job Title & Phone */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[10px] sm:text-[11px] font-bold tracking-wider uppercase text-gray-700 mb-1 block">
                          JOB TITLE<span className="text-viracis-cyan">*</span>
                        </label>
                        <input
                          type="text"
                          name="jobTitle"
                          required
                          value={form.jobTitle}
                          onChange={handleChange}
                          className="w-full px-3.5 py-2 text-xs sm:text-sm bg-white border border-gray-200 rounded-lg text-black focus:outline-none focus:border-viracis-cyan focus:ring-1 focus:ring-viracis-cyan transition-colors"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] sm:text-[11px] font-bold tracking-wider uppercase text-gray-700 mb-1 block">
                          PHONE NUMBER<span className="text-viracis-cyan">*</span>
                        </label>
                        <div className="relative flex items-center">
                          <span className="absolute left-3 text-xs text-gray-500 flex items-center gap-1 select-none pointer-events-none">
                            🇺🇸 <span className="text-[11px] font-mono">+1</span>
                          </span>
                          <input
                            type="tel"
                            name="phone"
                            required
                            placeholder="(555) 000-0000"
                            value={form.phone}
                            onChange={handleChange}
                            className="w-full pl-16 pr-3.5 py-2 text-xs sm:text-sm bg-white border border-gray-200 rounded-lg text-black focus:outline-none focus:border-viracis-cyan focus:ring-1 focus:ring-viracis-cyan transition-colors"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Company Name */}
                    <div>
                      <label className="text-[10px] sm:text-[11px] font-bold tracking-wider uppercase text-gray-700 mb-1 block">
                        COMPANY NAME<span className="text-viracis-cyan">*</span>
                      </label>
                      <input
                        type="text"
                        name="company"
                        required
                        value={form.company}
                        onChange={handleChange}
                        className="w-full px-3.5 py-2 text-xs sm:text-sm bg-white border border-gray-200 rounded-lg text-black focus:outline-none focus:border-viracis-cyan focus:ring-1 focus:ring-viracis-cyan transition-colors"
                      />
                    </div>

                    {/* Industry / Service Type */}
                    <div>
                      <label className="text-[10px] sm:text-[11px] font-bold tracking-wider uppercase text-gray-700 mb-1 block">
                        INDUSTRY TYPE<span className="text-viracis-cyan">*</span>
                      </label>
                      <select
                        name="industry"
                        required
                        value={form.industry}
                        onChange={handleChange}
                        className="w-full px-3.5 py-2 text-xs sm:text-sm bg-white border border-gray-200 rounded-lg text-black focus:outline-none focus:border-viracis-cyan focus:ring-1 focus:ring-viracis-cyan transition-colors"
                      >
                        <option value="">Select Industry</option>
                        <option value="Roofing & Gutters">Roofing & Gutters</option>
                        <option value="Solar & Clean Energy">Solar & Clean Energy</option>
                        <option value="Pest Control">Pest Control</option>
                        <option value="Turf & Lawn Care">Turf & Lawn Care</option>
                        <option value="Pressure Washing & Exterior">Pressure Washing & Exterior</option>
                        <option value="HVAC & Plumbing">HVAC & Plumbing</option>
                        <option value="Other Field Service">Other Field Service</option>
                      </select>
                    </div>

                    {/* Subtext info */}
                    <p className="text-[10px] sm:text-[11px] text-gray-400 leading-normal pt-1">
                      If you are looking for support, please email{" "}
                      <a href="mailto:support@viracis.com" className="text-gray-600 underline hover:text-black">
                        support@viracis.com
                      </a>
                      .
                    </p>

                    {/* Submit Button */}
                    <div className="flex justify-end pt-2">
                      <button
                        type="submit"
                        disabled={status === "loading"}
                        className="bg-viracis-navy hover:bg-viracis-cyan text-white px-8 py-2.5 rounded-full font-bold text-xs tracking-wider uppercase shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-50"
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
      </div>
    </section>
  );
}
