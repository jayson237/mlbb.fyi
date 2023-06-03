import getHeroes from "@/lib/actions/getHeroes";
import { Hero } from "@prisma/client";
import { TabsContent } from "@/components/shared/tabs";
import HeroesContainer from "@/components/wiki/heroes/heroes-container";

async function SubWikiPage({ params }: { params: { subWiki: string } }) {
  const heroes: Hero[] | null = await getHeroes();
  return (
    <TabsContent
      value={params.subWiki}
      className="flex w-full flex-col gap-5 md:flex-row"
    >
      {params.subWiki === "heroes" ? <HeroesContainer heroes={heroes} /> : <></>}
    </TabsContent>
  );
}

export default SubWikiPage;
