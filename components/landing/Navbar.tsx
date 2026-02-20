import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link
              href="/"
              className="flex items-center font-bold text-2xl tracking-tight text-orange-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6154] focus-visible:ring-offset-2 rounded-lg p-1"
              passHref>
              <Image
                src="/logo.svg"
                alt="CoFound Logo"
                width={64}
                height={64}
                className="mr-2 inline"
              />
              CoFound
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="#how-it-works"
              className="text-gray-600 hover:text-[#FF6154] transition-colors font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6154] focus-visible:ring-offset-2 rounded px-2 py-1">
              How It Works
            </Link>
            <Link
              href="#for-founders"
              className="text-gray-600 hover:text-[#FF6154] transition-colors font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6154] focus-visible:ring-offset-2 rounded px-2 py-1">
              For Founders
            </Link>
            <Link
              href="#for-investors"
              className="text-gray-600 hover:text-[#FF6154] transition-colors font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6154] focus-visible:ring-offset-2 rounded px-2 py-1">
              For Investors
            </Link>
            <Link
              href="/join"
              className="bg-[#FF6154] hover:bg-[#ff4f40] text-white px-5 py-2 rounded-full font-medium transition-all shadow-sm hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6154] focus-visible:ring-offset-2">
              Get Started
            </Link>
          </div>
          {/* Mobile menu button placeholder logic could go here, keeping it simple for MVP */}
          <div className="md:hidden flex items-center">
            <Link
              href="/join"
              className="bg-[#FF6154] text-white px-4 py-1.5 rounded-full text-sm font-medium">
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
