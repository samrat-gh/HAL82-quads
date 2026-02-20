import Link from "next/link";
import React from "react";

export default function CTASection() {
  return (
    <section className="py-20 md:py-32 bg-white">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight text-balance">
          Ready to build something <span className="text-[#FF6154]">real</span>?
        </h2>
        <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto text-balance">
          Join a community of serious builders who are tired of playing startup
          and ready to execute.
        </p>
        <Link
          href="/join"
          className="inline-block px-10 py-5 bg-[#FF6154] hover:bg-[#ff4f40] text-white rounded-full font-bold text-xl transition-all shadow-xl hover:shadow-[#FF6154]/25 hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6154] focus-visible:ring-offset-2">
          Get Started
        </Link>
      </div>
    </section>
  );
}
