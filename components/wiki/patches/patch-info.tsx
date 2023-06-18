"use client";

import { GradiantCard } from "@/components/shared/gradiant-card";
import { Patch } from "@prisma/client";

interface IPatch {
  patch: Patch | null;
}

export default function PatchFyi({ patch }: IPatch) {
  return (
    <div className="mb-8 ml-3 flex flex-col">
      <div className="mt-8 flex flex-row items-center">
        <p className=" font-sat text-5xl font-semibold">{patch?.version}</p>
        <div className="text-md ml-3 flex flex-col font-semibold text-gray-500">
          <p>released on</p>
          <p>{patch?.release}</p>
        </div>
      </div>
      {patch?.intro.map((paragraph, i) => {
        return (
          <div key={i} className="mt-8">
            <p className="text-justify text-gray-400">{paragraph}</p>
          </div>
        );
      })}
      {patch?.headings.map((heading, i) => {
        return (
          <div key={i}>
            <GradiantCard
              variant="clean"
              className={`${i == 0 && "mt-8"} mt-4`}
            >
              <p className="font-heading text-xl">{heading.name}</p>
            </GradiantCard>
          </div>
        );
      })}
    </div>
  );
}
