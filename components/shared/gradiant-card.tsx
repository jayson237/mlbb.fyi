import { cn } from "@/lib/utils";
import Info from "./icons/info";

const GradiantCard = ({
  children,
  className,
  title,
}: {
  children: React.ReactNode;
  className?: string;
  title?: string;
}) => {
  return (
    <div
      className={cn(
        // "relative z-[1] h-fit w-full rounded-[20px] bg-gradient-to-b from-navy-800/80 to-black p-5",
        "mask relative h-fit w-full rounded-3xl bg-black/20 p-5 backdrop-blur-2xl after:absolute after:inset-0 after:rounded-3xl after:bg-gradient-to-br after:from-navy-400/80 after:via-navy-400/10 after:to-navy-400/80 after:p-px",
        className
      )}
    >
      {/* <div
        className={cn(
          "absolute inset-[1px] z-[-2] overflow-hidden rounded-[20px] bg-black shadow-inner shadow-navy-700 after:absolute after:right-[-72px] after:top-[-72px] after:z-[-1] after:h-32 after:w-32 after:rounded-full after:bg-navy-500/60 after:blur-[40px]"
        )}
      ></div> */}
      {/* <Info /> */}
      <h1 className="text-sm/[10px] font-bold tracking-[-3%] md:text-base/[16px]">
        {title}
      </h1>
      {children}
    </div>
  );
};

export { GradiantCard };
