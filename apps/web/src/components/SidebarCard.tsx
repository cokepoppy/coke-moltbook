import * as React from "react";
import { cn } from "../ui/cn";
import { GCard } from "../ui/GCard";

type Props = {
  title: string;
  icon?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
};

export function SidebarCard({ title, icon, className, children }: Props) {
  return (
    <GCard className={cn(className)}>
      <div className="g-sidebarHeader">
        {icon}
        <div className="g-sidebarTitle">{title}</div>
      </div>
      {children}
    </GCard>
  );
}

