"use client";

import { useEffect, useState } from "react";
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
  const [filteredHeroes, setFilteredHeroes] = useState<Hero[] | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (heroes !== null && heroFilter.type.length > 0) {
      const filtered = heroes.filter((hero) =>
        // @ts-ignore
        heroFilter.type.includes(hero.details.heroType)
      );
      setFilteredHeroes(filtered);
    } else {
      setFilteredHeroes(null);
    }
  }, [heroFilter.type, heroes]);

  const displayedHeroes = filteredHeroes || heroes;

  return (
    <>
      <HeroesFilter />
      <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7">
        {displayedHeroes?.map((hero) => (
          <div key={hero.id} className="mx-auto">
            <HeroCard
              hero={hero}
              onClick={() => {
                router.push(`/wiki/heroes/${hero.name.toLowerCase()}`);
              }}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default HeroesContainer;
