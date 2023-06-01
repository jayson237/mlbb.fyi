import { Hero } from "@prisma/client";
import { GradiantCard } from "@/components/shared/gradiant-card";
import Image from "next/image";

const HeroCard = ({ hero }: { hero: Hero }) => {
  return (
    <GradiantCard className="w-fit cursor-pointer p-1.5">
      <div className="relative h-32 w-24 overflow-hidden rounded-2xl">
        <Image
          // style={{
          //   backgroundImage: `url(${hero.img})`,
          // }}
          src={hero.img.split("/image/upload")[0]+"/image/upload/q_3"+hero.img.split("/image/upload")[1]}
          alt={hero.name}
          width={96}
          height={128}
          // placeholder="blur"
          quality={1}
          className="absolute inset-0 w-full overflow-hidden  rounded-2xl bg-cover bg-top bg-no-repeat"
          // loading="lazy"
          priority={true}
        />
      </div>
      <div className="relative w-full">
        <p className="absolute inset-x-0 top-[-28px] mx-1  mt-[6px] rounded-full bg-navy-900/60 p-0.5 text-center text-[10px] font-medium shadow-inner shadow-navy-500/40 backdrop-blur-md">
          {hero.name}
        </p>
      </div>
    </GradiantCard>
  );
};

export default HeroCard;
