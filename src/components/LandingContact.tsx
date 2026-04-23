"use client";

import { useState } from "react";
import { motion } from "framer-motion";

type Status = "idle" | "loading" | "success" | "error";

const services = [
  "Software Engineering",
  "Cloud Services",
  "AI & Automation",
  "Starter Pack",
  "Not sure yet",
];

export default function LandingContact() {
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });
  const [status, setStatus] = useState<Status>("idle");

  const set =
    (field: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((prev) => ({ ...prev, [field]: e.target.value }));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      setForm({ name: "", company: "", email: "", phone: "", service: "", message: "" });
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className="min-h-screen bg-[#FAF9F6] pt-24 md:pt-32 pb-24 px-4 lg:px-8">
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-xs tracking-[0.25em] uppercase text-gray-400 font-medium mb-4">
            Get in Touch
          </p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-viracis-navy tracking-[-0.02em] leading-[1.1]">
            Let&apos;s talk about your business.
          </h1>
        </motion.div>

        {/* Two-column: Left info + Right form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-24">
          {/* Left Side — Steps + Contact Info (Hidden on Mobile) */}
          <motion.div
            className="lg:col-span-4 lg:order-1 hidden lg:block"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="lg:sticky lg:top-32 space-y-10">
              {/* Step 01 */}
              <div>
                <span className="text-[10px] tracking-[0.2em] font-bold text-gray-300 block mb-3">01</span>
                <h3 className="text-sm font-bold text-viracis-navy mb-2">We review your message</h3>
                <p className="text-sm text-gray-400 leading-relaxed">You&apos;ll hear back within one business day.</p>
              </div>

              {/* Step 02 */}
              <div>
                <span className="text-[10px] tracking-[0.2em] font-bold text-gray-300 block mb-3">02</span>
                <h3 className="text-sm font-bold text-viracis-navy mb-2">We schedule a free call</h3>
                <p className="text-sm text-gray-400 leading-relaxed">A 30-minute conversation to understand your needs.</p>
              </div>

              {/* Step 03 */}
              <div>
                <span className="text-[10px] tracking-[0.2em] font-bold text-gray-300 block mb-3">03</span>
                <h3 className="text-sm font-bold text-viracis-navy mb-2">We put together a plan</h3>
                <p className="text-sm text-gray-400 leading-relaxed">Only what makes sense for your business and budget.</p>
              </div>
            </div>
          </motion.div>

          {/* Right Side — Form */}
          <motion.div
            className="lg:col-span-8 order-1 lg:order-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            {status === "success" ? (
              <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
                <div className="w-16 h-16 rounded-full bg-viracis-cyan/10 flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-viracis-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-viracis-navy mb-3">
                  Message received.
                </h2>
                <p className="text-gray-500 mb-8 max-w-sm mx-auto">
                  Thanks for reaching out. We&apos;ll be in touch within one business day.
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="text-sm font-bold text-viracis-cyan hover:text-viracis-cyan-hover transition-colors"
                >
                  Send another message →
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-white rounded-2xl border border-gray-100 p-8 md:p-12 space-y-8"
              >
                {/* Row 1: Name + Business */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs tracking-[0.12em] uppercase text-gray-600 font-bold mb-2">
                       Name <span className="text-viracis-cyan">*</span>
                     </label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={set("name")}
                      placeholder="Jane Smith"
                      className="w-full border-b border-gray-300 bg-transparent px-0 py-3 text-base text-viracis-navy outline-none placeholder:text-gray-400 focus:border-viracis-navy transition-colors font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-xs tracking-[0.12em] uppercase text-gray-600 font-bold mb-2">
                       Business Name <span className="text-viracis-cyan">*</span>
                     </label>
                    <input
                      type="text"
                      value={form.company}
                      onChange={set("company")}
                      placeholder="Acme Co."
                      className="w-full border-b border-gray-300 bg-transparent px-0 py-3 text-base text-viracis-navy outline-none placeholder:text-gray-400 focus:border-viracis-navy transition-colors font-medium"
                    />
                  </div>
                </div>

                {/* Row 2: Email + Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs tracking-[0.12em] uppercase text-gray-600 font-bold mb-2">
                       Email <span className="text-viracis-cyan">*</span>
                     </label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={set("email")}
                      placeholder="jane@company.com"
                      className="w-full border-b border-gray-300 bg-transparent px-0 py-3 text-base text-viracis-navy outline-none placeholder:text-gray-400 focus:border-viracis-navy transition-colors font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-xs tracking-[0.12em] uppercase text-gray-600 font-bold mb-2">
                       Phone <span className="text-viracis-cyan">*</span>
                     </label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={set("phone")}
                      placeholder="(555) 000-0000"
                      className="w-full border-b border-gray-300 bg-transparent px-0 py-3 text-base text-viracis-navy outline-none placeholder:text-gray-400 focus:border-viracis-navy transition-colors font-medium"
                    />
                  </div>
                </div>

                {/* Service interest */}
                <div>
                  <label className="block text-xs tracking-[0.12em] uppercase text-gray-600 font-bold mb-4">
                    What are you interested in?
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {services.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setForm((prev) => ({ ...prev, service: s }))}
                        className={`px-4 py-2.5 text-xs font-bold rounded-full border transition-all duration-200 ${
                          form.service === s
                            ? "bg-viracis-navy text-white border-viracis-navy"
                            : "bg-transparent text-gray-600 border-gray-300 hover:border-viracis-navy hover:text-viracis-navy"
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs tracking-[0.12em] uppercase text-gray-600 font-bold mb-2">
                    Message <span className="text-viracis-cyan">*</span>
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={form.message}
                    onChange={set("message")}
                    placeholder="Tell us a bit about your business..."
                    className="w-full border-b border-gray-300 bg-transparent px-0 py-3 text-base text-viracis-navy outline-none placeholder:text-gray-400 focus:border-viracis-navy transition-colors resize-none font-medium"
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full py-4 bg-viracis-navy text-white text-sm font-bold tracking-wide hover:bg-[#122F54] disabled:opacity-50 transition-all duration-300 rounded-xl"
                >
                  {status === "loading" ? "Sending..." : "Send Message"}
                </button>

                {status === "error" && (
                  <p className="text-sm font-medium text-red-500 text-center">
                    Something went wrong. Please try again or email us directly.
                  </p>
                )}
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
