import { soundLightSaber, soundPlayerHitted } from '../sounds/effects';
import { playerState } from '../states/player';
import { getTimings } from '../utils';

interface PlayerMoveProps {
  position: {
    x: number;
    y: number;
  };
}

export const playerMove = ({ position }: PlayerMoveProps) => {
  playerState.move = {
    ...playerState.move,
    start: performance.now(),
    position,
  };
};

interface PlayerAttackProps {
  direction: -1 | 1;
}

export const playerAttack = ({ direction }: PlayerAttackProps) => {
  soundLightSaber();
  playerState.direction = direction;
  playerState.attack = {
    ...playerState.attack,
    start: performance.now(),
    position:
      direction === 1
        ? [
            {
              x: playerState.position.x + 1,
              y: playerState.position.y,
            },
          ]
        : [{ x: playerState.position.x - 1, y: playerState.position.y }],
  };
};

export const playerGetDamage = (damage: number) => {
  const [isTakingDamage] = getTimings({
    time: performance.now(),
    start: playerState.damage.start,
    duration: playerState.damage.duration,
  });
  if (isTakingDamage) return;
  playerState.damage = {
    ...playerState.damage,
    start: performance.now(),
  };
  playerState.life =
    playerState.life - damage < 0 ? 0 : playerState.life - damage;
  soundPlayerHitted();
};
