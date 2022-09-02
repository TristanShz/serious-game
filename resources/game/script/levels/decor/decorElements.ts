import { images } from "../../../utils/images";

function createImage(src: string) {
  const img = new Image();
  img.src = src;
  return img;
}

export type TDecor = {
  image: HTMLImageElement;
  width: number;
  height: number;
};
export type TDecorElements = {
  decor02: TDecor;
  decor03: TDecor;
  decor04: TDecor;
  maison01: TDecor;
  maison03: TDecor;
};
export const decorElements: TDecorElements = {
  decor02: {
    image: createImage(images.decor02),
    width: 7,
    height: 5
  },
  decor03: {
    image: createImage(images.decor03),
    width: 8,
    height: 3
  },
  decor04: {
    image: createImage(images.decor04),
    width: 8,
    height: 5
  },
  maison01: {
    image: createImage(images.maison01),
    width: 8,
    height: 5
  },
  maison03: {
    image: createImage(images.maison02),
    width: 10,
    height: 9
  }
};
