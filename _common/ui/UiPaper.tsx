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

export const UiPaper = forwardRef((props: Props, ref: ForwardedRef<any>) => {
  return (
    <div
      className={clsx("font-ubuntu text-textBlue rounded-md", props.className, {
        "p-6": !props.largePadding && !props.disabled && !props.noBg,
        "px-6": !props.largePadding && props.noBg,
        "px-12": props.largePadding && props.noBg,
        "p-12": props.largePadding && !props.disabled && !props.noBg,
        "bg-white border-line border-solid border-selectBorderColor": !props.noBg && !props.disabled
      })}
      ref={ref}
    >
      {!props.disabled && (
        <div className={"flex flex-col mobileMenu:flex-row justify-between items-start"}>
          {props.mediumTitle && (
            <h2
              className={clsx("font-medium text-2xl sm:text-3xl", {
                "text-lightBlue": props.titleColor === "blue",
                "mb-6": !props.extraTitle,
                "mb-6 mobileMenu:mb-0": props.extraTitle
              })}
            >
              {props.mediumTitle}
            </h2>
          )}
          {props.bigTitle && (
            <h2
              className={clsx("font-medium text-4xl mb-12", {
                "text-lightBlue": props.titleColor === "blue",
                "mb-6": !props.extraTitle,
                "mb-6 mobileMenu:mb-0": props.extraTitle
              })}
            >
              {props.bigTitle}
            </h2>
          )}
          {props.extraTitle && <p className={"mb-6"}>{props.extraTitle}</p>}
        </div>
      )}
      {props.children}
    </div>
  );
});

UiPaper.displayName = "UiPaper";
