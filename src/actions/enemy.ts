import { soundEnemyHitted } from '../sounds/effects';
import { enemyState } from '../states/enemy';

interface EnemyMoveProps {
  position: { x: number; y: number };
  predelay?: number;
  speed?: number;
}

export const enemyMove = ({ predelay, speed, position }: EnemyMoveProps) => {
  enemyState.move = {
    ...enemyState.move,
    start: performance.now(),
    predelay: predelay ? predelay : enemyState.move.predelay,
    speed: speed ? speed : enemyState.move.speed,
    position,
  };
};

interface EnemyAttackProps {
  position: { x: number; y: number }[];
  predelay: number;
  duration: number;
  delay: number;
  power: number;
}

export const enemyAttack = ({
  position,
  predelay,
  delay,
  duration,
  power,
}: EnemyAttackProps) => {
  enemyState.attack = {
    start: performance.now(),
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
