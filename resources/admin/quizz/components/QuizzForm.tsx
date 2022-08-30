import React, { useState } from "react";
import { Controller, FormProvider, useController, useForm } from "react-hook-form";
import { TQuizzMdl } from "../../../quizz/_models/QuizzMdl";
import { InputBlock } from "../../../../_common/ui/form/InputBlock";
import { Input } from "../../../../_common/ui/form/Input";
import { appConfig, QUIZZ_DIFFICULTY_LEVEL, TQuizzDifficultyLevel } from "../../../../_config/config";
import { Editor } from "@tinymce/tinymce-react";
import { Select } from "../../../../_common/ui/form/Select";
import { InputQuestion } from "./InputQuestion";

type Props = {
  data?: TQuizzMdl
};

export function QuizzForm(props: Props) {

  const [questions, setQuestions] = useState<Object[]>([]);
  const form = useForm<TQuizzMdl>({
    defaultValues: {
      ...props.data
    }
  });
  const {
    field: { onChange, ...field }
  } = useController({ control: form.control, name: "description" });
  return (
    <FormProvider {...form}>
      <form className={"flex flex-col gap-8 w-full"}>
        <InputBlock label={"Nom du quizz"}>
          <Controller name={"name"} render={({ field }) => {
            return <Input {...field} type={"text"} full />;
          }
          } />
        </InputBlock>
        <InputBlock label={"Description (courte description, sujets abordés dans le quizz...)"}>
          <Controller name={"description"} render={({ field }) => {
            return (
              <Editor
                {...field}
                onEditorChange={onChange}
                apiKey={appConfig.tinymceKey}
                init={{
                  height: 290,
                  menubar: false
                }}
              />
            );
          }
          } />
        </InputBlock>
        <InputBlock label={"Temps limite (en minute)"}>
          <Controller name={"duration"} render={({ field }) => {
            return <Input {...field} type={"number"} full min={0} max={100} />;
          }
          } />
        </InputBlock>
        <InputBlock label={"Difficultée"}>
          <Controller name={"difficulty"} render={({ field }) => {
            return <Select
              {...field}
              options={(Object.values(QUIZZ_DIFFICULTY_LEVEL) as Array<TQuizzDifficultyLevel>).map((difficulty) => {
                return {
                  value: difficulty, label: difficulty
                };
              })} />;
          }
          } />
        </InputBlock>
        <InputBlock label={"Questions"}>
          {
            questions.map((o, index) => {
              return <InputQuestion key={index} />;
            })
          }
          <p className={"underline hover:cursor-pointer hover:text-primary"}
             onClick={() => setQuestions([...questions, {}])}>Ajouter une question</p>
        </InputBlock>
      </form>
    </FormProvider>
  );
}
