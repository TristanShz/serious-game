import { IPlayer } from "../_models/IPlayer";

export class InputHandler {
  constructor(player: IPlayer) {
    document.addEventListener("keydown", (event) => {
      switch (event.keyCode) {
        //LEFT key
        case 81:
          player.moveLeft();
          console.log("left");
          break;
        //RIGHT key
        case 68:
          player.moveRight();
          console.log("right");
          break;
        //ESPACE key
        case 32:
          player.jump();
          console.log("jump");
          break;
        //DOWN key
        case 40:
          break;
        //ENTER key
        case 13:
          break;
        //ESC key
        case 27:
          break;
      }
    });

    document.addEventListener("keyup", (event) => {
      switch (event.keyCode) {
        //LEFT key
        case 81:
          if (player.velocity.x < 0) player.stop();
          break;
        //RIGHT key
        case 68:
          if (player.velocity.x > 0) player.stop();
          break;
        //UP key
        case 38:
          break;
        //DOWN key
        case 40:
          break;
      }
    });
  }
}
