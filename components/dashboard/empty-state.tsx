interface EmptyStateProps {
  hasMatches: boolean;
  role: "founder" | "cofounder";
}

export function EmptyState({ hasMatches, role }: EmptyStateProps) {
  return (
    <div className="rounded-2xl border border-gray-200/80 bg-linear-to-br from-white to-gray-50/50 p-12 text-center shadow-sm">
      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-linear-to-br from-[#FF6154]/10 to-[#FF6154]/5">
        <svg
          className="h-8 w-8 text-[#FF6154]"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
      </div>
      <h3 className="mb-2 font-bold text-gray-900 text-xl">
        {hasMatches ? "No Matches Found" : "No Matches Yet"}
      </h3>
      <p className="mx-auto max-w-md text-gray-600 text-sm leading-relaxed">
        {hasMatches
          ? "No matches found with your current filters. Try adjusting your search criteria to see more results."
          : `We're constantly adding new ${role === "founder" ? "co-founders" : "ventures"}. Check back soon to find your perfect match!`}
      </p>
      {hasMatches && (
        <div className="mt-6 inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-gray-500 text-sm shadow-sm ring-1 ring-gray-200 ring-inset">
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
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          Try clearing filters to see all available matches
        </div>
      )}
    </div>
  );
}
