import { enemyMove } from '../actions/enemy';
import { drawGame, gameCanvas } from '../canvas';
import { soundLazerCharge } from '../sounds/effects';
import { enemyState, EnemyState } from '../states/enemy';
import { MapState } from '../states/map';
import { playerState, PlayerState } from '../states/player';
import { degreeToRadian, getPosition, getTimings } from '../utils';

interface DrawEnemyProps {
  map: MapState;
  enemy: EnemyState;
  time: number;
  player: PlayerState;
}

export const drawGameEnemy1 = ({ map, enemy, time }: DrawEnemyProps) => {
  const [isMoving, movingProgress] = getTimings({
    time,
    start: enemy.move.start + enemy.move.predelay,
    duration: enemy.move.speed,
  });
  const positionX = isMoving
    ? gameCanvas.width / 2 +
      (-(map.tileWidth + map.tileHeight) +
        (enemy.position.x +
          (enemy.move.position.x - enemy.position.x) * movingProgress) *
          map.tileWidth -
        ((enemy.position.y +
          (enemy.move.position.y - enemy.position.y) * movingProgress) *
          map.tileWidth) /
          6)
    : gameCanvas.width / 2 +
      (-(map.tileWidth + map.tileHeight) +
        enemy.position.x * map.tileWidth -
        (enemy.position.y * map.tileWidth) / 6);
  const positionY = isMoving
    ? gameCanvas.height / 2 +
      (enemy.position.y +
        (enemy.move.position.y - enemy.position.y) * movingProgress -
        1 / 2) *
        map.tileHeight +
      2 * Math.sin(time / 240)
    : gameCanvas.height / 2 +
      (enemy.position.y - 1 / 2) * map.tileHeight +
      2 * Math.sin(time / 240);
  const [isTakingDamage] = getTimings({
    time,
    start: enemy.damage.start,
    duration: enemy.damage.duration,
  });
  if (isTakingDamage && Math.ceil(time) % 8 === 0) return;
  drawGame((context, canvas) => {
    // BODY
    context.setTransform(1, 0, 0, 1, positionX, positionY);
    context.beginPath();
    if (isMoving) context.globalAlpha = 0.5;
    context.arc(0, 0, 40, 0, degreeToRadian(360));
    if (isTakingDamage) context.fillStyle = '#fa9';
    else context.fillStyle = '#6f9';
    context.fill();
    context.closePath();
    context.beginPath();
    context.arc(-20, -10, 5, 0, degreeToRadian(360));
    context.fillStyle = '#000';
    context.fill();
    context.closePath();
    context.beginPath();
    context.arc(10, -10, 5, 0, degreeToRadian(360));
    context.fillStyle = '#000';
    context.fill();
    context.closePath();
  });
};

