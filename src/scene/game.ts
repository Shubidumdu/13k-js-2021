import { enemyMove } from '../actions/enemy';
import { playerGetDamage, updatePlayerAttack } from '../actions/player';
import { addGameEventListener } from '../events/game';
import { drawEnemy1, drawEnemy2 } from '../graphic/enemy';
import { drawLifeBar } from '../graphic/lifeBar';
import { drawMap } from '../graphic/map';
import { drawPlayer } from '../graphic/player';
import { enemyState } from '../states/enemy';
import { mapState } from '../states/map';
import { playerState } from '../states/player';
import { getTimings } from '../utils';

const gameState = {
  stage: 1,
  player: playerState,
  map: mapState,
  enemy: enemyState,
};

export const updateGame = (time: number) => {
  // Player Move
  const [isPlayerMoving, progressPlayerMoving] = getTimings({
    time,
    start: playerState.move.start,
    duration: playerState.move.speed,
  });
  if (
    (playerState.move.position.x !== playerState.position.x ||
      playerState.move.position.y !== playerState.position.y) &&
    !isPlayerMoving &&
    progressPlayerMoving > 1
  ) {
    playerState.position = {
      ...playerState.move.position,
    };
  }
  // Player Attack
  updatePlayerAttack();
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
  // Enemy1 Pattern
  if (gameState.stage === 1) {
    const [isEnemyMoving, enemyMovingProgress] = getTimings({
      time,
      start: enemyState.move.start,
      duration: enemyState.move.predelay + enemyState.move.speed,
    });
    if (
      enemyMovingProgress >= 1 &&
      !isEnemyMoving &&
      (enemyState.position.x !== playerState.position.x ||
        enemyState.position.y !== playerState.position.y)
    ) {
      enemyMove({
        predelay: 800,
        speed: 100,
        position: {
          x: playerState.position.x,
          y: playerState.position.y,
        },
      });
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
    switch (gameState.stage) {
      case 1:
        drawEnemy1({
          time,
          enemy: enemyState,
          map: mapState,
          player: playerState,
        });
      case 2:
        drawEnemy2({
          time,
          enemy: enemyState,
          map: mapState,
          player: playerState,
        });
    }
  } else {
    switch (gameState.stage) {
      case 1:
        drawEnemy1({
          time,
          enemy: enemyState,
          map: mapState,
          player: playerState,
        });
      case 2:
        drawEnemy2({
          time,
          enemy: enemyState,
          map: mapState,
          player: playerState,
        });
    }
    drawPlayer({
      time,
      player: playerState,
      map: mapState,
    });
  }
};

addGameEventListener();
