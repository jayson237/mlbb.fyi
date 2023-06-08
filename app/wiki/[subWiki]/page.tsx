import getHeroes from "@/lib/actions/getHeroes";
import { Hero, HeroDetails } from "@prisma/client";
import { TabsContent } from "@/components/shared/tabs";
import HeroesContainer from "@/components/wiki/heroes/heroes-container";
import { notFound } from "next/navigation";

async function SubWikiPage({ params }: { params: { subWiki: string } }) {
  const heroes: HeroDetails[] | null = await getHeroes();
  if (
    params.subWiki !== "heroes" &&
    params.subWiki !== "statistics" &&
    params.subWiki !== "draft-pick" &&
    params.subWiki !== "patch" &&
    params.subWiki !== "meta"
  ) {
    notFound();
  }
  return (
    <TabsContent
      value={params.subWiki}
      className="flex w-full flex-col gap-5 md:flex-row"
    >
      {params.subWiki === "heroes" ? (
        <HeroesContainer heroes={heroes} />
      ) : (
        <></>
      )}
    </TabsContent>
  );
}

export default SubWikiPage;
