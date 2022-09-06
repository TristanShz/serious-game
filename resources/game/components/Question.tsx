import { useGameStore } from "../_stores/GameContext";
import clsx from "clsx";
import { Answer } from "./Answer";
import { Timer } from "./Timer";
import { observer } from "mobx-react-lite";
import { useState } from "react";

const Question = observer(() => {
    const gameStore = useGameStore();
    const question = gameStore.quizz.questions[gameStore.currentQuestion - 1];
    const [checkedQuestion, setCheckedQuestion] = useState<number[]>([]);
    return (
        <div className={"px-8 py-12 flex flex-col justify-between h-full"}>
            <Timer minutes={gameStore.timer / 60} seconds={gameStore.timer % 60} />
            <div className={"flex flex-col gap-8"}>
                <div className={"flex flex-col gap-4"}>
                    <div className={"flex gap-2 text-4xl text-quizz-title font-bold"}>
                        <span>Question</span>
                        <span>
                            {gameStore.currentQuestion < 10 ? "0" : ""}
                            {gameStore.currentQuestion}
                        </span>
                        <span className={"text-quizz-title-light"}>
                            / {gameStore.quizz.questions.length < 10 ? "0" : ""}
                            {gameStore.quizz.questions.length}
                        </span>
                    </div>
                    <div className={"flex gap-1"}>
                        {gameStore.quizz.questions.map((question, index) => {
                            if (gameStore.result.responses[index]) {
                                return (
                                    <div
                                        key={index}
                                        className={clsx("w-14 h-4", {
                                            "bg-quizz-answer-true": gameStore.checkAnswer(index),
                                            "bg-quizz-answer-false": !gameStore.checkAnswer(index),
                                        })}
                                    ></div>
                                );
                            } else {
                                return <div key={index} className={clsx("w-14 h-4 bg-stone-300")}></div>;
                            }
                        })}
                    </div>
                </div>
                <p className={"text-xl font-medium"}>{question.text}</p>
            </div>
            <div className={"flex flex-wrap gap-8"}>
                {Object.values(question.answers).map((answer, index) => {
                    return (
                        <Answer
                            key={answer.text}
                            text={answer.text}
                            checked={checkedQuestion.includes(index)}
                            onClick={() => {
                                if (checkedQuestion.includes(index)) {
                                    setCheckedQuestion(
                                        checkedQuestion.filter((questionIndex) => questionIndex !== index),
                                    );
                                } else {
                                    setCheckedQuestion([...checkedQuestion, index]);
                                }
                            }}
                        />
                    );
                })}
            </div>
            <div
                className={
                    "absolute right-8 top-1/2 hover:cursor-pointer hover:scale-110 transition-all active:scale-100"
                }
                onClick={() =>
                    gameStore.postResult({
                        a: checkedQuestion.includes(0),
                        b: checkedQuestion.includes(1),
                        c: checkedQuestion.includes(2),
                        d: checkedQuestion.includes(3),
                    })
                }
            >
                <svg
                    width="67"
                    height="55"
                    viewBox="0 0 67 55"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                >
                    <rect y="19" width="58" height="16" fill="url(#pattern0)" />
                    <rect
                        x="66.9216"
                        width="32.4424"
                        height="32.4424"
                        transform="rotate(90 66.9216 0)"
                        fill="url(#pattern1)"
                    />
                    <rect
                        x="66.9216"
                        y="22.5576"
                        width="32.4424"
                        height="32.4424"
                        transform="rotate(90 66.9216 22.5576)"
                        fill="url(#pattern2)"
                    />
                    <defs>
                        <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
                            <use
                                xlinkHref="#image0_709_191"
                                transform="translate(-6.57706e-08 0.0164185) scale(0.00436994 0.015841)"
                            />
                        </pattern>
                        <pattern id="pattern1" patternContentUnits="objectBoundingBox" width="1" height="1">
                            <use xlinkHref="#image1_709_191" transform="scale(0.0078125)" />
                        </pattern>
                        <pattern id="pattern2" patternContentUnits="objectBoundingBox" width="1" height="1">
                            <use xlinkHref="#image2_709_191" transform="scale(0.0078125)" />
                        </pattern>
                        <image
                            id="image0_709_191"
                            width="320"
                            height="64"
                            xlinkHref="data:image/png;base64,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"
                        />
                        <image
                            id="image1_709_191"
                            width="128"
                            height="128"
                            xlinkHref="data:image/png;base64,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"
                        />
                        <image
                            id="image2_709_191"
                            width="128"
                            height="128"
                            xlinkHref="data:image/png;base64,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"
                        />
                    </defs>
                </svg>
            </div>
        </div>
    );
});

export default Question;
