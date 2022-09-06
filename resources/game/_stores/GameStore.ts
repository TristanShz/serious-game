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
import { isQuestionModel, TQuizzBaseMdl, TResultBaseMdl } from "../../quizz/_models/QuizzMdl";
import { makeAutoObservable } from "mobx";
import { TSessionData } from "../../../lib/withSession";
import { emptyQuizz, emptyUser } from "./GameContext";
import { resultsStore } from "../../results/_stores/resultsStore";
import { deepEqualBetweenObjects } from "../../../_common/_utils/objectHelper";

export enum GAME_STATE {
    START,
    LIVE,
    END,
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
    currentQuestion: number;
    result: TResultBaseMdl;

    constructor(
        quizz: TQuizzBaseMdl = emptyQuizz,
        user: TSessionData = emptyUser,
        gameWidth: number,
        gameHeight: number,
    ) {
        makeAutoObservable(this);
        this.quizz = quizz;
        this._timer = this.quizz.duration * 60;
        this.result = {
            user: user._id,
            quizz: this.quizz._id,
            responses: [],
        };
        this.updateGameSize(gameWidth, gameHeight);
        this.currentQuestion = 1;
        this._gameState = GAME_STATE.START;
    }

    private _timer: number;

    get timer(): number {
        return this._timer;
    }

    set timer(value: number) {
        this._timer = value;
    }

    private _gameState: GAME_STATE;

    get gameState(): GAME_STATE {
        return this._gameState;
    }

    set gameState(value: GAME_STATE) {
        this._gameState = value;
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

    async postResult(userResponse: { a: boolean; b: boolean; c: boolean; d: boolean }) {
        const updatedResults = await resultsStore.postResult({
            ...this.result,
            responses: [
                ...this.result.responses,
                { question: this.quizz.questions[this.currentQuestion - 1]._id, userResponse },
            ],
        });
        this.result = updatedResults;
    }

    checkAnswer(index: number) {
        const questionConcerned = this.result.responses[index];
        if (isQuestionModel(questionConcerned.question)) {
            return deepEqualBetweenObjects(
                {
                    a: questionConcerned.question.answers.a.isTrue,
                    b: questionConcerned.question.answers.b.isTrue,
                    c: questionConcerned.question.answers.c.isTrue,
                    d: questionConcerned.question.answers.d.isTrue,
                },
                questionConcerned.userResponse,
            );
        }
    }
}
