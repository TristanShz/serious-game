import { IGroundSection } from "./IGroundSection";
import { IDecor } from "./IDecor";

export interface ILevelGeneration {
  levelType: "normal" | "hell";
  ground: IGroundSection[];
  decor: IDecor[];
}
