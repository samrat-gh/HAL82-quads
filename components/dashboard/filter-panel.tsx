interface FilterPanelProps {
  role: "founder" | "cofounder";
  minScore: number;
  skillFilter: string;
  stageFilter: string;
  experienceFilter: string;
  sortBy: string;
  onMinScoreChange: (value: number) => void;
  onSkillFilterChange: (value: string) => void;
  onStageFilterChange: (value: string) => void;
  onExperienceFilterChange: (value: string) => void;
  onSortByChange: (value: string) => void;
  onClearAll: () => void;
}

export function FilterPanel({
  role,
  minScore,
  skillFilter,
  stageFilter,
  experienceFilter,
  sortBy,
  onMinScoreChange,
  onSkillFilterChange,
  onStageFilterChange,
  onExperienceFilterChange,
  onSortByChange,
  onClearAll,
}: FilterPanelProps) {
  return (
    <div className="mb-8 rounded-2xl border border-gray-200/80 bg-linear-to-br from-white to-gray-50/50 p-6 shadow-sm backdrop-blur-sm">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="font-bold text-gray-900 text-lg">Filter Matches</h2>
          <p className="mt-1 text-gray-500 text-sm">
            Narrow down your search criteria
          </p>
        </div>
        <button
          type="button"
          onClick={onClearAll}
          className="flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-1.5 font-medium text-gray-600 text-sm transition-all hover:border-gray-300 hover:bg-white hover:text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6154] focus-visible:ring-offset-2">
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
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
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
            onChange={(e) => onMinScoreChange(Number(e.target.value))}
            className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-gray-900 text-sm shadow-sm transition-all hover:border-gray-300 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#FF6154]">
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
            onChange={(e) => onSkillFilterChange(e.target.value)}
            className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-gray-900 text-sm shadow-sm transition-all hover:border-gray-300 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#FF6154]">
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
              onChange={(e) => onStageFilterChange(e.target.value)}
              className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-gray-900 text-sm shadow-sm transition-all hover:border-gray-300 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#FF6154]">
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
              onChange={(e) => onExperienceFilterChange(e.target.value)}
              className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-gray-900 text-sm shadow-sm transition-all hover:border-gray-300 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#FF6154]">
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
            onChange={(e) => onSortByChange(e.target.value)}
            className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-gray-900 text-sm shadow-sm transition-all hover:border-gray-300 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#FF6154]">
            <option value="score">Compatibility Score</option>
            <option value="skill">Skill/Expertise</option>
            {role === "cofounder" && (
              <option value="stage">Project Stage</option>
            )}
          </select>
        </div>
      </div>
    </div>
  );
}
