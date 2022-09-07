import { GAME_ENVIRONMENT, GAME_STATE } from "../_stores/GameStore";

export interface IGameFunctions {
    updateGameSize: (gameWidth: number, gameHeight: number) => void;
    start: (ctx: CanvasRenderingContext2D) => void;
    draw: () => void;
    update: () => void;
    setEnvironment: (environment: GAME_ENVIRONMENT) => void;
    setGameState: (gameState: GAME_STATE) => void;
}
