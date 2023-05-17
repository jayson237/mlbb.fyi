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
      className={cn("gradBlack relative w-full rounded-[20px] p-5", className)}
    >
      {children}
    </div>
  );
};

export default CardBlack;
