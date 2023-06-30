"use client";

import React from "react";
import { Hero } from "@prisma/client";
import { GradiantCard } from "@/components/shared/gradiant-card";

interface IStats {
  heroes: {
    name: string;
    use: string;
    ban: string;
    win: string;
  }[];
}

export default function StatsContainer({ heroes }: IStats) {
  return (
    <GradiantCard className="mb-8 grid grid-cols-4 gap-4" variant="clean">
      <div className="mb-4 font-heading text-xl">Hero</div>
      <div className="mb-4 text-end font-heading text-xl">Winrate (%)</div>
      <div className="mb-4 text-end font-heading text-xl">Pick (%)</div>
      <div className="mb-4 text-end font-heading text-xl">Ban (%)</div>
      {heroes?.map((hero, i) => (
        <React.Fragment key={i}>
          <div className="text-start font-sat">{hero.name}</div>
          <div className="text-end font-sat">{hero.win.slice(0, -1)}</div>
          <div className="text-end font-sat">{hero.use.slice(0, -1)}</div>
          <div className="text-end font-sat">{hero.ban.slice(0, -1)}</div>
        </React.Fragment>
      ))}
    </GradiantCard>
  );
}
