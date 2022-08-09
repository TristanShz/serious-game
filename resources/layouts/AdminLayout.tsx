import { ReactNode } from "react";
import { THeaderProps } from "./header/components/Header";
import SideBar from "../admin/components/SideBar";

type Props = {
    children: ReactNode;
    headerProps?: THeaderProps;
};

export default function AdminLayout({ children }: Props) {
    return (
        <div className={"flex bg-neutral-5"}>
            <SideBar />
            {children}
        </div>
    );
}
