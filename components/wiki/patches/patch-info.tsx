"use client";

import { Patch } from "@prisma/client";

interface IPatch {
  patch: Patch | null;
}

export default function PatchFyi({ patch }: IPatch) {
  return (
    <div className="mb-8 ml-3 flex flex-col">
      <div className="mt-8 flex flex-row items-center">
        <p className=" font-heading text-5xl">{patch?.version}</p>
        <div className="text-md mb-3 ml-2 flex flex-col font-semibold text-gray-500">
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
    </div>
  );
}
