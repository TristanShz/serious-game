import React from "react";

type Props = {
  text: string
};

export function Answer(props: Props) {
  return (
    <div
      className={"flex items-center justify-center w-[40%] py-12 bg-quizz-question border border-quizz-question-border rounded-xl font-medium hover:cursor-pointer hover:border-quizz-title transition-all"}>
      {props.text}
    </div>
  );
}
