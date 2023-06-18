import { cn } from "@/lib/utils";
import Info from "./icons/info";
import { VariantProps, cva } from "class-variance-authority";

const cardVariants = cva("mask relative w-full", {
  variants: {
    variant: {
      default:
        "rounded-xl bg-black/20 p-5 backdrop-blur-2xl after:absolute after:inset-0 after:rounded-xl after:bg-gradient-to-br after:from-navy-400/40 after:via-navy-400/5 after:to-navy-400/40 after:p-px",
      clean:
        "cursor-grab overflow-hidden rounded-2xl bg-neutral-950 px-6 py-5 backdrop-blur-xl after:absolute after:inset-0 after:rounded-2xl after:bg-gradient-to-b after:from-navy-400/30 after:via-navy-400/5 after:to-navy-600/20 after:p-px",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

const GradiantCard = ({
  children,
  className,
  title,
  variant,
}: {
  children: React.ReactNode;
  className?: string;
  title?: string;
  variant?: string;
} & VariantProps<typeof cardVariants>) => {
  return (
    <div className={cardVariants({ className, variant })}>
      <h1 className="text-sm/[10px] font-bold tracking-[-3%] md:text-base/[16px]">
        {title}
      </h1>
      {children}
    </div>
  );
};

export { GradiantCard };
