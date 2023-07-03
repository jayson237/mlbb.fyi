import getHeroStats from "@/lib/actions/getHeroStats";

import { TabsContent } from "@/components/shared/tabs";
import StatsContainer from "@/components/wiki/statistics/stats-container";
import getTournamentStats from "@/lib/actions/getTournamentStats";

async function StatisticsPage() {
  const heroes = await getHeroStats();
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
