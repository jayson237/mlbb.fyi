import getHeroBuild from "@/lib/actions/getHeroBuild";
import getHeroSpell from "@/lib/actions/getHeroSpell";
import getHeroEmblem from "@/lib/actions/getHeroEmblem";
import getHeroCounter from "@/lib/actions/getHeroCounter";
import getHeroCorr from "@/lib/actions/getHeroCorr";
import getMlbbData from "@/lib/actions/getMlbbData";
import isUserBound from "@/lib/actions/isUserBound";
import getCurrentUser from "@/lib/actions/getCurrentUser";

import NotFoundPage from "@/app/not-found/page";
import HeroFyi from "@/components/wiki/heroes/hero-info";
import prisma from "@/lib/prismadb";

async function getHero(name: string) {
  try {
    const hero = await prisma?.hero.findFirst({
      where: {
        name: name,
      },
      include: {
        details: true,
      },
    });
    return hero;
  } catch (error) {
    return null;
  }
}

async function findIndexById(arr: any[], targetId: string): Promise<number> {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].id === targetId) {
      return i;
    }
  }
  return -1;
}

async function handleStrongAgainst(arr: any[]): Promise<Object[]> {
  let newArr = [];
  for (let i = 0; i < arr.length; i++) {
    newArr.push(arr[i].heroId);
  }
  return newArr;
}

export default async function HeroPage({
  params,
}: {
  params: { subWiki: string; hero: string };
}) {
  const currentUser = await getCurrentUser();
  const decodedString = decodeURIComponent(params?.hero.replace(/\+/g, " "));
  const parseHero = decodedString.replace(/\b\w/g, (c) => c.toUpperCase());
  const isExistingHero = await getHero(parseHero);

  if (params.subWiki !== "heroes" || !isExistingHero) {
    return NotFoundPage();
  }

  const heroBuild = await getHeroBuild(isExistingHero.id);
  const heroSpell = await getHeroSpell(isExistingHero.id);
  const heroEmblem = await getHeroEmblem(isExistingHero.id);
  const heroWeakAgainst = await getHeroCounter(isExistingHero.id);
  const heroStrongAgainst = await getHeroCorr(isExistingHero.id);

  let strongAgainst;
  if (heroStrongAgainst.data) {
    strongAgainst = await handleStrongAgainst(heroStrongAgainst.data);
  }

  let isBoundProfile = await isUserBound(currentUser?.username || "");
  let dataAcc;
  let classicIndex;
  let rankedIndex;
  if (!currentUser || !isBoundProfile) {
    isBoundProfile = null;
  } else {
    dataAcc = await getMlbbData(isBoundProfile.accId);

    classicIndex = await findIndexById(
      dataAcc?.matchPlayed[0].data,
      isExistingHero.heroId.toString()
    );
    rankedIndex = await findIndexById(
      dataAcc?.matchPlayed[1].data,
      isExistingHero.heroId.toString()
    );
  }

  return (
    <>
      <HeroFyi
        hero={isExistingHero}
        heroBuild={heroBuild.data.items}
        heroSpell={heroSpell.data.spells}
        heroEmblem={heroEmblem.data.emblems}
        heroWeakAgainst={heroWeakAgainst.data.counters}
        heroStrongAgainst={strongAgainst}
        matches={dataAcc?.matchPlayed}
        classicIndex={classicIndex || 0}
        rankedIndex={rankedIndex || 0}
        showWR={isBoundProfile && currentUser ? true : false}
      ></HeroFyi>
    </>
  );
}
