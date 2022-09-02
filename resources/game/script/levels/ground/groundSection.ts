import { IGroundSection } from "../../../_models/IGroundSection";
import { GameStore } from "../../../_stores/GameStore";

export class GroundSection implements IGroundSection {
  position: {
    x: number;
    y: number;
  };
  width: number;
  height: number = 0;

  private readonly groundElement: HTMLImageElement;
  private readonly numberOfElement: number;
  private readonly startWith?: HTMLImageElement;
  private readonly endWith?: HTMLImageElement;

  constructor(
    groundElement: HTMLImageElement,
    numberOfElement: number,
    startWith?: HTMLImageElement | null,
    endWith?: HTMLImageElement | null
  ) {
    this.groundElement = groundElement;
    this.numberOfElement = numberOfElement;
    this.width = GameStore.tileSize * this.numberOfElement;
    if (startWith) {
      this.startWith = startWith;
      this.width += GameStore.tileSize;
    }

    if (endWith) {
      this.endWith = endWith;
      this.width += GameStore.tileSize;
    }

    this.position = {
      x: this.startWith ? GameStore.gameWidth - this.width : 0,
      y: GameStore.gameHeight - GameStore.tileSize
    };
  }

  draw() {
    for (let i = 0; i < this.numberOfElement; i++) {
      if (this.startWith) {
        GameStore.ctx.drawImage(
          this.groundElement,
          GameStore.gameWidth - GameStore.tileSize * i,
          this.position.y,
          GameStore.tileSize,
          GameStore.tileSize
        );
      }
      if (this.endWith) {
        GameStore.ctx.drawImage(
          this.groundElement,
          GameStore.tileSize * i,
          this.position.y,
          GameStore.tileSize,
          GameStore.tileSize
        );
      }
    }
    if (this.startWith) {
      GameStore.ctx.drawImage(
        this.startWith,
        GameStore.gameWidth - GameStore.tileSize * this.numberOfElement,
        this.position.y,
        GameStore.tileSize,
        GameStore.tileSize
      );
    }
    if (this.endWith) {
      GameStore.ctx.drawImage(
        this.endWith,
        GameStore.tileSize * this.numberOfElement,
        this.position.y,
        GameStore.tileSize,
        GameStore.tileSize
      );
    }
  }
}
