import getHeroes from "@/lib/actions/getHeroes";
import { Hero } from "@prisma/client";
import { TabsContent } from "@/components/shared/tabs";
import TierContainer from "@/components/wiki/tier-list/tier-list-container";

async function TierListPage() {
  const heroes: Hero[] | null = await getHeroes();
  return (
    <TabsContent
      value="tier-list"
      className="flex w-full flex-col gap-5 md:flex-row"
    >
      <TierContainer heroes={heroes} />
    </TabsContent>
  );
}

export default TierListPage;
