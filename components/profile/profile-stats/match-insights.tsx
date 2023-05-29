"use client";

import { GradiantCard } from "@/components/shared/gradiant-card";
import { match } from "assert";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";

interface MatchInsightsProps {
  title: string;
  matchPlayed: {
    mode: string;
    total: number;
    winrate: number;
    data: {
      id: string;
      total: number;
      win: number;
      name: string;
      _id: string;
    }[];
  }[];
  matchType: number;
  isBound: boolean;
}

const MatchInsights: React.FC<MatchInsightsProps> = ({
  title,
  matchPlayed,
  matchType,
  isBound,
}) => {
  const totalMatches = (matchPlayed && matchPlayed[matchType]?.total) || 0;
  const winRates = (matchPlayed && matchPlayed[matchType]?.winrate * 100) || 0;

  return (
    <GradiantCard title={title}>
      <p
        className={`${
          isBound ? "my-16" : "my-[1.8rem]"
        } text-right text-xl/[16px] font-semibold sm:mt-7 md:mt-12 md:text-2xl lg:text-3xl`}
      >
        {totalMatches}
      </p>
      <div className="relative">
        <CircularProgressbar
          value={winRates}
          styles={buildStyles({
            strokeLinecap: "round",
            textColor: "#FFFF",
            trailColor: `#232323`,
            pathColor: `#74E092`,
          })}
        />
        <div className="md: absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-semibold text-white sm:text-xl md:text-2xl">
          {`${winRates.toFixed(2)}%`}
          <p className="text-[10px]">Winrate</p>
        </div>
      </div>
    </GradiantCard>
  );
};

export default MatchInsights;
