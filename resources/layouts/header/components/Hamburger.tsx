import React, { useState } from "react";
import clsx from "clsx";
import { observer } from "mobx-react-lite";
import { useMobxStores } from "../../../../_common/_stores/Stores";

type Props = {
  className?: string;
};

export const Hamburger = observer((props: Props) => {
  const [hover, setHover] = useState(false);
  const { menuStore } = useMobxStores();
  return (
    <div
      className={clsx(
        "flex gap-3 items-center hover:cursor-pointer",
        props.className
      )}
      onClick={() => menuStore.toggleOpen()}
      onMouseOver={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <p
        className={clsx("font-medium", {
          "text-white": menuStore.isOpen,
          "text-primary": !menuStore.isOpen,
        })}
      >
        MENU
      </p>
      <div
        className={clsx(
          "flex flex-col items-center justify-center ease-in-out duration-500",
          {
            "gap-1": !hover,
            "gap-2": hover,
          }
        )}
      >
        <div
          className={clsx("h-0.5 w-8 bg-primary", {
            "bg-white": menuStore.isOpen,
            "bg-primary": !menuStore.isOpen,
          })}
        />
        <div
          className={clsx("h-0.5 w-8 bg-primary", {
            "bg-white": menuStore.isOpen,
            "bg-primary": !menuStore.isOpen,
          })}
        />
        <div
          className={clsx("h-0.5 w-8 bg-primary", {
            "bg-white": menuStore.isOpen,
            "bg-primary": !menuStore.isOpen,
          })}
        />
      </div>
    </div>
  );
});
