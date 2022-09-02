export interface IBackground {
  position: {
    x: number;
    y: number;
  };
  img: HTMLImageElement;

  draw: () => void;
}
