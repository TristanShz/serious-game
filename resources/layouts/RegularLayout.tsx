import { ReactNode } from "react";
import { Header, THeaderProps } from "./header/components/Header";

type Props = {
    children: ReactNode;
    headerProps?: THeaderProps;
};

export default function RegularLayout({ children, headerProps }: Props) {
    return (
        <>
            <Header
                white={headerProps?.white}
                fixed={headerProps?.fixed}
                full={headerProps?.full}
                loginHeader={headerProps?.loginHeader}
            />
            {children}
        </>
    );
}
