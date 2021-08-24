import { canvas, draw } from '../canvas';
import { degreeToRadian, getTimings } from '../utils';
import { MapState } from './map';
import { PlayerState } from './player';

export interface EnemyState {
  x: number;
  y: number;
  damage: {
    start: number;
    duration: number;
  };
}

interface DrawEnemyProps {
  map: MapState;
  enemy: EnemyState;
  time: number;
  player: PlayerState;
}

export const drawEnemy = ({ map, enemy, time }: DrawEnemyProps) => {
  const positionX =
    canvas.width / 2 +
    (-160 + enemy.x * map.tileWidth - (enemy.y * map.tileWidth) / 6);
  const positionY =
    canvas.height / 2 + (-20 + enemy.y * map.tileWidth + Math.sin(time / 240));
  const [damageProgress, isTakingDamage] = getTimings({
    time,
    start: enemy.damage.start,
    duration: enemy.damage.duration,
  });
  if (isTakingDamage && Math.ceil(time) % 8 === 0) return;
  draw((context, canvas) => {
    // BODY
    context.setTransform(1, 0, 0, 1, positionX, positionY);
    context.beginPath();
    context.arc(0, 0, 40, 0, degreeToRadian(360));
    if (isTakingDamage) context.fillStyle = '#fa9';
    else context.fillStyle = '#6f9';
    context.fill();
    context.closePath();
    context.beginPath();
    context.arc(-20, -10, 5, 0, degreeToRadian(360));
    context.fillStyle = '#000';
    context.fill();
    context.closePath();
    context.beginPath();
    context.arc(10, -10, 5, 0, degreeToRadian(360));
    context.fillStyle = '#000';
    context.fill();
    context.closePath();
  });
};
