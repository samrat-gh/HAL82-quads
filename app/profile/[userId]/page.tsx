"use client";

import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { DashboardNav } from "@/components/dashboard-nav";

interface ProfileData {
  user: {
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    profilePicture: string | null;
    bio: string | null;
    location: string | null;
    phoneNumber: string | null;
    yearsOfExperience: number | null;
  };
  profile?: {
    websiteUrl: string;
    socialTwitter: string | null;
    socialLinkedIn: string | null;
    socialGithub: string | null;
    socialInstagram: string | null;
    currentUsers: number | null;
    monthlyTraffic: number | null;
    monthlyRevenue: number | null;
  };
  experiences?: Array<{
    id: string;
    title: string;
    company: string;
    description: string | null;
    startDate: string;
    endDate: string | null;
    isCurrent: boolean;
  }>;
  founderProfile?: {
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
  };
  cofounderProfile?: {
    primarySkill: string;
    secondarySkill: string | null;
    experienceLevel: string;
    preferredStage: string;
    availability: string;
    riskAppetite: string;
    workSpeed: string;
    decisionStyle: string;
    ambitionLevel: string;
  };
}

export default function ProfileViewPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const params = useParams();
  const userId = params.userId as string;
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/join");
    }
  }, [status, router]);

  useEffect(() => {
    const fetchProfile = async () => {
      if (status !== "authenticated" || !userId) return;

      try {
        const response = await fetch(`/api/profile/${userId}`);
        const data = await response.json();

        if (response.ok) {
          setProfile(data);
        }
      } catch (_error) {
        //
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [status, userId]);

  const formatLabel = (str: string) => {
    return str
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

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

  if (!session || !profile) {
    return null;
  }

  const isFounder = profile.user.role?.toLowerCase() === "founder";
  const isCofounder = profile.user.role?.toLowerCase() === "cofounder";

  return (
    <div className="min-h-screen bg-white">
      <DashboardNav />

      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <button
          type="button"
          onClick={() => router.back()}
          className="mb-6 flex items-center gap-2 text-gray-600 transition-colors hover:text-gray-900">
          <svg
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to Matches
        </button>

        <div className="rounded-2xl border border-gray-100 bg-white shadow-sm">
          <div className="border-gray-100 border-b p-6">
            <div className="flex items-center gap-4">
              {profile.user.profilePicture ? (
                <Image
                  src={profile.user.profilePicture}
                  alt={`${profile.user.firstName} ${profile.user.lastName}`}
                  width={80}
                  height={80}
                  className="h-20 w-20 rounded-full object-cover"
                />
              ) : (
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#FF6154] font-bold text-2xl text-white">
                  {profile.user.firstName.charAt(0)}
                  {profile.user.lastName.charAt(0)}
                </div>
              )}
              <div className="flex-1">
                <h1 className="font-bold text-2xl text-gray-900">
                  {profile.user.firstName} {profile.user.lastName}
                </h1>
                <p className="text-gray-600">
                  {formatLabel(profile.user.role)}
                  {isFounder && profile.founderProfile && (
                    <span className="ml-2 text-[#FF6154]">
                      • {profile.founderProfile.productName}
                    </span>
                  )}
                </p>
                {profile.user.location && (
                  <p className="mt-1 text-gray-500 text-sm">
                    📍 {profile.user.location}
                  </p>
                )}
                {profile.user.yearsOfExperience !== null && (
                  <p className="text-gray-500 text-sm">
                    💼 {profile.user.yearsOfExperience} years of experience
                  </p>
                )}
              </div>
            </div>

            {/* Product Info - For Founders */}
            {isFounder && profile.founderProfile && (
              <div className="mt-6">
                <div className="rounded-xl border-2 border-[#FF6154]/20 bg-linear-to-br from-[#FF6154]/5 to-orange-50 p-5">
                  <div className="mb-4 flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="mb-2 flex items-center gap-2">
                        <span className="font-semibold text-[#FF6154] text-xs uppercase tracking-wide">
                          Building
                        </span>
                        {profile.founderProfile.startedDate && (
                          <span className="text-gray-500 text-xs">
                            • Started{" "}
                            {new Date(
                              profile.founderProfile.startedDate,
                            ).toLocaleDateString("en-US", {
                              month: "short",
                              year: "numeric",
                            })}
                          </span>
                        )}
                      </div>
                      <h2 className="mb-2 font-bold text-gray-900 text-xl">
                        {profile.founderProfile.productName}
                      </h2>
                      <p className="text-gray-700 leading-relaxed">
                        {profile.founderProfile.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    {profile.founderProfile.productUrl && (
                      <a
                        href={profile.founderProfile.productUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-lg bg-[#FF6154] px-4 py-2 font-medium text-sm text-white transition-colors hover:bg-[#FF6154]/90">
                        Visit Product
                        <svg
                          className="h-4 w-4"
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
                    )}
                    <div className="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-gray-700 text-sm">
                      <span className="font-medium">Stage:</span>
                      <span>{formatLabel(profile.founderProfile.stage)}</span>
                    </div>
                    <div className="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-gray-700 text-sm">
                      <span className="font-medium">Looking for:</span>
                      <span>
                        {formatLabel(profile.founderProfile.lookingForSkill)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {profile.user.bio && (
              <div className="mt-4 rounded-lg bg-gray-50 p-4">
                <h3 className="mb-2 font-semibold text-gray-900 text-sm">
                  About
                </h3>
                <p className="text-gray-700">{profile.user.bio}</p>
              </div>
            )}
          </div>

          <div className="space-y-6 p-6">
            <div>
              <h2 className="mb-4 font-bold text-gray-900 text-xl">
                Contact Information
              </h2>
              <div className="space-y-3">
                <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-3">
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
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <span className="text-gray-700">{profile.user.email}</span>
                </div>
                {profile.user.phoneNumber && (
                  <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-3">
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
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                    <span className="text-gray-700">
                      {profile.user.phoneNumber}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {profile.profile && (
              <div>
                <h2 className="mb-4 font-bold text-gray-900 text-xl">
                  Online Presence
                </h2>
                <div className="space-y-3">
                  <a
                    href={profile.profile.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 rounded-lg bg-gray-50 p-3 transition-colors hover:bg-gray-100">
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
                        d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                      />
                    </svg>
                    <span className="text-gray-700">
                      {profile.profile.websiteUrl}
                    </span>
                  </a>
                  {profile.profile.socialLinkedIn && (
                    <a
                      href={profile.profile.socialLinkedIn}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 rounded-lg bg-gray-50 p-3 transition-colors hover:bg-gray-100">
                      <span className="text-gray-600">LinkedIn</span>
                    </a>
                  )}
                  {profile.profile.socialTwitter && (
                    <a
                      href={profile.profile.socialTwitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 rounded-lg bg-gray-50 p-3 transition-colors hover:bg-gray-100">
                      <span className="text-gray-600">Twitter/X</span>
                    </a>
                  )}
                  {profile.profile.socialGithub && (
                    <a
                      href={profile.profile.socialGithub}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 rounded-lg bg-gray-50 p-3 transition-colors hover:bg-gray-100">
                      <span className="text-gray-600">GitHub</span>
                    </a>
                  )}
                  {profile.profile.socialInstagram && (
                    <a
                      href={profile.profile.socialInstagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 rounded-lg bg-gray-50 p-3 transition-colors hover:bg-gray-100">
                      <span className="text-gray-600">Instagram</span>
                    </a>
                  )}
                </div>
              </div>
            )}

            {profile.profile &&
              (profile.profile.currentUsers ||
                profile.profile.monthlyTraffic ||
                profile.profile.monthlyRevenue) && (
                <div>
                  <h2 className="mb-4 font-bold text-gray-900 text-xl">
                    Traction Metrics
                  </h2>
                  <div className="grid gap-4 sm:grid-cols-3">
                    {profile.profile.currentUsers !== null && (
                      <div className="rounded-lg border border-gray-100 bg-linear-to-br from-blue-50 to-blue-100 p-4">
                        <p className="mb-1 text-gray-600 text-sm">
                          Current Users
                        </p>
                        <p className="font-bold text-2xl text-gray-900">
                          {profile.profile.currentUsers.toLocaleString()}
                        </p>
                      </div>
                    )}
                    {profile.profile.monthlyTraffic !== null && (
                      <div className="rounded-lg border border-gray-100 bg-linear-to-br from-purple-50 to-purple-100 p-4">
                        <p className="mb-1 text-gray-600 text-sm">
                          Monthly Traffic
                        </p>
                        <p className="font-bold text-2xl text-gray-900">
                          {profile.profile.monthlyTraffic.toLocaleString()}
                        </p>
                      </div>
                    )}
                    {profile.profile.monthlyRevenue !== null && (
                      <div className="rounded-lg border border-gray-100 bg-linear-to-br from-green-50 to-green-100 p-4">
                        <p className="mb-1 text-gray-600 text-sm">
                          Monthly Revenue
                        </p>
                        <p className="font-bold text-2xl text-gray-900">
                          ${profile.profile.monthlyRevenue.toLocaleString()}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}

            {profile.experiences && profile.experiences.length > 0 && (
              <div>
                <h2 className="mb-4 font-bold text-gray-900 text-xl">
                  Work Experience
                </h2>
                <div className="space-y-4">
                  {profile.experiences.map((exp) => (
                    <div
                      key={exp.id}
                      className="rounded-lg border border-gray-200 p-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-bold text-gray-900">
                            {exp.title}
                          </h3>
                          <p className="text-gray-600">{exp.company}</p>
                          <p className="mt-1 text-gray-500 text-sm">
                            {new Date(exp.startDate).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "short",
                              },
                            )}{" "}
                            -{" "}
                            {exp.isCurrent
                              ? "Present"
                              : exp.endDate
                                ? new Date(exp.endDate).toLocaleDateString(
                                    "en-US",
                                    {
                                      year: "numeric",
                                      month: "short",
                                    },
                                  )
                                : "N/A"}
                          </p>
                        </div>
                        {exp.isCurrent && (
                          <span className="rounded-full bg-green-100 px-3 py-1 font-medium text-green-800 text-xs">
                            Current
                          </span>
                        )}
                      </div>
                      {exp.description && (
                        <p className="mt-3 text-gray-700 text-sm">
                          {exp.description}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {isFounder && profile.founderProfile && (
              <div>
                <h2 className="mb-4 font-bold text-gray-900 text-xl">
                  Work Style & Preferences
                </h2>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-lg border border-gray-100 p-4">
                    <p className="mb-1 text-gray-600 text-sm">
                      Commitment Required
                    </p>
                    <p className="font-medium text-gray-900">
                      {formatLabel(profile.founderProfile.commitmentRequired)}
                    </p>
                  </div>

                  <div className="rounded-lg border border-gray-100 p-4">
                    <p className="mb-1 text-gray-600 text-sm">Risk Appetite</p>
                    <p className="font-medium text-gray-900">
                      {formatLabel(profile.founderProfile.riskAppetite)}
                    </p>
                  </div>

                  <div className="rounded-lg border border-gray-100 p-4">
                    <p className="mb-1 text-gray-600 text-sm">Work Speed</p>
                    <p className="font-medium text-gray-900">
                      {formatLabel(profile.founderProfile.workSpeed)}
                    </p>
                  </div>

                  <div className="rounded-lg border border-gray-100 p-4">
                    <p className="mb-1 text-gray-600 text-sm">Decision Style</p>
                    <p className="font-medium text-gray-900">
                      {formatLabel(profile.founderProfile.decisionStyle)}
                    </p>
                  </div>

                  <div className="rounded-lg border border-gray-100 p-4">
                    <p className="mb-1 text-gray-600 text-sm">Ambition Level</p>
                    <p className="font-medium text-gray-900">
                      {formatLabel(profile.founderProfile.ambitionLevel)}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {isCofounder && profile.cofounderProfile && (
              <div>
                <h2 className="mb-4 font-bold text-gray-900 text-xl">
                  Skills & Experience
                </h2>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-lg border border-gray-100 p-4">
                    <p className="mb-1 text-gray-600 text-sm">Primary Skill</p>
                    <p className="font-medium text-gray-900">
                      {formatLabel(profile.cofounderProfile.primarySkill)}
                    </p>
                  </div>

                  {profile.cofounderProfile.secondarySkill && (
                    <div className="rounded-lg border border-gray-100 p-4">
                      <p className="mb-1 text-gray-600 text-sm">
                        Secondary Skill
                      </p>
                      <p className="font-medium text-gray-900">
                        {formatLabel(profile.cofounderProfile.secondarySkill)}
                      </p>
                    </div>
                  )}

                  <div className="rounded-lg border border-gray-100 p-4">
                    <p className="mb-1 text-gray-600 text-sm">
                      Experience Level
                    </p>
                    <p className="font-medium text-gray-900">
                      {formatLabel(profile.cofounderProfile.experienceLevel)}
                    </p>
                  </div>

                  <div className="rounded-lg border border-gray-100 p-4">
                    <p className="mb-1 text-gray-600 text-sm">
                      Preferred Stage
                    </p>
                    <p className="font-medium text-gray-900">
                      {formatLabel(profile.cofounderProfile.preferredStage)}
                    </p>
                  </div>

                  <div className="rounded-lg border border-gray-100 p-4">
                    <p className="mb-1 text-gray-600 text-sm">Availability</p>
                    <p className="font-medium text-gray-900">
                      {formatLabel(profile.cofounderProfile.availability)}
                    </p>
                  </div>

                  <div className="rounded-lg border border-gray-100 p-4">
                    <p className="mb-1 text-gray-600 text-sm">Risk Appetite</p>
                    <p className="font-medium text-gray-900">
                      {formatLabel(profile.cofounderProfile.riskAppetite)}
                    </p>
                  </div>

                  <div className="rounded-lg border border-gray-100 p-4">
                    <p className="mb-1 text-gray-600 text-sm">Work Speed</p>
                    <p className="font-medium text-gray-900">
                      {formatLabel(profile.cofounderProfile.workSpeed)}
                    </p>
                  </div>

                  <div className="rounded-lg border border-gray-100 p-4">
                    <p className="mb-1 text-gray-600 text-sm">Decision Style</p>
                    <p className="font-medium text-gray-900">
                      {formatLabel(profile.cofounderProfile.decisionStyle)}
                    </p>
                  </div>

                  <div className="rounded-lg border border-gray-100 p-4">
                    <p className="mb-1 text-gray-600 text-sm">Ambition Level</p>
                    <p className="font-medium text-gray-900">
                      {formatLabel(profile.cofounderProfile.ambitionLevel)}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
