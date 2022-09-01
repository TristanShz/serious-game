import { Controller, FormProvider, useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { TCategoryMdl } from "../_model/CategoryMdl";
import { categoryAdminStore } from "../../../admin/category/_stores/categoryAdminStore";
import { urlsAdmin } from "../../../../_common/routes/routes";
import { InputBlock } from "../../../../_common/ui/form/InputBlock";
import { Input } from "../../../../_common/ui/form/Input";
import { Button } from "../../../../_common/ui/Button";
import { useMobxStores } from "../../../../_common/_stores/Stores";

type Props = {
  data?: any;
};

export function CategoryForm(props: Props) {
  const { push } = useRouter();
  const { modalStore } = useMobxStores();
  const form = useForm<TCategoryMdl>({
    defaultValues: {
      ...props.data
    }
  });
  const onSubmit = (data: any) => {
    if (!props.data) {
      categoryAdminStore.create(data).then((response) => {
        console.log(response);
      });
    } else {
      categoryAdminStore.update(data).then((response) => {
        push(`${urlsAdmin().category}`);
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
            <InputBlock label={"Titre du block"}>
              <Controller
                name={"blockTitle"}
                render={({ field }) => (
                  <Input full {...field} type={"text"} error={form.formState.errors.blockTitle} />
                )}
              />
            </InputBlock>
            <InputBlock label={"Titre de la page"}>
              <Controller
                name={"pageTitle"}
                render={({ field }) => (
                  <Input full {...field} type={"text"} error={form.formState.errors.pageTitle} />
                )}
              />
            </InputBlock>
            <InputBlock label={"Alias"}>
              <Controller
                name={"urlAlias"}
                render={({ field }) => (
                  <Input full {...field} type={"text"} error={form.formState.errors.urlAlias} />
                )}
              />
            </InputBlock>
            <InputBlock label={"Déscription du block"}>
              <Controller
                name={"blockDescription"}
                render={({ field }) => (
                  <Input
                    full
                    {...field}
                    type={"text"}
                    error={form.formState.errors.blockDescription}
                  />
                )}
              />
            </InputBlock>
            <InputBlock label={"Image url"}>
              <Controller
                name={"imageUrl"}
                render={({ field }) => (
                  <Input full {...field} type={"text"} error={form.formState.errors.imageUrl} />
                )}
              />
            </InputBlock>
            <InputBlock label={"Description Page"}>
              <Controller
                name={"pageDescription"}
                render={({ field }) => (
                  <Input
                    full
                    {...field}
                    type={"text"}
                    error={form.formState.errors.pageDescription}
                  />
                )}
              />
            </InputBlock>
            <div className={"flex gap-3 items-center justify-center"}>
              <Button content={"Valider"} type={"submit"} color={"gradient"} />
              <Button
                content={"Retour"}
                type={"button"}
                color={"white"}
                onClick={() => {
                  push(urlsAdmin().category);
                }}
              />
            </div>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
