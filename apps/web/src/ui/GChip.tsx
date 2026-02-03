import * as React from "react";
import { cn } from "./cn";
import type { IconName } from "./icons";
import { GIcon } from "./icons";

type Tone = "default" | "primary" | "muted";

type Props = React.HTMLAttributes<HTMLSpanElement> & {
  tone?: Tone;
  icon?: IconName;
};

export function GChip({ className, tone = "default", icon, children, ...rest }: Props) {
  return (
    <span className={cn("g-chip", tone !== "default" && `tone-${tone}`, className)} {...rest}>
      {icon ? <GIcon name={icon} size={16} /> : null}
      {children}
    </span>
  );
}