export const drawGameEnemy2 = ({ map, enemy, time }: DrawEnemyProps) => {
  const [isMoving, movingProgress] = getTimings({
    time,
    start: enemy.move.start + enemy.move.predelay,
    duration: enemy.move.speed,
  });
  const [isAttackCharging, attackChargingProgress] = getTimings({
    time,
    start: enemy.attack.start,
    duration: enemy.attack.predelay,
  });
  const [isAttacking, attackProgress] = getTimings({
    time,
    start: enemy.attack.start + enemy.attack.predelay,
    duration: enemy.attack.duration,
  });
  const positionX = isMoving
    ? gameCanvas.width / 2 +
      (-(map.tileWidth + map.tileHeight) +
        (enemy.position.x +
          (enemy.move.position.x - enemy.position.x) * movingProgress) *
          map.tileWidth -
        ((enemy.position.y +
          (enemy.move.position.y - enemy.position.y) * movingProgress) *
          map.tileWidth) /
          6)
    : gameCanvas.width / 2 +
      (-(map.tileWidth + map.tileHeight) +
        enemy.position.x * map.tileWidth -
        (enemy.position.y * map.tileWidth) / 6);
  const positionY = isMoving
    ? gameCanvas.height / 2 +
      (enemy.position.y +
        (enemy.move.position.y - enemy.position.y) * movingProgress -
        1 / 2) *
        map.tileHeight +
      2 * Math.sin(time / 240)
    : gameCanvas.height / 2 +
      (enemy.position.y - 1 / 2) * map.tileHeight +
      2 * Math.sin(time / 240);
  const [isTakingDamage] = getTimings({
    time,
    start: enemy.damage.start,
    duration: enemy.damage.duration,
  });
  if (isAttackCharging || isAttacking) {
    drawGame((context, canvas) => {
      context.setTransform(1, 0, 0, 1, positionX, positionY);
      context.beginPath();
      if (isAttackCharging) {
        context.arc(
          -80,
          0,
          20 * Math.sin((attackChargingProgress * Math.PI) / 2),
          0,
          degreeToRadian(360),
        );
        context.fillStyle = '#00f';
        context.fill();
        context.arc(
          80,
          0,
          20 * Math.sin((attackChargingProgress * Math.PI) / 2),
          0,
          degreeToRadian(360),
        );
        context.fillStyle = '#00f';
        context.fill();
        context.closePath();
        context.setTransform(-1, 0, 0, -1, positionX, positionY);
        context.beginPath();
        context.fillStyle = '#00f';
        context.rotate(degreeToRadian(115));
        context.arc(
          60,
          0,
          20 * Math.sin((attackChargingProgress * Math.PI) / 2),
          0,
          degreeToRadian(360),
        );
        context.fill();
        context.closePath();
      }
      if (isAttacking) {
        context.arc(
          -80,
          0,
          20 * Math.cos((attackProgress * Math.PI) / 2),
          0,
          degreeToRadian(360),
        );
        context.fillStyle = '#00f';
        context.fill();
        context.arc(
          80,
          0,
          20 * Math.cos((attackProgress * Math.PI) / 2),
          0,
          degreeToRadian(360),
        );
        context.fillStyle = '#00f';
        context.fill();
        context.closePath();
        context.setTransform(-1, 0, 0, -1, positionX, positionY);
        context.beginPath();
        context.fillStyle = '#00f';
        context.rotate(degreeToRadian(115));
        context.arc(
          60,
          0,
          20 * Math.cos((attackProgress * Math.PI) / 2),
          0,
          degreeToRadian(360),
        );
        context.fill();
        context.closePath();
      }
    });
  }
  if (isAttacking) {
    drawGame((context, canvas) => {
      context.setTransform(-1, 0, 0, 1, positionX, positionY);
      context.beginPath();
      context.fillStyle = '#00f';
      context.fillRect(
        80,
        -(20 * Math.sin(Math.PI * attackProgress)) / 2,
        10000,
        20 * Math.sin(Math.PI * attackProgress),
      );
      context.closePath();
    });
    drawGame((context, canvas) => {
      context.setTransform(1, 0, 0, 1, positionX, positionY);
      context.beginPath();
      context.fillStyle = '#00f';
      context.fillRect(
        80,
        -(20 * Math.sin(Math.PI * attackProgress)) / 2,
        10000,
        20 * Math.sin(Math.PI * attackProgress),
      );
      context.closePath();
    });
    drawGame((context, canvas) => {
      context.setTransform(-1, 0, 0, -1, positionX, positionY);
      context.beginPath();
      context.fillStyle = '#00f';
      context.rotate(degreeToRadian(115));
      context.fillRect(
        60,
        -(20 * Math.sin(Math.PI * attackProgress)) / 2,
        10000,
        20 * Math.sin(Math.PI * attackProgress),
      );
      context.closePath();
    });
  }
  if (isTakingDamage && Math.ceil(time) % 6 === 0) return;
  drawGame((context, canvas) => {
    context.setTransform(1, 0, 0, 1, positionX, positionY);
    if (isTakingDamage) context.fillStyle = '#f66';
    else context.fillStyle = '#ee0';
    context.arc(0, 0, 48, 0, degreeToRadian(360));
    context.fill();
    context.beginPath();
    context.arc(-20, -10, 20, degreeToRadian(90), degreeToRadian(180));
    context.fillStyle = '#000';
    context.fill();
    context.closePath();
    context.beginPath();
    context.arc(10, -10, 20, degreeToRadian(-10), degreeToRadian(110));
    context.fillStyle = '#000';
    context.fill();
    context.closePath();
    context.beginPath();
    context.arc(-10, 20, 10, degreeToRadian(0), degreeToRadian(140));
    context.fillStyle = '#000';
    context.fill();
    context.closePath();
  });
  if (isAttackCharging) {
    drawGame((context, canvas) => {
      context.setTransform(1, 0, 0, 1, positionX, positionY);
      context.beginPath();
      context.fillStyle = '#00f';
      context.rotate(degreeToRadian(115));
      context.arc(
        40,
        0,
        20 * Math.sin((attackChargingProgress * Math.PI) / 2),
        0,
        degreeToRadian(360),
      );
      context.fill();
      context.closePath();
    });
  }
  if (isAttacking) {
    drawGame((context, canvas) => {
      context.setTransform(1, 0, 0, 1, positionX, positionY);
      context.beginPath();
      context.fillStyle = '#00f';
      context.rotate(degreeToRadian(115));
      context.arc(
        40,
        0,
        20 * Math.cos((attackProgress * Math.PI) / 2),
        0,
        degreeToRadian(360),
      );
      context.fill();
      context.closePath();
      context.setTransform(1, 0, 0, 1, positionX, positionY);
      context.beginPath();
      context.fillStyle = '#00f';
      context.rotate(degreeToRadian(115));
      context.fillRect(
        40,
        -(20 * Math.sin(Math.PI * attackProgress)) / 2,
        10000,
        20 * Math.sin(Math.PI * attackProgress),
      );
      context.closePath();
    });
  }
};

