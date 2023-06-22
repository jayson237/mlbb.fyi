"use client";

import { GradiantCard } from "@/components/shared/gradiant-card";
import { Progress } from "@/components/shared/progress";

interface MatchInsightsProps {
  title: string;
  totalMatches: number;
  winrate: number;
}

const MatchInsights: React.FC<MatchInsightsProps> = ({
  title,
  totalMatches,
  winrate,
}) => {
  return (
    <GradiantCard variant="clean">
      <p className="font-light">{title}</p>
      <p className="mt-1 font-sat text-2xl font-bold xl:text-3xl">
        {((winrate * totalMatches) / 100).toFixed(0)}{" "}
        <span className="text-base/[0px]">/ {totalMatches} match</span>
      </p>

      <div className="mb-1 mt-2 flex items-center justify-between gap-1">
        <Progress pos="left" value={winrate} max={100} className="h-4" />
        <p className="text-sm font-medium">{winrate.toFixed(0) + "%"}</p>
      </div>
    </GradiantCard>
  );
};

export default MatchInsights;
