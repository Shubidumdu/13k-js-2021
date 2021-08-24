import { GameState } from '../scene/game';
import { enemyHitted, soundHitted, soundLightSaber } from '../sounds/effects';

let gameEventHandler;

export const addGameEventListener = (state: GameState) => {
  const { life, player, enemy, map } = state;

  gameEventHandler = (e: KeyboardEvent) => {
    const now = performance.now();
    if (now - player.attack.start < player.attack.duration) return;
    if (e.key === 'ArrowRight') {
      if (player.x === map.size - 1) return;
      player.move.start = now;
      player.move.before = {
        x: player.x,
        y: player.y,
      };
      player.x += 1;
    }
    if (e.key === 'ArrowLeft') {
      if (player.x === 0) return;
      player.move.start = now;
      player.move.before = {
        x: player.x,
        y: player.y,
      };
      player.x -= 1;
    }
    if (e.key === 'ArrowUp') {
      if (player.y === 0) return;
      player.move.start = now;
      player.move.before = {
        x: player.x,
        y: player.y,
      };
      player.y -= 1;
    }
    if (e.key === 'ArrowDown') {
      if (player.y === map.size - 1) return;
      player.move.start = now;
      player.move.before = {
        x: player.x,
        y: player.y,
      };
      player.y += 1;
    }
    if (e.key === 'd' || e.key === 'D') {
      soundLightSaber();
      player.direction = 1;
      player.attack.start = now;
      if (enemy.x === player.x + 1 && enemy.y === player.y) {
        enemy.damage.start = now;
        enemyHitted();
      }
    }
    if (e.key === 's' || e.key === 'S') {
      soundLightSaber();
      player.direction = -1;
      player.attack.start = now;
      if (enemy.x === player.x - 1 && enemy.y === player.y) {
        enemy.damage.start = now;
        enemyHitted();
      }
    }
    if (e.key === ' ') {
      if (!life || now - player.damage.start < player.damage.duration) return;
      life.remain -= 1;
      player.damage.start = now;
      soundHitted();
    }
  };

  window.addEventListener('keydown', gameEventHandler);
};
