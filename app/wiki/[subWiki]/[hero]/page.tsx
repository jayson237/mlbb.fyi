import HeroFyi from "@/components/wiki/heroes/hero-info";
import prisma from "@/lib/prismadb";
import { notFound } from "next/navigation";

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
  const hero = params.hero.slice(0, 1).toUpperCase() + params.hero.slice(1);
  const isExistingHero = await getHero(hero);
  if (params.subWiki !== "heroes" || !isExistingHero) {
    notFound();
  }
  return (
    <>
      <HeroFyi hero={isExistingHero}></HeroFyi>
    </>
  );
}
