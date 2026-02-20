"use client";

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { DashboardNav } from "@/components/dashboard-nav";

interface ProfileData {
  websiteUrl: string;
  socialTwitter: string;
  socialLinkedIn: string;
  socialGithub: string;
  socialInstagram: string;
  currentUsers: string;
  monthlyTraffic: string;
  monthlyRevenue: string;
}

export default function CreateProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [formData, setFormData] = useState<ProfileData>({
    websiteUrl: "",
    socialTwitter: "",
    socialLinkedIn: "",
    socialGithub: "",
    socialInstagram: "",
    currentUsers: "",
    monthlyTraffic: "",
    monthlyRevenue: "",
  });

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
          if (data.profile) {
            setFormData({
              websiteUrl: data.profile.websiteUrl || "",
              socialTwitter: data.profile.socialTwitter || "",
              socialLinkedIn: data.profile.socialLinkedIn || "",
              socialGithub: data.profile.socialGithub || "",
              socialInstagram: data.profile.socialInstagram || "",
              currentUsers: data.profile.currentUsers?.toString() || "",
              monthlyTraffic: data.profile.monthlyTraffic?.toString() || "",
              monthlyRevenue: data.profile.monthlyRevenue?.toString() || "",
            });
          }
        }
      } catch (err) {
        console.error("Failed to fetch profile:", err);
      } finally {
        setIsFetching(false);
      }
    };

    if (status === "authenticated") {
      fetchProfile();
    }
  }, [status]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to save profile");
      }

      setSuccess("Profile saved successfully!");
      setTimeout(() => {
        router.push("/profile");
      }, 1500);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  if (status === "loading" || isFetching) {
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

      {/* Profile Form Content */}
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-balance font-bold text-4xl text-gray-900">
            Create Your Profile
          </h1>
          <p className="mt-2 text-pretty text-gray-600">
            Share information about your project and metrics to help potential
            co-founders understand your venture
          </p>
        </div>

        {/* Profile Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          {error && (
            <div className="rounded-lg bg-red-50 px-4 py-3 font-medium text-red-600 text-sm">
              {error}
            </div>
          )}

          {success && (
            <div className="rounded-lg bg-green-50 px-4 py-3 font-medium text-green-600 text-sm">
              {success}
            </div>
          )}

          {/* Website Information */}
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <h2 className="mb-6 font-bold text-gray-900 text-xl">
              Website Information
            </h2>

            <div className="space-y-5">
              <div>
                <label
                  htmlFor="websiteUrl"
                  className="mb-2 block font-semibold text-gray-900 text-sm">
                  Website URL
                </label>
                <input
                  id="websiteUrl"
                  name="websiteUrl"
                  type="url"
                  value={formData.websiteUrl}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-200 px-4 py-3 text-gray-900 transition-all focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#FF6154]"
                  placeholder="https://example.com"
                />
              </div>
            </div>
          </div>

          {/* Social Media Links */}
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <h2 className="mb-6 font-bold text-gray-900 text-xl">
              Social Media
            </h2>

            <div className="space-y-5">
              <div>
                <label
                  htmlFor="socialTwitter"
                  className="mb-2 block font-semibold text-gray-900 text-sm">
                  Twitter / X
                </label>
                <input
                  id="socialTwitter"
                  name="socialTwitter"
                  type="url"
                  value={formData.socialTwitter}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-200 px-4 py-3 text-gray-900 transition-all focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#FF6154]"
                  placeholder="https://twitter.com/username"
                />
              </div>

              <div>
                <label
                  htmlFor="socialLinkedIn"
                  className="mb-2 block font-semibold text-gray-900 text-sm">
                  LinkedIn
                </label>
                <input
                  id="socialLinkedIn"
                  name="socialLinkedIn"
                  type="url"
                  value={formData.socialLinkedIn}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-200 px-4 py-3 text-gray-900 transition-all focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#FF6154]"
                  placeholder="https://linkedin.com/in/username"
                />
              </div>

              <div>
                <label
                  htmlFor="socialGithub"
                  className="mb-2 block font-semibold text-gray-900 text-sm">
                  GitHub
                </label>
                <input
                  id="socialGithub"
                  name="socialGithub"
                  type="url"
                  value={formData.socialGithub}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-200 px-4 py-3 text-gray-900 transition-all focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#FF6154]"
                  placeholder="https://github.com/username"
                />
              </div>

              <div>
                <label
                  htmlFor="socialInstagram"
                  className="mb-2 block font-semibold text-gray-900 text-sm">
                  Instagram
                </label>
                <input
                  id="socialInstagram"
                  name="socialInstagram"
                  type="url"
                  value={formData.socialInstagram}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-200 px-4 py-3 text-gray-900 transition-all focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#FF6154]"
                  placeholder="https://instagram.com/username"
                />
              </div>
            </div>
          </div>

          {/* Metrics (Optional) */}
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <h2 className="mb-2 font-bold text-gray-900 text-xl">
              Metrics{" "}
              <span className="font-normal text-gray-500">(Optional)</span>
            </h2>
            <p className="mb-6 text-gray-600 text-sm">
              Share your current traction to help showcase your progress
            </p>

            <div className="space-y-5">
              <div>
                <label
                  htmlFor="currentUsers"
                  className="mb-2 block font-semibold text-gray-900 text-sm">
                  Current Number of Users
                </label>
                <input
                  id="currentUsers"
                  name="currentUsers"
                  type="number"
                  min="0"
                  value={formData.currentUsers}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-200 px-4 py-3 text-gray-900 transition-all focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#FF6154]"
                  placeholder="1000"
                />
              </div>

              <div>
                <label
                  htmlFor="monthlyTraffic"
                  className="mb-2 block font-semibold text-gray-900 text-sm">
                  Monthly Traffic (Visitors)
                </label>
                <input
                  id="monthlyTraffic"
                  name="monthlyTraffic"
                  type="number"
                  min="0"
                  value={formData.monthlyTraffic}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-200 px-4 py-3 text-gray-900 transition-all focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#FF6154]"
                  placeholder="5000"
                />
              </div>

              <div>
                <label
                  htmlFor="monthlyRevenue"
                  className="mb-2 block font-semibold text-gray-900 text-sm">
                  Monthly Revenue (USD)
                </label>
                <input
                  id="monthlyRevenue"
                  name="monthlyRevenue"
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.monthlyRevenue}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-200 px-4 py-3 text-gray-900 transition-all focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#FF6154]"
                  placeholder="1000.00"
                />
                <p className="mt-2 text-gray-500 text-xs">
                  Approximate monthly revenue generated through your website
                </p>
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex gap-4">
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 rounded-lg bg-[#FF6154] px-6 py-3 font-semibold text-white shadow-sm transition-all hover:bg-[#ff4f40] hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6154] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
              {isLoading ? "Saving…" : "Save Profile"}
            </button>
            <button
              type="button"
              onClick={() => router.push("/profile")}
              className="rounded-lg border border-gray-200 px-6 py-3 font-semibold text-gray-700 transition-colors hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6154] focus-visible:ring-offset-2">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
