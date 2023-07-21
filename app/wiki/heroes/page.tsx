import getHeroes from "@/lib/actions/getHeroes";

import { Hero } from "@prisma/client";

import { TabsContent } from "@/components/shared/tabs";
import HeroesContainer from "@/components/wiki/heroes/heroes-container";

export const metadata = {
  title: "Heroes - mlbb.fyi",
  description:
    "Access hero stats, optimal builds, and connect with a community of expert players.",
  openGraph: {
    title: "Heroes - mlbb.fyi",
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
    title: "Heroes - mlbb.fyi",
    description:
      "Access hero stats, optimal builds, and connect with a community of expert players.",
    images: ["/og.jpg"],
  },
};

async function HeroesPage() {
  const heroes: Hero[] | null = await getHeroes();

  return (
    <TabsContent
      value="heroes"
      className="flex w-full flex-col gap-5 md:flex-row"
    >
      <HeroesContainer heroes={heroes} />
    </TabsContent>
  );
}

export default HeroesPage;
