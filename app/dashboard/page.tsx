"use client";

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { DashboardNav } from "@/components/dashboard-nav";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/join");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <div className="text-center">
          <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-[#FF6154] border-t-transparent"></div>
          <p className="mt-4 text-gray-600">Loading…</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-white">
      <DashboardNav />

      {/* Dashboard Content */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="mb-3 font-bold text-4xl text-gray-900">
            Welcome, {session.user?.name}!
          </h1>
          <p className="text-gray-600 text-lg">
            You're successfully logged in to CoFound.
          </p>
          <p className="mt-2 text-gray-500 text-sm">
            Role:{" "}
            <span className="font-medium text-gray-700 capitalize">
              {session.user?.role}
            </span>
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-[#FF6154]/10">
              <svg
                className="h-6 w-6 text-[#FF6154]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
            <h3 className="mb-2 font-bold text-gray-900 text-lg">
              Complete Your Profile
            </h3>
            <p className="text-gray-600 text-sm">
              Add your skills, experience, and what you're looking for in a
              co-founder.
            </p>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50">
              <svg
                className="h-6 w-6 text-blue-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                />
              </svg>
            </div>
            <h3 className="mb-2 font-bold text-gray-900 text-lg">
              Take Assessment
            </h3>
            <p className="text-gray-600 text-sm">
              Complete the vibe assessment to find your best matches.
            </p>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-green-50">
              <svg
                className="h-6 w-6 text-green-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            <h3 className="mb-2 font-bold text-gray-900 text-lg">
              Browse Matches
            </h3>
            <p className="text-gray-600 text-sm">
              Discover co-founders who complement your skills and vision.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
