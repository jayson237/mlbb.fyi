"use client";

import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";

import { cn } from "@/lib/utils";

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> & {
    pos?: "left" | "right";
    value: number;
    max: number;
  }
>(({ className, value, max, pos, ...props }, ref) => {
  const [currentValue, setCurrentValue] = React.useState(0);
  React.useEffect(() => {
    setCurrentValue(value);
  }, [value]);

  return (
    <ProgressPrimitive.Root
      ref={ref}
      className={cn(
        "relative h-[10px] w-full overflow-hidden rounded-full bg-pblack",
        className
      )}
      {...props}
    >
      {pos == "right" ? (
        <ProgressPrimitive.Indicator
          className="h-full w-full flex-1 rounded-full bg-gradient-to-r from-navy-800 to-navy-500 opacity-80 transition-all duration-700 ease-in-out"
          style={{
            transform: `translateX(${
              100 - (((currentValue || 0) * 100) / (max || 0) || 0)
            }%)`,
          }}
        />
      ) : (
        <ProgressPrimitive.Indicator
          className="h-full w-full flex-1 rounded-full bg-gradient-to-r from-navy-800 to-navy-500 opacity-80 transition-transform duration-700 ease-in-out"
          style={{
            transform: `translateX(-${
              100 - (((currentValue || 0) * 100) / (max || 0) || 0)
            }%)`,
          }}
        />
      )}
    </ProgressPrimitive.Root>
  );
});
Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };
