import { images } from "../../utils/images";

export type TSprite = {
  src: string;
  cropSize: number;
  spriteLength: number;
  spriteWidth: number;
  spriteHeight: number;
};

type TSpriteList = {
  idle: TSprite;
  walk: TSprite;
  jumpStart: TSprite;
  jumpLoop: TSprite;
};

export const spriteList: TSpriteList = {
  idle: {
    src: images.characterIdle,
    cropSize: 270,
    spriteLength: 24,
    spriteWidth: 270,
    spriteHeight: 275
  },
  walk: {
    src: images.characterWalking,
    cropSize: 320,
    spriteLength: 18,
    spriteWidth: 320,
    spriteHeight: 275
  },
  jumpStart: {
    src: images.characterJumpStart,
    cropSize: 330,
    spriteLength: 6,
    spriteWidth: 330,
    spriteHeight: 275
  },
  jumpLoop: {
    src: images.characterJumpLoop,
    cropSize: 330,
    spriteLength: 6,
    spriteWidth: 330,
    spriteHeight: 275
  }
};
