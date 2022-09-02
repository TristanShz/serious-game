import { createContext, FC, PropsWithChildren, useContext } from "react";
import { GameStore } from "./GameStore";
import { TQuizzBaseMdl } from "../../quizz/_models/QuizzMdl";

const fakeQuizz: TQuizzBaseMdl = {
  _id: "",
  name: "",
  description: "",
  duration: 0,
  difficulty: 0,
  questions: [
    {
      text: "",
      answers: [{ text: "" }, { text: "" }, { text: "" }, { text: "" }]
    }
  ]
};
const GameCtx = createContext(new GameStore(fakeQuizz, 0, 0));

const GameProvider: FC<{ store: GameStore; children: PropsWithChildren<any> }> = ({
                                                                                    store, children
                                                                                  }) => {
  return <GameCtx.Provider value={store}>{children}</GameCtx.Provider>;
};

const useGameStore = () => {
  return useContext(GameCtx);
};

export { GameProvider, useGameStore };
