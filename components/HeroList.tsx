"use client";

import React from "react";
import { Hero } from "@prisma/client";
import Image from "next/image";

interface HeroesProps {
  heroes: Hero[];
}

const HeroList: React.FC<HeroesProps> = ({ heroes }) => {
  return (
    <div className="mt-8">
      <>
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
          {heroes.map((hero) => (
            <div key={hero.id}>
              <div className="relative h-48 w-full overflow-hidden rounded-lg">
                {/* <div className="absolute inset-0 z-10 opacity-60 bg-gradient-to-t from-Purple-200"></div> */}

                <Image
                  src={`https://${hero.img}`}
                  alt={hero.name}
                  width={150}
                  height={150}
                  className="h-full w-full rounded-lg object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 z-20">
                  <div className="flex justify-center text-center">
                    <p className="w-full bg-slate-400/40 py-1 text-sm font-semibold uppercase text-white backdrop-blur-sm">
                      {hero.name}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </>
    </div>
  );
};

export default HeroList;
