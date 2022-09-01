import React, { ReactNode, useEffect, useState } from "react";
import { Controller, FormProvider, useController, useForm } from "react-hook-form";
import { TQuizzMdl } from "../../../quizz/_models/QuizzMdl";
import { InputBlock } from "../../../../_common/ui/form/InputBlock";
import { Input } from "../../../../_common/ui/form/Input";
import { appConfig, QUIZZ_DIFFICULTY_LEVEL, TQuizzDifficultyLevel } from "../../../../_config/config";
import { Editor } from "@tinymce/tinymce-react";
import { Select } from "../../../../_common/ui/form/Select";
import { InputQuestion } from "./InputQuestion";
import { Button } from "../../../../_common/ui/Button";
import { urlsAdmin } from "../../../../_common/routes/routes";
import { useRouter } from "next/router";
import { quizzAdminStore } from "../_stores/quizzAdminStore";
import Image from "next/image";
import checkLogo from "../.././../../public/icons/Vector.svg";
import clsx from "clsx";
type Props = {
    data?: TQuizzMdl;
};

export type TQuestion = {
    question: string;
    responseA: { text: string; isTrue: boolean };
    responseB: { text: string; isTrue: boolean };
    responseC: { text: string; isTrue: boolean };
    responseD: { text: string; isTrue: boolean };
};

export function QuizzForm(props: Props) {
    const [questions, setQuestions] = useState<TQuestion[]>([]);
    const { push } = useRouter();

    const form = useForm<TQuizzMdl>({
        defaultValues: {
            ...props.data,
        },
    });
    const {
        field: { onChange, ...field },
    } = useController({ control: form.control, name: "description" });

    return (
        <FormProvider {...form}>
            <form
                className={"flex flex-col gap-8 w-full"}
                onSubmit={form.handleSubmit((data) => {
                    const quizzObject = {
                        name: data.name,
                        description: data.description,
                        duration: data.duration,
                        difficulty: data.difficulty,
                        questions: questions.map((question) => {
                            return {
                                text: question.question,
                                answers: [
                                    { text: question.responseA.text, isTrue: question.responseA.isTrue },
                                    { text: question.responseB.text, isTrue: question.responseB.isTrue },
                                    { text: question.responseC.text, isTrue: question.responseC.isTrue },
                                    { text: question.responseD.text, isTrue: question.responseD.isTrue },
                                ],
                            };
                        }),
                    };
                    console.log("QUIZZ DATA =>>>", quizzObject);
                    quizzAdminStore.create(quizzObject).then((_r) => {
                        form.reset({
                            name: "",
                            description: "",
                        });
                        setQuestions([]);
                    });
                })}
            >
                <InputBlock label={"Nom du quizz"}>
                    <Controller
                        name={"name"}
                        rules={{
                            required: {
                                value: true,
                                message: "Nom du quizz obligatoire",
                            },
                        }}
                        render={({ field }) => {
                            return <Input {...field} type={"text"} full error={form.formState.errors.name} />;
                        }}
                    />
                </InputBlock>
                <InputBlock label={"Description (courte description, sujets abordés dans le quizz...)"}>
                    <Editor
                        {...field}
                        onEditorChange={onChange}
                        apiKey={appConfig.tinymceKey}
                        init={{
                            height: 290,
                            menubar: false,
                        }}
                    />
                </InputBlock>
                <InputBlock label={"Temps limite (en minute)"}>
                    <Controller
                        name={"duration"}
                        rules={{
                            required: {
                                value: true,
                                message: "Durée obligatoire",
                            },
                        }}
                        render={({ field }) => {
                            return (
                                <Input
                                    {...field}
                                    type={"number"}
                                    full
                                    min={0}
                                    max={100}
                                    error={form.formState.errors.duration}
                                />
                            );
                        }}
                    />
                </InputBlock>
                <InputBlock label={"Difficultée"}>
                    <Controller
                        name={"difficulty"}
                        render={({ field }) => {
                            return (
                                <Select
                                    {...field}
                                    options={(
                                        Object.values(QUIZZ_DIFFICULTY_LEVEL) as Array<TQuizzDifficultyLevel>
                                    ).map((difficulty) => {
                                        return {
                                            value: difficulty,
                                            label: difficulty,
                                        };
                                    })}
                                />
                            );
                        }}
                    />
                </InputBlock>
                <InputBlock label={"Questions"} className={"text-center p-3"}>
                    <InputQuestion setQuestions={setQuestions} questions={questions} />
                </InputBlock>
                <ul>
                    <h1>Questions validées</h1>

                    {questions.length > 0 &&
                        questions.map((question, index) => {
                            return (
                                <li key={index} className={" rounded-xl bg-neutral-10 my-1.5 "}>
                                    <div className={"flex justify-between items-center w-full"}>
                                        <div className={"flex flex-col border border-primary grow"}>
                                            <span className={"bg-neutral-95 text-white text-center"}>Question</span>
                                            <span className={"p-3 break-all"}>{question.question}</span>
                                        </div>
                                        <div
                                            className={clsx("flex flex-col border border-primary grow", {
                                                "bg-green-200": question.responseA.isTrue,
                                            })}
                                        >
                                            <span className={"bg-neutral-95 text-white text-center"}>Réponse A</span>
                                            <span className={"text-center p-3 break-all"}>
                                                {question.responseA.text}
                                            </span>
                                        </div>
                                        <div
                                            className={clsx("flex flex-col border border-primary grow", {
                                                "bg-green-200": question.responseB.isTrue,
                                            })}
                                        >
                                            <span className={"bg-neutral-95 text-white text-center"}>Réponse B</span>
                                            <span className={"text-center p-3 break-all"}>
                                                {question.responseB.text}
                                            </span>
                                        </div>
                                        <div
                                            className={clsx("flex flex-col border border-primary grow ", {
                                                "bg-green-200": question.responseC.isTrue,
                                            })}
                                        >
                                            <span className={"bg-neutral-95 text-white text-center"}>Réponse C</span>
                                            <span className={"text-center p-3 break-all"}>
                                                {question.responseC.text}
                                            </span>
                                        </div>
                                        <div
                                            className={clsx("flex flex-col border border-primary grow", {
                                                "bg-green-200": question.responseD.isTrue,
                                            })}
                                        >
                                            <span className={"bg-neutral-95 text-white text-center"}>Réponse D</span>
                                            <span className={"text-center p-3 break-all"}>
                                                {question.responseD.text}
                                            </span>
                                        </div>

                                        <Button
                                            className={"bg-red-500 m-3"}
                                            content={"Supprimer"}
                                            onClick={() => {
                                                const newQuestionsArray = questions.filter(
                                                    (_, indexArray) => index !== indexArray,
                                                );
                                                setQuestions(newQuestionsArray);
                                            }}
                                        />
                                    </div>
                                </li>
                            );
                        })}
                </ul>
                <div className={"flex gap-2 justify-center"}>
                    {questions.length > 0 && <Button content={"Valider"} type={"submit"} color={"gradient"} />}
                    <Button
                        content={"Retour"}
                        type={"button"}
                        color={"white"}
                        onClick={() => {
                            push(urlsAdmin().quizz);
                        }}
                    />
                </div>
            </form>
        </FormProvider>
    );
}
