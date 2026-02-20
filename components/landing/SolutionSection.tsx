import React from "react";

export default function SolutionSection() {
  return (
    <section className="py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-base font-semibold text-[#FF6154] tracking-wide uppercase mb-3">
              The Solution
            </h2>
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight text-balance">
              A platform designed for serious builders.
            </h3>
            <p className="text-lg text-gray-600 mb-8 text-pretty">
              We focus on the metrics that actually matter for a successful
              partnership, removing the noise of traditional networking.
            </p>

            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#FF6154] flex items-center justify-center text-white font-bold text-sm">
                  1
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">
                    Compatibility-Based Matching
                  </h4>
                  <p className="text-gray-600">
                    Our algorithm pairs you based on working style assessments,
                    not just keywords in a bio.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#FF6154] flex items-center justify-center text-white font-bold text-sm">
                  2
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">
                    Structured Progress Logs
                  </h4>
                  <p className="text-gray-600">
                    See potential partners' weekly updates. Verify their
                    consistency before you commit to equity.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#FF6154] flex items-center justify-center text-white font-bold text-sm">
                  3
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">
                    Passive Investor Discovery
                  </h4>
                  <p className="text-gray-600">
                    Focus on building. Investors watch your progress logs and
                    reach out when you show traction.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 relative">
            {/* Simple decorative grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="h-2 w-16 bg-gray-200 rounded mb-4"></div>
                <div className="h-2 w-full bg-gray-100 rounded mb-2"></div>
                <div className="h-2 w-2/3 bg-gray-100 rounded"></div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mt-8">
                <div className="h-2 w-16 bg-[#FF6154]/20 rounded mb-4"></div>
                <div className="h-2 w-full bg-gray-100 rounded mb-2"></div>
                <div className="h-2 w-2/3 bg-gray-100 rounded"></div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="h-2 w-16 bg-gray-200 rounded mb-4"></div>
                <div className="h-2 w-full bg-gray-100 rounded mb-2"></div>
                <div className="h-2 w-2/3 bg-gray-100 rounded"></div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mt-8">
                <div className="h-2 w-16 bg-[#FF6154]/20 rounded mb-4"></div>
                <div className="h-2 w-full bg-gray-100 rounded mb-2"></div>
                <div className="h-2 w-2/3 bg-gray-100 rounded"></div>
              </div>
            </div>
            {/* Overlay badge */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-6 py-3 rounded-full shadow-xl text-center border border-gray-100">
              <span className="font-bold text-gray-900 block text-lg">
                Weekly Updates
              </span>
              <span className="text-xs text-gray-500 uppercase tracking-widest font-medium">
                Verified
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
