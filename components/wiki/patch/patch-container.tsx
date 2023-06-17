"use client";

import { useRouter } from "next/navigation";
import { Patch } from "@prisma/client";
import { GradiantCard } from "@/components/shared/gradiant-card";

interface IPatch {
  patches: Patch[] | null;
}

export default function PatchContainer({ patches }: IPatch) {
  const router = useRouter();
  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex flex-col gap-4">
        {patches?.map((patch, i) => (
          <div
            key={i}
            onClick={() => router.push(`wiki/patch/${patch.version}`)}
            className="cursor-pointer"
          >
            <GradiantCard className="w-full transition-all duration-300 hover:bg-gray-500/25">
              <p className="text-lg font-semibold">
                {i === 0 ? `${patch.version} ( Current )` : patch.version}
              </p>
            </GradiantCard>
          </div>
        ))}
      </div>
      <p className="text-sm text-gray-500">
        These patches are retrieved from
        https://liquipedia.net/mobilelegends/Portal:Patches
      </p>
    </div>
  );
}
