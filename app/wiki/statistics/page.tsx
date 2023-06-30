import getHeroStats from "@/lib/actions/getHeroStats";

import { Hero } from "@prisma/client";

import { TabsContent } from "@/components/shared/tabs";
import StatsContainer from "@/components/wiki/statistics/stats-container";

async function StatisticsPage() {
  const heroes = await getHeroStats();

  return (
    <TabsContent
      value="statistics"
      className="flex w-full flex-col gap-5 md:flex-row"
    >
      <StatsContainer heroes={heroes} />
    </TabsContent>
  );
}

export default StatisticsPage;
