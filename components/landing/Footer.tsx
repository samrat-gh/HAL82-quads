import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-gray-100 border-t bg-white py-12">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-4 sm:px-6 md:flex-row lg:px-8">
        <div className="flex flex-col items-center md:items-start">
          <span className="mb-2 font-bold text-2xl text-gray-900 tracking-tight">
            CoFound
          </span>
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} CoFound Inc.
          </p>
        </div>

        <div className="flex gap-8 text-gray-600 text-sm">
          <Link
            href="/privacy"
            className="rounded px-1 transition-colors hover:text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900"
          >
            Privacy Policy
          </Link>
          <Link
            href="/terms"
            className="rounded px-1 transition-colors hover:text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900"
          >
            Terms of Service
          </Link>
          <Link
            href="mailto:hello@cofound.example"
            className="rounded px-1 transition-colors hover:text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900"
          >
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
}
