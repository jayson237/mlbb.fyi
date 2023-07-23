import getPatches from "@/lib/actions/getPatches";

import { Patch } from "@prisma/client";

import { TabsContent } from "@/components/shared/tabs";
import PatchesContainer from "@/components/wiki/patches/patches-container";

export const metadata = {
  title: "Patches - mlbb.fyi",
  description:
    "Access hero stats, optimal builds, and connect with a community of expert players.",
  openGraph: {
    title: "Patches - mlbb.fyi",
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
    title: "Patches - mlbb.fyi",
    description:
      "Access hero stats, optimal builds, and connect with a community of expert players.",
    images: ["/og.jpg"],
  },
};

async function PatchesPage() {
  const patches: Patch[] | null = await getPatches();

  return (
    <TabsContent
      value="patches"
      className="flex w-full flex-col gap-5 md:flex-row"
    >
      <PatchesContainer patches={patches} />
    </TabsContent>
  );
}

export default PatchesPage;
