import { globalState } from '..';
import { draw } from '../canvas';
import { getFont } from '../font';

export const drawResult = (time: number) => {
  draw((context, canvas) => {
    context.textBaseline = 'middle';
    context.textAlign = 'center';
    context.font = getFont();
    context.fillStyle = '#fff';
    context.shadowOffsetX = 3;
    context.shadowOffsetY = 3;
    context.shadowColor = '#aaa';
    context.fillText('Game Over', canvas.width / 2, canvas.height / 2);
  });
};

export const startResultScene = () => {
  globalState.sceneType = 3;
};
