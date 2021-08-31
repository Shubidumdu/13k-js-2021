import { soundEnemyHitted } from '../sounds/effects';
import { enemyState } from '../states/enemy';

interface EnemyMoveProps {
  start: number;
  position: { x: number; y: number };
  predelay?: number;
  speed?: number;
}

export const enemyMove = ({
  start,
  predelay,
  speed,
  position,
}: EnemyMoveProps) => {
  enemyState.move = {
    ...enemyState.move,
    start,
    predelay: predelay ? predelay : enemyState.move.predelay,
    speed: speed ? speed : enemyState.move.speed,
    position,
  };
};

interface EnemyAttackProps {
  start: number;
  position: { x: number; y: number }[];
  predelay: number;
  duration: number;
  delay: number;
  power: number;
  sound: boolean[];
}

export const enemyAttack = ({
  start,
  position,
  predelay,
  delay,
  duration,
  power,
  sound,
}: EnemyAttackProps) => {
  enemyState.attack = {
    sound,
    start,
    duration,
    predelay,
    delay,
    position,
    power,
  };
};

export const enemyGetDamage = (damage: number) => {
  enemyState.damage = {
    ...enemyState.damage,
    start: performance.now(),
  };
  enemyState.life = enemyState.life - damage < 0 ? 0 : enemyState.life - damage;
  soundEnemyHitted();
};
