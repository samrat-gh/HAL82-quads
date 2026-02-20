"use client";

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { DashboardNav } from "@/components/dashboard-nav";

export default function SettingsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [matchAlerts, setMatchAlerts] = useState(true);
  const [weeklyDigest, setWeeklyDigest] = useState(false);
  const [profileVisibility, setProfileVisibility] = useState("public");

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

      {/* Settings Content */}
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-balance font-bold text-4xl text-gray-900">
            Settings
          </h1>
          <p className="mt-2 text-pretty text-gray-600">
            Manage your account settings and preferences
          </p>
        </div>

        {/* Settings Sections */}
        <div className="space-y-6">
          {/* Notifications Settings */}
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <h2 className="mb-6 font-bold text-gray-900 text-xl">
              Notifications
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">
                    Email Notifications
                  </p>
                  <p className="text-gray-500 text-sm">
                    Receive email updates about your account
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setEmailNotifications(!emailNotifications)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6154] focus-visible:ring-offset-2 ${
                    emailNotifications ? "bg-[#FF6154]" : "bg-gray-200"
                  }`}>
                  <span
                    className={`inline-block h-4 w-4 rounded-full bg-white transition-transform ${
                      emailNotifications ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Match Alerts</p>
                  <p className="text-gray-500 text-sm">
                    Get notified when you have new matches
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setMatchAlerts(!matchAlerts)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6154] focus-visible:ring-offset-2 ${
                    matchAlerts ? "bg-[#FF6154]" : "bg-gray-200"
                  }`}>
                  <span
                    className={`inline-block h-4 w-4 rounded-full bg-white transition-transform ${
                      matchAlerts ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Weekly Digest</p>
                  <p className="text-gray-500 text-sm">
                    Receive a weekly summary of your activity
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setWeeklyDigest(!weeklyDigest)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6154] focus-visible:ring-offset-2 ${
                    weeklyDigest ? "bg-[#FF6154]" : "bg-gray-200"
                  }`}>
                  <span
                    className={`inline-block h-4 w-4 rounded-full bg-white transition-transform ${
                      weeklyDigest ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Privacy Settings */}
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <h2 className="mb-6 font-bold text-gray-900 text-xl">
              Privacy & Visibility
            </h2>
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="visibility"
                  className="mb-2 block font-medium text-gray-900">
                  Profile Visibility
                </label>
                <select
                  id="visibility"
                  value={profileVisibility}
                  onChange={(e) => setProfileVisibility(e.target.value)}
                  className="w-full rounded-lg border border-gray-200 px-4 py-3 text-gray-900 transition-all focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#FF6154]">
                  <option value="public">Public - Visible to everyone</option>
                  <option value="members">
                    Members Only - Visible to registered users
                  </option>
                  <option value="private">
                    Private - Only visible by direct link
                  </option>
                </select>
                <p className="mt-2 text-gray-500 text-sm">
                  Control who can see your profile information
                </p>
              </div>
            </div>
          </div>

          {/* Preferences */}
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <h2 className="mb-6 font-bold text-gray-900 text-xl">
              Preferences
            </h2>
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="language"
                  className="mb-2 block font-medium text-gray-900">
                  Language
                </label>
                <select
                  id="language"
                  className="w-full rounded-lg border border-gray-200 px-4 py-3 text-gray-900 transition-all focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#FF6154]">
                  <option value="en">English</option>
                  <option value="es">Spanish</option>
                  <option value="fr">French</option>
                  <option value="de">German</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="timezone"
                  className="mb-2 block font-medium text-gray-900">
                  Timezone
                </label>
                <select
                  id="timezone"
                  className="w-full rounded-lg border border-gray-200 px-4 py-3 text-gray-900 transition-all focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#FF6154]">
                  <option value="UTC">UTC (Coordinated Universal Time)</option>
                  <option value="PST">PST (Pacific Standard Time)</option>
                  <option value="EST">EST (Eastern Standard Time)</option>
                  <option value="GMT">GMT (Greenwich Mean Time)</option>
                  <option value="IST">IST (Indian Standard Time)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end">
            <button
              type="button"
              className="rounded-lg bg-[#FF6154] px-6 py-3 font-semibold text-white shadow-sm transition-all hover:bg-[#ff4f40] hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6154] focus-visible:ring-offset-2">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
