"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Patch } from "@prisma/client";
import { GradiantCard } from "@/components/shared/gradiant-card";

interface IPatch {
  patches: Patch[] | null;
}

export default function PatchContainer({ patches }: IPatch) {
  const router = useRouter();

  const groupedPatches = (patches || []).reduce((acc, patch) => {
    const year = patch.release.split("-")[0];

    if (!acc[year]) {
      acc[year] = [];
    }

    acc[year].push(patch);

    return acc;
  }, {} as { [year: string]: Patch[] });

  const sortedYears = Object.keys(groupedPatches).sort((a, b) =>
    b.localeCompare(a)
  );
  const latestYear = sortedYears[0];

  return (
    <div className="mb-8 mt-4 flex w-full flex-col">
      <div className="flex flex-col">
        {sortedYears.map((year, i) => (
          <React.Fragment key={year}>
            <div className="flex flex-row items-center">
              <h2 className="ml-3 font-heading text-5xl">{year}</h2>
              <p className="text-md ml-3 mt-2 font-semibold text-green-500">
                ({groupedPatches[year].length} Adjustments)
              </p>
            </div>
            {groupedPatches[year].map((patch, i) => (
              <div
                key={i}
                onClick={() => router.push(`wiki/patches/${patch.version}`)}
                className="mb-4 cursor-pointer"
              >
                <GradiantCard
                  className="flex flex-row justify-between p-4 shadow-lg transition-all duration-300 hover:rounded-2xl hover:bg-gray-500/25 "
                  variant="clean"
                >
                  <div className="mr-auto flex flex-col">
                    <p className="font-sat text-xl font-semibold">
                      {patch.version}
                    </p>
                    <p className="text-sm text-gray-500">
                      Released on {patch.release}
                    </p>
                    {patch.intro && (
                      <p className="mt-4 line-clamp-2 text-justify text-[14px] text-gray-400">
                        {patch.intro[1]}
                      </p>
                    )}
                  </div>
                  {year === latestYear && i === 0 && (
                    <div className="flex items-start">
                      <div className="text-md rounded-full bg-green-500/30 px-2 font-semibold text-green-500">
                        <p>Current</p>
                      </div>
                    </div>
                  )}
                </GradiantCard>
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>
      <p className="text-center text-[10px] text-gray-500">
        These patches, available from 2021, are obtained from the website
        https://liquipedia.net/mobilelegends/Portal:Patches.
      </p>
    </div>
  );
}
