import * as React from "react";
import { cn } from "./cn";

type Props = React.HTMLAttributes<HTMLDivElement> & {
  flat?: boolean;
};

export function GCard({ className, flat, ...rest }: Props) {
  return <div className={cn("g-card", flat && "flat", className)} {...rest} />;
}

