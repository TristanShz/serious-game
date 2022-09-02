import { GroundSection } from "./ground/groundSection";
import { groundElements } from "./ground/groundElements";
import { Decor } from "./decor/Decor";
import { decorElements } from "./decor/decorElements";
import { IDecor } from "../../_models/IDecor";
import { IGroundSection } from "../../_models/IGroundSection";
import { ILevelGeneration } from "../../_models/ILevelGeneration";

export class LevelGeneration implements ILevelGeneration {
  levelType: "normal" | "hell";
  ground: IGroundSection[];
  decor: IDecor[];

  constructor(levelType: "normal" | "hell" = "normal") {

    this.levelType = levelType;
    this.ground = [
      new GroundSection(
        groundElements.road,
        6,
        null,
        groundElements.endRoadRight
      ),
      new GroundSection(
        groundElements.road,
        7,
        groundElements.endRoadLeft,
        null
      )
    ];
    this.decor = [new Decor(decorElements.decor02, "left")];
  }
}
