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

async function getPathes() {
  try {
    const patches = await prisma.patch.findMany();
    return patches;
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
  const patches = await getPathes();
  return <PatchFyi patch={isValidPatch} patches={patches} />;
}
