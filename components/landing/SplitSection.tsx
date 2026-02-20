import Link from "next/link";

export default function SplitSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="grid gap-8 md:grid-cols-2 lg:gap-12">
        {/* For Founders */}
        <div
          id="for-founders"
          className="rounded-3xl bg-gray-900 p-10 text-white transition-transform duration-300 hover:scale-[1.01] md:p-14"
        >
          <h3 className="mb-4 font-bold text-[#FF6154] text-sm uppercase tracking-widest">
            For Founders
          </h3>
          <h2 className="mb-6 text-balance font-bold text-3xl">
            Stop wasting time on coffee chats that go nowhere.
          </h2>
          <p className="mb-8 text-pretty text-gray-300 text-lg leading-relaxed">
            Traditional networking feels like dating apps—superficial and
            exhausting. We help you skip the small talk and get straight to
            building with someone who gets it.
          </p>
          <ul className="mb-10 space-y-4">
            <li className="flex items-start gap-3">
              <svg
                aria-hidden="true"
                className="h-6 w-6 flex-shrink-0 text-[#FF6154]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
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
                className="h-6 w-6 flex-shrink-0 text-[#FF6154]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
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
                className="h-6 w-6 flex-shrink-0 text-[#FF6154]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
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
            className="inline-block rounded-full bg-white px-6 py-3 font-bold text-gray-900 transition-colors hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900"
          >
            Start Building
          </Link>
        </div>

        {/* For Investors */}
        <div
          id="for-investors"
          className="rounded-3xl border border-gray-200 bg-gray-100 p-10 text-gray-900 transition-transform duration-300 hover:scale-[1.01] md:p-14"
        >
          <h3 className="mb-4 font-bold text-gray-500 text-sm uppercase tracking-widest">
            For Investors
          </h3>
          <h2 className="mb-6 text-balance font-bold text-3xl">
            Spot the best teams before they even pitch.
          </h2>
          <p className="mb-8 text-pretty text-gray-600 text-lg leading-relaxed">
            Deal flow is noisy. CoFound gives you a window into execution. See
            which teams are consistently shipping week over week before you
            write the check.
          </p>
          <ul className="mb-10 space-y-4">
            <li className="flex items-start gap-3">
              <svg
                aria-hidden="true"
                className="h-6 w-6 flex-shrink-0 text-gray-400"
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
              <span className="text-gray-600">
                Access to weekly progress logs
              </span>
            </li>
            <li className="flex items-start gap-3">
              <svg
                aria-hidden="true"
                className="h-6 w-6 flex-shrink-0 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
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
                className="h-6 w-6 flex-shrink-0 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
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
            className="inline-block rounded-full border-2 border-gray-900 px-6 py-3 font-bold text-gray-900 transition-all hover:bg-gray-900 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2"
          >
            Join Investor Network
          </Link>
        </div>
      </div>
    </section>
  );
}
