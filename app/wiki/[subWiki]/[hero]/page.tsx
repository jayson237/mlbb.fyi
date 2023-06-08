import HeroFyi from "@/components/wiki/heroes/hero-info";
import prisma from "@/lib/prismadb";
import { notFound } from "next/navigation";

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

export default async function HeroPage({
  params,
}: {
  params: { subWiki: string; hero: string };
}) {
  const decodedString = decodeURIComponent(params?.hero.replace(/\+/g, " "));

  const parseHero = decodedString.replace(/\b\w/g, (c) => c.toUpperCase());
  // console.log(hero);
  const isExistingHero = await getHero(parseHero);
  if (params.subWiki !== "heroes" || !isExistingHero) {
    notFound();
  }

  return (
    <>
      <HeroFyi
        hero={isExistingHero}
        heroDetails={isExistingHero.details}
      ></HeroFyi>
    </>
  );
}
