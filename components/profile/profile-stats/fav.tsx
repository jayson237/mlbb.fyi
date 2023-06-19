"use client";

import { Star, Trophy } from "lucide-react";
import { GradiantCard } from "../../shared/gradiant-card";
import { Progress } from "../../shared/progress";
import Image from "next/image";

interface FavouritesProps {
  title: string;
  viewMatchPlayed: {
    total: number;
    data: {
      id: string;
      total: number;
      win: number;
      name: string;
      _id: string;
    }[];
  }[];
  matchType: number;
}

const Favourites: React.FC<FavouritesProps> = ({
  title,
  viewMatchPlayed,
  matchType,
}) => {
  const data =
    (viewMatchPlayed && viewMatchPlayed[matchType]?.data.slice(0, 5)) || [];
  return (
    <GradiantCard className="overflow-visible" variant="clean">
      <div className="flex items-center gap-1">
        <p className=" font-light">{title}</p>
      </div>

      {data.slice(0, 5).map((item, i) => (
        <div key={i} className="relative mt-2 flex gap-2">
          <Progress
            value={(item.win * 100) / item.total}
            max={100}
            className="absolute -left-4 top-5 h-3 w-12 -rotate-90"
          />
          <div className="ml-6 flex items-center gap-2">
            <div className="">
              <p className="">{item.name}</p>
              <div className="flex items-center gap-1">
                <Trophy className="h-4 w-4" />
                <p className="text-[12px]">
                  <span className="font-sat text-xl font-semibold">
                    {item.win}
                  </span>{" "}
                  / {item.total} matches
                  {/* {((item.win * 100) / item.total).toFixed(2)}% */}
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </GradiantCard>
  );
};

export default Favourites;
