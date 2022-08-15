import React from "react";
import { useForm, FormProvider, Controller } from "react-hook-form";
import { TFormationMdl } from "../_models/FormationMdl";
import { InputBlock } from "../../../_common/ui/form/InputBlock";
import { Input } from "../../../_common/ui/form/Input";
import { Button } from "../../../_common/ui/Button";
import { formationsAdminStore } from "../../admin/formations/_stores/formationsAdminStores";
import { useModalStore } from "../../modal/_stores/ModalContext";
import { useRouter } from "next/router";
import { urlsAdmin } from "../../../_common/routes/routes";

type Props = {
    data?: any;
};

export function FormationsForm(props: Props) {
    const { push } = useRouter();
    const modalStore = useModalStore();
    const form = useForm<TFormationMdl>({
        defaultValues: {
            ...props.data,
        },
    });
    const onSubmit = (data: any) => {
        if (!props.data) {
            formationsAdminStore.create(data).then((response) => {
                console.log(response);
            });
        } else {
            formationsAdminStore.update(data).then((response) => {
                push(`${urlsAdmin().formations}`);
                //TODO: Voir si les données se mettent bien a jours aprés update
            });
            modalStore.close();
        }
    };
    return (
        <div className={"flex items-center justify-center w-full"}>
            <FormProvider {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className={"w-1/2"}>
                    <div className={"flex flex-col gap-10"}>
                        <InputBlock label={"Titre"}>
                            <Controller
                                name={"title"}
                                render={({ field }) => (
                                    <Input full {...field} type={"text"} error={form.formState.errors.title} />
                                )}
                            />
                        </InputBlock>
                        <InputBlock label={"Catégorie"}>
                            <Controller
                                name={"category"}
                                render={({ field }) => <Input full {...field} type={"text"} />}
                            />
                        </InputBlock>
                        <InputBlock label={"Région Support"}>
                            <Controller
                                name={"regionSupport"}
                                render={({ field }) => (
                                    <Input {...field} type={"checkbox"} error={form.formState.errors.regionSupport} />
                                )}
                            />
                        </InputBlock>
                        <InputBlock label={"Alias"}>
                            <Controller
                                name={"alias"}
                                render={({ field }) => (
                                    <Input full {...field} type={"text"} error={form.formState.errors.alias} />
                                )}
                            />
                        </InputBlock>
                        <InputBlock label={"Description"}>
                            <Controller
                                name={"description"}
                                render={({ field }) => (
                                    <Input full {...field} type={"text"} error={form.formState.errors.description} />
                                )}
                            />
                        </InputBlock>
                        <InputBlock label={"Level"}>
                            <Controller
                                name={"entryLevel"}
                                render={({ field }) => <Input full {...field} type={"number"} />}
                            />
                        </InputBlock>
                        <div className={"flex gap-3 items-center justify-center"}>
                            <Button content={"Valider"} type={"submit"} color={"gradient"} />
                            <Button
                                content={"Retour"}
                                type={"button"}
                                color={"white"}
                                onClick={() => {
                                    push(urlsAdmin().formations);
                                }}
                            />
                        </div>
                    </div>
                </form>
            </FormProvider>
        </div>
    );
}
