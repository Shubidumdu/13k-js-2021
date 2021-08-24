import { draw } from '../canvas';
import { getFont } from '../font';

const PLAYER_LIFE_COLOR = '#FFA';

export interface LifeState {
  remain: number;
}

export const drawLifeBar = ({ remain }: LifeState) => {
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
    context.fillStyle = PLAYER_LIFE_COLOR;
    context.fillRect(0, 0, 28 * remain, 20);
  });
};
