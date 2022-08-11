import React, { ForwardedRef, forwardRef, PropsWithChildren, ReactNode } from "react";
import clsx from "clsx";

type Props = {
    children: PropsWithChildren<React.ReactNode>;
    className?: string;
    bigTitle?: string;
    mediumTitle?: string;
    extraTitle?: ReactNode;
    largePadding?: boolean;
    noBg?: boolean;
    titleColor?: "base" | "blue";
    disabled?: boolean;
};

export const Paper = forwardRef((props: Props, ref: ForwardedRef<any>) => {
    return (
        <div
            className={clsx("rounded-md w-fit h-fit", props.className, {
                "p-6": !props.largePadding && !props.disabled && !props.noBg,
                "px-6": !props.largePadding && props.noBg,
                "px-12": props.largePadding && props.noBg,
                "p-12": props.largePadding && !props.disabled && !props.noBg,
                "bg-white": !props.noBg && !props.disabled,
            })}
            ref={ref}
        >
            {!props.disabled && (
                <div className={"flex flex-col mobileMenu:flex-row justify-between items-start"}>
                    {props.mediumTitle && (
                        <h2
                            className={clsx("font-medium text-3xl mb-6", {
                                "text-lightBlue": props.titleColor === "blue",
                            })}
                        >
                            {props.mediumTitle}
                        </h2>
                    )}
                    {props.bigTitle && (
                        <h2
                            className={clsx("font-medium text-4xl mb-12", {
                                "text-lightBlue": props.titleColor === "blue",
                            })}
                        >
                            {props.bigTitle}
                        </h2>
                    )}
                    <p>{props.extraTitle}</p>
                </div>
            )}
            {props.children}
        </div>
    );
});

Paper.displayName = "UiPaper";
