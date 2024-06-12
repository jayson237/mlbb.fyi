import getHeroBuild from "@/lib/actions/getHeroBuild";
import getHeroSpell from "@/lib/actions/getHeroSpell";
import getHeroEmblem from "@/lib/actions/getHeroEmblem";
import getHeroCounter from "@/lib/actions/getHeroCounter";
import getHeroCorr from "@/lib/actions/getHeroCorr";

import HeroFyi from "@/components/wiki/heroes/hero-info";
import prisma from "@/lib/prismadb";
import Redirect from "@/components/redirect";

async function getHero(name: string) {
  const hero = await prisma.hero.findFirst({
    where: {
      name: name,
    },
    include: {
      details: true,
    },
  });
  return hero;
}

async function findIndexById(arr: any[], targetId: string): Promise<number> {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].id === targetId) {
      return i;
    }
  }
  return -1;
}

export default async function HeroPage({
  params,
}: {
  params: { hero: string };
}) {
  const decodedString = decodeURIComponent(params?.hero.replace(/\+/g, " "));
  const parseHero =
    decodedString === "popol and kupa"
      ? "Popol and Kupa"
      : decodedString === "yi sun-shin"
      ? "Yi Sun-shin"
      : decodedString === "chang'e"
      ? "Chang'e"
      : decodedString.replace(/\b\w/g, (c) => c.toUpperCase());
  const isExistingHero = await getHero(parseHero);

  if (!isExistingHero) {
    return <Redirect destination="not-found" />;
  }

  const [heroBuild, heroSpell, heroEmblem, heroCounter, heroCorr] =
    await Promise.all([
      getHeroBuild(isExistingHero.id),
      getHeroSpell(isExistingHero.id),
      getHeroEmblem(isExistingHero.id),
      getHeroCounter(isExistingHero.id),
      getHeroCorr(isExistingHero.id),
    ]);

  const strongAgainst = heroCorr.data?.map((item: any) => item.heroId) || [];

  return (
    <HeroFyi
      hero={isExistingHero}
      heroBuild={heroBuild.data?.items || []}
      heroSpell={heroSpell.data?.spells || []}
      heroEmblem={heroEmblem.data?.emblems || []}
      heroWeakAgainst={heroCounter.data?.counters || []}
      heroStrongAgainst={strongAgainst}
    />
  );
}
