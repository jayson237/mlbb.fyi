"use client";

import { GradiantCard } from "@/components/shared/gradiant-card";
import { Hero } from "@prisma/client";
import { Progress } from "@/components/shared/progress";
import Image from "next/image";
import { parse } from "path";

export default function HeroFyi({ hero }: { hero: Hero | null }) {
  const heroData = [
    {
      name: "Ability",
      value: hero?.details.ability,
    },
    {
      name: "Offense",
      value: hero?.details.offense,
    },
    {
      name: "Durability",
      value: hero?.details.durability,
    },
    {
      name: "Difficulty",
      value: hero?.details.difficulty,
    },
  ];
  return (
    <div className="flex flex-col">
      <GradiantCard className="my-4 h-fit w-full">
        <div className="flex flex-row gap-x-4 ">
          <Image
            src={hero?.img || "/nana.jpg"}
            alt={hero?.name || ""}
            width={96}
            height={128}
            className="h-[200px] w-[112px] overflow-hidden rounded-lg bg-cover bg-top bg-no-repeat sm:h-[355px] sm:w-[200px]"
            priority
          />

          <div className="flex flex-col">
            <div className="flex flex-row items-center gap-2">
              <p className="font-heading text-xl md:text-3xl">{hero?.name}</p>
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
            <div className="flex flex-row">
              <Image
                src={`https://res.cloudinary.com/dvm5vog2j/image/upload/v1685987710/mlbb.fyi/heroType/${hero?.details.heroType}.webp`}
                alt={hero?.details.heroType || ""}
                width={20}
                height={20}
                className="mr-2 h-[20px] w-[20px]"
              />
              <p className="text-semibold sm:text-md text-sm text-gray-500">
                {`${hero?.details.heroType} (${hero?.role[0]}${
                  hero?.role[1] ? " - " + hero?.role[1] : ""
                })`}
              </p>
            </div>

            {heroData.map((item, i) => (
              <div key={i} className="mt-2">
                <div className="flex justify-between">
                  <p className="text-[12px]">{item.name}</p>
                </div>
                <Progress
                  value={item.value ? parseInt(item.value) : 0}
                  max={100}
                  className="w-[150px] sm:w-[350px]"
                />
              </div>
            ))}
          </div>
        </div>
      </GradiantCard>
    </div>
  );
}