export const drawGameEnemy3 = ({ map, enemy, time }: DrawEnemyProps) => {
  const [isMoving, movingProgress] = getTimings({
    time,
    start: enemy.move.start + enemy.move.predelay,
    duration: enemy.move.speed,
  });
  const [isAttacking, attackProgress] = getTimings({
    time,
    start: enemy.attack.start + enemy.attack.predelay,
    duration: enemy.attack.duration,
  });
  const positionX = isMoving
    ? gameCanvas.width / 2 +
      (-(map.tileWidth + map.tileHeight) +
        (enemy.position.x +
          (enemy.move.position.x - enemy.position.x) * movingProgress) *
          map.tileWidth -
        ((enemy.position.y +
          (enemy.move.position.y - enemy.position.y) * movingProgress) *
          map.tileWidth) /
          6)
    : gameCanvas.width / 2 +
      (-(map.tileWidth + map.tileHeight) +
        enemy.position.x * map.tileWidth -
        (enemy.position.y * map.tileWidth) / 6);
  const positionY = isMoving
    ? gameCanvas.height / 2 +
      (enemy.position.y +
        (enemy.move.position.y - enemy.position.y) * movingProgress -
        1 / 2) *
        map.tileHeight +
      2 * Math.sin(time / 240)
    : gameCanvas.height / 2 +
      (enemy.position.y - 1 / 2) * map.tileHeight +
      2 * Math.sin(time / 240);
  const [isTakingDamage] = getTimings({
    time,
    start: enemy.damage.start,
    duration: enemy.damage.duration,
  });
  if (isTakingDamage && Math.ceil(time) % 8 === 0) return;
  if (isAttacking && enemyState.attack.position[0].y < enemyState.position.y) {
    const attackPositionX =
      gameCanvas.width / 2 +
      (-(map.tileWidth + map.tileHeight) +
        enemy.attack.position[0].x * map.tileWidth -
        (enemy.attack.position[0].y * map.tileWidth) / 6);
    const attackPositionY =
      gameCanvas.height / 2 +
      (enemy.attack.position[0].y - 1 / 2) +
      map.tileHeight * (enemy.attack.position[0].y + 0.5);
    drawGame((context) => {
      context.beginPath();
      context.fillStyle = '#f00';
      context.filter = 'blur(8px)';
      context.setTransform(1, 0, 0, 1, attackPositionX, attackPositionY);
      context.fillRect(
        -52,
        -100 * Math.sin(attackProgress * Math.PI),
        100,
        100 * Math.sin(attackProgress * Math.PI),
      );
      context.closePath();
      context.beginPath();
      context.fillStyle = '#ff0';
      context.filter = 'blur(8px)';
      context.setTransform(1, 0, 0, 1, attackPositionX, attackPositionY);
      context.fillRect(
        -26,
        -100 * Math.sin(attackProgress * Math.PI),
        50,
        100 * Math.sin(attackProgress * Math.PI),
      );
      context.closePath();
    });
  }
  drawGame((context, canvas) => {
    // BODY
    context.setTransform(1, 0, 0, 1, positionX, positionY);
    context.beginPath();
    if (isMoving) context.globalAlpha = 0.5;
    context.arc(0, 0, 40, 0, degreeToRadian(360));
    if (isTakingDamage) context.fillStyle = '#fa9';
    else context.fillStyle = '#f33';
    context.arc(0, 0, 48, 0, degreeToRadian(360));
    context.fill();
    context.beginPath();
    context.arc(-20, -10, 20, degreeToRadian(90), degreeToRadian(180));
    context.fillStyle = '#000';
    context.fill();
    context.closePath();
    context.beginPath();
    context.arc(10, -10, 20, degreeToRadian(-10), degreeToRadian(110));
    context.fillStyle = '#000';
    context.fill();
    context.closePath();
    context.beginPath();
    context.arc(-10, 20, 10, degreeToRadian(0), degreeToRadian(140));
    context.fillStyle = '#000';
    context.fill();
    context.closePath();
  });
  if (isAttacking && enemyState.attack.position[0].y >= enemyState.position.y) {
    const attackPositionX =
      gameCanvas.width / 2 +
      (-(map.tileWidth + map.tileHeight) +
        enemy.attack.position[0].x * map.tileWidth -
        (enemy.attack.position[0].y * map.tileWidth) / 6);
    const attackPositionY =
      gameCanvas.height / 2 +
      (enemy.attack.position[0].y - 1 / 2) +
      map.tileHeight * (enemy.attack.position[0].y + 0.5);
    drawGame((context) => {
      context.beginPath();
      context.fillStyle = '#f00';
      context.filter = 'blur(8px)';
      context.setTransform(1, 0, 0, 1, attackPositionX, attackPositionY);
      context.fillRect(
        -52,
        -100 * Math.sin(attackProgress * Math.PI),
        100,
        100 * Math.sin(attackProgress * Math.PI),
      );
      context.closePath();
      context.beginPath();
      context.fillStyle = '#ff0';
      context.filter = 'blur(8px)';
      context.setTransform(1, 0, 0, 1, attackPositionX, attackPositionY);
      context.fillRect(
        -26,
        -100 * Math.sin(attackProgress * Math.PI),
        50,
        100 * Math.sin(attackProgress * Math.PI),
      );
      context.closePath();
    });
  }
};

