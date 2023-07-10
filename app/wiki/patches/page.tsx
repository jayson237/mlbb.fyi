import getPatches from "@/lib/actions/getPatches";

import { Patch } from "@prisma/client";

import { TabsContent } from "@/components/shared/tabs";
import PatchesContainer from "@/components/wiki/patches/patches-container";

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
