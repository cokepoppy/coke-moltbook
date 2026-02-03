import * as React from "react";
import { cn } from "../../ui/cn";

type Props = {
  label: string;
  hint?: string;
  required?: boolean;
  children: React.ReactNode;
  className?: string;
};

export function FormField({ label, hint, required, children, className }: Props) {
  return (
    <div className={cn("space-y-1.5", className)}>
      <div className="flex items-baseline gap-2">
        <label className="text-xs font-semibold text-gray-700">{label}</label>
        {required ? <span className="text-[10px] text-gray-400">Required</span> : null}
      </div>
      {children}
      {hint ? <div className="text-[11px] text-gray-500 leading-relaxed">{hint}</div> : null}
    </div>
  );
}

