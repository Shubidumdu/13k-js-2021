import { canvas, draw, drawShape } from '../canvas';
import { getFont } from '../font';
import { degreeToRadian } from '../utils';
import zzfx from '../zzfx';

const TILE_WIDTH = 120;
const TILE_HEIGHT = 40;
const TILE_SIZE = 4;

const ATTACK_TIME = 200;
const DAMAGE_TIME = 800;

const state = {
  x: 0,
  y: 0,
  attack: 0,
  direction: 1, // 1 = RIGHT, -1 = LEFT
  life: 10,
  damageTime: 0,
};

export const drawGame = (time: number) => {
  drawMap(
    TILE_SIZE,
    canvas.width / 2,
    canvas.height / 2,
    TILE_WIDTH,
    TILE_HEIGHT,
  );
  drawLife(state.life);
  drawEnemy(3, 0, time);
  if (
    time - state.damageTime < DAMAGE_TIME &&
    state.damageTime &&
    Math.ceil(time) % 2 === 0
  )
    return;
  drawPlayer(state.x, state.y, time);
};

const drawLife = (life: number) => {
  draw((context, canvas) => {
    context.setTransform(
      1,
      0,
      0,
      1,
      canvas.width / 2 - 140,
      canvas.height / 2 - 240,
    );
    context.font = getFont(18);
    context.fillText('ROACH', -100, 18);
    context.fillStyle = '#ffa';
    context.fillRect(0, 0, 28 * life, 20);
  });
};

const drawEnemy = (x: number, y: number, time: number) => {
  const positionX =
    canvas.width / 2 + (-160 + x * TILE_WIDTH - (y * TILE_WIDTH) / 6);
  const positionY =
    canvas.height / 2 + (-20 + y * TILE_HEIGHT + Math.sin(time / 240));
  draw((context, canvas) => {
    // BODY
    context.setTransform(1, 0, 0, 1, positionX, positionY);
    context.beginPath();
    context.arc(0, 0, 40, 0, degreeToRadian(360));
    context.fillStyle = '#6f9';
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

const drawPlayer = (x: number, y: number, time: number) => {
  const attackProgress = (time - state.attack) / ATTACK_TIME;
  const isAttacking = attackProgress < 1 && state.attack ? true : false;
  const wave = Math.sin(time / 240);
  const positionX =
    canvas.width / 2 + (-160 + x * TILE_WIDTH - (y * TILE_WIDTH) / 6);
  const positionY = canvas.height / 2 + (-20 + y * TILE_HEIGHT);
  draw((context, canvas) => {
    context.setTransform(1, 0, 0, 1, positionX, positionY);
    if (state.direction === -1) context.scale(-1, 1);
    if (isAttacking) {
      context.rotate(
        degreeToRadian(-20) *
          Math.pow(attackProgress, 2) *
          (3 * attackProgress - 3),
      );
    }
    drawShape((context, canvas) => {
      // BODY
      context.ellipse(0, wave, 20, 40, 0, 0, 2 * Math.PI);
      context.shadowOffsetX = 0;
      context.shadowOffsetY = 0;
      context.fillStyle = '#6A3D3D';
      context.fill();
    });
    drawShape((context, canvas) => {
      // EYES
      context.arc(0, -20 + wave, 3, 0, degreeToRadian(360));
      context.arc(10, -20 + wave, 3, 0, degreeToRadian(360));
      context.fillStyle = '#000';
      context.fill();
    });
    drawShape((context, canvas) => {
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
    drawShape((context, canvas) => {
      // LEGS

      context.moveTo(-10, 20);
      if (isAttacking) {
        context.quadraticCurveTo(
          -5 + wave,
          28 + wave,
          -10 - 10 * Math.sin(Math.PI * attackProgress),
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
      } else context.quadraticCurveTo(24 + wave, 20 + wave, 20, 40);
      context.stroke();
    });
    drawShape((context, canvas) => {
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
    draw((context, canvas) => {
      // SWORD
      if (state.direction === -1)
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
      if (state.direction === -1) context.scale(-1, 1);
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

const drawMap = (
  size: number,
  x: number,
  y: number,
  tileWidth: number,
  tileHeight: number,
) => {
  draw((context, canvas) => {
    context.setTransform(
      1,
      0,
      -0.5,
      1,
      x - (tileWidth * size) / 2 + tileWidth / size,
      y,
    );
    context.strokeStyle = '#0f0';
    context.shadowColor = '#fff';
    context.shadowOffsetX = 8;
    context.shadowOffsetY = 8;
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        context.strokeRect(
          tileWidth * j,
          tileHeight * i,
          tileWidth,
          tileHeight,
        );
      }
    }
  });
};

window.addEventListener('keydown', (e) => {
  const now = performance.now();
  if (now - state.attack < ATTACK_TIME) return;
  if (e.key === 'ArrowRight') {
    if (state.x === TILE_SIZE - 1) return;
    state.x += 1;
  }
  if (e.key === 'ArrowLeft') {
    if (state.x === 0) return;
    state.x -= 1;
  }
  if (e.key === 'ArrowUp') {
    if (state.y === 0) return;
    state.y -= 1;
  }
  if (e.key === 'ArrowDown') {
    if (state.y === TILE_SIZE - 1) return;
    state.y += 1;
  }
  if (e.key === 'd' || e.key === 'D') {
    soundLightSaber();
    state.direction = 1;
    state.attack = performance.now();
  }
  if (e.key === 's' || e.key === 'S') {
    soundLightSaber();
    state.direction = -1;
    state.attack = performance.now();
  }
  if (e.key === ' ') {
    getAttacked(1);
  }
});

const getAttacked = (damage: number) => {
  if (!state.life || performance.now() - state.damageTime < DAMAGE_TIME) return;
  state.life -= damage;
  state.damageTime = performance.now();
  zzfx(
    ...[
      2.19,
      ,
      ,
      ,
      ,
      0.11,
      3,
      0.1,
      -3.7,
      0.8,
      ,
      ,
      0.19,
      0.5,
      ,
      0.4,
      0.19,
      0.87,
      0.06,
      0.18,
    ],
  );
};

const soundLightSaber = () => {
  zzfx(
    ...[
      ,
      ,
      334,
      ,
      0.08,
      0.09,
      2,
      1.52,
      -7.8,
      2.1,
      ,
      ,
      0.02,
      0.2,
      -28,
      ,
      ,
      0.65,
      0.1,
    ],
  );
};
