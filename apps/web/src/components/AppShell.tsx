import * as React from "react";
import { TopBar } from "./TopBar";

type Props = {
  children: React.ReactNode;
};

export function AppShell({ children }: Props) {
  return (
    <>
      <TopBar />
      <main>{children}</main>
    </>
  );
}

