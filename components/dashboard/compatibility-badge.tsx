interface CompatibilityBadgeProps {
  score: number;
  className?: string;
}

export function CompatibilityBadge({
  score,
  className = "",
}: CompatibilityBadgeProps) {
  const getBadgeConfig = (score: number) => {
    if (score >= 80) {
      return {
        label: "Excellent Match",
        color:
          "bg-emerald-100 text-emerald-700 ring-1 ring-inset ring-emerald-600/20",
      };
    }
    if (score >= 60) {
      return {
        label: "Good Match",
        color: "bg-blue-100 text-blue-700 ring-1 ring-inset ring-blue-600/20",
      };
    }
    return {
      label: "Fair Match",
      color: "bg-amber-100 text-amber-700 ring-1 ring-inset ring-amber-600/20",
    };
  };

  const badge = getBadgeConfig(score);

  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 font-medium text-xs ${badge.color} ${className}`}>
      {badge.label}
    </span>
  );
}
