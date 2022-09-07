import { createContext, FC, PropsWithChildren, useContext } from "react";
import { GAME_STATE, GameStore } from "./GameStore";
import { TQuizzBaseMdl } from "../../quizz/_models/QuizzMdl";
import { TSessionData } from "../../../lib/withSession";
import { USER_ROLES_FRONT } from "../../users/_models/UserMdl";

export const emptyQuizz: TQuizzBaseMdl = {
    _id: "",
    name: "",
    description: "",
    duration: 0,
    difficulty: 0,
    questions: [
        {
            _id: "",
            text: "",
            answers: {
                a: { _id: "", text: "" },
                b: { _id: "", text: "" },
                c: { _id: "", text: "" },
                d: { _id: "", text: "" },
            },
        },
    ],
};

export const emptyUser: TSessionData = {
    _id: "",
    email: "",
    firstName: "",
    lastName: "",
    role: USER_ROLES_FRONT.USER,
    isLoggedIn: false,
};

const GameCtx = createContext(new GameStore(undefined, undefined, GAME_STATE.START, 0, 0));

const GameProvider: FC<{ store: GameStore; children: PropsWithChildren<any> }> = ({ store, children }) => {
    return <GameCtx.Provider value={store}>{children}</GameCtx.Provider>;
};

const useGameStore = () => {
    return useContext(GameCtx);
};

export { GameProvider, useGameStore };
