export default function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-gray-50 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-balance font-bold text-3xl text-gray-900 md:text-4xl">
            How CoFound Works
          </h2>
          <p className="mx-auto max-w-2xl text-pretty text-gray-600 text-lg">
            From signup to your first commit, we streamline the process.
          </p>
        </div>

        <div className="relative grid gap-12 text-center md:grid-cols-3">
          {/* Connecting Line (Desktop) */}
          <div className="-z-10 absolute top-12 right-[16%] left-[16%] hidden h-0.5 bg-gray-200 md:block"></div>

          <div>
            <div className="relative z-10 mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full border-4 border-white bg-white shadow-md">
              <span className="font-bold text-3xl text-[#FF6154]">1</span>
            </div>
            <h3 className="mb-3 font-bold text-gray-900 text-xl">
              Create Profile
            </h3>
            <p className="px-4 text-gray-600">
              Highlight your core skills, past projects, and what you're looking
              to build.
            </p>
          </div>

          <div>
            <div className="relative z-10 mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full border-4 border-white bg-white shadow-md">
              <span className="font-bold text-3xl text-[#FF6154]">2</span>
            </div>
            <h3 className="mb-3 font-bold text-gray-900 text-xl">
              Vibe Assessment
            </h3>
            <p className="px-4 text-gray-600">
              Take our quick psychological and working style test to understand
              your collaboration DNA.
            </p>
          </div>

          <div>
            <div className="relative z-10 mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full border-4 border-white bg-white shadow-md">
              <span className="font-bold text-3xl text-[#FF6154]">3</span>
            </div>
            <h3 className="mb-3 font-bold text-gray-900 text-xl">
              Match & Build
            </h3>
            <p className="px-4 text-gray-600">
              Connect with high-compatibility founders and start logging weekly
              progress.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
