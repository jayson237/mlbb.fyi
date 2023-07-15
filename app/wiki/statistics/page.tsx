import getTournamentStats from "@/lib/actions/getTournamentStats";
import getHeroes from "@/lib/actions/getHeroes";

import { TabsContent } from "@/components/shared/tabs";
import StatsContainer from "@/components/wiki/statistics/stats-container";

async function StatisticsPage() {
  const heroes = await getHeroes();
  const tourneyStats = await getTournamentStats();

  return (
    <TabsContent
      value="statistics"
      className="flex w-full flex-col gap-5 md:flex-row"
    >
      <StatsContainer heroes={heroes} tourneyStats={tourneyStats} />
    </TabsContent>
  );
}

export default StatisticsPage;
