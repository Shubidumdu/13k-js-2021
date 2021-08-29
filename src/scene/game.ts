import { addGameEventListener } from '../events/game';
import { drawEnemy } from '../graphic/enemy';
import { drawLifeBar } from '../graphic/lifeBar';
import { drawMap } from '../graphic/map';
import { drawPlayer } from '../graphic/player';
import { soundHitted } from '../sounds/effects';
import { enemyState } from '../states/enemy';
import { lifeState } from '../states/life';
import { mapState } from '../states/map';
import { playerState } from '../states/player';
import { getTimings } from '../utils';

const gameState = {
  life: lifeState,
  player: playerState,
  map: mapState,
  enemy: enemyState,
};

export const updateGame = (time: number) => {
  // Player Move
  if (
    (playerState.move.position.x !== playerState.position.x ||
      playerState.move.position.y !== playerState.position.y) &&
    time - playerState.move.start >= playerState.move.speed
  ) {
    playerState.position = {
      ...playerState.move.position,
    };
  }
  // Damage
  if (
    enemyState.position.x === playerState.position.x &&
    enemyState.position.y === playerState.position.y
  ) {
    const [isTakingDamage] = getTimings({
      time,
      start: playerState.damage.start,
      duration: playerState.damage.duration,
    });
    if (isTakingDamage) return;
    lifeState.player -= 10;
    playerState.damage.start = time;
    soundHitted();
  }
  // Enemy Move
  if (
    (enemyState.move.position.x !== enemyState.position.x ||
      enemyState.move.position.y !== enemyState.position.y) &&
    time - enemyState.move.start >= enemyState.move.predelay
  ) {
    enemyState.position = {
      ...enemyState.move.position,
    };
  }
  // Enemy Attack
  const [isEnemyAttacking] = getTimings({
    time,
    start: enemyState.attack.start + enemyState.attack.predelay,
    duration: enemyState.attack.duration,
  });
  if (isEnemyAttacking) {
    const isHitted = enemyState.attack.position.some(
      ({ x, y }) =>
        x === playerState.position.x && y === playerState.position.y,
    );
    if (isHitted) {
      const [isTakingDamage] = getTimings({
        time,
        start: playerState.damage.start,
        duration: playerState.damage.duration,
      });
      if (isTakingDamage) return;
      lifeState.player -= 10;
      playerState.damage.start = time;
      soundHitted();
    }
  }
};

export const drawGame = (time: number) => {
  updateGame(time);
  drawMap({ map: gameState.map, enemy: enemyState, time });
  drawLifeBar(gameState.life);
  if (enemyState.position.y > playerState.position.y) {
    drawPlayer({
      time,
      player: playerState,
      map: mapState,
    });
    drawEnemy({ time, enemy: enemyState, map: mapState, player: playerState });
  } else {
    drawEnemy({ time, enemy: enemyState, map: mapState, player: playerState });
    drawPlayer({
      time,
      player: playerState,
      map: mapState,
    });
  }
};

addGameEventListener();
