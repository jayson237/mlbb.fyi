// @ts-nocheck
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Hero } from "@prisma/client";
import useHeroFilter from "@/lib/state/useHeroFilter";
import HeroesFilter from "./heroes-filter";
import HeroCard from "./hero-card";
import { Input } from "@/components/shared/input";
import { GradiantCard } from "@/components/shared/gradiant-card";
import useTabStore from "@/lib/state/useTabStore";

interface IHeroesContainer {
  heroes: Hero[] | null;
}

const HeroesContainer = ({ heroes }: IHeroesContainer) => {
  const router = useRouter();
  const heroFilter = useHeroFilter();
  const [filteredHeroes, setFilteredHeroes] = useState<Hero[] | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    setFilteredHeroes(null);
    heroFilter.type = [];
    heroFilter.role = [];
  }, []);

  useEffect(() => {
    if (heroes !== null) {
      const filtered = heroes.filter((hero) => {
        const isTypeFilterEmpty = heroFilter.type.length === 0;
        const isRoleFilterEmpty = heroFilter.role.length === 0;

        if (isTypeFilterEmpty && isRoleFilterEmpty) {
          return true;
        }

        if (isTypeFilterEmpty) {
          return heroFilter.role.every((role) => hero.role.includes(role));
        }

        if (isRoleFilterEmpty) {
          return heroFilter.type.every((type) =>
            hero.details.heroType.includes(type)
          );
        }

        return (
          heroFilter.type.every((type) =>
            hero.details.heroType.includes(type)
          ) && heroFilter.role.every((role) => hero.role.includes(role))
        );
      });

      setFilteredHeroes(filtered);
    } else {
      setFilteredHeroes(null);
    }
  }, [heroFilter.type, heroFilter.role, heroes]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const displayedHeroes = filteredHeroes || heroes;

  const filteredDisplayedHeroes = displayedHeroes?.filter((hero) =>
    hero.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <GradiantCard className="h-fit w-full px-6 md:w-[200px]" variant="clean">
        <Input
          type="text"
          placeholder="Search heroes..."
          value={searchTerm}
          onChange={handleSearch}
          className="h-7 rounded-xl"
        />
        <HeroesFilter />
      </GradiantCard>
      <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7">
        {filteredDisplayedHeroes?.map((hero) => (
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
