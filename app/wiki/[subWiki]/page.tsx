import getHeroes from "@/lib/actions/getHeroes";
import getPatches from "@/lib/actions/getPatches";

import { Hero, Patch } from "@prisma/client";

import { TabsContent } from "@/components/shared/tabs";
import HeroesContainer from "@/components/wiki/heroes/heroes-container";
import PatchContainer from "@/components/wiki/patch/patch-container";
import Redirect from "@/components/redirect";

async function SubWikiPage({ params }: { params: { subWiki: string } }) {
  const heroes: Hero[] | null = await getHeroes();
  const patches: Patch[] | null = await getPatches();
  if (
    params.subWiki !== "heroes" &&
    params.subWiki !== "statistics" &&
    params.subWiki !== "draft-pick" &&
    params.subWiki !== "patches"
  ) {
    return <Redirect destination="not-found" />;
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
      key: "patches",
      component: <PatchContainer patches={patches} />,
    },
  ];

  const selectedTab = tabs.find((tab) => tab.key === params.subWiki);
  return (
    <TabsContent
      value={params.subWiki}
      className="flex w-full flex-col gap-5 md:flex-row"
    >
      {selectedTab ? (
        selectedTab.component
      ) : (
        <Redirect destination="not-found" />
      )}
    </TabsContent>
  );
}

export default SubWikiPage;
