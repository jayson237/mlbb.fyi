"use client";

import React from "react";
import Image from "next/image";

import InfoCard from "./profile-stats/player-info";
import MatchInsights from "./profile-stats/match-insights";
import Favourites from "./profile-stats/fav";

interface StatisticsProps {
  viewMatchPlayed: {
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
  viewOwnedHero: {
    total: number;
    data: {
      hero: string;
      id: number;
      _id: string;
    }[];
  };
  isBound: boolean;
}

const Statistics: React.FC<StatisticsProps> = ({
  viewMatchPlayed,
  viewOwnedHero,
  isBound,
}) => {
  const totalMatchPlayed =
    ((viewMatchPlayed && viewMatchPlayed[0]?.total) || 0) +
    ((viewMatchPlayed && viewMatchPlayed[1]?.total) || 0);
  const heroes = (viewOwnedHero && viewOwnedHero?.total) || 0;

  return (
    <div className="flex w-full flex-col gap-1.5 xl:flex-row">
      <div className="flex w-full max-w-lg flex-col gap-y-1.5 md:w-fit">
        <div className="flex w-full flex-row gap-x-1.5 md:w-fit">
          <InfoCard
            className="w-full md:w-60 md:max-w-[200px]"
            title="Heroes"
            value={heroes}
          />
          <InfoCard
            className="w-full md:w-60 md:max-w-[200px]"
            title="Played"
            value={totalMatchPlayed}
          />
        </div>

        <div className="w-full">
          <div className="flex flex-col gap-y-1.5">
            <MatchInsights
              title="Classic Win Statistic"
              totalMatches={(viewMatchPlayed && viewMatchPlayed[0]?.total) || 0}
              winrate={
                (viewMatchPlayed && viewMatchPlayed[0]?.winrate * 100) || 0
              }
            />
            <MatchInsights
              title="Ranked Win Statistic"
              totalMatches={(viewMatchPlayed && viewMatchPlayed[1]?.total) || 0}
              winrate={
                (viewMatchPlayed && viewMatchPlayed[1]?.winrate * 100) || 0
              }
            />
          </div>
        </div>
      </div>

      <div className="flex w-full max-w-lg flex-col gap-1.5 md:max-h-2">
        <Favourites
          title="Classic Favourites"
          viewMatchPlayed={viewMatchPlayed}
          matchType={0}
        />
        <Favourites
          title="Ranked Favourites"
          viewMatchPlayed={viewMatchPlayed}
          matchType={1}
        />
        {!isBound && (
          <>
            <p className="my-4 px-2 text-justify text-[12px] text-neutral-500">
              mlbb.fyi, an offspring of the audacious 2023 Orbital project,
              emerges as an independent entity, untethered from the endorsement
              of Moonton or Mobile Legends: Bang Bang. Its existence stands
              separate from the perspectives and voices officially associated
              with the illustrious Mobile Legends realm. As you delve into the
              depths of mlbb.fyi, remember that its contents and features do not
              align with the sanctioned views or opinions of Moonton or those
              involved in the creation and management of Mobile Legends.
            </p>
            <Image
              className="mr-auto pb-16 pl-[10px]"
              src={"/mlbb.fyi.svg"}
              alt="mlbb.fyi"
              width="250"
              height="55"
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Statistics;
