import * as React from "react";
import { cn } from "../../ui/cn";

type Tone = "info" | "success" | "warning" | "danger";

type Props = React.HTMLAttributes<HTMLDivElement> & {
  tone?: Tone;
  title?: string;
};

const toneStyles: Record<Tone, string> = {
  info: "border-google-blue/20 bg-google-blue/5 text-gray-800",
  success: "border-google-green/20 bg-google-green/5 text-gray-800",
  warning: "border-google-yellow/30 bg-google-yellow/10 text-gray-800",
  danger: "border-google-red/20 bg-google-red/5 text-gray-800"
};

export function Notice({ className, tone = "info", title, children, ...rest }: Props) {
  return (
    <div className={cn("rounded-xl border px-4 py-3 text-sm", toneStyles[tone], className)} {...rest}>
      {title ? <div className="font-semibold text-gray-900 mb-0.5">{title}</div> : null}
      <div className="text-gray-700 leading-relaxed">{children}</div>
    </div>
  );
}

