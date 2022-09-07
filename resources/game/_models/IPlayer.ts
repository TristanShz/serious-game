import { IMovingEntity } from "./IMovingEntity";

export interface IPlayer extends IMovingEntity {
    isInJump: boolean;
    frame: number;
    direction: "left" | "right";
    moveLeft: () => void;
    moveRight: () => void;
    jump: () => void;
    stop: () => void;
    draw: () => void;
    update: () => void;
    die: () => void;
}
