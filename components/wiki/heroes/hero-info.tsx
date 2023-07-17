// @ts-nocheck
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useTabStore from "@/lib/state/useTabStore";
import { GradiantCard } from "@/components/shared/gradiant-card";
import { Hero } from "@prisma/client";
import { Progress } from "@/components/shared/progress";
import Image from "next/image";
import MatchInsights from "@/components/profile/profile-stats/match-insights";

interface HeroFyiContainer {
  hero: Hero | null;
  heroBuild: Object[] | null;
  heroSpell: Object[] | null;
  heroEmblem: Object[] | null;
  heroWeakAgainst?: Object[] | null;
  heroStrongAgainst?: Object[] | null;
  // matches?: {
  //   mode: string;
  //   total: number;
  //   winrate: number;
  //   data: {
  //     id: string;
  //     total: number;
  //     win: number;
  //     name: string;
  //     _id: string;
  //   }[];
  // }[];
  // classicIndex?: number;
  // rankedIndex?: number;
  // showWR: boolean;
}

export default function HeroFyi({
  hero,
  heroStats,
  heroBuild,
  heroSpell,
  heroEmblem,
  heroWeakAgainst,
  heroStrongAgainst,
  matches,
  classicIndex,
  rankedIndex,
  showWR,
}: HeroFyiContainer) {
  const router = useRouter();
  const { selectedTab, setSelectedTab } = useTabStore();

  useEffect(() => {
    setSelectedTab("heroes");
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const tier = () => {
    for (let i = 0; i < tiers.length; i++) {
      if (hero?.tiers === tiers[i].tier) {
        return i;
      } else if (hero?.tiers === "SS") {
        return 0;
      }
    }
    return -1;
  };

  const uniqueSpells = Array.from(
    new Set(heroSpell?.map((spell) => spell.name))
  );

  const uniqueEmblems = Array.from(
    new Set(heroEmblem?.map((emblem) => emblem.name))
  );

  const uniqueCounters = Array.from(
    new Set(heroWeakAgainst?.map((hero) => hero))
  );

  const heroDetails = hero?.details;
  const data = [
    {
      name: "Ability",
      value: heroDetails.ability,
    },
    {
      name: "Offense",
      value: heroDetails.offense,
    },
    {
      name: "Durability",
      value: heroDetails.durability,
    },
    {
      name: "Difficulty",
      value: heroDetails.difficulty,
    },
  ];
  return (
    <div className="flex flex-col">
      <div className="flex flex-col sm:flex-row sm:gap-x-1.5">
        <GradiantCard className="mt-1.5 h-fit w-full" variant="clean">
          <div className="flex flex-row gap-x-4">
            <Image
              src={hero?.img || ""}
              alt={hero?.name || ""}
              width={96}
              height={128}
              className="h-[255px] w-[240px] overflow-hidden rounded-lg bg-cover bg-top bg-no-repeat sm:h-[300px] sm:w-[270px]"
              priority
            />

            <div className="flex w-full flex-col gap-x-1.5 ">
              <div className="flex items-center justify-between">
                <div className="flex flex-row items-center gap-2">
                  <p className="font-heading text-xl md:text-3xl">
                    {heroDetails.heroName}
                  </p>
                  <Image
                    src={`https://res.cloudinary.com/dvm5vog2j/image/upload/v1686042255/mlbb.fyi/heroRole/${hero?.role[0]}.webp`}
                    alt={hero?.role[0] || ""}
                    width={25}
                    height={25}
                    className="mb-1 h-[18px] w-[18px] md:h-[25px] md:w-[25px]"
                  />
                  {hero?.role[1] && (
                    <Image
                      src={`https://res.cloudinary.com/dvm5vog2j/image/upload/v1686042255/mlbb.fyi/heroRole/${hero?.role[1]}.webp`}
                      alt={hero?.role[1] || ""}
                      width={25}
                      height={25}
                      className="mb-1 h-[18px] w-[18px] md:h-[25px] md:w-[25px]"
                    />
                  )}
                </div>
                <div className="text-md mb-1 rounded-full bg-navy-600 px-2 font-semibold ">
                  <p>{hero?.tier}</p>
                </div>
              </div>
              <div className="mb-1 flex flex-row items-center">
                <Image
                  src={`https://res.cloudinary.com/dvm5vog2j/image/upload/v1685987710/mlbb.fyi/heroType/${
                    heroDetails.heroType.split("/")[0]
                  }.webp`}
                  alt={heroDetails.heroType || ""}
                  width={20}
                  height={20}
                  className="mr-2 h-[20px] w-[20px]"
                />
                <p className="text-semibold text-[12px] text-gray-500 sm:text-sm">
                  {`${heroDetails.heroType} (${hero?.role[0]}${
                    hero?.role[1] ? " - " + hero?.role[1] : ""
                  })`}
                </p>
              </div>

              <div className="my-3 flex flex-row gap-4   sm:gap-8">
                <div className="flex flex-col">
                  <p className="font-heading text-[12px] sm:text-[16px]">
                    Winrate
                  </p>
                  <p className="font-sat text-[12px] font-semibold sm:text-[20px]">
                    {hero?.stats.all.win || "0.00%"}
                  </p>
                </div>
                <div className="flex flex-col">
                  <p className=" font-heading text-[12px] sm:text-[16px]">
                    Pick
                  </p>
                  <p className="font-sat text-[12px] font-semibold sm:text-[20px]">
                    {hero?.stats.all.use || "0.00%"}
                  </p>
                </div>
                <div className="flex flex-col">
                  <p className="font-heading text-[12px] sm:text-[16px]">Ban</p>
                  <p className="font-sat text-[12px] font-semibold sm:text-[20px]">
                    {hero?.stats.all.ban || "0.00%"}
                  </p>
                </div>
              </div>

              {data.map((item, i) => (
                <div key={i} className="mt-[6px] sm:mt-2">
                  <div className="flex justify-between">
                    <p className="text-[12px]">{item.name}</p>
                  </div>
                  <Progress
                    value={item.value ? parseInt(item.value) : 0}
                    max={100}
                  />
                </div>
              ))}
            </div>
          </div>
        </GradiantCard>

        <GradiantCard className="mt-1.5 h-[340px] w-full" variant="clean">
          <p className="font-heading text-xl md:text-3xl">Equipments</p>
          <div className="flex flex-col gap-y-2">
            <p className="text-sm text-gray-500">
              {uniqueSpells.length < 2
                ? "Recommended spell"
                : "Recommended spells"}
            </p>
            <div className="flex flex-row">
              {uniqueSpells.map((spellName, i) => (
                <div key={i} className="mr-2 sm:mr-4">
                  <div className="relative">
                    <Image
                      src={`https://res.cloudinary.com/dvm5vog2j/image/upload/v1686126880/mlbb.fyi/spells/${spellName}.webp`}
                      alt=""
                      width={50}
                      height={50}
                      className="h-[45px] w-[45px] sm:h-[50px] sm:w-[50px] "
                    />
                    <div className=" bg-opacity/75 absolute bottom-0 left-0 h-full w-full items-center justify-center rounded-full bg-black/80 py-1 text-center text-[10px] font-medium text-white opacity-0 transition-opacity duration-200">
                      <p className="mt-3">{spellName}</p>
                    </div>
                  </div>
                  <style jsx>{`
                    .relative:hover .absolute {
                      opacity: 1;
                    }
                  `}</style>
                </div>
              ))}
            </div>
            <p className="text-sm text-gray-500">
              {uniqueEmblems.length < 2
                ? "Recommended emblem"
                : "Recommended emblems"}
            </p>
            <div className="flex flex-row">
              {uniqueEmblems.map((emblemName, i) => (
                <div key={i} className="mr-2 sm:mr-4">
                  <div className="relative">
                    <Image
                      src={`https://res.cloudinary.com/dvm5vog2j/image/upload/v1686126880/mlbb.fyi/emblems/${emblemName.replace(
                        /[' ]/g,
                        "_"
                      )}.webp`}
                      alt=""
                      width={50}
                      height={50}
                      className="h-[45px] w-[45px] sm:h-[50px] sm:w-[50px] "
                    />
                    <div className=" bg-opacity/75 absolute bottom-0 left-0 h-full w-full items-center justify-center rounded-full bg-black/80 py-1 text-center text-[10px] font-medium text-white opacity-0 transition-opacity duration-200">
                      <p className="mt-2">{emblemName}</p>
                    </div>
                  </div>
                  <style jsx>{`
                    .relative:hover .absolute {
                      opacity: 1;
                    }
                  `}</style>
                </div>
              ))}
            </div>
            <div className="flex flex-row items-center">
              <p className="font-heading">mlbb.fyi</p>
              <p className="text-semibold text-sm text-gray-500">
                &apos;s recommended build
              </p>
            </div>
            <div className="flex flex-row">
              {heroBuild?.map((item, i) => (
                <div key={i} className="mr-2 sm:mr-4">
                  <div className="relative">
                    <Image
                      src={`https://res.cloudinary.com/dvm5vog2j/image/upload/v1686126880/mlbb.fyi/items/${item?.name.replace(
                        /[' ]/g,
                        "_"
                      )}.webp`}
                      alt={""}
                      width={50}
                      height={50}
                      className="flex"
                    />
                    <div className="bg-opacity/75 absolute bottom-0 left-0 h-full w-full items-center justify-center rounded-full bg-black/80 py-1 text-center text-[10px] font-medium text-white opacity-0 transition-opacity duration-200">
                      <p className="mt-2">{item?.name}</p>
                    </div>
                  </div>
                  <style jsx>{`
                    .relative:hover .absolute {
                      opacity: 1;
                    }
                  `}</style>
                </div>
              ))}
            </div>
          </div>
        </GradiantCard>
      </div>

      {/* {showWR && (
        <div className="mt-1.5 flex flex-col gap-y-1.5 sm:flex-row sm:gap-x-1.5">
          <MatchInsights
            title={`Your classic ${heroDetails?.heroName} matches`}
            totalMatches={matches[0]?.data?.[classicIndex]?.total ?? 0}
            winrate={
              (matches?.[0]?.data?.[classicIndex]?.win /
                matches?.[0]?.data?.[classicIndex]?.total || 0) * 100
            }
            isBound={matches}
            isHorizontal={true}
          />
          <MatchInsights
            title={`Your ranked ${heroDetails?.heroName} matches`}
            totalMatches={matches?.[1]?.data?.[rankedIndex]?.total ?? 0}
            winrate={
              (matches?.[1]?.data?.[rankedIndex]?.win /
                matches?.[1]?.data?.[rankedIndex]?.total || 0) * 100
            }
            isBound={matches}
            isHorizontal={true}
          />
        </div>
      )} */}

      <GradiantCard className="mt-1.5 h-fit w-full" variant="clean">
        {heroStrongAgainst.length !== 0 && (
          <>
            <p className="font-heading text-xl md:text-3xl">Strong against</p>
            <div className="my-4">
              <div className="grid grid-cols-3 flex-row gap-4 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7">
                {heroStrongAgainst.map((hero, i) => (
                  <div
                    key={i}
                    onClick={() => {
                      router.push(`/wiki/heroes/${hero.name.toLowerCase()}`);
                    }}
                    className="mx-auto cursor-pointer"
                  >
                    <div className="relative">
                      <Image
                        src={
                          hero?.img?.split("/image/upload/")[0] +
                          "/image/upload/c_fill,h_220,w_220,g_north/" +
                          hero?.img?.split("/image/upload/")[1]
                        }
                        alt={hero.name}
                        width={110}
                        height={110}
                        className="h-[55px] w-[55px] rounded-full sm:h-[110px] sm:w-[110px]"
                        loading="lazy"
                      />

                      <div className="bg-opacity/75 absolute bottom-0 left-0 h-[55px] w-[55px] items-center rounded-full bg-black/80 py-1 text-center text-sm font-medium text-white opacity-0 transition-opacity duration-200 sm:h-[110px] sm:w-[110px]">
                        {/* <p className="mt-3 justify-center text-[10px] md:mt-11 md:text-[14px]">
                            {hero?.name}
                          </p> */}
                      </div>
                    </div>
                    <style jsx>{`
                      .relative:hover .absolute {
                        opacity: 1;
                      }
                    `}</style>
                    <p className="mt-2 text-center text-[10px]  md:text-[14px]">
                      {hero?.name}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        <p className="font-heading text-xl md:text-3xl">Weak against</p>
        <div className="my-4">
          <div className="grid grid-cols-3 flex-row gap-4 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7">
            {uniqueCounters.map((counter, i) => (
              <div
                key={i}
                onClick={() => {
                  router.push(`/wiki/heroes/${counter.name.toLowerCase()}`);
                }}
                className="mx-auto cursor-pointer"
              >
                <div className="relative">
                  <Image
                    src={
                      counter?.img?.split("/image/upload/")[0] +
                      "/image/upload/c_fill,h_220,w_220,g_north/" +
                      counter?.img?.split("/image/upload/")[1]
                    }
                    alt={counter.name}
                    width={110}
                    height={110}
                    className="h-[55px] w-[55px] rounded-full sm:h-[110px] sm:w-[110px]"
                    loading="lazy"
                  />

                  <div className="bg-opacity/75 absolute bottom-0 left-0 h-[55px] w-[55px] items-center rounded-full bg-black/80 py-1 text-center text-sm font-medium text-white opacity-0 transition-opacity duration-200 sm:h-[110px] sm:w-[110px]">
                    {/* <p className="mt-3 justify-center text-[10px] md:mt-11 md:text-[14px]">
                            {counter?.name}
                          </p> */}
                  </div>
                </div>
                <style jsx>{`
                  .relative:hover .absolute {
                    opacity: 1;
                  }
                `}</style>
                <p className="mt-2 text-center text-[10px]  md:text-[14px]">
                  {counter?.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </GradiantCard>

      <GradiantCard className="mt-1.5 h-fit w-full" variant="clean">
        <p className="font-heading text-xl md:text-3xl">Passive</p>
        <div className="my-4">
          <div className="flex flex-row gap-2">
            {heroDetails.skill && (
              <>
                <Image
                  src={heroDetails.skill[3].icon}
                  alt={heroDetails.skill[3].name || ""}
                  width={60}
                  height={60}
                  className="mr-2 h-[60px] w-[60px] justify-start"
                />
                <div className="flex flex-col pr-2">
                  <p className="font-heading">{heroDetails.skill[3].name}</p>
                  <p
                    className="text-justify text-sm text-gray-400"
                    dangerouslySetInnerHTML={{
                      __html: heroDetails.skill[3].description,
                    }}
                  ></p>
                </div>
              </>
            )}
          </div>
        </div>
        <p className="font-heading text-xl md:text-3xl">Skills</p>
        <div className="my-4">
          {heroDetails.skill.slice(0, 3).map((skills, i) => {
            if (skills.name === "") return null;

            return (
              <div key={i} className="mb-8">
                <div className="flex flex-row gap-2">
                  <Image
                    src={skills.icon}
                    alt={skills.name || ""}
                    width={60}
                    height={60}
                    className="mr-2 h-[60px] w-[60px] justify-start"
                  />
                  <div className="flex flex-col pr-2">
                    <p className="font-heading">{skills.name}</p>
                    <p
                      className="text-justify text-sm text-gray-400"
                      dangerouslySetInnerHTML={{ __html: skills.description }}
                    ></p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </GradiantCard>
    </div>
  );
}
