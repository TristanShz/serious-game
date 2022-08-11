import React from "react";
import clsx from "clsx";

type Props = {
    className?: string;
    scroll?: boolean;
    color?: "white" | "black" | "primary" | "background-border";
};

export function Line(props: Props) {
    return (
        <div className={clsx(props.className, "w-full flex items-center flex-col gap-3")}>
            <div
                className={clsx("h-0.5 w-full", {
                    "bg-background-border": props.color === "background-border",
                    "bg-neutral-10": props.color === "white",
                    "bg-neutral": props.color === "black",
                    "bg-primary": props.color === "primary",
                })}
            />
            {props.scroll && <p className={"text-primary font-medium animate-bounce"}>.SCROLL</p>}
        </div>
    );
}
