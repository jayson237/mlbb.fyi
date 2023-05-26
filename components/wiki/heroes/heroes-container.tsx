"use client";

import { Fragment, useEffect, useState } from "react";

import { Hero } from "@prisma/client";
import useHeroFilter from "@/lib/state/useHeroFilter";
import HeroesFilter from "./heroes-filter";
import HeroCard from "./hero-card";

interface IHeroesContainer {
  heros: Hero[];
}

const HeroesContainer = ({ heros }: IHeroesContainer) => {
  const heroFilter = useHeroFilter();
  const [hero, setHero] = useState<Hero[]>();

  useEffect(() => {
    //console.log(heroFilter.type);
    if (heroFilter.type.length > 0) {
      const filtered: Hero[] = [];
      heroFilter.type.map((item, i) => {
        heros.filter((hero) => {
          // if (hero.details.heroType === heroFilter.type[i]) filtered.push(hero);
        });
      });
      setHero(filtered);
    } else {
      setHero(undefined);
    }
  }, [heroFilter, hero, heros]);

  return (
    <>
      <HeroesFilter />
      <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8">
        {hero?.length === undefined
          ? heros.map((hero) => (
              <Fragment key={hero.id}>
                <HeroCard hero={hero} />
              </Fragment>
            ))
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
