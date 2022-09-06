import React, { useState } from "react";
import { Input } from "../../../../_common/ui/form/Input";
import { Button } from "../../../../_common/ui/Button";
import { TQuestionMdl } from "../../../quizz/_models/QuizzMdl";

type Props = {
    setQuestions: (arg: any) => void;
    questions: any;
};

const INITIAL_STATE = {
    a: { text: "", isTrue: false },
    b: { text: "", isTrue: false },
    c: { text: "", isTrue: false },
    d: { text: "", isTrue: false },
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
                        value={answers.a.text}
                        onChange={(event) => {
                            setAnswers({
                                ...answers,
                                a: { text: event.target.value, isTrue: answers.a.isTrue },
                            });
                        }}
                    />
                    <div className={"flex gap-2"}>
                        <input
                            type={"checkbox"}
                            name={"isTrue"}
                            checked={answers.a.isTrue}
                            onChange={() =>
                                setAnswers({
                                    ...answers,
                                    a: { text: answers.a.text, isTrue: !answers.a.isTrue },
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
                        value={answers.b.text}
                        onChange={(event) => {
                            setAnswers({
                                ...answers,
                                b: { text: event.target.value, isTrue: answers.b.isTrue },
                            });
                        }}
                    />
                    <div className={"flex gap-2"}>
                        <input
                            type={"checkbox"}
                            name={"isTrue"}
                            checked={answers.b.isTrue}
                            onChange={() =>
                                setAnswers({
                                    ...answers,
                                    b: { text: answers.b.text, isTrue: !answers.b.isTrue },
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
                        value={answers.c.text}
                        onChange={(event) => {
                            setAnswers({
                                ...answers,
                                c: { text: event.target.value, isTrue: answers.c.isTrue },
                            });
                        }}
                    />
                    <div className={"flex gap-2"}>
                        <input
                            type={"checkbox"}
                            name={"isTrue"}
                            checked={answers.c.isTrue}
                            onChange={() =>
                                setAnswers({
                                    ...answers,
                                    c: { text: answers.c.text, isTrue: !answers.c.isTrue },
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
                        value={answers.d.text}
                        onChange={(event) => {
                            setAnswers({
                                ...answers,
                                d: { text: event.target.value, isTrue: answers.d.isTrue },
                            });
                        }}
                    />
                    <div className={"flex gap-2"}>
                        <input
                            type={"checkbox"}
                            name={"isTrue"}
                            checked={answers.d.isTrue}
                            onChange={() => {
                                const test = {
                                    ...answers,
                                    d: { text: answers.d.text, isTrue: !answers.d.isTrue },
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
                            const questionObject = { answers: { ...answers }, text: question };
                            props.setQuestions((state: TQuestionMdl[]) => [...state, questionObject]);
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
