import { GroundSection } from "./ground/groundSection";
import { groundElements } from "./ground/groundElements";
import { Decor } from "./decor/Decor";
import { decorElements } from "./decor/decorElements";
import { IDecor } from "../../_models/IDecor";
import { IGroundSection } from "../../_models/IGroundSection";
import { ILevelGeneration } from "../../_models/ILevelGeneration";
import { GAME_ENVIRONMENT } from "../../_stores/GameStore";

export class LevelGeneration implements ILevelGeneration {
    levelType: GAME_ENVIRONMENT;
    ground: IGroundSection[];
    decor: IDecor[];

    constructor(levelType: GAME_ENVIRONMENT = GAME_ENVIRONMENT.NORMAL) {
        this.levelType = levelType;
        if (levelType === GAME_ENVIRONMENT.HELL) {
            this.ground = [
                new GroundSection(groundElements.hell.road, 6, null, groundElements.hell.endRoadRight),
                new GroundSection(groundElements.hell.road, 7, groundElements.hell.endRoadLeft, null),
            ];
            this.decor = [
                new Decor(decorElements.hell.decor02, "left"),
                new Decor(decorElements.hell.decor04, "right"),
            ];
        } else {
            this.ground = [
                new GroundSection(groundElements.road, 6, null, groundElements.endRoadRight),
                new GroundSection(groundElements.road, 7, groundElements.endRoadLeft, null),
            ];
            this.decor = [new Decor(decorElements.decor02, "left")];
        }
    }
}
