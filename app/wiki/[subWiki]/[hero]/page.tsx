import getHeroBuild from "@/lib/actions/getHeroBuild";
import getMlbbData from "@/lib/actions/getMlbbData";
import isUserBound from "@/lib/actions/isUserBound";

import HeroFyi from "@/components/wiki/heroes/hero-info";
import prisma from "@/lib/prismadb";
import { notFound } from "next/navigation";
import getCurrentUser from "@/lib/actions/getCurrentUser";

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
    notFound();
  }

  let isBoundProfile = await isUserBound(currentUser?.username || "");
  let dataAcc;
  if (!isBoundProfile) {
    isBoundProfile = null;
  } else {
    dataAcc = await getMlbbData(isBoundProfile.accId);
  }

  const heroBuild = await getHeroBuild(isExistingHero.id);

  const classicIndex = await findIndexById(
    dataAcc.matchPlayed[0].data,
    String(isExistingHero.heroId)
  );
  const rankedIndex = await findIndexById(
    dataAcc.matchPlayed[1].data,
    String(isExistingHero.heroId)
  );

  return (
    <>
      <HeroFyi
        hero={isExistingHero}
        heroBuild={heroBuild.data.items}
        matches={dataAcc?.matchPlayed}
        classicIndex={classicIndex}
        rankedIndex={rankedIndex}
      ></HeroFyi>
    </>
  );
}
