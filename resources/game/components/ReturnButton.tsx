import { Button } from "../../../_common/ui/Button";
import { useState } from "react";
import { useRouter } from "next/router";
import { useGameStore } from "../_stores/GameContext";
import { GAME_STATE } from "../_stores/GameStore";
import { observer } from "mobx-react-lite";

const ReturnButton = observer(() => {
    const [modalOpen, setModalOpen] = useState(false);
    const router = useRouter();
    const gameStore = useGameStore();

    return (
        <>
            {modalOpen && (
                <>
                    <div className={"absolute inset-0 z-40 bg-neutral opacity-80"} />
                    <div
                        className={
                            "px-8 py-12 flex flex-col justify-center gap-8 absolute w-1/3 z-50 bg-quizz-background top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-2xl shadow-xl"
                        }
                    >
                        <p>
                            Êtes-vous sur de vouloir quitter le test en cours ? votre progression ne sera pas
                            enregistrée et vous ne pourrez pas repasser ce test avant <strong>14 jours</strong>.
                        </p>
                        <div className={"flex justify-between"}>
                            <Button
                                content={"Oui, je veux quitter"}
                                color={"primary"}
                                secondary
                                onClick={() => router.back()}
                            />
                            <Button content={"Revenir au test"} color={"primary"} onClick={() => setModalOpen(false)} />
                        </div>
                    </div>
                </>
            )}
            <div
                className={
                    "bg-quizz-background shadow-xl absolute z-10 left-4 bg-white p-3 rounded-b-full hover:cursor-pointer"
                }
                onClick={() => {
                    if (gameStore.getGameState() === GAME_STATE.LIVE) {
                        setModalOpen(true);
                    } else {
                        router.back();
                    }
                }}
            >
                <div className={"scale-90 hover:scale-100 active:scale-90 transition-all"}>
                    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_196_198)">
                            <path
                                d="M32.3588 5.35716V15.6396H37.7176V26.3555H16.7192V20.3505L0 31.4967L16.7193 42.6428V36.6378H48V5.35712H32.3588V5.35716Z"
                                fill="#BA8B5B"
                            />
                        </g>
                        <defs>
                            <clipPath id="clip0_196_198">
                                <rect width="48" height="48" fill="white" />
                            </clipPath>
                        </defs>
                    </svg>
                </div>
            </div>
        </>
    );
});

export default ReturnButton;
