"use client";

import { GradiantCard } from "@/components/shared/gradiant-card";
import { Progress } from "@/components/shared/progress";
import { cn } from "@/lib/utils";

interface MatchInsightsProps {
  title: string;
  totalMatches: number;
  winrate: number;
  isBound: boolean;
}

const MatchInsights: React.FC<MatchInsightsProps> = ({
  title,
  totalMatches,
  winrate,
  isBound,
}) => {
  return (
    <GradiantCard variant="clean">
      <p className="font-light">{title}</p>
      <p className="mt-1 font-sat text-3xl font-bold">
        {((winrate * totalMatches) / 100).toFixed(0)}{" "}
        <span className="text-base/[0px]">/ {totalMatches} match</span>
      </p>

      <div className="mb-1 mt-2 flex items-center justify-between gap-1">
        <Progress pos="left" value={winrate} max={100} className="h-4" />
        <p className="text-sm font-medium">{winrate.toFixed(0) + "%"}</p>
      </div>
      {/* <div className="mt-2 w-full rounded-xl bg-navy-500 py-1 text-center font-bold shadow-inner">
        {((winrate / totalMatches) * 100).toFixed(1)} %
      </div> */}
      {/* <h1 className="text-sm/[10px] font-bold tracking-[-3%] md:text-base/[16px]">
        {title}
      </h1> */}
      {/* <div className={isHorizontal ? "flex flex-row justify-between" : ""}> */}
      {/* <div
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
            <p className="font-sat font-semibold">{`${winrate.toFixed(2)}%`}</p>
            <p className="text-[10px] font-semibold">Winrate</p>
          </div>
        </div>
      </div>
        </div> */}
      {/* <div className="relative mt-5">
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
        <div className="md: absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-semibold text-white sm:text-xl md:text-2xl">
          {`${winrate.toFixed(2)}%`}
          <p className="text-[10px]">Winrate</p>
        </div>
      </div> */}
    </GradiantCard>
    // </div>
  );
};

export default MatchInsights;
