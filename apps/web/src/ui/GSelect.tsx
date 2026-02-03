import * as React from "react";
import { cn } from "./cn";

type Props = Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "className"> & {
  className?: string;
};

export function GSelect({ className, ...rest }: Props) {
  return <select className={cn("g-select", className)} {...rest} />;
}

