import { TabsContent } from "@/components/shared/tabs";
import TierContainer from "@/components/wiki/tier-list/tier-list-container";

async function TierListPage() {
  return (
    <TabsContent
      value="statistics"
      className="flex w-full flex-col gap-5 md:flex-row"
    >
      <TierContainer />
    </TabsContent>
  );
}

export default TierListPage;
