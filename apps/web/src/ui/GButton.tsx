import * as React from "react";
import { cn } from "./cn";
import type { IconName } from "./icons";
import { GIcon } from "./icons";

type Variant = "filled" | "outlined" | "text";
type Size = "md" | "sm";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
  startIcon?: IconName;
  endIcon?: IconName;
};

export function GButton({ className, variant = "filled", size = "md", startIcon, endIcon, children, ...rest }: Props) {
  return (
    <button className={cn("g-btn", variant, size === "sm" && "sm", className)} {...rest}>
      {startIcon ? <GIcon name={startIcon} size={18} /> : null}
      {children}
      {endIcon ? <GIcon name={endIcon} size={18} /> : null}
    </button>
  );
}

