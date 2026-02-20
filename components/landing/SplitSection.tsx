import Link from "next/link";
import React from "react";

export default function SplitSection() {
  return (
    <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        {/* For Founders */}
        <div
          id="for-founders"
          className="bg-gray-900 rounded-3xl p-10 md:p-14 text-white hover:scale-[1.01] transition-transform duration-300">
          <h3 className="text-sm font-bold text-[#FF6154] tracking-widest uppercase mb-4">
            For Founders
          </h3>
          <h2 className="text-3xl font-bold mb-6 text-balance">
            Stop wasting time on coffee chats that go nowhere.
          </h2>
          <p className="text-gray-300 mb-8 text-lg leading-relaxed text-pretty">
            Traditional networking feels like dating apps—superficial and
            exhausting. We help you skip the small talk and get straight to
            building with someone who gets it.
          </p>
          <ul className="space-y-4 mb-10">
            <li className="flex items-start gap-3">
              <svg
                aria-hidden="true"
                className="w-6 h-6 text-[#FF6154] flex-shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span className="text-gray-200">
                Verified identity and skills
              </span>
            </li>
            <li className="flex items-start gap-3">
              <svg
                aria-hidden="true"
                className="w-6 h-6 text-[#FF6154] flex-shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span className="text-gray-200">Equity agreement templates</span>
            </li>
            <li className="flex items-start gap-3">
              <svg
                aria-hidden="true"
                className="w-6 h-6 text-[#FF6154] flex-shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span className="text-gray-200">Private project workspaces</span>
            </li>
          </ul>
          <Link
            href="/join"
            className="inline-block bg-white text-gray-900 font-bold px-6 py-3 rounded-full hover:bg-gray-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900">
            Start Building
          </Link>
        </div>

        {/* For Investors */}
        <div
          id="for-investors"
          className="bg-gray-100 rounded-3xl p-10 md:p-14 text-gray-900 border border-gray-200 hover:scale-[1.01] transition-transform duration-300">
          <h3 className="text-sm font-bold text-gray-500 tracking-widest uppercase mb-4">
            For Investors
          </h3>
          <h2 className="text-3xl font-bold mb-6 text-balance">
            Spot the best teams before they even pitch.
          </h2>
          <p className="text-gray-600 mb-8 text-lg leading-relaxed text-pretty">
            Deal flow is noisy. CoFound gives you a window into execution. See
            which teams are consistently shipping week over week before you
            write the check.
          </p>
          <ul className="space-y-4 mb-10">
            <li className="flex items-start gap-3">
              <svg
                aria-hidden="true"
                className="w-6 h-6 text-gray-400 flex-shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
              <span className="text-gray-600">
                Access to weekly progress logs
              </span>
            </li>
            <li className="flex items-start gap-3">
              <svg
                aria-hidden="true"
                className="w-6 h-6 text-gray-400 flex-shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                />
              </svg>
              <span className="text-gray-600">
                Track traction metrics early
              </span>
            </li>
            <li className="flex items-start gap-3">
              <svg
                aria-hidden="true"
                className="w-6 h-6 text-gray-400 flex-shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <span className="text-gray-600">
                Scout pre-seed opportunities
              </span>
            </li>
          </ul>
          <Link
            href="/investors"
            className="inline-block border-2 border-gray-900 text-gray-900 font-bold px-6 py-3 rounded-full hover:bg-gray-900 hover:text-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2">
            Join Investor Network
          </Link>
        </div>
      </div>
    </section>
  );
}
