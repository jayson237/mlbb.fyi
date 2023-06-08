"use client";
// @ts-nocheck

import { GradiantCard } from "@/components/shared/gradiant-card";
import { Hero } from "@prisma/client";
import { Progress } from "@/components/shared/progress";
import Image from "next/image";

export default function HeroFyi({ hero }: { hero: Hero | null }) {
  const data = [
    {
      name: "Ability",
      // @ts-ignore
      value: hero?.details.ability,
    },
    {
      name: "Offense",
      // @ts-ignore
      value: hero?.details.offense,
    },
    {
      name: "Durability",
      // @ts-ignore
      value: hero?.details.durability,
    },
    {
      name: "Difficulty",
      // @ts-ignore
      value: hero?.details.difficulty,
    },
  ];
  return (
    <div className="flex flex-col">
      <GradiantCard className="my-4 h-fit w-full">
        <div className="flex flex-row gap-x-4 sm:gap-x-8">
          <Image
            src={hero?.img || "/nana.jpg"}
            alt={hero?.name || ""}
            width={96}
            height={128}
            className="h-[250px] w-[150px] overflow-hidden rounded-lg bg-cover bg-top bg-no-repeat sm:h-[300px] sm:w-[169px]"
            priority
          />

          <div className="flex flex-col gap-x-4 sm:gap-x-8">
            <div className="flex flex-row items-center gap-2">
              <p className="font-heading text-xl md:text-3xl">
                {/* @ts-ignore */}
                {hero?.details.heroName}
              </p>
              <Image
                src={`https://res.cloudinary.com/dvm5vog2j/image/upload/v1686042255/mlbb.fyi/heroRole/${hero?.role[0]}.webp`}
                alt={hero?.role[0] || ""}
                width={25}
                height={25}
                className="mb-[5px] h-[25px] w-[25px]"
              />
              {hero?.role[1] && (
                <Image
                  src={`https://res.cloudinary.com/dvm5vog2j/image/upload/v1686042255/mlbb.fyi/heroRole/${hero?.role[1]}.webp`}
                  alt={hero?.role[1] || ""}
                  width={25}
                  height={20}
                  className="mb-[5px] h-[25px] w-[25px]"
                />
              )}
            </div>
            <div className="flex flex-row items-center">
              <Image
                /* @ts-ignore */
                src={`https://res.cloudinary.com/dvm5vog2j/image/upload/v1685987710/mlbb.fyi/heroType/${hero?.details.heroType}.webp`}
                /* @ts-ignore */
                alt={hero?.details.heroType || ""}
                width={20}
                height={20}
                className="mr-2 h-[20px] w-[20px]"
              />
              <p className="text-semibold text-[12px] text-gray-500 sm:text-sm">
                {/* @ts-ignore */}
                {`${hero?.details.heroType} (${hero?.role[0]}${
                  hero?.role[1] ? " - " + hero?.role[1] : ""
                })`}
              </p>
            </div>

            <div className="my-3 flex flex-row gap-4 sm:my-4  sm:gap-8">
              <div className="flex flex-col">
                <p className="font-heading text-[12px] sm:text-[16px]">
                  Winrate
                </p>
                <p className="text-[12px] sm:text-[20px]">{hero?.win}</p>
              </div>
              <div className="flex flex-col">
                <p className="font-heading text-[12px] sm:text-[16px]">Pick</p>
                <p className="text-[12px] sm:text-[20px]">{hero?.use}</p>
              </div>
              <div className="flex flex-col">
                <p className="font-heading text-[12px] sm:text-[16px]">Ban</p>
                <p className="text-[12px] sm:text-[20px]">{hero?.ban}</p>
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
                  className="w-full sm:w-[300px]"
                />
              </div>
            ))}
          </div>
        </div>
      </GradiantCard>
    </div>
  );
}
