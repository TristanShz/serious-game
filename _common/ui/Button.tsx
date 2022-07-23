import React, { ReactNode } from "react";
import clsx from "clsx";

type Props = {
  color?: "primary" | "gradient" | "secondary" | "white";
  secondary?: boolean;
  content: string | ReactNode;
  link?: string;
  onClick?: () => any;
  large?: boolean;
  className?: string;
  full?: boolean;
  type?: "button" | "submit";
};

export function Button(props: Props) {
  return (
    <button
      type={props.type}
      className={clsx(
        props.className,
        "rounded-lg flex items-center hover:cursor-pointer active:scale-98 font-medium whitespace-nowrap",
        {
          "bg-gradient-to-r from-secondary to-primary hover:from-secondary-light hover:to-primary-light":
            props.color === "gradient" && !props.secondary,
          "bg-primary hover:bg-primary-light":
            props.color === "primary" && !props.secondary,
          "bg-secondary hover:bg-secondary-light":
            props.color === "secondary" && !props.secondary,
          "bg-black-10 hover:bg-white":
            props.color === "white" && !props.secondary,
          "text-white": !props.secondary && props.color !== "white",
          "bg-none border-2 border-solid border-black hover:border-black-75 hover:text-black-75":
            props.secondary && !props.color,
          "bg-none border-2 border-solid border-primary text-primary hover:bg-primary hover:text-white transition-all":
            props.secondary && props.color === "primary",
          "bg-none border-2 border-solid border-black-10 text-black-10 hover:bg-white hover:text-black transition-all":
            props.secondary && props.color === "white",
          "h-10": !props.large,
          "h-16": props.large,
          "px-10": !props.large && !props.full,
          "px-12": props.large && !props.full,
          "w-full justify-center": props.full,
          "w-fit": !props.full,
        }
      )}
    >
      {props.content}
    </button>
  );
}