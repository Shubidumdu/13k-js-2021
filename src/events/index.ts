import { GameState } from '../scene/game';
import { soundHitted, soundLightSaber } from '../sounds/effects';

let gameEventHandler;

export const addGameEventListener = (state: GameState) => {
  const { life, player, map } = state;

  gameEventHandler = (e: KeyboardEvent) => {
    const now = performance.now();
    if (now - player.attack.start < player.attack.duration) return;
    if (e.key === 'ArrowRight') {
      if (player.x === map.size - 1) return;
      player.move.start = performance.now();
      player.move.before = {
        x: player.x,
        y: player.y,
      };
      player.x += 1;
    }
    if (e.key === 'ArrowLeft') {
      if (player.x === 0) return;
      player.move.start = performance.now();
      player.move.before = {
        x: player.x,
        y: player.y,
      };
      player.x -= 1;
    }
    if (e.key === 'ArrowUp') {
      if (player.y === 0) return;
      player.move.start = performance.now();
      player.move.before = {
        x: player.x,
        y: player.y,
      };
      player.y -= 1;
    }
    if (e.key === 'ArrowDown') {
      if (player.y === map.size - 1) return;
      player.move.start = performance.now();
      player.move.before = {
        x: player.x,
        y: player.y,
      };
      player.y += 1;
    }
    if (e.key === 'd' || e.key === 'D') {
      soundLightSaber();
      player.direction = 1;
      player.attack.start = performance.now();
    }
    if (e.key === 's' || e.key === 'S') {
      soundLightSaber();
      player.direction = -1;
      player.attack.start = performance.now();
    }
    if (e.key === ' ') {
      if (
        !life ||
        performance.now() - player.damage.start < player.damage.duration
      )
        return;
      life.remain -= 1;
      player.damage.start = performance.now();
      soundHitted();
    }
  };

  window.addEventListener('keydown', gameEventHandler);
};
