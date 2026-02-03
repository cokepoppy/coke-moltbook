import * as React from "react";
import { cn } from "../../ui/cn";

type Width = "sm" | "md" | "lg";

type Props = {
  title?: string;
  subtitle?: string;
  actions?: React.ReactNode;
  width?: Width;
  children: React.ReactNode;
};

export function PageShell({ title, subtitle, actions, width = "md", children }: Props) {
  const maxW =
    width === "sm" ? "max-w-2xl" : width === "lg" ? "max-w-7xl" : "max-w-4xl";

  return (
    <div className="min-h-screen bg-[#f8f9fa] font-sans text-google-text selection:bg-google-blue/20">
      <main className={cn("mx-auto px-4 py-6", maxW)}>
        {title ? (
          <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h1 className="text-xl font-bold text-gray-900">{title}</h1>
              {subtitle ? <p className="mt-1 text-sm text-gray-600">{subtitle}</p> : null}
            </div>
            {actions ? <div className="shrink-0">{actions}</div> : null}
          </div>
        ) : null}
        {children}
      </main>
    </div>
  );
}

