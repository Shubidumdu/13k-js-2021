import { drawLayer1 } from '../canvas';
import { gameState } from '../scene/game';
import { EnemyState } from '../states/enemy';
import { MapState } from '../states/map';
import { degreeToRadian, getTimings } from '../utils';

interface DrawMapProps {
  map: MapState;
  enemy: EnemyState;
  time: number;
}

const stars: {
  x: number;
  y: number;
  dx: number;
  dy: number;
  radius: number;
}[] = [];

export const drawGameMap = ({
  time,
  enemy,
  map: { size, tileWidth, tileHeight },
}: DrawMapProps) => {
  const [isEnemyWaitingMove] = getTimings({
    time,
    start: enemy.move.start,
    duration: enemy.move.predelay,
  });
  const [isEnemyAttacking] = getTimings({
    time,
    start: enemy.attack.start,
    duration: enemy.attack.predelay,
  });
  if (gameState.stage === 1)
    drawLayer1((context, canvas) => {
      context.beginPath();
      const lingrad = context.createLinearGradient(0, 0, 0, innerHeight);
      lingrad.addColorStop(0.3, '#0D0D0D');
      lingrad.addColorStop(0.39, '#401410');
      lingrad.addColorStop(0.4, '#D97652');
      lingrad.addColorStop(0.8, '#8C3420');
      context.fillStyle = lingrad;
      context.fillRect(0, 0, canvas.width, canvas.height);
      context.closePath();
    });
  if (gameState.stage === 2)
    drawLayer1((context, canvas) => {
      context.beginPath();
      const lingrad = context.createLinearGradient(0, 0, 0, innerHeight);
      lingrad.addColorStop(0.3, '#0D0D0D');
      lingrad.addColorStop(0.39, '#401410');
      lingrad.addColorStop(0.4, '#D97652');
      lingrad.addColorStop(0.8, '#8C3420');
      context.fillStyle = lingrad;
      context.fillRect(0, 0, canvas.width, canvas.height);
      context.closePath();
    });
  drawLayer1((context, canvas) => {
    context.fillStyle = '#fff';
    if (!stars.length) {
      for (let i = 0; i < 50; i++) {
        const x = Math.random() * innerWidth;
        const y = Math.random() * (innerHeight / 3);
        const dx = (Math.random() - 0.5) * 0.5;
        const dy = (Math.random() - 0.5) * 0;
        const radius = Math.random() * 2 + 1;
        stars.push({
          x,
          y,
          dx,
          dy,
          radius,
        });
      }
    }
    stars.forEach(({ x, y, dx, dy, radius }, idx) => {
      const positionX = x + dx * 2;
      const positionY = y + dy * 2;
      if (positionX < 0) stars[idx].dx = -dx;
      if (positionY < 0) stars[idx].dy = -dy;
      if (positionX > innerWidth) stars[idx].dx = -dx;
      if (positionY > innerHeight) stars[idx].dy = -dy;
      stars[idx].x = positionX;
      stars[idx].y = positionY;
      context.beginPath();
      context.arc(positionX, positionY, radius, 0, degreeToRadian(360));
      context.fill();
      context.closePath();
    });
  });
  drawLayer1((context, canvas) => {
    context.setTransform(
      1,
      0,
      -0.5,
      1,
      canvas.width / 2 - (tileWidth * size) / 2 + tileWidth / 4,
      canvas.height / 2 - 40,
    );
    context.lineWidth = 2;
    if (gameState.stage === 1) {
      context.strokeStyle = '#5A290C';
      context.shadowColor = '#240000';
    }
    context.shadowOffsetX = 8;
    context.shadowOffsetY = 8;
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        // if enemy will moving on the block
        if (
          isEnemyWaitingMove &&
          // Math.ceil(time) % 4 === 0 &&
          enemy.move.position.x === x &&
          enemy.move.position.y === y
        ) {
          context.shadowOffsetX = 8;
          context.shadowOffsetY = 8;
          context.fillStyle = '#fac800';
          context.fillRect(
            tileWidth * x,
            tileHeight * y,
            tileWidth,
            tileHeight,
          );
          context.shadowOffsetX = 0;
          context.shadowOffsetY = 0;
          context.strokeRect(
            tileWidth * x,
            tileHeight * y,
            tileWidth,
            tileHeight,
          );
        }
        // if enemy will attack the block
        else if (
          isEnemyAttacking &&
          enemy.attack.position.some(({ x: _x, y: _y }) => x === _x && y === _y)
        ) {
          context.shadowOffsetX = 8;
          context.shadowOffsetY = 8;
          context.fillStyle = '#fa2b00';
          context.fillRect(
            tileWidth * x,
            tileHeight * y,
            tileWidth,
            tileHeight,
          );
          context.shadowOffsetX = 0;
          context.shadowOffsetY = 0;
          context.strokeRect(
            tileWidth * x,
            tileHeight * y,
            tileWidth,
            tileHeight,
          );
        } else {
          context.shadowOffsetX = 8;
          context.shadowOffsetY = 8;
          if (gameState.stage === 1) context.fillStyle = '#F0C085';
          context.fillRect(
            tileWidth * x,
            tileHeight * y,
            tileWidth,
            tileHeight,
          );
          context.shadowOffsetX = 0;
          context.shadowOffsetY = 0;
          context.strokeRect(
            tileWidth * x,
            tileHeight * y,
            tileWidth,
            tileHeight,
          );
        }
      }
    }
  });
};
