"use client";

import { GradiantCard } from "@/components/shared/gradiant-card";
import { Hero } from "@prisma/client";

const tiers = [
  { tier: "SS", color: "#a3b9f8" },
  { tier: "S", color: "#4ade80" },
  { tier: "A", color: "#fde047" },
  { tier: "B", color: "#FFA500" },
  { tier: "C", color: "#FF6347" },
  { tier: "D", color: "#FF4500" },
];

interface TierListProps {
  heroes: Hero[] | null;
}

export default function TierContainer({ heroes }: TierListProps) {
  return (
    <div className="flex w-full flex-col gap-4">
      {tiers.map((tier, i) => (
        <div key={i} className="flex flex-row items-center">
          <div style={{ color: tier.color }} className="h-fit w-full">
            <GradiantCard className="h-fit w-full">
              <div className="flex flex-row">
                <p className="font-heading">{tier.tier}</p>
              </div>
            </GradiantCard>
          </div>
        </div>
      ))}
    </div>
  );
}
