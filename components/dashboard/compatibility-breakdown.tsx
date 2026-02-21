interface CompatibilityBreakdownProps {
  skillScore: number;
  stageScore: number;
  commitmentScore: number;
  riskScore: number;
  workStyleScore: number;
  decisionScore: number;
  ambitionScore: number;
}

interface ScoreCardProps {
  label: string;
  score: number;
  maxScore: number;
}

function ScoreCard({ label, score, maxScore }: ScoreCardProps) {
  const percentage = (score / maxScore) * 100;

  return (
    <div className="group rounded-xl border border-gray-100 bg-white p-4 shadow-sm transition-all hover:border-gray-200 hover:shadow-md">
      <div className="mb-2 flex items-center justify-between">
        <span className="font-medium text-gray-700 text-sm">{label}</span>
        <span className="font-bold text-gray-900">
          {score}
          <span className="font-normal text-gray-400 text-xs">/{maxScore}</span>
        </span>
      </div>
      <div className="relative h-2.5 overflow-hidden rounded-full bg-gray-100">
        <div
          className="h-full rounded-full bg-linear-to-r from-[#FF6154] to-[#FF7A6B] transition-all duration-500 ease-out group-hover:from-[#FF6154] group-hover:to-[#FF8577]"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <div className="mt-1 text-right">
        <span className="font-medium text-gray-500 text-xs">
          {Math.round(percentage)}%
        </span>
      </div>
    </div>
  );
}

export function CompatibilityBreakdown({
  skillScore,
  stageScore,
  commitmentScore,
  riskScore,
  workStyleScore,
  decisionScore,
  ambitionScore,
}: CompatibilityBreakdownProps) {
  return (
    <div className="border-gray-100 border-t bg-linear-to-br from-gray-50 to-white p-6">
      <div className="mb-5">
        <h4 className="font-bold text-gray-900 text-lg">
          Compatibility Breakdown
        </h4>
        <p className="mt-1 text-gray-500 text-sm">
          Detailed score analysis across key dimensions
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <ScoreCard label="Skill Match" score={skillScore} maxScore={30} />
        <ScoreCard label="Stage Alignment" score={stageScore} maxScore={20} />
        <ScoreCard label="Commitment" score={commitmentScore} maxScore={15} />
        <ScoreCard label="Risk Appetite" score={riskScore} maxScore={10} />
        <ScoreCard label="Work Style" score={workStyleScore} maxScore={10} />
        <ScoreCard label="Decision Style" score={decisionScore} maxScore={10} />
        <ScoreCard label="Ambition" score={ambitionScore} maxScore={5} />
      </div>
    </div>
  );
}
