import { EnemyState } from '../graphic/enemy';

interface EnemyMoveProps {
  enemy: EnemyState;
  position: { x: number; y: number };
  duration: number;
}

export const enemyMove = (
  time: number,
  { enemy, position, duration }: EnemyMoveProps,
) => {
  enemy.move = {
    start: time,
    duration,
    position,
  };
};
