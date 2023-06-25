"use client";

import { Hero } from "@prisma/client";
import { GradiantCard } from "@/components/shared/gradiant-card";

export default function StatsContainer({ heroes }: { heroes: Hero[] | null }) {
  return (
    <GradiantCard className="grid w-full grid-cols-4" variant="clean">
      {heroes?.map((hero, i) => (
        <div key={i}>{hero.name}</div>
      ))}
    </GradiantCard>
  );
}
