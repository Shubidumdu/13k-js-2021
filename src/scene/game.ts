import { enemyAttack, enemyMove } from '../actions/enemy';
import { playerGetDamage, updatePlayerAttack } from '../actions/player';
import { addGameEventListener } from '../events/game';
import { drawEnemy1, drawEnemy2 } from '../graphic/enemy';
import { drawLifeBar } from '../graphic/lifeBar';
import { drawMap } from '../graphic/map';
import { drawPlayer } from '../graphic/player';
import { soundLazerCharge, soundLazerShoot } from '../sounds/effects';
import { enemyState } from '../states/enemy';
import { mapState } from '../states/map';
import { playerState } from '../states/player';
import { getTimings } from '../utils';

const gameState = {
  stage: 2,
  player: playerState,
  map: mapState,
  enemy: enemyState,
};

export const updateGame = (time: number) => {
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
  updatePlayerAttack(time);
  // Collision Damage
  if (
    enemyState.position.x === playerState.position.x &&
    enemyState.position.y === playerState.position.y
  ) {
    playerGetDamage(playerState.collisionDamage);
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
      playerGetDamage(enemyState.attack.power);
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
        start: time,
        predelay: 800,
        speed: 100,
        position: {
          x: playerState.position.x,
          y: playerState.position.y,
        },
      });
    }
  }
  // Enemy2 Pattern
  if (gameState.stage === 2) {
    const [
      isEnemyAttacking,
      enemyAttackProgress,
      isEnemyAttackReserved,
      isEnemyAttackEnded,
    ] = getTimings({
      time,
      start: enemyState.attack.start,
      duration:
        enemyState.attack.predelay +
        enemyState.attack.duration +
        enemyState.attack.delay,
    });
    const [
      isEnemyMoving,
      enemyMovingProgress,
      isEnemyMovingReserved,
      isEnemyMovingEnded,
    ] = getTimings({
      time,
      start: enemyState.move.start,
      duration: enemyState.move.predelay + enemyState.move.speed,
    });
    const [
      isEnemyAttackCharging,
      enemyAttackChargingProgress,
      _,
      enemyAttackChargingEnded,
    ] = getTimings({
      time,
      start: enemyState.attack.start,
      duration: enemyState.attack.predelay,
    });
    const [isEnemyShooting, __, enemyShootingReserved, enemyShootingEnded] =
      getTimings({
        time,
        start: enemyState.attack.start + enemyState.attack.predelay,
        duration: enemyState.attack.duration,
      });
    if (isEnemyAttackCharging) {
      if (!enemyState.attack.sound[0]) {
        soundLazerCharge();
        enemyState.attack.sound[0] = true;
      }
    }
    if (isEnemyShooting) {
      if (!enemyState.attack.sound[1]) {
        soundLazerShoot();
        enemyState.attack.sound[1] = true;
      }
    }
    if (isEnemyMovingEnded && isEnemyAttackEnded) {
      enemyMove({
        start: time,
        predelay: 500,
        speed: 100,
        position: {
          x: Math.floor(Math.random() * 4),
          y: Math.floor(Math.random() * 4),
        },
      });
      enemyAttack({
        start: time + 1200,
        predelay: 800,
        position: [
          { x: enemyState.move.position.x, y: 0 },
          { x: enemyState.move.position.x, y: 1 },
          { x: enemyState.move.position.x, y: 2 },
          { x: enemyState.move.position.x, y: 3 },
          { x: 0, y: enemyState.move.position.y },
          { x: 1, y: enemyState.move.position.y },
          { x: 2, y: enemyState.move.position.y },
          { x: 3, y: enemyState.move.position.y },
        ],
        delay: 0,
        duration: 200,
        power: 30,
        sound: [false, false],
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
  if (enemyState.position.y >= playerState.position.y) {
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
