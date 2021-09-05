import { playerAttack, playerMove } from '../actions/player';
import { gameState } from '../scene/game';
import { mapState } from '../states/map';
import { playerState } from '../states/player';
import { getTimings } from '../utils';

let gameEventHandler: (e: KeyboardEvent) => void;

export const addGameEventListener = () => {
  gameEventHandler = (e: KeyboardEvent) => {
    if (gameState.playTime < 3000) return;
    const time = performance.now();
    if (
      e.key === 'ArrowRight' ||
      e.key === 'ArrowLeft' ||
      e.key === 'ArrowUp' ||
      e.key === 'ArrowDown'
    ) {
      const [isMoving] = getTimings({
        time,
        start: playerState.move.start,
        duration: playerState.move.speed,
      });
      if (isMoving) return;
      if (e.key === 'ArrowRight') {
        if (playerState.position.x === mapState.size - 1) return;
        playerMove({
          position: {
            x: playerState.position.x + 1,
            y: playerState.position.y,
          },
        });
      }
      if (e.key === 'ArrowLeft') {
        if (playerState.position.x === 0) return;
        playerMove({
          position: {
            x: playerState.position.x - 1,
            y: playerState.position.y,
          },
        });
      }
      if (e.key === 'ArrowUp') {
        if (playerState.position.y === 0) return;
        playerMove({
          position: {
            x: playerState.position.x,
            y: playerState.position.y - 1,
          },
        });
      }
      if (e.key === 'ArrowDown') {
        if (playerState.position.y === mapState.size - 1) return;
        playerMove({
          position: {
            x: playerState.position.x,
            y: playerState.position.y + 1,
          },
        });
      }
    }
    if (e.key === 'd' || e.key === 'D' || e.key === 's' || e.key === 'S') {
      if (e.key === 'd' || e.key === 'D') {
        playerAttack(1);
      }
      if (e.key === 's' || e.key === 'S') {
        playerAttack(-1);
      }
    }
  };

  window.addEventListener('keydown', gameEventHandler);
};

export const removeGameEventListener = () => {
  window.removeEventListener('keydown', gameEventHandler);
};
