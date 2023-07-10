// @ts-nocheck
"use client";

import React, { useState } from "react";
import { TourneyStats } from "@prisma/client";
import { GradiantCard } from "@/components/shared/gradiant-card";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ArrowDown, ArrowUp } from "lucide-react";

interface IStats {
  serverStats: any[] | null;
  tourneyStats: TourneyStats[];
}

export default function StatsContainer({ serverStats, tourneyStats }: IStats) {
  const router = useRouter();
  const [selectedTourneyIndex, setSelectedTourneyIndex] = useState<number>(-3);
  const [selectedSortingOption, setSelectedSortingOption] =
    useState<string>("alphabet");
  const [ascendingOrder, setAscendingOrder] = useState<boolean>(true);

  const handleTourneyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedTourneyIndex = Number(event.target.value);
    setSelectedTourneyIndex(selectedTourneyIndex);
  };

  const handleSortingOptionChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedSortingOption = event.target.value;
    setSelectedSortingOption(selectedSortingOption);
  };

  const handleReverseList = () => {
    setAscendingOrder(!ascendingOrder);
  };

  const selectedTourney = tourneyStats[selectedTourneyIndex] || null;
  const renderList = [
    ...serverStats,
    ...tourneyStats.map((tourney) => tourney.data),
  ];

  let sortedList = [...renderList[selectedTourneyIndex + 3]];
  switch (selectedSortingOption) {
    case "alphabet":
      sortedList = sortedList.sort((a, b) => {
        const nameA = a.name || a.hero;
        const nameB = b.name || b.hero;
        return nameA.localeCompare(nameB);
      });
      break;
    case "pick":
      sortedList = sortedList.sort((a, b) => {
        const valueA =
          a.use?.slice(0, -1) || a.picks?.presence.slice(0, -1) || "0";
        const valueB =
          b.use?.slice(0, -1) || b.picks?.presence.slice(0, -1) || "0";
        return parseFloat(valueB) - parseFloat(valueA);
      });
      break;
    case "ban":
      sortedList = sortedList.sort((a, b) => {
        const valueA = a.ban?.slice(0, -1) || a.banPresence.slice(0, -1) || "0";
        const valueB = b.ban?.slice(0, -1) || b.banPresence.slice(0, -1) || "0";
        return parseFloat(valueB) - parseFloat(valueA);
      });
      break;
    case "winrate":
      sortedList = sortedList.sort((a, b) => {
        const valueA =
          a.win?.slice(0, -1) || a.picks?.winRate.slice(0, -1) || "0.0";
        const valueB =
          b.win?.slice(0, -1) || b.picks?.winRate.slice(0, -1) || "0.0";
        return parseFloat(valueB) - parseFloat(valueA);
      });
      break;
  }

  const sortedListCopy = ascendingOrder
    ? [...sortedList]
    : [...sortedList].reverse();

  return (
    <GradiantCard className="mb-8" variant="clean">
      <div className="mb-8 flex gap-4">
        <select
          className="h-10 w-1/2 rounded-xl border border-navy-300/50 bg-black p-2 shadow-sm focus:border-navy-600 focus:outline-none focus:ring-1 focus:ring-navy-600"
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
        <select
          className="h-10 w-1/2 rounded-xl border border-navy-300/50 bg-black p-2 shadow-sm focus:border-navy-600 focus:outline-none focus:ring-1 focus:ring-navy-600"
          value={selectedSortingOption}
          onChange={handleSortingOptionChange}
        >
          <option value="alphabet">Alphabet</option>
          <option value="pick">Pick</option>
          <option value="ban">Ban</option>
          <option value="winrate">Win Rate</option>
        </select>
        <button
          className="flex flex-row items-center transition-all duration-300 hover:text-navy-300"
          onClick={handleReverseList}
        >
          {ascendingOrder ? (
            <ArrowUp className="h-6 w-6" />
          ) : (
            <ArrowDown className="h-6 w-6" />
          )}
        </button>
      </div>

      {sortedListCopy.length !== 0 ? (
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

          {sortedListCopy.map((hero, i) => {
            return (
              <React.Fragment key={i}>
                <div className="flex flex-row text-start font-sat text-sm md:text-[16px]">
                  <Image
                    src={`https://res.cloudinary.com/dvm5vog2j/image/upload/c_fill,h_192,w_192,g_north/v1686210606/mlbb.fyi/hero/${(
                      hero.name || hero.hero
                    ).replace(/[ '\s]/g, "_")}.webp`}
                    alt={hero.name || hero.hero}
                    width={48}
                    height={48}
                    className="mr-2 h-[24px] w-[24px] rounded-full md:mr-4 md:h-[48px] md:w-[48px]"
                    loading="lazy"
                  />
                  <p
                    className="flex flex-row items-center hover:cursor-pointer hover:underline"
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
                    {hero.name || hero.hero}
                  </p>
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
                {i + 1 !== sortedListCopy.length && (
                  <div
                    className="inset-x-0 h-0.5 w-full bg-navy-400/30"
                    style={{ gridColumn: "1 / -1" }}
                  ></div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      ) : (
        <p className="font-heading text-sm md:text-xl">
          There is no such data yet
        </p>
      )}
    </GradiantCard>
  );
}
