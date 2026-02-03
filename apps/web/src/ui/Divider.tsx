import * as React from "react";
import { cn } from "./cn";

type Props = React.HTMLAttributes<HTMLHRElement>;

export function Divider({ className, ...rest }: Props) {
  return <hr className={cn("g-divider", className)} {...rest} />;
}

