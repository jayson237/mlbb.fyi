import getHeroStats from "@/lib/actions/getHeroStats";
import getTournamentStats from "@/lib/actions/getTournamentStats";

import { TabsContent } from "@/components/shared/tabs";
import StatsContainer from "@/components/wiki/statistics/stats-container";

async function StatisticsPage() {
  const allStats = await getHeroStats();
  const tourneyStats = await getTournamentStats();

  return (
    <TabsContent
      value="statistics"
      className="flex w-full flex-col gap-5 md:flex-row"
    >
      <StatsContainer serverStats={allStats} tourneyStats={tourneyStats} />
    </TabsContent>
  );
}

export default StatisticsPage;
