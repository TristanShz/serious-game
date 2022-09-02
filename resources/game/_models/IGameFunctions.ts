export interface IGameFunctions {
  updateGameSize: (gameWidth: number, gameHeight: number) => void;
  start: (ctx: CanvasRenderingContext2D) => void;
  draw: () => void;
  update: () => void;
}
