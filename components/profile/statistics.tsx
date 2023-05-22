import React from "react";
import { GradiantCard } from "../shared/gradiant-card";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { Progress } from "../shared/progress";
import MatchInsights from "./match-insights";
import { match } from "assert";
import Favourites from "./fav";
import InfoCard from "./player-info";

interface StatisticsProps {
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
  ownedHero: {
    total: number;
    data: {
      hero: string;
      id: number;
      _id: string;
    }[];
  };
  winRate: {
    totalClassic: number | 0;
    totalRanked: number | 0;
  } | null;
}

const Statistics: React.FC<StatisticsProps> = ({
  matchPlayed,
  ownedHero,
  winRate,
}) => {
  return (
    <div className="flex w-full flex-col gap-4 xl:flex-row">
      <div className="flex w-full max-w-lg flex-col gap-y-4 md:w-fit">
        <div className="flex w-full flex-row gap-x-4 md:w-fit">
          <InfoCard
            className="w-full md:w-60 md:max-w-[240px]"
            title="Heroes Owned"
            value={ownedHero?.total}
          />
          <InfoCard
            className="w-full md:w-60 md:max-w-[240px]"
            title="Match Played"
            value={matchPlayed[0]?.total + matchPlayed[1]?.total}
          />
        </div>

        <div className="w-full">
          <div className="mt-0.5 flex gap-x-4">
            <MatchInsights
              title="Ranked Matches"
              matchPlayed={matchPlayed}
              winRate={winRate}
              matchType={1}
              totalType="ranked"
            />
            <MatchInsights
              title="Classic Matches"
              matchPlayed={matchPlayed}
              winRate={winRate}
              matchType={0}
              totalType="classic"
            />
          </div>
        </div>
      </div>

      <div className="flex w-full max-w-lg flex-col gap-4">
        <Favourites
          title="Classic Favourites"
          matchPlayed={matchPlayed}
          matchType={0}
        />
        <Favourites
          title="Classic Favourites"
          matchPlayed={matchPlayed}
          matchType={1}
        />
      </div>
    </div>
  );
};

export default Statistics;
