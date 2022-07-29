import React from "react";
import Link from "next/link";
import { Button } from "../../../../_common/ui/Button";
import clsx from "clsx";
import { useRouter } from "next/router";
import { pages } from "../../../../_config/pages";

type Props = {
  className?: string;
  white?: boolean;
};

export function Menu(props: Props) {
  const { asPath } = useRouter();

  return (
    <div
      className={clsx("flex gap-16 font-medium items-center", props.className, {
        "text-black-10": props.white,
      })}
    >
      <Link href={pages.formations.path}>
        <a>Formations</a>
      </Link>
      <Link href={pages.contact.path}>
        <a>Contact</a>
      </Link>
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
            <Button
              secondary
              content={"Se connecter"}
              color={props.white ? "white" : undefined}
            />
          </a>
        </Link>
      </div>
    </div>
  );
}
