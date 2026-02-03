import * as React from "react";
import { useLocation } from "react-router-dom";
import { TopBar } from "./TopBar";

type Props = {
  children: React.ReactNode;
};

export function AppShell({ children }: Props) {
  const loc = useLocation();
  const hideTopBar = loc.pathname === "/" || loc.pathname.startsWith("/post/");

  return (
    <>
      {!hideTopBar ? <TopBar /> : null}
      <main>{children}</main>
    </>
  );
}

