"use client";

import React from "react";
import { Checkbox } from "@/components/shared/checkbox";
import { GradiantCard } from "@/components/shared/gradiant-card";
import { Label } from "@/components/shared/label";
import { HeroType } from "@/lib/hero-type";
import useHeroFilter from "@/lib/state/useHeroFilter";
import { HeroRole } from "@/lib/hero-role";

const HeroesFilter = () => {
  const heroFilter = useHeroFilter();

  const addOrRemove = (value: string, filterKey: "type" | "role") => {
    const filterIndex = heroFilter[filterKey].indexOf(value);
    if (filterIndex === -1) {
      heroFilter.change({
        ...heroFilter,
        [filterKey]: [...heroFilter[filterKey], value],
      });
    } else {
      const updatedFilters = heroFilter[filterKey].filter(
        (filter) => filter !== value
      );
      heroFilter.change({ ...heroFilter, [filterKey]: updatedFilters });
    }
  };

  return (
    <>
      <form action="">
        <GradiantCard className="w-full px-6 md:w-[200px]" variant="clean">
          <h3 className="font-semibold">Filter by</h3>
          <p className="text-medium mt-1 text-sm">Type</p>
          <ul className="mt-2.5 flex w-full flex-col gap-2">
            {HeroType.map((type, i) => (
              <React.Fragment key={i}>
                <li className="flex w-full items-center gap-1.5">
                  <Checkbox
                    id={type.name}
                    onClick={() => addOrRemove(type.name, "type")}
                  />
                  <Label htmlFor={type.name} className="mt-[1px]">
                    {type.name}
                  </Label>
                </li>
              </React.Fragment>
            ))}
            <p className="text-medium mt-1 text-sm">Role</p>
            {HeroRole.map((role, i) => (
              <React.Fragment key={i}>
                <li className="flex w-full items-center gap-1.5">
                  <Checkbox
                    id={role.name}
                    onClick={() => addOrRemove(role.name, "role")}
                  />
                  <Label htmlFor={role.name} className="mt-[1px]">
                    {role.name}
                  </Label>
                </li>
              </React.Fragment>
            ))}
          </ul>
        </GradiantCard>
      </form>
    </>
  );
};

export default HeroesFilter;
