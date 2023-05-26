import { Hero } from "@prisma/client";
import { GradiantCard } from "@/components/shared/gradiant-card";

const HeroCard = ({ hero }: { hero: Hero }) => {
  return (
    <GradiantCard className="w-fit p-1.5">
      <div
        className="h-32 w-24 overflow-hidden rounded-2xl bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(https://${hero.img})`,
        }}
      />
      <div className="relative w-full">
        <p className="absolute inset-x-0 top-[-28px] mx-1 mt-2 cursor-pointer rounded-full bg-navy-900/60 p-0.5 text-center text-[10px] font-medium shadow-inner shadow-navy-500/40 backdrop-blur-md">
          {hero.name}
        </p>
      </div>
    </GradiantCard>
  );
};

export default HeroCard;
