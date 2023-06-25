import getHeroes from "@/lib/actions/getHeroes";

import { Hero } from "@prisma/client";

import { TabsContent } from "@/components/shared/tabs";
import StatsContainer from "@/components/wiki/statistics/stats-container";

async function StatisticsPage() {
  const heroes: Hero[] | null = await getHeroes();
  return (
    <TabsContent
      value="heroes"
      className="flex w-full flex-col gap-5 md:flex-row"
    >
      <StatsContainer heroes={heroes} />
    </TabsContent>
  );
}

export default StatisticsPage;
