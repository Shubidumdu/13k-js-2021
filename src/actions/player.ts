import { soundLightSaber } from '../sounds/effects';
import { playerState } from '../states/player';

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
