import dynamic from "next/dynamic";
import { observer } from "mobx-react-lite";
import { GetServerSideProps } from "next";
import { quizzStore } from "../../../resources/quizz/_stores/QuizzStore";
import { TQuizzWithoutQuestions } from "../../../resources/quizz/_models/QuizzMdl";
import { useState } from "react";
import { Button } from "../../../_common/ui/Button";
import clsx from "clsx";
import { pages } from "../../../_config/pages";
import { useRouter } from "next/router";
import useUser from "../../../lib/users/_helpers/useUser";
import Head from "next/head";

const GameLoop = dynamic(() => import("../../../resources/game/GameLoop"), {
    loading: () => <p>Chargement...</p>,
    ssr: false,
});
const GamePanel = dynamic(() => import("../../../resources/game/components/GamePanel"), {
    loading: () => <p>Chargement...</p>,
    ssr: false,
});

type Props = {
    quizzList: TQuizzWithoutQuestions[];
};

const QuizzStartingPage = observer(({ quizzList }: Props) => {
    const { mutateUser } = useUser({
        redirectTo: "/connexion",
        redirectIfFound: false,
    });
    const router = useRouter();
    const [quizzSelected, setQuizzSelected] = useState(0);
    const quizz = quizzList[quizzSelected];

    if (quizzList.length) {
        return (
            <>
                <Head>
                    <title>MNG : Lancement d&lsquo;un quizz</title>
                </Head>
                <GameLoop>
                    <GamePanel>
                        <div className={"flex"}>
                            {quizzList.map((quizzTab, index) => {
                                return (
                                    <div
                                        key={quizzTab._id}
                                        onClick={() => setQuizzSelected(index)}
                                        className={clsx(
                                            "px-4 py-2 hover:cursor-pointer scale-98 hover:scale-100 active:scale-98 select-none",
                                            {
                                                "font-bold": quizzSelected === index,
                                                "font-medium": quizzSelected !== index,
                                            },
                                        )}
                                    >
                                        {quizzTab.name}
                                    </div>
                                );
                            })}
                        </div>
                        <div className={"w-full h-0.3 bg-quizz-question-border"} />
                        <div className={"px-8 py-8 flex flex-col h-full justify-between"}>
                            <div className={"flex flex-col gap-8"}>
                                <label className={"text-4xl font-bold"}>{quizz.name}</label>
                                <div className={"flex justify-between text-lg"}>
                                    <label>Difficultée : {quizz.difficulty}/5</label>
                                    <label>Durée : {quizz.duration} minutes</label>
                                </div>
                                <div></div>
                            </div>
                            <div className={"self-center"}>
                                <Button
                                    content={"DEMARRER LE QUIZZ"}
                                    color={"gradient"}
                                    large
                                    link={pages.quizz.path(router.query.formationId as string, quizz._id)}
                                />
                            </div>
                        </div>
                    </GamePanel>
                </GameLoop>
            </>
        );
    } else {
        router.back();
        return null;
    }
});

export const getServerSideProps: GetServerSideProps = async ({ res, params }) => {
    if (params && params.formationId && typeof params.formationId === "string") {
        const quizzList = await quizzStore.quizzListByFormation(params.formationId);

        return {
            props: {
                quizzList: quizzList,
            },
        };
    } else {
        res.setHeader("location", "/");
        res.statusCode = 302;
        res.end();
        return {
            props: {
                quizzList: [],
            },
        };
    }
};

export default QuizzStartingPage;
