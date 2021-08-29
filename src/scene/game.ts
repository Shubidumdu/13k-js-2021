import { enemyGetDamage, enemyMove } from '../actions/enemy';
import { playerGetDamage } from '../actions/player';
import { addGameEventListener } from '../events/game';
import { drawEnemy } from '../graphic/enemy';
import { drawLifeBar } from '../graphic/lifeBar';
import { drawMap } from '../graphic/map';
import { drawPlayer } from '../graphic/player';
import { enemyState } from '../states/enemy';
import { mapState } from '../states/map';
import { playerState } from '../states/player';
import { getTimings } from '../utils';

const gameState = {
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
  // Player Attack
  const [isAttacking] = getTimings({
    time,
    start: playerState.attack.start + playerState.attack.predelay,
    duration: playerState.attack.duration,
  });
  if (isAttacking) {
    const [isEnemyGetDamaged] = getTimings({
      time,
      start: enemyState.damage.start,
      duration: enemyState.damage.duration,
    });
    if (
      playerState.attack.position.some(
        ({ x, y }) =>
          x === enemyState.position.x && y === enemyState.position.y,
      ) &&
      !isEnemyGetDamaged
    ) {
      enemyGetDamage(playerState.attack.power);
    }
  }
  // Collision Damage
  if (
    enemyState.position.x === playerState.position.x &&
    enemyState.position.y === playerState.position.y
  ) {
    playerGetDamage(enemyState.attack.power);
  }
  // Enemy Move
  if (
    (enemyState.move.position.x !== enemyState.position.x ||
      enemyState.move.position.y !== enemyState.position.y) &&
    enemyState.move.start !== -Infinity
  ) {
    const [isEnemyMoving, enemyMovingProgress] = getTimings({
      time,
      start: enemyState.move.start + enemyState.move.predelay,
      duration: enemyState.move.speed,
    });
    if (enemyMovingProgress >= 1)
      enemyState.position = {
        ...enemyState.move.position,
      };
  }
  // Damage By Enemy Attack
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
      playerGetDamage(playerState.collisionDamage);
    }
  }
};

export const drawGame = (time: number) => {
  updateGame(time);
  drawMap({ map: gameState.map, enemy: enemyState, time });
  drawLifeBar({
    player: playerState.life,
    enemy: enemyState.life,
  });
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
