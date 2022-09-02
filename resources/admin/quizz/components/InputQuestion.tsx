import React, { useState } from "react";
import { Input } from "../../../../_common/ui/form/Input";
import { Button } from "../../../../_common/ui/Button";
import { TQuestion } from "./QuizzForm";

type Props = {
    setQuestions: (arg: any) => void;
    questions: any;
};

const INITIAL_STATE = {
    responseA: { text: "", isTrue: false },
    responseB: { text: "", isTrue: false },
    responseC: { text: "", isTrue: false },
    responseD: { text: "", isTrue: false },
};

export function InputQuestion(props: Props) {
    const [question, setQuestion] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [answers, setAnswers] = useState(INITIAL_STATE);

    return (
        <div className={"flex flex-col gap-4 p-2"}>
            <Input
                type={"text"}
                full
                value={question}
                onChange={(event) => {
                    setQuestion(event.target.value);
                }}
            />
            <div className={"flex flex-col ml-4 gap-10"}>
                <div className={"flex gap-8 items-center"}>
                    <label className={"whitespace-nowrap"}>Réponse A :</label>
                    <Input
                        type={"text"}
                        full
                        value={answers.responseA.text}
                        onChange={(event) => {
                            setAnswers({
                                ...answers,
                                responseA: { text: event.target.value, isTrue: answers.responseA.isTrue },
                            });
                        }}
                    />
                    <div className={"flex gap-2"}>
                        <input
                            type={"checkbox"}
                            name={"isTrue"}
                            checked={answers.responseA.isTrue}
                            onChange={() =>
                                setAnswers({
                                    ...answers,
                                    responseA: { text: answers.responseA.text, isTrue: !answers.responseA.isTrue },
                                })
                            }
                        />
                        <label htmlFor={"isTrue"}>vrai</label>
                    </div>
                </div>
                <div className={"flex gap-8 items-center"}>
                    <label className={"whitespace-nowrap"}>Réponse B :</label>
                    <Input
                        type={"text"}
                        full
                        value={answers.responseB.text}
                        onChange={(event) => {
                            setAnswers({
                                ...answers,
                                responseB: { text: event.target.value, isTrue: answers.responseB.isTrue },
                            });
                        }}
                    />
                    <div className={"flex gap-2"}>
                        <input
                            type={"checkbox"}
                            name={"isTrue"}
                            checked={answers.responseB.isTrue}
                            onChange={() =>
                                setAnswers({
                                    ...answers,
                                    responseB: { text: answers.responseB.text, isTrue: !answers.responseB.isTrue },
                                })
                            }
                        />
                        <label htmlFor={"isTrue"}>vrai</label>
                    </div>
                </div>
                <div className={"flex gap-8 items-center"}>
                    <label className={"whitespace-nowrap"}>Réponse C :</label>
                    <Input
                        type={"text"}
                        full
                        value={answers.responseC.text}
                        onChange={(event) => {
                            setAnswers({
                                ...answers,
                                responseC: { text: event.target.value, isTrue: answers.responseC.isTrue },
                            });
                        }}
                    />
                    <div className={"flex gap-2"}>
                        <input
                            type={"checkbox"}
                            name={"isTrue"}
                            checked={answers.responseC.isTrue}
                            onChange={() =>
                                setAnswers({
                                    ...answers,
                                    responseC: { text: answers.responseC.text, isTrue: !answers.responseC.isTrue },
                                })
                            }
                        />
                        <label htmlFor={"isTrue"}>vrai</label>
                    </div>
                </div>
                <div className={"flex gap-8 items-center"}>
                    <label className={"whitespace-nowrap"}>Réponse D :</label>
                    <Input
                        type={"text"}
                        full
                        value={answers.responseD.text}
                        onChange={(event) => {
                            setAnswers({
                                ...answers,
                                responseD: { text: event.target.value, isTrue: answers.responseD.isTrue },
                            });
                        }}
                    />
                    <div className={"flex gap-2"}>
                        <input
                            type={"checkbox"}
                            name={"isTrue"}
                            checked={answers.responseD.isTrue}
                            onChange={() => {
                                const test = {
                                    ...answers,
                                    responseD: { text: answers.responseD.text, isTrue: !answers.responseD.isTrue },
                                };
                                setAnswers(test);
                            }}
                        />
                        <label htmlFor={"isTrue"}>vrai</label>
                    </div>
                </div>
            </div>
            <div className={"flex flex-col items-center justify-center"}>
                <Button
                    type={"button"}
                    content={"Ajouter"}
                    color={"primary"}
                    onClick={() => {
                        const checkIsTrue = Object.entries(answers).map((answer, index) => {
                            return answer[1].isTrue;
                        });
                        const checkAnswers = Object.entries(answers).map((answer, index) => {
                            return answer[1].text;
                        });
                        if (checkIsTrue.includes(true) && question.length > 0 && !checkAnswers.includes("")) {
                            const questionObject = { ...answers, question };
                            props.setQuestions((state: TQuestion[]) => [...state, questionObject]);
                            setAnswers(INITIAL_STATE);
                            setQuestion("");
                            setErrorMessage("");
                        } else {
                            setErrorMessage("Veuillez compléter le quizz");
                        }
                    }}
                />
                <span className={"text-red-900"}>{errorMessage}</span>
            </div>
        </div>
    );
}
