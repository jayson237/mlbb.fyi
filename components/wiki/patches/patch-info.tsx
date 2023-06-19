"use client";

import { GradiantCard } from "@/components/shared/gradiant-card";
import { Patch } from "@prisma/client";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

interface IPatch {
  patch: Patch | null;
  patches: Patch[] | null;
}

export default function PatchFyi({ patch, patches }: IPatch) {
  const patchIndex: number = patch
    ? patches?.findIndex((item) => item.id === patch.id) || 0
    : -1;

  const previousPatch =
    patchIndex > 0 && patches ? patches[patchIndex - 1] : null;
  const nextPatch =
    patchIndex >= 0 && patches && patchIndex < patches.length - 1
      ? patches[patchIndex + 1]
      : null;

  const router = useRouter();
  const dateFormat = /^\d{2}\/\d{2}\/\d{4}/;
  return (
    <div className="mb-8  flex flex-col">
      <div className="mx-auto px-4">
        <div className="mt-8 flex flex-row items-center justify-between">
          {previousPatch && (
            <div
              className="flex cursor-pointer flex-row items-center"
              onClick={() =>
                router.push(`wiki/patches/${previousPatch?.version}`)
              }
            >
              <ArrowLeft className="hover:text-navy-200 hover:duration-300" />
              <p className="ml-2 font-sat text-xl font-semibold">
                {previousPatch?.version}
              </p>
            </div>
          )}
          <div className="flex flex-row">
            <p className="font-sat text-5xl font-semibold">{patch?.version}</p>
            <div className="text-md ml-3 mt-3 flex flex-col font-medium text-gray-500">
              <p>released on</p>
              <p>{patch?.release}</p>
            </div>
          </div>
          {nextPatch && (
            <div
              className="flex cursor-pointer flex-row items-center"
              onClick={() => router.push(`wiki/patches/${nextPatch?.version}`)}
            >
              <p className="mr-2 font-sat text-xl font-semibold ">
                {nextPatch?.version}
              </p>
              <ArrowRight className="hover:text-navy-200 hover:duration-300" />
            </div>
          )}
        </div>
        {patch?.intro.map((paragraph, i) => (
          <div key={i} className="mt-4">
            <p className="text-justify text-gray-400">{paragraph}</p>
          </div>
        ))}
      </div>
      {patch?.headings.map((heading, i) => (
        <div key={i}>
          <GradiantCard variant="clean" className="mt-8 pb-12">
            <p className="font-heading text-3xl">{heading.name}</p>
            <div className="mb-8 flex flex-col">
              {heading.fields.map((field, i) => (
                <div key={i} className="flex flex-col">
                  <p
                    className={`${field.subheading ? "text-2xl" : "text-xl"} ${
                      field.subheading && i !== 0 ? "mt-12" : "mt-4"
                    } font-heading`}
                  >
                    {!(
                      heading.name === field.name ||
                      heading.name === field.subheading
                    ) &&
                      (field.name || field.subheading)}
                  </p>

                  {field.updates.map((update, i) => (
                    <div key={i} className="mb-2">
                      <p
                        className={`${
                          update === "Skill 1" ||
                          update === "Skill 2" ||
                          update === "Skill 3" ||
                          update === "Passive" ||
                          update === "Ultimate" ||
                          update === "Attributes" ||
                          update.startsWith("Skill 1 -") ||
                          update.startsWith("Skill 2 -") ||
                          update.startsWith("Skill 3 -") ||
                          update.startsWith("Passive -") ||
                          update.startsWith("Ultimate -") ||
                          update.startsWith("Unique Passive")
                            ? "mt-4 font-bold text-green-500"
                            : ""
                        } ${
                          update.startsWith("A.") ||
                          update.startsWith("B.") ||
                          dateFormat.test(update)
                            ? "mt-8 font-bold text-white"
                            : ""
                        } text-md mt-2 text-gray-400`}
                      >
                        {update}
                      </p>
                    </div>
                  ))}

                  {i !== heading.fields.length - 1 && field.name && (
                    <div className="relative my-8">
                      <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t border-navy-400" />
                      </div>
                      <div className="text-xs relative flex justify-center">
                        <span className="text-muted-foreground bg-[#151515] px-2"></span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </GradiantCard>
        </div>
      ))}
    </div>
  );
}
