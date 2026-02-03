import * as React from "react";
import { cn } from "./cn";

type Props = Omit<React.InputHTMLAttributes<HTMLInputElement>, "className"> & {
  className?: string;
};

export function GInput({ className, ...rest }: Props) {
  return <input className={cn("g-input", className)} {...rest} />;
}

