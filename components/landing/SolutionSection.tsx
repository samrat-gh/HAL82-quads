export default function SolutionSection() {
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <div>
            <h2 className="mb-3 font-semibold text-[#FF6154] text-base uppercase tracking-wide">
              The Solution
            </h2>
            <h3 className="mb-6 text-balance font-bold text-3xl text-gray-900 leading-tight md:text-4xl">
              A platform designed for serious builders.
            </h3>
            <p className="mb-8 text-pretty text-gray-600 text-lg">
              We focus on the metrics that actually matter for a successful
              partnership, removing the noise of traditional networking.
            </p>

            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[#FF6154] font-bold text-sm text-white">
                  1
                </div>
                <div>
                  <h4 className="mb-2 font-semibold text-gray-900 text-xl">
                    Compatibility-Based Matching
                  </h4>
                  <p className="text-gray-600">
                    Our algorithm pairs you based on working style assessments,
                    not just keywords in a bio.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[#FF6154] font-bold text-sm text-white">
                  2
                </div>
                <div>
                  <h4 className="mb-2 font-semibold text-gray-900 text-xl">
                    Structured Progress Logs
                  </h4>
                  <p className="text-gray-600">
                    See potential partners' weekly updates. Verify their
                    consistency before you commit to equity.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[#FF6154] font-bold text-sm text-white">
                  3
                </div>
                <div>
                  <h4 className="mb-2 font-semibold text-gray-900 text-xl">
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

          <div className="relative rounded-2xl border border-gray-100 bg-gray-50 p-8">
            {/* Simple decorative grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
                <div className="mb-4 h-2 w-16 rounded bg-gray-200"></div>
                <div className="mb-2 h-2 w-full rounded bg-gray-100"></div>
                <div className="h-2 w-2/3 rounded bg-gray-100"></div>
              </div>
              <div className="mt-8 rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
                <div className="mb-4 h-2 w-16 rounded bg-[#FF6154]/20"></div>
                <div className="mb-2 h-2 w-full rounded bg-gray-100"></div>
                <div className="h-2 w-2/3 rounded bg-gray-100"></div>
              </div>
              <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
                <div className="mb-4 h-2 w-16 rounded bg-gray-200"></div>
                <div className="mb-2 h-2 w-full rounded bg-gray-100"></div>
                <div className="h-2 w-2/3 rounded bg-gray-100"></div>
              </div>
              <div className="mt-8 rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
                <div className="mb-4 h-2 w-16 rounded bg-[#FF6154]/20"></div>
                <div className="mb-2 h-2 w-full rounded bg-gray-100"></div>
                <div className="h-2 w-2/3 rounded bg-gray-100"></div>
              </div>
            </div>
            {/* Overlay badge */}
            <div className="-translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2 rounded-full border border-gray-100 bg-white px-6 py-3 text-center shadow-xl">
              <span className="block font-bold text-gray-900 text-lg">
                Weekly Updates
              </span>
              <span className="font-medium text-gray-500 text-xs uppercase tracking-widest">
                Verified
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
