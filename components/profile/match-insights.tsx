import { GradiantCard } from "../shared/gradiant-card";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";

interface MatchInsightsProps {
  title: string;
  matchPlayed: {
    total: number;
    data: {
      id: string;
      total: number;
      win: number;
      name: string;
      _id: string;
    }[];
  }[];
  winRate: {
    totalClassic: number | 0;
    totalRanked: number | 0;
  } | null;
  matchType: number;
  totalType: "classic" | "ranked";
}

const MatchInsights: React.FC<MatchInsightsProps> = ({
  title,
  matchPlayed,
  winRate,
  matchType,
  totalType,
}) => {
  const total = matchPlayed[matchType]?.total;
  const winRates =
    totalType === "classic" ? winRate?.totalClassic : winRate?.totalRanked;
  const winRatePercentage = ((winRates ?? 0) * 100) / (total ?? 1);

  return (
    <GradiantCard title={title}>
      <p className="my-16 text-right text-xl/[16px] font-semibold sm:mt-7 md:mt-12 md:text-2xl lg:text-3xl">
        {total}
      </p>
      <div className="relative">
        <CircularProgressbar
          value={winRatePercentage}
          styles={buildStyles({
            textColor: "#FFFF",
            trailColor: `#232323`,
            pathColor: `#74E092`,
          })}
        />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl font-semibold text-white">
          {`${winRatePercentage.toFixed(2)}%`}
        </div>
      </div>
    </GradiantCard>
  );
};

export default MatchInsights;
