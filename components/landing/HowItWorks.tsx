import React from "react";

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 text-balance">
            How CoFound Works
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto text-pretty">
            From signup to your first commit, we streamline the process.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-12 text-center relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gray-200 -z-10"></div>

          <div>
            <div className="w-24 h-24 bg-white rounded-full border-4 border-white shadow-md mx-auto flex items-center justify-center mb-6 relative z-10">
              <span className="text-3xl font-bold text-[#FF6154]">1</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Create Profile
            </h3>
            <p className="text-gray-600 px-4">
              Highlight your core skills, past projects, and what you're looking
              to build.
            </p>
          </div>

          <div>
            <div className="w-24 h-24 bg-white rounded-full border-4 border-white shadow-md mx-auto flex items-center justify-center mb-6 relative z-10">
              <span className="text-3xl font-bold text-[#FF6154]">2</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Vibe Assessment
            </h3>
            <p className="text-gray-600 px-4">
              Take our quick psychological and working style test to understand
              your collaboration DNA.
            </p>
          </div>

          <div>
            <div className="w-24 h-24 bg-white rounded-full border-4 border-white shadow-md mx-auto flex items-center justify-center mb-6 relative z-10">
              <span className="text-3xl font-bold text-[#FF6154]">3</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Match & Build
            </h3>
            <p className="text-gray-600 px-4">
              Connect with high-compatibility founders and start logging weekly
              progress.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
