import Link from "next/link";
import React from "react";

export default function Hero() {
  return (
    <section className="pt-32 pb-20 md:pt-40 md:pb-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
      <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-gray-900 mb-6 max-w-4xl mx-auto leading-tight text-balance">
        Find the Right Co-Founder. <br className="hidden md:block" />
        <span className="text-[#FF6154]">Build With Alignment.</span>
      </h1>
      <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed text-balance">
        Stop guessing. Match based on complementary skills, shared vision, and
        working style compatibility.
      </p>
      <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
        <Link
          href="/join"
          className="w-full sm:w-auto px-8 py-4 bg-[#FF6154] hover:bg-[#ff4f40] text-white rounded-full font-semibold text-lg transition-all shadow-lg hover:shadow-[#FF6154]/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6154] focus-visible:ring-offset-2">
          Get Started
        </Link>
        <Link
          href="#how-it-works"
          className="w-full sm:w-auto px-8 py-4 bg-white text-gray-900 border-2 border-gray-200 hover:border-gray-300 rounded-full font-semibold text-lg transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-300 focus-visible:ring-offset-2">
          Learn More
        </Link>
      </div>

      {/* Hero Visual */}
      <div className="mt-20 relative max-w-5xl mx-auto">
        <div className="relative rounded-3xl bg-gray-50 border border-gray-100 p-4 md:p-8 overflow-hidden shadow-2xl shadow-gray-100/50">
          {/* Subtle background pattern */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: "radial-gradient(#000 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}></div>

          <div className="relative flex flex-col md:flex-row gap-6 md:gap-12 items-center justify-center py-12 md:py-20">
            {/* Founder Profile Card 1 */}
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 w-64 md:w-72 transform -rotate-3 transition-transform hover:rotate-0 hover:z-10 duration-500 ease-out">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-lg">
                  JD
                </div>
                <div>
                  <div className="font-bold text-gray-900">John Doe</div>
                  <div className="text-xs text-gray-500 font-medium tracking-wide">
                    Founder@FinLabs
                  </div>
                </div>
              </div>
              <div className="space-y-2 mb-4">
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 bg-gray-100 rounded text-xs text-gray-600 font-medium">
                    Strategist
                  </span>
                  <span className="px-2 py-1 bg-gray-100 rounded text-xs text-gray-600 font-medium">
                    Marketting
                  </span>
                  <span className="px-2 py-1 bg-gray-100 rounded text-xs text-gray-600 font-medium">
                    System Design
                  </span>
                </div>
              </div>
              <div className="text-xs text-gray-400">
                Looking for: Founding Engineer
              </div>
            </div>

            {/* Connection Badge */}
            <div className="z-10 bg-white rounded-full p-2 shadow-xl border border-gray-100 transform scale-110 animate-pulse md:absolute">
              <div className="bg-green-50 text-green-700 font-bold px-4 py-2 rounded-full flex items-center gap-2">
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"></path>
                </svg>
                98% Match
              </div>
            </div>

            {/* Founder Profile Card 2 */}
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 w-64 md:w-72 transform rotate-3 transition-transform hover:rotate-0 hover:z-10 duration-500 ease-out">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-[#FF6154]/20 flex items-center justify-center text-[#FF6154] font-bold text-lg">
                  AS
                </div>
                <div>
                  <div className="font-bold text-gray-900">Sarah Smith</div>
                  <div className="text-xs text-gray-500 font-medium uppercase tracking-wide">
                    Product & Sales
                  </div>
                </div>
              </div>
              <div className="space-y-2 mb-4">
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 bg-gray-100 rounded text-xs text-gray-600 font-medium">
                    Fullstack Dev
                  </span>
                  <span className="px-2 py-1 bg-gray-100 rounded text-xs text-gray-600 font-medium">
                    Indie Dev
                  </span>
                  <span className="px-2 py-1 bg-gray-100 rounded text-xs text-gray-600 font-medium">
                    Product
                  </span>
                </div>
              </div>
              <div className="text-xs text-gray-400">
                Looking for: Opportunities
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
