import React from "react";
import { observer } from "mobx-react-lite";
import clsx from "clsx";
import Link from "next/link";
import { useMobxStores } from "../../../../_common/_stores/Stores";

type Props = {};

export const PanelMenu = observer((props: Props) => {
  const {
    menuStore: { isOpen },
  } = useMobxStores();
  return (
    <div
      className={clsx(
        "fixed inset-0 bg-gradient-to-tr from-black to-black-90 z-40 -translate-y-full ease-in-out duration-300 flex flex-col items-center justify-center",
        {
          "translate-y-0": isOpen,
        }
      )}
    >
      <div
        className={
          "text-white flex flex-col text-center text-5xl font-extrabold gap-6"
        }
      >
        <Link href={"/"}>
          <a>Formations</a>
        </Link>
        <Link href={"/"}>
          <a>Contact</a>
        </Link>
        <Link href={"/"}>
          <a>S&rsquo;inscrire</a>
        </Link>
        <Link href={"/"}>
          <a>Se connecter</a>
        </Link>
      </div>
    </div>
  );
});
