import React, { ReactNode } from "react";
import clsx from "clsx";
import { AsideBar } from "../../_common/components/AsideBar";
import DashboardLogo from "../../public/logo.svg";

type Props = {
  children: ReactNode;
};

export function RegularAdminLayout({ children }: Props) {
  return (
    <div className={clsx("flex")}>
      <AsideBar title={"admin Dashboard"} logo={DashboardLogo} />
      <main className={"flex-1 flex pl-80 p-8"}>{children}</main>
    </div>
  );
}
