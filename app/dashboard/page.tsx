"use client";

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { EmptyState } from "@/components/dashboard/empty-state";
import { FilterPanel } from "@/components/dashboard/filter-panel";
import { MatchCard } from "@/components/dashboard/match-card";
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

        {/* Filters */}
        {matches.length > 0 && (
          <FilterPanel
            role={role as "founder" | "cofounder"}
            minScore={minScore}
            skillFilter={skillFilter}
            stageFilter={stageFilter}
            experienceFilter={experienceFilter}
            sortBy={sortBy}
            onMinScoreChange={setMinScore}
            onSkillFilterChange={setSkillFilter}
            onStageFilterChange={setStageFilter}
            onExperienceFilterChange={setExperienceFilter}
            onSortByChange={setSortBy}
            onClearAll={() => {
              setMinScore(0);
              setSkillFilter("all");
              setStageFilter("all");
              setExperienceFilter("all");
              setSortBy("score");
            }}
          />
        )}

        {filteredMatches.length === 0 ? (
          <EmptyState
            hasMatches={matches.length > 0}
            role={role as "founder" | "cofounder"}
          />
        ) : (
          <div className="space-y-5">
            {filteredMatches.map((match) => (
              <MatchCard
                key={match.id}
                match={match}
                role={role as "founder" | "cofounder"}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
