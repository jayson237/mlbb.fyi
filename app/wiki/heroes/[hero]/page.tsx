import getHeroStats from "@/lib/actions/getHeroStats";
import getHeroBuild from "@/lib/actions/getHeroBuild";
import getHeroSpell from "@/lib/actions/getHeroSpell";
import getHeroEmblem from "@/lib/actions/getHeroEmblem";
import getHeroCounter from "@/lib/actions/getHeroCounter";
import getHeroCorr from "@/lib/actions/getHeroCorr";
import getMlbbData from "@/lib/actions/getMlbbData";
import isUserBound from "@/lib/actions/isUserBound";
import getCurrentUser from "@/lib/actions/getCurrentUser";

import HeroFyi from "@/components/wiki/heroes/hero-info";
import prisma from "@/lib/prismadb";
import Redirect from "@/components/redirect";

async function getHero(name: string) {
  try {
    const hero = await prisma.hero.findFirst({
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

async function getCurrHeroStats(arr: any[], name: string) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].name === name) {
      return arr[i];
    }
  }
  return null;
}

async function findIndexById(arr: any[], targetId: string): Promise<number> {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].id === targetId) {
      return i;
    }
  }
  return -1;
}

async function handleStrongAgainst(arr: any[]) {
  return arr.map((item) => item.heroId);
}

export default async function HeroPage({
  params,
}: {
  params: { hero: string };
}) {
  const currentUser = await getCurrentUser();
  const decodedString = decodeURIComponent(params?.hero.replace(/\+/g, " "));
  const parseHero = decodedString.replace(/\b\w/g, (c) => c.toUpperCase());
  const isExistingHero = await getHero(parseHero);

  const overallStats: any[] | null = await getHeroStats();

  if (!isExistingHero || overallStats === null) {
    return <Redirect destination="not-found" />;
  }

  const currHeroStats = await getCurrHeroStats(
    overallStats[0],
    isExistingHero.name
  );

  const [heroBuild, heroSpell, heroEmblem, heroWeakAgainst, heroStrongAgainst] =
    await Promise.all([
      getHeroBuild(isExistingHero.id),
      getHeroSpell(isExistingHero.id),
      getHeroEmblem(isExistingHero.id),
      getHeroCounter(isExistingHero.id),
      getHeroCorr(isExistingHero.id),
    ]);

  const strongAgainst = heroStrongAgainst.data
    ? await handleStrongAgainst(heroStrongAgainst.data)
    : [];

  let isBoundProfile = await isUserBound(currentUser?.username || "");
  let dataAcc;
  let classicIndex;
  let rankedIndex;

  if (currentUser && isBoundProfile) {
    dataAcc = await getMlbbData(isBoundProfile.accId);
    classicIndex = await findIndexById(
      dataAcc.matchPlayed[0].data,
      isExistingHero.heroId.toString()
    );
    rankedIndex = await findIndexById(
      dataAcc.matchPlayed[1].data,
      isExistingHero.heroId.toString()
    );
  }

  return (
    <>
      {isBoundProfile && currentUser ? (
        <HeroFyi
          hero={isExistingHero}
          heroStats={currHeroStats}
          heroBuild={heroBuild.data.items}
          heroSpell={heroSpell.data.spells}
          heroEmblem={heroEmblem.data.emblems}
          heroWeakAgainst={heroWeakAgainst.data.counters}
          heroStrongAgainst={strongAgainst}
          matches={dataAcc.matchPlayed}
          classicIndex={classicIndex || 0}
          rankedIndex={rankedIndex || 0}
          showWR={true}
        />
      ) : (
        <HeroFyi
          hero={isExistingHero}
          heroStats={currHeroStats}
          heroBuild={heroBuild.data.items}
          heroSpell={heroSpell.data.spells}
          heroEmblem={heroEmblem.data.emblems}
          heroWeakAgainst={heroWeakAgainst.data.counters}
          heroStrongAgainst={strongAgainst}
          showWR={false}
        />
      )}
    </>
  );
}
