"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function LandingRoiCalculator() {
  const [ticket, setTicket] = useState(750);
  const [lostJobs, setLostJobs] = useState(6);
  const [months, setMonths] = useState(10);

  // Calculate annual recaptured revenue
  const totalRecovered = ticket * lostJobs * months;

  // Track percentage helper for custom slider fill
  const getTrackBackground = (value: number, min: number, max: number) => {
    const percentage = ((value - min) / (max - min)) * 100;
    return `linear-gradient(to right, #0099B8 0%, #0099B8 ${percentage}%, #E2E8F0 ${percentage}%, #E2E8F0 100%)`;
  };

  return (
    <section className="py-20 sm:py-28 bg-[#edf3f8] border-t border-b border-gray-200/70 overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 sm:px-8">
        {/* Title */}
        <h2 className="font-heading text-3xl sm:text-4xl md:text-[42px] font-normal text-black text-center mb-10 sm:mb-12 tracking-tight">
          Revenue Recapture Calculator
        </h2>

        {/* 3 Top Input Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 mb-8 sm:mb-10">
          {/* Card 1: Average Job Ticket */}
          <div className="bg-white rounded-2xl p-6 sm:p-7 border border-gray-200/80 shadow-sm flex flex-col justify-between">
            <label className="text-xs sm:text-[13px] text-gray-500 font-medium mb-3 block">
              Your Average Job Ticket
            </label>
            <div className="bg-white border border-gray-200 rounded-xl py-3 px-4 text-center font-heading text-2xl sm:text-3xl font-semibold text-black mb-5 shadow-inner">
              ${ticket.toLocaleString()}
            </div>
            <div className="px-1">
              <input
                type="range"
                min={150}
                max={3000}
                step={25}
                value={ticket}
                onChange={(e) => setTicket(Number(e.target.value))}
                className="w-full h-1.5 rounded-lg appearance-none cursor-pointer roi-range-slider"
                style={{ background: getTrackBackground(ticket, 150, 3000) }}
                aria-label="Your Average Job Ticket"
              />
            </div>
          </div>

          {/* Card 2: Average Jobs Lost Per Month */}
          <div className="bg-white rounded-2xl p-6 sm:p-7 border border-gray-200/80 shadow-sm flex flex-col justify-between">
            <label className="text-xs sm:text-[13px] text-gray-500 font-medium mb-3 block">
              Average Jobs Lost Per Month
            </label>
            <div className="bg-white border border-gray-200 rounded-xl py-3 px-4 text-center font-heading text-2xl sm:text-3xl font-semibold text-black mb-5 shadow-inner">
              {lostJobs}
            </div>
            <div className="px-1">
              <input
                type="range"
                min={1}
                max={30}
                step={1}
                value={lostJobs}
                onChange={(e) => setLostJobs(Number(e.target.value))}
                className="w-full h-1.5 rounded-lg appearance-none cursor-pointer roi-range-slider"
                style={{ background: getTrackBackground(lostJobs, 1, 30) }}
                aria-label="Average Jobs Lost Per Month"
              />
            </div>
          </div>

          {/* Card 3: Active Field Months Per Year */}
          <div className="bg-white rounded-2xl p-6 sm:p-7 border border-gray-200/80 shadow-sm flex flex-col justify-between">
            <label className="text-xs sm:text-[13px] text-gray-500 font-medium mb-3 block">
              Active Field Months Per Year
            </label>
            <div className="bg-white border border-gray-200 rounded-xl py-3 px-4 text-center font-heading text-2xl sm:text-3xl font-semibold text-black mb-5 shadow-inner">
              {months}
            </div>
            <div className="px-1">
              <input
                type="range"
                min={4}
                max={12}
                step={1}
                value={months}
                onChange={(e) => setMonths(Number(e.target.value))}
                className="w-full h-1.5 rounded-lg appearance-none cursor-pointer roi-range-slider"
                style={{ background: getTrackBackground(months, 4, 12) }}
                aria-label="Active Field Months Per Year"
              />
            </div>
          </div>
        </div>

        {/* Bottom Output Card */}
        <motion.div
          layout
          className="bg-white rounded-2xl p-8 sm:p-12 border border-gray-200/80 shadow-sm text-center max-w-4xl mx-auto"
        >
          <p className="text-gray-500 text-xs sm:text-sm font-medium mb-2">
            Using Viracis, your field business can recover an estimated
          </p>

          <div className="font-heading text-4xl sm:text-5xl lg:text-6xl font-semibold text-black my-4 tracking-tight">
            ${totalRecovered.toLocaleString()}
          </div>

          <div className="mt-6 flex justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 sm:px-9 py-3.5 sm:py-4 bg-viracis-navy hover:bg-[#122F54] text-white font-medium text-xs sm:text-sm tracking-wide rounded-md shadow-md hover:shadow-lg transition-all duration-200"
            >
              Request Your 1:1 Demo
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Embedded CSS for thumb styling matching the screenshot */}
      <style jsx>{`
        .roi-range-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: #ffffff;
          border: 3px solid #0099b8;
          cursor: pointer;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
          transition: transform 0.15s ease;
        }
        .roi-range-slider::-webkit-slider-thumb:hover {
          transform: scale(1.15);
        }
        .roi-range-slider::-moz-range-thumb {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: #ffffff;
          border: 3px solid #0099b8;
          cursor: pointer;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
          transition: transform 0.15s ease;
        }
        .roi-range-slider::-moz-range-thumb:hover {
          transform: scale(1.15);
        }
      `}</style>
    </section>
  );
}
