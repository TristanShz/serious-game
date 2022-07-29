import React from "react";
import { Controller, useForm } from "react-hook-form";
import { InputBlock } from "../../../_common/ui/form/InputBlock";
import { Input } from "../../../_common/ui/form/Input";
import { TUserBase } from "../../users/_models/UserMdl";
import { Button } from "../../../_common/ui/Button";
import { errorsMessages } from "../../../_common/errors/errorsMessages";
import { authStore } from "../_stores/AuthStore";

export const registerForm = {
    defaultValues: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
    },
};

export type TUserRegister = TUserBase & {
    password: string;
};

export function RegisterForm() {
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<TUserRegister>({
        defaultValues: registerForm.defaultValues,
    });

    const onSubmit = (data: TUserRegister) => {
        authStore.signUp(data).then((res) => {
            console.log(res);
        });
    };
    return (
        <form className={"w-full flex flex-col gap-3"} onSubmit={handleSubmit(onSubmit)}>
            <InputBlock label={"Nom"}>
                <Controller
                    render={({ field }) => {
                        return <Input {...field} type={"text"} error={errors.lastName} full />;
                    }}
                    name={"lastName"}
                    rules={{
                        required: { value: true, message: errorsMessages.form.required },
                    }}
                    control={control}
                />
            </InputBlock>
            <InputBlock label={"Prénom"}>
                <Controller
                    render={({ field }) => {
                        return <Input {...field} type={"text"} error={errors.firstName} full />;
                    }}
                    name={"firstName"}
                    rules={{
                        required: { value: true, message: errorsMessages.form.required },
                    }}
                    control={control}
                />
            </InputBlock>
            <InputBlock label={"Email"}>
                <Controller
                    render={({ field }) => {
                        return <Input {...field} type={"text"} error={errors.email} full />;
                    }}
                    name={"email"}
                    rules={{
                        required: { value: true, message: errorsMessages.form.required },
                    }}
                    control={control}
                />
            </InputBlock>
            <InputBlock label={"Mot de passe"} infoText={"Doit contenir au moins 8 caractères"}>
                <Controller
                    render={({ field }) => {
                        return <Input {...field} type={"password"} error={errors.password} full />;
                    }}
                    name={"password"}
                    rules={{
                        required: { value: true, message: errorsMessages.form.required },
                        minLength: { value: 8, message: errorsMessages.form.minLength },
                    }}
                    control={control}
                />
            </InputBlock>
            <Button type={"submit"} content={"Créer un compte"} color={"gradient"} full className={"mt-3"} />
        </form>
    );
}
