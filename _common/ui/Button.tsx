import { ReactNode } from "react";
import clsx from "clsx";
import Link from "next/link";

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
  const button = <button
    type={props.type}
    onClick={props.onClick}
    className={clsx(
      props.className,
      "rounded-lg flex items-center hover:cursor-pointer active:scale-98 font-bold whitespace-nowrap transition-all",
      {
        "bg-gradient-to-r from-secondary to-primary hover:from-secondary-light hover:to-primary-light":
          props.color === "gradient" && !props.secondary,
        "bg-primary hover:bg-primary-light": props.color === "primary" && !props.secondary,
        "bg-secondary hover:bg-secondary-light": props.color === "secondary" && !props.secondary,
        "bg-neutral-10 hover:bg-white": props.color === "white" && !props.secondary,
        "text-white": !props.secondary && props.color !== "white",
        "bg-none border-2 border-solid border-black hover:border-neutral-75 hover:text-neutral-75":
          props.secondary && !props.color,
        "bg-none border-2 border-solid border-primary text-primary hover:bg-primary hover:text-white":
          props.secondary && props.color === "primary",
        "bg-none border-2 border-solid border-neutral-10 text-neutral-10 hover:bg-white hover:text-black":
          props.secondary && props.color === "white",
        "h-10": !props.large,
        "h-16": props.large,
        "px-10": !props.large && !props.full,
        "px-12": props.large && !props.full,
        "w-full justify-center": props.full,
        "w-fit": !props.full
      }
    )}
  >
    {props.content}
  </button>;

  if (props.link) return <Link href={props.link}>{button}</Link>;
  return button;
}
