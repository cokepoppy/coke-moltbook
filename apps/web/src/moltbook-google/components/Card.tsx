import * as React from "react";
import { cn } from "../../ui/cn";

type DivProps = React.HTMLAttributes<HTMLDivElement>;

export function Card({ className, ...rest }: DivProps) {
  return <div className={cn("bg-white rounded-xl border border-gray-200 shadow-sm", className)} {...rest} />;
}

export function CardHeader({ className, ...rest }: DivProps) {
  return <div className={cn("px-5 pt-5", className)} {...rest} />;
}

export function CardTitle({ className, ...rest }: DivProps) {
  return <div className={cn("text-base font-bold text-gray-900", className)} {...rest} />;
}

export function CardDescription({ className, ...rest }: DivProps) {
  return <div className={cn("mt-1 text-sm text-gray-600 leading-relaxed", className)} {...rest} />;
}

export function CardBody({ className, ...rest }: DivProps) {
  return <div className={cn("px-5 pb-5 pt-4", className)} {...rest} />;
}

export function CardFooter({ className, ...rest }: DivProps) {
  return <div className={cn("px-5 pb-5 pt-0", className)} {...rest} />;
}

