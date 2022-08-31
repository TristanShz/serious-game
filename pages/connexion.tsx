import { ReactElement, useState } from "react";
import RegularLayout from "../resources/layouts/RegularLayout";
import { observer } from "mobx-react-lite";
import { InputBlock } from "../_common/ui/form/InputBlock";
import { Controller, useForm } from "react-hook-form";
import { Input } from "../_common/ui/form/Input";
import { errorsMessages } from "../_common/errors/errorsMessages";
import { Button } from "../_common/ui/Button";
import Link from "next/link";
import { TCredentials } from "../resources/auth/_models/AuthMdl";
import useUser from "../lib/users/_helpers/useUser";
import { authStore } from "../resources/auth/_stores/AuthStore";
import { ERRORS_MESSAGES, TErrorsMessages } from "../_common/_utils/errorsUtils";
import { AxiosError } from "axios";
import { ERRORS_KEYS } from "../_common/errors/errorBuilder";

function Connexion() {
  // here we just check if user is already logged in and redirect to profile
  const { mutateUser } = useUser({
    redirectTo: "/",
    redirectIfFound: true
  });
  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<TCredentials>();

  const [errorMessage, setErrorMessage] = useState("");

  async function onSubmit(data: TCredentials) {
    try {
      await mutateUser(await authStore.login(data));
    } catch (err) {
      console.error("ERROR WHILE CONNECTING : ", err);
      if (err instanceof AxiosError) {
        setErrorMessage(ERRORS_MESSAGES[err.response?.data.error.key as TErrorsMessages]);
      } else {
        setErrorMessage(ERRORS_MESSAGES[ERRORS_KEYS.global.unknown as TErrorsMessages]);
      }
    }
  }

  return (
    <div className={"w-screen h-screen flex items-center justify-center"}>
      <div className={"flex flex-col gap-12 mx-6 sm:mx-0 w-full sm:w-1/2 md:w-1/3 lg:w-1/4"}>
        <p className={"text-center font-bold text-2xl"}>Se connecter</p>
        <form className={"flex flex-col gap-6"} onSubmit={handleSubmit(onSubmit)}>
          <InputBlock label={"Email"}>
            <Controller
              render={({ field }) => {
                return <Input {...field} type={"text"} error={errors.email} full />;
              }}
              name={"email"}
              rules={{
                required: { value: true, message: errorsMessages.form.required }
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
                required: { value: true, message: errorsMessages.form.required }
              }}
              control={control}
            />
          </InputBlock>
          <Button content={"Se connecter"} full color={"gradient"} type={"submit"} />
          <p className={"text-input-error font-medium"}>{errorMessage}</p>

          <Link href={"/"}>
            <a className={"hover:underline text-center"}>Retour à l’accueil</a>
          </Link>
        </form>
      </div>
    </div>
  );
}

Connexion.getLayout = function getLayout(page: ReactElement) {
  return <RegularLayout headerProps={{ loginHeader: true }}>{page}</RegularLayout>;
};

export default observer(Connexion);
