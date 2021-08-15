import { canvas, context, draw } from '../canvas';

export const drawGame = () => {
  drawMap(4, canvas.width / 2 + 40, canvas.height / 2, 120, 40);
};

const drawMap = (
  size: number,
  x: number,
  y: number,
  tileWidth: number,
  tileHeight: number,
) => {
  draw(() => {
    context.setTransform(1, 0, -0.5, 1, 0, 0);
    context.strokeStyle = '#0f0';
    context.shadowColor = '#fff';
    context.shadowOffsetX = 8;
    context.shadowOffsetY = 8;
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        context.strokeRect(
          x + tileWidth * j,
          y + tileHeight * i,
          tileWidth,
          tileHeight,
        );
      }
    }
  });
};
