import { enemyMove } from '../actions/enemy';
import { canvas, draw } from '../canvas';
import { GameState } from '../scene/game';
import { degreeToRadian, getTimings } from '../utils';
import { MapState } from './map';
import { PlayerState } from './player';

export interface EnemyState {
  position: {
    x: number;
    y: number;
  };
  damage: {
    start: number;
    duration: number;
  };
  attack: {
    type1: {
      start: number;
      duration: number;
    };
  };
  move: {
    start: number;
    duration: number;
    speed: number;
    position: {
      x: number;
      y: number;
    };
  };
}

interface DrawEnemyProps {
  map: MapState;
  enemy: EnemyState;
  time: number;
  player: PlayerState;
}

export const drawEnemy = ({ map, enemy, time }: DrawEnemyProps) => {
  const [isMoving, movingProgress] = getTimings({
    time,
    start: enemy.move.start + enemy.move.duration - enemy.move.speed,
    duration: enemy.move.speed,
  });
  const positionX = isMoving
    ? canvas.width / 2 +
      (-(map.tileWidth + map.tileHeight) +
        (enemy.position.x +
          (enemy.move.position.x - enemy.position.x) * movingProgress) *
          map.tileWidth -
        ((enemy.position.y +
          (enemy.move.position.y - enemy.position.y) * movingProgress) *
          map.tileWidth) /
          6)
    : canvas.width / 2 +
      (-(map.tileWidth + map.tileHeight) +
        enemy.position.x * map.tileWidth -
        (enemy.position.y * map.tileWidth) / 6);
  const positionY = isMoving
    ? canvas.height / 2 +
      (enemy.position.y +
        (enemy.move.position.y - enemy.position.y) * movingProgress -
        1 / 2) *
        map.tileHeight
    : canvas.height / 2 + (enemy.position.y - 1 / 2) * map.tileHeight;
  +Math.sin(time / 240);
  const [isTakingDamage] = getTimings({
    time,
    start: enemy.damage.start,
    duration: enemy.damage.duration,
  });
  const [isAttaking1, attack1Progress] = getTimings({
    time,
    start: enemy.attack.type1.start,
    duration: enemy.attack.type1.duration,
  });
  if (isTakingDamage && Math.ceil(time) % 8 === 0) return;
  draw((context, canvas) => {
    // BODY
    context.setTransform(1, 0, 0, 1, positionX, positionY);
    context.beginPath();
    if (isMoving) context.globalAlpha = 0.5;
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
