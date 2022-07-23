import React, { PropsWithChildren } from "react";
import clsx from "clsx";

type Props = {
  className?: string;
  infoText?: string;
  label: string;
};

export function InputBlock(props: PropsWithChildren<Props>) {
  return (
    <div className={clsx("w-full", props.className)}>
      <span className={"text-sm md:text-base"}>{props.label}</span>
      {props.children}
      {props.infoText && (
        <p className={"text-xs text-black-50 font-light mt-1"}>
          {props.infoText}
        </p>
      )}
    </div>
  );
}