export const drawGameEnemy4 = ({ map, enemy, time }: DrawEnemyProps) => {
  const [isMoving, movingProgress] = getTimings({
    time,
    start: enemy.move.start + enemy.move.predelay,
    duration: enemy.move.speed,
  });
  const [isAttacking, attackProgress] = getTimings({
    time,
    start: enemy.attack.start + enemy.attack.predelay,
    duration: enemy.attack.duration,
  });
  const [isAttackCharging, attackChargingProgress] = getTimings({
    time,
    start: enemy.attack.start,
    duration: enemy.attack.predelay,
  });
  const positionX = isMoving
    ? gameCanvas.width / 2 +
      (-(map.tileWidth + map.tileHeight) +
        (enemy.position.x +
          (enemy.move.position.x - enemy.position.x) * movingProgress) *
          map.tileWidth -
        ((enemy.position.y +
          (enemy.move.position.y - enemy.position.y) * movingProgress) *
          map.tileWidth) /
          6)
    : gameCanvas.width / 2 +
      (-(map.tileWidth + map.tileHeight) +
        enemy.position.x * map.tileWidth -
        (enemy.position.y * map.tileWidth) / 6);
  const positionY = isMoving
    ? gameCanvas.height / 2 +
      (enemy.position.y +
        (enemy.move.position.y - enemy.position.y) * movingProgress -
        1 / 2) *
        map.tileHeight +
      2 * Math.sin(time / 240)
    : gameCanvas.height / 2 +
      (enemy.position.y - 1 / 2) * map.tileHeight +
      2 * Math.sin(time / 240);
  const [isTakingDamage] = getTimings({
    time,
    start: enemy.damage.start,
    duration: enemy.damage.duration,
  });
  drawGame((context, canvas) => {
    // BODY
    if (isTakingDamage && Math.ceil(time) % 8 === 0) return;
    context.setTransform(1, 0, 0, 1, positionX, positionY);
    context.beginPath();
    if (isMoving) context.globalAlpha = 0.5;
    context.arc(0, 0, 40, 0, degreeToRadian(360));
    if (isTakingDamage) context.fillStyle = '#fa9';
    else context.fillStyle = '#0ff';
    context.arc(0, 0, 48, 0, degreeToRadian(360));
    context.fill();
    context.beginPath();
    context.arc(-20, -10, 20, degreeToRadian(90), degreeToRadian(180));
    context.fillStyle = '#000';
    context.fill();
    context.closePath();
    context.beginPath();
    context.arc(10, -10, 20, degreeToRadian(-10), degreeToRadian(110));
    context.fillStyle = '#000';
    context.fill();
    context.closePath();
    context.beginPath();
    context.arc(-10, 20, 10, degreeToRadian(0), degreeToRadian(140));
    context.fillStyle = '#000';
    context.fill();
    context.closePath();
  });
  if (enemyState.attack.type === 0) {
    if (isAttackCharging) {
      drawGame((context) => {
        context.fillStyle = '#ccfffb';
        enemyState.attack.position.forEach(({ x, y }) => {
          const { x: positionX, y: positionY } = getPosition(x, y);
          context.setTransform(
            1,
            0,
            -0.5,
            1,
            positionX - 60 * attackChargingProgress,
            positionY - 20 * attackChargingProgress,
          );
          context.beginPath();
          context.filter = `blur(8px)`;
          context.globalAlpha = 0.5;
          context.fillRect(
            0,
            0,
            120 * attackChargingProgress,
            40 * attackChargingProgress,
          );
          context.fill();
        });
        context.closePath();
      });
    }
    if (isAttacking) {
      drawGame((context) => {
        context.fillStyle = '#ccfffb';
        enemyState.attack.position.forEach(({ x, y }) => {
          const { x: positionX, y: positionY } = getPosition(x, y);
          context.setTransform(
            1,
            0,
            -0.5,
            1,
            positionX - 60 * (1 - attackProgress),
            positionY - 20 * (1 - attackProgress),
          );
          context.beginPath();
          context.filter = `blur(8px)`;
          context.globalAlpha = 1;
          context.fillRect(
            0,
            0,
            120 * (1 - attackProgress),
            40 * (1 - attackProgress),
          );
          context.fill();
        });
        context.closePath();
      });
      drawGame((context) => {
        context.fillStyle = '#ccfffb';
        enemyState.attack.position.forEach(({ x, y }) => {
          const flow = Math.sin(Math.PI * attackProgress);
          const { x: positionX, y: positionY } = getPosition(x, y);
          context.beginPath();
          context.filter = `blur(${2 * attackProgress}px)`;
          context.globalAlpha = 1 - attackProgress;
          context.moveTo(positionX - 20 * flow, positionY + 10);
          context.lineTo(positionX - 30 * flow, positionY - 120 * flow);
          context.lineTo(positionX + flow, positionY + 5);
          context.fill();
          context.closePath();
        });
      });
    }
  }
  if (enemyState.attack.type === 1) {
    if (isAttacking) {
      enemyState.attack.position.forEach(({ x, y }) => {
        const { x: positionX, y: positionY } = getPosition(x, y);
        drawGame((context) => {
          context.setTransform(
            1,
            0,
            0,
            1,
            positionX,
            positionY - 125 + 130 * attackProgress,
          );
          context.beginPath();
          context.fillStyle = '#ccfffb';
          context.arc(
            0,
            -75,
            10 * (1 - attackProgress),
            degreeToRadian(180),
            degreeToRadian(-20),
          );
          context.moveTo(0, 0);
          context.lineTo(-10, -75 * (1 - attackProgress));
          context.lineTo(10, -75);
          context.fill();
          context.closePath();
        });
      });
    }
  }
};

