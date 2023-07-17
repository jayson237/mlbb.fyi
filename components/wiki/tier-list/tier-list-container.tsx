"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { Hero } from "@prisma/client";

const tiers = [
  { tier: "OP", color: "#3652ba" },
  { tier: "S", color: "#4ade80" },
  { tier: "A", color: "#fde047" },
  { tier: "B", color: "#FFA500" },
  { tier: "C", color: "#FF6347" },
  { tier: "D", color: "#FF4500" },
];

interface TierListProps {
  heroes: Hero[] | null;
}

export default function TierContainer({ heroes }: TierListProps) {
  const router = useRouter();
  const filteredHeroes = heroes?.filter((hero) =>
    tiers.some((tier) => {
      if (tier.tier === "OP" && hero.tier === "SS") {
        return true;
      }
      return tier.tier === hero.tier;
    })
  );
  return (
    <div className="mt-4 flex w-full flex-col gap-4">
      <p className="text-lg ml-2 text-gray-400">
        mlbb.fyi tier list is updated daily based on the win, pick and ban rate
        of each hero in major Mobile Legends tournament
      </p>
      <div className="flex w-full flex-col gap-4">
        {tiers.map((item, i) => {
          const filteredHeroes = heroes?.filter((hero) =>
            hero.tier === "SS" ? item.tier === "OP" : hero.tier === item.tier
          );

          return (
            <div
              key={i}
              className="flex w-full flex-row items-center rounded-xl  pl-4"
              style={{ background: item.color }}
            >
              <p className="font-heading">{item.tier}</p>
              <div className="ml-4 h-fit w-full rounded-r-lg bg-black py-8">
                <div className="mx-4 grid grid-cols-3 flex-row gap-4 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7">
                  {filteredHeroes?.map((hero, j) => (
                    <div
                      key={j}
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
            </div>
          );
        })}
      </div>
    </div>
  );
}
