import * as React from "react";
import { cn } from "./cn";

export type TabOption<T extends string> = {
  value: T;
  label: string;
};

type Props<T extends string> = {
  value: T;
  options: Array<TabOption<T>>;
  onChange: (next: T) => void;
  className?: string;
};

export function GTabs<T extends string>({ value, options, onChange, className }: Props<T>) {
  return (
    <div className={cn("g-tabs", className)} role="tablist" aria-label="tabs">
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          className="g-tab"
          role="tab"
          aria-selected={value === o.value}
          onClick={() => onChange(o.value)}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

