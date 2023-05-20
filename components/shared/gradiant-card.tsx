import { cn } from "@/lib/utils";

const CardBlack = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "relative z-[1] w-full rounded-[20px] bg-gradient-to-b from-navy-800/80 to-black p-5",
        className
      )}
    >
      <div className="absolute inset-[1px] z-[-2] overflow-hidden rounded-[20px] bg-black shadow-inner shadow-navy-700 after:absolute after:right-[-72px] after:top-[-72px] after:z-[-1] after:h-32 after:w-32 after:rounded-full after:bg-navy-500/60 after:blur-[40px]"></div>
      {children}
    </div>
  );
};

export default CardBlack;
