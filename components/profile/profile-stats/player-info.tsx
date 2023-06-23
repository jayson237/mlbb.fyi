"use client";

import { GradiantCard } from "@/components/shared/gradiant-card";
import { cn } from "@/lib/utils";
import { CatIcon } from "lucide-react";

interface InfoCardProps {
  className?: string;
  title: string;
  value: number | undefined;
}

const InfoCard: React.FC<InfoCardProps> = ({ className, title, value }) => {
  return (
    <GradiantCard variant="clean" className={className}>
      <p className=" font-light">{title}</p>
      <p className="mt-1 font-sat text-2xl font-bold lg:text-3xl">
        {value}
        <span className="text-base/[0px] font-semibold">
          {title === "Heroes" ? "  owned" : "  matches"}
        </span>
      </p>
    </GradiantCard>
  );
};

export default InfoCard;
