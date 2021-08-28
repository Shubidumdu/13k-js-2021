import { draw } from '../canvas';
import { getFont } from '../font';

const PLAYER_LIFE_COLOR = '#FFA';
const ENEMY_LIFE_COLOR = '#F99';

export interface LifeState {
  enemy: number;
  player: number;
}

export const drawLifeBar = ({ player, enemy }: LifeState) => {
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
