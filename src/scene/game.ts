import { canvas, context, draw } from '../canvas';
import { degreeToRadian } from '../utils';

const TILE_WIDTH = 120;
const TILE_HEIGHT = 40;
const state = {
  x: 0,
  y: 0,
  attack: false,
};

export const drawGame = (time: number) => {
  drawMap(4, canvas.width / 2 + 40, canvas.height / 2, TILE_WIDTH, TILE_HEIGHT);
  drawPlayer(state.x, state.y, time);
};

const drawPlayer = (x: number, y: number, time: number) => {
  draw(() => {
    // BODY
    context.setTransform(1, 0, 0, 2, canvas.width / 2, canvas.height / 2);
    context.arc(
      -140 + x * TILE_WIDTH - (y * TILE_WIDTH) / 6,
      -10 + (y * TILE_HEIGHT) / 2 + Math.sin(time / 240),
      20,
      0,
      degreeToRadian(360),
    );
    context.shadowOffsetX = 0;
    context.shadowOffsetY = 0;
    context.fillStyle = '#6A3D3D';
    context.fill();
  });
  draw(() => {
    // EYES
    context.setTransform(1, 0, 0, 1, canvas.width / 2, canvas.height / 2);
    context.arc(
      -140 + x * TILE_WIDTH - (y * TILE_WIDTH) / 6,
      -40 + y * TILE_HEIGHT + Math.sin(time / 240),
      3,
      0,
      degreeToRadian(360),
    );
    context.arc(
      -130 + x * TILE_WIDTH - (y * TILE_WIDTH) / 6,
      -40 + y * TILE_HEIGHT + Math.sin(time / 240),
      3,
      0,
      degreeToRadian(360),
    );
    context.shadowOffsetX = 0;
    context.shadowOffsetY = 0;
    context.fillStyle = '#000';
    context.fill();
  });
  draw(() => {
    // WEAPON
    context.setTransform(
      1,
      0,
      0,
      1,
      canvas.width / 2 - 110 + x * TILE_WIDTH - (y * TILE_WIDTH) / 6,
      canvas.height / 2 +
        Math.sin(time / 240) +
        y * TILE_HEIGHT +
        Math.sin(time / 240),
    );
    context.rotate(degreeToRadian(190 + Math.sin(time / 240)));
    context.fillStyle = '#aaf';
    context.fillRect(-5, 0, 10, 80);
    context.setTransform(
      1,
      0,
      0,
      1,
      canvas.width / 2 - 110 + x * TILE_WIDTH - (y * TILE_WIDTH) / 6,
      canvas.height / 2 +
        Math.sin(time / 240) +
        y * TILE_HEIGHT +
        Math.sin(time / 240),
    );
    context.rotate(degreeToRadian(190 + Math.sin(time / 240)));
    context.fillStyle = '#000';
    context.fillRect(-5, 0, 10, 20);
  });
  draw(() => {
    // arms
    context.setTransform(1, 0, 0, 1, canvas.width / 2, canvas.height / 2);
    context.moveTo(
      -150 + x * TILE_WIDTH - (y * TILE_WIDTH) / 6,
      -30 + y * TILE_HEIGHT + Math.sin(time / 240),
    );
    context.quadraticCurveTo(
      -150 + x * TILE_WIDTH - (y * TILE_WIDTH) / 6,
      0 + y * TILE_HEIGHT + Math.sin(time / 240),
      -110 + x * TILE_WIDTH - (y * TILE_WIDTH) / 6,
      -10 + y * TILE_HEIGHT + Math.sin(time / 240),
    );
    context.moveTo(
      -122 + x * TILE_WIDTH - (y * TILE_WIDTH) / 6,
      -30 + y * TILE_HEIGHT + Math.sin(time / 240),
    );
    context.quadraticCurveTo(
      -120 + x * TILE_WIDTH - (y * TILE_WIDTH) / 6,
      0 + y * TILE_HEIGHT + Math.sin(time / 240),
      -110 + x * TILE_WIDTH - (y * TILE_WIDTH) / 6,
      -10 + y * TILE_HEIGHT + Math.sin(time / 240),
    );
    context.strokeStyle = '#000';
    context.stroke();
  });
  draw(() => {
    // legs
    context.setTransform(1, 0, 0, 1, canvas.width / 2, canvas.height / 2);
    context.moveTo(
      -150 + x * TILE_WIDTH - (y * TILE_WIDTH) / 6,
      -0 + y * TILE_HEIGHT + Math.sin(time / 240),
    );
    context.quadraticCurveTo(
      -145 + x * TILE_WIDTH - (y * TILE_WIDTH) / 6 + Math.sin(time / 240),
      0 + y * TILE_HEIGHT + Math.sin(time / 240),
      -150 + x * TILE_WIDTH - (y * TILE_WIDTH) / 6,
      25 + y * TILE_HEIGHT,
    );
    context.moveTo(
      -124 + x * TILE_WIDTH - (y * TILE_WIDTH) / 6,
      -0 + y * TILE_HEIGHT + Math.sin(time / 240),
    );
    context.quadraticCurveTo(
      -120 + x * TILE_WIDTH - (y * TILE_WIDTH) / 6 + Math.sin(time / 240),
      0 + y * TILE_HEIGHT + Math.sin(time / 240),
      -120 + x * TILE_WIDTH - (y * TILE_WIDTH) / 6,
      20 + y * TILE_HEIGHT,
    );
    context.stroke();
  });
  draw(() => {
    // feelers
    context.setTransform(1, 0, 0, 1, canvas.width / 2, canvas.height / 2);
    context.moveTo(
      -150 + x * TILE_WIDTH - (y * TILE_WIDTH) / 6,
      -50 + y * TILE_HEIGHT + Math.sin(time / 240),
    );
    context.quadraticCurveTo(
      -130 + x * TILE_WIDTH - (y * TILE_WIDTH) / 6 - Math.sin(time / 240),
      -100 + y * TILE_HEIGHT + Math.sin(time / 240),
      -160 + x * TILE_WIDTH - (y * TILE_WIDTH) / 6 - Math.sin(time / 240),
      -80 + y * TILE_HEIGHT + Math.sin(time / 240),
    );
    context.moveTo(
      -130 + x * TILE_WIDTH - (y * TILE_WIDTH) / 6,
      -50 + y * TILE_HEIGHT + Math.sin(time / 240),
    );
    context.quadraticCurveTo(
      -100 + x * TILE_WIDTH - (y * TILE_WIDTH) / 6 - Math.sin(time / 240),
      -100 + y * TILE_HEIGHT + Math.sin(time / 240),
      -140 + x * TILE_WIDTH - (y * TILE_WIDTH) / 6 - Math.sin(time / 240),
      -80 + y * TILE_HEIGHT + Math.sin(time / 240),
    );
    context.stroke();
  });
};

const drawMap = (
  size: number,
  x: number,
  y: number,
  tileWidth: number,
  tileHeight: number,
) => {
  draw(() => {
    context.setTransform(1, 0, -0.5, 1, 0, 0);
    context.strokeStyle = '#0f0';
    context.shadowColor = '#fff';
    context.shadowOffsetX = 8;
    context.shadowOffsetY = 8;
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        context.strokeRect(
          x + tileWidth * j,
          y + tileHeight * i,
          tileWidth,
          tileHeight,
        );
      }
    }
  });
};

window.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight') state.x += 1;
  if (e.key === 'ArrowLeft') state.x -= 1;
  if (e.key === 'ArrowUp') state.y -= 1;
  if (e.key === 'ArrowDown') state.y += 1;
  if (e.key === ' ') {
    console.log('');
    state.attack = !state.attack;
  }
});
