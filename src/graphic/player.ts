import { drawLayer1, layer1Canvas } from '../canvas';
import { gameState } from '../scene/game';
import { MapState } from '../states/map';
import { playerState, PlayerState } from '../states/player';
import { degreeToRadian, getTimings } from '../utils';

interface DrawPlayerProps {
  time: number;
  player: PlayerState;
  map: MapState;
}

export const drawPlayer = ({ time, player, map }: DrawPlayerProps) => {
  // Damage Effect
  const [isAttacking, attackProgress] = getTimings({
    time,
    start: player.attack.start,
    duration:
      player.attack.predelay + player.attack.duration + player.attack.delay,
  });
  const [isMoving, movingProgress] = getTimings({
    time,
    start: player.move.start,
    duration: player.move.speed,
  });
  // console.log(isMoving, movingProgress);
  const [isTakingDamage] = getTimings({
    time,
    start: player.damage.start,
    duration: player.damage.duration,
  });
  if (isTakingDamage && Math.ceil(time) % 4 === 0) return;
  const wave = Math.sin(time / 240);
  const positionX = isMoving
    ? layer1Canvas.width / 2 +
      (-(map.tileWidth + map.tileHeight) +
        (player.position.x +
          (player.move.position.x - player.position.x) * movingProgress) *
          map.tileWidth -
        ((player.position.y +
          (player.move.position.y - player.position.y) * movingProgress) *
          map.tileWidth) /
          6)
    : layer1Canvas.width / 2 +
      (-(map.tileWidth + map.tileHeight) +
        player.position.x * map.tileWidth -
        (player.position.y * map.tileWidth) / 6);
  const positionY = isMoving
    ? layer1Canvas.height / 2 +
      (player.position.y +
        (player.move.position.y - player.position.y) * movingProgress -
        1 / 2) *
        map.tileHeight -
      40
    : layer1Canvas.height / 2 +
      (player.position.y - 1 / 2) * map.tileHeight -
      40;
  drawLayer1((context) => {
    // SHADOW
    context.setTransform(1, 0, 0, 1, positionX, positionY);
    context.globalAlpha = 0.4;
    if (playerState.direction === 1) {
      if (isAttacking)
        context.ellipse(
          4 - 10 * attackProgress,
          42,
          35 - 1 * wave,
          10 - wave,
          0,
          0,
          2 * Math.PI,
        );
      else context.ellipse(4, 42, 35 - 1 * wave, 10 - wave, 0, 0, 2 * Math.PI);
    } else {
      if (isAttacking)
        context.ellipse(
          0 + 10 * attackProgress,
          42,
          35 - 1 * wave,
          10 - wave,
          0,
          0,
          2 * Math.PI,
        );
      else context.ellipse(0, 42, 35 - 1 * wave, 10 - wave, 0, 0, 2 * Math.PI);
    }
    context.shadowOffsetX = 0;
    context.shadowOffsetY = 0;
    if (gameState.stage === 1) context.fillStyle = '#000';
    context.fill();
  });
  drawLayer1((context) => {
    context.setTransform(1, 0, 0, 1, positionX, positionY);
    if (player.direction === -1) context.scale(-1, 1);
    if (isAttacking) {
      context.rotate(
        degreeToRadian(-20) *
          Math.pow(attackProgress, 2) *
          (3 * attackProgress - 3),
      );
    }
    drawLayer1((context) => {
      // BODY
      context.ellipse(0, wave, 20, 40, 0, 0, 2 * Math.PI);
      context.shadowOffsetX = 0;
      context.shadowOffsetY = 0;
      context.fillStyle = '#6A3D3D';
      context.fill();
    });
    drawLayer1((context) => {
      // EYES
      context.arc(0, -20 + wave, 3, 0, degreeToRadian(360));
      context.arc(10, -20 + wave, 3, 0, degreeToRadian(360));
      context.fillStyle = '#000';
      context.fill();
    });
    drawLayer1((context) => {
      // ARMS
      context.moveTo(-10, -10 + wave);
      if (isAttacking) {
        context.quadraticCurveTo(
          -10,
          20 - 30 * Math.sin(Math.PI * attackProgress),
          30 + 5 * Math.sin(Math.PI * attackProgress),
          10 + 5 * Math.sin(Math.PI * attackProgress),
        );
      } else context.quadraticCurveTo(-10, 20 + 2 * wave, 30, 10 - 2 * wave);
      context.moveTo(16, -10 + wave);
      if (isAttacking) {
        context.quadraticCurveTo(
          20,
          20 - 30 * Math.sin(Math.PI * attackProgress),
          30 + 5 * Math.sin(Math.PI * attackProgress),
          10 + 5 * Math.sin(Math.PI * attackProgress),
        );
      } else context.quadraticCurveTo(20, 20 + 2 * wave, 30, 10 - 2 * wave);
      context.stroke();
    });
    drawLayer1((context) => {
      // LEGS
      context.moveTo(-10, 20);
      if (isAttacking) {
        context.quadraticCurveTo(
          -5 + wave,
          28 + wave,
          -10 - 10 * Math.sin(Math.PI * attackProgress),
          48,
        );
      } else if (isMoving) {
        context.quadraticCurveTo(
          -5 + wave,
          28 + wave,
          -10 - 10 * Math.sin(Math.PI * movingProgress),
          48,
        );
      } else context.quadraticCurveTo(-5 + wave, 28 + wave, -10, 48);
      context.moveTo(14, 20);
      if (isAttacking) {
        context.quadraticCurveTo(
          24 + wave + 2 * Math.sin(Math.PI * attackProgress),
          20 + wave + 2 * Math.sin(Math.PI * attackProgress),
          20 + 4 * Math.sin(Math.PI * attackProgress),
          40 - 4 * Math.sin(Math.PI * attackProgress),
        );
      } else if (isMoving) {
        context.quadraticCurveTo(
          24 + wave + 2 * Math.sin(Math.PI * movingProgress),
          20 + wave + 2 * Math.sin(Math.PI * movingProgress),
          20 + 4 * Math.sin(Math.PI * movingProgress),
          40 - 4 * Math.sin(Math.PI * movingProgress),
        );
      } else context.quadraticCurveTo(24 + wave, 20 + wave, 20, 40);
      context.stroke();
    });
    drawLayer1((context) => {
      // FEELERS
      context.moveTo(-10, -28 + wave);
      if (isAttacking) {
        context.quadraticCurveTo(
          10 + wave,
          -80 + wave,
          -24 + 2 * wave + 12 * Math.sin(attackProgress * Math.PI),
          -60 - 2 * wave - 12 * Math.sin(attackProgress * Math.PI),
        );
      } else
        context.quadraticCurveTo(
          10 + wave,
          -80 + wave,
          -24 + 2 * wave,
          -60 - 2 * wave,
        );
      context.moveTo(10, -28 + wave);
      if (isAttacking) {
        context.quadraticCurveTo(
          40 + wave,
          -80 + wave,
          1 + 2 * wave + 12 * Math.sin(attackProgress * Math.PI),
          -60 - 2 * wave - 12 * Math.sin(attackProgress * Math.PI),
        );
      } else
        context.quadraticCurveTo(
          40 + wave,
          -80 + wave,
          1 + 2 * wave,
          -60 - 2 * wave,
        );
      context.stroke();
    });
    drawLayer1((context) => {
      // SWORD
      if (player.direction === -1)
        context.setTransform(
          1,
          0,
          0,
          1,
          positionX - 28,
          positionY + 22 - Math.sin(time / 240),
        );
      else
        context.setTransform(
          1,
          0,
          0,
          1,
          positionX + 28,
          positionY + 22 - Math.sin(time / 240),
        );
      if (player.direction === -1) context.scale(-1, 1);
      context.fillStyle = '#aaf';
      if (isAttacking) {
        context.rotate(
          degreeToRadian(-180) *
            Math.pow(attackProgress, 2) *
            (3 * attackProgress - 3),
        );
      }
      context.rotate(degreeToRadian(200 - Math.sin(time / 240)));
      context.fillRect(0, 0, 10, 120);
      context.fillStyle = '#000';
      context.fillRect(0, 0, 10, 20);
    });
  });
};
