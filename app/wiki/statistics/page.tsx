import { TabsContent } from "@/components/shared/tabs";
import StatsContainer from "@/components/wiki/statistics/stats-container";

async function StatisticsPage() {
  return (
    <TabsContent
      value="heroes"
      className="flex w-full flex-col gap-5 md:flex-row"
    >
      <StatsContainer />
    </TabsContent>
  );
}

export default StatisticsPage;
