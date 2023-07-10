"use client";

import { GradiantCard } from "../../shared/gradiant-card";
import { Progress } from "../../shared/progress";

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
        <div key={i} className="mt-2 font-sat text-[12px] font-semibold">
          <div className="flex justify-between">
            <p>
              {item.name} - {item.total}
            </p>
            <p>{((item.win * 100) / item.total).toFixed(2)}%</p>
          </div>
          <Progress
            value={(item.win * 100) / item.total}
            max={100}
            className="mb-2"
          />
        </div>
      ))}
    </GradiantCard>
  );
};

export default Favourites;
