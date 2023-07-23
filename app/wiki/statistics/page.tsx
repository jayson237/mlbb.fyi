import getTournamentStats from "@/lib/actions/getTournamentStats";
import getHeroes from "@/lib/actions/getHeroes";

import { TabsContent } from "@/components/shared/tabs";
import StatsContainer from "@/components/wiki/statistics/stats-container";

export const metadata = {
  title: "Statistics - mlbb.fyi",
  description:
    "Access hero stats, optimal builds, and connect with a community of expert players.",
  openGraph: {
    title: "Statistics - mlbb.fyi",
    description:
      "Access hero stats, optimal builds, and connect with a community of expert players.",
    url: "https://mlbb.fyi",
    siteName: "mlbb.fyi",
    images: [
      {
        url: "/og.jpg",
        width: 1260,
        height: 600,
      },
    ],
    locale: "en-US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Statistics - mlbb.fyi",
    description:
      "Access hero stats, optimal builds, and connect with a community of expert players.",
    images: ["/og.jpg"],
  },
};

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
