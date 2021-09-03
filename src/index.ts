import { resetCanvas } from './canvas';
import './index.scss';
import { drawGame } from './scene/game';
import { drawTitle } from './scene/title';

// 0 => TITLE
// 1 => ON_GAME
export const globalState = {
  sceneType: 0,
};

const loop = (time: number) => {
  resetCanvas();
  if (globalState.sceneType === 0) {
    drawTitle(time);
  }
  if (globalState.sceneType === 1) {
    drawGame(time);
  }
  requestAnimationFrame(loop);
};

requestAnimationFrame(loop);
