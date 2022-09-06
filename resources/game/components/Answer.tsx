import React from "react";
import clsx from "clsx";
import { observer } from "mobx-react-lite";
import { useGameStore } from "../_stores/GameContext";

type Props = {
    text: string;
    checked?: boolean;
    onClick: () => void;
    isTrue: boolean;
    isFalse: boolean;
};

const Answer = observer((props: Props) => {
    const gameStore = useGameStore();

    return (
        <div
            onClick={props.onClick}
            className={clsx(
                "flex box-border border items-center justify-center w-[40%] py-12 rounded-xl hover:cursor-pointer transition-all",
                {
                    "border-quizz-title font-bold bg-quizz-question-selected text-white":
                        props.checked && !props.isFalse && !props.isTrue,
                    "border-quizz-question-border  font-medium bg-quizz-question":
                        !props.checked && !props.isFalse && !props.isTrue,
                    "bg-quizz-answer-true border-quizz-answer-true-darker font-medium text-quizz-answer-true-darker":
                        props.isTrue,
                    "bg-quizz-answer-false border-quizz-answer-false-darker font-medium text-quizz-answer-false-darker":
                        props.isFalse,
                },
            )}
        >
            {props.text}
        </div>
    );
});

export default Answer;
