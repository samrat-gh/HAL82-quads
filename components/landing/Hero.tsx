import Link from "next/link";

export default function Hero() {
  return (
    <section className="mx-auto max-w-7xl px-4 pt-32 pb-20 text-center sm:px-6 md:pt-40 md:pb-28 lg:px-8">
      <h1 className="mx-auto mb-6 max-w-4xl text-balance font-bold text-5xl text-gray-900 leading-tight tracking-tight md:text-6xl lg:text-7xl">
        Find the Right Co-Founder. <br className="hidden md:block" />
        <span className="text-[#FF6154]">Build With Alignment.</span>
      </h1>
      <p className="mx-auto mb-10 max-w-2xl text-balance text-gray-600 text-xl leading-relaxed md:text-2xl">
        Stop guessing. Match based on complementary skills, shared vision, and
        working style compatibility.
      </p>
      <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
        <Link
          href="/join"
          className="w-full rounded-full bg-[#FF6154] px-8 py-4 font-semibold text-lg text-white shadow-lg transition-all hover:bg-[#ff4f40] hover:shadow-[#FF6154]/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6154] focus-visible:ring-offset-2 sm:w-auto"
        >
          Get Started
        </Link>
        <Link
          href="#how-it-works"
          className="w-full rounded-full border-2 border-gray-200 bg-white px-8 py-4 font-semibold text-gray-900 text-lg transition-all hover:border-gray-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-300 focus-visible:ring-offset-2 sm:w-auto"
        >
          Learn More
        </Link>
      </div>

      {/* Hero Visual */}
      <div className="relative mx-auto mt-20 max-w-5xl">
        <div className="relative overflow-hidden rounded-3xl border border-gray-100 bg-gray-50 p-4 shadow-2xl shadow-gray-100/50 md:p-8">
          {/* Subtle background pattern */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: "radial-gradient(#000 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          ></div>

          <div className="relative flex flex-col items-center justify-center gap-6 py-12 md:flex-row md:gap-12 md:py-20">
            {/* Founder Profile Card 1 */}
            <div className="-rotate-3 w-64 transform rounded-2xl border border-gray-100 bg-white p-6 shadow-lg transition-transform duration-500 ease-out hover:z-10 hover:rotate-0 md:w-72">
              <div className="mb-4 flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-600 text-lg">
                  JD
                </div>
                <div>
                  <div className="font-bold text-gray-900">John Doe</div>
                  <div className="font-medium text-gray-500 text-xs tracking-wide">
                    Founder@FinLabs
                  </div>
                </div>
              </div>
              <div className="mb-4 space-y-2">
                <div className="flex flex-wrap gap-2">
                  <span className="rounded bg-gray-100 px-2 py-1 font-medium text-gray-600 text-xs">
                    Strategist
                  </span>
                  <span className="rounded bg-gray-100 px-2 py-1 font-medium text-gray-600 text-xs">
                    Marketting
                  </span>
                  <span className="rounded bg-gray-100 px-2 py-1 font-medium text-gray-600 text-xs">
                    System Design
                  </span>
                </div>
              </div>
              <div className="text-gray-400 text-xs">
                Looking for: Founding Engineer
              </div>
            </div>

            {/* Connection Badge */}
            <div className="z-10 scale-110 transform animate-pulse rounded-full border border-gray-100 bg-white p-2 shadow-xl md:absolute">
              <div className="flex items-center gap-2 rounded-full bg-green-50 px-4 py-2 font-bold text-green-700">
                <svg
                  className="h-4 w-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                98% Match
              </div>
            </div>

            {/* Founder Profile Card 2 */}
            <div className="w-64 rotate-3 transform rounded-2xl border border-gray-100 bg-white p-6 shadow-lg transition-transform duration-500 ease-out hover:z-10 hover:rotate-0 md:w-72">
              <div className="mb-4 flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#FF6154]/20 font-bold text-[#FF6154] text-lg">
                  AS
                </div>
                <div>
                  <div className="font-bold text-gray-900">Sarah Smith</div>
                  <div className="font-medium text-gray-500 text-xs uppercase tracking-wide">
                    Product & Sales
                  </div>
                </div>
              </div>
              <div className="mb-4 space-y-2">
                <div className="flex flex-wrap gap-2">
                  <span className="rounded bg-gray-100 px-2 py-1 font-medium text-gray-600 text-xs">
                    Fullstack Dev
                  </span>
                  <span className="rounded bg-gray-100 px-2 py-1 font-medium text-gray-600 text-xs">
                    Indie Dev
                  </span>
                  <span className="rounded bg-gray-100 px-2 py-1 font-medium text-gray-600 text-xs">
                    Product
                  </span>
                </div>
              </div>
              <div className="text-gray-400 text-xs">
                Looking for: Opportunities
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
