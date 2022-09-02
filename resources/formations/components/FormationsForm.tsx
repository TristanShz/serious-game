import { useEffect, useState } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { TFormationBaseMdl, TFormationMdl } from "../_models/FormationMdl";
import { InputBlock } from "../../../_common/ui/form/InputBlock";
import { Input } from "../../../_common/ui/form/Input";
import { Button } from "../../../_common/ui/Button";
import { formationsAdminStore } from "../../admin/formations/_stores/formationsAdminStores";
import { useRouter } from "next/router";
import { urlsAdmin } from "../../../_common/routes/routes";
import { TCategoryMdl } from "../categories/_model/CategoryMdl";
import { categoriesStore } from "../categories/_stores/categoriesStore";
import { Select } from "../../../_common/ui/form/Select";
import { slugify } from "../../../_common/_utils/alphaNumUtils";
import { useMobxStores } from "../../../_common/_stores/Stores";
import { TQuizzBaseMdl } from "../../quizz/_models/QuizzMdl";
import { quizzAdminStore } from "../../admin/quizz/_stores/quizzAdminStore";

type Props = {
  data?: any;
};

export function FormationsForm(props: Props) {
  const { push } = useRouter();
  const { modalStore } = useMobxStores();
  const form = useForm<TFormationBaseMdl>({
    defaultValues: {
      ...props.data
    }
  });
  // @ts-ignore
  const quizzSelected = form.watch("quizz") ?? [];
  const [categories, setCategories] = useState<TCategoryMdl[] | undefined>(undefined);
  const [quizzList, setQuizzList] = useState<TQuizzBaseMdl[] | undefined>(undefined);
  useEffect(() => {
    categoriesStore.list().then(({ items }) => {
      setCategories(items);
    });
    quizzAdminStore.list().then(({ items }) => {
      setQuizzList(items);
    });
  }, []);

  const onSubmit = (data: TFormationMdl) => {
    console.log(data);
    if (!props.data) {
      formationsAdminStore.create({ ...data, alias: slugify(data.title) }).then((response) => {
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
              {
                <Controller
                  name={"category"}
                  render={({ field }) => {
                    if (categories) {
                      return <Select {...field} options={categories.map(category => {
                        return {
                          value: category._id,
                          label: category.blockTitle
                        };
                      })} />;
                    } else return <p>Veuillez ajouter au moins une catégorie</p>;
                  }
                  }
                />
              }
            </InputBlock>
            <InputBlock label={"Région Support"}>
              <Controller
                name={"regionSupport"}
                render={({ field }) => (
                  <Input {...field} type={"checkbox"} error={form.formState.errors.regionSupport} />
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
            <div className={"flex gap-4"}>
              <div className={"flex-1 flex flex-col items-center"}>
                <p className={"font-medium text-lg"}>Quizz selectionnés</p>
                <div className={"pt-4 flex flex-col gap-2"}>
                  {
                    quizzSelected.map(quizzId => {
                      return <div key={quizzId}
                                  className={"underline text-input-correct hover:cursor-pointer active:scale-98"}
                                  onClick={() => {
                                    form.setValue("quizz", quizzSelected.filter(id => id !== quizzId));
                                    if (!quizzSelected.length) form.setValue("quizz", undefined);
                                  }
                                  }
                      >{quizzList?.find(quizz => quizz._id === quizzId)?.name}</div>;
                    })
                  }
                </div>
              </div>
              <div className={"w-0.5 bg-neutral"} />
              <div className={"flex-1 flex flex-col items-center"}>
                <p className={"font-medium text-lg"}>Quizz disponibles</p>
                <div className={"pt-4 flex flex-col gap-2"}>
                  {
                    quizzList?.filter(quizz => !quizzSelected.includes(quizz._id)).map(quizz => {
                      return <div className={"underline text-input-error hover:cursor-pointer active:scale-98"}
                                  key={quizz._id} onClick={() => {
                        console.log(typeof quizz._id);
                        form.setValue("quizz", [...quizzSelected, quizz._id]);
                      }
                      }>{quizz.name}</div>;
                    })
                  }
                </div>
              </div>
            </div>
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
