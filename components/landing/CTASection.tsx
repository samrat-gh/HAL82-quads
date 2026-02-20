import Link from "next/link";

export default function CTASection() {
  return (
    <section className="bg-white py-20 md:py-32">
      <div className="mx-auto max-w-4xl px-4 text-center">
        <h2 className="mb-6 text-balance font-bold text-4xl text-gray-900 tracking-tight md:text-5xl">
          Ready to build something <span className="text-[#FF6154]">real</span>?
        </h2>
        <p className="mx-auto mb-10 max-w-2xl text-balance text-gray-600 text-xl">
          Join a community of serious builders who are tired of playing startup
          and ready to execute.
        </p>
        <Link
          href="/join"
          className="hover:-translate-y-1 inline-block rounded-full bg-[#FF6154] px-10 py-5 font-bold text-white text-xl shadow-xl transition-all hover:bg-[#ff4f40] hover:shadow-[#FF6154]/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6154] focus-visible:ring-offset-2"
        >
          Get Started
        </Link>
      </div>
    </section>
  );
}
