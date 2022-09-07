import { images } from "../../../utils/images";

function createImage(src: string) {
    const img = new Image();
    img.src = src;
    return img;
}

export type TGroundElements = {
    slopingRoadRight: HTMLImageElement;
    road: HTMLImageElement;
    slopingRoadLeft: HTMLImageElement;
    endRoadLeft: HTMLImageElement;
    beforeSlopeRight: HTMLImageElement;
    dirt: HTMLImageElement;
    beforeSlopeLeft: HTMLImageElement;
    endRoadRight: HTMLImageElement;
    cliffRight: HTMLImageElement;
    stoneRoadStart: HTMLImageElement;
    stoneRoad: HTMLImageElement;
    stoneRoadEnd: HTMLImageElement;
    cliffLeft: HTMLImageElement;
    groundFlatLeftSection: HTMLImageElement;

    hell: Omit<TGroundElements, "groundFlatLeftSection" | "hell">;
};
export const groundElements: TGroundElements = {
    slopingRoadRight: createImage(images.slopingRoadRight),
    road: createImage(images.road),
    slopingRoadLeft: createImage(images.slopingRoadLeft),
    endRoadLeft: createImage(images.endRoadLeft),
    beforeSlopeRight: createImage(images.beforeSlopeRight),
    dirt: createImage(images.dirt),
    beforeSlopeLeft: createImage(images.beforeSlopeLeft),
    endRoadRight: createImage(images.endRoadRight),
    cliffRight: createImage(images.cliffRight),
    stoneRoadStart: createImage(images.stoneRoadStart),
    stoneRoad: createImage(images.stoneRoad),
    stoneRoadEnd: createImage(images.stoneRoadEnd),
    cliffLeft: createImage(images.cliffLeft),
    groundFlatLeftSection: createImage(images.groundFlatLeftSection),

    hell: {
        slopingRoadRight: createImage(images.hell_slopingRoadRight),
        road: createImage(images.hell_road),
        slopingRoadLeft: createImage(images.hell_slopingRoadLeft),
        endRoadLeft: createImage(images.hell_endRoadLeft),
        beforeSlopeRight: createImage(images.hell_beforeSlopeRight),
        dirt: createImage(images.hell_dirt),
        beforeSlopeLeft: createImage(images.hell_beforeSlopeLeft),
        endRoadRight: createImage(images.hell_endRoadRight),
        cliffRight: createImage(images.hell_cliffRight),
        stoneRoadStart: createImage(images.hell_stoneRoadStart),
        stoneRoad: createImage(images.hell_stoneRoad),
        stoneRoadEnd: createImage(images.hell_stoneRoadEnd),
        cliffLeft: createImage(images.hell_cliffLeft),
    },
};
