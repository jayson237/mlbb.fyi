import getHeroes from "@/lib/actions/getHeroes";
import { Hero } from "@prisma/client";
import { TabsContent } from "@/components/shared/tabs";
import TierContainer from "@/components/wiki/tier-list/tier-list-container";

export const metadata = {
  title: "Tier List - mlbb.fyi",
  description:
    "Access hero stats, optimal builds, and connect with a community of expert players.",
  openGraph: {
    title: "Tier List - mlbb.fyi",
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
    title: "Tier List - mlbb.fyi",
    description:
      "Access hero stats, optimal builds, and connect with a community of expert players.",
    images: ["/og.jpg"],
  },
};

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
