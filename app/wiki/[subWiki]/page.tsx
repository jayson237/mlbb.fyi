import getHeroes from "@/lib/actions/getHeroes";
import { notFound } from "next/navigation";

import { Hero } from "@prisma/client";

import { TabsContent } from "@/components/shared/tabs";
import HeroesContainer from "@/components/wiki/heroes/heroes-container";
import PatchContainer from "@/components/wiki/patch/patch-container";

async function SubWikiPage({ params }: { params: { subWiki: string } }) {
  const heroes: Hero[] | null = await getHeroes();
  if (
    params.subWiki !== "heroes" &&
    params.subWiki !== "statistics" &&
    params.subWiki !== "draft-pick" &&
    params.subWiki !== "patch"
  ) {
    notFound();
  }

  const tabs = [
    {
      key: "heroes",
      component: <HeroesContainer heroes={heroes} />,
    },
    {
      key: "statistics",
      component: <></>,
    },
    {
      key: "draft-pick",
      component: <></>,
    },
    {
      key: "patch",
      component: <PatchContainer />,
    },
  ];

  const selectedTab = tabs.find((tab) => tab.key === params.subWiki);
  return (
    <TabsContent
      value={params.subWiki}
      className="flex w-full flex-col gap-5 md:flex-row"
    >
      {selectedTab ? selectedTab.component : notFound()}
    </TabsContent>
  );
}

export default SubWikiPage;
