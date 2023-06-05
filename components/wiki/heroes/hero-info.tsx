"use client";

import { GradiantCard } from "@/components/shared/gradiant-card";
import { Hero } from "@prisma/client";
import Image from "next/image";

export default function HeroFyi({ hero }: { hero: Hero | null }) {
  console.log(hero?.details.heroType);
  return (
    <div className="flex flex-col">
      <GradiantCard className="my-4 h-fit w-full">
        <div className="flex flex-row gap-x-4 ">
          <Image
            src={hero?.img || "/nana.jpg"}
            alt={hero?.name || ""}
            width={2160}
            height={3840}
            className="h-[178px] w-[100px] overflow-hidden rounded-lg bg-cover bg-top bg-no-repeat sm:h-[355px] sm:w-[200px]"
            priority
          />

          <div className="flex flex-col">
            <p className="font-heading text-xl md:text-3xl">{hero?.name}</p>
            <div className="flex flex-row">
              <p className="text-normal sm:text-md text-sm text-gray-500">
                {hero?.details.heroType || ""}
              </p>
              <Image
                src={`/${hero?.details.heroType}.svg`}
                alt={hero?.details.heroType || ""}
                width={96}
                height={96}
              />
            </div>
          </div>
        </div>
      </GradiantCard>
    </div>
  );
}
