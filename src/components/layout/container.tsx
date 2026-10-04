import { type ElementType, type ReactNode } from "react";
import { cn } from "@/lib/utils";

const sizes = {
  default: "max-w-[1040px] min-[1800px]:max-w-[1320px] min-[2400px]:max-w-[1500px]",
  wide: "max-w-[1160px] min-[1800px]:max-w-[1680px] min-[2400px]:max-w-[1900px]",
  expanded: "max-w-[1920px] min-[2400px]:max-w-[2160px]",
  narrow: "max-w-[820px]",
} as const;

interface ContainerProps {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  size?: keyof typeof sizes;
}

export function Container({
  children,
  className,
  as: Component = "div",
  size = "default",
}: ContainerProps) {
  return (
    <Component
      className={cn(
        "mx-auto w-full px-7 sm:px-10 lg:px-14 xl:px-16",
        sizes[size],
        className,
      )}
    >
      {children}
    </Component>
  );
}
