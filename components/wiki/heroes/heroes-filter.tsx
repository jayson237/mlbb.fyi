// @ts-nocheck
"use client";

import React, { useState } from "react";
import { Checkbox } from "@/components/shared/checkbox";
import { GradiantCard } from "@/components/shared/gradiant-card";
import { Label } from "@/components/shared/label";
import { HeroType } from "@/lib/hero-type";
import useHeroFilter from "@/lib/state/useHeroFilter";
import { HeroRole } from "@/lib/hero-role";
import { Input } from "@/components/shared/input";

const HeroesFilter = () => {
  const [query, setQuery] = useState("");
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

  const handleSearch = (e) => {
    setQuery(e.target.value);
  };

  return (
    <>
      <form action="">
        <h3 className="mt-2.5 font-semibold">Filter by</h3>

        <div className="flex flex-row md:flex-col">
          <ul className="flex w-full flex-col gap-2 md:mt-2.5">
            <p className="text-medium mt-1 text-sm">Type</p>
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
          </ul>
          <ul className="flex w-full flex-col gap-2 md:mt-2.5">
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
        </div>
      </form>
    </>
  );
};

export default HeroesFilter;
