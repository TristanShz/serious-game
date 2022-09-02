import { GameStore } from "../../_stores/GameStore";

export class Background {
  position: {
    x: number;
    y: number;
  };
  img: HTMLImageElement = new Image();

  constructor() {
    this.position = {
      x: 0,
      y: 0
    };
    this.img.src = "/gameAssets/environment/Background.png";
  }

  draw() {
    GameStore.ctx.drawImage(
      this.img,
      this.position.x,
      this.position.y,
      GameStore.gameWidth,
      GameStore.gameHeight
    );
  }
}
