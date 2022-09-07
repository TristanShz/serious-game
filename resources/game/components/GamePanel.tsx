import React, { PropsWithChildren } from "react";
import { useGameStore } from "../_stores/GameContext";
import clsx from "clsx";
import { GAME_STATE } from "../_stores/GameStore";
import { observer } from "mobx-react-lite";

type Props = {
    children: PropsWithChildren<any>;
};

const GamePanel = observer((props: Props) => {
    const gameStore = useGameStore();

    return (
        <div
            className={clsx(
                "absolute z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-[65%] w-[55%] h-2/3 bg-white rounded-3xl bg-quizz-background shadow-neutral shadow-lg transition-opacity duration-1250",
                {
                    "opacity-0": gameStore.gameState === GAME_STATE.SWITCHING_LEVEL,
                    "opacity-100": gameStore.gameState !== GAME_STATE.SWITCHING_LEVEL,
                },
            )}
        >
            <div className={"relative w-full h-full rounded-3xl flex flex-col"}>{props.children}</div>
        </div>
    );
});

export default GamePanel;
