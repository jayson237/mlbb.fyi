"use client";

import { Fragment, useEffect, useState } from "react";

import { Hero } from "@prisma/client";
import useHeroFilter from "@/lib/state/useHeroFilter";
import HeroesFilter from "./heroes-filter";
import HeroCard from "./hero-card";
import Image from "next/image";
import { GradiantCard } from "@/components/shared/gradiant-card";

interface IHeroesContainer {
  heroes: Hero[] | null;
}

const HeroesContainer = ({ heroes }: IHeroesContainer) => {
  const heroFilter = useHeroFilter();
  const [hero, setHero] = useState<Hero[]>();

  useEffect(() => {
    if (heroes !== null && heroFilter.type.length > 0) {
      const filtered: Hero[] = [];
      heroFilter.type.map((item, i) => {
        heroes.filter((hero) => {
          if (hero.details.heroType === heroFilter.type[i]) filtered.push(hero);
        });
      });
      setHero(filtered);
    } else {
      setHero(undefined);
    }
  }, [heroFilter, hero, heroes]);

  return (
    <>
      <HeroesFilter />
      <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7">
        {hero?.length === undefined
          ? heroes?.map((hero, i) => {
              if (i) {
                return (
                  <div key={hero.id}>
                    <HeroCard hero={hero} />
                    {/* <GradiantCard className="w-fit cursor-pointer p-1.5"> */}
                      {/* <Image
                        src={
                          hero.img.split("/image/upload")[0] +
                            "/image/upload/c_fill,h_256,w_192,g_north" +
                            hero.img.split("/image/upload")[1] || "/nana.jpg"
                        }
                        alt={hero.name}
                        width={96}
                        height={128}
                        // className="h-[128px] w-[96px] overflow-hidden rounded-lg bg-cover bg-top bg-no-repeat"
                        // loading="lazy"
                      /> */}
                    {/* </GradiantCard> */}
                    {/* <Image
                      src={hero.img}
                      width={96}
                      height={128}
                      alt={hero.name}
                      loading="lazy"
                    /> */}
                  </div>
                );
              }
            })
          : hero?.map((hero) => (
              <Fragment key={hero.id}>
                <HeroCard hero={hero} />
              </Fragment>
            ))}
      </div>
    </>
  );
};

export default HeroesContainer;
