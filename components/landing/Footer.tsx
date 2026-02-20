import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex flex-col items-center md:items-start">
          <span className="font-bold text-2xl tracking-tight text-gray-900 mb-2">
            CoFound
          </span>
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} CoFound Inc.
          </p>
        </div>

        <div className="flex gap-8 text-sm text-gray-600">
          <Link
            href="/privacy"
            className="hover:text-gray-900 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 rounded px-1">
            Privacy Policy
          </Link>
          <Link
            href="/terms"
            className="hover:text-gray-900 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 rounded px-1">
            Terms of Service
          </Link>
          <Link
            href="mailto:hello@cofound.example"
            className="hover:text-gray-900 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 rounded px-1">
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
}
