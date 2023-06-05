import prisma from "@/lib/prismadb";

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
  if (params.subWiki !== "heroes") {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="mb-[400px] text-2xl md:mb-80 md:ml-3">
          Page does not exist...
        </p>
      </div>
    );
  }

  if (!isExistingHero) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="mb-[400px] text-2xl md:mb-80 md:ml-3">
          Hero does not exist...
        </p>
      </div>
    );
  }
  return <>udin</>;
}
