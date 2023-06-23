"use client";

import { Fragment, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Hero } from "@prisma/client";
import useHeroFilter from "@/lib/state/useHeroFilter";
import HeroesFilter from "./heroes-filter";
import HeroCard from "./hero-card";

interface IHeroesContainer {
  heroes: Hero[] | null;
}

const HeroesContainer = ({ heroes }: IHeroesContainer) => {
  const router = useRouter();
  const heroFilter = useHeroFilter();
  const [hero, setHero] = useState<Hero[]>();

  useEffect(() => {
    setHero(undefined);
    heroFilter.type = [];
  }, []);

  useEffect(() => {
    if (heroes !== null && heroFilter.type.length > 0) {
      const filtered: Hero[] = [];
      heroFilter.type.map((item, i) => {
        heroes.filter((hero) => {
          // @ts-ignore
          if (hero.details.heroType === heroFilter.type[i]) filtered.push(hero);
        });
      });
      setHero(filtered);
    } else {
      setHero(undefined);
    }
  }, [heroFilter, heroes]);

  return (
    <>
      <HeroesFilter />
      <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7">
        {hero?.length === undefined
          ? heroes?.map((hero, i) => {
              return (
                <div key={hero.id}>
                  <HeroCard
                    hero={hero}
                    onClick={() => {
                      router.push(`/wiki/heroes/${hero.name.toLowerCase()}`);
                    }}
                  />
                </div>
              );
            })
          : hero?.map((hero) => (
              <Fragment key={hero.id}>
                <HeroCard
                  hero={hero}
                  onClick={() => {
                    router.push(`/wiki/heroes/${hero.name.toLowerCase()}`);
                  }}
                />
              </Fragment>
            ))}
      </div>
    </>
  );
};

export default HeroesContainer;
