import React, { PropsWithChildren } from "react";

type Props = {
  children: PropsWithChildren<any>
};

export function GamePanel(props: Props) {
  return (
    <div
      className={"absolute z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-[65%] w-[55%] h-2/3 bg-white rounded-3xl bg-quizz-background shadow-neutral shadow-lg"}>
      <div className={"relative w-full h-full rounded-3xl flex flex-col"}>
        {props.children}
      </div>
    </div>
  );
}
