import React from "react";
import { useFormContext } from "react-hook-form";
import { Input } from "../../../../_common/ui/form/Input";

type Props = {};

export function InputQuestion(props: Props) {
  const form = useFormContext();
  const questions = form.watch("questions");
  console.log("QUESTIONS :::", questions);
  return (
    <div className={"flex flex-col gap-4"}>
      <Input type={"text"} full />
      <div className={"flex flex-col ml-4 gap-4"}>
        <div className={"flex gap-8 items-center"}>
          <label className={"whitespace-nowrap"}>Réponse A :</label>
          <Input type={"text"} full />
          <input type={"radio"} name={"isTrue"} value={"true"} />
          <input type={"radio"} name={"isTrue"} value={"false"} />
        </div>
        <div className={"flex gap-8 items-center"}>
          <label className={"whitespace-nowrap"}>Réponse B :</label>
          <Input type={"text"} full />
          <input type={"radio"} name={"isTrue"} value={"true"} />
          <input type={"radio"} name={"isTrue"} value={"false"} />
        </div>
        <div className={"flex gap-8 items-center"}>
          <label className={"whitespace-nowrap"}>Réponse C :</label>
          <Input type={"text"} full />
          <input type={"radio"} name={"isTrue"} value={"true"} />
          <input type={"radio"} name={"isTrue"} value={"false"} />
        </div>
        <div className={"flex gap-8 items-center"}>
          <label className={"whitespace-nowrap"}>Réponse D :</label>
          <Input type={"text"} full />
          <input type={"radio"} name={"isTrue"} value={"true"} />
          <input type={"radio"} name={"isTrue"} value={"false"} />
        </div>
      </div>
    </div>
  );
}
