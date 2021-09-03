import { enemyAttack, enemyMove } from '../actions/enemy';
import { playerGetDamage, updatePlayerAttack } from '../actions/player';
import { addGameEventListener } from '../events/game';
import {
  drawEnemy1,
  drawEnemy2,
  drawEnemy3,
  drawEnemy4,
  drawEnemy5,
} from '../graphic/enemy';
import { drawLifeBar } from '../graphic/ui';
import { drawMap } from '../graphic/map';
import { drawPlayer } from '../graphic/player';
import {
  soundBlackHoleBeam,
  soundBlackSpike,
  soundDrop,
  soundExplostion,
  soundGetFreezing,
  soundHoleOpen,
  soundIceSpike,
  soundLazerCharge,
  soundLazerShoot,
} from '../sounds/effects';
import { enemyState, resetEnemyState } from '../states/enemy';
import { mapState } from '../states/map';
import { playerState, resetPlayerState } from '../states/player';
import { getRandomInt, getTimings } from '../utils';

const gameState = {
  stage: 1,
  player: playerState,
  map: mapState,
  enemy: enemyState,
};

export const updateGame = (time: number) => {
  // When game cleared
  if (enemyState.life <= 0) {
    resetEnemyState();
    resetPlayerState();
    gameState.stage += 1;
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
  if (gameState.stage === 3) {
    const [
      isEnemyAttacking,
      enemyAttackProgress,
      isEnemyAttackReserved,
      isEnemyAttackEnded,
    ] = getTimings({
      time,
      start: enemyState.attack.start + enemyState.attack.predelay,
      duration: enemyState.attack.duration + enemyState.attack.delay,
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
    if (isEnemyAttacking && !enemyState.attack.sound[0]) {
      soundExplostion();
      enemyState.attack.sound[0] = true;
    }
    if (isEnemyMovingEnded) {
      enemyMove({
        start: time,
        predelay: 400,
        speed: 200,
        position: {
          x: Math.floor(Math.random() * 4),
          y: Math.floor(Math.random() * 4),
        },
      });
    }
    if (isEnemyAttackEnded) {
      enemyAttack({
        start: time,
        predelay: 400,
        delay: 200,
        position: [{ x: playerState.position.x, y: playerState.position.y }],
        duration: 400,
        power: 20,
        sound: [false],
      });
    }
  }
  if (gameState.stage === 4) {
    const [
      isEnemyAttacking,
      enemyAttackProgress,
      isEnemyAttackReserved,
      isEnemyAttackEnded,
    ] = getTimings({
      time,
      start: enemyState.attack.start + enemyState.attack.predelay,
      duration: enemyState.attack.duration + enemyState.attack.delay,
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
    if (isEnemyAttackCharging) {
      if (enemyState.attack.type === 0 && !enemyState.attack.sound[0]) {
        soundGetFreezing();
        enemyState.attack.sound[0] = true;
      }
    }
    if (isEnemyAttacking) {
      if (enemyState.attack.type === 0 && !enemyState.attack.sound[1]) {
        soundIceSpike();
        enemyState.attack.sound[1] = true;
      }
      if (enemyState.attack.type === 1 && !enemyState.attack.sound[0]) {
        soundDrop();
        enemyState.attack.sound[0] = true;
      }
    }
    if (isEnemyMovingEnded && isEnemyAttackEnded) {
      const random = Math.floor(Math.random() * 2);
      if (random === 0) {
        const enemyMovePosition = { x: getRandomInt(4), y: getRandomInt(4) };
        enemyMove({
          start: time,
          predelay: 200,
          speed: 100,
          position: enemyMovePosition,
        });
        const safeZone = { x: getRandomInt(4), y: getRandomInt(4) };
        while (safeZone.x === enemyState.move.position.x) {
          safeZone.x = getRandomInt(4);
        }
        while (safeZone.y === enemyState.move.position.y) {
          safeZone.y = getRandomInt(4);
        }
        enemyAttack({
          type: 0,
          start: time + 300,
          predelay: 1400,
          delay: 200,
          position: [0, 1, 2, 3].reduce((prev, val1) => {
            const pos = [0, 1, 2, 3]
              .map((val2) => ({ x: val1, y: val2 }))
              .filter(({ x, y }) => {
                return (
                  (x !== enemyMovePosition.x || y !== enemyMovePosition.y) &&
                  (x !== safeZone.x || y !== safeZone.y)
                );
              });
            return [...prev, ...pos];
          }, []),
          duration: 200,
          power: 20,
          sound: [false, false],
        });
      } else {
        const enemyMovePosition = { x: getRandomInt(4), y: getRandomInt(4) };
        enemyMove({
          start: time,
          predelay: 200,
          speed: 100,
          position: enemyMovePosition,
        });
        enemyAttack({
          type: 1,
          start: time + 200,
          predelay: 600,
          delay: 100,
          position: [0, 1, 2, 3].map((x) => ({ x, y: getRandomInt(4) })),
          duration: 200,
          power: 20,
          sound: [false],
        });
      }
    }
  }
  if (gameState.stage === 5) {
    const [
      isEnemyAttacking,
      enemyAttackProgress,
      isEnemyAttackReserved,
      isEnemyAttackEnded,
    ] = getTimings({
      time,
      start: enemyState.attack.start + enemyState.attack.predelay,
      duration: enemyState.attack.duration + enemyState.attack.delay,
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
    if (isEnemyAttackCharging) {
      if (enemyState.attack.type === 0 && !enemyState.attack.sound[0]) {
        soundHoleOpen();
        enemyState.attack.sound[0] = true;
      }
      if (enemyState.attack.type === 2 && !enemyState.attack.sound[0]) {
        soundHoleOpen();
        enemyState.attack.sound[0] = true;
      }
    }
    if (isEnemyAttacking) {
      if (enemyState.attack.type === 0 && !enemyState.attack.sound[1]) {
        soundBlackHoleBeam();
        enemyState.attack.sound[1] = true;
      }
      if (enemyState.attack.type === 1 && !enemyState.attack.sound[0]) {
        soundBlackSpike();
        enemyState.attack.sound[0] = true;
      }
      if (enemyState.attack.type === 2 && !enemyState.attack.sound[1]) {
        soundBlackHoleBeam();
        enemyState.attack.sound[1] = true;
      }
    }
    if (isEnemyMovingEnded && isEnemyAttackEnded) {
      const random = getRandomInt(3);
      if (random === 0) {
        enemyMove({
          start: time,
          predelay: 200,
          speed: 100,
          position: {
            x: getRandomInt(2) * 3,
            y: getRandomInt(2) + 1,
          },
        });
        enemyAttack({
          type: 0,
          start: time + 300,
          position: (() => {
            if (enemyState.move.position.x === 3) {
              return [0, 1, 2].reduce((prev, x) => {
                const pos = [-1, 0, 1].map((y) => ({
                  x: x,
                  y: enemyState.move.position.y + y,
                }));
                return [...prev, ...pos];
              }, []);
            }
            if (enemyState.move.position.x === 0) {
              return [1, 2, 3].reduce((prev, x) => {
                const pos = [-1, 0, 1].map((y) => ({
                  x: x,
                  y: enemyState.move.position.y + y,
                }));
                return [...prev, ...pos];
              }, []);
            }
          })(),
          predelay: 700,
          delay: 100,
          duration: 400,
          power: 40,
          sound: [false, false],
        });
      }
      if (random === 1) {
        enemyMove({
          start: time,
          predelay: 200,
          speed: 100,
          position: {
            x:
              playerState.position.x === 0
                ? 1
                : playerState.position.x === 3
                ? 2
                : playerState.position.x - 2 * getRandomInt(2) + 1,
            y: playerState.position.y,
          },
        });
        enemyAttack({
          type: 1,
          start: time,
          position: [
            {
              x: playerState.position.x,
              y: playerState.position.y,
            },
          ],
          predelay: 300,
          delay: 100,
          duration: 200,
          power: 30,
          sound: [false],
        });
      }
      if (random === 2) {
        enemyMove({
          start: time,
          predelay: 200,
          speed: 100,
          position: {
            x: getRandomInt(2) + 1,
            y: getRandomInt(2) + 1,
          },
        });
        enemyAttack({
          type: 2,
          start: time + 300,
          position: (() => {
            return [-1, 0, 1].reduce((prev, x) => {
              const pos = [-1, 0, 1]
                .map((y) => ({
                  x: enemyState.move.position.x + x,
                  y: enemyState.move.position.y + y,
                }))
                .filter(
                  ({ x, y }) =>
                    x !== enemyState.move.position.x ||
                    y !== enemyState.move.position.y,
                );
              return [...prev, ...pos];
            }, []);
          })(),
          predelay: 400,
          delay: 100,
          duration: 400,
          power: 50,
          sound: [false, false],
        });
      }
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
        break;
      case 2:
        drawEnemy2({
          time,
          enemy: enemyState,
          map: mapState,
          player: playerState,
        });
        break;
      case 3:
        drawEnemy3({
          time,
          enemy: enemyState,
          map: mapState,
          player: playerState,
        });
        break;
      case 4:
        drawEnemy4({
          time,
          enemy: enemyState,
          map: mapState,
          player: playerState,
        });
        break;
      case 5:
        drawEnemy5({
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
        break;
      case 2:
        drawEnemy2({
          time,
          enemy: enemyState,
          map: mapState,
          player: playerState,
        });
        break;
      case 3:
        drawEnemy3({
          time,
          enemy: enemyState,
          map: mapState,
          player: playerState,
        });
        break;
      case 4:
        drawEnemy4({
          time,
          enemy: enemyState,
          map: mapState,
          player: playerState,
        });
        break;
      case 5:
        drawEnemy5({
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
