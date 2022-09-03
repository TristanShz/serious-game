import { MutableRefObject, PropsWithChildren, useEffect, useRef } from "react";
import { loadImages } from "./utils/loadImages";
import { emptyQuizz, GameProvider } from "./_stores/GameContext";
import { images } from "./utils/images";
import { GAME_STATE, GameStore } from "./_stores/GameStore";
import { TQuizzBaseMdl } from "../quizz/_models/QuizzMdl";
import ReturnButton from "./components/ReturnButton";


const GameLoop = (props: PropsWithChildren<{ quizz?: TQuizzBaseMdl }>) => {

  const canvasRef: MutableRefObject<HTMLCanvasElement | null> = useRef(null);
  const GAME_WIDTH = window.innerWidth;
  const GAME_HEIGHT = window.innerHeight;
  const gameStore = new GameStore(props.quizz ?? emptyQuizz, GAME_WIDTH, GAME_HEIGHT);
  if (props.quizz) gameStore.setGameState(GAME_STATE.LIVE);
  
  useEffect(() => {
    const timer = setInterval(() => {
      if (gameStore.gameState === GAME_STATE.LIVE) {
        gameStore.timer--;
      }
    }, 1000);
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx: CanvasRenderingContext2D | null = canvas.getContext("2d");
      if (ctx) {
        GameStore.ctx = ctx;
        gameStore.start();
        let secondsPassed: number;
        let oldTimeStamp: number;
        let fps: number;
        let fpsLimit = 20;
        let now: number;
        let then = Date.now();
        let interval = 1000 / fpsLimit;
        let delta: number;

        const gameLoop = (timeStamp: number) => {
          requestAnimationFrame(gameLoop);
          now = Date.now();
          delta = now - then;
          if (
            GameStore.gameWidth !== window.innerWidth ||
            GameStore.gameHeight !== window.innerHeight
          ) {
            gameStore.updateGameSize(window.innerWidth, window.innerHeight);
            canvas.width = GameStore.gameWidth;
            canvas.height = GameStore.gameHeight;
          }
          ctx.clearRect(0, 0, GameStore.gameWidth, GameStore.gameHeight);
          gameStore.draw();
          gameStore.update();

          // // Calculate the number of seconds passed since the last frame
          // secondsPassed = (timeStamp - oldTimeStamp) / 1000;
          // oldTimeStamp = timeStamp;
          //
          // // Calculate fps
          // fps = Math.round(1 / secondsPassed);
          //
          // // Draw number to the screen
          // ctx.fillStyle = "white";
          // ctx.fillRect(0, 0, 150, 50);
          // ctx.font = "25px Arial";
          // ctx.fillStyle = "black";
          // ctx.fillText("FPS: " + fps, 10, 30);

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
    <GameProvider store={gameStore}>
      <canvas ref={canvasRef} width={GAME_WIDTH} height={GAME_HEIGHT} className={"absolute z-0"}></canvas>
      <ReturnButton />
      {props.children && props.children}
    </GameProvider>
  );
};

export default GameLoop;
