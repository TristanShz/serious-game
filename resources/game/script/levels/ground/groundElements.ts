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
  groundFlatLeftSection: createImage(images.groundFlatLeftSection)
};
