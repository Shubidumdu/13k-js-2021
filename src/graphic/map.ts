import { draw } from '../canvas';

const MAP_COLOR = '#0F0';
const SHADOW_COLOR = '#FFF';

export interface MapState {
  size: number;
  tileWidth: number;
  tileHeight: number;
}

export const drawMap = ({ size, tileWidth, tileHeight }: MapState) => {
  draw((context, canvas) => {
    context.setTransform(
      1,
      0,
      -0.5,
      1,
      canvas.width / 2 - (tileWidth * size) / 2 + tileWidth / 4,
      canvas.height / 2,
    );
    context.strokeStyle = MAP_COLOR;
    context.shadowColor = SHADOW_COLOR;
    context.shadowOffsetX = 8;
    context.shadowOffsetY = 8;
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        context.strokeRect(
          tileWidth * j,
          tileHeight * i,
          tileWidth,
          tileHeight,
        );
      }
    }
  });
};
