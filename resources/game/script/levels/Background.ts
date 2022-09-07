import { GAME_ENVIRONMENT, GameStore } from "../../_stores/GameStore";

export class Background {
    position: {
        x: number;
        y: number;
    };
    img: HTMLImageElement = new Image();

    constructor() {
        this.position = {
            x: 0,
            y: 0,
        };
    }

    draw() {
        if (GameStore.environment === GAME_ENVIRONMENT.NORMAL) {
            this.img.src = "/gameAssets/environment/background.png";
        }
        if (GameStore.environment === GAME_ENVIRONMENT.HELL) {
            this.img.src = "/gameAssets/hell/environment/background.png";
        }
        GameStore.ctx.drawImage(this.img, this.position.x, this.position.y, GameStore.gameWidth, GameStore.gameHeight);
    }
}
