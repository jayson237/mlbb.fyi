import getPatches from "@/lib/actions/getPatches";

import { Patch } from "@prisma/client";

import { TabsContent } from "@/components/shared/tabs";
import PatchContainer from "@/components/wiki/patch/patch-container";

async function PatchesPage() {
  const patches: Patch[] | null = await getPatches();

  return (
    <TabsContent
      value="patches"
      className="flex w-full flex-col gap-5 md:flex-row"
    >
      <PatchContainer patches={patches} />
    </TabsContent>
  );
}

export default PatchesPage;
