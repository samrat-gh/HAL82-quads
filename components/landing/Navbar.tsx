import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="fixed top-0 z-50 w-full border-gray-100 border-b bg-white/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex flex-shrink-0 items-center">
            <Link
              href="/"
              className="flex items-center rounded-lg p-1 font-bold text-2xl text-orange-600 tracking-tight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6154] focus-visible:ring-offset-2"
              passHref
            >
              <Image
                src="/logo.svg"
                alt="CoFound Logo"
                width={64}
                height={64}
                className="inline"
              />
              CoFound
            </Link>
          </div>
          <div className="hidden items-center space-x-8 md:flex">
            <Link
              href="#how-it-works"
              className="rounded px-2 py-1 font-medium text-gray-600 transition-colors hover:text-[#FF6154] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6154] focus-visible:ring-offset-2"
            >
              How It Works
            </Link>
            <Link
              href="#for-founders"
              className="rounded px-2 py-1 font-medium text-gray-600 transition-colors hover:text-[#FF6154] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6154] focus-visible:ring-offset-2"
            >
              For Founders
            </Link>
            <Link
              href="#for-investors"
              className="rounded px-2 py-1 font-medium text-gray-600 transition-colors hover:text-[#FF6154] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6154] focus-visible:ring-offset-2"
            >
              For Investors
            </Link>
            <Link
              href="/join"
              className="rounded-full bg-[#FF6154] px-5 py-2 font-medium text-white shadow-sm transition-all hover:bg-[#ff4f40] hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6154] focus-visible:ring-offset-2"
            >
              Get Started
            </Link>
          </div>
          {/* Mobile menu button placeholder logic could go here, keeping it simple for MVP */}
          <div className="flex items-center md:hidden">
            <Link
              href="/join"
              className="rounded-full bg-[#FF6154] px-4 py-1.5 font-medium text-sm text-white"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
