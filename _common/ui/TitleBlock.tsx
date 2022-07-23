import React from "react";
import clsx from "clsx";

type Props = {
  title: string;
  text?: string;
  h1Title?: boolean;
  className?: string;
};

export function TitleBlock(props: Props) {
  return (
    <div className={clsx("flex flex-col gap-12", props.className)}>
      {props.h1Title ? (
        <h1 className={"text-2xl md:text-5xl lg:text-6xl font-extrabold"}>
          {props.title}
        </h1>
      ) : (
        <h2 className={"text-3xl md:text-5xl lg:text-6xl font-extrabold"}>
          {props.title}
        </h2>
      )}
      <p className={"text-md md:text-xl lg:text-2xl leading-[130%]"}>
        {props.text}
      </p>
    </div>
  );
}
