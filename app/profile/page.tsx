"use client";

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { DashboardNav } from "@/components/dashboard-nav";

interface Profile {
  websiteUrl?: string;
  socialTwitter?: string;
  socialLinkedIn?: string;
  socialGithub?: string;
  socialInstagram?: string;
  currentUsers?: number;
  monthlyTraffic?: number;
  monthlyRevenue?: number;
}

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/join");
    }
  }, [status, router]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch("/api/profile");
        if (response.ok) {
          const data = await response.json();
          setProfile(data.profile);
        }
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (status === "authenticated") {
      fetchProfile();
    }
  }, [status]);

  if (status === "loading" || isLoading) {
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

      {/* Profile Content */}
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-balance font-bold text-4xl text-gray-900">
            Profile
          </h1>
          <p className="mt-2 text-pretty text-gray-600">
            Manage your account information and preferences
          </p>
        </div>

        {/* Profile Information */}
        <div className="space-y-6">
          {/* Personal Information Card */}
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="font-bold text-gray-900 text-xl">
                Personal Information
              </h2>
              <button
                type="button"
                onClick={() => router.push("/profile/create")}
                className="rounded-lg bg-[#FF6154] px-4 py-2 font-medium text-sm text-white transition-colors hover:bg-[#ff4f40] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6154] focus-visible:ring-offset-2">
                Edit Profile
              </button>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <div className="block font-medium text-gray-500 text-sm">
                  First Name
                </div>
                <p className="mt-1 text-gray-900">
                  {session.user?.name?.split(" ")[0] || "N/A"}
                </p>
              </div>

              <div>
                <div className="block font-medium text-gray-500 text-sm">
                  Last Name
                </div>
                <p className="mt-1 text-gray-900">
                  {session.user?.name?.split(" ").slice(1).join(" ") || "N/A"}
                </p>
              </div>

              <div>
                <div className="block font-medium text-gray-500 text-sm">
                  Email Address
                </div>
                <p className="mt-1 text-gray-900">{session.user?.email}</p>
              </div>

              <div>
                <div className="block font-medium text-gray-500 text-sm">
                  Role
                </div>
                <p className="mt-1 text-gray-900 capitalize">
                  {session.user?.role || "N/A"}
                </p>
              </div>

              <div>
                <div className="block font-medium text-gray-500 text-sm">
                  User ID
                </div>
                <p className="mt-1 font-mono text-gray-900 text-sm">
                  {session.user?.id}
                </p>
              </div>
            </div>
          </div>

          {/* Venture Profile Card */}
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="font-bold text-gray-900 text-xl">
                Venture Profile
              </h2>
              <button
                type="button"
                onClick={() => router.push("/profile/create")}
                className="rounded-lg border border-gray-200 px-4 py-2 font-medium text-gray-700 text-sm transition-colors hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6154] focus-visible:ring-offset-2">
                {profile ? "Edit" : "Add Details"}
              </button>
            </div>

            {profile ? (
              <div className="space-y-6">
                {/* Website */}
                {profile.websiteUrl && (
                  <div>
                    <div className="block font-medium text-gray-500 text-sm">
                      Website
                    </div>
                    <a
                      href={profile.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 inline-flex items-center text-[#FF6154] hover:underline">
                      {profile.websiteUrl}
                      <svg
                        className="ml-1 h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                    </a>
                  </div>
                )}

                {/* Social Links */}
                {(profile.socialTwitter ||
                  profile.socialLinkedIn ||
                  profile.socialGithub ||
                  profile.socialInstagram) && (
                  <div>
                    <div className="mb-3 block font-medium text-gray-500 text-sm">
                      Social Media
                    </div>
                    <div className="flex flex-wrap gap-3">
                      {profile.socialTwitter && (
                        <a
                          href={profile.socialTwitter}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2 text-gray-700 text-sm transition-colors hover:bg-gray-50">
                          Twitter
                        </a>
                      )}
                      {profile.socialLinkedIn && (
                        <a
                          href={profile.socialLinkedIn}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2 text-gray-700 text-sm transition-colors hover:bg-gray-50">
                          LinkedIn
                        </a>
                      )}
                      {profile.socialGithub && (
                        <a
                          href={profile.socialGithub}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2 text-gray-700 text-sm transition-colors hover:bg-gray-50">
                          GitHub
                        </a>
                      )}
                      {profile.socialInstagram && (
                        <a
                          href={profile.socialInstagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2 text-gray-700 text-sm transition-colors hover:bg-gray-50">
                          Instagram
                        </a>
                      )}
                    </div>
                  </div>
                )}

                {/* Metrics */}
                {(profile.currentUsers ||
                  profile.monthlyTraffic ||
                  profile.monthlyRevenue) && (
                  <div>
                    <div className="mb-3 block font-medium text-gray-500 text-sm">
                      Metrics
                    </div>
                    <div className="grid gap-4 sm:grid-cols-3">
                      {profile.currentUsers && (
                        <div className="rounded-lg border border-gray-100 bg-gray-50 p-4">
                          <p className="font-semibold text-2xl text-gray-900">
                            {profile.currentUsers.toLocaleString()}
                          </p>
                          <p className="text-gray-600 text-sm">Users</p>
                        </div>
                      )}
                      {profile.monthlyTraffic && (
                        <div className="rounded-lg border border-gray-100 bg-gray-50 p-4">
                          <p className="font-semibold text-2xl text-gray-900">
                            {profile.monthlyTraffic.toLocaleString()}
                          </p>
                          <p className="text-gray-600 text-sm">
                            Monthly Visitors
                          </p>
                        </div>
                      )}
                      {profile.monthlyRevenue && (
                        <div className="rounded-lg border border-gray-100 bg-gray-50 p-4">
                          <p className="font-semibold text-2xl text-gray-900">
                            ${profile.monthlyRevenue.toLocaleString()}
                          </p>
                          <p className="text-gray-600 text-sm">
                            Monthly Revenue
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="py-8 text-center">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                <p className="mt-4 font-medium text-gray-900">
                  No venture profile yet
                </p>
                <p className="mt-1 text-gray-600 text-sm">
                  Add your website, social links, and metrics to showcase your
                  venture
                </p>
                <button
                  type="button"
                  onClick={() => router.push("/profile/create")}
                  className="mt-4 rounded-lg bg-[#FF6154] px-6 py-2 font-medium text-sm text-white transition-colors hover:bg-[#ff4f40] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6154] focus-visible:ring-offset-2">
                  Create Profile
                </button>
              </div>
            )}
          </div>

          {/* Profile Avatar Card */}
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <h2 className="mb-4 font-bold text-gray-900 text-xl">
              Profile Avatar
            </h2>
            <div className="flex items-center gap-6">
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-[#FF6154] font-bold text-3xl text-white">
                {session.user?.name?.charAt(0).toUpperCase() || "U"}
              </div>
              <div>
                <p className="mb-2 text-gray-600 text-sm">
                  Your avatar is generated from your initials
                </p>
                <button
                  type="button"
                  className="rounded-lg border border-gray-200 px-4 py-2 font-medium text-gray-700 text-sm transition-colors hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6154] focus-visible:ring-offset-2">
                  Upload Photo
                </button>
              </div>
            </div>
          </div>

          {/* Account Actions Card */}
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <h2 className="mb-4 font-bold text-gray-900 text-xl">
              Account Actions
            </h2>
            <div className="space-y-3">
              <button
                type="button"
                className="w-full rounded-lg border border-gray-200 px-4 py-3 text-left transition-colors hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6154] focus-visible:ring-offset-2">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">Change Password</p>
                    <p className="text-gray-500 text-sm">
                      Update your password to keep your account secure
                    </p>
                  </div>
                  <svg
                    className="h-5 w-5 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </button>

              <button
                type="button"
                className="w-full rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-left transition-colors hover:bg-red-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-red-900">Delete Account</p>
                    <p className="text-red-700 text-sm">
                      Permanently delete your account and all data
                    </p>
                  </div>
                  <svg
                    className="h-5 w-5 text-red-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
