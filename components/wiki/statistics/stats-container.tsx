// @ts-nocheck
"use client";

import React, { useState } from "react";
import { TourneyStats } from "@prisma/client";
import { GradiantCard } from "@/components/shared/gradiant-card";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface IStats {
  serverStats: any[] | null;
  tourneyStats: TourneyStats[];
}

export default function StatsContainer({ serverStats, tourneyStats }: IStats) {
  const router = useRouter();
  const [selectedTourneyIndex, setSelectedTourneyIndex] = useState<number>(-3);

  const handleTourneyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedTourneyIndex = Number(event.target.value);
    setSelectedTourneyIndex(selectedTourneyIndex);
  };

  const selectedTourney = tourneyStats[selectedTourneyIndex] || null;
  const renderList = [
    ...serverStats,
    ...tourneyStats.map((tourney) => tourney.data),
  ];

  return (
    <GradiantCard className="mb-8" variant="clean">
      <select
        className="mb-8 h-12 w-full rounded-xl border border-navy-400 bg-navy-900 p-2 shadow-sm focus:border-navy-600 focus:outline-none focus:ring-1 focus:ring-navy-600"
        value={selectedTourneyIndex}
        onChange={handleTourneyChange}
      >
        <option value={-3}>All ranks</option>
        <option value={-2}>Mythic</option>
        <option value={-1}>Glory</option>
        {tourneyStats.map((tourney, index) => (
          <option key={tourney.id} value={index}>
            {tourney.tournament}
          </option>
        ))}
      </select>
      {renderList[selectedTourneyIndex + 3].length !== 0 ? (
        <div className="grid grid-cols-4 gap-4">
          <div className="mb-4 font-heading text-xl">Hero</div>
          <div className="text-lg mb-4 text-end font-heading md:text-xl">
            Win (%)
          </div>
          <div className="text-lg mb-4 text-end font-heading md:text-xl">
            Pick (%)
          </div>
          <div className="text-lg mb-4 text-end font-heading md:text-xl">
            Ban (%)
          </div>

          {renderList[selectedTourneyIndex + 3].map((hero, i) => (
            <React.Fragment key={i}>
              <div className="text-start font-sat text-sm md:text-[16px]">
                <div
                  className="flex flex-row items-center hover:cursor-pointer "
                  onClick={() =>
                    router.push(
                      `wiki/heroes/${
                        hero.name
                          ? hero.name.toLowerCase()
                          : hero.hero.toLowerCase()
                      }`
                    )
                  }
                >
                  <Image
                    src={`https://res.cloudinary.com/dvm5vog2j/image/upload/c_fill,h_192,w_192,g_north//v1686210606/mlbb.fyi/hero/${(
                      hero.name || hero.hero
                    ).replace(/[ '\s]/g, "_")}
                    .webp`}
                    alt={""}
                    width={48}
                    height={48}
                    className="mr-2 h-[24px] w-[24px] rounded-full md:mr-4 md:h-[48px] md:w-[48px]"
                  />
                  <p className=" hover:underline">{hero.name || hero.hero}</p>
                </div>
              </div>

              <div className="flex items-center justify-end font-sat text-sm md:text-[16px]">
                {hero.win?.slice(0, -1) ||
                  hero.picks?.winRate.slice(0, -1) ||
                  (0.0).toFixed(2)}
              </div>
              <div className="flex items-center justify-end font-sat text-sm md:text-[16px]">
                {hero.use?.slice(0, -1) || hero.picks?.presence.slice(0, -1)}
              </div>
              <div className="flex items-center justify-end font-sat text-sm md:text-[16px]">
                {hero.ban?.slice(0, -1) || hero.banPresence.slice(0, -1)}
              </div>
              {i + 1 !== renderList[selectedTourneyIndex + 3].length && (
                <div
                  className="inset-x-0 h-0.5 w-full bg-navy-400/30"
                  style={{ gridColumn: "1 / -1" }}
                ></div>
              )}
            </React.Fragment>
          ))}
        </div>
      ) : (
        <p className="font-heading text-sm md:text-xl">
          There is no such data yet
        </p>
      )}
    </GradiantCard>
  );
}
