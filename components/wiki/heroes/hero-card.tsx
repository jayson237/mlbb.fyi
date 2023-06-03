"use client";

import { Hero } from "@prisma/client";
import { GradiantCard } from "@/components/shared/gradiant-card";
import Image from "next/image";

const HeroCard = ({ hero }: { hero: Hero }) => {
  return (
    <div className="w-fit cursor-pointer p-1.5">
      <div className="relative h-32 w-24 overflow-hidden rounded-lg">
        <Image
          src={
            hero.img.split("/image/upload")[0] +
              "/image/upload/c_fill,h_256,w_192,g_north" +
              hero.img.split("/image/upload")[1] || "/nana.jpg"
          }
          alt={hero.name}
          width={96}
          height={128}
          className="h-[128px] w-[96px] overflow-hidden rounded-lg bg-cover bg-top bg-no-repeat"
          loading="lazy"
        />
      </div>
      <div className="relative w-full">
        <p className="absolute inset-x-0 top-[-28px] mx-1  mt-[6px] rounded-md bg-navy-900/60 p-0.5 text-center text-[10px] font-medium shadow-inner shadow-navy-500/40">
          {hero.name}
        </p>
      </div>
    </div>
  );
};

export default HeroCard;
