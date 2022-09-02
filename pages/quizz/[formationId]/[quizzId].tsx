import dynamic from "next/dynamic";
import { GamePanel } from "../../../resources/game/components/GamePanel";
import { observer } from "mobx-react-lite";

const NoSsrGameLoop = dynamic(() => import("../../../resources/game/GameLoop"), {
  loading: () => <p>Chargement...</p>,
  ssr: false
});
const NoSsrQuestion = dynamic(() => import("../../../resources/game/components/Question"), {
  loading: () => <p>Chargement...</p>,
  ssr: false
});


const QuizzPage = observer(() => {
  return (
    <NoSsrGameLoop>
      <GamePanel>
        <div>
          Ouais
        </div>
      </GamePanel>
    </NoSsrGameLoop>
  );
});

export default QuizzPage;

