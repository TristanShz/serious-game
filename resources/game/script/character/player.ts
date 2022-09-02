import { detectGroundCollision } from "../../utils/detectGroundCollision";
import { spriteList, TSprite } from "./spriteList";
import { IPlayer } from "../../_models/IPlayer";
import { IGameProperties } from "../../_models/IGameProperties";
import { GameStore } from "../../_stores/GameStore";

export class Player implements IPlayer {
  game: IGameProperties;
  width: number;
  height: number;
  position: { x: number; y: number };
  speed: number;
  gravity: number;
  velocity: {
    x: number;
    y: number;
  };
  direction: "left" | "right";
  initialPosition: {
    x: number;
    y: number;
  };
  frame: number;
  isInJump = false;
  private readonly sprite: HTMLImageElement;
  private currentSprite: TSprite;
  private jumpStart = false;

  constructor(game: IGameProperties) {
    this.game = game;
    this.speed = 4;
    this.gravity = 0.5;
    this.velocity = {
      x: 0,
      y: 0
    };
    this.direction = "right";
    this.sprite = new Image();
    this.frame = 0;
    this.currentSprite = spriteList.idle;
    this.width = this.currentSprite.spriteWidth;
    this.height = this.currentSprite.spriteHeight;
    this.initialPosition = {
      x: 0,
      y: GameStore.gameHeight - GameStore.tileSize - this.height
    };
    this.position = this.initialPosition;
  }

  moveLeft() {
    this.velocity.x = -this.speed;
    this.direction = "left";
  }

  moveRight() {
    this.velocity.x = this.speed;
    this.direction = "right";
  }

  jump() {
    this.jumpStart = true;
    this.frame = 0;
    this.currentSprite = spriteList.jumpStart;
    this.velocity.y -= 24;
  }

  stop() {
    this.velocity.x = 0;
  }

  death() {
  }

  draw() {
    this.sprite.src = this.currentSprite.src;
    GameStore.ctx.drawImage(
      this.sprite,
      this.currentSprite.cropSize * this.frame,
      0,
      this.currentSprite.spriteWidth,
      this.currentSprite.spriteHeight,
      this.position.x,
      this.position.y,
      this.currentSprite.spriteWidth,
      this.currentSprite.spriteHeight
    );
  }

  update() {
    if (this.jumpStart) {
      //Check for jumpStart animation
      if (this.frame >= this.currentSprite.spriteLength - 1) {
        this.frame = 0;
        this.jumpStart = false;
      }
    } else {
      //Reset character frame
      if (this.frame >= this.currentSprite.spriteLength - 1) this.frame = 0;
    }

    //Set jump position
    if (this.velocity.y !== 0) {
      this.isInJump = true;
    } else this.isInJump = false;

    //Horizontal movements
    this.position.x += this.velocity.x;

    //Gravity
    this.position.y += this.velocity.y;
    this.velocity.y += this.gravity;

    //Check ground collision with each ground sections
    if (this.position.x > 0 && this.position.x + this.width < GameStore.gameWidth) {
      this.game.level?.ground.forEach((groundElement) => {
        if (detectGroundCollision(this, groundElement)) {
          this.velocity.y = 0;
          this.gravity = 0.5;
        }
      });
    } else {
      this.velocity.y = 0;
      this.gravity = 0.5;
    }

    //Player is in the air : Jump position
    if (this.isInJump && !this.jumpStart)
      this.currentSprite = spriteList.jumpLoop;
    //Player is not moving : Idle position
    if (this.velocity.x === 0 && this.velocity.y === 0 && !this.isInJump)
      this.currentSprite = spriteList.idle;

    //Player is moving : Walk position
    if (this.velocity.x > 0 && this.velocity.y === 0 && !this.isInJump) {
      this.currentSprite = spriteList.walk;
    }
    if (this.position.y + this.height > GameStore.gameHeight) {
    }
  }
}
