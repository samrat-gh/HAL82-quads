"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { CompatibilityBadge } from "./compatibility-badge";
import { CompatibilityBreakdown } from "./compatibility-breakdown";

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
    user: {
      userId: string;
      firstName: string;
      lastName: string;
      profilePicture?: string | null;
    };
    productName: string;
    description: string;
    stage: string;
  };
  coFounder?: {
    user: {
      userId: string;
      firstName: string;
      lastName: string;
      profilePicture?: string | null;
    };
    primarySkill: string;
    experienceLevel: string;
  };
}

interface MatchCardProps {
  match: Match;
  role: "founder" | "cofounder";
}

export function MatchCard({ match, role }: MatchCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const router = useRouter();

  const matchData = role === "founder" ? match.coFounder : match.founder;

  if (!matchData) return null;

  return (
    <div className="group rounded-2xl border border-gray-200/80 bg-white shadow-sm transition-all hover:border-gray-300 hover:shadow-md">
      <div className="p-6">
        <div className="flex items-start justify-between gap-4">
          {/* Left: Profile Info */}
          <div className="flex min-w-0 flex-1 items-start gap-4">
            {/* Profile Picture */}
            {matchData.user.profilePicture ? (
              <Image
                src={matchData.user.profilePicture}
                alt={`${matchData.user.firstName} ${matchData.user.lastName}`}
                width={64}
                height={64}
                className="h-16 w-16 shrink-0 rounded-xl object-cover ring-2 ring-gray-100 transition-all group-hover:ring-[#FF6154]/20"
              />
            ) : (
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-[#FF6154] to-[#FF7A6B] font-bold text-lg text-white shadow-md">
                {matchData.user.firstName?.charAt(0)}
                {matchData.user.lastName?.charAt(0)}
              </div>
            )}

            {/* Name and Details */}
            <div className="min-w-0 flex-1">
              <h3 className="mb-1 font-bold text-gray-900 text-xl">
                {matchData.user.firstName} {matchData.user.lastName}
              </h3>

              {/* Role-specific info */}
              {role === "founder" && match.coFounder && (
                <div className="flex flex-wrap items-center gap-2 text-gray-600 text-sm">
                  <span className="inline-flex items-center gap-1.5 rounded-lg bg-gray-100 px-2.5 py-1 font-medium">
                    <svg
                      className="h-3.5 w-3.5 text-gray-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                      />
                    </svg>
                    {match.coFounder.primarySkill.replace("_", " ")}
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-lg bg-blue-50 px-2.5 py-1 font-medium text-blue-700">
                    <svg
                      className="h-3.5 w-3.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                    {match.coFounder.experienceLevel} Level
                  </span>
                </div>
              )}

              {role === "cofounder" && match.founder && (
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2 text-sm">
                    <span className="inline-flex items-center gap-1.5 rounded-lg bg-linear-to-r from-[#FF6154]/10 to-[#FF7A6B]/10 px-2.5 py-1 font-medium text-[#FF6154]">
                      <svg
                        className="h-3.5 w-3.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                        />
                      </svg>
                      {match.founder.productName}
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-50 px-2.5 py-1 font-medium text-emerald-700">
                      <svg
                        className="h-3.5 w-3.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                        />
                      </svg>
                      {match.founder.stage}
                    </span>
                  </div>
                  <p className="line-clamp-2 text-gray-600 text-sm leading-relaxed">
                    {match.founder.description}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Right: Score and Badge */}
          <div className="flex shrink-0 flex-col items-end gap-2 text-right">
            <div className="mb-1 bg-linear-to-br from-[#FF6154] to-[#FF7A6B] bg-clip-text font-bold text-4xl text-transparent">
              {match.totalScore}%
            </div>
            <CompatibilityBadge score={match.totalScore} />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-5 flex gap-3">
          <button
            type="button"
            onClick={() => router.push(`/profile/${matchData.user.userId}`)}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-linear-to-r from-[#FF6154] to-[#FF7A6B] px-4 py-2.5 font-semibold text-sm text-white shadow-sm transition-all hover:from-[#FF6154]/90 hover:to-[#FF7A6B]/90 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6154] focus-visible:ring-offset-2">
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
            View Full Profile
          </button>

          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 font-semibold text-gray-700 text-sm shadow-sm transition-all hover:border-gray-300 hover:bg-gray-50 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6154] focus-visible:ring-offset-2">
            {isExpanded ? (
              <>
                Hide Details
                <svg
                  className="h-4 w-4 transition-transform"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 15l7-7 7 7"
                  />
                </svg>
              </>
            ) : (
              <>
                View Breakdown
                <svg
                  className="h-4 w-4 transition-transform"
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
              </>
            )}
          </button>
        </div>
      </div>

      {/* Expanded Breakdown */}
      {isExpanded && (
        <CompatibilityBreakdown
          skillScore={match.skillScore}
          stageScore={match.stageScore}
          commitmentScore={match.commitmentScore}
          riskScore={match.riskScore}
          workStyleScore={match.workStyleScore}
          decisionScore={match.decisionScore}
          ambitionScore={match.ambitionScore}
        />
      )}
    </div>
  );
}
