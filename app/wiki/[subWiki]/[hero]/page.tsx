import HeroFyi from "@/components/wiki/heroes/hero-info";
import prisma from "@/lib/prismadb";
import { notFound } from "next/navigation";

async function getHeroData(name: string) {
  try {
    const hero = await prisma?.herosDetails.findFirst({
      where: {
        heroName: name,
      },
    });
    return hero;
  } catch (error) {
    return null;
  }
}

async function getHero(name: string) {
  try {
    const hero = await prisma?.hero.findFirst({
      where: {
        name: name,
      },
    });
    return hero;
  } catch (error) {
    return null;
  }
}

export default async function HeroPage({
  params,
}: {
  params: { subWiki: string; hero: string };
}) {
  const decodedString = decodeURIComponent(params?.hero.replace(/\+/g, " "));

  const hero = decodedString.replace(/\b\w/g, (c) => c.toUpperCase());
  // console.log(hero);
  const isExistingHero = await getHeroData(hero);
  if (params.subWiki !== "heroes" || !isExistingHero) {
    notFound();
  }
  return (
    <>
      <HeroFyi heroData={isExistingHero} hero={getHero(hero)}></HeroFyi>
    </>
  );
}
