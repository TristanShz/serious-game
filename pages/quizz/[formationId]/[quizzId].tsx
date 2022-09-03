import dynamic from "next/dynamic";
import { GamePanel } from "../../../resources/game/components/GamePanel";
import { observer } from "mobx-react-lite";
import { GetServerSideProps } from "next";
import { quizzStore } from "../../../resources/quizz/_stores/QuizzStore";
import { TQuizzBaseMdl } from "../../../resources/quizz/_models/QuizzMdl";

const NoSsrGameLoop = dynamic(() => import("../../../resources/game/GameLoop"), {
  loading: () => <p>Chargement...</p>,
  ssr: false
});
const NoSsrQuestion = dynamic(() => import("../../../resources/game/components/Question"), {
  loading: () => <p>Chargement...</p>,
  ssr: false
});

type Props = {
  quizz: TQuizzBaseMdl
}
const QuizzPage = observer(({ quizz }: Props) => {
  return (
    <NoSsrGameLoop quizz={quizz}>
      <GamePanel>
        <NoSsrQuestion />
      </GamePanel>
    </NoSsrGameLoop>
  );
});

export const getServerSideProps: GetServerSideProps = async ({ res, params }) => {
  if (params && params.quizzId && typeof params.quizzId === "string") {
    const quizz = await quizzStore.getOne(params.quizzId);
    return {
      props: {
        quizz
      }
    };
  } else {
    res.setHeader("location", "/");
    res.statusCode = 302;
    res.end();
    return {
      props: {}
    };
  }
};

export default QuizzPage;

