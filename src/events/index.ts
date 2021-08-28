import { GameState } from '../scene/game';
import { enemyHitted, soundHitted, soundLightSaber } from '../sounds/effects';

let gameEventHandler;

export const addGameEventListener = (state: GameState) => {
  const { life, player, enemy, map } = state;

  gameEventHandler = (e: KeyboardEvent) => {
    const now = performance.now();
    if (now - player.attack.start < player.attack.duration) return;
    if (e.key === 'ArrowRight') {
      if (player.position.x === map.size - 1) return;
      player.move.start = now;
      player.move.before = {
        x: player.position.x,
        y: player.position.y,
      };
      player.position.x += 1;
    }
    if (e.key === 'ArrowLeft') {
      if (player.position.x === 0) return;
      player.move.start = now;
      player.move.before = {
        x: player.position.x,
        y: player.position.y,
      };
      player.position.x -= 1;
    }
    if (e.key === 'ArrowUp') {
      if (player.position.y === 0) return;
      player.move.start = now;
      player.move.before = {
        x: player.position.x,
        y: player.position.y,
      };
      player.position.y -= 1;
    }
    if (e.key === 'ArrowDown') {
      if (player.position.y === map.size - 1) return;
      player.move.start = now;
      player.move.before = {
        x: player.position.x,
        y: player.position.y,
      };
      player.position.y += 1;
    }
    if (e.key === 'd' || e.key === 'D') {
      soundLightSaber();
      player.direction = 1;
      player.attack.start = now;
      if (
        enemy.position.x === player.position.x + 1 &&
        enemy.position.y === player.position.y
      ) {
        enemy.damage.start = now;
        enemyHitted();
        life.enemy -= player.attack.power;
      }
    }
    if (e.key === 's' || e.key === 'S') {
      soundLightSaber();
      player.direction = -1;
      player.attack.start = now;
      if (
        enemy.position.x === player.position.x - 1 &&
        enemy.position.y === player.position.y
      ) {
        enemy.damage.start = now;
        enemyHitted();
        life.enemy -= player.attack.power;
      }
    }
    if (e.key === ' ') {
      if (!life || now - player.damage.start < player.damage.duration) return;
      life.player -= 1;
      player.damage.start = now;
      soundHitted();
    }
  };

  window.addEventListener('keydown', gameEventHandler);
};
