import React, { ReactNode } from "react";
import clsx from "clsx";
import { AsideBar } from "../../_common/components/AsideBar";
import DashboardLogo from "../../public/logo.svg";

type Props = {
    children: ReactNode;
};

export function RegularAdminLayout({ children }: Props) {
    return (
        <div className={clsx("h-screen w-screen bg-contain flex")}>
            <AsideBar title={"admin Dashboard"} logo={DashboardLogo} />
            <main className={"overflow-y-scroll w-full h-full flex items-center justify-center px-10"}>{children}</main>
        </div>
    );
}
