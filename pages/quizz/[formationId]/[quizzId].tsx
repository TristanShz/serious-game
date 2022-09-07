import dynamic from "next/dynamic";
import { observer } from "mobx-react-lite";
import { GetServerSideProps } from "next";
import { quizzStore } from "../../../resources/quizz/_stores/QuizzStore";
import { TQuizzBaseMdl } from "../../../resources/quizz/_models/QuizzMdl";
import useUser from "../../../lib/users/_helpers/useUser";
import Head from "next/head";

const GameLoop = dynamic(() => import("../../../resources/game/GameLoop"), {
    loading: () => <p>Chargement...</p>,
    ssr: false,
});
const Question = dynamic(() => import("../../../resources/game/components/Question"), {
    loading: () => <p>Chargement...</p>,
    ssr: false,
});

const GamePanel = dynamic(() => import("../../../resources/game/components/GamePanel"), {
    ssr: false,
});

const GameProvider = dynamic(() => import("../../../resources/game/components/Game"), {
    ssr: false,
});

type Props = {
    quizz: TQuizzBaseMdl;
};
const QuizzPage = observer(({ quizz }: Props) => {
    const { user } = useUser({
        redirectTo: "/connexion",
        redirectIfFound: false,
    });

    return (
        <>
            <Head>
                <title>{quizz.name}</title>
            </Head>
            <GameProvider quizz={quizz} user={user?.data}>
                <GameLoop>
                    <GamePanel>
                        <Question />
                    </GamePanel>
                </GameLoop>
            </GameProvider>
        </>
    );
});

export const getServerSideProps: GetServerSideProps = async ({ res, params }) => {
    if (params && params.quizzId && typeof params.quizzId === "string") {
        const quizz = await quizzStore.getOne(params.quizzId);
        return {
            props: {
                quizz,
            },
        };
    } else {
        res.setHeader("location", "/");
        res.statusCode = 302;
        res.end();
        return {
            props: {},
        };
    }
};

export default QuizzPage;
