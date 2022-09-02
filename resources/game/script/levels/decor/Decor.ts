import { TDecor } from "./decorElements";
import { IDecor } from "../../../_models/IDecor";
import { GameStore } from "../../../_stores/GameStore";

export class Decor implements IDecor {
  private readonly decorElement: TDecor;
  private readonly side: "left" | "right";

  constructor(decorElement: TDecor, side: "left" | "right") {
    this.decorElement = decorElement;
    this.side = side;
  }

  draw() {
    if (this.side === "left") {
      GameStore.ctx.drawImage(
        this.decorElement.image,
        0,
        GameStore.gameHeight -
        GameStore.tileSize -
        GameStore.tileSize * this.decorElement.height,
        GameStore.tileSize * this.decorElement.width,
        GameStore.tileSize * this.decorElement.height
      );
    }
  }
}
