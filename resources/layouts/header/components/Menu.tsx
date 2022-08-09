import React from "react";
import Link from "next/link";
import clsx from "clsx";
import { useRouter } from "next/router";
import { pages } from "../../../../_config/pages";
import { AuthButtons } from "./AuthButtons";
import useUser from "../../../../lib/users/_helpers/useUser";

type Props = {
    className?: string;
    white?: boolean;
};

export function Menu(props: Props) {
    const { asPath } = useRouter();
    const { user } = useUser();
    return (
        <div
            className={clsx("flex gap-16 font-medium items-center", props.className, {
                "text-neutral-10": props.white,
            })}
        >
            <Link href={pages.formations.path}>
                <a>Formations</a>
            </Link>
            <Link href={pages.contact.path}>
                <a>Contact</a>
            </Link>
            {user?.data?.isLoggedIn ? <div>WESH</div> : <AuthButtons white={props.white} />}
        </div>
    );
}
