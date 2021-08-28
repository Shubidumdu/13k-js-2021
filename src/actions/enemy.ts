import { EnemyState } from '../graphic/enemy';

interface EnemyMoveProps {
  enemy: EnemyState;
  position: { x: number; y: number };
  duration: number;
  speed: number;
}

export const enemyMove = (
  time: number,
  { speed, enemy, position, duration }: EnemyMoveProps,
) => {
  enemy.move = {
    speed,
    start: time,
    duration,
    position,
  };
};
