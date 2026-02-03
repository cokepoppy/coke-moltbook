import * as React from "react";
import { cn } from "./cn";
import type { IconName } from "./icons";
import { GIcon } from "./icons";

type Props = Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "children"> & {
  icon: IconName;
  label: string;
  size?: number;
};

export function IconButton({ className, icon, label, size = 20, ...rest }: Props) {
  return (
    <button className={cn("g-iconBtn", className)} aria-label={label} title={label} {...rest}>
      <GIcon name={icon} size={size} />
    </button>
  );
}

