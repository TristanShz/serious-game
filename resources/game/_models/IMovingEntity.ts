import { IEntity } from "./IEntity";

export interface IMovingEntity extends IEntity {
  speed: number;
  gravity: number;
  velocity: {
    x: number;
    y: number;
  };
}
