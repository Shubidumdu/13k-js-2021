import { draw } from '../canvas';
import { getFont } from '../font';
import { gameState } from '../scene/game';

const PLAYER_LIFE_COLOR = '#FFA';
const ENEMY_LIFE_COLOR = '#F99';

export const drawLifeBar = ({
  player,
  enemy,
}: {
  player: number;
  enemy: number;
}) => {
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
    context.fillStyle = '#fff';
    context.fillText('ROACH', -100, 18);
    context.fillStyle = PLAYER_LIFE_COLOR;
    context.fillRect(0, 0, 2 * player, 20);
  });
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
    context.fillStyle = '#fff';
    context.fillText('ENEMY', -100, 0);
    context.fillStyle = ENEMY_LIFE_COLOR;
    context.fillRect(0, -20, 2 * enemy, 20);
  });
};

export const drawMessage = ({ game }: { game: typeof gameState }) => {
  if (game.playTime < 3000) {
    const count = Math.ceil((3000 - game.playTime) / 1000);
    draw((context, canvas) => {
      context.setTransform(
        1,
        0,
        0,
        1,
        canvas.width / 2 - 24,
        canvas.height / 2 - 80,
      );
      context.shadowColor = '#000';
      context.shadowOffsetX = 4;
      context.shadowOffsetY = 4;
      context.font = getFont(48);
      context.fillStyle = '#fff';
      context.fillText(count.toString(), 0, 0);
    });
  }
};

export const drawScoreTime = ({ game }: { game: typeof gameState }) => {
  if (gameState.scoreTime > 0) {
    const time = Math.round(gameState.scoreTime);
    const second = time / 1000;
    const minute = Math.floor(second / 60);
    draw((context, canvas) => {
      context.setTransform(
        1,
        0,
        0,
        1,
        canvas.width / 2 + 160,
        canvas.height / 2 - 240,
      );
      context.font = getFont(18);
      context.fillStyle = '#fff';
      context.fillText(
        `${minute.toString().padStart(2, '0')}:${second
          .toFixed(2)
          .padStart(5, '0')}`,
        0,
        0,
      );
    });
  }
};
