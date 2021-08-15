import { resetCanvas } from './canvas';
import './index.scss';
import { drawGame } from './scene/game';
import { drawTitle } from './scene/title';

// 0 => TITLE
// 1 => ON_GAME
let state = {
  sceneType: 0,
};

const loop = (time: number) => {
  resetCanvas();
  if (state.sceneType === 0) {
    // drawTitle();
    drawGame();
  }
  requestAnimationFrame(loop);
};

requestAnimationFrame(loop);
