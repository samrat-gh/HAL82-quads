"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { DashboardNav } from "@/components/dashboard-nav";

interface Match {
  id: string;
  totalScore: number;
  skillScore: number;
  stageScore: number;
  commitmentScore: number;
  riskScore: number;
  workStyleScore: number;
  decisionScore: number;
  ambitionScore: number;
  founder?: {
    productName: string;
    description: string;
    stage: string;
    lookingForSkill: string;
    user: {
      userId: string;
      firstName: string;
      lastName: string;
      email: string;
      profilePicture?: string | null;
    };
  };
  coFounder?: {
    primarySkill: string;
    secondarySkill: string | null;
    experienceLevel: string;
    user: {
      userId: string;
      firstName: string;
      lastName: string;
      email: string;
      profilePicture?: string | null;
    };
  };
}

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [matches, setMatches] = useState<Match[]>([]);
  const [role, setRole] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [expandedMatch, setExpandedMatch] = useState<string | null>(null);

  // Filter states
  const [minScore, setMinScore] = useState<number>(0);
  const [skillFilter, setSkillFilter] = useState<string>("all");
  const [stageFilter, setStageFilter] = useState<string>("all");
  const [experienceFilter, setExperienceFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("score");

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/join");
    }
  }, [status, router]);

  useEffect(() => {
    const checkProfileAndFetchMatches = async () => {
      if (status !== "authenticated") return;

      try {
        const userResponse = await fetch("/api/user");
        const userData = await userResponse.json();

        if (!userData.user?.profileCompleted) {
          router.push("/profile/complete");
          return;
        }

        const userRole = session?.user?.role?.toLowerCase();

        if (userRole === "founder") {
          const founderResponse = await fetch("/api/founder-profile");
          const founderData = await founderResponse.json();

          if (!founderData.profile) {
            router.push("/onboarding/founder");
            return;
          }
        } else if (userRole === "cofounder") {
          const cofounderResponse = await fetch("/api/cofounder-profile");
          const cofounderData = await cofounderResponse.json();

          if (!cofounderData.profile) {
            router.push("/onboarding/cofounder");
            return;
          }
        }

        const matchesResponse = await fetch("/api/matches");
        const matchesData = await matchesResponse.json();

        setMatches(matchesData.matches || []);
        setRole(matchesData.role);
      } catch (_error) {
        //
      } finally {
        setIsLoading(false);
      }
    };

    checkProfileAndFetchMatches();
  }, [status, session, router]);

  const getCompatibilityBadge = (score: number) => {
    const percentage = score;
    if (percentage >= 75) {
      return {
        label: "Strong Match",
        color: "bg-green-100 text-green-800",
      };
    }
    if (percentage >= 50) {
      return {
        label: "Moderate Match",
        color: "bg-yellow-100 text-yellow-800",
      };
    }
    return {
      label: "Low Alignment",
      color: "bg-gray-100 text-gray-800",
    };
  };

  // Filter and sort matches
  const filteredMatches = matches
    .filter((match) => {
      // Score filter
      if (match.totalScore < minScore) return false;

      if (role === "founder" && match.coFounder) {
        // Skill filter for cofounders
        if (
          skillFilter !== "all" &&
          match.coFounder.primarySkill !== skillFilter
        ) {
          return false;
        }
        // Experience filter
        if (
          experienceFilter !== "all" &&
          match.coFounder.experienceLevel !== experienceFilter
        ) {
          return false;
        }
      }

      if (role === "cofounder" && match.founder) {
        // Stage filter for founders
        if (stageFilter !== "all" && match.founder.stage !== stageFilter) {
          return false;
        }
        // Looking for skill filter
        if (
          skillFilter !== "all" &&
          match.founder.lookingForSkill !== skillFilter
        ) {
          return false;
        }
      }

      return true;
    })
    .sort((a, b) => {
      if (sortBy === "score") {
        return b.totalScore - a.totalScore;
      }
      if (sortBy === "skill") {
        const aSkill =
          role === "founder"
            ? a.coFounder?.primarySkill || ""
            : a.founder?.lookingForSkill || "";
        const bSkill =
          role === "founder"
            ? b.coFounder?.primarySkill || ""
            : b.founder?.lookingForSkill || "";
        const skillCompare = aSkill.localeCompare(bSkill);
        // If skills are the same, sort by score descending
        return skillCompare !== 0 ? skillCompare : b.totalScore - a.totalScore;
      }
      if (sortBy === "stage") {
        const aStage = a.founder?.stage || "";
        const bStage = b.founder?.stage || "";
        const stageCompare = aStage.localeCompare(bStage);
        // If stages are the same, sort by score descending
        return stageCompare !== 0 ? stageCompare : b.totalScore - a.totalScore;
      }
      // Default to score descending
      return b.totalScore - a.totalScore;
    });

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

  if (role === "investor") {
    return (
      <div className="min-h-screen bg-white">
        <DashboardNav />

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
            <button
              type="button"
              onClick={() => router.push("/profile/create")}
              className="rounded-2xl border border-gray-100 bg-white p-6 text-left shadow-sm transition-all hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6154] focus-visible:ring-offset-2">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-[#FF6154]/10">
                <svg
                  className="h-6 w-6 text-[#FF6154]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true">
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
                Add your website, social links, and metrics to showcase your
                venture.
              </p>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <DashboardNav />

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="mb-3 font-bold text-4xl text-gray-900">
            {role === "founder" ? "Find Your Co-Founder" : "Find Your Venture"}
          </h1>
          <p className="text-gray-600 text-lg">
            {filteredMatches.length > 0
              ? `${filteredMatches.length} potential ${role === "founder" ? "co-founders" : "ventures"} based on compatibility`
              : matches.length > 0
                ? "No matches found with current filters. Try adjusting your filters."
                : "No matches found yet. Check back soon!"}
          </p>
        </div>

        {/* Filter Controls */}
        {matches.length > 0 && (
          <div className="mb-6 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-bold text-gray-900 text-lg">Filters</h2>
              <button
                type="button"
                onClick={() => {
                  setMinScore(0);
                  setSkillFilter("all");
                  setStageFilter("all");
                  setExperienceFilter("all");
                  setSortBy("score");
                }}
                className="text-[#FF6154] text-sm transition-colors hover:text-[#FF6154]/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6154] focus-visible:ring-offset-2">
                Clear All
              </button>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {/* Minimum Score Filter */}
              <div>
                <label
                  htmlFor="minScore"
                  className="mb-2 block font-medium text-gray-700 text-sm">
                  Min. Compatibility
                </label>
                <select
                  id="minScore"
                  value={minScore}
                  onChange={(e) => setMinScore(Number(e.target.value))}
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 text-gray-900 text-sm transition-all focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#FF6154]">
                  <option value={0}>All Scores</option>
                  <option value={50}>50% or higher</option>
                  <option value={60}>60% or higher</option>
                  <option value={70}>70% or higher</option>
                  <option value={75}>75% or higher</option>
                  <option value={80}>80% or higher</option>
                </select>
              </div>

              {/* Skill Filter */}
              <div>
                <label
                  htmlFor="skillFilter"
                  className="mb-2 block font-medium text-gray-700 text-sm">
                  {role === "founder" ? "Cofounder Skill" : "Looking For"}
                </label>
                <select
                  id="skillFilter"
                  value={skillFilter}
                  onChange={(e) => setSkillFilter(e.target.value)}
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 text-gray-900 text-sm transition-all focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#FF6154]">
                  <option value="all">All Skills</option>
                  <option value="TECH">Tech</option>
                  <option value="DESIGN">Design</option>
                  <option value="GROWTH">Growth</option>
                  <option value="OPS">Ops</option>
                </select>
              </div>

              {/* Stage/Experience Filter */}
              {role === "cofounder" ? (
                <div>
                  <label
                    htmlFor="stageFilter"
                    className="mb-2 block font-medium text-gray-700 text-sm">
                    Project Stage
                  </label>
                  <select
                    id="stageFilter"
                    value={stageFilter}
                    onChange={(e) => setStageFilter(e.target.value)}
                    className="w-full rounded-lg border border-gray-200 px-3 py-2 text-gray-900 text-sm transition-all focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#FF6154]">
                    <option value="all">All Stages</option>
                    <option value="IDEA">Idea</option>
                    <option value="MVP">MVP</option>
                    <option value="TRACTION">Traction</option>
                  </select>
                </div>
              ) : (
                <div>
                  <label
                    htmlFor="experienceFilter"
                    className="mb-2 block font-medium text-gray-700 text-sm">
                    Experience Level
                  </label>
                  <select
                    id="experienceFilter"
                    value={experienceFilter}
                    onChange={(e) => setExperienceFilter(e.target.value)}
                    className="w-full rounded-lg border border-gray-200 px-3 py-2 text-gray-900 text-sm transition-all focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#FF6154]">
                    <option value="all">All Levels</option>
                    <option value="JUNIOR">Junior</option>
                    <option value="MID">Mid</option>
                    <option value="SENIOR">Senior</option>
                  </select>
                </div>
              )}

              {/* Sort By */}
              <div>
                <label
                  htmlFor="sortBy"
                  className="mb-2 block font-medium text-gray-700 text-sm">
                  Sort By
                </label>
                <select
                  id="sortBy"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 text-gray-900 text-sm transition-all focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#FF6154]">
                  <option value="score">Compatibility Score</option>
                  <option value="skill">Skill/Expertise</option>
                  {role === "cofounder" && (
                    <option value="stage">Project Stage</option>
                  )}
                </select>
              </div>
            </div>
          </div>
        )}

        {filteredMatches.length === 0 ? (
          <div className="rounded-2xl border border-gray-100 bg-white p-12 text-center shadow-sm">
            <svg
              className="mx-auto h-16 w-16 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <h3 className="mt-4 font-bold text-gray-900 text-xl">
              No Matches Yet
            </h3>
            <p className="mt-2 text-gray-600">
              {matches.length > 0
                ? "No matches found with current filters. Try adjusting your filters above."
                : "We're constantly adding new users. Check back soon to find your perfect match!"}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredMatches.map((match) => {
              const badge = getCompatibilityBadge(match.totalScore);
              const isExpanded = expandedMatch === match.id;
              const matchData =
                role === "founder" ? match.coFounder : match.founder;

              return (
                <div
                  key={match.id}
                  className="rounded-2xl border border-gray-100 bg-white shadow-sm transition-shadow hover:shadow-md">
                  <div className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          {matchData?.user.profilePicture ? (
                            <Image
                              src={matchData.user.profilePicture}
                              alt={`${matchData.user.firstName} ${matchData.user.lastName}`}
                              width={48}
                              height={48}
                              className="h-12 w-12 rounded-full object-cover"
                            />
                          ) : (
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#FF6154] font-bold text-white">
                              {matchData?.user.firstName?.charAt(0)}
                              {matchData?.user.lastName?.charAt(0)}
                            </div>
                          )}
                          <div>
                            <h3 className="font-bold text-gray-900 text-lg">
                              {matchData?.user.firstName}{" "}
                              {matchData?.user.lastName}
                            </h3>
                            {role === "founder" && match.coFounder && (
                              <p className="text-gray-600 text-sm">
                                {match.coFounder.primarySkill.replace("_", " ")}{" "}
                                • {match.coFounder.experienceLevel} Level
                              </p>
                            )}
                            {role === "cofounder" && match.founder && (
                              <p className="text-gray-600 text-sm">
                                {match.founder.productName} •{" "}
                                {match.founder.stage}
                              </p>
                            )}
                          </div>
                        </div>

                        {role === "cofounder" && match.founder && (
                          <p className="mt-4 text-gray-700 text-sm">
                            {match.founder.description}
                          </p>
                        )}
                      </div>

                      <div className="ml-4 text-right">
                        <div className="mb-2 font-bold text-3xl text-[#FF6154]">
                          {match.totalScore}%
                        </div>
                        <span
                          className={`inline-block rounded-full px-3 py-1 font-medium text-xs ${badge.color}`}>
                          {badge.label}
                        </span>
                      </div>
                    </div>

                    <div className="mt-4 flex gap-2">
                      <button
                        type="button"
                        onClick={() =>
                          router.push(`/profile/${matchData?.user.userId}`)
                        }
                        className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-[#FF6154] px-4 py-2 font-medium text-sm text-white transition-colors hover:bg-[#FF6154]/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6154] focus-visible:ring-offset-2">
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
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                          />
                        </svg>
                        View Profile
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          setExpandedMatch(isExpanded ? null : match.id)
                        }
                        className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-gray-200 px-4 py-2 font-medium text-gray-700 text-sm transition-colors hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6154] focus-visible:ring-offset-2">
                        {isExpanded ? "Hide" : "View"} Breakdown
                        <svg
                          className={`h-4 w-4 transition-transform ${isExpanded ? "rotate-180" : ""}`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          aria-hidden="true">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="border-gray-100 border-t bg-gray-50 p-6">
                      <h4 className="mb-4 font-bold text-gray-900">
                        Compatibility Breakdown
                      </h4>
                      <div className="grid gap-3 sm:grid-cols-2">
                        <div className="rounded-lg bg-white p-3">
                          <div className="flex items-center justify-between">
                            <span className="text-gray-600 text-sm">
                              Skill Match
                            </span>
                            <span className="font-bold text-gray-900">
                              {match.skillScore}/30
                            </span>
                          </div>
                          <div className="mt-2 h-2 overflow-hidden rounded-full bg-gray-200">
                            <div
                              className="h-full bg-[#FF6154]"
                              style={{
                                width: `${(match.skillScore / 30) * 100}%`,
                              }}
                            />
                          </div>
                        </div>

                        <div className="rounded-lg bg-white p-3">
                          <div className="flex items-center justify-between">
                            <span className="text-gray-600 text-sm">
                              Stage Alignment
                            </span>
                            <span className="font-bold text-gray-900">
                              {match.stageScore}/20
                            </span>
                          </div>
                          <div className="mt-2 h-2 overflow-hidden rounded-full bg-gray-200">
                            <div
                              className="h-full bg-[#FF6154]"
                              style={{
                                width: `${(match.stageScore / 20) * 100}%`,
                              }}
                            />
                          </div>
                        </div>

                        <div className="rounded-lg bg-white p-3">
                          <div className="flex items-center justify-between">
                            <span className="text-gray-600 text-sm">
                              Commitment
                            </span>
                            <span className="font-bold text-gray-900">
                              {match.commitmentScore}/15
                            </span>
                          </div>
                          <div className="mt-2 h-2 overflow-hidden rounded-full bg-gray-200">
                            <div
                              className="h-full bg-[#FF6154]"
                              style={{
                                width: `${(match.commitmentScore / 15) * 100}%`,
                              }}
                            />
                          </div>
                        </div>

                        <div className="rounded-lg bg-white p-3">
                          <div className="flex items-center justify-between">
                            <span className="text-gray-600 text-sm">
                              Risk Appetite
                            </span>
                            <span className="font-bold text-gray-900">
                              {match.riskScore}/10
                            </span>
                          </div>
                          <div className="mt-2 h-2 overflow-hidden rounded-full bg-gray-200">
                            <div
                              className="h-full bg-[#FF6154]"
                              style={{
                                width: `${(match.riskScore / 10) * 100}%`,
                              }}
                            />
                          </div>
                        </div>

                        <div className="rounded-lg bg-white p-3">
                          <div className="flex items-center justify-between">
                            <span className="text-gray-600 text-sm">
                              Work Style
                            </span>
                            <span className="font-bold text-gray-900">
                              {match.workStyleScore}/10
                            </span>
                          </div>
                          <div className="mt-2 h-2 overflow-hidden rounded-full bg-gray-200">
                            <div
                              className="h-full bg-[#FF6154]"
                              style={{
                                width: `${(match.workStyleScore / 10) * 100}%`,
                              }}
                            />
                          </div>
                        </div>

                        <div className="rounded-lg bg-white p-3">
                          <div className="flex items-center justify-between">
                            <span className="text-gray-600 text-sm">
                              Decision Style
                            </span>
                            <span className="font-bold text-gray-900">
                              {match.decisionScore}/10
                            </span>
                          </div>
                          <div className="mt-2 h-2 overflow-hidden rounded-full bg-gray-200">
                            <div
                              className="h-full bg-[#FF6154]"
                              style={{
                                width: `${(match.decisionScore / 10) * 100}%`,
                              }}
                            />
                          </div>
                        </div>

                        <div className="rounded-lg bg-white p-3">
                          <div className="flex items-center justify-between">
                            <span className="text-gray-600 text-sm">
                              Ambition
                            </span>
                            <span className="font-bold text-gray-900">
                              {match.ambitionScore}/5
                            </span>
                          </div>
                          <div className="mt-2 h-2 overflow-hidden rounded-full bg-gray-200">
                            <div
                              className="h-full bg-[#FF6154]"
                              style={{
                                width: `${(match.ambitionScore / 5) * 100}%`,
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
