"use client";

import { GradiantCard } from "../../shared/gradiant-card";
import { Progress } from "../../shared/progress";

interface FavouritesProps {
  title: string;
  matchPlayed: {
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
  matchPlayed,
  matchType,
}) => {
  const data = (matchPlayed && matchPlayed[matchType]?.data) || [];
  return (
    <GradiantCard title={title}>
      {data.map((item, i) => (
        <div key={i} className="mt-3">
          <div className="flex justify-between">
            <p className="text-sm">
              {item.name} - {item.total}
            </p>
            <p className="text-sm">
              {((item.win * 100) / item.total).toFixed(2)}%
            </p>
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
