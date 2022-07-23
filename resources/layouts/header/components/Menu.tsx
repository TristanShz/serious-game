import React from "react";
import Link from "next/link";
import { Button } from "../../../../_common/ui/Button";
import clsx from "clsx";
import { useRouter } from "next/router";

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
      <Link href={"/"}>
        <a>Formations</a>
      </Link>
      <Link href={"/"}>
        <a>Contact</a>
      </Link>
      <div className={"flex gap-8"}>
        {asPath !== "/register" && (
          <Link href={"/register"}>
            <a>
              <Button color={"gradient"} content={"S'inscrire"} />
            </a>
          </Link>
        )}
        <Link href={"/"}>
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
