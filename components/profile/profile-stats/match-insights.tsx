"use client";

import { GradiantCard } from "@/components/shared/gradiant-card";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";

interface MatchInsightsProps {
  title: string;
  totalMatches: number;
  winrate: number;
  isBound: boolean;
  isHorizontal?: boolean;
}

const MatchInsights: React.FC<MatchInsightsProps> = ({
  title,
  totalMatches,
  winrate,
  isBound,
  isHorizontal,
}) => {
  return (
    <GradiantCard title={title}>
      <div className={isHorizontal ? "flex flex-row justify-between" : ""}>
        <p
          className={`${
            isBound ? "my-16" : "my-[1.8rem]"
          }  text-right text-xl/[16px] font-semibold sm:mt-7 md:mt-12 md:text-2xl lg:text-3xl`}
        >
          {isHorizontal ? (
            <div className="flex flex-row  gap-3">
              {totalMatches} <p className="mt-1 font-heading"> Matches</p>
            </div>
          ) : (
            totalMatches
          )}
        </p>
        <div className="relative">
          <CircularProgressbar
            value={winrate}
            styles={buildStyles({
              strokeLinecap: "round",
              textColor: "#FFFF",
              trailColor: `#232323`,
              pathColor: `#74E092`,
            })}
            className={isHorizontal ? "mt-2 h-40 w-40" : ""}
          />
          <div className="md: absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-semibold text-white sm:text-xl md:text-2xl">
            {`${winrate.toFixed(2)}%`}
            <p className="text-[10px]">Winrate</p>
          </div>
        </div>
      </div>
    </GradiantCard>
  );
};

export default MatchInsights;
