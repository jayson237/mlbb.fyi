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
    <GradiantCard title={title} variant="clean">
      <div className={isHorizontal ? "flex flex-row justify-between" : ""}>
        <div
          className={`${
            isHorizontal ? "" : "pl-20"
          }flex flex-row items-center gap-2`}
        >
          <p
            className={`${
              isBound ? "my-16" : "my-[1.8rem]"
            }  text-right font-sat text-xl/[16px] font-semibold sm:mt-12 md:text-2xl lg:text-3xl`}
          >
            {totalMatches}
          </p>
        </div>
        <div className="relative">
          <CircularProgressbar
            value={winrate}
            styles={buildStyles({
              strokeLinecap: "round",
              textColor: "#FFFF",
              trailColor: `#232323`,
              pathColor: `#74E092`,
            })}
            className={isHorizontal ? "mt-4 h-40 w-40" : ""}
          />
          <div className="md: absolute left-1/2 top-1/2 mt-1 -translate-x-1/2 -translate-y-1/2 text-white sm:text-xl md:text-2xl">
            <p className="text-sat font-semibold">{`${winrate.toFixed(2)}%`}</p>
            <p className="text-[10px] font-semibold">Winrate</p>
          </div>
        </div>
      </div>
    </GradiantCard>
  );
};

export default MatchInsights;
