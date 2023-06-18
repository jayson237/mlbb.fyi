import { Patch } from "@prisma/client";

import PatchFyi from "@/components/wiki/patches/patch-info";
import prisma from "@/lib/prismadb";
import Redirect from "@/components/redirect";

async function getPatch(version: string) {
  try {
    const patch = await prisma.patch.findFirst({
      where: {
        version: version,
      },
    });
    return patch;
  } catch (error) {
    return null;
  }
}

export default async function PatchPage({
  params,
}: {
  params: { patch: string };
}) {
  const patchVersion = params.patch;
  const isValidPatch = await getPatch(patchVersion);
  if (!isValidPatch) {
    return <Redirect destination="not-found" />;
  }
  return <PatchFyi patch={isValidPatch} />;
}
