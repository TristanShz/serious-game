import { IPlayer } from "../_models/IPlayer";
import { Player } from "../script/character/player";
import { Background } from "../script/levels/Background";
import { IBackground } from "../_models/IBackground";
import { IGameProperties } from "../_models/IGameProperties";
import { LevelGeneration } from "../script/levels/LevelGeneration";
import { ILevelGeneration } from "../_models/ILevelGeneration";
import { IGameFunctions } from "../_models/IGameFunctions";
import { IGroundSection } from "../_models/IGroundSection";
import { InputHandler } from "../utils/inputHandler";
import { TQuizzBaseMdl, TResultBaseMdl } from "../../quizz/_models/QuizzMdl";
import { makeAutoObservable } from "mobx";

export enum GAME_STATE {
    START = 0,
    LIVE = 1,
    END = 2,
}

export class GameStore implements IGameFunctions, IGameProperties {
    static gameWidth: number;
    static gameHeight: number;
    static tileSize: number;
    static ctx: CanvasRenderingContext2D;

    ground: IGroundSection[] | undefined = undefined;
    player: IPlayer | undefined = undefined;
    background: IBackground | undefined = undefined;
    level: ILevelGeneration | undefined = undefined;

    quizz: TQuizzBaseMdl;
    gameState: GAME_STATE;
    currentQuestion: number;
    result: TResultBaseMdl;
    timer: number;

    constructor(quizz: TQuizzBaseMdl, gameWidth: number, gameHeight: number) {
        makeAutoObservable(this);
        this.quizz = quizz;
        this.timer = this.quizz.duration * 60;
        this.result = {
            user: "",
            quizz: this.quizz._id,
            responses: [],
            rates: [],
        };
        this.updateGameSize(gameWidth, gameHeight);
        this.currentQuestion = 1;
        this.gameState = GAME_STATE.START;
    }

    updateGameSize(gameWidth: number, gameHeight: number) {
        GameStore.gameWidth = gameWidth;
        GameStore.gameHeight = gameHeight;
        GameStore.tileSize = gameWidth / 17;
    }

    start() {
        this.player = new Player(this);
        new InputHandler(this.player);
        this.background = new Background();
        this.level = new LevelGeneration();
    }

    draw() {
        this.background?.draw();
        this.level?.ground.forEach((groundElement) => groundElement.draw());
        this.level?.decor.forEach((decor) => decor.draw());
        this.player?.draw();
    }

    update() {
        this.player?.update();
    }

    setGameState(state: GAME_STATE) {
        this.gameState = state;
    }

    postResult() {}
}
