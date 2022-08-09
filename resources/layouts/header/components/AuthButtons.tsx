import React from "react";
import { pages } from "../../../../_config/pages";
import Link from "next/link";
import { Button } from "../../../../_common/ui/Button";
import { useRouter } from "next/router";

type Props = {
    white?: boolean;
};

export function AuthButtons(props: Props) {
    const { asPath } = useRouter();
    return (
        <div className={"flex gap-8"}>
            {asPath !== pages.register.path && (
                <Link href={pages.register.path}>
                    <a>
                        <Button color={"gradient"} content={"S'inscrire"} />
                    </a>
                </Link>
            )}
            <Link href={pages.login.path}>
                <a>
                    <Button secondary content={"Se connecter"} color={props.white ? "white" : undefined} />
                </a>
            </Link>
        </div>
    );
}
