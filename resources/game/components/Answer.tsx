import React from "react";
import clsx from "clsx";

type Props = {
  text: string
  checked?: boolean
  onClick: () => void
};

export function Answer(props: Props) {
  return (
    <div
      onClick={props.onClick}
      className={clsx("flex box-border border items-center justify-center w-[40%] py-12 rounded-xl hover:cursor-pointer transition-all", {
        "border-quizz-title font-bold bg-quizz-question-selected text-white": props.checked,
        "border-quizz-question-border  font-medium bg-quizz-question": !props.checked
      })}>
      {props.text}
    </div>
  );
}
