import { MutableRefObject, PropsWithChildren, useEffect, useRef } from "react";
import { loadImages } from "./utils/loadImages";
import { useGameStore } from "./_stores/GameContext";
import { images } from "./utils/images";
import { GAME_STATE, GameStore } from "./_stores/GameStore";
import ReturnButton from "./components/ReturnButton";
import { observer } from "mobx-react-lite";

const GameLoop = observer((props: PropsWithChildren) => {
    const canvasRef: MutableRefObject<HTMLCanvasElement | null> = useRef(null);

    const GAME_WIDTH = window.innerWidth;
    const GAME_HEIGHT = window.innerHeight;

    const gameStore = useGameStore();

    useEffect(() => {
        const timer = setInterval(() => {
            if (gameStore.gameState === GAME_STATE.LIVE) {
                gameStore.setTimer(gameStore.timer - 1);
            }
        }, 1000);
        const canvas = canvasRef.current;
        if (canvas) {
            const ctx: CanvasRenderingContext2D | null = canvas.getContext("2d");
            if (ctx) {
                GameStore.ctx = ctx;
                gameStore.start();
                let fpsLimit = 20;
                let now: number;
                let then = Date.now();
                let interval = 1000 / fpsLimit;
                let delta: number;

                const gameLoop = () => {
                    requestAnimationFrame(gameLoop);
                    now = Date.now();
                    delta = now - then;
                    if (GameStore.gameWidth !== window.innerWidth || GameStore.gameHeight !== window.innerHeight) {
                        gameStore.updateGameSize(window.innerWidth, window.innerHeight);
                        canvas.width = GameStore.gameWidth;
                        canvas.height = GameStore.gameHeight;
                    }
                    ctx.clearRect(0, 0, GameStore.gameWidth, GameStore.gameHeight);
                    gameStore.draw();
                    gameStore.update();
                    if (delta > interval && gameStore.player) {
                        gameStore.player.frame++;
                        then = now - (delta % interval);
                    }
                };

                loadImages(Object.values(images), gameLoop);
            }
        }
        return () => clearInterval(timer);
    }, []);

    return (
        <>
            <canvas ref={canvasRef} width={GAME_WIDTH} height={GAME_HEIGHT} className={"absolute z-0"} />
            <ReturnButton />
            {props.children}
        </>
    );
});

GameLoop.displayName = "GameLoop";
export default GameLoop;
