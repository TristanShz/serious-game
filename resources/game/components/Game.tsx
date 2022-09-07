import React, { PropsWithChildren } from "react";
import { GameProvider } from "../_stores/GameContext";
import { GAME_STATE, GameStore } from "../_stores/GameStore";
import { TQuizzBaseMdl } from "../../quizz/_models/QuizzMdl";
import { TSessionData } from "../../../lib/withSession";

type Props = PropsWithChildren & {
    quizz?: TQuizzBaseMdl;
    user?: TSessionData;
};

const Game = ({ quizz, user, children }: Props) => {
    const gameStore = new GameStore(quizz, user, GAME_STATE.LIVE, window.innerWidth, window.innerHeight);
    return <GameProvider store={gameStore}>{children}</GameProvider>;
};

export default Game;
