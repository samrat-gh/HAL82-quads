export default function ProblemSection() {
  return (
    <section className="bg-gray-50 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <h2 className="mb-3 font-semibold text-[#FF6154] text-base uppercase tracking-wide">
            The Problem
          </h2>
          <p className="mb-4 font-bold text-3xl text-gray-900 md:text-4xl">
            Why do 65% of startups fail?
          </p>
          <p className="text-gray-600 text-lg">
            It's not the market. It's not the product. It's often the
            people—specifically, co-founder conflict.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {/* Card 1 */}
          <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm transition-shadow hover:shadow-md">
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-lg bg-red-50">
              <svg
                aria-hidden="true"
                className="h-6 w-6 text-red-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <h3 className="mb-3 text-balance font-bold text-gray-900 text-xl">
              Skill Mismatch
            </h3>
            <p className="text-pretty text-gray-600 leading-relaxed">
              Two visionary CEOs with no technical talent, or two engineers with
              no sales skills. Building requires complementary capabilities.
            </p>
          </div>

          {/* Card 2 */}
          <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm transition-shadow hover:shadow-md">
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-lg bg-orange-50">
              <svg
                aria-hidden="true"
                className="h-6 w-6 text-orange-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
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
            </div>
            <h3 className="mb-3 text-balance font-bold text-gray-900 text-xl">
              Vision Misalignment
            </h3>
            <p className="text-pretty text-gray-600 leading-relaxed">
              Different long-term goals or definitions of success lead to
              friction when tough decisions need to be made.
            </p>
          </div>

          {/* Card 3 */}
          <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm transition-shadow hover:shadow-md">
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-lg bg-gray-100">
              <svg
                aria-hidden="true"
                className="h-6 w-6 text-gray-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                />
              </svg>
            </div>
            <h3 className="mb-3 text-balance font-bold text-gray-900 text-xl">
              Execution Gaps
            </h3>
            <p className="text-pretty text-gray-600 leading-relaxed">
              Without structured progress tracking, it's hard to know if your
              potential partner can actually deliver on their promises.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
