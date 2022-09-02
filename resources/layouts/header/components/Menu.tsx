import Link from "next/link";
import clsx from "clsx";
import { useRouter } from "next/router";
import { pages } from "../../../../_config/pages";
import { AuthButtons } from "./AuthButtons";
import useUser from "../../../../lib/users/_helpers/useUser";
import { useState } from "react";
import { fetchUtils } from "../../../../_config/axios";

type Props = {
    className?: string;
    white?: boolean;
};

export function Menu(props: Props) {
    const { asPath } = useRouter();
    const { user } = useUser();
    const [visible, setVisible] = useState(false);
    const [info, setInfo] = useState(true);
    const { mutateUser } = useUser();
    const router = useRouter();

    return (
        <div
            className={clsx("flex gap-16 font-medium items-center", props.className, {
                "text-neutral-10": props.white,
            })}
        >
            <Link href={pages.formations.path}>
                <a className="hover:font-semibold">Formations</a>
            </Link>
            <Link href={pages.contact.path}>
                <a className="hover:font-semibold">Contact</a>
            </Link>
            {user?.data?.isLoggedIn ? (
                <div
                    className="cursor-pointer"
                    onMouseEnter={() => setVisible(true)}
                    onMouseLeave={() => setVisible(false)}
                >
                    {user.data.firstName} {user.data.lastName}
                    <div
                        className={clsx(
                            "flex flex-col w-36 p-2 space-y-2 rounded-lg border bg-white absolute",
                            visible ? "" : "hidden",
                        )}
                    >
                        <Link href={pages.monCompte.path}>
                            <a className="hover:font-semibold">Mon compte</a>
                        </Link>
                        <a
                            className="hover:font-semibold text-xs"
                            onClick={async (e) => {
                                console.log("heeeee");
                                e.preventDefault();
                                mutateUser(await fetchUtils.post("/auth/logout"), false);
                                router.push("/");
                            }}
                        >
                            Se déconnecter
                        </a>
                    </div>
                </div>
            ) : (
                <AuthButtons white={props.white} />
            )}
        </div>
    );
}
