import { resetCanvas } from './canvas';
import './index.scss';
import { drawGame } from './scene/game';
import { drawTitle } from './scene/title';

// 0 => TITLE
// 1 => ON_GAME
const state = {
  sceneType: 0,
};

const loop = (time: number) => {
  resetCanvas();
  if (state.sceneType === 0) {
    drawTitle();
  }
  if (state.sceneType === 1) {
    drawGame(time);
  }
  requestAnimationFrame(loop);
};

requestAnimationFrame(loop);
