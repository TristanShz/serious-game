import { ReactElement, useState } from "react";
import RegularLayout from "../resources/layouts/RegularLayout";
import { observer } from "mobx-react-lite";
import clsx from "clsx";
import { TSessionData, withSessionSsr } from "../lib/withSession";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { InputBlock } from "../_common/ui/form/InputBlock";
import { Button } from "../_common/ui/Button";
import { userStore } from "../resources/users/_stores/UserStore";
import { TUserBase } from "../resources/users/_models/UserMdl";

type Props = {
    user: TSessionData;
};

function MonCompte(props: Props) {
    const [onResult, setOnResult] = useState(false);
    const [message, setMessage] = useState("");
    const form = useForm<TUserBase>({
        defaultValues: {
            _id: props.user._id,
            firstName: props.user.firstName,
            lastName: props.user.lastName,
            email: props.user.email,
        },
    });

    const onSubmit = (user: TUserBase) => {
        userStore.update(user).then((_data) => {
            setMessage("Informations modifiée !");
        });

        setTimeout(() => {
            setMessage("");
        }, 3000);
    };

    return (
        <div className="pt-[136px] flex flex-col gap-y-10  max-w-4xl mx-auto">
            <h1 className="text-xl font-semibold">Mon compte</h1>

            <div className="mt-10">
                <span
                    className={clsx("inline mr-16 p-2 cursor-pointer ", onResult ? "" : "font-semibold")}
                    onClick={() => setOnResult(false)}
                >
                    Mes informations
                </span>
                <span
                    className={clsx("inline cursor-pointer hover:font-semibold", onResult ? "font-semibold" : "")}
                    onClick={() => setOnResult(true)}
                >
                    Mes résultats
                </span>
                <hr className="w-full border-1 border-gray-400" />
            </div>

            {onResult ? (
                <>
                    <div>Développeur Full Stack - Formation Grand Est</div>
                    <table className="table-fixed bg-white rounded-lg border-gray-400 shadow-xl ">
                        <thead className="border">
                            <tr className="border">
                                <th>Nom du Quizz</th>
                                <th>Status</th>
                                <th>Résultat</th>
                            </tr>
                        </thead>
                        <tbody className="border">
                            <tr className="border">
                                <td>POO Quizz niveau débutant</td>
                                <td>Effectué</td>
                                <td>18/37</td>
                            </tr>
                        </tbody>
                    </table>
                </>
            ) : (
                <FormProvider {...form}>
                    <form className="space-y-6 p-2 font-semibold" onSubmit={form.handleSubmit(onSubmit)}>
                        <InputBlock label="Nom :">
                            <Controller
                                name="lastName"
                                render={({ field }) => {
                                    return (
                                        <input
                                            {...field}
                                            className="w-full h-7 rounded-md bg-white disabled:text-gray-500"
                                            type="text"
                                        />
                                    );
                                }}
                            />
                        </InputBlock>
                        <InputBlock label="Prénom :">
                            <Controller
                                name="firstName"
                                render={({ field }) => {
                                    return (
                                        <input
                                            {...field}
                                            className="w-full h-7 rounded-md bg-white disabled:text-gray-500"
                                            type="text"
                                        />
                                    );
                                }}
                            />
                        </InputBlock>
                        <InputBlock label="Email :">
                            <Controller
                                name="email"
                                render={({ field }) => {
                                    return (
                                        <input
                                            {...field}
                                            className="w-full h-7 rounded-md bg-white disabled:text-gray-500"
                                            type="text"
                                        />
                                    );
                                }}
                            />
                        </InputBlock>
                        <InputBlock label="Mot de passe :">
                            <input
                                className="w-full h-7 rounded-md bg-white disabled:text-gray-500"
                                type="text"
                                value="********"
                                disabled={true}
                            />
                        </InputBlock>
                        <Button content="Modifier" color="gradient" type="submit" />
                        {message.length > 0 && <div className={"text-green-600 text-center"}>{message}</div>}
                    </form>
                </FormProvider>
            )}
        </div>
    );
}

MonCompte.getLayout = function getLayout(page: ReactElement) {
    return <RegularLayout headerProps={{ full: true }}>{page}</RegularLayout>;
};

export const getServerSideProps = withSessionSsr(async function ({ req, res }) {
    const user = req.session.user;

    if (user === undefined) {
        res.setHeader("location", "/login");
        res.statusCode = 302;
        res.end();
        return {
            props: {
                user: {} as TSessionData,
            },
        };
    }

    return {
        props: { user: req.session.user },
    };
});

export default observer(MonCompte);
