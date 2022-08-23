import React, { PropsWithChildren } from "react";
import clsx from "clsx";

type Props = {
  children: PropsWithChildren<any>;
  border?: boolean;
  bg?: "neutral" | "white";
  className?: string;
  stickyContent?: boolean;
};

export function SideBar(props: Props) {
  return (
    <div
      className={clsx(
        props.className,
        "font-ubuntu text-textBlue fixed md:relative h-auto transition-all z-40 w-96",
        {
          ["bg-white"]: props.bg === "white",
          ["bg-neutral-95"]: props.bg === "neutral",
          ["border-r border-borderBlue"]: props.border
        }
      )}
    >
      <div
        className={clsx("w-full h-screen", {
          "sticky top-24": props.stickyContent
        })}
      >
        {props.children}
      </div>
    </div>
  );
}
