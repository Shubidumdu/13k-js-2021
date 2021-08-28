import { draw } from '../canvas';
import { getTimings } from '../utils';
import { EnemyState } from './enemy';

const MAP_COLOR = '#0F0';
const SHADOW_COLOR = '#FFF';

export interface MapState {
  size: number;
  tileWidth: number;
  tileHeight: number;
}

interface DrawMapProps {
  map: MapState;
  enemy: EnemyState;
  time: number;
}

export const drawMap = ({
  time,
  enemy,
  map: { size, tileWidth, tileHeight },
}: DrawMapProps) => {
  const [isEnemyWaitingMove] = getTimings({
    time,
    start: enemy.move.start,
    duration: enemy.move.duration - enemy.move.speed,
  });
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
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        if (
          isEnemyWaitingMove &&
          Math.ceil(time) % 4 === 0 &&
          enemy.move.position.x === x &&
          enemy.move.position.y === y
        ) {
          context.fillStyle = '#faa';
          context.fillRect(
            tileWidth * x,
            tileHeight * y,
            tileWidth,
            tileHeight,
          );
        } else
          context.strokeRect(
            tileWidth * x,
            tileHeight * y,
            tileWidth,
            tileHeight,
          );
      }
    }
  });
};
