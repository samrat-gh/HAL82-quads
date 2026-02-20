"use client";

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { DashboardNav } from "@/components/dashboard-nav";

interface FormData {
  productName: string;
  description: string;
  productUrl: string;
  startedDate: string;
  stage: string;
  lookingForSkill: string;
  commitmentRequired: string;
  riskAppetite: string;
  workSpeed: string;
  decisionStyle: string;
  ambitionLevel: string;
}

export default function FounderOnboardingPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState<FormData>({
    productName: "",
    description: "",
    productUrl: "",
    startedDate: "",
    stage: "IDEA",
    lookingForSkill: "TECH",
    commitmentRequired: "FULL_TIME",
    riskAppetite: "BALANCED",
    workSpeed: "FAST",
    decisionStyle: "COLLABORATIVE",
    ambitionLevel: "SCALABLE",
  });

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/join");
    }
  }, [status, router]);

  useEffect(() => {
    const checkProfileCompletion = async () => {
      if (status !== "authenticated") return;

      try {
        const userResponse = await fetch("/api/user");
        const userData = await userResponse.json();

        if (!userData.user?.profileCompleted) {
          router.push("/profile/complete");
        }
      } catch (_error) {
        //
      }
    };

    checkProfileCompletion();
  }, [status, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (
      !formData.productName ||
      !formData.description ||
      !formData.productUrl ||
      !formData.startedDate
    ) {
      setError("Product name, description, URL, and started date are required");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/founder-profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to save profile");
      }

      router.push("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

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

      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="font-bold text-4xl text-gray-900">Founder Profile</h1>
          <p className="mt-2 text-gray-600">
            Tell us about your venture and what you're looking for in a
            co-founder
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {error && (
            <div className="rounded-lg bg-red-50 px-4 py-3 font-medium text-red-600 text-sm">
              {error}
            </div>
          )}

          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <h2 className="mb-6 font-bold text-gray-900 text-xl">
              Your Project
            </h2>

            <div className="space-y-5">
              <div>
                <label
                  htmlFor="productName"
                  className="mb-2 block font-semibold text-gray-900 text-sm">
                  Product Name
                </label>
                <input
                  id="productName"
                  name="productName"
                  type="text"
                  required
                  value={formData.productName}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-200 px-4 py-3 text-gray-900 transition-all focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#FF6154]"
                  placeholder="Enter your product name"
                />
              </div>

              <div>
                <label
                  htmlFor="description"
                  className="mb-2 block font-semibold text-gray-900 text-sm">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  required
                  rows={4}
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-200 px-4 py-3 text-gray-900 transition-all focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#FF6154]"
                  placeholder="Describe your product and vision"
                />
              </div>

              <div>
                <label
                  htmlFor="productUrl"
                  className="mb-2 block font-semibold text-gray-900 text-sm">
                  Product URL <span className="text-[#FF6154]">*</span>
                </label>
                <input
                  id="productUrl"
                  name="productUrl"
                  type="url"
                  required
                  value={formData.productUrl}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-200 px-4 py-3 text-gray-900 transition-all focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#FF6154]"
                  placeholder="https://yourproduct.com"
                />
              </div>

              <div>
                <label
                  htmlFor="startedDate"
                  className="mb-2 block font-semibold text-gray-900 text-sm">
                  Started Date <span className="text-[#FF6154]">*</span>
                </label>
                <input
                  id="startedDate"
                  name="startedDate"
                  type="month"
                  required
                  value={formData.startedDate}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-200 px-4 py-3 text-gray-900 transition-all focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#FF6154]"
                />
              </div>

              <div>
                <label
                  htmlFor="stage"
                  className="mb-2 block font-semibold text-gray-900 text-sm">
                  Current Stage
                </label>
                <select
                  id="stage"
                  name="stage"
                  required
                  value={formData.stage}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-200 px-4 py-3 text-gray-900 transition-all focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#FF6154]">
                  <option value="IDEA">Idea</option>
                  <option value="MVP">MVP</option>
                  <option value="TRACTION">Traction</option>
                </select>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <h2 className="mb-6 font-bold text-gray-900 text-xl">
              What You're Looking For
            </h2>

            <div className="space-y-5">
              <div>
                <label
                  htmlFor="lookingForSkill"
                  className="mb-2 block font-semibold text-gray-900 text-sm">
                  Primary Skill Needed
                </label>
                <select
                  id="lookingForSkill"
                  name="lookingForSkill"
                  required
                  value={formData.lookingForSkill}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-200 px-4 py-3 text-gray-900 transition-all focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#FF6154]">
                  <option value="TECH">Technical / Engineering</option>
                  <option value="DESIGN">Design / Product</option>
                  <option value="GROWTH">Growth / Marketing</option>
                  <option value="OPS">Operations / Business</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="commitmentRequired"
                  className="mb-2 block font-semibold text-gray-900 text-sm">
                  Commitment Required
                </label>
                <select
                  id="commitmentRequired"
                  name="commitmentRequired"
                  required
                  value={formData.commitmentRequired}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-200 px-4 py-3 text-gray-900 transition-all focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#FF6154]">
                  <option value="FULL_TIME">Full-Time</option>
                  <option value="PART_TIME">Part-Time</option>
                </select>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <h2 className="mb-6 font-bold text-gray-900 text-xl">
              Your Working Style
            </h2>

            <div className="space-y-5">
              <div>
                <label
                  htmlFor="riskAppetite"
                  className="mb-2 block font-semibold text-gray-900 text-sm">
                  Risk Appetite
                </label>
                <select
                  id="riskAppetite"
                  name="riskAppetite"
                  required
                  value={formData.riskAppetite}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-200 px-4 py-3 text-gray-900 transition-all focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#FF6154]">
                  <option value="CONSERVATIVE">Conservative</option>
                  <option value="BALANCED">Balanced</option>
                  <option value="AGGRESSIVE">Aggressive</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="workSpeed"
                  className="mb-2 block font-semibold text-gray-900 text-sm">
                  Work Speed
                </label>
                <select
                  id="workSpeed"
                  name="workSpeed"
                  required
                  value={formData.workSpeed}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-200 px-4 py-3 text-gray-900 transition-all focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#FF6154]">
                  <option value="FAST">Fast-paced</option>
                  <option value="STRUCTURED">Structured</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="decisionStyle"
                  className="mb-2 block font-semibold text-gray-900 text-sm">
                  Decision Making Style
                </label>
                <select
                  id="decisionStyle"
                  name="decisionStyle"
                  required
                  value={formData.decisionStyle}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-200 px-4 py-3 text-gray-900 transition-all focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#FF6154]">
                  <option value="DATA_DRIVEN">Data-Driven</option>
                  <option value="INTUITIVE">Intuitive</option>
                  <option value="COLLABORATIVE">Collaborative</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="ambitionLevel"
                  className="mb-2 block font-semibold text-gray-900 text-sm">
                  Ambition Level
                </label>
                <select
                  id="ambitionLevel"
                  name="ambitionLevel"
                  required
                  value={formData.ambitionLevel}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-200 px-4 py-3 text-gray-900 transition-all focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#FF6154]">
                  <option value="LIFESTYLE">Lifestyle Business</option>
                  <option value="SCALABLE">Scalable Startup</option>
                  <option value="HYPERGROWTH">Hypergrowth / Unicorn</option>
                </select>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 rounded-lg bg-[#FF6154] px-6 py-3 font-semibold text-white shadow-sm transition-all hover:bg-[#ff4f40] hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6154] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
              {isLoading ? "Saving…" : "Complete Profile"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