export const drawGameEnemy5 = ({ map, enemy, time }: DrawEnemyProps) => {
  const [isMoving, movingProgress] = getTimings({
    time,
    start: enemy.move.start + enemy.move.predelay,
    duration: enemy.move.speed,
  });
  const [isAttacking, attackProgress] = getTimings({
    time,
    start: enemy.attack.start + enemy.attack.predelay,
    duration: enemy.attack.duration,
  });
  const [isAttackCharging, attackChargingProgress] = getTimings({
    time,
    start: enemy.attack.start,
    duration: enemy.attack.predelay,
  });
  const positionX = isMoving
    ? gameCanvas.width / 2 +
      (-(map.tileWidth + map.tileHeight) +
        (enemy.position.x +
          (enemy.move.position.x - enemy.position.x) * movingProgress) *
          map.tileWidth -
        ((enemy.position.y +
          (enemy.move.position.y - enemy.position.y) * movingProgress) *
          map.tileWidth) /
          6)
    : gameCanvas.width / 2 +
      (-(map.tileWidth + map.tileHeight) +
        enemy.position.x * map.tileWidth -
        (enemy.position.y * map.tileWidth) / 6);
  const positionY = isMoving
    ? gameCanvas.height / 2 +
      (enemy.position.y +
        (enemy.move.position.y - enemy.position.y) * movingProgress -
        1 / 2) *
        map.tileHeight +
      2 * Math.sin(time / 240)
    : gameCanvas.height / 2 +
      (enemy.position.y - 1 / 2) * map.tileHeight +
      2 * Math.sin(time / 240);
  const [isTakingDamage] = getTimings({
    time,
    start: enemy.damage.start,
    duration: enemy.damage.duration,
  });
  if (enemyState.attack.type === 1) {
    const { x: positionX, y: positionY } = getPosition(
      enemyState.position.x,
      enemyState.position.y,
    );
    if (isAttacking) {
      drawGame((context, canvas) => {
        context.setTransform(1, 0, 0, 1, positionX, positionY - 40);
        context.beginPath();
        if (enemyState.attack.position[0].x > enemyState.position.x)
          context.scale(-1, 1);
        context.moveTo(0, 0);
        context.filter = 'blur(2px)';
        context.lineTo(0, -20);
        context.lineTo(-140 * Math.sin(attackProgress * Math.PI), 0);
        context.lineTo(0, 20);
        context.fill();
        context.closePath();
      });
    }
  }
  drawGame((context, canvas) => {
    // BODY
    if (isTakingDamage && Math.ceil(time) % 8 === 0) return;
    context.setTransform(1, 0, 0, 1, positionX, positionY);
    context.beginPath();
    context.filter = 'blur(4px)';
    if (isMoving) context.globalAlpha = 0.5;
    context.arc(0, 0, 40, 0, degreeToRadian(360));
    if (isTakingDamage) context.fillStyle = '#fa9';
    else context.fillStyle = '#000';
    context.fill();
    context.closePath();
    context.beginPath();
    context.filter = `blur(2px)`;
    context.arc(-20, -10, 5, 0, degreeToRadian(360));
    context.fillStyle = '#fff';
    context.fill();
    context.closePath();
    context.beginPath();
    context.arc(10, -10, 5, 0, degreeToRadian(360));
    context.fillStyle = '#fff';
    context.fill();
    context.closePath();
  });
  if (enemyState.attack.type === 0) {
    if (isAttackCharging) {
      drawGame((context, canvas) => {
        const { x: positionX, y: positionY } = getPosition(
          enemyState.position.x,
          enemyState.position.y,
        );
        if (enemyState.position.x === 0)
          context.setTransform(
            1,
            0,
            0,
            1,
            positionX + 80,
            positionY - 40 + 2 * Math.sin(time / 240),
          );
        else
          context.setTransform(
            1,
            0,
            0,
            1,
            positionX - 80,
            positionY - 40 + 2 * Math.sin(time / 240),
          );
        context.filter = 'blur(4px)';
        context.scale(1, 2);
        context.rotate(time);
        context.beginPath();
        context.fillStyle = '#fff';
        context.fillRect(
          -60 * attackChargingProgress,
          -60 * attackChargingProgress,
          120 * attackChargingProgress,
          120 * attackChargingProgress,
        );
        context.closePath();
        context.beginPath();
        context.fillStyle = '#000';
        context.fillRect(
          -50 * attackChargingProgress,
          -50 * attackChargingProgress,
          100 * attackChargingProgress,
          100 * attackChargingProgress,
        );
        context.closePath();
      });
    }
    if (isAttacking) {
      drawGame((context, canvas) => {
        const { x: positionX, y: positionY } = getPosition(
          enemyState.position.x,
          enemyState.position.y,
        );
        if (enemyState.position.x === 0)
          context.setTransform(
            1,
            0,
            0,
            1,
            positionX + 80,
            positionY - 40 + 2 * Math.sin(time / 240),
          );
        else
          context.setTransform(
            1,
            0,
            0,
            1,
            positionX - 80,
            positionY - 40 + 2 * Math.sin(time / 240),
          );
        context.filter = 'blur(4px)';
        context.scale(1, 2);
        context.rotate(time);
        context.beginPath();
        context.fillStyle = '#fff';
        context.fillRect(
          -60 * Math.cos((attackProgress * Math.PI) / 2),
          -60 * Math.cos((attackProgress * Math.PI) / 2),
          120 * Math.cos((attackProgress * Math.PI) / 2),
          120 * Math.cos((attackProgress * Math.PI) / 2),
        );
        context.closePath();
        context.beginPath();
        context.fillStyle = '#000';
        context.fillRect(
          -50 * Math.cos((attackProgress * Math.PI) / 2),
          -50 * Math.cos((attackProgress * Math.PI) / 2),
          100 * Math.cos((attackProgress * Math.PI) / 2),
          100 * Math.cos((attackProgress * Math.PI) / 2),
        );
        context.closePath();
      });
      drawGame((context, canvas) => {
        const { x: positionX, y: positionY } = getPosition(
          enemyState.position.x,
          enemyState.position.y,
        );
        context.setTransform(
          1,
          0,
          0,
          1,
          positionX - 20,
          positionY - 40 + 2 * Math.sin(time / 240),
        );
        context.filter = 'blur(4px)';
        context.rotate(degreeToRadian(180));
        if (enemyState.position.x === 0) context.scale(-1, 2);
        else context.scale(1, 2);
        context.beginPath();
        context.fillStyle = '#000';
        context.fillRect(
          60,
          -(80 * Math.sin(Math.PI * attackProgress)) / 2,
          10000,
          80 * Math.sin(Math.PI * attackProgress),
        );
        context.closePath();
      });
    }
  }
  if (enemyState.attack.type === 2) {
    if (isAttackCharging) {
      drawGame((context) => {
        enemyState.attack.position.forEach(({ x, y }) => {
          const { x: positionX, y: positionY } = getPosition(x, y);
          context.beginPath();
          context.setTransform(1, 0, 0, 1, positionX, positionY);
          context.scale(2, 1);
          context.filter = 'blur(2px)';
          context.arc(
            0,
            0,
            12 * Math.sin((attackChargingProgress * Math.PI) / 2),
            0,
            degreeToRadian(360),
          );
          context.fill();
          context.closePath();
        });
      });
    }
    if (isAttacking) {
      drawGame((context) => {
        enemyState.attack.position.forEach(({ x, y }) => {
          const { x: positionX, y: positionY } = getPosition(x, y);
          context.beginPath();
          context.setTransform(1, 0, 0, 1, positionX, positionY);
          context.scale(2, 1);
          context.filter = 'blur(2px)';
          context.arc(
            0,
            0,
            12 * Math.cos((attackProgress * Math.PI) / 2),
            0,
            degreeToRadian(360),
          );
          context.fill();
          context.closePath();
        });
      });
      drawGame((context) => {
        enemyState.attack.position.forEach(({ x, y }) => {
          const { x: positionX, y: positionY } = getPosition(x, y);
          context.beginPath();
          context.setTransform(1, 0, 0, 1, positionX, positionY - 20);
          context.scale(1, 6 * (1 / 2 + (1 / 2) * attackProgress));
          context.filter = 'blur(2px)';
          context.arc(0, -200 * attackProgress, 12, 0, degreeToRadian(360));
          context.fill();
          context.closePath();
        });
      });
    }
  }
};
